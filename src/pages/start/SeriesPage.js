import React from "react";
import Dashboard from "../../components/Dashboard";
import { RotatingLines } from "react-loader-spinner";
import { PlusIcon, ChevronRightIcon } from "@heroicons/react/solid";
import moment from "moment";
import "moment/locale/pl";
import useSeriesPage from "../../hooks/useSeriesPage";

moment.locale("pl");

function SeriesPage({ events, endProvider }) {
  const [
    eventModule,
    seriesModule,
    modulAddSeries,
    modalAddEvent,
    modalRemoveEvent,
    modalRemoveSeries,
    modalChangeEmpty,
    modalChangePast,
    showEndEvents,
    setShowEndEvents,
    showEmptySeries,
    setShowEmptySeries,
    openAddSeries,
    setOpenAddSeries,
    openAddEvent,
    openRemoveEvent,
    openRemoveSeries,
    openChangeEmpty,
    openChangePast,
    handleScrollToSeries,
  ] = useSeriesPage();

  return (
    <Dashboard>
      <div
        className={`flex h-full w-full flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600`}
      >
        {endProvider ? (
          <div className={`flex h-auto w-full flex-row overflow-hidden`}>
            <div
              className={`flex h-auto w-full flex-row justify-center overflow-y-auto px-1 md:px-3`}
              id="centerSeriesPage"
            >
              <div className="flex w-9/10 flex-col space-y-12 py-12 md:w-4/5">
                <span className="h-auto text-center font-mukta text-2xl text-gray-100 md:text-3xl lg:text-start">
                  Twoje serie wydarzeń
                </span>
                <div className="flex flex-col space-y-8 divide-y-2 divide-blue-400">
                  <div className="flex flex-col space-y-12">
                    <div className="flex flex-col items-center justify-between space-y-4 lg:flex-row lg:justify-end lg:space-y-0 lg:space-x-20 ">
                      <span className="h-auto shrink-0 font-mukta text-lg  text-gray-100 md:text-2xl">
                        Wydarzenia bez serii
                      </span>

                      <div className="flex w-full items-center justify-center lg:justify-end 2xl:justify-start">
                        <div className="flex  w-full flex-col lg:w-auto">
                          <label
                            htmlFor="showEndWithoutSeriesPageSelect"
                            className="font-mukta text-sm text-gray-100 lg:text-base"
                          >
                            Pokaż odbyte wydarzenia
                          </label>
                          <select
                            id="showEndWithoutSeriesPageSelect"
                            onChange={() =>
                              setShowEndEvents((prevState) => ({
                                ...prevState,
                                showEndWithout: !prevState.showEndWithout,
                              }))
                            }
                            name="showEndWithout"
                            defaultValue={false}
                            className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 lg:w-[180px] lg:text-base"
                          >
                            <option
                              value="true"
                              className="font-mukta text-black"
                            >
                              Tak
                            </option>
                            <option
                              value="false"
                              className="font-mukta text-black"
                            >
                              Nie
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-grow flex-wrap justify-center gap-4 lg:justify-start">
                      {eventModule(
                        events.events_no_series,
                        showEndEvents.showEndWithout
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-4 pt-8 sm:space-y-10">
                    <div className="flex  flex-col justify-between 2xl:flex-row">
                      <div className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-16">
                        <span className="shrink-0 flex-grow font-mukta text-lg text-gray-100 md:text-2xl lg:-mt-14 xl:-mt-0">
                          Wydarzenia w seriach
                        </span>
                        <div className="flex w-full flex-col space-y-2 lg:w-auto xl:flex-row xl:space-y-0 xl:space-x-16">
                          <div className="flex flex-col">
                            <label
                              htmlFor="showEndWithSeriesPageSelect"
                              className="font-mukta text-sm text-gray-100 lg:text-base"
                            >
                              Pokaż odbyte serie
                            </label>
                            <select
                              id="showEndWithSeriesPageSelect"
                              value={showEndEvents.showEndWith}
                              onChange={(e) => {
                                setShowEndEvents((prevState) => ({
                                  ...prevState,
                                  showEndWith: !prevState.showEndWith,
                                }));
                              }}
                              name="showEndWith"
                              className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 lg:w-[180px] lg:text-base"
                            >
                              <option
                                value="true"
                                className="font-mukta text-black"
                              >
                                Tak
                              </option>
                              <option
                                value="false"
                                className="font-mukta text-black"
                              >
                                Nie
                              </option>
                            </select>
                          </div>
                          <div className="flex flex-col">
                            <label
                              htmlFor="showEmptyWithSeriesPageSelect"
                              className="font-mukta text-sm text-gray-100 lg:text-base"
                            >
                              Pokaż puste serie
                            </label>
                            <select
                              id="showEmptyWithSeriesPageSelect"
                              onChange={() =>
                                setShowEmptySeries(!showEmptySeries)
                              }
                              value={showEmptySeries}
                              name="showEmptyWith"
                              className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 lg:w-[180px] lg:text-base"
                            >
                              <option
                                value="true"
                                className="font-mukta text-black"
                              >
                                Tak
                              </option>
                              <option
                                value="false"
                                className="font-mukta text-black"
                              >
                                Nie
                              </option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex h-auto w-full items-center justify-end pt-8 2xl:pt-0">
                        <div
                          className="group flex cursor-pointer flex-row items-center space-x-1"
                          onClick={() => {
                            setOpenAddSeries({ status: true, values: null });
                          }}
                        >
                          <span className="h-auto w-auto shrink-0 font-mukta text-sm text-gray-100">
                            Dodaj nową serię
                          </span>
                          <PlusIcon
                            className={`h-7 w-7 shrink-0 cursor-pointer text-green-400 transition ease-in-out group-hover:scale-125`}
                          ></PlusIcon>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-6 divide-y-2 divide-blue-400 pb-14">
                      {openAddSeries.status == true && modulAddSeries()}

                      <div
                        className={`flex flex-col space-y-6 ${
                          openAddSeries.status == true && "pt-7"
                        }`}
                      >
                        {seriesModule(
                          events.events_with_series,
                          showEndEvents.showEndWith,
                          showEmptySeries
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {openAddEvent.status &&
                modalAddEvent(openAddEvent.event, events.events_with_series)}
              {openRemoveEvent.status &&
                modalRemoveEvent(openRemoveEvent.event)}

              {openRemoveSeries.status &&
                modalRemoveSeries(openRemoveSeries.name)}
              {openChangeEmpty.status && modalChangeEmpty(openChangeEmpty.name)}
              {openChangePast.status && modalChangePast(openChangePast.name)}
            </div>

            <div className="max-h-full flex hidden w-[280px] flex-col divide-y-2 divide-blue-400 bg-gradient-to-bl from-gray-800 via-slate-700 to-slate-700 lg:block lg:flex">
              <div className="flex h-24 w-full items-center">
                <span className="flex-grow text-center font-mukta text-xl text-gray-100">
                  Spis serii
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
                      (series, index) => (
                        <div
                          className="flex flex-col bg-slate-500 pl-3"
                          key={index}
                        >
                          <span className="h-auto truncate font-mukta text-[14px] text-gray-100">
                            {series.name}
                          </span>
                          <div
                            className="flex w-[58px] cursor-pointer flex-row items-center"
                            onClick={() => handleScrollToSeries(series.name)}
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

export default SeriesPage;
