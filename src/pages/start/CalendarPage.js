import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { RotatingLines } from "react-loader-spinner";
import useCalendarPage from "../../hooks/useCalendarPage";

function CalendarPage({ endProvider, events }) {
  const [
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
  ] = useCalendarPage();
  // POBRANIE DZISIEJSZEJ DATY, MIESIACA I ROKU
  const moment = require("moment");

  let tempCheckBoxes = {
    blue: "Wzięto udział",
    green: "Utworzono",
    yellow: "Weryfikowane",
    orange: "Do poprawy",
    red: "Usunięte",
  };

  let months = {
    0: "Styczeń",
    1: "Luty",
    2: "Marzec",
    3: "Kwiecień",
    4: "Maj",
    5: "Czerwiec",
    6: "Lipiec",
    7: "Sierpień",
    8: "Wrzesień",
    9: "Październik",
    10: "Listopad",
    11: "Grudzień",
  };
  let days = [
    ["Poniedziałek", "Pon."],
    ["Wtorek", "Wt."],
    ["Środa", "Śr."],
    ["Czwartek", "Czw."],
    ["Piątek", "Pt."],
    ["Sobota", "Sob."],
    ["Niedziela", "Nd."],
  ];

  let yearOptions = [];
  for (let year = currentYear - 10; year <= currentYear + 10; year++) {
    yearOptions.push(
      <option className="text-black" key={year} value={year}>
        {year}
      </option>
    );
  }

  // GDY ZMIENIĄ SIĘ NOWO POBRANE WYDARZENIA, ZMIEN USTAWIENIA KALENDARZA WZGLEDEM NOWYCH DANYCH, ABY ZMIANY NASTĄPIŁY W TYM SAMYM CZASIE CO POBRANIE DANYCH
  useEffect(() => {
    if (endProvider == true) {
      setCalendarSettings({
        first_day:
          parseInt(moment([selectDate.year, selectDate.month, 1]).format("d")) >
          0
            ? parseInt(
                moment([selectDate.year, selectDate.month, 1]).format("d")
              ) - 1
            : parseInt(
                moment([selectDate.year, selectDate.month, 1]).format("d")
              ) + 6,
        days_month: moment([selectDate.year, selectDate.month]).daysInMonth(),
      });
    }
  }, [events]);

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-4`}
      >
        {endProvider ? (
          <>
            <div className="flex h-full w-full flex-col space-y-6 px-0.5 pt-12 sm:px-2 md:px-3 lg:px-4 xl:px-8 2xl:w-4/5 2xl:px-0">
              <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-12">
                <div className="flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-12">
                  <span className="h-auto text-center font-mukta text-2xl text-gray-100">
                    Kalendarz twoich wydarzeń
                  </span>

                  <select
                    id="yearCalendarPageSelect"
                    name="year"
                    value={selectDate.year}
                    onChange={handleMonthChange}
                    className="w-[100px] rounded-md border-2 border-blue-400 bg-transparent font-mukta text-gray-100"
                  >
                    {yearOptions}
                  </select>
                </div>

                <div className="flex h-auto w-full flex-wrap items-start justify-center gap-8 pt-4 lg:justify-between lg:gap-2 lg:pt-10">
                  {Object.keys(tempCheckBoxes).map((color, index) =>
                    renderCheckBox(tempCheckBoxes[color], color, index)
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-evenly gap-4 pt-4 sm:justify-center sm:space-x-3">
                {Object.keys(months).map((month) => (
                  <button
                    key={month}
                    name="month"
                    value={month}
                    onClick={handleMonthChange}
                    className={`${
                      selectDate.month == month
                        ? "bg-gray-600"
                        : "bg-transparent hover:bg-gray-700"
                    } w-2/5 rounded-md border-2 border-blue-400 px-1 py-2 text-center  font-mukta text-xs text-gray-100 sm:w-auto sm:px-4 sm:text-base`}
                  >
                    {months[month]}
                  </button>
                ))}
              </div>

              {renderCalendar(days, calendarSettings, events)}
            </div>
            {showPopup.status &&
              renderModal(showPopup.event, mousePos.x, mousePos.y)}
          </>
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

export default CalendarPage;
