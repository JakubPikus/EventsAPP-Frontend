import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, Link } from "react-router-dom";
import googleLogo from "../../files/google-maps.png";
import useEventComment from "../../hooks/useEventComment";
import {
  LocationMarkerIcon,
  ChevronLeftIcon,
  CalendarIcon,
  UserGroupIcon,
  XIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import ips_config from "../../ips_config";
import moment from "moment";
import "moment/locale/pl";
import {
  getUser,
  getEventIsDeleted,
  getEventIsNotVerificated,
} from "../../selectors";
import useEventPage from "../../hooks/useEventPage";

moment.locale("pl");

function EventPage({
  activeEvent,
  commentEventData,
  endProvider,
  xcsrfToken,
  slug,
  uuid,
  eventParticipants,
  activeImage,
  setActiveImage,
}) {
  const history = useNavigate();
  const [moduleCommentsRender] = useEventComment();
  const [
    imageRender,
    eventAction,
    buttonActions,
    eventParticipantsRender,
    eventScheduleRender,
    eventTicketsRender,
    eventActionSeries,
    modalReport,
    openReport,
    setOpenReport,
    modalDelete,
    openDelete,
    setOpenDelete,
    infoRender,
    infoRenderIcon,
    participantsModule,
    showWrapper,
    setShowWrapper,
  ] = useEventPage();
  const user = useSelector(getUser);
  const event_is_deleted = useSelector(getEventIsDeleted);
  const event_is_not_verificated = useSelector(getEventIsNotVerificated);

  const [time, setTime] = useState(10);
  const [openModalEventRedirect, setOpenModalEventRedirect] = useState({
    status: false,
    type: null,
  });

  useEffect(() => {
    if (event_is_deleted) {
      setOpenModalEventRedirect({ status: true, type: "deleted" });
      let timer = setTimeout(() => {
        history("/");
      }, 10000);

      return () => clearTimeout(timer);
    }

    if (event_is_not_verificated) {
      setOpenModalEventRedirect({ status: true, type: "not_verificated" });
      let timer = setTimeout(() => {
        history("/");
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [event_is_deleted, event_is_not_verificated]);

  useEffect(() => {
    if (openModalEventRedirect.status == true) {
      const time = setInterval(() => {
        setTime((prevState) => prevState - 1);
      }, 1000);

      return () => clearInterval(time);
    }
  }, [openModalEventRedirect]);

  function modalEventRedirect() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-1/2 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl xl:w-1/4">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
            {openModalEventRedirect.type == "deleted" ? (
              <span className="p-1 text-base text-white md:text-xl">
                Wydarzenie zostało usunięte
              </span>
            ) : (
              <span className="p-1 text-base text-white md:text-xl">
                Wydarzenie jest niezweryfikowane
              </span>
            )}
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                history("/");
              }}
            />
          </div>
          <div className="flex px-4">
            {openModalEventRedirect.type == "deleted" ? (
              <span className="text-center font-mukta text-sm text-white md:text-base">
                {`Podczas próby wykonania akcji, wydarzenie zostało usunięte.  Za ${time} sekund zostaniesz przekierowany na główną
              stronę.`}
              </span>
            ) : (
              <span className="text-center font-mukta text-sm text-white md:text-base">
                {`Podczas próby wykonania akcji, stan wydarzenia zostało zmieniony na "niezweryfikowany".  Za ${time} sekund zostaniesz przekierowany na główną
              stronę.`}
              </span>
            )}
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              onClick={() => {
                history("/");
              }}
            >
              Zrozumiałem
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-8`}
      >
        {endProvider ? (
          <div className="flex h-full w-full flex-col space-y-10 pt-16">
            <div className="flex flex-row items-center justify-between px-2 md:justify-start md:space-x-8  md:pl-8">
              <div
                className="flex cursor-pointer flex-row px-1"
                onClick={() => history(-1)}
              >
                <ChevronLeftIcon className="-mt-1 h-6 w-6 text-gray-500 md:-mt-0" />
                <span className="font-mukta text-xs text-white md:text-base">
                  Wróć
                </span>
              </div>

              <span
                className="cursor-pointer px-1 text-center font-mukta text-xs text-white underline underline-offset-1 md:text-sm"
                onClick={() => history("/")}
              >
                Strona główna
              </span>
              <span className="text-center text-center font-mukta text-xs text-white md:text-sm">
                /
              </span>

              <span
                className="cursor-pointer px-1 text-center font-mukta text-xs text-white underline underline-offset-1 md:text-sm"
                onClick={() =>
                  history(`/events_list?category=${activeEvent.category}`)
                }
              >
                {activeEvent.category}
              </span>
              <span className="text-center text-center font-mukta text-xs text-white md:text-sm">
                /
              </span>

              <span className="truncate px-1 text-center font-mukta text-xs text-gray-400 md:text-sm">
                {activeEvent.title}
              </span>
            </div>
            <div className="flex h-full w-full justify-center">
              <div className="flex h-full w-full flex-col-reverse justify-center px-3 md:flex-row md:space-x-8 xl:w-9/10 xl:pl-0 xl:pr-0 2xl:w-5/6">
                {/* LEWA STRONA */}

                <div className="flex w-full flex-col pt-8 md:w-1/2 md:pt-0 lg:w-7/10">
                  {infoRender(
                    activeEvent.verificated,
                    activeEvent.verificated_details
                  )}

                  <div
                    id="left_side"
                    className={`${
                      activeEvent.verificated !== "verificated" && "pt-6"
                    } flex h-full w-full flex-col space-y-10`}
                  >
                    <div
                      id="content"
                      className={`${
                        activeEvent.current == true
                          ? "border-blue-400"
                          : "border-gray-400"
                      } flex flex-col space-y-8 rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 pb-24`}
                    >
                      {/* bg-transparent */}
                      {imageRender(
                        activeEvent.image,
                        activeImage,
                        setActiveImage
                      )}
                      <div
                        id="detail"
                        className="flex h-auto w-full flex-row flex-col space-y-2"
                      >
                        <span className="pl-10 font-mukta text-sm text-gray-400">
                          {`Dodano ${moment(activeEvent.created_time).format(
                            "DD MMMM YYYY"
                          )}`}
                        </span>
                        <div className="flex w-auto flex-row">
                          <span className="break-anywhere h-auto w-full pl-10 font-mukta text-xl font-bold text-white lg:text-3xl">
                            {activeEvent.title}
                          </span>
                          <div className="flex flex-row space-x-6 items-center justify-end pr-8">
                            {buttonActions(activeEvent, user)}
                          </div>
                        </div>
                        <div className="flex flex-row items-start justify-between px-3 pt-2 lg:items-center lg:px-12 xl:px-20">
                          <div className="flex w-auto flex-col lg:flex-row">
                            <UserGroupIcon className="h-6 w-6 text-gray-300 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
                            <span className="ml-3 mt-1 font-mukta text-sm text-gray-200 lg:text-base xl:text-lg">
                              {activeEvent.num_reputation}
                            </span>
                          </div>
                          <div className="flex w-auto flex-col lg:flex-row">
                            <CalendarIcon className="h-6 w-6 text-gray-300 lg:h-7 lg:w-7 xl:h-8 xl:w-8"></CalendarIcon>
                            <span className="mt-1 ml-1 font-mukta text-sm text-gray-200 lg:ml-3 lg:text-base xl:text-lg">
                              {moment(activeEvent.event_date).format(
                                "DD MMMM YYYY"
                              )}
                            </span>
                          </div>
                          <div className="flex w-auto flex-col lg:flex-row ">
                            <LocationMarkerIcon className="h-6 w-6 text-gray-300 lg:mt-2 lg:h-7 lg:w-7 xl:h-8 xl:w-8" />
                            <div className="flex flex-row">
                              <div className="ml-1 mt-1 flex flex-col -space-y-[4px] lg:ml-3">
                                <span className="font-mukta text-sm text-gray-200 lg:text-base xl:text-lg">
                                  {activeEvent.city}
                                </span>
                                <span className="font-mukta text-xs text-gray-500 lg:text-sm">
                                  {activeEvent.province}
                                </span>
                              </div>
                              <a
                                className="mt-1 ml-3 h-6 w-6 shrink-0 lg:ml-5 lg:mt-2 xl:h-7 xl:w-7"
                                href={activeEvent.gps_googlemap}
                                target="_blank"
                              >
                                <img
                                  className="h-6 w-6 shrink-0 xl:h-7 xl:w-7"
                                  src={googleLogo}
                                ></img>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        id="description"
                        className="flex h-auto w-full flex-col space-y-6 px-10"
                      >
                        <span className="font-mukta text-xl text-gray-200 xl:text-2xl">
                          Opis
                        </span>

                        <div className="break-anywhere flex text-justify">
                          <span className="w-full font-mukta text-base text-gray-200 xl:text-lg">
                            {activeEvent.text}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div
                      id="comments"
                      className={`${
                        activeEvent.current == true
                          ? "divide-blue-400 border-blue-400"
                          : "divide-gray-400 border-gray-400"
                      } flex h-auto flex-col divide-y-2 rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 px-6 pb-10`}
                    >
                      {/* bg-transparent */}
                      <div className="flex h-14 items-center">
                        <span className="font-mukta text-lg text-gray-200">
                          {`${
                            commentEventData?.meta?.count == undefined
                              ? "0"
                              : commentEventData.meta.count
                          } Komentarzy`}
                        </span>
                      </div>
                      {moduleCommentsRender(
                        commentEventData?.data,
                        xcsrfToken,
                        slug,
                        uuid,
                        activeEvent?.user,
                        activeEvent?.verificated
                      )}
                    </div>
                  </div>
                </div>
                {/* PRAWA STRONA */}
                <div
                  id="right_side"
                  className="flex h-auto w-full flex-col space-y-8 md:w-1/3 md:space-y-12 lg:w-1/4"
                >
                  <div
                    className={`${
                      activeEvent.current == true
                        ? "divide-blue-400 border-blue-400"
                        : "divide-gray-400 border-gray-400"
                    } flex h-auto w-full flex-col divide-y-2 rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 drop-shadow-2xl`}
                  >
                    <div className="flex items-center justify-center pb-1">
                      <span className="h-auto pt-2 font-mukta text-sm text-gray-200 xl:text-base">
                        Organizator
                      </span>
                    </div>
                    <div
                      id="user"
                      className="flex h-full w-full flex-row items-center justify-center space-x-4 p-4"
                    >
                      <div className="flex h-12 w-12 shrink-0 xl:h-16 xl:w-16">
                        <Link
                          to={`/user/${activeEvent.user}`}
                          className="flex h-12 w-12 shrink-0 xl:h-16 xl:w-16"
                        >
                          <img
                            src={`${ips_config.BACKEND}/media/${activeEvent.user_image}`}
                            className="h-12 w-12 shrink-0 object-cover rounded-full  xl:h-16 xl:w-16"
                          ></img>
                        </Link>
                      </div>

                      <div className="flex grow flex-col space-y-1">
                        <div className="flex grow">
                          <Link
                            to={`/user/${activeEvent.user}`}
                            className="flex w-auto flex-row items-center space-x-2"
                          >
                            <span className="grow font-mukta text-sm text-gray-200 xl:text-base">
                              {activeEvent.user}
                            </span>
                            {activeEvent.user == user.username && (
                              <span className="grow font-mukta text-sm text-gray-400">
                                {`(ty)`}
                              </span>
                            )}
                          </Link>
                        </div>

                        <Link
                          to={`/user/${activeEvent.user}?type=created_future`}
                          className="flex grow"
                        >
                          <span className="cursor-pointer font-mukta text-xs text-gray-500 hover:underline hover:underline-offset-1 xl:text-sm">
                            Więcej wydarzeń od tego użytkownika.
                          </span>
                        </Link>
                      </div>
                    </div>
                    <div
                      id="actions"
                      className="flex h-auto w-full flex-row items-center justify-center space-x-8 py-3"
                    >
                      {eventAction(activeEvent, user, xcsrfToken)}
                    </div>
                  </div>
                  {/* ######################################### */}
                  <div
                    className={`${
                      activeEvent.current == true
                        ? "divide-blue-400 border-blue-400"
                        : "divide-gray-400 border-gray-400"
                    } flex h-auto flex-col divide-y-2 rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 drop-shadow-2xl`}
                  >
                    <div className="flex items-center justify-center pb-1">
                      <div className="flex h-full w-full"></div>

                      <span className="h-auto shrink-0 pt-2 font-mukta text-sm text-gray-200 xl:text-base">
                        Harmonogram wydarzenia
                      </span>

                      <div className="flex h-full w-full items-center justify-end pt-1 pr-2">
                        {showWrapper.schedule ? (
                          <MinusIcon
                            className="h-6 w-6 cursor-pointer text-red-500"
                            onClick={() => {
                              setShowWrapper({
                                ...showWrapper,
                                schedule: !showWrapper.schedule,
                              });
                            }}
                          />
                        ) : (
                          <PlusIcon
                            className="h-6 w-6 cursor-pointer text-green-500"
                            onClick={() => {
                              setShowWrapper({
                                ...showWrapper,
                                schedule: !showWrapper.schedule,
                              });
                            }}
                          />
                        )}
                      </div>
                    </div>
                    {showWrapper.schedule &&
                      eventScheduleRender(activeEvent.schedule)}
                  </div>
                  {/* ######################################### */}

                  {(activeEvent?.tickets.length > 0 ||
                    activeEvent.user == user.username) &&
                    activeEvent.current && (
                      <div
                        className={`${
                          activeEvent.current == true
                            ? "divide-blue-400 border-blue-400"
                            : "divide-gray-400 border-gray-400"
                        } flex h-auto flex-col divide-y-2 rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 drop-shadow-2xl`}
                      >
                        <div className="flex items-center justify-center pb-1">
                          <div className="flex h-full w-full"></div>

                          <span className="h-auto shrink-0 pt-2 font-mukta text-sm text-gray-200 xl:text-base">
                            Bilety
                          </span>

                          <div className="flex h-full w-full items-center justify-end pt-1 pr-2">
                            {showWrapper.tickets ? (
                              <MinusIcon
                                className="h-6 w-6 cursor-pointer text-red-500"
                                onClick={() => {
                                  setShowWrapper({
                                    ...showWrapper,
                                    tickets: !showWrapper.tickets,
                                  });
                                }}
                              />
                            ) : (
                              <PlusIcon
                                className="h-6 w-6 cursor-pointer text-green-500"
                                onClick={() => {
                                  setShowWrapper({
                                    ...showWrapper,
                                    tickets: !showWrapper.tickets,
                                  });
                                }}
                              />
                            )}
                          </div>
                        </div>
                        {showWrapper.tickets &&
                          eventTicketsRender(activeEvent, user)}
                      </div>
                    )}
                  {/* ######################################### */}

                  {activeEvent.series !== null && (
                    <div
                      className={`${
                        activeEvent.current == true
                          ? "divide-blue-400 border-blue-400"
                          : "divide-gray-400 border-gray-400"
                      } flex h-auto flex-col divide-y-2 rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 drop-shadow-2xl`}
                    >
                      <div className="flex items-center justify-center pb-1">
                        <div className="flex h-full w-full"></div>

                        <span className="h-auto shrink-0 pt-2 font-mukta text-sm text-gray-200 xl:text-base">
                          Seria wydarzeń
                        </span>

                        <div className="flex h-full w-full items-center justify-end pt-1 pr-2">
                          {showWrapper.series ? (
                            <MinusIcon
                              className="h-6 w-6 cursor-pointer text-red-500"
                              onClick={() => {
                                setShowWrapper({
                                  ...showWrapper,
                                  series: !showWrapper.series,
                                });
                              }}
                            />
                          ) : (
                            <PlusIcon
                              className="h-6 w-6 cursor-pointer text-green-500"
                              onClick={() => {
                                setShowWrapper({
                                  ...showWrapper,
                                  series: !showWrapper.series,
                                });
                              }}
                            />
                          )}
                        </div>
                      </div>
                      {showWrapper.series && (
                        <>
                          <div className="flex flex-col items-center space-y-3 p-3">
                            <span className="h-auto font-mukta text-sm text-gray-200 xl:text-base">
                              {activeEvent.series}
                            </span>
                            <span className="h-auto font-mukta text-sm text-gray-200">
                              {activeEvent.series_details}
                            </span>
                          </div>

                          {activeEvent.series_events.map((event) => (
                            <div
                              className={`${
                                activeEvent.id == event.id && "bg-gray-700"
                              } group flex h-36 w-full flex-row items-center space-x-2 py-3 px-2`}
                              key={event.id}
                            >
                              <div className="-mt-7 flex w-1/6 flex-col items-center justify-center space-y-6">
                                <Link
                                  to={`/event/${event.slug}-${event.uuid}`}
                                  className="flex h-12 w-12 md:h-8 md:w-8 xl:h-10 xl:w-10"
                                >
                                  <img
                                    src={`${ips_config.BACKEND}/media/${event.image}`}
                                    className="h-12 w-12 shrink-0 rounded-lg object-cover transition ease-in-out group-hover:scale-110 md:h-8 md:w-8 xl:h-10 xl:w-10"
                                  ></img>
                                </Link>
                                <span className="h-auto font-mukta text-xs text-gray-400">
                                  {moment(event.event_date).format("DD.MM.YY")}
                                </span>
                              </div>
                              <div className="flex h-full w-5/6 flex-col">
                                <div className="flex flex-row justify-between space-x-4">
                                  <span className="break-anywhere h-auto font-mukta  text-sm text-[10px] text-gray-300">
                                    {event.category}
                                  </span>

                                  {infoRenderIcon(event.verificated)}
                                </div>

                                <Link
                                  to={`/event/${event.slug}-${event.uuid}`}
                                  className="break-anywhere flex"
                                >
                                  <p className=" break-anywhere cursor-pointer truncate pr-4 font-mukta text-xs text-white hover:bg-slate-400 hover:text-black xl:text-sm">
                                    {event.title}
                                  </p>
                                </Link>

                                <div className="flex w-full flex-row items-start justify-between pt-1 pr-2">
                                  <div
                                    className={`flex w-1/2 flex-col items-start`}
                                  >
                                    <LocationMarkerIcon className="h-5 w-5 text-gray-300" />
                                    <span className="h-auto pt-1 font-mukta text-xs text-gray-200">
                                      {event.city}
                                    </span>
                                    <span className="h-auto font-mukta text-[11px] text-gray-400">
                                      {event.province}
                                    </span>
                                  </div>

                                  <div className="flex flex-row justify-between w-1/2">
                                    <div className="flex h-full flex-col items-center">
                                      <UserGroupIcon className="h-5 w-5 text-gray-300" />
                                      <span className="h-auto pt-1 font-mukta text-xs text-gray-200">
                                        {event.num_reputation}
                                      </span>
                                    </div>

                                    <div className="flex h-auto w-auto items-start justify-center pl-3">
                                      {eventActionSeries(
                                        event,
                                        user.username,
                                        xcsrfToken
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  )}

                  {/* ######################################### */}
                  <div
                    className={`${
                      activeEvent.current == true
                        ? "divide-blue-400 border-blue-400"
                        : "divide-gray-400 border-gray-400"
                    } flex h-auto flex-col divide-y-2 rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 drop-shadow-2xl`}
                  >
                    <div className="flex items-center justify-center pb-1">
                      <div className="flex h-full w-full"></div>
                      <span className="h-auto shrink-0 pt-2 font-mukta text-sm text-gray-200 xl:text-base">
                        Wzieli udział
                      </span>

                      <div className="flex h-full w-full items-center justify-end pt-1 pr-2">
                        {showWrapper.participants ? (
                          <MinusIcon
                            className="h-6 w-6 cursor-pointer text-red-500"
                            onClick={() => {
                              setShowWrapper({
                                ...showWrapper,
                                participants: !showWrapper.participants,
                              });
                            }}
                          />
                        ) : (
                          <PlusIcon
                            className="h-6 w-6 cursor-pointer text-green-500"
                            onClick={() => {
                              setShowWrapper({
                                ...showWrapper,
                                participants: !showWrapper.participants,
                              });
                            }}
                          />
                        )}
                      </div>
                    </div>

                    {showWrapper.participants &&
                      participantsModule(eventParticipants, activeEvent)}
                  </div>
                </div>
              </div>
            </div>
            {openReport.status && modalReport(xcsrfToken)}
            {openDelete.status && modalDelete(xcsrfToken)}
            {openModalEventRedirect.status && modalEventRedirect()}
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
    </Dashboard>
  );
}

export default EventPage;
