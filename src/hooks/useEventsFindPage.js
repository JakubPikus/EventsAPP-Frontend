import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { getXCSRFToken } from "../selectors";
import { useNavigate } from "react-router-dom";
import { events_list } from "../actions/data";
import { Link } from "react-router-dom";
import googleLogo from "../files/google-maps.png";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  CalendarIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import ips_config from "../ips_config";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function useEventsFindPage() {
  const dispatch = useDispatch();
  const history = useNavigate();

  // INPUT VALUE
  const [valueInput, setValueInput] = useState();

  // STATE DO AKTYWNEJ STRONY
  const [activePage, setActivePage] = useState();

  // HANDLER DO INPUTÓW
  const handleValueChange = (e) => {
    setValueInput({ ...valueInput, [e.target.name]: e.target.value });
  };
  // TO CO WYŻEJ, TYLKO DLA DATEPICKERA INNA PISOWNIA
  const handleValueDatepickerChange = (newValue) => {
    setValueInput({ ...valueInput, ...newValue });
  };

  //ZMIANA STRONY
  function redirectPage(next_page, eventList) {
    // POBIERZ PARAMSY Z DANEJ STRONY A NIE Z INPUTU, ABY INPUT WPLYWAL TYLKO PO POTWIERDZENIU SZUKANIA, A NIE ZMIANY STRONY
    let current_url = new URL(eventList.meta.links.current);
    let searchParams = new URLSearchParams(current_url.search);

    // ZMIEŃ PARAM STRONY NA TĄ, NA KTÓRĄ CHCE ZMIENIC
    searchParams.set("page", next_page);
    current_url.search = searchParams.toString();

    // 1). USTAW NOWĄ AKTYWNĄ STRONE
    // 2). ZMIEŃ W INPUT WARTOŚĆ NOWEJ STRONY
    // 3). JEŻELI REDUX NIE POSIADA W MAGAZYNIE POBRANEJ STRONY, TO POBIERZ DANE NA PODSTAWIE NOWYCH PARAMSÓW
    // 4). PRZEJDZ NA NOWĄ STRONE

    setActivePage(next_page);
    setValueInput({ ...valueInput, page: next_page });

    let new_value = Object.fromEntries(searchParams.entries());
    dispatch(events_list(new_value));
    history("/events_list" + current_url.search);
  }

  // GENEROWANIE PASKA DO ZMIANY STRONY
  function nextPageNavigation(eventList) {
    let count = eventList?.meta?.count;
    let number_pages = Math.ceil(count / 50);
    let pageNumbers = [];
    let startPage = activePage - 4;
    let endPage = activePage + 4;

    if (startPage <= 0) {
      startPage = 1;
      endPage = Math.min(9, number_pages);
    }

    if (endPage > number_pages) {
      endPage = number_pages;
      startPage = Math.max(1, number_pages - 8);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <div
          className={`${
            activePage != 1 && "cursor-pointer hover:bg-slate-600 "
          } flex flex-row -space-x-6 rounded-l-lg border-2 border-blue-400 py-1`}
          onClick={() => {
            if (activePage != 1) {
              redirectPage(1, eventList);
            }
          }}
        >
          <ChevronLeftIcon className="block h-6 w-9 text-white"></ChevronLeftIcon>
          <ChevronLeftIcon className="block h-6 w-9 text-white"></ChevronLeftIcon>
        </div>
        <div
          className={`${
            activePage != 1 && "cursor-pointer hover:bg-slate-600 "
          }flex border-2 border-blue-400 p-1`}
          onClick={() => {
            if (activePage != 1) {
              redirectPage(activePage - 1, eventList);
            }
          }}
        >
          <ChevronLeftIcon className="block h-6 w-9 text-white"></ChevronLeftIcon>
        </div>
        {pageNumbers.map((page) => {
          return (page == endPage && page < number_pages) ||
            (page == startPage && page > 1) ? (
            <div className={`flex border-2 border-blue-400 p-1`} key={page}>
              <p className="h-6 w-6 text-center font-mukta text-white">...</p>
            </div>
          ) : (
            <div
              className={`${
                activePage == page
                  ? "bg-slate-500 "
                  : "cursor-pointer hover:bg-slate-600 "
              }flex border-2 border-blue-400 p-1`}
              key={page}
              onClick={() => {
                if (activePage != page) {
                  redirectPage(page, eventList);
                }
              }}
              id={`page${page}`}
            >
              <p className="h-6 w-6 text-center font-mukta text-white">
                {page}
              </p>
            </div>
          );
        })}
        <div
          className={` ${
            activePage != number_pages &&
            number_pages > 1 &&
            "cursor-pointer hover:bg-slate-600 "
          } flex border-2 border-blue-400 p-1`}
          onClick={() => {
            if (activePage != number_pages && number_pages > 1) {
              redirectPage(activePage + 1, eventList);
            }
          }}
        >
          <ChevronRightIcon className="block h-6 w-9 text-white"></ChevronRightIcon>
        </div>
        <div
          className={` ${
            activePage != number_pages &&
            number_pages > 1 &&
            "cursor-pointer hover:bg-slate-600 "
          } flex flex-row -space-x-6 rounded-r-lg border-2 border-blue-400 py-1`}
          onClick={() => {
            if (activePage != number_pages && number_pages > 1) {
              redirectPage(number_pages, eventList);
            }
          }}
        >
          <ChevronRightIcon className="block h-6 w-9 text-white"></ChevronRightIcon>
          <ChevronRightIcon className="block h-6 w-9 text-white"></ChevronRightIcon>
        </div>
      </>
    );
  }

  function eventTemplate(event, showDistance) {
    return (
      <div
        className="flex h-[280px] w-[170px] flex-col rounded-xl sm:h-[300px] sm:w-[200px] xl:h-[370px] xl:w-[270px]"
        key={event.id}
      >
        <div className="flex h-1/2 w-full">
          <Link
            to={`/event/${event.slug}-${event.uuid}`}
            className="flex h-auto w-full overflow-hidden rounded-t-xl"
          >
            <img
              src={`${ips_config.BACKEND}/media/${event.image}`}
              className="h-full w-full cursor-pointer object-cover transition ease-in-out hover:scale-110"
            ></img>
          </Link>
        </div>

        <div className="flex h-1/2 w-full flex-col rounded-b-xl border-r-2 border-b-2 border-l-2 border-blue-400">
          <div className="flex h-24 w-full items-center justify-center">
            <Link to={`/event/${event.slug}-${event.uuid}`}>
              <p className="break-anywhere cursor-pointer px-4 text-center font-mukta text-sm text-white hover:bg-slate-400 hover:text-black xl:text-base">
                {event.title}
              </p>
            </Link>
          </div>

          <div className="flex h-full w-full flex-col space-y-5 xl:space-y-10">
            <div className="flex h-1/2 w-full flex-row justify-between space-x-3 px-2">
              <div className="flex w-auto flex-row items-center space-x-2">
                <LocationMarkerIcon className="block h-5 w-5 text-gray-100 sm:h-6 sm:w-6"></LocationMarkerIcon>
                <div className="flex flex-col">
                  <p className="font-mukta text-xs text-white sm:text-sm xl:text-base">
                    {event.city}
                  </p>
                  <span className="font-mukta text-[9px] text-gray-500 xl:text-[11px]">
                    {event.province}
                  </span>
                </div>
              </div>

              {parseInt(event.location_distance) > 0 && showDistance && (
                <div className="flex w-[85px] flex-row space-x-2">
                  <a
                    className="h-6 w-6"
                    href={event.gps_googlemap}
                    target="_blank"
                  >
                    <img className="h-6 w-6" src={googleLogo}></img>
                  </a>

                  <p className="font-mukta text-sm text-white xl:text-base">
                    {event.location_distance.split(".")[0].slice(0, -3)} km
                  </p>
                </div>
              )}
            </div>

            <div className="flex h-1/2 w-full flex-row justify-between px-2">
              <div className="flex h-5 w-auto flex-row space-x-1 sm:h-6 sm:space-x-2">
                <CalendarIcon className="block h-5 w-5 text-gray-100 sm:h-6 sm:w-6"></CalendarIcon>
                <p className="mt-0.5 text-center font-mukta text-xs text-white sm:text-sm xl:text-base">
                  {moment(event.event_date).format("DD MMM YYYY")}
                </p>
              </div>
              <div className="flex h-5 flex-row space-x-1 pr-5 sm:h-6">
                <UserGroupIcon className="h-5 w-5 text-gray-300 sm:h-6 sm:w-6" />
                <p className="mt-1 text-center font-mukta text-xs text-white sm:mt-0.5 sm:text-sm xl:text-base">
                  {event.num_reputation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // POTWIERDZENIE SZUKANIA WYDARZENIA
  function handleSubmit(e) {
    e.preventDefault();

    //USUŃ Z INPUTU STARĄ STRONĘ ORAZ WSZYSTKIE KLUCZE O WARTOŚCI "WSZYSTKO" + NULLE DLA DATEPICKERA
    Object.keys(valueInput).reduce(
      (acc, k) => (
        (!valueInput[k] || valueInput[k] == "Wszystko" || k == "page") &&
          delete acc[k],
        acc
      ),
      valueInput
    );

    //1). STWÓRZ PARAMSY PO ODFILTROWANYM INPUCIE ZE ZBĘDNYCH WARTOŚCI
    //2). USTAW AKTYWNĄ STRONĘ NA 1
    //3). WYCZYŚĆ STARE DANE Z MAGAZYNU REDUX
    //4). POBIERZ NOWE DANE
    //5). PRZEJDZ NA NOWĄ STRONE

    var urlParams = new URLSearchParams(valueInput).toString();
    setActivePage(1);
    dispatch(events_list(valueInput));
    history(`/events_list?${urlParams}`);
  }

  return [
    activePage,
    setActivePage,
    valueInput,
    setValueInput,
    nextPageNavigation,
    handleValueChange,
    handleValueDatepickerChange,
    handleSubmit,
    eventTemplate,
  ];
}
export default useEventsFindPage;
