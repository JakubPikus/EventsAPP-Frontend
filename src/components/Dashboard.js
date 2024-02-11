import React from "react";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import {
  ArrowCircleRightIcon,
  MapIcon,
  UserGroupIcon,
  UserAddIcon,
  CogIcon,
  ChatAltIcon,
  PlusIcon,
  CalendarIcon,
  BellIcon,
  LocationMarkerIcon,
  TagIcon,
  SearchIcon,
  LogoutIcon,
  GlobeAltIcon,
  TicketIcon,
} from "@heroicons/react/solid";
import {
  getMenuStatus,
  getUser,
  getXCSRFToken,
  getContactWebsockets,
} from "../selectors";
import ips_config from "../ips_config";
import { Scrollbars } from "react-custom-scrollbars-2";
import { change_state_menu } from "../actions/auth";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
import { change_state_contact } from "../actions/websockets";
import Contact from "./Contact";

function Dashboard({ children }) {
  const dispatch = useDispatch();
  const menuStatus = useSelector(getMenuStatus);
  const user = useSelector(getUser);
  const XCSRFToken = useSelector(getXCSRFToken);
  const contactWebsockets = useSelector(getContactWebsockets);

  function menuWrapper() {
    dispatch(change_state_menu());
  }

  function contactWrapper(content) {
    dispatch(change_state_contact(content));
  }

  return (
    <Layout title="Dashboard" content="Dashboard">
      <div className="z-30 flex h-screen flex-row">
        <div
          id="left"
          className={`${
            menuStatus ? "w-32 sm:w-44" : "w-14"
          } left-0 z-10 flex h-[100vh]  shrink-0  bg-gray-900 pt-14`}
        >
          <Scrollbars>
            <div className="flex flex-col justify-between space-y-3 px-1 py-2  ">
              <div className="flex flex-col rounded-lg bg-gray-800">
                <div
                  className={`flex h-12 w-full flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto font-mukta text-base text-gray-200 sm:text-lg`}
                  >
                    Menu
                  </span>
                  <ArrowCircleRightIcon
                    className={`${
                      menuStatus && "rotate-180 "
                    } h-5 w-5 cursor-pointer text-red-400 transition ease-in-out hover:scale-125 sm:h-8 sm:w-8`}
                    onClick={menuWrapper}
                    id="menuButton"
                  ></ArrowCircleRightIcon>
                </div>
              </div>
              <div className="flex flex-col  rounded-lg bg-gray-800">
                <Link
                  to={`/user/${user.username}?type=future&events_category=all`}
                  className={`group  flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Twój profil
                  </span>
                  <img
                    src={`${ips_config.BACKEND}${user.image_thumbnail}`}
                    className={`${
                      menuStatus ? "h-5 w-5 sm:h-8 sm:w-8" : "h-6 w-6"
                    } rounded-full transition ease-in-out group-hover:scale-125 `}
                  ></img>
                </Link>

                <div
                  onClick={() => contactWrapper("notifications")}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Powiadomienia
                  </span>

                  <BellIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></BellIcon>

                  {contactWebsockets.notifications?.meta.new_count > 0 && (
                    <div className="absolute right-2 -mt-5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                      <span
                        className={`h-auto font-mukta text-xs text-gray-200`}
                      >
                        {contactWebsockets.notifications.meta.new_count}
                      </span>
                    </div>
                  )}
                </div>

                <div
                  onClick={() => contactWrapper("messages")}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Wiadomości
                  </span>

                  <ChatAltIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></ChatAltIcon>
                  {contactWebsockets.messages?.meta.new_messages.count > 0 && (
                    <div className="absolute right-2 -mt-5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                      <span
                        className={`h-auto font-mukta text-xs text-gray-200`}
                      >
                        {contactWebsockets.messages.meta.new_messages.count}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-gray-800">
                <Link
                  to={`/events_list`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Szukaj wydarzeń
                  </span>
                  <SearchIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></SearchIcon>
                </Link>
                <Link
                  to={`/new_event`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Dodaj wydarzenie
                  </span>
                  <PlusIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></PlusIcon>
                </Link>
                <Link
                  to={`/series`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Twoje serie wydarzeń
                  </span>
                  <MapIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></MapIcon>
                </Link>

                <Link
                  to={`/my_tickets`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Twoje bilety
                  </span>
                  <TicketIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></TicketIcon>
                </Link>

                <Link
                  to={`/calendar`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Kalendarz
                  </span>

                  <CalendarIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></CalendarIcon>
                </Link>
                <Link
                  to={`/map`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Mapa wydarzeń
                  </span>

                  <LocationMarkerIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></LocationMarkerIcon>
                </Link>

                <Link
                  to={`/events_random`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Losuj wydarzenie
                  </span>
                  <GlobeAltIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></GlobeAltIcon>
                </Link>
              </div>

              <div className="flex flex-col rounded-lg bg-gray-800">
                <Link
                  to={`/find_friends`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Szukaj znajomych
                  </span>
                  <UserAddIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></UserAddIcon>
                </Link>
                <div
                  onClick={() => contactWrapper("friends")}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Znajomi
                  </span>

                  <UserGroupIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></UserGroupIcon>

                  {contactWebsockets.friends?.meta.invitations.meta.all_ids
                    .length > 0 && (
                    <div className="absolute right-2 -mt-5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500">
                      <span
                        className={`h-auto font-mukta text-xs text-gray-200`}
                      >
                        {
                          contactWebsockets.friends?.meta.invitations.meta
                            .all_ids.length
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col rounded-lg bg-gray-800">
                <Link
                  to={`/activate_badges`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Dodaj odznakę
                  </span>
                  <PlusIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></PlusIcon>
                </Link>
                <Link
                  to={`/create_badges`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Stworzone odznaki
                  </span>
                  <TagIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></TagIcon>
                </Link>
              </div>

              <div className="flex flex-col rounded-lg bg-gray-800">
                <Link
                  to={`/settings`}
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Ustawienia
                  </span>
                  <CogIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></CogIcon>
                </Link>
                <div
                  className={`group flex h-12 w-full cursor-pointer flex-row items-center ${
                    menuStatus ? "justify-between" : "justify-center"
                  } px-3`}
                  onClick={() => dispatch(logout(XCSRFToken))}
                >
                  <span
                    className={`${
                      !menuStatus && "hidden"
                    } h-auto cursor-pointer font-mukta text-[11px] text-gray-200 sm:text-sm`}
                  >
                    Wyloguj się
                  </span>
                  <LogoutIcon
                    className={`h-5 w-5 text-red-400 transition ease-in-out group-hover:scale-125 sm:h-8 sm:w-8`}
                  ></LogoutIcon>
                </div>
              </div>
            </div>
          </Scrollbars>
        </div>

        {contactWebsockets.wrapper_status.status && (
          <Contact
            menuStatus={menuStatus}
            contactStatus={contactWebsockets.wrapper_status}
          />
        )}

        <div
          id="center"
          className={` min-h-screen mt-14 flex w-full flex-col overflow-y-auto`}
        >
          {children}
        </div>
      </div>
    </Layout>
  );
}
export default Dashboard;
