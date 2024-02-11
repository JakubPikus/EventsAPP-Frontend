import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { getUser, getHandlerData } from "../../selectors";
import { data_cities } from "../../actions/auth";
import { events_random, clear_events_random } from "../../actions/data";

import useEventsRandomPage from "../../hooks/useEventsRandomPage";

function EventsRandomPage({
  checkLocalization,
  endProvider,
  xcsrftoken,
  provinces,
  events,
}) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const handler_data = useSelector(getHandlerData);

  const [
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
  ] = useEventsRandomPage();

  // POBIERANIE KOLEJNYCH EVENTÓW, GDY ZOSTANIE 2 W REDUCERZE I ZOSTANĄ SPEŁNIONE WARUNKI

  useEffect(() => {
    if (
      endProvider == true &&
      events?.length == 2 &&
      handler_data.code !== "660" &&
      stopFetching == false
    ) {
      dispatch(events_random(user.distance));
    }
  }, [events]);

  // DO POBRANIA NOWYCH MIAST PRZY ZMIANIE WOJEWODZTWA

  useEffect(() => {
    if (endProvider) {
      formErrorStill();

      // ZMIANA VALUEINPUT TYLKO WTEDY, GDY ZMIANA WOJEWODZTWA ZOSTANIE WPROWADZONA RĘCZNIE, A NIE Z AUTOMATU SUGERUJĄC AUTOLOKALIZACJĘ
      // JEŚLI ZOSTAŁO ZMIENIONE PO AUTOLOKALIZACJI, ODZNACZ FLAGĘ NA FALSE DO MOZLIWEJ NASTEPNEJ ZMIANY

      if (updateCheckLocalization == false) {
        setValueInput({ ...valueInput, city: "Brak" });
      } else {
        setUpdateCheckLocalization(false);
      }

      let province_filtred = provinces.filter(
        (province) => province.name == valueInput.province
      );
      dispatch(data_cities(xcsrftoken, province_filtred[0].id));
    }
  }, [valueInput.province]);

  // // WYWOŁANIE ZMIANY LOKALIZACJI ZMIENIA WARTOŚCI USERA

  useEffect(() => {
    if (endProvider == true) {
      // SYTUACJA, GDY NASTĄPI ZMIANA PO SPRAWDZENIU AUTOLOKALIZACJI USER'A, ZMIANA VALUEINPUT LOKALIZACJI
      if (updateCheckLocalization == true) {
        setValueInput({
          ...valueInput,
          province: user.city.county.province.name,
          city: user.city.name,
        });
      }
      setStopFetching(false);
      dispatch(clear_events_random());
      dispatch(events_random(user.distance));
    }
  }, [user]);

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600`}
      >
        {endProvider ? (
          <div className="flex h-9/10 w-full flex-col  justify-center space-y-8 px-6 pt-4 pb-10 lg:flex-row lg:space-y-0 lg:space-x-2 lg:px-0">
            <div className="flex w-full flex-col items-center space-y-2 md:space-y-12 lg:w-1/4 lg:px-4 xl:w-1/5 2xl:w-1/6">
              <div className="flex h-auto w-full flex-row items-center justify-between">
                <span className="h-auto shrink-0 pl-4 text-start font-mukta text-2xl text-gray-100 md:pl-6">
                  Losuj wydarzenie
                </span>

                <div className="absolute right-0 mt-[100px] flex grow items-center justify-center pl-16 pr-6  md:block lg:hidden">
                  {checkNewLocalization(checkLocalization, xcsrftoken)}
                </div>
              </div>

              <div className="flex h-auto w-full flex-col items-start space-y-4 px-4 md:flex-row md:justify-between md:space-y-0 lg:flex-col lg:space-x-0 lg:space-y-10 lg:px-2">
                <div className="flex hidden lg:block">
                  {checkNewLocalization(checkLocalization, xcsrftoken)}
                </div>

                {renderLocation(xcsrftoken)}
                {renderDistance(xcsrftoken)}
              </div>
            </div>

            {moduleEvent(events, xcsrftoken)}

            <div className="flex w-1/4 lg:w-1/5 2xl:w-1/6"></div>
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

export default EventsRandomPage;
