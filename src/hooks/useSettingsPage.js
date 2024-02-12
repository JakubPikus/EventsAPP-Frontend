import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CheckIcon,
  ExclamationIcon,
  MinusCircleIcon,
  CheckCircleIcon,
  XIcon,
  RefreshIcon,
} from "@heroicons/react/solid";
import {
  getXCSRFToken,
  getProvinces,
  getCities,
  getUser,
  getSettings,
} from "../selectors";

import { useNavigate, Link } from "react-router-dom";
import ips_config from "../ips_config";
import {
  logout_from_devices,
  unblock_user,
  password_change,
  password_change_confirm,
  generate_new_code,
  email_change,
  email_change_confirm,
  generate_email_new_code,
  set_main_badge,
  bank_number_change,
  bank_number_change_confirm,
} from "../actions/data";
import {
  unlink_google,
  unlink_facebook,
  account_delete,
  change_user_location,
  account_edit,
} from "../actions/auth";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function useSettingsPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const settings = useSelector(getSettings);
  const xcsrftoken = useSelector(getXCSRFToken);
  const cities = useSelector(getCities);
  const provinces = useSelector(getProvinces);

  function renderCategory(category) {
    if (category == "manage") {
      return manageCategory();
    } else if (category == "security") {
      return securityCategory();
    } else {
      return editCategory();
    }
  }

  function checkForm(value, formError) {
    {
      return formError[value] ? (
        <label className="text-[10px] text-white">{formError[value]}</label>
      ) : (
        <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
      );
    }
  }

  function manageCategory() {
    return (
      <div className="flex h-full w-full flex-col divide-y-2 divide-gray-800 overflow-y-auto bg-gray-600 ">
        {socialModule()}
        <div className="flex h-auto w-full flex-col divide-y-2 divide-gray-800 md:flex-row md:divide-y-0 md:divide-x-2">
          {changePasswordModule()}
          {changeEmailModule()}
        </div>
        {bankNumberModule()}
        {deleteAccountModule()}
      </div>
    );
  }

  function editCategory() {
    return (
      <div className="flex h-full w-full flex-col divide-y-2 divide-gray-800 overflow-y-auto bg-gray-600 ">
        {changeProfileModule()}
        {setBadgeModule()}
      </div>
    );
  }

  function securityCategory() {
    return (
      <div className="flex h-5/6 w-full flex-row divide-x-2 divide-gray-800 overflow-hidden rounded-b-xl bg-gray-600">
        {logoutModule()}
        {blockedModule()}
      </div>
    );
  }

  //////////////// USTAWIANIE GŁÓWNEJ ODZNAKI

  function setBadgeModule() {
    return (
      <div className="flex w-full flex-col p-2">
        <span className="h-auto font-mukta text-[19px] text-gray-100">
          Ustawianie głównej odznaki
        </span>
        <div
          className={`flex h-auto w-full flex-wrap gap-3 rounded-xl bg-gray-700 p-3 ${
            settings.badges.length == 0 && " items-center justify-center"
          }`}
        >
          {settings.badges.length > 0 ? (
            settings.badges.map((badge) => (
              <div
                className={`group flex h-[120px] w-[110px] flex-col items-center justify-center rounded-lg border-2 p-4 ease-in-out hover:bg-gray-600 ${
                  badge.main
                    ? "border-blue-400"
                    : "cursor-pointer border-gray-600"
                }`}
                key={badge.id}
                onClick={() => {
                  if (badge.main == false) {
                    dispatch(set_main_badge(badge.id, xcsrftoken));
                  }
                }}
              >
                <div className="flex h-16 w-16">
                  <img
                    src={`${ips_config.BACKEND}${badge.image}`}
                    className="h-16 w-16 rounded-full object-cover transition ease-in-out group-hover:scale-110"
                  ></img>
                </div>

                <div className="flex h-auto items-center">
                  <span className="break-anywhere h-auto  pt-2 text-center font-mukta text-[11px] text-gray-200">
                    {badge.name}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <span className="break-anywhere h-auto py-5 text-center font-mukta text-xl text-gray-200">
              Nie została aktywowana żadna odznaka
            </span>
          )}
        </div>
      </div>
    );
  }

  //////////////// EDYTOWANIE KONTA

  const [disableCheckLocalization, setDisableCheckLocalization] =
    useState(false);
  const [updateCheckLocalization, setUpdateCheckLocalization] = useState(false);
  const [fileIsNotImage, setFileIsNotImage] = useState(false);

  const [formUser, setFormUser] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    city: "",
    province: "",
    image: "",
  });

  useEffect(() => {
    setFormUser({
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      city: user.city.name,
      province: user.city.county.province.name,
      image: user.image.replace("/media/", ""),
    });
  }, [user]);

  const formErrorEditInitial = {
    username: "Minimum 5 znaków, jedynie litery, cyfry i @/./+/-/_",
    first_name: "Uzupełnij wyłącznie imieniem",
    last_name: "Uzupełnij wyłącznie nazwiskiem",
    city: "Wybierz miasto znajdujące się w podanym województwie",
  };

  const [formErrorEdit, setFormErrorEdit] = useState({});
  const [validatedEdit, setValidatedEdit] = useState(true);

  useEffect(() => {
    if (Object.keys(formErrorEdit).length === 0) {
      setValidatedEdit(true);
    } else {
      setValidatedEdit(false);
    }
  }, [formErrorEdit]);

  function formErrorEditStill(name) {
    setFormErrorEdit({
      ...formErrorEdit,
      [name]: formErrorEditInitial[name],
    });
  }

  function formErrorEditDelete(name) {
    let copiedFormError = { ...formErrorEdit };
    delete copiedFormError[name];
    setFormErrorEdit(() => ({ ...copiedFormError }));
  }

  function checkUsername(temp) {
    var usernameRegex = /^[A-Za-z0-9@_+-.]*$/;
    var username = temp;

    if (username.match(usernameRegex) && username.length >= 5) {
      return true;
    } else {
      return false;
    }
  }

  function checkCity(city) {
    for (var key in cities) {
      if (cities[key].name == city) {
        return true;
      }
    }
    return false;
  }

  function validatorEdit(name, value) {
    switch (name) {
      case "username":
        if (checkUsername(value)) {
          formErrorEditDelete(name);
        } else {
          formErrorEditStill(name);
        }
        break;

      case "first_name":
        if (value.length >= 3 && value.indexOf(" ") < 0) {
          formErrorEditDelete(name);
        } else {
          formErrorEditStill(name);
        }
        break;

      case "last_name":
        if (value.length >= 3 && value.indexOf(" ") < 0) {
          formErrorEditDelete(name);
        } else {
          formErrorEditStill(name);
        }
        break;

      case "city":
        if (checkCity(value)) {
          formErrorEditDelete(name);
        } else {
          formErrorEditStill(name);
        }
        break;

      default:
        break;
    }
  }

  function imageRender(data) {
    let image;
    if (data?.type !== undefined) {
      image = URL.createObjectURL(data);
    } else {
      image = `${ips_config.BACKEND}/media/${data}`;
    }

    return (
      <img
        src={image}
        className="h-28 w-28 rounded-full border-2 border-dashed border-blue-400 object-cover transition-opacity duration-150 ease-in-out group-hover:opacity-50"
      ></img>
    );
  }

  const handleInputEditImage = (e) => {
    const { files } = e.target;
    if (files && files[0].type.startsWith("image/")) {
      setFileIsNotImage(false);
      setFormUser((prevState) => ({
        ...prevState,
        image: files[0],
      }));
    } else {
      setFileIsNotImage(true);
      e.target.value = null;
      setFormUser((prevState) => ({
        ...prevState,
        image: user.image.replace("/media/", ""),
      }));
    }
  };

  function handleInputEdit(e) {
    validatorEdit(e.target.name, e.target.value);
    setFormUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function checkNewLocalization(checkLocalization, xcsrftoken) {
    if (
      checkLocalization !== null &&
      checkLocalization.id !== user.city.id &&
      disableCheckLocalization == false
    ) {
      return (
        <div className="absolute right-2 top-12 z-20 h-[100px] w-64 flex-col rounded-xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
          <div className="flex w-full items-center justify-start rounded-t-xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-[11px] text-white">Wykryto inne miasto</span>
          </div>
          <div className="flex h-auto w-full flex-col">
            <div className="flex h-auto w-full flex-row space-x-2 py-2 px-3">
              <div className="flex h-full w-6">
                <ExclamationIcon className="h-6 w-6 text-yellow-300" />
              </div>
              <div className="flex h-full grow">
                <span className="font-mukta text-[10px] text-gray-100">
                  {`Twoja lokalizacji mówi, że znajdujesz się w "${checkLocalization.name}". Chcesz zmienić lokalizację?`}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-center space-x-5">
              <button
                className={`h-5 w-20 rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-center text-xs  font-medium text-white shadow-lg shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300`}
                onClick={() => {
                  setDisableCheckLocalization(true);
                }}
              >
                Anuluj
              </button>
              <button
                className={`h-5 w-20 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-center text-xs font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                onClick={(e) => {
                  e.preventDefault();
                  setUpdateCheckLocalization(true);
                  dispatch(change_user_location(xcsrftoken, checkLocalization));
                }}
              >
                Zmień
              </button>
            </div>
          </div>
        </div>
      );
    }
  }

  function handleEditChange(e) {
    e.preventDefault();
    if (validatedEdit) {
      dispatch(account_edit(formUser, xcsrftoken));
    }
  }

  function changeProfileModule() {
    return (
      <form className="flex w-full flex-col p-2" onSubmit={handleEditChange}>
        <span className="h-auto font-mukta text-[19px] text-gray-100">
          Edycja danych
        </span>

        <div className="flex h-auto w-full flex-col space-y-3 pt-2 md:flex-row md:space-y-0 md:space-x-5">
          <div className="flex h-full w-full flex-col space-y-4 px-6 md:w-1/2 md:px-0">
            <div className="flex flex-col space-y-1">
              <label className="font-mukta text-sm text-gray-100">
                Nazwa użytkownika
              </label>
              <input
                type="text"
                name="username"
                value={formUser.username}
                onChange={(e) => handleInputEdit(e)}
                placeholder="Podaj nazwę odznaki"
                maxLength="200"
                className="rounded-md text-sm"
              ></input>
              {checkForm("username", formErrorEdit)}
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="showEndWithoutSeriesPageSelect"
                className="font-mukta text-sm text-gray-100"
              >
                Obraz użytkownika
              </label>
              <div className="full flex flex-row items-end">
                <input
                  type="file"
                  className="text-md grow font-mukta text-white"
                  accept="image/*"
                  onChange={(e) => {
                    handleInputEditImage(e);
                  }}
                />

                {imageRender(formUser.image)}
              </div>

              {fileIsNotImage ? (
                <label className="text-[11px] text-white">
                  Plik który przesłałeś nie jest obrazkiem i nie został
                  załadowany. Podczas zapisu zmian, Twoje zdjęcie zostanie nie
                  zmienione.
                </label>
              ) : (
                <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
              )}
            </div>
          </div>
          <div className="flex h-full w-full flex-col space-y-4 px-6 md:w-1/2 md:px-0">
            <div className="flex h-1/2 w-full flex-col md:flex-row md:space-x-3">
              <div className="flex w-full flex-col space-y-1 md:w-1/2">
                <label className="font-mukta text-sm text-gray-100">Imię</label>
                <input
                  type="text"
                  name="first_name"
                  value={formUser.first_name}
                  onChange={(e) => handleInputEdit(e)}
                  placeholder="Podaj imię użytkownika"
                  maxLength="200"
                  className="w-full rounded-md text-xs md:w-9/10 lg:text-sm"
                ></input>
                {checkForm("first_name", formErrorEdit)}
              </div>

              <div className="flex w-full flex-col space-y-1 md:w-1/2">
                <label className="font-mukta text-sm text-gray-100">
                  Nazwisko
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formUser.last_name}
                  onChange={(e) => handleInputEdit(e)}
                  placeholder="Podaj nazwisko użytkownika"
                  maxLength="200"
                  className="w-full rounded-md text-xs md:w-9/10 lg:text-sm"
                ></input>
                {checkForm("last_name", formErrorEdit)}
              </div>
            </div>

            <div className="flex h-1/2 w-full flex-col md:flex-row md:space-x-3">
              <div className="flex w-full flex-col space-y-1 md:w-1/2">
                <label className="font-mukta text-sm text-gray-100">
                  Województwo
                </label>
                <select
                  name="province"
                  id="provincesEdit"
                  onChange={handleInputEdit}
                  defaultValue={formUser.province}
                  className="w-full rounded-md text-xs md:w-9/10 lg:text-sm"
                >
                  {provinces.map((province) => {
                    return (
                      <option
                        className="font-mukta text-black"
                        value={province.name}
                        key={province.id}
                      >
                        {province.name}
                      </option>
                    );
                  })}
                </select>
                {checkForm("city", formErrorEdit)}
              </div>

              <div className="flex w-full flex-col space-y-1 md:w-1/2">
                <label className="font-mukta text-sm text-gray-100">
                  Miasto
                </label>
                <select
                  name="city"
                  id="citiesEdit"
                  onChange={handleInputEdit}
                  defaultValue={formUser.city}
                  className="w-full rounded-md text-xs md:w-9/10 lg:text-sm"
                >
                  <option className="text-black" value="Brak">
                    Brak
                  </option>
                  {cities.map((city) => {
                    return (
                      <option
                        className="font-mukta text-black"
                        value={city.name}
                        key={city.id}
                      >
                        {city.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className={`flex h-auto w-full items-start justify-end pb-4`}>
              <button
                type="submit"
                disabled={!validatedEdit}
                value="Submit"
                className={`rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none`}
              >
                <span className="text-center font-mukta text-sm">
                  Zapisz zmiany
                </span>
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }

  //////////// USUWANIE KONTA

  const [openModalDeleteAcount, setOpenModalDeleteAcount] = useState(false);
  const [formDelete, setFormDelete] = useState("");
  const [validatedDelete, setValidatedDelete] = useState(false);

  function validatorDelete(value) {
    if (value.length >= 8) {
      setValidatedDelete(true);
    } else {
      setValidatedDelete(false);
    }
  }

  function handleInputDelete(e) {
    validatorDelete(e.target.value);
    setFormDelete(e.target.value);
  }

  function handleDeleteAccount(e) {
    e.preventDefault();
    if (validatedDelete) {
      dispatch(account_delete(formDelete, xcsrftoken));
    }
  }

  function modalDeleteAccount() {
    return (
      <form
        className="fixed inset-0 z-30 flex items-center justify-center px-2"
        onSubmit={handleDeleteAccount}
      >
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Usuwanie konta
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalDeleteAcount(false);
                setFormDelete("");
              }}
            />
          </div>
          <div className="flex px-14">
            <span className="lg:text-md text-center font-mukta text-sm text-white">
              Czy jesteś pewny, że chcesz usunąć swoje konto? Wszystkie Twoje
              wydarzenia zostaną usunięte, a Ty zostaniesz wylogowany i stracisz
              dostęp do tej strony. Jeśli tak, podaj hasło do swojego konta oraz
              kliknij przycisk "Usuń".
            </span>
          </div>

          <div className="flex w-1/2 flex-col space-y-1">
            <label className="text-sm font-bold text-white" htmlFor="username">
              Hasło
            </label>
            <input
              type="password"
              name="password"
              placeholder="Hasło"
              onChange={handleInputDelete}
              className="rounded-md text-sm"
              required
            />
            <div className="flex h-6 w-full items-center">
              {validatedDelete ? (
                <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
              ) : (
                <label className="text-[11px] text-white">
                  Minimum 8 znaków
                </label>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!validatedDelete}
            value="Submit"
            className={`rounded-xl  bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-6 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none`}
            onClick={() => {}}
          >
            <span className="text-center font-mukta text-[14px]">Usuń</span>
          </button>
        </div>
      </form>
    );
  }

  function deleteAccountModule() {
    return (
      <div className="flex h-auto w-full flex-col space-y-6 p-2 pb-12">
        <span className="h-auto font-mukta text-[19px] text-gray-100">
          Usuwanie konta
        </span>
        <div className="flex h-auto w-full flex-col items-center">
          <button
            className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-5 py-1 text-lg text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => setOpenModalDeleteAcount(true)}
          >
            Usuń
          </button>
        </div>
      </div>
    );
  }

  /////////////// PODŁĄCZANIE KONTA BANKOWEGO

  // ZMIENNE DO WPROWADZENIA
  const [bankNumberVerificated, setBankNumberVerificated] = useState({
    password: "",
    code: "",
    bank_number: "",
    re_bank_number: "",
  });

  const [validatedBankNumberVerificated, setValidatedBankNumberVerificated] =
    useState({ password: false, confirm: false });

  const formErrorBankNumberConfirmInitial = {
    code: "Kod składa się z 6 cyfr",
    bank_number:
      "Numer bankowy musi składać się z 26 cyfr i różnić się od starego",
  };

  const [formErrorBankNumberConfirm, setFormErrorBankNumberConfirm] = useState(
    formErrorBankNumberConfirmInitial
  );

  useEffect(() => {
    if (Object.keys(formErrorBankNumberConfirm).length === 0) {
      setValidatedBankNumberVerificated((prevState) => ({
        ...prevState,
        confirm: true,
      }));
    } else {
      setValidatedBankNumberVerificated((prevState) => ({
        ...prevState,
        confirm: false,
      }));
    }
  }, [Object.keys(formErrorBankNumberConfirm).length]);

  function formErrorBankNumberConfirmStill(name) {
    setFormErrorBankNumberConfirm({
      ...formErrorBankNumberConfirm,
      [name]: formErrorBankNumberConfirmInitial[name],
    });
  }

  function formErrorBankNumberConfirmDelete(name) {
    let copiedFormErrorBankNumberConfirm = { ...formErrorBankNumberConfirm };
    delete copiedFormErrorBankNumberConfirm[name];
    setFormErrorBankNumberConfirm(() => ({
      ...copiedFormErrorBankNumberConfirm,
    }));
  }

  useEffect(() => {
    if (settings?.is?.bank_number_password_match == false) {
      setBankNumberVerificated({
        password: "",
        code: "",
        bank_number: "",
        re_bank_number: "",
      });
      setValidatedBankNumberVerificated({ password: false, confirm: false });
      setFormErrorBankNumberConfirm(formErrorBankNumberConfirmInitial);
    }
  }, [settings?.is?.bank_number_password_match]);

  // VALIDATORY DO POZWOLENIA AKCJI

  function validatorBankNumberVerificated(name, value) {
    switch (name) {
      case "code":
        if (value.length == 6) {
          formErrorBankNumberConfirmDelete(name);
        } else {
          formErrorBankNumberConfirmStill(name);
        }
        break;

      case "bank_number":
        if (
          value.length == 26 &&
          value !== settings?.bank_number &&
          value == bankNumberVerificated.re_bank_number
        ) {
          formErrorBankNumberConfirmDelete(name);
        } else {
          formErrorBankNumberConfirmStill(name);
        }
        break;

      case "re_bank_number":
        if (
          value.length == 26 &&
          value !== settings?.bank_number &&
          value == bankNumberVerificated.bank_number
        ) {
          formErrorBankNumberConfirmDelete("bank_number");
        } else {
          formErrorBankNumberConfirmStill("bank_number");
        }
        break;

      case "password":
        if (value.length >= 8) {
          setValidatedBankNumberVerificated((prevState) => ({
            ...prevState,
            password: true,
          }));
        } else {
          setValidatedBankNumberVerificated((prevState) => ({
            ...prevState,
            password: false,
          }));
        }
      default:
        break;
    }
  }

  function handleInputBankNumberVerification(e) {
    let input;
    if (e.target.name == "code") {
      input = e.target.value.replace(/[^0-9]/g, "");
    } else {
      input = e.target.value;
    }

    validatorBankNumberVerificated(e.target.name, input);
    setBankNumberVerificated((prevState) => ({
      ...prevState,
      [e.target.name]: input,
    }));
  }

  function handleBankNumberPasswordSubmit(e) {
    e.preventDefault();
    if (validatedBankNumberVerificated.password) {
      dispatch(bank_number_change(bankNumberVerificated.password, xcsrftoken));
    }
  }

  function handleConnectBankNumberCodeSubmit(e) {
    e.preventDefault();
    if (validatedBankNumberVerificated.confirm) {
      dispatch(
        bank_number_change_confirm(
          bankNumberVerificated.code,
          true,
          xcsrftoken,
          bankNumberVerificated.bank_number
        )
      );
    }
  }

  function handleUnconnectBankNumberCodeSubmit(e) {
    e.preventDefault();
    if (bankNumberVerificated.code.length == 6) {
      dispatch(
        bank_number_change_confirm(
          bankNumberVerificated.code,
          false,
          xcsrftoken
        )
      );
    }
  }

  function bankNumberModule() {
    return (
      <div className="flex h-auto w-full flex-col space-y-6 p-2 pb-12">
        <span className="h-auto font-mukta text-[19px] text-gray-100">
          Zarządzanie rachunkiem bankowym
        </span>
        <div className="flex h-auto w-full flex-col items-center">
          <form
            className="flex w-1/2 flex-col space-y-4"
            onSubmit={handleBankNumberPasswordSubmit}
          >
            {settings.amount_awaiting_refunding !== null && (
              <div className="flex flex-col space-y-3 w-full h-auto">
                <span className="h-auto font-mukta text-2xl text-center text-red-500">
                  ! UWAGA !
                </span>

                <span className="h-auto font-mukta text-[16px] text-center text-red-300">
                  Pewne wydarzenia na które zakupiłeś bilety zostały anulowane.
                  Aby uzyskać zwrot swojej kwoty, musisz podłączyć konto
                  bankowego do swojego profilu. Pamiętaj, że w momencie gdy
                  administrator otworzy bramkę z płatnością, zmiana numeru konta
                  bankowego będzie niemożliwa, aż do jej zamknięcia.
                </span>

                <span className="h-auto font-mukta text-[16px] text-center text-red-300">
                  {`Oczekująca kwota: ${settings.amount_awaiting_refunding} zł`}
                </span>
              </div>
            )}
            {user.pinned_bank == true ? (
              <div className="flex w-full flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="bank_number"
                >
                  Aktualne konto bankowe
                </label>

                <div className=" pl-3 flex h-[38px] rounded-md items-center bg-neutral-500">
                  <span className="text-sm text-center">
                    {settings?.bank_number}
                  </span>
                </div>
              </div>
            ) : (
              <span className="h-auto font-mukta text-[16px] text-center text-gray-100">
                Po podłączeniu swojego IBAN do profilu, będziesz mógł dodać
                bilety do wydarzeń.
              </span>
            )}
            <div className="flex w-full flex-col space-y-1">
              <label
                className="text-sm font-bold text-white"
                htmlFor="password"
              >
                Aktualne hasło
              </label>
              <input
                type="password"
                name="password"
                disabled={settings?.is?.bank_number_password_match}
                value={bankNumberVerificated.password}
                placeholder="Aktualne hasło"
                onChange={handleInputBankNumberVerification}
                className="rounded-md text-sm disabled:bg-neutral-500"
                required
              />
            </div>

            {settings?.is?.bank_number_password_match !== true && (
              <button
                type="submit"
                disabled={!validatedBankNumberVerificated.password}
                value="Submit"
                className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              >
                Wyślij kod
              </button>
            )}
          </form>

          {settings?.is?.bank_number_password_match == true && (
            <div className="flex w-1/2 pt-4 flex-col space-y-4">
              {settings?.is?.bank_number_code_match !== true && (
                <span className="h-auto font-mukta text-center text-[14px] text-gray-200">
                  Przepisz kod wysłany na mail i wykonaj zamierzoną akcję.
                </span>
              )}

              <div className="flex w-full flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Kod weryfikacyjny
                </label>
                <input
                  type="text"
                  name="code"
                  autoComplete="off"
                  placeholder="Kod weryfikacyjny"
                  disabled={settings?.is?.bank_number_code_match}
                  value={bankNumberVerificated.code}
                  onChange={handleInputBankNumberVerification}
                  maxLength={6}
                  pattern="[0-9]*"
                  className="rounded-md text-sm disabled:bg-neutral-500"
                  required
                />
              </div>

              <RefreshIcon
                className="h-5 w-5 shrink-0 cursor-pointer text-red-400"
                onClick={() => dispatch(generate_new_code(user, xcsrftoken))}
              ></RefreshIcon>

              {checkForm("code", formErrorBankNumberConfirm)}

              <div className="flex w-full flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Numer bankowy
                </label>
                <input
                  type="text"
                  name="bank_number"
                  autoComplete="off"
                  placeholder="Numer bankowy"
                  value={bankNumberVerificated.bank_number}
                  onChange={handleInputBankNumberVerification}
                  maxLength={26}
                  pattern="[0-9]*"
                  className="rounded-md text-sm"
                  required
                />
              </div>

              <div className="flex w-full flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Powtórz numer bankowy
                </label>
                <input
                  type="text"
                  name="re_bank_number"
                  autoComplete="off"
                  placeholder="Powtórz numer bankowy"
                  value={bankNumberVerificated.re_bank_number}
                  onChange={handleInputBankNumberVerification}
                  maxLength={26}
                  pattern="[0-9]*"
                  className="rounded-md text-sm"
                  required
                />
                {checkForm("bank_number", formErrorBankNumberConfirm)}
              </div>

              {user.pinned_bank && settings.blocked_change_bank_account ? (
                <div className="flex flex-col space-y-3 p-3 border-red-500 border-2 rounded-lg items-center justify-center">
                  <span className=" text-center text-sm font-medium text-white">
                    Edytuj konto bankowe
                  </span>

                  <span className=" text-center text-sm font-medium text-gray-400">
                    Nie możesz teraz zmienić konta bankowego, ponieważ
                    administrator otworzył właśnie bramkę z Twoją płatnością.
                    Jeśli ją sfinalizuje, przelew zostanie wysłany na stare
                    konto bankowe, a Ty dostaniesz związane z nim powiadomienie.
                  </span>
                </div>
              ) : (
                <button
                  disabled={!validatedBankNumberVerificated.confirm}
                  onClick={handleConnectBankNumberCodeSubmit}
                  className="rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-3 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-green-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
                >
                  {user.pinned_bank == true
                    ? "Edytuj konto bankowe"
                    : "Dodaj konto bankowe"}
                </button>
              )}
              {user.pinned_bank == true && (
                <>
                  <span className="h-auto font-mukta text-center text-[14px] text-gray-200">
                    Lub
                  </span>

                  {settings.blocked_remove_bank_account.future_event ||
                  settings.blocked_remove_bank_account.started_refunding ||
                  settings.blocked_remove_bank_account.past_not_paid_event ? (
                    <div className="flex flex-col space-y-3 p-3 border-red-500 border-2 rounded-lg items-center justify-center">
                      <span className=" text-center text-sm font-medium text-white">
                        Odepnij konto bankowe
                      </span>

                      <span className=" text-center text-sm font-medium text-gray-400">
                        Nie możesz teraz odpiąć swojego konta bankowego
                        ponieważ:
                      </span>
                      {settings.blocked_remove_bank_account.future_event && (
                        <span className=" text-center text-xs font-medium text-gray-400">
                          - Masz zweryfikowany bilet na jedno z twoich
                          przyszłych wydarzeń
                        </span>
                      )}
                      {settings.blocked_remove_bank_account
                        .started_refunding && (
                        <span className=" text-center text-xs font-medium text-gray-400">
                          - Została rozpoczęta procedura zwrotu biletu
                        </span>
                      )}
                      {settings.blocked_remove_bank_account
                        .past_not_paid_event && (
                        <span className=" text-center text-xs font-medium text-gray-400">
                          - Posiadasz zakończone wydarzenie, za które jeszcze
                          nie otrzymałeś płatności
                        </span>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={handleUnconnectBankNumberCodeSubmit}
                      disabled={bankNumberVerificated.code.length !== 6}
                      className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
                    >
                      Odepnij konto bankowe
                    </button>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  //////////// ZMIANA MAILA

  const [formEmail, setFormEmail] = useState("");
  const [formEmailConfirm, setFormEmailConfirm] = useState({
    old_code: "",
    new_code: "",
  });

  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedEmailConfirm, setValidatedEmailConfirm] = useState(false);

  function handleEmailChange(e) {
    e.preventDefault();
    if (validatedEmail) {
      dispatch(email_change(formEmail, xcsrftoken));
    }
  }

  function handleEmailChangeConfirm(e) {
    e.preventDefault();
    if (validatedEmailConfirm) {
      dispatch(email_change_confirm(formEmailConfirm, xcsrftoken));
    }
  }

  function validatorEmail(value) {
    var email = value;
    var indexSign = email.indexOf("@");
    var indexLastDot = email.lastIndexOf(".");

    if (
      indexSign > 0 && //1 znak przed małpą
      indexSign + 1 < indexLastDot && //1 znak miedzy małpą a kropką
      indexLastDot + 2 < email.length && // 2 znaki po ostatniej kropce
      user.email !== email // Nowy mail
    ) {
      setValidatedEmail(true);
    } else {
      setValidatedEmail(false);
    }
  }

  function handleInputEmail(e) {
    validatorEmail(e.target.value);
    setFormEmail(e.target.value);
  }

  const formErrorEmailInitial = {
    old_code: "Kod składa się z 6 cyfr",
    new_code: "Kod składa się z 6 cyfr",
  };

  const [formErrorEmail, setFormErrorEmail] = useState(formErrorEmailInitial);

  useEffect(() => {
    if (Object.keys(formErrorEmail).length === 0) {
      setValidatedEmailConfirm(true);
    } else {
      setValidatedEmailConfirm(false);
    }
  }, [Object.keys(formErrorEmail).length]);

  function formErrorEmailStill(name) {
    setFormErrorEmail({
      ...formErrorEmail,
      [name]: formErrorEmailInitial[name],
    });
  }

  function formErrorEmailDelete(name) {
    let copiedFormErrorEmail = { ...formErrorEmail };
    delete copiedFormErrorEmail[name];
    setFormErrorEmail(() => ({ ...copiedFormErrorEmail }));
  }

  function validatorEmailConfirm(name, value) {
    switch (name) {
      case "old_code":
        if (value.length == 6) {
          formErrorEmailDelete(name);
        } else {
          formErrorEmailStill(name);
        }
        break;

      case "new_code":
        if (value.length == 6) {
          formErrorEmailDelete(name);
        } else {
          formErrorEmailStill(name);
        }
        break;

      default:
        break;
    }
  }

  function handleInputEmailConfirm(e) {
    validatorEmailConfirm(e.target.name, e.target.value);
    setFormEmailConfirm({
      ...formEmailConfirm,
      [e.target.name]: e.target.value,
    });
  }

  useEffect(() => {
    if (settings?.is?.new_email == true) {
      let input = document.getElementById("input_new_email");
      input.value = formEmail;
    } else if (settings?.is?.new_email == false) {
      setFormEmail("");
      setFormEmailConfirm({
        old_code: "",
        new_code: "",
      });
      setValidatedEmail(false);
      setValidatedEmailConfirm(false);
      setFormErrorEmail(formErrorEmailInitial);
    }
  }, [settings?.is?.new_email]);

  function changeEmailModule() {
    return (
      <div className="flex h-auto w-full flex-col space-y-3 p-2 pb-4 md:w-1/2">
        <span className="h-auto font-mukta text-[19px] text-gray-100">
          Zmiana E-maila
        </span>
        <div className="flex h-auto w-full flex-col items-center space-y-3">
          <form
            className="flex w-full flex-col items-center space-y-4"
            onSubmit={handleEmailChange}
          >
            <div className="flex w-1/2 flex-col space-y-1">
              <label className="text-sm font-bold text-white" htmlFor="email">
                Stary E-mail
              </label>
              <input
                disabled
                value={user.email}
                type="text"
                name="old_email"
                className="rounded-md bg-neutral-500 text-sm"
                required
              />
            </div>
            {settings?.is?.new_email !== true && (
              <>
                <div className="flex w-1/2 flex-col space-y-1">
                  <label
                    className="text-sm font-bold text-white"
                    htmlFor="username"
                  >
                    Nowy E-mail
                  </label>
                  <input
                    type="text"
                    name="new_email"
                    placeholder="E-mail"
                    onChange={handleInputEmail}
                    className="rounded-md text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!validatedEmail}
                  value="Submit"
                  className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
                >
                  Zmień E-mail
                </button>
              </>
            )}
          </form>

          {settings?.is?.new_email == true && (
            <form
              className="flex w-full flex-col items-center space-y-4 pt-1"
              onSubmit={handleEmailChangeConfirm}
            >
              <div className="flex w-1/2 flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Nowy E-mail
                </label>
                <input
                  disabled
                  id="input_new_email"
                  type="text"
                  name="new_email"
                  placeholder="Hasło"
                  className="rounded-md bg-neutral-500 text-sm"
                  required
                />

                <div className="flex flex-col items-center space-y-1 py-1">
                  <CheckCircleIcon className="h-5 w-5 text-green-400" />
                  <span className="h-auto text-center font-mukta text-[12px] text-gray-300">
                    {`Na Twój stary e-mail "${user.email}" oraz nowy e-mail "${formEmail}" zostały wysłane kody weryfikacyjne. Podaj je w odpowiednich miejscach, aby przypisać nowy e-mail do tego konta.`}
                  </span>
                </div>
              </div>

              <div className="flex w-1/2 flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Kod ze starego e-mailu
                </label>
                <input
                  type="text"
                  name="old_code"
                  placeholder="Kod weryfikacyjny"
                  onChange={handleInputEmailConfirm}
                  maxLength={6}
                  className="rounded-md text-sm"
                  required
                />
                <RefreshIcon
                  className="h-5 w-5 cursor-pointer text-red-400"
                  onClick={() => dispatch(generate_new_code(user, xcsrftoken))}
                ></RefreshIcon>
                {checkForm("old_code", formErrorEmail)}
              </div>

              <div className="flex w-1/2 flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Kod z nowego e-mailu
                </label>
                <input
                  type="text"
                  name="new_code"
                  placeholder="Kod weryfikacyjny"
                  onChange={handleInputEmailConfirm}
                  maxLength={6}
                  className="rounded-md text-sm"
                  required
                />
                <RefreshIcon
                  className="h-5 w-5 cursor-pointer text-red-400"
                  onClick={() => dispatch(generate_email_new_code(xcsrftoken))}
                ></RefreshIcon>
                {checkForm("new_code", formErrorEmail)}
              </div>

              <button
                type="submit"
                disabled={!validatedEmailConfirm}
                value="Submit"
                className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              >
                Zmień E-mail
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  ///////////     ZMIANA HASŁA

  const [formPassword, setFormPassword] = useState("");
  const [formPasswordConfirm, setFormPasswordConfirm] = useState({
    code: "",
    password: "",
    re_password: "",
  });
  const [validatedPassword, setValidatedPassword] = useState(false);
  const [validatedPasswordConfirm, setValidatedPasswordConfirm] =
    useState(false);

  const formErrorPasswordInitial = {
    code: "Kod składa się z 6 cyfr",
    password: "Minimum 8 znaków i hasła muszą pasować do siebie",
  };

  const [formErrorPassword, setFormErrorPassword] = useState(
    formErrorPasswordInitial
  );

  useEffect(() => {
    if (Object.keys(formErrorPassword).length === 0) {
      setValidatedPasswordConfirm(true);
    } else {
      setValidatedPasswordConfirm(false);
    }
  }, [Object.keys(formErrorPassword).length]);

  function formErrorPasswordStill(name) {
    setFormErrorPassword({
      ...formErrorPassword,
      [name]: formErrorPasswordInitial[name],
    });
  }

  function formErrorPasswordDelete(name) {
    let copiedFormErrorPassword = { ...formErrorPassword };
    delete copiedFormErrorPassword[name];
    setFormErrorPassword(() => ({ ...copiedFormErrorPassword }));
  }

  function validatorPassword(value) {
    if (value.length >= 8) {
      setValidatedPassword(true);
    } else {
      setValidatedPassword(false);
    }
  }

  function validatorPasswordConfirm(name, value) {
    switch (name) {
      case "code":
        if (value.length == 6) {
          formErrorPasswordDelete(name);
        } else {
          formErrorPasswordStill(name);
        }
        break;

      case "password":
        if (value.length >= 8 && value === formPasswordConfirm.re_password) {
          formErrorPasswordDelete(name);
        } else {
          formErrorPasswordStill(name);
        }
        break;

      case "re_password":
        if (value.length >= 8 && value === formPasswordConfirm.password) {
          formErrorPasswordDelete("password");
        } else {
          formErrorPasswordStill("password");
        }
        break;
      default:
        break;
    }
  }

  function handleInputPassword(e) {
    validatorPassword(e.target.value);
    setFormPassword(e.target.value);
  }

  function handleInputPasswordConfirm(e) {
    validatorPasswordConfirm(e.target.name, e.target.value);
    setFormPasswordConfirm({
      ...formPasswordConfirm,
      [e.target.name]: e.target.value,
    });
  }

  function handlePasswordChange(e) {
    e.preventDefault();
    if (validatedPassword) {
      dispatch(password_change(formPassword, xcsrftoken));
    }
  }

  function handlePasswordChangeConfirm(e) {
    e.preventDefault();
    if (validatedPasswordConfirm) {
      dispatch(
        password_change_confirm(user.email, formPasswordConfirm, xcsrftoken)
      );
    }
  }

  useEffect(() => {
    if (settings?.is?.password_match == false) {
      setFormPassword("");
      setFormPasswordConfirm({
        code: "",
        password: "",
        re_password: "",
      });
      setValidatedPassword(false);
      setValidatedPasswordConfirm(false);
      setFormErrorPassword(formErrorPasswordInitial);
    }
  }, [settings?.is?.password_match]);

  function changePasswordModule() {
    return (
      <div className="flex h-auto w-full flex-col space-y-3 p-2 pb-4 md:w-1/2">
        <span className="h-auto font-mukta text-[19px] text-gray-100">
          Zmiana hasła
        </span>

        <div className="flex h-auto w-full flex-col items-center space-y-3">
          <form
            className="flex w-full flex-col items-center space-y-4"
            onSubmit={handlePasswordChange}
          >
            <div className="flex w-1/2 flex-col space-y-1">
              <label
                className="text-sm font-bold text-white"
                htmlFor="username"
              >
                Username
              </label>
              <input
                disabled
                value={user.username}
                type="text"
                name="username"
                className="rounded-md bg-neutral-500 text-sm"
                required
              />
            </div>

            {settings?.is?.password_match !== true && (
              <>
                <div className="flex w-1/2 flex-col space-y-1">
                  <label
                    className="text-sm font-bold text-white"
                    htmlFor="username"
                  >
                    Aktualne hasło
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Hasło"
                    onChange={handleInputPassword}
                    className="rounded-md text-sm"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={!validatedPassword}
                  value="Submit"
                  className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
                >
                  Zmień hasło
                </button>
              </>
            )}
          </form>
          {settings?.is?.password_match == true && (
            <form
              className="flex w-full flex-col items-center space-y-4"
              onSubmit={handlePasswordChangeConfirm}
            >
              <div className="flex w-1/2 flex-col space-y-1">
                <div className="flex flex-col items-center space-y-1 pb-1">
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-green-400" />
                  <span className="h-auto text-center font-mukta text-[12px] text-gray-300">
                    {`Weryfikacja przebiegła poprawnie. Na Twój mail "${user.email}" został wysłany kod weryfikacyjny. Podaj go oraz ustaw nowe hasło.`}
                  </span>
                </div>
              </div>

              <div className="flex w-1/2 flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Kod weryfikacyjny
                </label>
                <input
                  type="text"
                  name="code"
                  placeholder="Kod weryfikacyjny"
                  onChange={handleInputPasswordConfirm}
                  maxLength={6}
                  className="rounded-md text-sm"
                  required
                />
                <RefreshIcon
                  className="h-5 w-5 shrink-0 cursor-pointer text-red-400"
                  onClick={() => dispatch(generate_new_code(user, xcsrftoken))}
                ></RefreshIcon>

                {checkForm("code", formErrorPassword)}
              </div>

              <div className="flex w-1/2 flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Nowe hasło
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Nowe hasło"
                  onChange={handleInputPasswordConfirm}
                  className="rounded-md text-sm"
                  required
                />
              </div>

              <div className="flex w-1/2 flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="username"
                >
                  Powtórz nowe hasło
                </label>
                <input
                  type="password"
                  name="re_password"
                  placeholder="Powtórz nowe hasło"
                  onChange={handleInputPasswordConfirm}
                  className="rounded-md text-sm"
                  required
                />
                {checkForm("password", formErrorPassword)}
              </div>

              <button
                type="submit"
                disabled={!validatedPasswordConfirm}
                value="Submit"
                className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              >
                Zmień hasło
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  /////////////////////////// LOGOUT MODULE

  const [openModalLogoutAll, setOpenModalLogoutAll] = useState(false);

  function modalLogoutAll() {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Wylogowywanie ze wszystkich urządzeń
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalLogoutAll(false);
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="lg:text-md text-center font-mukta text-sm text-white">
              Czy jesteś pewny, aby wylogować się ze wszystkich urządzeń oprócz
              aktualnego? Po zalogowaniu będzie konieczne zweryfikowanie konta
              kodem, który zostanie wysłany na przypisany do konta mail.
            </span>
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              let all_devices = [];
              settings.ip_validators.other.forEach((device) =>
                all_devices.push(device.id)
              );
              dispatch(logout_from_devices(all_devices, xcsrftoken));
            }}
          >
            <span className="text-center font-mukta text-[14px]">Wyloguj</span>
          </button>
        </div>
      </div>
    );
  }

  function renderDeviceValidator(data, actual_status) {
    return (
      <div
        className="flex h-auto w-full  flex-col divide-y-2 divide-blue-400 rounded-xl border-2 border-blue-400 bg-gray-700"
        key={data.id}
      >
        <div className="flex flex-col py-1 px-2">
          <span className="h-auto font-mukta text-[9px] text-gray-50  md:text-[15px]">
            {data.name_device}
          </span>
          <span className="h-auto font-mukta text-[9px] text-gray-100 md:text-[15px]">
            {`IP - ${data.ip_address}`}
          </span>

          <div className="flex flex-row">
            <span className="font h-auto font-mukta text-[9px] text-gray-400 md:text-[13px]">
              {`${data.city} (${data.county}), ${data.province}`}
            </span>
          </div>
          {actual_status == true ? (
            <span className="font h-auto font-mukta text-[9px] text-green-400 md:text-[13px]">
              To urządzenie
            </span>
          ) : (
            <span className="font h-auto font-mukta text-[9px] text-gray-400 md:text-[13px]">
              {moment(data.last_login_time).format("DD MMMM YYYY o hh:mm")}
            </span>
          )}
        </div>
        {actual_status == false && (
          <div className="flex p-2">
            <button
              className="flex h-5 w-auto items-center rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-500 p-1 text-[10px] focus:ring-2 focus:ring-red-400 md:h-6"
              onClick={() => {
                dispatch(logout_from_devices([data.id], xcsrftoken));
              }}
            >
              <span className="h-auto font-mukta text-[10px] text-gray-100 md:text-[14px]">
                Wyloguj te urządzenie
              </span>
            </button>
          </div>
        )}
      </div>
    );
  }

  function logoutModule() {
    return (
      <div className="flex w-1/2 flex-col">
        <span className="h-auto p-2 font-mukta text-sm text-gray-100 md:text-[19px]">
          Miejsca zalogowania
        </span>
        <div className="flex h-auto w-full flex-col space-y-2 px-2 md:pt-2">
          <span className="h-auto text-center font-mukta text-[10px] text-gray-100 md:text-start md:text-[14px]">
            Aktualne
          </span>
          {renderDeviceValidator(settings.ip_validators.current, true)}
        </div>
        {settings.ip_validators.other.length > 0 ? (
          <div className="flex flex-col items-center space-y-2 p-2 md:flex-row md:justify-between md:space-y-0">
            <span className="h-auto text-center font-mukta text-xs text-gray-100 md:text-start md:text-[14px]">
              Inne urządzenia
            </span>

            <button
              className="flex items-center items-center justify-center rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-500 p-1 text-center focus:ring-2  focus:ring-red-400 "
              onClick={() => setOpenModalLogoutAll(true)}
            >
              <span className="h-auto text-center font-mukta text-[10px] text-gray-100 md:text-[14px]">
                Wyloguj ze wszystkich urządzeń
              </span>
            </button>
          </div>
        ) : (
          <span className="h-auto p-2 font-mukta text-xs text-gray-100 md:text-[14px]">
            Brak innych urządzeń
          </span>
        )}

        <div className="flex w-full grow flex-col space-y-2 overflow-y-auto p-2">
          {settings.ip_validators.other.map((device) =>
            renderDeviceValidator(device, false)
          )}
        </div>
      </div>
    );
  }

  ////////////////////// BLOCK MODULE

  function moduleRequestActionUser(user) {
    if (user.status == "get_block") {
      return (
        <div className="flex h-12 w-32 items-center  justify-center rounded-lg border-2 border-red-500 bg-gray-700 px-2 md:w-40">
          <span className="text-center font-mukta text-[9px] text-gray-300 md:text-[12px]">
            Jesteś zablokowany przez tego użytkownika
          </span>
        </div>
      );
    } else if (user.status == "blocked") {
      return (
        <button
          value="add"
          className="h-7 w-16 rounded-lg bg-gradient-to-r from-gray-400 via-gray-500 to-gray-500 py-1 text-center text-[9px] font-medium text-white shadow-lg shadow-gray-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-gray-300 md:h-9 md:w-32 md:text-sm "
          onClick={() => dispatch(unblock_user(user.id, xcsrftoken))}
        >
          Odblokuj
        </button>
      );
    } else {
      return (
        <Link
          to={`/user/${user.username}`}
          className="flex h-7 w-20 items-center justify-center rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 py-1 text-xs shadow-lg shadow-blue-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 md:h-9 md:w-32 md:text-sm"
        >
          <span className="h-auto text-center text-[9px] font-medium text-white md:text-sm">
            Przejdź na profil
          </span>
        </Link>
      );
    }
  }

  function blockedModule() {
    return (
      <div className="flex w-1/2 flex-col">
        <span className="h-auto p-2 font-mukta text-sm text-gray-100 md:text-[19px]">
          Zablokowani użytkownicy
        </span>

        <div className="flex h-auto w-full flex-col divide-y-2 divide-gray-800 overflow-y-auto pt-2">
          {settings.blocked_users.length > 0 ? (
            settings.blocked_users.map((user) => (
              <div
                className="flex h-auto w-full flex-row items-center justify-between py-2 px-3 sm:px-5 xs:px-1"
                key={user.id}
              >
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Link
                    to={`/user/${user.username}`}
                    className="flex h-10 w-10 overflow-hidden rounded-full md:h-14 md:w-14"
                  >
                    <img
                      src={`${ips_config.BACKEND}${user.image_thumbnail}`}
                      className="h-10 w-10 object-cover transition ease-in-out hover:scale-110 md:h-14 md:w-14"
                    ></img>
                  </Link>

                  <Link
                    to={`/user/${user.username}`}
                    className=" flex h-fit w-fit"
                  >
                    <span className="break-anywhere h-auto w-fit max-w-60 cursor-pointer text-center font-mukta text-[10px] text-gray-200 hover:bg-slate-400 hover:text-black md:text-[14px]">
                      {user.username}
                    </span>
                  </Link>
                </div>
                {moduleRequestActionUser(user, xcsrftoken)}
              </div>
            ))
          ) : (
            <span className="h-auto p-2 text-center font-mukta text-[10px] text-gray-100 md:text-[14px]">
              Brak zablokowanych użytkowników
            </span>
          )}
        </div>
      </div>
    );
  }

  ////////////////////////   SOCIALMEDIA   MODULE

  function openFacebookLinkPage() {
    const params = {
      client_id: "774823227400031",
      redirect_uri: `${ips_config.BACKEND}/api/account/link/facebook`,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `https://www.facebook.com/v17.0/dialog/oauth?${urlParams}`;
  }

  // function openFacebookLinkPage() {
  //   const params = {
  //     client_id: "774823227400031",
  //     redirect_uri: `${ips_config.BACKEND}/api/account/link/facebook`,
  //   };

  //   const urlParams = new URLSearchParams(params).toString();

  //   window.location = `https://www.facebook.com/v16.0/dialog/oauth?${urlParams}`;
  // }

  function openGoogleLinkPage() {
    const params = {
      response_type: "code",
      client_id:
        "298963308775-ao9rr2jc1hobam57co8qpvkpkvjierpb.apps.googleusercontent.com",
      redirect_uri: `${ips_config.BACKEND}/api/account/link/google`,
      prompt: "select_account",
      access_type: "offline",
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `https://accounts.google.com/o/oauth2/v2/auth?${urlParams}`;
  }

  function socialModule() {
    return (
      <div className="flex flex-col space-y-1 p-2">
        <span className="h-auto font-mukta text-[19px] text-gray-100">
          Konta do podłączenia
        </span>

        <div className="flex h-auto w-full flex-col md:flex-row">
          <div className="flex h-full w-full md:w-1/2">
            <div className="flex h-28 w-full flex-row items-center space-x-2 p-3 sm:space-x-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-blue-700 text-white">
                <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="flex h-full grow flex-col items-start space-y-1">
                <div className="flex h-auto w-full flex-row justify-between pr-5 ">
                  <span className="text-md text-center font-mukta text-white">
                    Facebook
                  </span>
                  {user.facebook.social_id !== null && (
                    <button
                      className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 text-[12px] text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => dispatch(unlink_facebook(xcsrftoken))}
                    >
                      Odłącz
                    </button>
                  )}
                </div>

                {user.facebook.social_id !== null ? (
                  <div className="flex flex-row items-center space-x-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />

                    <span className="text-center font-mukta text-[10px] text-white sm:text-[12px]">
                      Twoje konto jest podłączone
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center space-x-1">
                    <MinusCircleIcon className="h-5 w-5 text-red-500" />

                    <span className="text-center font-mukta text-[10px] text-white sm:text-[12px]">
                      Twoje konto nie jest podłączone
                    </span>
                  </div>
                )}

                {user.facebook.social_id !== null ? (
                  <div className="flex flex-row items-end space-x-2 pt-1">
                    <img
                      src={`${ips_config.BACKEND}/media/${user.facebook.image}`}
                      className={`h-7 w-7 rounded-lg`}
                    ></img>

                    {/* Pod koniec września 2023 roku Facebook API został zaktualizowany i dostep do zdjęć użytkowników został ograniczony tylko dla zweryfikowanych developerów */}
                    <span className="h-fit font-mukta text-[12px] text-white">
                      {`${user.facebook.first_name} ${user.facebook.last_name}`}
                    </span>
                  </div>
                ) : (
                  <div className="flex pt-1">
                    <button
                      className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-1 text-[12px] text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => openFacebookLinkPage()}
                    >
                      Podłącz
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex h-full w-full md:w-1/2">
            <div className="flex h-28 w-full flex-row items-center space-x-2 p-3 sm:space-x-4">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-red-400 text-white">
                <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                  <path
                    d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="flex h-full grow flex-col items-start space-y-1">
                <div className="flex h-auto w-full flex-row justify-between pr-5 ">
                  <span className="text-md text-center font-mukta text-white">
                    Google
                  </span>
                  {user.gmail.social_id !== null && (
                    <button
                      className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 text-[12px] text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => dispatch(unlink_google(xcsrftoken))}
                    >
                      Odłącz
                    </button>
                  )}
                </div>

                {user.gmail.social_id !== null ? (
                  <div className="flex flex-row items-center space-x-1">
                    <CheckCircleIcon className="h-5 w-5 text-green-400" />

                    <span className="text-center font-mukta text-[10px] text-white sm:text-[12px]">
                      Twoje konto jest podłączone
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-row items-center space-x-1">
                    <MinusCircleIcon className="h-5 w-5 text-red-500" />

                    <span className="text-center font-mukta text-[10px] text-white sm:text-[12px]">
                      Twoje konto nie jest podłączone
                    </span>
                  </div>
                )}

                {user.gmail.social_id !== null ? (
                  <div className="flex flex-row items-end space-x-2 pt-1">
                    <img
                      src={`${ips_config.BACKEND}/media/${user.gmail.image}`}
                      className={`h-7 w-7 rounded-lg`}
                    ></img>
                    <span className="h-fit font-mukta text-[12px] text-white">
                      {`${user.gmail.first_name} ${user.gmail.last_name}`}
                    </span>
                  </div>
                ) : (
                  <div className="flex pt-1">
                    <button
                      className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-3 py-1 text-[12px] text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
                      onClick={() => openGoogleLinkPage()}
                    >
                      Podłącz
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return [
    renderCategory,
    updateCheckLocalization,
    setUpdateCheckLocalization,
    formUser,
    setFormUser,
    formErrorEditStill,
    openModalLogoutAll,
    setOpenModalLogoutAll,
    modalLogoutAll,
    openModalDeleteAcount,
    modalDeleteAccount,
    checkNewLocalization,
  ];
}
export default useSettingsPage;
