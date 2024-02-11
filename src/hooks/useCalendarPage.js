import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../selectors";
import {
  LocationMarkerIcon,
  CalendarIcon,
  UserGroupIcon,
  ExclamationIcon,
  PencilAltIcon,
  MinusCircleIcon,
} from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { events_via_calendar } from "../actions/data";
import ips_config from "../ips_config";

function useCalendarPage() {
  // POBRANIE DZISIEJSZEJ DATY, MIESIACA I ROKU
  const dispatch = useDispatch();
  const moment = require("moment");
  const user = useSelector(getUser);
  const currentDate = moment();
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  let eventTypes = {
    participate: "blue",
    verificated: "green",
    awaiting: "yellow",
    need_improvement: "orange",
    rejected: "red",
  };

  // POKAZANIE MODALA Z WYTARGETOWANYM EVENTEM

  const [showPopup, setShowPopup] = useState({ status: false, event: null });
  const [timeoutId, setTimeoutId] = useState(null);
  const [mousePos, setMousePos] = useState({});

  function listenPos() {
    window.addEventListener("mousemove", handleMouseMove);
  }

  const handleMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    listenPos();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const showDelayedModal = (event) => {
    let id = setTimeout(() => {
      setShowPopup({ status: true, event: event });
    }, 500);

    setTimeoutId(id);
  };

  const hideModal = () => {
    setShowPopup({ status: false, event: null });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  // ZMIANA FILTRACJI WYDARZEN

  const [filtrEvents, setFiltrEvents] = useState({
    blue: true,
    green: true,
    yellow: true,
    orange: true,
    red: true,
  });

  // ZMIANA WYBRANEJ DATY
  const [selectDate, setSelectDate] = useState({
    year: currentYear,
    month: currentMonth,
  });

  // WZGLEDEM ZMIANY DATY, ZMIANA USTAWIEN KALENDARZA
  const [calendarSettings, setCalendarSettings] = useState({
    first_day:
      parseInt(moment([currentYear, currentMonth, 1]).format("d")) > 0
        ? parseInt(moment([currentYear, currentMonth, 1]).format("d")) - 1
        : parseInt(moment([currentYear, currentMonth, 1]).format("d")) + 6,
    days_month: currentDate.daysInMonth(),
  });

  // HANDLER DO ZMIAN DATY. TUTAJ DISPATCH ABY ZMIANA WRAZ Z USTAWIENIAMI KALENDARZA BYŁA W 1 MOMENCIE
  function handleMonthChange(e) {
    if (e.target.name == "year") {
      dispatch(events_via_calendar(parseInt(e.target.value), selectDate.month));
    } else if (e.target.name == "month") {
      dispatch(events_via_calendar(selectDate.year, parseInt(e.target.value)));
    }
    setSelectDate({
      ...selectDate,
      [e.target.name]: parseInt(e.target.value),
    });
  }

  // RENDERY

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

  function renderModal(event, x, y) {
    return (
      <div
        className={`absolute top-[-128px] left-[-448px] flex h-32 w-auto flex-row rounded-lg bg-gradient-to-bl from-gray-500 via-gray-500 to-slate-800`}
        style={{
          transform: `translate3d(${x}px, ${y}px, 0)`,
        }}
        id="testtt"
      >
        <div className="flex h-full w-32 overflow-hidden rounded-l-lg">
          <img
            src={`${ips_config.BACKEND}/media/${event.image}`}
            className="h-full w-32 object-cover transition ease-in-out hover:scale-110"
          ></img>
        </div>
        <div
          className={`${
            event.current == true ? "border-blue-400" : "border-gray-400"
          } flex h-full w-[320px] flex-col space-y-3 rounded-r-lg border-r-2 border-b-2 border-t-2 pl-4 pt-2`}
        >
          <div className="flex flex-col">
            <div className="flex grow flex-row justify-between">
              <div className=" flex items-center">
                <span className="text-md break-anywhere cursor-pointer pr-4 font-mukta text-gray-200 hover:bg-slate-400 hover:text-black">
                  {event.title}
                </span>
              </div>

              <div className="flex flex-row items-center space-x-1 pr-2">
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
            <div className="flex h-auto w-auto flex-row space-x-2">
              <div className="flex h-auto w-auto flex-col">
                <LocationMarkerIcon className="h-6 w-6 text-gray-300" />
              </div>
              <div className="flex h-auto w-auto flex-col items-start">
                <span className="font-mukta text-sm text-gray-200">
                  {event.city}
                </span>

                <span className="font-mukta text-[11px] text-gray-400">
                  {event.province}
                </span>
              </div>
            </div>

            <div className="flex flex-col space-y-2 pr-2">
              <div className="flex flex-row justify-end space-x-1">
                <CalendarIcon className="h-4 w-4 text-gray-300 " />
                <span className="font-mukta text-[11px] text-gray-200">
                  {moment(event.event_date).format("DD.MM.YY r.")}
                </span>
              </div>

              {event.user == user.username && (
                <div className="flex w-auto grow flex-row justify-end">
                  {iconInfoRender(event.type)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderCheckBox(text, color, index) {
    return (
      <div
        className="flex h-auto w-[72px] flex-col items-center space-y-2 "
        key={index}
      >
        <div
          className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br from-${color}-400 via-${color}-500 to-${color}-600 `}
        >
          <input
            type="checkbox"
            name={color}
            value={!filtrEvents[color]}
            onChange={(e) => {
              if (e.target.value == "true") {
                setFiltrEvents({
                  ...filtrEvents,
                  [e.target.name]: true,
                });
              } else {
                setFiltrEvents({
                  ...filtrEvents,
                  [e.target.name]: false,
                });
              }
            }}
            className={`h-4 w-4 cursor-pointer rounded-full border-0 text-${color}-500 focus:border-0 focus:outline-none focus:ring-0`}
            checked={filtrEvents[color]}
          ></input>
        </div>
        <span className="text-center font-mukta text-xs text-gray-100 md:text-sm">
          {text}
        </span>
      </div>
    );
  }

  //TUTEJ

  function renderEvent(event) {
    return (
      <Link
        to={`/event/${event.slug}-${event.uuid}`}
        className={`max-w-full flex h-[18px] grow cursor-pointer items-center justify-center rounded-md bg-gradient-to-br from-${
          eventTypes[event.type]
        }-400 via-${eventTypes[event.type]}-500 to-${
          eventTypes[event.type]
        }-600 px-1 py-0.5 sm:px-2`}
        onMouseEnter={() => showDelayedModal(event)}
        onMouseLeave={hideModal}
        key={event.id}
      >
        <span className="truncate font-mukta text-[8px] text-gray-100 sm:text-[10px]">
          {event.title}
        </span>
      </Link>
    );
  }

  function renderEmptyDay(index) {
    return (
      <div
        className="flex w-1/7 items-center justify-center overflow-hidden bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800"
        key={index}
      >
        <div
          className={`${
            36 - calendarSettings.first_day <= calendarSettings.days_month
              ? "-skew-y-20"
              : "-skew-y-24"
          } flex h-1 w-full bg-zinc-700`}
        ></div>
      </div>
    );
  }

  function renderDay(day, events, index) {
    return (
      <div className="flex h-full w-1/7" key={index}>
        <div className="max-w-full flex h-full w-full flex-col">
          <span className="h-4 w-5 pl-1 font-mukta text-sm text-gray-100 sm:text-base md:text-lg 2xl:text-xl xs:text-xs">{`${day}.`}</span>

          <div className="md:max-h-24 max-w-full mt-1 flex flex-wrap gap-y-1 gap-x-2 overflow-auto overflow-x-hidden px-1 pt-1 pb-1">
            {events?.length > 0 &&
              events.map((event) => {
                if (filtrEvents[eventTypes[event.type]]) {
                  return renderEvent(event);
                }
              })}
          </div>
        </div>
      </div>
    );
  }

  function renderCalendar(days, calendar, events) {
    return (
      <div className="flex h-[350px]  w-full  flex-col divide-y-2 divide-blue-400 overflow-hidden rounded-xl border-2 border-blue-400 xl:h-[500px] 2xl:h-[700px]">
        {/* DNI TYGODNIA */}
        <div className="flex h-9 w-full flex-row justify-between divide-x-2 divide-blue-400">
          {days.map((day, index) => (
            <div className="flex w-1/7 items-center justify-center" key={index}>
              <span className="hidden h-auto w-full text-center font-mukta text-gray-100 md:block md:text-xs xl:text-lg">
                {day[0]}
              </span>
              <span className="h-auto w-full text-center font-mukta text-xs text-gray-100 sm:text-sm md:hidden ">
                {day[1]}
              </span>
            </div>
          ))}
        </div>
        {/* PIERWSZA LINIA Z PUSTYMI DNIAMI + RESZTA */}
        <div
          className="flex h-full w-full flex-row justify-between divide-x-2 divide-blue-400"
          key={0}
        >
          {Array.from({ length: calendar.first_day }, (_, index) =>
            renderEmptyDay(index)
          )}
          {Array.from({ length: 7 - calendar.first_day }, (_, index) =>
            renderDay(index + 1, events[index + 1], index + calendar.first_day)
          )}
        </div>
        {/* DRUGA, TRZECIA I CZWARTA LINIE ZAWSZE SĄ PEŁNE NAWET W LUTYM (2021) */}
        {Array.from({ length: 3 }, (_, multi) => (
          <div
            className="flex h-full w-full flex-row justify-between divide-x-2 divide-blue-400"
            key={multi + 1}
          >
            {Array.from({ length: 7 }, (_, index) =>
              renderDay(
                index + multi * 7 - calendar.first_day + 8,
                events[index + multi * 7 - calendar.first_day + 8],
                index + 7 + multi * 7
              )
            )}
          </div>
        ))}

        {/* PIĄTA LINIA RZADKO NIE WYSTĘPUJE (PIĄTA - LUTY 2021) ORAZ SZÓSTA LINIA RZADKO WYSTĘPUJE (SZÓSTA - LIPIEC 2023)*/}
        {Array.from(
          { length: 2 },
          (_, multi) =>
            29 + multi * 7 - calendar.first_day <= calendar.days_month && (
              <div
                className="flex h-full w-full flex-row justify-between divide-x-2 divide-blue-400"
                key={multi + 4}
              >
                {Array.from({ length: 7 }, (_, index) =>
                  index + 29 + multi * 7 - calendar.first_day <=
                  calendar.days_month
                    ? renderDay(
                        index + 29 + multi * 7 - calendar.first_day,
                        events[index + 29 + multi * 7 - calendar.first_day],
                        index + 28 + multi * 7
                      )
                    : renderEmptyDay(index + 28 + multi * 7)
                )}
              </div>
            )
        )}
      </div>
    );
  }

  return [
    currentYear,
    setCalendarSettings,
    selectDate,
    handleMonthChange,
    renderCheckBox,
    renderCalendar,
    renderModal,
    calendarSettings,
    showPopup,
    mousePos,
  ];
}
export default useCalendarPage;
