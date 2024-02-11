import React from "react";
import { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { data_cities } from "../../actions/auth";
import { getCities } from "../../selectors";
import useNewEvent from "../../hooks/useNewEvent";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import "moment/locale/pl";

moment.locale("pl");

function NewEventPage({
  categorys,
  provinces,
  series,
  xcsrftoken,
  endProvider,
}) {
  const [
    formErrorStill,
    handleSubmit,
    checkForm,
    validated,
    valueInput,
    setValueInput,
    handleValueChange,
    handleValueDatepickerChange,
    imagesUploadModule,
    scheduleModule,
  ] = useNewEvent();
  const history = useNavigate();
  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const currentDate = new Date();
  const yesterdayDate = new Date(currentDate);
  yesterdayDate.setDate(currentDate.getDate() - 1);

  useEffect(() => {
    if (categorys !== null) {
      let categoriesOptions = document.getElementById(
        "categoriesNewEventSelect"
      );
      for (var i = 0; i < categorys.length; i++) {
        categoriesOptions.innerHTML += `<option class="text-black" value="${categorys[i].type}" > ${categorys[i].type}</option>`;
      }
    }
  }, [categorys]);

  useEffect(() => {
    if (provinces !== null) {
      let provincesOptions = document.getElementById("provincesNewEventSelect");
      for (var i = 0; i < provinces.length; i++) {
        provincesOptions.innerHTML += `<option class="text-black" value="${provinces[i].name}" > ${provinces[i].name}</option>`;
      }
    }
  }, [provinces]);

  useEffect(() => {
    if (series !== null) {
      let seriesOptions = document.getElementById("seriesNewEventSelect");
      for (var i = 0; i < series.length; i++) {
        seriesOptions.innerHTML += `<option class="text-black" value="${series[i].name}" > ${series[i].name}</option>`;
      }
    }
  }, [series]);

  useEffect(() => {
    if (valueInput.province !== "") {
      formErrorStill("city");
      const { city, ...rest } = valueInput;
      setValueInput(rest);
      if (valueInput.province !== "Brak") {
        let province_filtred = provinces.filter(
          (province) => province.name == valueInput.province
        );
        dispatch(data_cities(xcsrftoken, province_filtred[0].id));
      } else {
        let citiesOptions = document.getElementById("citiesNewEventSelect");
        citiesOptions.innerHTML = `<option class="text-black" value="Brak">Brak</option>`;
      }
    }
  }, [valueInput.province]);

  useEffect(() => {
    if (endProvider == true && cities !== null && cities !== undefined) {
      let citiesOptions = document.getElementById("citiesNewEventSelect");
      let str = `<option class="text-black" value="Brak">Brak</option>`;
      for (var i = 0; i < cities.length; i++) {
        str += `<option class="text-black" value="${cities[i].name}" > ${cities[i].name}</option>`;
      }
      citiesOptions.innerHTML = str;
    }
  }, [cities]);

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-8`}
      >
        <form
          autoComplete="off"
          onSubmit={handleSubmit}
          className="flex h-auto w-4/5 flex-col space-y-12 pt-12"
        >
          <span className="h-auto font-mukta text-[30px] text-gray-100">
            Dodaj nowe wydarzenie
          </span>
          <div className="flex flex-col pb-20 2xl:flex-row">
            {/* LEWA STRONA */}
            <div
              id="LEWA"
              className="flex h-auto w-full flex-col space-y-12 2xl:w-1/2"
            >
              <div className="flex flex-col space-y-1">
                <label className="font-mukta text-base text-gray-200 xl:text-lg">
                  Nazwa wydarzenia
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={handleValueChange}
                  placeholder="Podaj nazwę wydarzenia"
                  className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base 2xl:w-2/3"
                ></input>
                {checkForm("title")}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-mukta text-base text-gray-200 xl:text-lg">
                  Seria wydarzeń (opcjonalnie*)
                </label>
                <div className="flex flex-row items-center space-x-2">
                  <select
                    id="seriesNewEventSelect"
                    name="series"
                    onChange={handleValueChange}
                    className="w-full rounded-md border-2 border-blue-400 bg-transparent  font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base 2xl:w-2/3"
                  >
                    <option className="font-mukta text-black" value="Brak">
                      Brak
                    </option>
                  </select>
                  {/* <PlusIcon className={` h-10 w-10 p-1 text-green-400`}></PlusIcon> */}
                </div>
                <span className="h-auto w-2/3 pb-1 font-mukta text-sm text-gray-300">
                  * Jeżeli tworzysz serię wydarzeń, jak 3-rundowy turniej w
                  szachy w różnych miastach, możesz je połączyć ze sobą dla
                  łatwiejszej nawigacji! Aby dodać nową serię, przejdź w "Twoje
                  serie wydarzeń" z paska menu.
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-mukta text-base text-gray-200 xl:text-lg">
                  Kategoria
                </label>
                <select
                  id="categoriesNewEventSelect"
                  name="category"
                  onChange={handleValueChange}
                  className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base 2xl:w-2/3"
                >
                  <option className="font-mukta text-black" value="Brak">
                    Brak
                  </option>
                </select>
                {checkForm("category")}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-mukta text-base text-gray-200 xl:text-lg">
                  Data wydarzenia
                </label>
                <div className="flex w-full 2xl:w-2/3">
                  <Datepicker
                    asSingle={true}
                    minDate={yesterdayDate}
                    displayFormat={"DD.MM.YYYY"}
                    placeholder={"Brak"}
                    inputClassName="rounded-md border-2 border-blue-400 text-sm xl:text-base bg-transparent text-white font-mukta w-full placeholder-white"
                    value={valueInput}
                    onChange={handleValueDatepickerChange}
                  />
                </div>
                {checkForm("startDate")}
              </div>

              <div className="flex flex-col space-y-1">
                <label className="font-mukta text-base text-gray-200 xl:text-lg">
                  Województwo
                </label>
                <select
                  name="province"
                  id="provincesNewEventSelect"
                  onChange={handleValueChange}
                  className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base 2xl:w-2/3"
                >
                  <option className="font-mukta text-black" value="Brak">
                    Brak
                  </option>
                </select>
                {checkForm("province")}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="font-mukta text-base text-gray-200 xl:text-lg">
                  Miasto
                </label>
                <select
                  name="city"
                  id="citiesNewEventSelect"
                  onChange={handleValueChange}
                  className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base 2xl:w-2/3"
                >
                  <option className="font-mukta text-black" value="Brak">
                    Brak
                  </option>
                </select>
                {checkForm("city")}
              </div>
              <div className="flex flex-col space-y-1">
                <label className="pb-1 font-mukta text-base text-gray-200 xl:text-lg">
                  Opis wydarzenia
                </label>
                <textarea
                  name="text"
                  className="h-96 resize-none rounded-md border-2 border-blue-400 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0 xl:text-base 2xl:w-2/3"
                  placeholder={`Opisz wydarzenie.`}
                  maxLength="1500"
                  onChange={handleValueChange}
                ></textarea>

                <div className="flex w-full flex-row justify-between 2xl:w-2/3">
                  {checkForm("text")}

                  <span
                    className={`${
                      valueInput.text.length < 50 ||
                      valueInput.text.length > 1475
                        ? "text-red-500"
                        : "text-gray-500"
                    } font-mukta text-sm`}
                  >
                    {`${valueInput.text.length} / 1500`}
                  </span>
                </div>
              </div>
            </div>
            {/* PRAWA STRONA */}
            <div
              id="PRAWA"
              className="flex h-auto w-full flex-col space-y-12 2xl:w-1/2"
            >
              <div className="flex w-full flex-col space-y-1">
                <label className="font-mukta text-base text-gray-200 xl:text-lg">
                  Zdjęcia
                </label>
                <span className="h-auto w-2/3 font-mukta text-sm text-gray-300">
                  Pierwsze zdjęcie zostanie przypisane jako zdjęcie główne.
                  Przeciągnij zdjęcia według swojej preferowanej kolejności
                  wyświetlania.
                </span>
                <div className="flex h-auto w-full flex-wrap items-center justify-center gap-4 pb-3 pt-8">
                  {imagesUploadModule()}
                </div>
                {checkForm("image")}
              </div>
              <div className="flex w-full flex-col space-y-1">
                <label className="font-mukta text-base text-gray-200 xl:text-lg">
                  Harmonogram
                </label>
                <div className="flex h-auto w-full justify-center rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 xl:text-base ">
                  {scheduleModule()}
                </div>
                <div className="flex flex-col space-y-2">
                  {checkForm("schedule")}
                  <span className="h-auto w-2/3 pb-1 font-mukta text-sm text-gray-300">
                    *opcjonalnie możesz dodać godzinę zakończenia planowanej
                    atrakcji. Każde z atrakcji powinno zajmować minimum 5 min,
                    gdy określony jest czas jej zakończenia.
                  </span>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  disabled={!validated}
                  type="submit"
                  value="Submit"
                  className="w-[150px] rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
                >
                  Stwórz wydarzenie
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Dashboard>
  );
}

export default NewEventPage;
