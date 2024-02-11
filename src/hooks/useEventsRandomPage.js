import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCities, getHandlerData, getUser, getProvinces } from "../selectors";
import {
  CheckIcon,
  ExclamationIcon,
  LocationMarkerIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  UserGroupIcon,
  FireIcon,
  XIcon,
  PhotographIcon,
} from "@heroicons/react/solid";
import { Scrollbars } from "react-custom-scrollbars-2";
import googleLogo from "../files/google-maps.png";
import { Link } from "react-router-dom";
import { change_user_location, change_user_distance } from "../actions/auth";
import { events_random_reaction } from "../actions/data";
import { RotatingLines } from "react-loader-spinner";
import ips_config from "../ips_config";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function useEventsRandomPage() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const cities = useSelector(getCities);
  const provinces = useSelector(getProvinces);
  const handler_data = useSelector(getHandlerData);
  // STATE DO NIE WYSWIETLANIA PROPOZYCJI AUTOMATYCZNEJ ZMIANY LOKALIZACJI, GDY UŻYTKOWNIK ZANULUJE PROŚBĘ
  const [disableCheckLocalization, setDisableCheckLocalization] =
    useState(false);
  // STATE DO ZMIANY VALUEINPUT WOJEWODZTWA I MIASTA, GDY NASTĄPI AUTOMATYCZNA ZMIANA LOKALIZACJI
  const [updateCheckLocalization, setUpdateCheckLocalization] = useState(false);

  // POD DANE FILTRY LOKALIZACJI I DYSTANSU
  //  ||
  //  ||
  //  \/
  // STATE "STOP==TRUE" GDY:
  // 1. NASTĄPI OSTATNIE POBRANIE DANYCH ([10-2=8 => new_data.length < 8] || [reducer.length == 0 i new_data.length < 10] ) TO REDUCER USTAWIA KOD "660"
  // LUB
  // 2. GDY PRZEDOSTATNI FETCH AKURAT ZOSTANIE POBRANE 10 OSTATNICH WYDARZEŃ (2 JUŻ BĘDĄCE W REDUCERZE + 8 NOWYCH), TO DODATKOWY FETCH I WEJDZIE [10-2=8 => new_data.length < 8]
  //  ||
  //  ||
  //  \/
  // GDY HANDLER CHOCIAŻ RAZ PRZYJMIE KOD "660" TO USTAW "stopFetching". GDY NASTĄPI ZMIANA FILTRÓW, TO ODBLOKUJ "stopFetching"
  // [handler_data.code !== "660"] I TAK BO JAKIŚ PROBLEM, ALE W TAKI SPOSÓB DZIAŁA IDEALNIE

  const [stopFetching, setStopFetching] = useState(false);

  useEffect(() => {
    if (handler_data.code == "660") {
      setStopFetching(true);
    }
  }, [handler_data.code]);

  // VALIDACJA

  const formErrorInitial = {
    city: "Wybierz miasto znajdujące się w podanym województwie.",
  };

  const [formError, setFormError] = useState({});

  function checkCity(city) {
    for (var key in cities) {
      if (cities[key].name == city) {
        return true;
      }
    }
    return false;
  }

  function formErrorStill() {
    setFormError({
      ...formError,
      city: formErrorInitial["city"],
    });
  }

  function formErrorDelete() {
    setFormError({});
  }

  // HANDLER

  const handleValueChange = (e) => {
    if (e.target.name == "city") {
      if (checkCity(e.target.value)) {
        formErrorDelete();
      } else {
        formErrorStill();
      }
    }
    if (e.target.name == "distance") {
      setValueInput({
        ...valueInput,
        [e.target.name]: parseInt(e.target.value),
      });
    } else {
      setValueInput({ ...valueInput, [e.target.name]: e.target.value });
    }
  };

  function checkForm(value) {
    {
      return formError[value] ? (
        <span className="h-auto w-full text-start font-mukta text-xs text-gray-300">
          {formError[value]}
        </span>
      ) : (
        <CheckIcon className="mt-2 block h-8 w-8 text-green-400"></CheckIcon>
      );
    }
  }

  const [valueInput, setValueInput] = useState({
    province: user.city.county.province.name,
    city: user.city.name,
    distance: user.distance,
  });
  const [activeImage, setActiveImage] = useState(0);

  //SPRAWDZANIE BIEŻĄCEJ LOKALIZACJI

  function checkNewLocalization(checkLocalization, xcsrftoken) {
    if (
      checkLocalization !== null &&
      checkLocalization.id !== user.city.id &&
      disableCheckLocalization == false
    ) {
      return (
        <div className="flex h-32 w-full flex-col rounded-xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 lg:h-auto lg:max-w-[300px]">
          <div className="flex h-auto w-full items-center justify-start rounded-t-xl bg-gradient-to-r from-gray-800 to-slate-700 px-6 py-1">
            <span className="text-[12px] text-white">Wykryto inne miasto</span>
          </div>
          <div className="flex h-auto w-full flex-col">
            <div className="flex h-auto w-full flex-row space-x-2 p-3">
              <div className="flex h-full w-6">
                <ExclamationIcon className="h-6 w-6 text-yellow-300" />
              </div>
              <div className="flex h-full grow">
                <span className="font-mukta text-xs text-gray-100 lg:text-sm">
                  {`Twoja lokalizacja mówi, że znajdujesz się w "${checkLocalization.name}". Chcesz zmienić lokalizację?`}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-row items-center justify-center space-x-5 pb-4">
              <button
                className={`h-7 w-16 rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600 text-center text-xs font-medium text-white shadow-lg shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300`}
                onClick={() => {
                  setDisableCheckLocalization(true);
                }}
              >
                Anuluj
              </button>
              <button
                className={`h-7 w-16 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-center text-xs font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                onClick={() => {
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

  // TEMPLATE RENDERÓW

  function renderLocation(xcsrftoken) {
    return (
      <div className="flex w-full flex-col space-y-2 md:w-auto lg:w-full">
        <div className="flex  flex-col  space-y-2">
          <div className="flex w-full flex-col space-y-1 md:w-1/2 lg:w-full">
            <label className="font-mukta text-xs text-gray-200 lg:text-sm 2xl:text-base">
              Województwo
            </label>
            <select
              name="province"
              id="provincesEventsRandomSelect"
              onChange={handleValueChange}
              value={valueInput.province}
              className="w-full rounded-md border-2 border-blue-400  bg-transparent font-mukta text-xs text-gray-100 focus:ring-0 md:w-[300px] lg:w-auto lg:text-sm 2xl:text-base"
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
          </div>
          <div className="flex w-full flex-col space-y-1 md:w-1/2 lg:w-full">
            <label className="font-mukta text-xs text-gray-200 lg:text-sm 2xl:text-base">
              Miasto
            </label>
            <select
              name="city"
              id="citiesEventsRandomSelect"
              onChange={handleValueChange}
              value={valueInput.city}
              className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-xs text-gray-100 focus:ring-0 md:w-[300px] lg:w-auto lg:text-sm 2xl:text-base"
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
        {valueInput.city !== user.city.name && (
          <div
            className={`flex w-full flex-row ${
              valueInput.city !== "Brak"
                ? "justify-between space-x-3"
                : "justify-start"
            } `}
          >
            {checkForm("city")}
            {valueInput.city !== "Brak" && (
              <div className="flex pt-2">
                <button
                  onClick={() => {
                    dispatch(change_user_location(xcsrftoken, valueInput));
                  }}
                  type="submit"
                  value="Submit"
                  className={`h-9 w-28 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 text-center text-sm font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300`}
                >
                  Zmień miasto
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  function renderDistance(xcsrftoken) {
    return (
      <div className="flex h-auto w-full shrink-0 flex-col space-y-4 md:w-[250px] md:pl-8 lg:w-full lg:pl-0">
        <div className="flex w-full flex-row items-center space-x-4 lg:flex-col lg:items-end lg:space-x-0">
          <div className="flex w-full flex-col space-y-2">
            <label className="font-mukta text-xs text-gray-200  lg:text-sm 2xl:text-base">
              Odległość
            </label>
            <input
              type="range"
              min="2"
              max="400"
              name="distance"
              value={valueInput.distance}
              onChange={handleValueChange}
              className=" h-6 w-full rounded-full bg-gray-600"
            />
          </div>

          <span className="shrink-0 pt-6 text-end font-mukta text-xs text-gray-100 lg:pt-0 lg:text-sm">
            {`${valueInput.distance} km`}
          </span>
        </div>
        {valueInput.distance !== user.distance && (
          <div className="flex w-full flex-row justify-between space-x-3 px-2">
            <button
              onClick={() => {
                setValueInput({
                  ...valueInput,
                  distance: user.distance,
                });
              }}
              type="submit"
              value="Submit"
              className={`h-auto w-28 rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600  p-2 text-center text-xs font-medium text-white shadow-lg shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300`}
            >
              Anuluj
            </button>
            <button
              onClick={() => {
                dispatch(change_user_distance(xcsrftoken, valueInput.distance));
              }}
              type="submit"
              value="Submit"
              className={`h-auto w-28 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-2 text-center text-xs font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300`}
            >
              Zmień dystans
            </button>
          </div>
        )}
      </div>
    );
  }

  function eventDetails(event) {
    return (
      <Scrollbars className="">
        <div className="flex flex-col space-y-10">
          <div className="group flex flex-col space-y-3 px-5 pt-2 lg:pt-7">
            <div className="flex flex-col">
              <span className="break-anywhere text-md  h-auto font-mukta text-[11px] text-gray-300">
                {event.category}
              </span>

              <span className="break-anywhere h-auto  text-start font-mukta text-2xl text-gray-100">
                {event.title}
              </span>
            </div>

            <Link
              to={`/event/${event.slug}-${event.uuid}`}
              className="flex w-fit cursor-pointer flex-row items-center justify-center space-x-1 rounded-lg border-2 border-gray-300  transition ease-in-out group-hover:border-gray-200"
            >
              <span className="break-anywhere h-auto w-auto pl-2 font-mukta text-[12px] text-gray-300 transition ease-in-out group-hover:text-gray-200">
                Przejdź do wydarzenia
              </span>
              <ChevronRightIcon className="h-6 w-6 text-gray-300 transition ease-in-out group-hover:scale-125" />
            </Link>
          </div>

          <div className="flex flex-col space-y-3 px-5">
            <span className="break-anywhere h-auto text-start font-mukta text-xl text-gray-100">
              Opis
            </span>
            <span className="break-anywhere h-auto text-start font-mukta text-[12px] text-gray-300  sm:text-[15px]">
              {event.text}
            </span>
          </div>
          <div className="flex flex-col space-y-3 px-5">
            <span className="break-anywhere h-auto text-start font-mukta text-xl text-gray-100">
              Informacje
            </span>
            <div className="flex flex-col space-y-3">
              <div className="flex flex-row  space-x-2">
                <div className="flex w-1/2 flex-row items-center justify-center  sm:justify-start">
                  <LocationMarkerIcon className="h-8 w-8 text-gray-100" />

                  <div className="flex h-auto w-auto flex-col items-start">
                    <span className="font-mukta text-[12px] text-gray-200 sm:text-[14px]">
                      {event.city}
                    </span>

                    <span className="font-mukta text-[10px] text-gray-400 sm:text-[11px]">
                      {event.province}
                    </span>
                  </div>
                </div>
                <div className="flex w-1/2 flex-row items-center  justify-center  space-x-1 sm:justify-start">
                  <CalendarIcon className="h-8 w-8 text-gray-100 " />
                  <div className="flex h-auto w-auto flex-col items-start">
                    <span className="font-mukta text-[12px] text-gray-200 sm:text-[14px]">
                      {moment(event.event_date).format("DD.MM.YY r.")}
                    </span>
                    <span className="font-mukta text-[10px] text-gray-400 sm:text-[11px]">
                      {moment(event.event_date).fromNow()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row space-x-2">
                <div className="flex w-1/2 flex-row items-center justify-center  space-x-1  pr-5 sm:justify-start sm:pr-0">
                  {event.location_distance !== "0.0 m" ? (
                    <>
                      <a
                        className="ml-[3px] h-7 w-7"
                        href={event.gps_googlemap}
                        target="_blank"
                      >
                        <img className="h-7 w-7" src={googleLogo}></img>
                      </a>

                      <span className="font-mukta text-[12px] text-gray-200 sm:text-[14px]">
                        {event.location_distance.split(".")[0].slice(0, -3)} km
                      </span>
                    </>
                  ) : (
                    <span className="pl-2 font-mukta text-[12px] text-gray-200 sm:text-[14px]">
                      Twoje miasto !
                    </span>
                  )}
                </div>
                <div className="flex w-1/2 flex-row items-center justify-center space-x-1  pr-5 sm:justify-start sm:pr-0">
                  <UserGroupIcon className="h-8 w-8 text-gray-100 " />

                  <span className="font-mukta text-[12px] text-gray-200 sm:text-[14px]">
                    {`${event.num_reputation} osób`}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-3 px-5">
            <span className="break-anywhere h-auto text-start font-mukta text-xl text-gray-100">
              Organizator
            </span>
            <div className="group flex flex-row items-center space-x-3">
              <div className="flex h-auto w-12">
                <Link to={`/user/${event.user}`} className="flex h-12 w-12">
                  <img
                    src={`${ips_config.BACKEND}/media/${event.user_image}`}
                    className="12 w-12 rounded-full transition ease-in-out group-hover:scale-125"
                  ></img>
                </Link>
              </div>
              <div className="flex flex-col items-start">
                <Link
                  to={`/user/${event.user}`}
                  className="flex w-auto items-center"
                >
                  <span className="font-mukta text-[12px] text-gray-100 sm:text-[15px]">
                    {event.user}
                  </span>
                </Link>

                <Link
                  to={`/user/${event.user}?type=created_future`}
                  className="flex grow"
                >
                  <span className="cursor-pointer font-mukta text-[12px] text-gray-400 hover:underline hover:underline-offset-1">
                    Więcej wydarzeń od tego użytkownika.
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div
            className={`${
              event.series == null && "pb-7"
            } flex flex-col space-y-3 px-5`}
          >
            <span className="break-anywhere h-auto text-start font-mukta text-xl text-gray-100">
              Harmonogram wydarzenia
            </span>
            {scheduleRender(event.schedule)}
          </div>
          {event.series !== null && (
            <div className="flex flex-col space-y-3">
              <span className="break-anywhere h-auto px-5 text-start font-mukta text-xl text-gray-100">
                Seria wydarzeń
              </span>
              <div className="flex flex-col space-y-1 px-5">
                <span className="h-auto text-center font-mukta text-gray-200">
                  {event.series}
                </span>
                <span className="h-auto text-center font-mukta text-[12px] text-gray-200 sm:text-[15px]">
                  {event.series_details}
                </span>
              </div>
              {seriesEventsRender(event.series_events, event.title)}
            </div>
          )}
        </div>
      </Scrollbars>
    );
  }

  // w-[820px]

  function renderEvent(event, xcsrftoken) {
    return (
      <div className="flex h-full min-h-[430px]  flex-col overflow-hidden rounded-lg bg-gradient-to-br  from-gray-600 via-gray-600 to-slate-500 drop-shadow-3xl lg:w-[450px] xl:w-[600px] xl:flex-row 2xl:w-[820px]">
        {imagesRender(
          event.image,
          activeImage,
          setActiveImage,
          event.id,
          xcsrftoken
        )}
        <div className="flex h-full xl:w-1/2">{eventDetails(event)}</div>
      </div>
    );
  }

  function scheduleRender(schedule) {
    let scheduleArray = eval(schedule);

    return (
      <div className="flex flex-col divide-y-2 divide-gray-400">
        {scheduleArray.map((schedule, index) => (
          <div
            className="flex flex-row items-center justify-between p-2"
            key={index}
          >
            <div className="flex flex-row items-center">
              <span className="h-auto font-mukta text-gray-100">{`${String(
                schedule[0]
              ).padStart(2, "0")}:${String(schedule[1]).padStart(
                2,
                "0"
              )}`}</span>
              {schedule[2] !== "" && schedule[3] !== "" && (
                <span className="h-auto pl-1 font-mukta text-gray-100">{`- ${String(
                  schedule[2]
                ).padStart(2, "0")}:${String(schedule[3]).padStart(
                  2,
                  "0"
                )}`}</span>
              )}
            </div>
            <div className="break-anywhere flex items-center text-justify">
              <span className="w-full font-mukta text-sm text-gray-100">
                {schedule[4]}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  function seriesEventsRender(series_events, active_event) {
    return (
      <div className="flex flex-col divide-y-2 divide-gray-400 overflow-hidden rounded-t-xl">
        {series_events.map((event) => (
          <Link
            to={`/event/${event.slug}-${event.uuid}`}
            className={`${
              active_event == event.title ? "bg-gray-600" : "hover:bg-gray-500"
            } group flex cursor-pointer flex-row items-center justify-between space-x-3 py-2 px-1 md:px-12  lg:px-4`}
            key={event.id}
          >
            <div className="flex h-full grow flex-row space-x-3">
              <div className="flex w-12 flex-col items-center space-y-2">
                <div className="flex h-10 w-10">
                  <img
                    src={`${ips_config.BACKEND}/media/${event.image}`}
                    className="h-10 w-10 rounded-lg object-cover transition ease-in-out group-hover:scale-110"
                  ></img>
                </div>
                <span className="font-mukta text-[8px] text-gray-200 sm:text-[9px]">
                  {moment(event.event_date).format("DD.MM.YY r.")}
                </span>
              </div>

              <div className="flex grow flex-col">
                <span className="break-anywhere h-auto w-auto text-start font-mukta text-[12px] text-gray-100">
                  {event.title}
                </span>
                <span className="break-anywhere text-md  h-auto font-mukta text-[10px] text-gray-300">
                  {event.category}
                </span>
              </div>
            </div>

            <div className="flex w-[100px] flex-col space-y-2 ">
              <div className="flex flex-row items-center justify-start">
                <LocationMarkerIcon className="h-4 w-4 text-gray-100 sm:h-6 sm:w-6" />

                <div className="flex h-auto w-auto flex-col items-start">
                  <span className="truncate font-mukta text-[11px] text-gray-200">
                    {event.city}
                  </span>

                  <span className="truncate font-mukta text-[8px] text-gray-400">
                    {event.province}
                  </span>
                </div>
              </div>

              <div className="flex flex-row items-center space-x-1">
                <UserGroupIcon className="h-3 w-3 text-gray-100 sm:h-5 sm:w-5 " />

                <span className="font-mukta text-[11px] text-gray-200">
                  {event.num_reputation}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  function imagesRender(
    images,
    activeImage,
    setActiveImage,
    id_event,
    xcsrftoken
  ) {
    let numbersImages = images.length;

    return (
      <div className="flex h-full w-full overflow-hidden xl:w-1/2">
        <div className="absolute top-0 flex h-12 w-full flex-row items-center justify-center space-x-4 lg:max-w-[450px] xl:w-1/2 xl:max-w-[300px] 2xl:max-w-[410px]">
          {images.map((image, index) => (
            <div
              className={`${
                activeImage == index
                  ? "h-9 w-9 bg-gray-200 "
                  : "h-6 w-6 bg-gray-100 hover:scale-125"
              } flex cursor-pointer items-center justify-center rounded-full border border-gray-400 transition ease-in-out`}
              onClick={() => {
                setActiveImage(index);
              }}
              key={index}
            >
              <PhotographIcon
                className={`${
                  activeImage == index
                    ? "h-5 w-5 text-gray-600"
                    : "h-4 w-4 text-gray-500"
                }`}
              />
            </div>
          ))}
        </div>

        <div className="absolute  top-[25%] flex h-14 w-full -translate-y-1/2 items-center justify-between px-4 xl:top-[50%] xl:w-1/2">
          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-100 transition ease-in-out hover:scale-125"
            onClick={() => {
              setActiveImage((prevIndex) =>
                prevIndex === 0 ? numbersImages - 1 : prevIndex - 1
              );
            }}
          >
            <ChevronLeftIcon className="h-6 w-6 text-gray-600" />
          </div>

          <div
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-100 transition ease-in-out hover:scale-125"
            onClick={() => {
              setActiveImage((prevIndex) => (prevIndex + 1) % numbersImages);
            }}
          >
            <ChevronRightIcon className="h-6 w-6 text-gray-600" />
          </div>
        </div>

        <div
          className={` h-full w-full bg-cover bg-center bg-no-repeat duration-300`}
          style={{
            backgroundImage: `url(${ips_config.BACKEND}/media/${images[activeImage].image})`,
          }}
        ></div>

        <div className="absolute bottom-[50%] flex h-20 w-full items-center justify-center space-x-6 xl:bottom-0 xl:h-32 xl:w-1/2">
          <div
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-100 transition ease-in-out hover:scale-125 xl:h-20 xl:w-20"
            onClick={() => {
              setActiveImage(0);
              dispatch(events_random_reaction(id_event, "Like", xcsrftoken));
            }}
          >
            <FireIcon className="h-8 w-8 text-gray-600 xl:h-12 xl:w-12 " />
          </div>

          <div
            className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-gray-400 bg-gray-100 transition ease-in-out hover:scale-125 xl:h-20 xl:w-20"
            onClick={() => {
              setActiveImage(0);
              dispatch(events_random_reaction(id_event, "Dislike", xcsrftoken));
            }}
          >
            <XIcon className="h-8 w-8 text-gray-600 xl:h-12 xl:w-12 " />
          </div>
        </div>
      </div>
    );
  }

  function renderEmptyEvents() {
    return (
      <div className="flex h-full min-h-[430px] flex-row items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 via-gray-600 to-slate-500 p-6 drop-shadow-3xl lg:w-[450px] xl:w-[600px] 2xl:w-[820px]">
        <span className="text-center font-mukta text-sm text-gray-200 md:text-lg xl:text-xl">
          Przejrzałeś już wszystkie możliwe wydarzenia pod swoje filtry.
        </span>
      </div>
    );
  }

  function renderLoadingEvents() {
    return (
      <div className="flex h-full min-h-[430px] flex-row items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 via-gray-600 to-slate-500 drop-shadow-3xl lg:w-[450px] xl:w-[600px] 2xl:w-[820px]">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  function moduleEvent(events, xcsrftoken) {
    if (events == null) {
      return renderLoadingEvents();
    } else if (events == "empty") {
      return renderEmptyEvents();
    } else {
      return renderEvent(events[0], xcsrftoken);
    }
  }

  return [
    eventDetails,
    moduleEvent,
    renderLocation,
    renderDistance,
    setUpdateCheckLocalization,
    checkNewLocalization,
    setStopFetching,
    stopFetching,
    formErrorStill,
    updateCheckLocalization,
    setValueInput,
    valueInput,
  ];
}
export default useEventsRandomPage;
