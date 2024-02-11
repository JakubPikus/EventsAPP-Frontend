import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LocationMarkerIcon,
  CalendarIcon,
  PlusIcon,
  MinusIcon,
  TrashIcon,
  PencilAltIcon,
  XIcon,
  CheckIcon,
} from "@heroicons/react/solid";
import { getXCSRFToken, getHandlerData, getEventsAlphabet } from "../selectors";
import ips_config from "../ips_config";
import {
  event_add_series,
  event_delete_series,
  series_create,
  series_delete,
  series_edit,
} from "../actions/data";

import { Link } from "react-router-dom";

function useSeriesPage() {
  const xcsrfToken = useSelector(getXCSRFToken);
  const handler_data = useSelector(getHandlerData);
  const alphabet = useSelector(getEventsAlphabet);

  const dispatch = useDispatch();
  const [showEndEvents, setShowEndEvents] = useState({
    showEndWithout: false,
    showEndWith: false,
  });
  const [showEmptySeries, setShowEmptySeries] = useState(true);
  const [editSeries, setEditSeries] = useState({});

  useEffect(() => {
    if (handler_data.code == 1422) {
      setOpenAddSeries({ status: false, values: null });
      setFormError((prevState) => ({ ...prevState, new: formErrorInitial }));
      setValidated({ ...validated, new: false });
    } else if (handler_data.code == 1424) {
      let series_name = handler_data.success.split(" -> ")[0];
      let copiedEditSeries = { ...editSeries };
      delete copiedEditSeries[series_name];
      setEditSeries(() => ({ ...copiedEditSeries }));
      let copiedFormError = { ...formError };
      delete copiedFormError[series_name];
      setFormError(() => ({ ...copiedFormError }));
      let copiedValidated = { ...validated };
      delete copiedValidated[series_name];
      setValidated(() => ({ ...copiedValidated }));
    }
  }, [handler_data.success]);

  //VALIDACJA DODAWANIA NOWEJ SERII

  const [validated, setValidated] = useState({ new: false });

  const formErrorInitial = {
    name: "Tytuł serii musi mieć przynajmniej 3 znaki.",
    description: "Opis serii musi mieć przynajmniej 3 znaki.",
  };

  const [formError, setFormError] = useState({ new: formErrorInitial });

  function formErrorStill(name, type) {
    if (Object.keys(formError[name]).length === 0) {
      setValidated({ ...validated, [name]: false });
    }
    setFormError({
      ...formError,
      [name]: { ...formError[name], [type]: formErrorInitial[type] },
    });
  }

  function formErrorDelete(name, type) {
    let copiedFormError = { ...formError };
    delete copiedFormError[name][type];
    if (Object.keys(copiedFormError[name]).length === 0) {
      setValidated({ ...validated, [name]: true });
    }
    setFormError(() => ({ ...copiedFormError }));
  }

  function validator(name, value, series) {
    switch (name) {
      case "name":
        if (value.length >= 3 && value.length <= 100) {
          formErrorDelete(series, name);
        } else {
          formErrorStill(series, name);
        }
        break;

      case "description":
        if (value.length >= 3 && value.length <= 200) {
          formErrorDelete(series, name);
        } else {
          formErrorStill(series, name);
        }
        break;

      default:
        break;
    }
  }

  function checkForm(name, value) {
    {
      return formError[name][value] ? (
        <span className="h-auto w-2/3 font-mukta text-sm text-gray-300">
          {formError[name][value]}
        </span>
      ) : (
        <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
      );
    }
  }

  // MODUŁY ZMIANY FILTRÓW PUSTY/NIEAKTUALNE DO PRZECHODZENIA ZE SPISU SERII

  const [openChangeEmpty, setOpenChangeEmpty] = useState({
    status: false,
    name: null,
    ready: false,
  });
  const [openChangePast, setOpenChangePast] = useState({
    status: false,
    name: null,
    ready: false,
  });

  useEffect(() => {
    if (openChangeEmpty.ready == true) {
      const target = document.getElementById(openChangeEmpty.name);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setOpenChangeEmpty({ ...openChangeEmpty, name: null, ready: false });
    }
  }, [openChangeEmpty.ready]);

  useEffect(() => {
    if (openChangePast.ready == true) {
      const target = document.getElementById(openChangePast.name);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setOpenChangePast({ ...openChangePast, name: null, ready: false });
    }
  }, [openChangePast.ready]);

  function modalChangeEmpty(name) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Zmiana filtra "Pokaż puste serie"
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenChangeEmpty({
                  ...openChangeEmpty,
                  status: !openChangeEmpty.status,
                  name: null,
                })
              }
            />
          </div>
          <div className="flex px-8">
            <span className="font-mukta text-sm text-white lg:text-base">
              {`Twoja seria "${name}", na którą chcesz przejść jest oznaczona jako pusta, a w Twoich filtrach zaznaczyłeś pokazywanie serii jedynie niepustych. Chcesz zmienić filtr, aby przejść do tej serii?`}
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 lg:text-base"
              onClick={() => {
                setShowEmptySeries(true);
                setOpenChangeEmpty({
                  ...openChangeEmpty,
                  status: false,
                  ready: true,
                });
              }}
            >
              Zmień
            </button>
          </div>
        </div>
      </div>
    );
  }

  function modalChangePast(name) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Zmiana filtra "Pokaż odbyte serie"
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenChangePast({
                  ...openChangePast,
                  status: !openChangePast.status,
                  name: null,
                })
              }
            />
          </div>
          <div className="flex px-8">
            <span className="font-mukta text-sm text-white lg:text-base">
              {`Twoja seria "${name}", na którą chcesz przejść jest oznaczona jako odbyta, a w Twoich filtrach zaznaczyłeś pokazywanie serii jedynie aktualnych. Chcesz zmienić filtr, aby przejść do tej serii?`}
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 lg:text-base"
              onClick={() => {
                setShowEndEvents({ ...showEndEvents, showEndWith: true });
                setOpenChangePast({
                  ...openChangePast,
                  status: false,
                  ready: true,
                });
              }}
            >
              Zmień
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODULY DODAWANIA/USUWANIA SERII

  const [openAddSeries, setOpenAddSeries] = useState({
    status: false,
    values: null,
  });

  const [openRemoveSeries, setOpenRemoveSeries] = useState({
    status: false,
    name: null,
  });

  function modulAddSeries() {
    return (
      <div className="flex flex-col space-y-3">
        <span className="h-auto font-mukta text-xl text-gray-100">
          Dodawanie nowej serii
        </span>
        <div className="flex flex-col space-y-4 ">
          <div className="flex flex-col space-y-1">
            <label className="text-md font-mukta text-gray-300 ">
              Tytuł serii
            </label>
            <input
              type="text"
              name="name"
              onChange={(e) => handleValueChange(e, "new")}
              placeholder="Podaj tytuł serii"
              maxLength="100"
              className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-lg text-gray-100 focus:ring-0"
            ></input>
            {checkForm("new", "name")}
          </div>
          <div className="flex flex-col">
            <label className="text-md font-mukta text-gray-300 ">
              Opis serii
            </label>
            <textarea
              className="max-h-40 w-full resize-none rounded-lg border-2 border-blue-400 bg-transparent font-mukta font-mukta text-lg text-white focus:ring-0"
              placeholder="Podaj opis serii"
              name="description"
              onChange={(e) => handleChangeTextarea(e, "new")}
              maxLength="200"
            ></textarea>
            {checkForm("new", "description")}
          </div>
        </div>

        <div
          className={`flex flex-wrap items-center justify-center gap-4 rounded-lg border-2 border-blue-600 p-2`}
        >
          <div className="flex h-24 flex-col items-center justify-center space-y-6 px-2 sm:flex-row sm:space-y-0 sm:space-x-7">
            <button
              className="rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600  py-1 px-10  text-xs text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none lg:text-base"
              disabled={!validated["new"]}
              onClick={(e) => {
                e.preventDefault();
                if (validated["new"]) {
                  dispatch(series_create(openAddSeries.values, xcsrfToken));
                }
              }}
            >
              Dodaj
            </button>
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  py-1 px-10  text-xs text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 lg:text-base"
              onClick={() => {
                setFormError({ ...formError, new: formErrorInitial });
                setOpenAddSeries({ status: false, values: null });
                setValidated({ ...validated, new: false });
              }}
            >
              Anuluj
            </button>
          </div>
        </div>
      </div>
    );
  }

  function handleValueChange(e, name) {
    validator(e.target.name, e.target.value, name);
    setOpenAddSeries((prevState) => ({
      ...prevState,
      values: { ...prevState.values, [e.target.name]: e.target.value },
    }));
  }

  function handleChangeTextarea(element, name) {
    element.target.style.height = "76px";
    element.target.style.height = `${element.target.scrollHeight + 4}px`;
    handleValueChange(element, name);
  }
  //

  function handleValueEditChange(e, name) {
    validator(e.target.name, e.target.value, name);
    setEditSeries((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], [e.target.name]: e.target.value },
    }));
  }

  function handleEditChangeTextarea(element, name) {
    element.target.style.height = "76px";
    element.target.style.height = `${element.target.scrollHeight + 4}px`;
    handleValueEditChange(element, name);
  }

  function handleScrollToSeries(name) {
    let first_letter = name.charAt(0).toUpperCase();
    let alphabet_obj = alphabet[first_letter].find((obj) => obj.name == name);

    if (showEmptySeries == false && alphabet_obj.empty == true) {
      setOpenChangeEmpty({ ...openChangeEmpty, status: true, name: name });
    } else if (
      showEndEvents.showEndWith == false &&
      alphabet_obj.past == true
    ) {
      setOpenChangePast({ ...openChangePast, status: true, name: name });
    } else {
      const target = document.getElementById(name);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }

  function modalRemoveSeries(name) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Usuwanie serii
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenRemoveSeries({
                  status: !openRemoveSeries.status,
                  name: null,
                })
              }
            />
          </div>
          <div className="flex">
            <span className="font-mukta text-sm text-white lg:text-base">
              {`Jesteś pewny usunięcia serii "${name}"?`}
            </span>
          </div>

          <span className="break-anywhere px-8 text-center font-mukta text-sm text-white lg:text-base">
            Usunięcie serii spowoduje trwałe usunięcie serii oraz usunięcie
            połączenia wszystkich wydarzeń z tą serią. Same wydarzenia nie
            zostaną usunięte.
          </span>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 lg:text-base"
              onClick={() => {
                dispatch(series_delete(openRemoveSeries.name, xcsrfToken));
                setOpenRemoveSeries({ status: false, name: null });
              }}
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODALE DODAWANIA/USUWANIA WYDARZENIA DO/Z SERII

  const [openAddEvent, setOpenAddEvent] = useState({
    status: false,
    event: null,
    new_series: null,
  });

  const [openRemoveEvent, setOpenRemoveEvent] = useState({
    status: false,
    event: null,
  });

  function modalAddEvent(event, series) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-4 shadow-blue-500/30 drop-shadow-xl lg:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Dodawanie wydarzenia do serii
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenAddEvent({
                  status: !openAddEvent.status,
                  event: null,
                  new_series: null,
                })
              }
            />
          </div>
          {series.length == 0 ? (
            <>
              <div className="flex px-4">
                <span className="text-center font-mukta text-sm text-white lg:text-base">
                  Przed przypisaniem poniższego wydarzenia do serii:
                </span>
              </div>
              <div className="flex px-8">{eventModuleRender(event)}</div>
              <div className="flex px-4">
                <span className="text-center font-mukta text-sm text-white lg:text-base">
                  wpierw musisz utworzyć przynajmniej jedną serię.
                </span>
              </div>

              <button
                className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none lg:text-base"
                onClick={() => {
                  setOpenAddEvent({
                    status: false,
                    event: null,
                    new_series: null,
                  });
                }}
              >
                Zamknij
              </button>
            </>
          ) : (
            <>
              <div className="flex">
                <span className="font-mukta text-sm text-white lg:text-base">
                  Dodaj poniższe wydarzenie:
                </span>
              </div>
              <div className="flex px-8">{eventModuleRender(event)}</div>
              <span className="font-mukta text-sm text-white lg:text-base">
                do jednych z twoich dostępnych serii:
              </span>

              <div className="max-h-96 flex w-2/3 flex-col space-y-4 overflow-y-auto py-1 px-1">
                {series.map((serie, index) => (
                  <div
                    className="flex flex-row items-center space-x-2"
                    key={index}
                  >
                    <input
                      type="radio"
                      name="report"
                      value={serie.name}
                      onChange={(e) =>
                        setOpenAddEvent((prevState) => ({
                          ...prevState,
                          new_series: e.target.value,
                        }))
                      }
                    ></input>

                    <label className="font-mukta text-sm text-gray-300 lg:text-base ">
                      {serie.name}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex pb-5">
                <button
                  className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none lg:text-base"
                  onClick={() => {
                    dispatch(
                      event_add_series(
                        openAddEvent.event.id,
                        openAddEvent.new_series,
                        openAddEvent.event.event_date,
                        xcsrfToken
                      )
                    );
                    setOpenAddEvent({
                      status: false,
                      event: null,
                      new_series: null,
                    });
                  }}
                  disabled={openAddEvent.new_series == null}
                >
                  Dodaj
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  function modalRemoveEvent(event) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-2/6">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">
              Usuwanie wydarzenia z serii
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenRemoveEvent({
                  status: !openRemoveEvent.status,
                  event: null,
                })
              }
            />
          </div>
          <div className="flex">
            <span className="font-mukta text-sm text-white lg:text-base">
              Usuwanie poniższego wydarzenia:
            </span>
          </div>
          <div className="flex px-8">{eventModuleRender(event)}</div>
          <span className="font-mukta text-sm text-white lg:text-base">
            z serii:
          </span>

          <div className="flex flex-col space-y-4">
            <label className="font-mukta text-sm text-gray-300 lg:text-base ">
              {`"${event.series}"`}
            </label>
          </div>
          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-10 py-1  text-sm text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 lg:text-base"
              onClick={() => {
                dispatch(
                  event_delete_series(
                    openRemoveEvent.event.id,
                    openRemoveEvent.event.series,
                    openRemoveEvent.event.event_date,
                    xcsrfToken
                  )
                );
                setOpenRemoveEvent({ status: false, event: null });
              }}
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODUŁY WYSWIETLANIA WYDARZEN/SERII KTORE SIE ODBYLY

  function eventModule(events, showPast) {
    if (showPast == true) {
      if (events.length > 0) {
        return events.map((event) => eventRender(event));
      } else {
        return (
          <div className="flex h-24 w-full items-center justify-center">
            <span className="px-2 text-center font-mukta text-lg text-gray-400">
              Nie zostało znalezione żadne wydarzenie.
            </span>
          </div>
        );
      }
    } else {
      let filteredEvents = events.filter((event) => event.current == true);
      if (filteredEvents.length > 0) {
        return filteredEvents.map((event) => eventRender(event));
      } else {
        return (
          <div className="flex h-24 w-full items-center justify-center">
            <span className="px-2 text-center font-mukta text-lg text-gray-400">
              Nie zostało znalezione żadne aktualne wydarzenie.
            </span>
          </div>
        );
      }
    }
  }

  function seriesModule(series, showPast, showEmpty) {
    if (showEmpty == true) {
      if (showPast == true) {
        if (series.length > 0) {
          return series.map((serie, index) => seriesRender(serie, index));
        } else {
          return (
            <div className="flex h-24 items-center justify-center">
              <span className="px-2 text-center font-mukta text-lg text-gray-400">
                Nie została znaleziona żadna seria.
              </span>
            </div>
          );
        }
      } else if (showPast == false) {
        let filteredSeries = series.filter(
          (serie) => serie.current == true || serie.data.length == 0
        );
        if (filteredSeries.length > 0) {
          return filteredSeries.map((serie, index) =>
            seriesRender(serie, index)
          );
        } else {
          return (
            <div className="flex h-24 items-center justify-center">
              <span className="px-2 text-center font-mukta text-lg text-gray-400">
                Nie została znaleziona żadna aktualna seria.
              </span>
            </div>
          );
        }
      }
    } else if (showEmpty == false) {
      if (showPast == true) {
        let filteredSeries = series.filter((serie) => serie.data.length > 0);
        if (filteredSeries.length > 0) {
          return filteredSeries.map((serie, index) =>
            seriesRender(serie, index)
          );
        } else {
          return (
            <div className="flex h-24 items-center justify-center">
              <span className="px-2 text-center font-mukta text-lg text-gray-400">
                Nie została znaleziona żadna niepusta seria.
              </span>
            </div>
          );
        }
      } else if (showPast == false) {
        let filteredSeries = series.filter(
          (serie) => serie.current == true && serie.data.length > 0
        );
        if (filteredSeries.length > 0) {
          return filteredSeries.map((serie, index) =>
            seriesRender(serie, index)
          );
        } else {
          return (
            <div className="flex h-24 items-center justify-center">
              <span className="px-2 text-center font-mukta text-lg text-gray-400">
                Nie została znaleziona żadna niezakończona i niepusta seria.
              </span>
            </div>
          );
        }
      }
    }
  }

  // TEMPLATE'Y EVENTU I SERII

  function seriesRender(series, index) {
    return (
      <div className="flex flex-col space-y-3" id={series.name} key={index}>
        {editSeries[series.name] !== undefined ? (
          <div className="flex flex-col space-y-4 ">
            <div className="flex flex-row items-center justify-between xs:justify-end">
              <span className="block h-auto font-mukta text-sm  text-gray-100 md:text-xl xs:hidden">
                {`Edytowanie serii "${series.name}"`}
              </span>

              <div
                className="group flex cursor-pointer flex-row items-center space-x-2"
                onClick={() => {
                  let copiedEditSeries = { ...editSeries };
                  delete copiedEditSeries[series.name];
                  setEditSeries(() => ({ ...copiedEditSeries }));
                  let copiedFormError = { ...formError };
                  delete copiedFormError[series.name];
                  setFormError(() => ({ ...copiedFormError }));
                  let copiedValidated = { ...validated };
                  delete copiedValidated[series.name];
                  setValidated(() => ({ ...copiedValidated }));
                }}
              >
                <span className="h-auto shrink-0 font-mukta text-sm text-gray-100">
                  Zakończ edycje
                </span>
                <PencilAltIcon className="block h-6 w-6 shrink-0 text-red-400 transition ease-in-out group-hover:scale-125"></PencilAltIcon>
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <div className="flex w-full flex-row items-center justify-between space-x-12 xs:flex-col-reverse xs:space-x-0">
                <div className="flex w-full flex-col space-y-1 pt-0 xs:pt-3">
                  <label className="font-mukta text-sm text-gray-300 md:text-base ">
                    Tytuł serii
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editSeries[series.name].name}
                    onChange={(e) => handleValueEditChange(e, series.name)}
                    placeholder="Podaj tytuł serii"
                    maxLength="100"
                    className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-base text-gray-100 focus:ring-0 md:text-lg"
                  ></input>
                  {checkForm(series.name, "name")}
                </div>

                <button
                  className="-mt-3 h-8 w-28 shrink-0 rounded-full bg-gradient-to-r from-blue-400  via-blue-500 to-blue-600 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none xs:mt-1 xs:w-full"
                  disabled={
                    !validated[series.name] ||
                    (series.name == editSeries[series.name].name &&
                      series.description == editSeries[series.name].description)
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    if (
                      validated[series.name] &&
                      (series.name !== editSeries[series.name].name ||
                        series.description !==
                          editSeries[series.name].description)
                    ) {
                      dispatch(
                        series_edit(
                          series.name,
                          editSeries[series.name],
                          xcsrfToken
                        )
                      );
                    }
                  }}
                >
                  Zapisz
                </button>
              </div>
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-mukta text-sm text-gray-300 md:text-base ">
                Opis serii
              </label>
              <textarea
                className="max-h-40 w-full resize-none rounded-lg border-2 border-blue-400 bg-transparent font-mukta font-mukta text-base text-white focus:ring-0 md:text-lg"
                placeholder="Podaj opis serii"
                value={editSeries[series.name].description}
                name="description"
                onChange={(e) => handleEditChangeTextarea(e, series.name)}
                maxLength="200"
              ></textarea>
              {checkForm(series.name, "description")}
            </div>
          </div>
        ) : (
          <div className="flex w-full flex-row space-x-4 pl-4 xs:flex-col-reverse">
            <div className="flex flex-col items-center justify-end pt-0 sm:justify-center xs:items-start xs:pt-4">
              <span className="h-auto font-mukta text-[18px] text-gray-100">
                {series.name}
              </span>

              <span className="h-auto font-mukta text-sm text-gray-400">
                {series.description}
              </span>
            </div>

            <div className="flex grow flex-col items-end justify-between space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-2">
              <div
                className="group -mt-1 flex cursor-pointer flex-row-reverse items-center space-x-2 sm:flex-row"
                onClick={() => {
                  setFormError({ ...formError, [series.name]: {} });
                  setValidated({ ...validated, [series.name]: true });
                  setEditSeries({
                    ...editSeries,
                    [series.name]: {
                      name: series.name,
                      description: series.description,
                    },
                  });
                }}
              >
                <PencilAltIcon className="block h-6 w-6 shrink-0 text-gray-400 transition ease-in-out group-hover:scale-125"></PencilAltIcon>
                <span className="h-auto shrink-0 pr-2 font-mukta text-sm text-gray-100 sm:pr-0">
                  Edytuj serię
                </span>
              </div>

              <div
                className="group flex cursor-pointer flex-row items-center space-x-1"
                onClick={() =>
                  setOpenRemoveSeries({
                    status: !openRemoveSeries.status,
                    name: series.name,
                  })
                }
              >
                <span className="h-auto shrink-0 font-mukta text-sm text-gray-100">
                  Usuń serię
                </span>
                <TrashIcon
                  className={`h-7 w-7 shrink-0 cursor-pointer text-red-400 transition ease-in-out group-hover:scale-125`}
                ></TrashIcon>
              </div>
            </div>
          </div>
        )}

        <div
          className={`${
            series.current == true || series.data.length == 0
              ? "border-blue-400"
              : "border-gray-500"
          } flex flex-wrap items-center justify-center gap-4 rounded-lg border-2 p-2`}
        >
          {series.data.length > 0 ? (
            series.data.map((event) => eventRender(event))
          ) : (
            <div className="flex h-24 items-center justify-center">
              <span className="px-2 text-center font-mukta text-sm text-gray-400 sm:text-lg">
                Żadne wydarzenie jeszcze nie zostało dodane do tej serii.
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }

  function eventModuleRender(event) {
    return (
      <div
        className={`${
          event.current == true
            ? "from-cyan-900 via-cyan-900 to-gray-800"
            : "from-zinc-900 via-zinc-800 to-zinc-700"
        } flex h-24 w-48 flex-row rounded-lg bg-gradient-to-bl`}
      >
        <div className="flex h-auto w-1/3 overflow-hidden rounded-l-lg">
          <img
            src={`${ips_config.BACKEND}/media/${event.image}`}
            className="h-full w-full object-cover transition ease-in-out hover:scale-110"
          ></img>
        </div>
        <div className="break-anywhere flex w-2/3 flex-col items-center pt-1">
          <span className="h-6 max-w-[120px] truncate font-mukta text-[12px] text-gray-100 ">
            {event.title}
          </span>

          <span className="h-auto font-mukta text-[9px] text-gray-400">
            {event.category}
          </span>
          <div className="flex h-full w-full flex-row pl-1 pt-1">
            <div className="flex h-full w-2/3 flex-col space-y-2">
              <div className="flex flex-row items-center">
                <LocationMarkerIcon className="block h-5 w-5 text-gray-100"></LocationMarkerIcon>
                <span className="h-auto font-mukta text-[9px] text-gray-100">
                  {event.city}
                </span>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <CalendarIcon className="block h-4 w-4 text-gray-100"></CalendarIcon>
                <span className="h-auto font-mukta text-[8px] text-gray-400">
                  {event.event_date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function eventRender(event) {
    return (
      <div
        className={`${
          event.current == true
            ? "from-cyan-900 via-cyan-900 to-gray-800"
            : "from-zinc-900 via-zinc-800 to-zinc-700"
        } flex h-24 w-48 flex-row rounded-lg bg-gradient-to-bl`}
        key={event.id}
      >
        <div className="flex h-auto w-1/3 overflow-hidden rounded-l-lg">
          <img
            src={`${ips_config.BACKEND}/media/${event.image}`}
            className="h-full w-full object-cover transition ease-in-out hover:scale-110"
          ></img>
        </div>
        <div className="break-anywhere flex w-2/3 flex-col items-center">
          <Link
            to={`/event/${event.slug}-${event.uuid}`}
            className="max-w-full flex px-1 pt-1"
          >
            <span className="h-auto max-w-[120px] cursor-pointer truncate font-mukta text-[12px] text-gray-100 hover:bg-slate-400 hover:text-black">
              {event.title}
            </span>
          </Link>
          <span className="h-auto font-mukta text-[9px] text-gray-400">
            {event.category}
          </span>
          <div className="flex h-full w-full flex-row pl-1 pt-1">
            <div className="flex h-full w-2/3 flex-col space-y-2">
              <div className="flex flex-row items-center">
                <LocationMarkerIcon className="block h-5 w-5 text-gray-100"></LocationMarkerIcon>
                <span className="h-auto font-mukta text-[9px] text-gray-100">
                  {event.city}
                </span>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <CalendarIcon className="block h-4 w-4 text-gray-100"></CalendarIcon>
                <span className="h-auto font-mukta text-[8px] text-gray-400">
                  {event.event_date}
                </span>
              </div>
            </div>
            <div className="flex h-full w-1/3 flex-col justify-end ">
              {event.series == null ? (
                <div
                  className="group flex h-2/3 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-bl from-green-700 via-green-400 to-green-300"
                  onClick={() =>
                    setOpenAddEvent({
                      status: !openAddEvent.status,
                      event: event,
                      new_series: null,
                    })
                  }
                >
                  <PlusIcon className="block h-4 w-4 text-gray-100 transition ease-in-out group-hover:scale-125"></PlusIcon>
                </div>
              ) : (
                <div
                  className="group flex h-2/3 w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-bl from-red-700 via-red-400 to-red-300"
                  onClick={() =>
                    setOpenRemoveEvent({
                      status: !openRemoveEvent.status,
                      event: event,
                    })
                  }
                >
                  <MinusIcon className="block h-4 w-4 text-gray-100 transition ease-in-out group-hover:scale-125"></MinusIcon>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return [
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
  ];
}
export default useSeriesPage;
