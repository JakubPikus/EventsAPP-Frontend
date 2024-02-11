import React from "react";
import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import Datepicker from "react-tailwindcss-datepicker";
import { data_cities } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/pl";
import useEventsFindPage from "../../hooks/useEventsFindPage";
moment.locale("pl");

const currentDate = new Date();
const yesterdayDate = new Date(currentDate);
yesterdayDate.setDate(currentDate.getDate() - 1);

function EventsFindPage({
  values,
  eventList,
  categorys,
  provinces,
  cities,
  endProvider,
  xcsrftoken,
}) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [
    activePage,
    setActivePage,
    valueInput,
    setValueInput,
    nextPageNavigation,
    handleValueChange,
    handleValueDatepickerChange,
    handleSubmit,
    eventTemplate,
  ] = useEventsFindPage();

  // USTAWIANIE AKTYWNEJ STRONY ORAZ ŁADOWANIE DANYCH Z GET'A DO DEFAULT W FORMSIE
  useEffect(() => {
    // ZOSTAJE
    if (values !== null) {
      if (values.page == undefined) {
        setActivePage(1);
      } else {
        setActivePage(parseInt(values.page));
      }

      setValueInput(values);
      // TUTAJ WARTOSCI Z VALUE WKLEJAM DO USESTATE ABY OMINAC CIAGLE POBIERANIE TYCH SAMYCH DANYCH
    }
  }, [values]);

  // ZAŁADOWANIE KATEGORII DO SELECTA ORAZ ZAZNACZENIE AKTUALNEGO SZUKANEGO (DOBRZE)
  useEffect(() => {
    if (categorys !== null) {
      let categoriesOptions = document.getElementById(
        "categoriesEventsListSelect"
      );
      let str;
      //
      //ŁADOWANIE KATEGORI DO ROZWIJANEJ LISTY
      //
      //JEŻELI JEST WYBRANA JAKAŚ KATEGORIA, TO DAJ MU ATRYBUT SELECTED
      if (valueInput?.category !== undefined) {
        str = `<option class="text-black" value="Wszystko">Wszystko</option>`;
        for (var i = 0; i < categorys.length; i++) {
          if (valueInput?.category == categorys[i].type) {
            str += `<option class="text-black" value="${categorys[i].type}" > ${categorys[i].type}</option>`;
          } else {
            str += `<option class="text-black" value="${categorys[i].type}" > ${categorys[i].type}</option>`;
          }
        }
      }
      //JEŻELI NIE MA WYBRANEJ KATEGORI, DAJ ATRYBUT SELECTED "WSZYSTKO"
      else {
        str = `<option class="text-black" value="Wszystko">Wszystko</option>`;
        for (var i = 0; i < categorys.length; i++) {
          str += `<option class="text-black" value="${categorys[i].type}" > ${categorys[i].type}</option>`;
        }
      }

      categoriesOptions.innerHTML = str;
    }
  }, [categorys]);

  // ZAŁADOWANIE WOJEWÓDZTW DO SELECTA ORAZ ZAZNACZENIE AKTUALNEGO SZUKANEGO (DOBRZE)
  useEffect(() => {
    if (provinces !== null) {
      let provincesOptions = document.getElementById(
        "provincesEventsListSelect"
      );
      let str;

      //
      //ŁADOWANIE WOJEWODZTW DO ROZWIJANEJ LISTY
      //
      //JEŻELI JEST WYBRANE JAKIEŚ WOJEWODZTWO, TO DAJ MU ATRYBUT SELECTED

      if (valueInput?.province !== undefined) {
        str = `<option class="text-black" value="Wszystko">Wszystko</option>`;
        for (var i = 0; i < provinces.length; i++) {
          if (valueInput?.province == provinces[i].name) {
            str += `<option class="text-black" value="${provinces[i].name}" > ${provinces[i].name}</option>`;
          } else {
            str += `<option class="text-black" value="${provinces[i].name}" > ${provinces[i].name}</option>`;
          }
        }
      }
      //JEŻELI NIE MA WYBRANEGO WOJEWODZTWA, DAJ ATRYBUT SELECTED "WSZYSTKO"
      else {
        str = `<option class="text-black" value="Wszystko">Wszystko</option>`;
        for (var i = 0; i < provinces.length; i++) {
          str += `<option class="text-black" value="${provinces[i].name}" > ${provinces[i].name}</option>`;
        }
      }

      provincesOptions.innerHTML = str;
    }
  }, [provinces]);

  //JEŻELI WOJEWÓDZTWO SIĘ ZMIENI - USUŃ Z INPUTU STARE MIASTO DYSTANS ORAZ SORTOWANIE, PÓŹNIEJ POBIERZ NOWĄ LISTĘ MIAST (DOBRZE)
  useEffect(() => {
    if (endProvider && valueInput?.province !== undefined) {
      //USUŃ Z INPUTU STARE MIASTO DYSTANS ORAZ SORTOWANIE
      const { city, distance, ordering, ...rest } = valueInput;
      setValueInput(rest);
      let distanceOptions = document.getElementById("distanceEventsListInput");
      distanceOptions.value = 0;

      //JEŻELI ZMIANA WOJEWODZTWA NA DOWOLNE, TO USUN LISTE MIAST Z FRONTU ORAZ WYBRANY DYSTANS
      if (valueInput?.province == "Wszystko") {
        let citiesOptions = document.getElementById("citiesEventsListSelect");
        citiesOptions.innerHTML = `<option class="text-black" value="Wszystko">Wszystko</option>`;
      }
      //W INNYM PRZYPADKU POBIERZ ID WYBRANEGO WOJEWODZTWA I SCIAGNIJ PRZYPISANE DO NIEGO MIASTA
      //W INNYM PRZYPADKU SPRAWDZ CZY PRZYPISANE MIASTA DO WOJEWÓDZTWA ISTNIEJĄ W MAGAZYNIE REDUX, JESLI NIE TO POBIERZ
      else {
        let province_filtred = provinces.filter(
          (province) => province.name == valueInput?.province
        );
        dispatch(data_cities(xcsrftoken, province_filtred[0].id));
      }
    }
  }, [valueInput?.province]);

  // JEŻELI MIASTO SIĘ ZMIENI NA "WSZYSTKO" - USUŃ Z INPUTU STARY DYSTANS ORAZ SORTOWANIE
  useEffect(() => {
    if (endProvider && valueInput?.city == "Wszystko") {
      const { distance, ordering, ...rest } = valueInput;
      setValueInput(rest);
      let distanceOptions = document.getElementById("distanceEventsListInput");
      distanceOptions.value = 0;
    }
  }, [valueInput?.city]);

  // ZAŁADOWANIE MIAST DO SELECTA ORAZ ZAZNACZENIE AKTUALNEGO SZUKANEGO (DOBRZE)
  useEffect(() => {
    if (cities !== null && cities !== undefined) {
      let citiesOptions = document.getElementById("citiesEventsListSelect");
      let str;

      //
      //ŁADOWANIE MIAST DO ROZWIJANEJ LISTY
      //
      //JEŻELI JEST WYBRANE JAKIEŚ MIASTO, TO DAJ MU ATRYBUT SELECTED

      if (valueInput?.city !== undefined) {
        str = `<option class="text-black" value="Wszystko">Wszystko</option>`;
        for (var i = 0; i < cities.length; i++) {
          if (valueInput?.city == cities[i].name) {
            str += `<option class="text-black" value="${cities[i].name}" > ${cities[i].name}</option>`;
          } else {
            str += `<option class="text-black" value="${cities[i].name}" > ${cities[i].name}</option>`;
          }
        }
      }
      //JEŻELI NIE MA WYBRANEGO MIASTA, DAJ ATRYBUT SELECTED "WSZYSTKO"
      else {
        str = `<option class="text-black" value="Wszystko">Wszystko</option>`;
        for (var i = 0; i < cities.length; i++) {
          str += `<option class="text-black" value="${cities[i].name}" > ${cities[i].name}</option>`;
        }
      }

      citiesOptions.innerHTML = str;
    }
  }, [cities]);

  // JEŻELI UŻYTKOWNIK NIE SZUKA PO DYSTANSIE TO SCHOWAJ FRONT GPS, BO BACK WTEDY ZWRACA DO CITY USERA A NIE SZUKANEGO CITY
  const [showDistance, setShowDistance] = useState(false);
  useEffect(() => {
    if (
      parseInt(valueInput?.distance) !== NaN &&
      parseInt(valueInput?.distance) > 0
    ) {
      setShowDistance(true);
    } else {
      setShowDistance(false);
    }
  }, [eventList]);

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-8`}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex h-auto w-9/10 flex-col space-y-3 text-white sm:space-y-10"
        >
          <div className="flex h-auto w-auto flex-col space-y-1 pt-8">
            <label
              htmlFor="nameEventsListSelect"
              className="font-mukta text-sm sm:hidden lg:text-[15px]"
            >
              Nazwa wydarzenia
            </label>
            <div className="flex w-full flex-row justify-center">
              <input
                type="text"
                id="nameEventsListInput"
                name="name"
                defaultValue={values?.name}
                onChange={handleValueChange}
                placeholder="Podaj nazwę wydarzenia"
                className="w-full rounded-l-md border-2 border-blue-400 bg-transparent font-mukta font-mukta text-sm focus:ring-0 sm:w-2/3 sm:text-lg lg:w-1/2"
              ></input>

              <button
                type="submit"
                value="Submit"
                className="rounded-r-md bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 py-1 px-5 text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-0 focus:ring-sky-800 sm:text-lg"
              >
                <p className="font-mukta text-sm font-bold">Szukaj</p>
              </button>
            </div>
          </div>

          <div className="flex w-full flex-wrap justify-evenly gap-4 sm:gap-8">
            <div className="flex w-full flex-col space-y-1 sm:w-auto">
              <label
                htmlFor="categoriesEventsListSelect"
                className="font-mukta text-sm lg:text-[15px]"
              >
                Kategoria
              </label>
              <select
                id="categoriesEventsListSelect"
                name="category"
                value={valueInput?.category ? valueInput?.category : "Wszystko"}
                onChange={handleValueChange}
                className="min-w-[212px] rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm lg:text-[15px]"
              >
                <option className="font-mukta text-black" value="Wszystko">
                  Wszystko
                </option>
              </select>
            </div>
            <div className="flex w-full flex-col space-y-1 sm:w-auto">
              <label
                htmlFor="provincesEventsListSelect"
                className="font-mukta text-sm lg:text-[15px]"
              >
                Województwo
              </label>
              <select
                id="provincesEventsListSelect"
                name="province"
                value={valueInput?.province ? valueInput?.province : "Wszystko"}
                onChange={handleValueChange}
                className="min-w-[212px] rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm lg:text-[15px]"
              >
                <option className="font-mukta text-black" value="Wszystko">
                  Wszystko
                </option>
              </select>
            </div>
            <div className="flex w-full flex-col space-y-1 sm:w-auto">
              <label
                htmlFor="citiesEventsListSelect"
                className="font-mukta text-sm lg:text-[15px]"
              >
                Miasto
              </label>
              <select
                id="citiesEventsListSelect"
                name="city"
                value={valueInput?.city ? valueInput?.city : "Wszystko"}
                onChange={handleValueChange}
                className="min-w-[212px] rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm lg:text-[15px]"
              >
                <option className="font-mukta text-black" value="Wszystko">
                  Wszystko
                </option>
              </select>
            </div>
            <div className="flex w-full flex-col space-y-1 sm:w-auto">
              <label
                htmlFor="distance"
                className="font-mukta text-sm lg:text-[15px]"
              >
                Dystans
              </label>

              <div className="flex min-w-[212px] flex-row rounded-md border-2 border-blue-400 bg-transparent font-mukta">
                <input
                  type="number"
                  name="distance"
                  placeholder={0}
                  defaultValue={values?.distance}
                  disabled={
                    valueInput?.province == "Wszystko" ||
                    valueInput?.province == undefined ||
                    valueInput?.city == "Wszystko" ||
                    valueInput?.city == undefined
                      ? true
                      : false
                  }
                  onChange={handleValueChange}
                  min="0"
                  max="600"
                  className="grow border-0 bg-transparent font-mukta text-sm placeholder-white focus:ring-0 lg:text-[15px]"
                  id="distanceEventsListInput"
                />

                <p className="mt-2 pr-3 text-center font-mukta text-sm lg:text-[15px]">
                  km
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col space-y-1 sm:w-[212px]">
              <label
                htmlFor="date"
                className="font-mukta text-sm lg:text-[15px]"
              >
                Data
              </label>
              <Datepicker
                placeholder={"Wszystko"}
                minDate={yesterdayDate}
                inputClassName="rounded-md border-2 text-sm lg:text-[15px] border-blue-400 bg-transparent text-white font-mukta w-full placeholder-white"
                containerClassName="relative text-gray-700"
                separator={"do"}
                value={valueInput}
                onChange={handleValueDatepickerChange}
              />
            </div>
            <div className="flex w-full flex-col space-y-1 sm:w-auto">
              <label
                htmlFor="orderingEventsListSelect"
                className="font-mukta text-sm lg:text-[15px]"
              >
                Sortuj
              </label>
              <select
                id="orderingEventsListSelect"
                name="ordering"
                value={valueInput?.ordering}
                onChange={handleValueChange}
                className="min-w-[212px] rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm lg:text-[15px]"
              >
                <option value="newest" className="font-mukta text-black">
                  Od najnowszych
                </option>
                <option value="popularity" className="font-mukta text-black">
                  Od najpopularniejszych
                </option>
                <option value="event_date" className="font-mukta text-black">
                  Od najbliższych czasowo
                </option>
                {parseInt(valueInput?.distance) > 0 && (
                  <option value="location" className="font-mukta text-black">
                    Od lokalizacji
                  </option>
                )}
              </select>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center space-x-2 pt-2 sm:justify-start">
            <span
              className="cursor-pointer text-center font-mukta text-xs text-white underline underline-offset-1 sm:text-sm"
              onClick={() => history("/")}
            >
              Strona główna
            </span>
            <span className="text-center font-mukta text-xs text-white sm:text-sm">
              /
            </span>

            {eventList.meta?.category ? (
              <span className="text-center font-mukta text-xs text-gray-400 sm:text-sm">
                {eventList.meta?.category}
              </span>
            ) : (
              <span className="text-center font-mukta text-xs text-gray-400 sm:text-sm">
                Wszystkie kategorie
              </span>
            )}
          </div>
          <div className="flex flex-col space-y-3 md:flex-row md:items-end md:space-y-0">
            <p className="w-full text-center font-mukta text-2xl font-bold text-white md:text-start">
              Znaleziono {eventList?.meta?.count ? eventList?.meta?.count : 0}{" "}
              wydarzeń.
            </p>
            <div className="flex inline-flex h-12 items-center justify-center -space-x-[2px]">
              {nextPageNavigation(eventList)}
            </div>
          </div>
        </form>
        <div className="flex h-full w-full pt-8 sm:w-9/10 lg:w-5/6">
          {endProvider ? (
            <div className="flex h-auto w-full flex-col justify-between space-y-12">
              <div
                className="flex h-auto w-full flex-wrap items-start justify-center gap-12 "
                id="content"
              >
                {eventList.data !== null && eventList.data.length > 0 ? (
                  eventList.data.map((event) =>
                    eventTemplate(event, showDistance)
                  )
                ) : (
                  <div className="flex h-full w-full items-center justify-center px-4 sm:px-0">
                    <div className="flex h-[200px] max-w-[820px] items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 via-gray-600 to-slate-500 drop-shadow-3xl">
                      <span className="py-3 px-8 text-center font-mukta text-base text-gray-200 md:text-xl">
                        Przejrzałeś już wszystkie możliwe wydarzenia pod swoje
                        filtry.
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex inline-flex h-12 w-full items-center justify-center -space-x-[2px]">
                {nextPageNavigation(eventList)}
              </div>
            </div>
          ) : (
            <div className="flex w-full grow items-center justify-center">
              <RotatingLines
                strokeColor="grey"
                strokeWidth="5"
                animationDuration="0.75"
                width="96"
                visible={true}
              />
            </div>
          )}
        </div>
      </div>
    </Dashboard>
  );
}

export default EventsFindPage;
