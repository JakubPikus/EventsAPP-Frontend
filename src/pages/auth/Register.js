import React, { useEffect } from "react";
import useRegisterAuth from "../../hooks/useRegisterAuth";
import { useDispatch } from "react-redux";
import { data_cities } from "../../actions/auth";

function Register() {
  const [
    handleInputChange, //zmiana inputow
    handleSubmit, //confirm form
    checkForm, //validacja ikonka
    validated, //jesli wszystko poprawne -> unlocked submit
    selectedProvince, // wybrane wojewodztwo
    formErrorStill, // przypadek do czyszczenia miasta przy zmianie wojewodztwa
    provinces, //wojewodztwa GIT
    cities, //miasta GIT
  ] = useRegisterAuth();
  const dispatch = useDispatch();

  //ŁADOWANIE WOJEWODZTW
  useEffect(() => {
    if (provinces !== null) {
      let provinceList = document.getElementById("provinceList");
      let str = "";

      for (var i = 0; i < provinces.length; i++) {
        str += `<option value="${provinces[i].name}" />`;
      }

      provinceList.innerHTML = str;
    }
  }, [provinces]);

  //POBIERANIE MIAST DO WOJEWODZTWA
  useEffect(() => {
    document.getElementById("cityInput").value = "";
    document.getElementById("cityList").innerHTML = "";
    formErrorStill("city");
    if (selectedProvince !== null) {
      dispatch(data_cities("", selectedProvince));
    }
  }, [selectedProvince]);

  //ŁADOWANIE LISTY MIAST DO WOJEWODZTWA
  useEffect(() => {
    if (cities !== null && cities !== undefined) {
      let str = "";
      for (var i = 0; i < cities.length; i++) {
        str += `<option value="${cities[i].name}" />`;
      }
      document.getElementById("cityList").innerHTML = str;
    }
  }, [cities]);

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="mt-16 flex h-3/4 w-[350px] flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-2xl sm:w-[400px] md:w-[700px]">
        <div className="flex h-10 w-full shrink-0 items-center rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
          <span className="text-xl text-white">Zarejestruj się</span>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex h-full w-full flex-col justify-between py-8"
        >
          <div className="flex flex-col space-y-1 overflow-y-auto px-16 pb-3">
            <div className="flex flex-row flex-wrap items-center justify-between space-y-5 space-x-0 md:flex-nowrap md:space-y-0 md:space-x-10 small:space-y-1">
              <div className="flex h-[100px] w-full flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleInputChange}
                  className="h-10 rounded-md text-sm"
                />
                {checkForm("username")}
              </div>
              <div className="flex h-[100px] w-full  flex-col space-y-1">
                <label className="text-sm font-bold text-white" htmlFor="email">
                  Email
                </label>

                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleInputChange}
                  className="h-10 rounded-md text-sm"
                />
                {checkForm("email")}
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label
                className="text-sm font-bold text-white"
                htmlFor="password"
              >
                Hasło
              </label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Hasło"
                onChange={handleInputChange}
                className="h-10 rounded-md text-sm"
              />
            </div>
            <div className="flex h-[100px] flex-col space-y-1 small:pt-1">
              <label
                className="text-sm font-bold text-white"
                htmlFor="re_password"
              >
                Powtórz hasło
              </label>

              <input
                type="password"
                autoComplete="off"
                name="re_password"
                placeholder="Powtórz hasło"
                onChange={handleInputChange}
                className="h-10 rounded-md text-sm"
              />
              {checkForm("password")}
            </div>

            <div className="flex h-[100px] flex-col space-y-1 small:pt-2">
              <label
                className="text-sm font-bold text-white"
                htmlFor="first_name"
              >
                Imie
              </label>

              <input
                type="text"
                name="first_name"
                placeholder="Imie"
                onChange={handleInputChange}
                className="h-10 rounded-md text-sm"
              />
              {checkForm("first_name")}
            </div>

            <div className="flex h-[110px] flex-col space-y-1">
              <label
                className="text-sm font-bold text-white"
                htmlFor="last_name"
              >
                Nazwisko
              </label>

              <input
                type="text"
                name="last_name"
                placeholder="Nazwisko"
                onChange={handleInputChange}
                className="h-10 rounded-md text-sm"
              />
              {checkForm("last_name")}
            </div>

            <div className="flex flex-row flex-wrap items-center justify-between space-y-5 space-x-0 md:flex-nowrap md:space-y-0 md:space-x-10 small:space-y-1">
              <div className="flex h-[100px] w-full flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="province"
                >
                  Województwo
                </label>
                <input
                  type="text"
                  list="provinceList"
                  name="province"
                  placeholder="Województwo"
                  onChange={handleInputChange}
                  className="h-10 rounded-md text-sm"
                  id="provinceInput"
                />
                <datalist id="provinceList"></datalist>
                {checkForm("province")}
              </div>
              <div className="flex h-[100px] w-full  flex-col space-y-1">
                <label className="text-sm font-bold text-white" htmlFor="city">
                  Miasto
                </label>

                <input
                  type="text"
                  list="cityList"
                  name="city"
                  placeholder="Miasto"
                  onChange={handleInputChange}
                  className="h-10 rounded-md text-sm"
                  id="cityInput"
                />
                <datalist id="cityList"></datalist>
                {checkForm("city")}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <button
              disabled={!validated}
              type="submit"
              aria-label="Zarejestruj się"
              value="Submit"
              className="mt-3 w-1/2 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-red-500/30 focus:outline-none focus:ring-4 focus:ring-blue-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none "
            >
              Zarejestruj się
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
