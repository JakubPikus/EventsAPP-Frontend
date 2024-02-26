import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { data_cities } from "../actions/auth";

import { LocationMarkerIcon, SearchIcon } from "@heroicons/react/solid";

function EventBrowser({
  user,
  xcsrftoken,
  provinces,
  cities,
  endProvider,
  checkCities,
}) {
  const dispatch = useDispatch();
  const history = useNavigate();

  // Handler dla inputów
  const [locationInput, setLocationInput] = useState({
    province: user.city.county.province.name,
    city: user.city.name,
  });
  // Lista pobranych miast dla inputa, aby nie duplikować get'ów
  const [listCity, setListCity] = useState({
    province: null,
    data: null,
  });

  // Pobranie miast do useState
  const [cityState, setCityState] = useState(null);

  // Wybrane id wojewodztwa do pobrania miast
  const [selectedProvince, setSelectedProvince] = useState(
    user.city.county.province.id
  );
  // Gotowy form do wysłania
  const [validated, setValidated] = useState(true);

  // Sprawdzenie czy update miast dotyczy danego komponentu
  const [allowUpdateCities, setAllowUpdateCities] = useState(true);

  // Flaga czy ma być pokazywana odległość w kilometrach po podaniu miasta
  const [showDistance, setShowDistance] = useState(true);

  // Załadowanie województw do rozwijanej listy
  useEffect(() => {
    if (provinces !== null) {
      let provinceSearchList = document.getElementById("provinceSearchList");
      let str = "";

      for (var i = 0; i < provinces.length; i++) {
        str += `<option value="${provinces[i].name}" />`;
      }

      provinceSearchList.innerHTML = str;
    }
  }, [provinces]);

  //Jeżeli województwo zostanie zmienione to pobranie nowej listy miast
  useEffect(() => {
    if (listCity.province == locationInput.province) {
      document.getElementById("citySearchList").innerHTML = listCity.data;
    } else {
      document.getElementById("citySearchList").innerHTML = "";
    }

    if (
      selectedProvince !== null &&
      listCity.province !== locationInput.province &&
      endProvider
    ) {
      setAllowUpdateCities(true);
      dispatch(data_cities(xcsrftoken, selectedProvince));
    }
  }, [selectedProvince]);

  //  Załadowanie miast do rozwijanej listy
  useEffect(() => {
    if (
      cities !== null &&
      cities !== undefined &&
      (allowUpdateCities || (!allowUpdateCities && checkCities))
    ) {
      setCityState(cities);
      setAllowUpdateCities(false);
      let str = "";
      for (var i = 0; i < cities.length; i++) {
        str += `<option value="${cities[i].name}" />`;
      }

      setListCity({
        province: locationInput.province,
        data: str,
      });

      document.getElementById("citySearchList").innerHTML = str;
    }
  }, [cities]);

  // Sprawdzanie czy województwo znajduje się w pobranej liście z województwami oraz czyszczenie inputu miasta
  function checkProvince(temp) {
    // document.getElementById("distanceSearchDiv").classList.add("hidden");
    setShowDistance(false);
    setLocationInput({ ...locationInput, city: "" });
    document.getElementById("citySearchInput").value = "";
    document.getElementById("cityWarning").classList.add("invisible");
    if (temp.length == 0) {
      setSelectedProvince(null);
      setValidated(true);
      document.getElementById("provinceWarning").classList.add("invisible");
      return;
    }

    for (var key in provinces) {
      if (provinces[key].name == temp) {
        setSelectedProvince(provinces[key].id);
        setValidated(true);
        document.getElementById("provinceWarning").classList.add("invisible");
        return;
      }
    }
    setSelectedProvince(null);
    setValidated(false);
    document.getElementById("provinceWarning").classList.remove("invisible");
  }

  // Sprawdzanie czy miasto znajduje się w pobranej liście z województwami
  function checkCity(temp) {
    // document.getElementById("distanceSearchDiv").classList.add("hidden");
    setShowDistance(false);
    if (temp.length == 0) {
      document.getElementById("cityWarning").classList.add("invisible");
      setValidated(true);
      return;
    }

    for (var key in cityState) {
      if (cityState[key].name == temp || temp.length == 0) {
        let name = provinces.filter(
          (province) => province.id == selectedProvince
        );

        if (name[0].name == locationInput.province) {
          setShowDistance(true);
          document.getElementById("cityWarning").classList.add("invisible");
          setValidated(true);
          return;
        }
      }
    }
    document.getElementById("cityWarning").classList.remove("invisible");
    setValidated(false);
  }

  // Walidacja danych
  function validator(name, value) {
    if (name == "province") {
      checkProvince(value);
    } else if (name == "city") {
      checkCity(value);
    }
  }

  // Handler dla inputów
  function handleInputLocationChange(e) {
    validator(e.target.name, e.target.value);
    setLocationInput({ ...locationInput, [e.target.name]: e.target.value });
  }

  // Potwierdzenie formularza
  function handleSubmit(e) {
    e.preventDefault();
    if (validated) {
      let params = {};
      if (document.getElementById("nameSearchInput").value !== "") {
        params["name"] = document.getElementById("nameSearchInput").value;
      }
      if (document.getElementById("provinceSearchInput").value !== "") {
        params["province"] = document.getElementById(
          "provinceSearchInput"
        ).value;
      }
      if (document.getElementById("citySearchInput").value !== "") {
        params["city"] = document.getElementById("citySearchInput").value;
      }
      if (
        document.getElementById("distanceSearchInput") !== null &&
        document.getElementById("distanceSearchInput").value !== "" &&
        document.getElementById("distanceSearchInput").value !== "0"
      ) {
        params["distance"] = document.getElementById(
          "distanceSearchInput"
        ).value;
      }

      const urlParams = new URLSearchParams(params).toString();

      history(`/events_list?${urlParams}`);
    }
  }

  return (
    <div className="flex h-[120px] w-full  pt-8  md:w-[550px] md:px-2 md:pt-16 lg:w-[750px] xl:w-[1000px] xl:pl-12 2xl:w-[1250px]">
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className={`flex ${
          showDistance ? "h-[168px]" : "h-[126px]"
        } w-full flex-row divide-x  divide-gray-900 rounded-[30px] bg-gradient-to-br from-orange-400 via-orange-400 to-orange-50 outline outline-2 outline-offset-2 outline-gray-900 md:h-[112px] xl:h-[56px]`}
      >
        <div className="flex grow flex-col divide-y divide-gray-900 xl:flex-row xl:divide-y-0 xl:divide-x">
          <div
            className={`flex h-[42px] grow md:h-full md:w-[440px] lg:w-[640px] ${
              showDistance
                ? "xl:w-[300px] 2xl:w-[450px]"
                : "xl:w-[395px] 2xl:w-[549px]"
            }`}
          >
            <div className="flex h-full items-center justify-center pl-4">
              <SearchIcon className="h-6 w-6 shrink-0 text-gray-900" />
            </div>
            <div className="flex h-full w-full">
              <input
                type="text"
                name="name"
                className="w-full border-0 bg-transparent font-mukta text-base   text-gray-900 focus:ring-0 md:text-sm lg:text-lg"
                id="nameSearchInput"
              ></input>
            </div>
          </div>

          <div className="flex h-[126px]  flex-col divide-y divide-gray-900 md:h-[56px] md:flex-row md:divide-x md:divide-y-0">
            <div
              className={`flex grow flex-row divide-x divide-gray-900 md:h-full md:divide-x-0
               ${
                 showDistance
                   ? "md:w-[290px] lg:w-[450px] xl:w-[350px] 2xl:w-[450px]"
                   : "md:w-[460px] lg:w-[640px] xl:w-[445px] 2xl:w-[549px]"
               }`}
            >
              <div className="flex h-full w-[50px] shrink-0 items-center justify-center">
                <LocationMarkerIcon className="ml-2 block h-6 w-6 text-gray-900"></LocationMarkerIcon>
              </div>

              <div className="flex w-full flex-col md:flex-row">
                <div className="flex h-[42px] w-full  flex-col md:h-[56px]  md:w-1/2">
                  <input
                    type="text"
                    name="province"
                    list="provinceSearchList"
                    defaultValue={locationInput.province}
                    onChange={handleInputLocationChange}
                    placeholder="Województwo"
                    className="h-full w-full border-0 bg-transparent font-mukta text-base text-gray-900 focus:ring-0 md:pt-4 md:text-sm  lg:pt-3 lg:text-lg"
                    id="provinceSearchInput"
                  />
                  <datalist id="provinceSearchList"></datalist>

                  <div
                    className="invisible mt-3 flex flex-col"
                    id="provinceWarning"
                  >
                    <div className="ml-3 w-[1px] border-x-8 border-b-8 border-t-0 border-solid border-x-transparent  border-b-red-900"></div>
                    <div className="flex h-[95px] w-4/5 rounded-md bg-red-900 pt-5">
                      <p className="px-3 text-center font-mukta text-sm text-white">
                        Opcjonalnie podaj poprawne województwo lub pozostaw
                        puste
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex h-[42px] w-full flex-col md:h-[56px]  md:w-1/2">
                  <input
                    type="text"
                    name="city"
                    list="citySearchList"
                    defaultValue={locationInput.city}
                    onChange={handleInputLocationChange}
                    placeholder="Miasto"
                    className="h-full w-full border-0 bg-transparent font-mukta text-base text-gray-900 focus:ring-0 md:pt-4 md:text-sm lg:pt-3 lg:text-lg"
                    id="citySearchInput"
                  />
                  <datalist id="citySearchList"></datalist>
                  <div
                    className="invisible mt-3 flex flex-col"
                    id="cityWarning"
                  >
                    <div className="ml-3 w-[1px] border-x-8 border-b-8 border-t-0 border-solid border-x-transparent border-b-red-900"></div>
                    <div className="flex h-[95px] w-4/5 rounded-md bg-red-900 pt-5">
                      <p className="px-2 text-center font-mukta text-sm text-white">
                        Opcjonalnie podaj poprawne miasto lub pozostaw puste
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showDistance && (
              <div
                className="flex grow flex-row items-center pl-8 md:w-[150px] md:px-3 lg:w-[190px]"
                id="distanceSearchDiv"
              >
                <p className="text-center font-mukta text-base text-gray-900 md:text-sm lg:text-lg">
                  Dystans
                </p>
                <input
                  type="number"
                  name="distance"
                  placeholder={0}
                  defaultValue={0}
                  min="0"
                  max="300"
                  className="mb-1 h-[42px] w-[70px] border-0 bg-transparent pt-3 font-mukta text-base text-gray-900 placeholder-gray-900 focus:ring-0 md:h-[56px] md:w-2/3 md:text-sm lg:text-lg"
                  id="distanceSearchInput"
                />
                <p className="text-center font-mukta text-base text-gray-900 lg:text-lg">
                  km
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-[110px] justify-center">
          <button type="submit" value="Submit" disabled={!validated}>
            <p className="text-xs font-bold text-gray-900 md:text-sm">SZUKAJ</p>
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventBrowser;
