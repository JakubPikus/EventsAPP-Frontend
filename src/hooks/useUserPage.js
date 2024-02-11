import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckIcon,
  XIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LocationMarkerIcon,
  CalendarIcon,
  UserGroupIcon,
  ExclamationIcon,
  PencilAltIcon,
  MinusCircleIcon,
  MinusIcon,
  PlusIcon,
  ReplyIcon,
} from "@heroicons/react/solid";
import {
  events_user,
  friend_request,
  friend_request_reaction,
  friend_remove,
  block_user,
  unblock_user,
} from "../actions/data";
import ips_config from "../ips_config";
import { chat_open } from "../actions/websockets";
import { getUser, getUserRequestBlocked } from "../selectors";

import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function useUserPage() {
  const [valueInput, setValueInput] = useState();
  const [activePage, setActivePage] = useState();
  const [menuEventsRoll, setMenuEventsRoll] = useState();
  const [openModalAcceptFriend, setOpenModalAcceptFriend] = useState(false);
  const [openModalDeleteFriend, setOpenModalDeleteFriend] = useState(false);
  const [openModalBlocked, setOpenModalBlocked] = useState({
    status: false,
    is_admin: false,
  });
  const [time, setTime] = useState(10);

  const [showWrapper, setShowWrapper] = useState({
    events: false,
    badges: false,
    friends: false,
  });

  const dispatch = useDispatch();
  const history = useNavigate();
  const user = useSelector(getUser);
  const blocked = useSelector(getUserRequestBlocked);

  useEffect(() => {
    if (window.innerWidth > 1023) {
      setShowWrapper({
        events: true,
        badges: true,
        friends: true,
      });
    }
  }, []);

  useEffect(() => {
    if (blocked !== null) {
      setOpenModalBlocked({ status: true, is_admin: blocked.is_admin });

      if (blocked.is_admin == false) {
        let timer = setTimeout(() => {
          history("/");
        }, 10000); // 10000 milisekund to 10 sekund

        return () => clearTimeout(timer);
      }
    }
  }, [blocked]);

  useEffect(() => {
    if (openModalBlocked.status == true && openModalBlocked.is_admin == false) {
      const time = setInterval(() => {
        setTime((prevState) => prevState - 1);
      }, 1000);

      return () => clearInterval(time);
    }
  }, [openModalBlocked]);

  function iconInfoRender(state) {
    if (state == "awaiting") {
      return (
        <div className="-mt-3 flex flex-row items-center space-x-2 pl-4">
          <ExclamationIcon className="h-6 w-6 text-yellow-300" />
          <span className="h-auto font-mukta text-[10px] text-gray-200">
            Wydarzenie weryfikowane
          </span>
        </div>
      );
    } else if (state == "need_improvement") {
      return (
        <div className="-mt-3 flex flex-row items-center space-x-2 pl-4">
          <PencilAltIcon className="h-6 w-6 text-yellow-300" />
          <span className="h-auto font-mukta text-[10px] text-gray-200">
            Wydarzenie wymaga zmian.
          </span>
        </div>
      );
    } else if (state == "rejected") {
      return (
        <div className="-mt-3 flex flex-row items-center space-x-2 pl-4">
          <MinusCircleIcon className="h-6 w-6 text-red-500" />
          <span className="h-auto font-mukta text-[10px] text-gray-200">
            Wydarzenie usunięte.
          </span>
        </div>
      );
    }
  }

  function eventTemplate(event) {
    return (
      <div className="flex h-32 w-full  flex-row p-1  2xl:w-1/2" key={event.id}>
        <Link
          to={`/event/${event.slug}-${event.uuid}`}
          className="flex h-full w-32 shrink-0 overflow-hidden rounded-l-lg xs:w-24"
        >
          <img
            src={`${ips_config.BACKEND}/media/${event.image}`}
            className="h-full w-32 object-cover transition ease-in-out hover:scale-110"
          ></img>
        </Link>

        <div
          className={`${
            event.current == true ? "border-blue-400" : "border-gray-400"
          } flex h-full grow flex-col space-y-2 overflow-hidden rounded-r-lg border-r-2 border-b-2 border-t-2 pt-2 pl-4 xs:pl-2`}
        >
          <div className="flex flex-col">
            <div className="flex w-auto justify-between gap-2">
              <span className="min-w-0  overflow-hidden truncate font-mukta text-base text-gray-200 lg:w-[333px] xl:w-[368px] ">
                {event.title}
              </span>

              <div className="flex shrink-0 flex-row items-center space-x-1 pr-2">
                <UserGroupIcon className="h-4 w-4 text-gray-300" />
                <span className="font-mukta text-[11px] text-gray-200">
                  {event.num_reputation}
                </span>
              </div>
            </div>

            <span className="font-mukta text-[11px] text-gray-400">
              {event.category}
            </span>
          </div>

          <div className="flex grow flex-row justify-between">
            <div className="flex h-auto w-auto flex-row space-x-2 xs:space-x-0">
              <div className="flex h-auto w-auto flex-col">
                <LocationMarkerIcon className="h-6 w-6 shrink-0 text-gray-300 xs:pt-1" />
              </div>
              <div className="flex h-auto w-auto flex-col items-start">
                <span className="font-mukta text-sm text-gray-200 xs:text-[11px]">
                  {event.city}
                </span>

                <span className="font-mukta text-[11px] text-gray-400 xs:text-[9px]">
                  {event.province}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 pr-2">
              <div className="flex flex-row justify-end space-x-1">
                <CalendarIcon className="h-4 w-4 text-gray-300 " />
                <span className="font-mukta text-[11px] text-gray-200">
                  {moment(event.event_date).format("DD.MM.YY")}
                </span>
              </div>

              {event.user == user.username && (
                <div className="flex w-auto grow flex-row justify-end">
                  {iconInfoRender(event.verificated)}
                  {event.verificated !== "rejected" &&
                    event.current == true && (
                      <Link to={`/edit/${event.slug}-${event.uuid}`}>
                        <button
                          value="add"
                          className="h-5 w-14 rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-center text-[11px] font-medium text-white shadow-lg shadow-blue-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 "
                        >
                          Edytuj
                        </button>
                      </Link>
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MODUŁ KATEGORII
  function menuEventsCategory(
    events_type,
    user_events_type,
    userEvents,
    username
  ) {
    let object_types;
    if (username == user.username) {
      object_types = { ...user_events_type, ...events_type };
    } else {
      object_types = events_type;
    }

    return Object.keys(object_types).map((event_type, index) => (
      <React.Fragment key={index}>
        <button
          type="button"
          name="type"
          onClick={() => {
            if (
              valueInput?.type !== object_types[event_type] &&
              valueInput?.type !== undefined
            ) {
              setValueInput({
                ...valueInput,
                type: object_types[event_type],
                events_category: "all",
                page: 1,
              });
            }
          }}
          className="flex w-full flex-row items-center px-4 py-2 font-mukta text-sm text-gray-200 hover:bg-slate-600 focus:z-10 focus:bg-slate-500 focus:drop-shadow-2xl"
        >
          {valueInput?.type == object_types[event_type] ? (
            <CheckIcon className="mr-3 h-6 w-6 shrink-0 cursor-pointer text-green-500" />
          ) : (
            <div className="mr-3 flex h-6 w-6 shrink-0"></div>
          )}
          <span className="h-auto font-mukta text-xs text-gray-200 sm:text-sm">
            {event_type}
          </span>

          <div className="flex grow justify-end">
            <ChevronRightIcon
              className={`${
                valueInput?.type == object_types[event_type] && "-rotate-90"
              } ml-3 h-8 w-8 shrink-0 cursor-pointer text-green-500 transition ease-in-out`}
            />
          </div>
        </button>

        <div
          className={`${
            menuEventsRoll == object_types[event_type] ? "max-h-full" : "h-0"
          } flex w-full flex-col overflow-hidden transition-max-height duration-200`}
        >
          <button
            type="button"
            onClick={() =>
              setValueInput({ ...valueInput, events_category: "all", page: 1 })
            }
            className="flex w-full flex-row items-center bg-blue-600 py-3 pl-14 pr-4 font-mukta text-sm text-gray-200 hover:bg-blue-500 focus:z-10 focus:bg-blue-400 focus:drop-shadow-2xl"
          >
            {valueInput?.events_category == "all" ? (
              <CheckIcon className="mr-6 h-6 w-6 shrink-0 cursor-pointer text-green-500" />
            ) : (
              <div className="mr-6 flex h-6 w-6 shrink-0"></div>
            )}
            <span className="h-auto font-mukta text-xs text-gray-200 sm:text-sm">
              Wszystkie wydarzenia
            </span>
          </button>
          {userEvents.meta.categories.map((category, index) => (
            <button
              type="button"
              onClick={() =>
                setValueInput({
                  ...valueInput,
                  events_category: category,
                  page: 1,
                })
              }
              key={index}
              className="flex w-full flex-row items-center bg-blue-600 py-3 pl-14 pr-4 font-mukta text-sm text-gray-200 hover:bg-blue-500 focus:z-10 focus:bg-blue-400 focus:drop-shadow-2xl"
            >
              {valueInput?.events_category == category ? (
                <CheckIcon className="mr-6 h-6 w-6 shrink-0 cursor-pointer text-green-500" />
              ) : (
                <div className="mr-6 flex h-6 w-6 shrink-0"></div>
              )}

              <span className="h-auto font-mukta text-xs text-gray-200 sm:text-sm">
                {category}
              </span>
            </button>
          ))}
        </div>
      </React.Fragment>
    ));
  }

  function redirectPage(next_page, userEvents, username) {
    // POBIERZ PARAMSY Z DANEJ STRONY A NIE Z INPUTU, ABY INPUT WPLYWAL TYLKO PO POTWIERDZENIU SZUKANIA, A NIE ZMIANY STRONY
    let current_url = new URL(userEvents.meta.links.current);
    let searchParams = new URLSearchParams(current_url.search);

    // ZMIEŃ PARAM STRONY NA TĄ, NA KTÓRĄ CHCE ZMIENIC
    searchParams.set("page", next_page);
    searchParams.delete("username");
    current_url.search = searchParams.toString();

    // 1). USTAW NOWĄ AKTYWNĄ STRONE
    // 2). ZMIEŃ W INPUT WARTOŚĆ NOWEJ STRONY
    // 3). JEŻELI REDUX NIE POSIADA W MAGAZYNIE POBRANEJ STRONY, TO POBIERZ DANE NA PODSTAWIE NOWYCH PARAMSÓW
    // 4). PRZEJDZ NA NOWĄ STRONE

    setActivePage(next_page);
    setValueInput({ ...valueInput, page: next_page });

    let new_value = Object.fromEntries(searchParams.entries());
    dispatch(events_user(username, new_value));
    history(`/user/${username}${current_url.search}`);
  }

  function nextPageNavigation(userEvents, username) {
    let count = userEvents.meta.count;
    let number_pages = Math.ceil(count / 30);
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
          } flex h-[40px]  flex-row items-center -space-x-6 rounded-l-lg border-2 border-blue-400 py-1 lg:h-[44px]`}
          onClick={() => {
            if (activePage != 1) {
              redirectPage(1, userEvents, username);
            }
          }}
        >
          <ChevronLeftIcon className="block h-6 w-9 text-white"></ChevronLeftIcon>
          <ChevronLeftIcon className="block h-6 w-9 text-white"></ChevronLeftIcon>
        </div>
        <div
          className={`${
            activePage != 1 && "cursor-pointer hover:bg-slate-600 "
          } flex h-[40px] items-center border-2 border-blue-400 p-1 lg:h-[44px] `}
          onClick={() => {
            if (activePage != 1) {
              redirectPage(activePage - 1, userEvents, username);
            }
          }}
        >
          <ChevronLeftIcon className="block h-6 w-9 text-white"></ChevronLeftIcon>
        </div>
        {pageNumbers.map((page) => {
          return (page == endPage && page < number_pages) ||
            (page == startPage && page > 1) ? (
            <div
              className={`flex h-[40px] items-center border-2 border-blue-400  p-1 lg:h-[44px]`}
              key={page}
            >
              <p className="h-6 w-6  text-center font-mukta text-white">...</p>
            </div>
          ) : (
            <div
              className={`${
                activePage == page
                  ? "bg-slate-500 "
                  : "cursor-pointer hover:bg-slate-600 "
              } flex h-[40px] items-center justify-center border-2 border-blue-400 p-1 lg:h-[44px] `}
              onClick={() => {
                if (activePage != page) {
                  redirectPage(page, userEvents, username);
                }
              }}
              id={`page${page}`}
              key={page}
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
          } flex h-[40px] items-center border-2 border-blue-400 p-1 lg:h-[44px] `}
          onClick={() => {
            if (activePage != number_pages && number_pages > 1) {
              redirectPage(activePage + 1, userEvents, username);
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
          } flex h-[40px] flex-row items-center -space-x-6 rounded-r-lg border-2 border-blue-400 py-1 lg:h-[44px] `}
          onClick={() => {
            if (activePage != number_pages && number_pages > 1) {
              redirectPage(number_pages, userEvents, username);
            }
          }}
        >
          <ChevronRightIcon className="block h-6 w-9 text-white"></ChevronRightIcon>
          <ChevronRightIcon className="block h-6 w-9 text-white"></ChevronRightIcon>
        </div>
      </>
    );
  }

  function actionButtons(activeUser, xcsrftoken) {
    if (activeUser.username == user.username) {
      return (
        <div className="flex h-[40px] items-center  justify-center rounded-lg border-2 border-gray-400 bg-gray-700 px-4 md:h-12">
          <span className="text-center font-mukta text-xs text-gray-300 md:text-sm">
            Twój profil
          </span>
        </div>
      );
    } else if (activeUser.is_friend == "Blocked") {
      return (
        <button
          value="add"
          className="h-8 w-28  rounded-lg bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 py-1 text-center text-[10px] font-medium text-white shadow-lg shadow-rose-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-rose-300 sm:w-36 sm:text-[12px] md:w-40 md:text-sm lg:h-9 xl:w-28 xs:h-6 xs:w-[104px] "
          onClick={() => {
            dispatch(unblock_user(activeUser.id, xcsrftoken));
          }}
        >
          Odblokuj
        </button>
      );
    } else if (activeUser.is_friend == "a) Get_block") {
      return (
        <div className="flex h-12 w-[130px] items-center justify-center rounded-lg border-2  border-red-500 bg-gray-700 px-2 sm:h-16 sm:w-[150px] md:h-12 md:w-[295px] md:px-4">
          <span className="text-center font-mukta text-[10px] text-gray-300  sm:text-xs md:text-sm">
            Jesteś zablokowany przez tego użytkownika
          </span>
        </div>
      );
    } else {
      return (
        <>
          <button
            value="add"
            className="h-8 w-28 rounded-lg bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 py-1 text-center text-[10px] font-medium text-white shadow-lg shadow-rose-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-rose-300 sm:w-36 sm:text-[12px] md:w-40 md:text-sm lg:h-9 xl:w-28 xs:h-6 xs:w-[104px] "
            onClick={() => {
              dispatch(block_user(activeUser.id, xcsrftoken));
            }}
          >
            Zablokuj
          </button>
          <button
            value="chat_open"
            onClick={() => {
              dispatch(
                chat_open({
                  id: activeUser.id,
                  image_thumbnail: activeUser.image_thumbnail,
                  is_friend: activeUser.is_friend == "a) True" ? true : false,
                  username: activeUser.username,
                })
              );
            }}
            className="h-8 w-28 rounded-lg bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 py-1 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 sm:w-36 sm:text-[12px] md:w-40 md:text-sm lg:h-9 xs:h-6 xs:w-[104px]"
          >
            Napisz wiadomość
          </button>
          {friendRequestButton(activeUser, xcsrftoken)}
        </>
      );
    }
  }

  function friendRequestButton(activeUser, xcsrftoken) {
    let state = activeUser.is_friend;
    if (state == "a) True") {
      return (
        <button
          className="h-8 w-28 rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-1 text-center text-[10px] font-medium text-white shadow-lg shadow-red-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 sm:w-36 sm:text-[12px] md:w-40 md:text-sm lg:h-9 xs:h-6 xs:w-[104px]"
          onClick={() => setOpenModalDeleteFriend(true)}
        >
          Usuń ze znajomych
        </button>
      );
    } else if (state == "d) False") {
      return (
        <button
          className="h-8 w-28  rounded-lg bg-gradient-to-r from-green-700 via-green-700 to-green-800 py-1 text-center text-[10px] font-medium text-white shadow-lg shadow-green-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-green-300 sm:w-36 sm:text-[12px] md:w-40 md:text-sm lg:h-9 xs:h-6 xs:w-[104px]"
          onClick={() =>
            dispatch(friend_request(activeUser.id, "Send", xcsrftoken))
          }
        >
          Dodaj do znajomych
        </button>
      );
    } else if (state == "b) Send_request") {
      return (
        <button
          className="h-8 w-28  rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 py-1 text-center text-[10px] font-medium text-white shadow-lg shadow-orange-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-orange-300 sm:w-36 sm:text-[12px] md:w-40 md:text-sm lg:h-9 xs:h-6 xs:w-[104px] "
          onClick={() =>
            dispatch(friend_request(activeUser.id, "Cancel", xcsrftoken))
          }
        >
          Wysłano zaproszenie
        </button>
      );
    } else if (state == "c) Get_request") {
      return openModalAcceptFriend ? (
        <div className="flex h-8 w-28 flex-row space-x-1 overflow-hidden rounded-lg bg-gray-700 p-1  sm:w-36 sm:text-[12px] md:w-40 md:text-sm lg:h-9 xs:h-[35px] xs:w-[104px]">
          <div
            className="flex h-full w-1/3 cursor-pointer items-center justify-center rounded-lg bg-green-500 bg-gradient-to-r from-green-700  via-green-700 to-green-800 sm:w-2/5  "
            onClick={() => {
              dispatch(
                friend_request_reaction(activeUser.id, "accept", xcsrftoken)
              );
              setOpenModalAcceptFriend(!openModalAcceptFriend);
            }}
          >
            <CheckIcon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </div>

          <div
            className="flex h-full w-1/3 cursor-pointer items-center justify-center  rounded-lg bg-red-500 bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 sm:w-2/5"
            onClick={() => {
              dispatch(
                friend_request_reaction(activeUser.id, "reject", xcsrftoken)
              );
              setOpenModalAcceptFriend(!openModalAcceptFriend);
            }}
          >
            <XIcon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </div>

          <div
            className="flex h-full w-1/3 cursor-pointer items-center justify-center  rounded-lg bg-yellow-500 bg-gradient-to-r from-yellow-600  via-yellow-700 to-yellow-800 sm:w-1/5 "
            onClick={() => {
              setOpenModalAcceptFriend(!openModalAcceptFriend);
            }}
          >
            <ReplyIcon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
          </div>
        </div>
      ) : (
        <button
          className={`h-8 w-28 rounded-lg bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 text-center text-[10px]  font-medium text-white shadow-lg shadow-orange-500/10 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-orange-300 sm:w-36 sm:text-[12px] md:w-40 md:text-sm lg:h-9 xs:h-[35px] xs:w-[104px]`}
          onClick={() => {
            setOpenModalAcceptFriend(!openModalAcceptFriend);
          }}
        >
          Otrzymano zaproszenie
        </button>
      );
    }
  }

  function modalBlocked() {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-1/4 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex h-10 w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
            <span className="text-xl text-white">Zostałeś zablokowany</span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                if (openModalBlocked.is_admin == false) {
                  history("/");
                }
                setOpenModalBlocked({ status: false, is_admin: false });
              }}
            />
          </div>
          <div className="flex px-4">
            <span className="text-md text-center font-mukta text-white">
              {`Podczas próby wykonania akcji, zostałeś zablokowany przez tego
              użytkownika. ${
                openModalBlocked.is_admin == false
                  ? `Za ${time} sekund zostaniesz przekierowany na główną
              stronę, a dostęp do tego profilu zostanie zablokowany.`
                  : ""
              }`}
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              onClick={() => {
                if (openModalBlocked.is_admin == false) {
                  history("/");
                }

                setOpenModalBlocked({ status: false, is_admin: false });
              }}
            >
              Zrozumiałem
            </button>
          </div>
        </div>
      </div>
    );
  }

  function modalDelete(username, id, xcsrftoken) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-1/4 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex h-10 w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
            <span className="text-xl text-white">Usuwanie znajomego</span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => setOpenModalDeleteFriend(false)}
            />
          </div>
          <div className="flex px-4">
            <span className="text-md text-center font-mukta text-white">
              {`Jesteś pewny, aby usunąć "${username}" ze znajomych ?`}
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              onClick={() => {
                dispatch(friend_remove(id, xcsrftoken));
                setOpenModalDeleteFriend(false);
              }}
            >
              Tak, usuń
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderFriendsInfo(data) {
    if (
      data.username == user.username ||
      data.friends_together_count == 0 ||
      data.friendslist_together.length == 0
    ) {
      return (
        <div className="flex h-auto w-full flex-row items-center">
          <div className="flex h-full w-full"></div>
          <span className="h-auto shrink-0 py-1 font-mukta text-lg text-gray-200 sm:text-xl">
            {`${data.friends_count} znajomi:`}
          </span>
          <div className="flex h-full w-full items-center justify-end pr-2">
            {showWrapper.friends ? (
              <MinusIcon
                className="h-6 w-6 cursor-pointer text-red-500"
                onClick={() => {
                  setShowWrapper({
                    ...showWrapper,
                    friends: !showWrapper.friends,
                  });
                }}
              />
            ) : (
              <PlusIcon
                className="h-6 w-6 cursor-pointer text-green-500"
                onClick={() => {
                  setShowWrapper({
                    ...showWrapper,
                    friends: !showWrapper.friends,
                  });
                }}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex h-auto w-full flex-row items-center">
          <div className="flex h-full w-full"></div>
          <div className="flex w-auto shrink-0 flex-col items-center space-y-1 py-1">
            <span className="h-auto shrink-0 font-mukta text-lg text-gray-200 sm:text-xl">
              {`${data.friends_count} znajomi:`}
            </span>

            <span className="h-auto shrink-0 font-mukta text-xs text-gray-300 sm:text-sm">
              {`(w tym ${data.friends_together_count} wspólnych)`}
            </span>
          </div>
          <div className="flex h-full w-full items-center justify-end pr-2">
            {showWrapper.friends ? (
              <MinusIcon
                className="h-6 w-6 cursor-pointer text-red-500"
                onClick={() => {
                  setShowWrapper({
                    ...showWrapper,
                    friends: !showWrapper.friends,
                  });
                }}
              />
            ) : (
              <PlusIcon
                className="h-6 w-6 cursor-pointer text-green-500"
                onClick={() => {
                  setShowWrapper({
                    ...showWrapper,
                    friends: !showWrapper.friends,
                  });
                }}
              />
            )}
          </div>
        </div>
      );
    }
  }

  function renderFriendsModels(data, friends_list, searchFriend) {
    if (data.friends_count == 0) {
      return (
        <div className="flex h-auto w-full flex-row flex-wrap items-center justify-center">
          <span className="h-auto py-3 font-mukta text-sm text-gray-200">
            Brak znajomych
          </span>
        </div>
      );
    } else {
      return (
        <div className="flex w-full flex-col divide-y-2 divide-blue-400">
          {data.friendslist_together !== null &&
            data.friendslist_together.length !== 0 && (
              <div className="flex flex-col items-center">
                <span className="h-auto pt-3 pb-2 font-mukta text-sm text-gray-200">
                  Wspólni znajomi
                </span>
                {friends_list.friendslist_together?.length > 0 && (
                  <div className="max flex max-h-76 w-full flex-wrap items-center justify-center gap-2 overflow-y-auto lg:gap-0">
                    {friends_list.friendslist_together.map((friend) => (
                      <div
                        className="flex h-[144px] w-[106px] flex-col items-center p-4"
                        key={friend.id}
                      >
                        <Link
                          to={`/user/${friend.username}`}
                          className="flex h-16 w-16"
                        >
                          <img
                            src={`${ips_config.BACKEND}/media/${friend.image_thumbnail}`}
                            className="h-16 w-16 cursor-pointer rounded-full object-cover transition ease-in-out hover:scale-110"
                          ></img>
                        </Link>

                        <Link
                          to={`/user/${friend.username}`}
                          className="flex h-auto items-center"
                        >
                          <span className="break-anywhere h-auto cursor-pointer pt-2 text-center font-mukta text-sm text-gray-200">
                            {friend.username}
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
                {friends_list.friendslist_together?.length == 0 &&
                  searchFriend !== "" && (
                    <div className="flex h-auto w-full flex-row flex-wrap items-center justify-center px-5">
                      <span className="break-anywhere h-auto py-3 text-center font-mukta text-sm text-gray-400">
                        {`Nie znaleziono wyników dla "${searchFriend}"`}
                      </span>
                    </div>
                  )}
              </div>
            )}

          {data.friendslist_strange.length !== 0 && (
            <div className="flex flex-col items-center">
              {data.friendslist_together !== null &&
                data.friendslist_together.length !== 0 && (
                  <span className="h-auto pt-3 pb-2 font-mukta text-sm text-gray-200">
                    Reszta znajomych
                  </span>
                )}

              <div className="flex max-h-76 w-full flex-wrap items-center justify-center gap-2 overflow-y-auto lg:gap-0">
                {friends_list.friendslist_strange.map((friend) => (
                  <div
                    className="flex h-[144px] w-[106px] flex-col items-center p-4"
                    key={friend.id}
                  >
                    <Link
                      to={`/user/${friend.username}`}
                      className="flex h-16 w-16"
                    >
                      <img
                        src={`${ips_config.BACKEND}/media/${friend.image_thumbnail}`}
                        className="h-16 w-16 cursor-pointer rounded-full object-cover transition ease-in-out hover:scale-110"
                      ></img>
                    </Link>

                    <Link
                      to={`/user/${friend.username}`}
                      className="flex h-auto items-center"
                    >
                      <span className="break-anywhere h-auto cursor-pointer pt-2 text-center font-mukta text-sm text-gray-200">
                        {friend.username}
                      </span>
                    </Link>
                  </div>
                ))}
              </div>

              {friends_list.friendslist_strange.length == 0 &&
                searchFriend !== "" && (
                  <div className="flex h-auto w-full flex-row flex-wrap items-center justify-center px-5">
                    <span className="break-anywhere h-auto py-3 text-center font-mukta text-sm text-gray-400">
                      {`Nie znaleziono wyników dla "${searchFriend}"`}
                    </span>
                  </div>
                )}
            </div>
          )}
        </div>
      );
    }
  }

  function renderBadgesInfo(data) {
    let count_badges;
    if (data.main_badge_data == null) {
      count_badges = data.badges.length;
    } else {
      count_badges = data.badges.length + 1;
    }
    if (count_badges > 0) {
      return (
        <div className="flex h-auto w-full flex-row items-center">
          <div className="flex h-full w-full"></div>
          <span className="h-auto shrink-0 py-1 font-mukta text-lg text-gray-200 sm:text-xl">
            {`${count_badges} odznaki:`}
          </span>

          <div className="flex h-full w-full items-center justify-end pr-2">
            {showWrapper.badges ? (
              <MinusIcon
                className="h-6 w-6 cursor-pointer text-red-500"
                onClick={() => {
                  setShowWrapper({
                    ...showWrapper,
                    badges: !showWrapper.badges,
                  });
                }}
              />
            ) : (
              <PlusIcon
                className="h-6 w-6 cursor-pointer text-green-500"
                onClick={() => {
                  setShowWrapper({
                    ...showWrapper,
                    badges: !showWrapper.badges,
                  });
                }}
              />
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex h-auto w-full flex-row items-center">
          <div className="flex h-full w-full"></div>
          <span className="h-auto shrink-0 py-1 font-mukta text-lg text-gray-200 sm:text-xl">
            0 odznak:
          </span>
          <div className="flex h-full w-full items-center justify-end pr-2">
            {showWrapper.badges ? (
              <MinusIcon
                className="h-6 w-6 cursor-pointer text-red-500"
                onClick={() => {
                  setShowWrapper({
                    ...showWrapper,
                    badges: !showWrapper.badges,
                  });
                }}
              />
            ) : (
              <PlusIcon
                className="h-6 w-6 cursor-pointer text-green-500"
                onClick={() => {
                  setShowWrapper({
                    ...showWrapper,
                    badges: !showWrapper.badges,
                  });
                }}
              />
            )}
          </div>
        </div>
      );
    }
  }

  function renderBadgesModels(data) {
    if (data.badges.length == 0 && data.main_badge_data == null) {
      return (
        <div className="flex h-auto w-full flex-row flex-wrap items-center justify-center">
          <span className="h-auto py-3 font-mukta text-sm text-gray-200">
            Brak odznak
          </span>
        </div>
      );
    } else {
      return (
        <div className="max flex max-h-76 w-full flex-wrap items-center justify-center gap-2 overflow-y-auto lg:gap-0">
          {data.main_badge_data !== null && (
            <div className="flex h-[144px] w-[106px] flex-col items-center p-4">
              <div className="flex h-16 w-16">
                <img
                  src={`${ips_config.BACKEND}/media/${data.main_badge_data.image}`}
                  className="h-16 w-16 rounded-full object-cover transition ease-in-out hover:scale-110"
                ></img>
              </div>

              <div className="flex h-auto items-center">
                <span className="break-anywhere h-auto  pt-2 text-center font-mukta text-sm text-gray-200">
                  {data.main_badge_data.name}
                </span>
              </div>
            </div>
          )}
          {data.badges.map((badge, index) => (
            <div
              className="flex h-[144px] w-1/3 flex-col items-center p-4"
              key={index}
            >
              <div className="flex h-16 w-16">
                <img
                  src={`${ips_config.BACKEND}/media/${badge.image}`}
                  className="h-16 w-16 rounded-full object-cover transition ease-in-out hover:scale-110"
                ></img>
              </div>

              <div className="flex h-auto items-center">
                <span className="break-anywhere h-auto  pt-2 text-center font-mukta text-sm text-gray-200">
                  {badge.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }

  return [
    setActivePage,
    valueInput,
    setValueInput,
    menuEventsCategory,
    setMenuEventsRoll,
    actionButtons,
    nextPageNavigation,
    eventTemplate,
    openModalDeleteFriend,
    openModalBlocked,
    modalDelete,
    modalBlocked,
    renderFriendsInfo,
    renderFriendsModels,
    renderBadgesInfo,
    renderBadgesModels,
    showWrapper,
    setShowWrapper,
  ];
}
export default useUserPage;
