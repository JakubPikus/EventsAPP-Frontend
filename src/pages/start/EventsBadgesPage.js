import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";

import { ChevronRightIcon } from "@heroicons/react/solid";
import { events_via_badges } from "../../actions/data";
import * as ExcelJS from "exceljs/dist/exceljs.min.js";
import saveAs from "file-saver";
import useEventsBadgesPage from "../../hooks/useEventsBadgesPage";

function EventsBadgesPage({ endProvider, events }) {
  const dispatch = useDispatch();

  const [
    openModalManageBadge,
    setOpenModalManageBadge,
    openModalDeleteBadge,
    setOpenModalDeleteBadge,
    openModalNewBadge,
    setOpenModalNewBadge,
    modalManageBadge,
    modalNewBadge,
    modalDeleteBadge,
    modalPopup,
    allowSortData,
    setAllowSortData,
    setCkeckboxAllCodes,
    setCodesTagged,
    codesTagged,
    showPopup,
    ordering,
    formErrorStill,
    eventModule,
    handleScrollToEvent,
    setOpenModalExportFoundUsed,
    setOpenModalDeleteFoundUsed,
  ] = useEventsBadgesPage();

  // GDY DANE Z LOCKOWANIA KODÓW ZOSTANĄ ZWRÓCONE, WYCZYŚĆ TABLICE ZAZNACZONYCH KODÓW + WYWOLAJ EXPORT EXCEL
  useEffect(() => {
    if (endProvider == true) {
      if (events.badge_codes_locked.used !== null) {
        setOpenModalExportFoundUsed({
          status: true,
          selected_length: codesTagged.length,
          used_codes: events.badge_codes_locked.used,
          append_codes: events.badge_codes_locked.append,
        });
      }
      setCkeckboxAllCodes(false);
      setCodesTagged([]);
      let temp_name = `Kody dla odznaki "${openModalManageBadge.badge.name}" w wydarzeniu "${openModalManageBadge.event_title}".`;
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("My Sheet");

      // Dodajemy nagłówek
      worksheet.addRow([temp_name]);

      // Dodajemy dane
      events.badge_codes_locked.locked.forEach((item) => {
        worksheet.addRow([item.code]);
      });

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        saveAs(blob, "kody.xlsx");
      });
    }
  }, [events.badge_codes_locked.locked]);

  // GDY DANE Z USUWANIA KODÓW ZOSTANĄ ZWRÓCONE, WYCZYŚĆ TABLICE ZAZNACZONYCH KODÓW
  useEffect(() => {
    if (endProvider == true) {
      if (events.badge_codes_deleted.used !== null) {
        setOpenModalDeleteFoundUsed({
          status: true,
          selected_length: codesTagged.length,
          used_codes: events.badge_codes_deleted.used,
          deleted_codes: events.badge_codes_deleted.deleted,
        });
      }
      setCkeckboxAllCodes(false);
      setCodesTagged([]);
    }
  }, [events.badge_codes_deleted.list_ids]);

  // PRZY ZMIANIE SORTOWANIA, POBIERZ NOWE DANE Z INNYM SORTOWANIEM
  useEffect(() => {
    if (endProvider == true) {
      setAllowSortData(true);
      dispatch(events_via_badges(ordering));
    }
  }, [ordering]);

  // 1) GDY ZOSTANIE DODANA NOWA ODZNAKA, TO WYŁĄCZ MODAL
  //
  // LUB
  //
  // 2) GDY ZOSTANIE USUNIĘTA ODZNAKA, TO WYŁĄCZ MODAL
  //
  // LUB
  //
  // 3) GDY ZMIANA SORTOWANIA POBIERZE JUZ DANE Z BAZY, PODSTAW ODPOWIEDNIE DANE KODÓW DO AKTYWNEGO MODALA ODZNAKI
  //
  // LUB
  //
  // 4) GDY UZYTKOWNIK ZEDYTUJE ODZNAKE DODAJĄC INNE ZDJĘCIE, TO PODMIEN ZWROCONY LINK DO VALUEINPUT ABY UNIEMOZLIWIC POWIELANIE POST + RESETUJ STAN VALIDACJI NA FALSE

  useEffect(() => {
    if (endProvider == true) {
      // 1)
      if (openModalNewBadge.status == true) {
        setOpenModalNewBadge({
          status: false,
          event_id: null,
          valuesInput: {
            name: null,
            image: null,
          },
        });
      }
      // 2)
      else if (openModalDeleteBadge.status == true) {
        setOpenModalDeleteBadge({
          status: false,
          event_id: null,
          badge: null,
        });
      } else {
        let target_badget = events.events
          .find((obj) => obj.id == openModalManageBadge.event_id)
          .badges.find(
            (obj_badget) => obj_badget.id == openModalManageBadge.badge.id
          );

        // 3)
        if (allowSortData == true) {
          setAllowSortData(false);
          setOpenModalManageBadge((prevState) => ({
            ...prevState,
            badge: target_badget,
          }));
        }
        // 4)
        else if (
          target_badget.image !== openModalManageBadge.valuesInput.image
        ) {
          formErrorStill("name", true);
          setOpenModalManageBadge((prevState) => ({
            ...prevState,
            valuesInput: {
              ...prevState.valuesInput,
              image: target_badget.image,
            },
          }));
        }
      }
    }
  }, [events]);

  // GDY PRZY EDYCJI/TWORZENIU KODOW OKAZE SIE ZE ODZNAKA ZOSTALA ODRZUCONA/USUNIETA TO WYLACZ MODAL

  useEffect(() => {
    if (events.is !== null) {
      setOpenModalManageBadge({
        status: false,
        event_id: null,
        event_title: null,
        badge: null,
        amount_new_badge_codes: null,
        valuesInput: null,
      });

      setOpenModalDeleteBadge({
        status: false,
        event_id: null,
        badge: null,
      });
    }
  }, [events.is]);

  // // GDY UZYTKOWNIK ZEDYTUJE NAZWE ODZNAKI, TO RESETUJE STAN VALIDACJI NA FALSE

  useEffect(() => {
    if (endProvider) {
      formErrorStill("name", true);
    }
  }, [openModalManageBadge.badge?.name]);

  ////

  return (
    <Dashboard>
      <div
        className={`flex h-full w-full flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600`}
      >
        {endProvider ? (
          <div className={`flex h-auto w-full flex-row overflow-hidden`}>
            <div
              className={`flex w-full flex-row justify-center overflow-y-auto px-3`}
              id="centerSeriesPage"
            >
              <div className="flex w-full flex-col space-y-12 py-12 md:w-4/5">
                <span className="h-auto text-center font-mukta text-2xl text-gray-100 md:text-start md:text-3xl">
                  Stworzone odznaki
                </span>
                <div
                  className={`${
                    events?.events?.length == 0 && "items-center pt-5"
                  } flex w-full flex-col space-y-12 divide-y-2 divide-blue-400 px-5 pb-8 md:divide-y-0`}
                >
                  {events?.events.length > 0 ? (
                    events?.events.map((event) => eventModule(event))
                  ) : (
                    <div className="flex min-h-[180px] w-full items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 via-gray-600 to-slate-500 px-8 py-4 drop-shadow-2xl sm:min-h-[250px]">
                      <span className="text-center font-mukta text-sm text-gray-200 sm:text-base lg:text-xl">
                        Nie znaleziono żadnego twojego zweryfikowanego
                        wydarzenia. Dodaj nowe wydarzenie lub poczekaj, aż
                        któreś zostanie zweryfikowane przez administratorów.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="hidden w-[280px] flex-grow flex-col divide-y-2 divide-blue-400 bg-gradient-to-bl from-gray-800 via-slate-700 to-slate-700 lg:block lg:flex">
              <div className="flex h-24 w-full items-center">
                <span className="flex-grow text-center font-mukta text-xl text-gray-100">
                  Spis wydarzeń
                </span>
              </div>
              <div className="flex-col divide-y divide-blue-400 overflow-y-auto drop-shadow-2xl">
                {Object.keys(events.alphabet_list).map((position) => (
                  <React.Fragment key={position}>
                    <div className={`flex items-center px-2`}>
                      <span className="h-auto font-mukta text-[17px] text-gray-100">
                        {position}
                      </span>
                    </div>
                    {Object.values(events.alphabet_list[position]).map(
                      (event, index) => (
                        <div
                          className="flex flex-col bg-slate-500 pl-3"
                          key={index}
                        >
                          <span className="h-auto truncate font-mukta text-[14px] text-gray-100">
                            {event.title}
                          </span>
                          <div
                            className="flex w-[58px] cursor-pointer flex-row items-center"
                            onClick={() => handleScrollToEvent(event.title)}
                          >
                            <span className="h-auto font-mukta text-[12px] text-gray-300">
                              Przejdź
                            </span>
                            <ChevronRightIcon className="block h-8 w-8 text-slate-700"></ChevronRightIcon>
                          </div>
                        </div>
                      )
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
            {openModalManageBadge.status && modalManageBadge()}
            {openModalNewBadge.status && modalNewBadge()}
            {openModalDeleteBadge.status && modalDeleteBadge()}
            {showPopup.status && modalPopup()}
          </div>
        ) : (
          <div className="flex h-screen w-full items-center justify-center">
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

export default EventsBadgesPage;
