import React from "react";
import { useEffect, useState } from "react";
import Event from "./Event";
import { useDispatch, useSelector } from "react-redux";
import { Scrollbars } from "react-custom-scrollbars-2";
import InfiniteScroll from "react-infinite-scroll-component";
import { getEventsHomescreen } from "../selectors";
import { events_homescreen_next } from "../actions/data";
import { change_user_location, data_cities } from "../actions/auth";
import { CheckIcon } from "@heroicons/react/solid";
import { RotatingLines } from "react-loader-spinner";

function EventList({
  user,
  xcsrftoken,
  checkLocalization,
  provinces,
  cities,
  eventsHomescreen,
  endProvider,
  checkCities,
}) {
  const dispatch = useDispatch();
  const data_homescreen = useSelector(getEventsHomescreen);

  //Lista eventów do odbierania paginacji
  const [events, setEvents] = useState({
    location: "",
    popular: "",
    random: "",
  });

  //Dane do dalszego fetchowania eventów
  const [meta, setMeta] = useState({
    count: "",
    links: {
      next: "",
      previous: "",
    },
  });

  //Aktywny event
  const [activeEvent, setActiveEvent] = useState({
    index: 0,
    category: "popular",
  });

  //Aktywna kategoria listy eventów
  const [activeCategoryList, setActiveCategoryList] = useState("popular");

  //Poziom scrolla dla każdej z kategorii
  const [scrollValue, setScrollValue] = useState({
    popular: 0,
    location: 0,
    random: 0,
  });

  //Kategorie
  let initListCategory = {
    popular: "Popularne",
    location: "Najbliżej",
    random: "Losowe",
  };

  //Fetchowanie eventów do listy po paginacji
  useEffect(() => {
    if (eventsHomescreen.data !== null && eventsHomescreen.meta !== null) {
      setEvents((prevState) => ({
        ...prevState,
        location: [...prevState.location, ...eventsHomescreen.data.location],
        popular: [...prevState.popular, ...eventsHomescreen.data.popular],
        random: [...prevState.random, ...eventsHomescreen.data.random],
      }));

      setMeta(eventsHomescreen.meta);
    }
  }, [eventsHomescreen]);

  // Zmiana kategorii
  function categoryChange(category) {
    setScrollValue({
      ...scrollValue,
      [activeCategoryList]: document.getElementById("scrollableDiv").scrollTop,
    });
    setActiveCategoryList(category);
    document.getElementById("scrollableDiv").scrollTop = scrollValue[category];
  }

  // Podświetlenie wybranego eventu
  function checkClickedEvent(event, index) {
    if (
      activeEvent.category === activeCategoryList &&
      activeEvent.index === index
    ) {
      return <Event props={event} role="Helper Clicked" />;
    } else {
      return <Event props={event} role="Helper" />;
    }
  }

  // Informacja czy "koniec" dla InfinityLoop
  function infiniteHasMore() {
    if (meta.links.next === null) {
      return false;
    }
    return true;
  }
  // Pobranie kolejnych eventów przez InfinityLoop
  function infiniteLoadEvents() {
    dispatch(events_homescreen_next(meta.links.next));
  }

  /////////////////////////////////////////////////////////////////////////

  //Handler dla inputów
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
  const [validated, setValidated] = useState(false);

  // Sprawdzenie czy update miast dotyczy danego komponentu
  const [allowUpdateCities, setAllowUpdateCities] = useState(true);

  // Załadowanie województw do rozwijanej listy
  useEffect(() => {
    if (provinces !== null) {
      let provinceEventList = document.getElementById("provinceEventList");
      let str = "";

      for (var i = 0; i < provinces.length; i++) {
        str += `<option value="${provinces[i].name}" />`;
      }

      provinceEventList.innerHTML = str;
    }
  }, [provinces]);

  // Jeżeli województwo zostanie zmienione to pobranie nowej listy miast
  useEffect(() => {
    if (listCity.province == locationInput.province) {
      document.getElementById("cityEventList").innerHTML = listCity.data;
    } else {
      document.getElementById("cityEventList").innerHTML = "";
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
      document.getElementById("cityEventList").innerHTML = str;
    }
  }, [cities]);

  // Sprawdzanie czy województwo znajduje się w pobranej liście z województwami  oraz czyszczenie inputu miasta
  function checkProvince(temp) {
    setLocationInput({ ...locationInput, city: "" });
    document.getElementById("cityListInput").value = "";
    for (var key in provinces) {
      if (provinces[key].name == temp) {
        setSelectedProvince(provinces[key].id);
        return;
      }
    }
    setSelectedProvince(null);
    setValidated(false);
  }
  // Sprawdzanie czy miasto znajduje się w pobranej liście z województwami
  function checkCity(temp) {
    for (var key in cityState) {
      if (temp == cityState[key].name && temp !== user.city.name) {
        let name = provinces.filter(
          (province) => province.id == selectedProvince
        );

        if (name[0].name == locationInput.province) {
          setValidated(true);
          return;
        }
      }
    }
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
  function handleLocationSubmit(e) {
    e.preventDefault();
    if (validated) {
      dispatch(change_user_location(xcsrftoken, locationInput));
    }
  }

  function checkForm() {
    {
      return validated ? (
        <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
      ) : (
        <div className="flex h-8 w-8"></div>
      );
    }
  }

  useEffect(() => {
    setValidated(false);
    setLocationInput({
      province: user.city.county.province.name,
      city: user.city.name,
    });
  }, [user]);

  ///////////////////////////////////////////////////////////////

  function checkNewLocalization() {
    if (checkLocalization !== null && checkLocalization.id !== user.city.id) {
      return (
        <p className="pb-1 font-mukta text-[10px] text-white sm:text-[12px]">
          {`Wykryto nową lokalizację "${checkLocalization.name}". `}
          <button
            className="text-red-500"
            onClick={() => {
              dispatch(change_user_location(xcsrftoken, checkLocalization));
            }}
          >
            Wciśnij
          </button>
          {` aby zaktualizować.`}
        </p>
      );
    }
  }

  return (
    <div className="flex w-full py-8">
      <div className="flex h-[800px] w-full items-center justify-center xl:h-[550px]">
        <div className="flex h-full w-7/10 flex-col xl:flex-row">
          <div className="flex h-full w-full items-center justify-center rounded-t-3xl bg-gradient-to-tr from-gray-800 via-gray-700 to-gray-700 xl:rounded-l-3xl  xl:rounded-tr-none">
            {events[activeEvent.category].length > 0 ? (
              <Event
                props={events[activeEvent.category][activeEvent.index]}
                role="Main"
              />
            ) : (
              <span className="text-center font-mukta text-2xl text-white">
                Brak wydarzeń
              </span>
            )}
          </div>
          <div className=" flex h-full w-full flex-col rounded-r-md xl:w-[500px]">
            <div className="flex h-14 w-full flex-row rounded-tr-md">
              {Object.keys(initListCategory).map((category, index) => (
                <div
                  className={`${
                    activeCategoryList === category
                      ? "bg-zinc-500"
                      : "cursor-pointer bg-zinc-800 hover:bg-zinc-700"
                  } flex h-full w-1/3 items-center justify-center drop-shadow-2xl`}
                  onClick={() => {
                    categoryChange(category);
                  }}
                  key={index}
                >
                  <p className="font-mukta text-[11px] text-white sm:text-base">
                    {initListCategory[category]}
                  </p>
                </div>
              ))}
            </div>

            {data_homescreen.data == null ? (
              <div
                className="flex h-full w-full items-center justify-center"
                style={{ backgroundColor: "#1a181b" }}
              >
                <RotatingLines
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  width="48"
                  visible={true}
                />
              </div>
            ) : (
              <Scrollbars
                renderThumbVertical={({ style, props }) => (
                  <div
                    {...props}
                    style={{
                      ...style,
                      backgroundColor: "#000",
                      width: "4px",
                      opacity: "0.6",
                    }}
                  ></div>
                )}
                renderView={({ style, props }) => (
                  <div
                    {...props}
                    style={{ ...style, backgroundColor: "#1a181b" }}
                    id="scrollableDiv"
                  ></div>
                )}
              >
                <InfiniteScroll
                  dataLength={events.popular.length}
                  next={() => infiniteLoadEvents()}
                  hasMore={infiniteHasMore()}
                  scrollableTarget="scrollableDiv"
                >
                  <div className="flex h-full flex-col divide-y divide-zinc-500 border-b border-zinc-500">
                    {endProvider &&
                      events[activeCategoryList].map((event, index) => (
                        <div
                          className="flex w-full"
                          key={event.id}
                          onClick={() => {
                            setActiveEvent({
                              index: index,
                              category: activeCategoryList,
                            });
                          }}
                        >
                          {checkClickedEvent(event, index)}
                        </div>
                      ))}
                  </div>
                </InfiniteScroll>
              </Scrollbars>
            )}
            <div className="flex h-40 w-full flex-col bg-zinc-800 py-1.5 px-2 md:h-24">
              <form
                className={`flex  ${
                  checkLocalization !== null &&
                  checkLocalization.id !== user.city.id
                    ? "h-2/3 md:h-1/2"
                    : "h-full"
                } w-full flex-row items-center justify-between px-2 md:px-8 xl:px-0`}
                onSubmit={handleLocationSubmit}
              >
                <div className="flex flex-row items-center space-x-1 sm:space-x-2">
                  <div className="flex flex-col gap-2 md:flex-row">
                    <input
                      type="text"
                      list="provinceEventList"
                      name="province"
                      placeholder="Województwo"
                      value={locationInput.province}
                      onChange={handleInputLocationChange}
                      className="h-7 w-28 rounded-md text-[10px]  sm:w-40 sm:text-xs xl:w-28"
                      id="provinceListInput"
                      required
                    />
                    <datalist id="provinceEventList"></datalist>

                    <input
                      type="text"
                      list="cityEventList"
                      name="city"
                      placeholder="Miasto"
                      value={locationInput.city}
                      onChange={handleInputLocationChange}
                      className="h-7 w-28 rounded-md text-[10px]  sm:w-40 sm:text-xs xl:w-28"
                      id="cityListInput"
                      required
                    />
                    <datalist id="cityEventList"></datalist>
                  </div>
                  {checkForm()}
                </div>

                <button
                  type="submit"
                  value="Submit"
                  disabled={!validated}
                  className="z-20 w-[140px]  rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-1 px-1 text-center text-[10px] font-medium text-white shadow-lg shadow-red-500/30 focus:outline-none focus:ring-4 focus:ring-blue-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none sm:text-sm xl:w-[100px] "
                >
                  {locationInput.province !== user.city.county.province.name ||
                  locationInput.city !== user.city.name
                    ? "Zmień"
                    : "Aktualne"}
                </button>
              </form>

              <div
                className={`flex ${
                  checkLocalization !== null &&
                  checkLocalization.id !== user.city.id &&
                  "h-1/3 md:h-1/2"
                } flex-row items-center py-1 px-8 xl:px-0`}
              >
                {checkNewLocalization()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventList;
