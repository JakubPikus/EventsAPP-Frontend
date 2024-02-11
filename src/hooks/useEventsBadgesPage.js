import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LocationMarkerIcon,
  CalendarIcon,
  CogIcon,
  DocumentAddIcon,
  EmojiSadIcon,
  TrashIcon,
  XIcon,
  CheckIcon,
  ExclamationIcon,
  PencilAltIcon,
  MinusCircleIcon,
} from "@heroicons/react/solid";
import { getXCSRFToken } from "../selectors";
import {
  badge_create,
  badge_delete,
  badge_edit,
  badgecodes_create,
  badgecodes_delete,
  badgecodes_lock,
} from "../actions/data";
import ips_config from "../ips_config";

import { Link } from "react-router-dom";

function useEventsBadgesPage() {
  const [openModalManageBadge, setOpenModalManageBadge] = useState({
    status: false,
    event_id: null,
    event_title: null,
    badge: null,
    amount_new_badge_codes: null,
    valuesInput: null,
  });

  const [openModalDeleteBadge, setOpenModalDeleteBadge] = useState({
    status: false,
    event_id: null,
    badge: null,
  });

  const [openModalNewBadge, setOpenModalNewBadge] = useState({
    status: false,
    event_id: null,
    valuesInput: {
      name: null,
      image: null,
    },
  });

  const [openModalExportFoundUsed, setOpenModalExportFoundUsed] = useState({
    status: false,
    selected_length: null,
    used_codes: null,
    append_codes: null,
  });

  const [openModalDeleteFoundUsed, setOpenModalDeleteFoundUsed] = useState({
    status: false,
    selected_length: null,
    used_codes: null,
    deleted_codes: null,
  });

  const [ordering, setOrdering] = useState("created_time");
  const [ckeckboxAllCodes, setCkeckboxAllCodes] = useState(false);
  const [codesTagged, setCodesTagged] = useState([]);
  const [allowSortData, setAllowSortData] = useState(false);
  const [showPopup, setShowPopup] = useState({
    status: false,
    state: null,
    details: null,
  });
  const [timeoutId, setTimeoutId] = useState(null);
  const [mousePos, setMousePos] = useState({});

  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);

  // DANE DO POPUPA

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

  const showDelayedModal = (state, details) => {
    let id = setTimeout(() => {
      setShowPopup({ status: true, state: state, details: details });
    }, 500);

    setTimeoutId(id);
  };

  const hideModal = () => {
    setShowPopup({ status: false, state: null, details: null });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  // VALIDACJA DANYCH

  const formErrorInitialEdit = {
    name: "Nazwa odznaki powinna mieć minimum 5 znaków, maksymalnie 50 znaków oraz różnić się od starej w momencie, gdy nie wprowadzasz zmian w zdjęciu.",
  };
  const formErrorInitialNew = {
    name: "Nazwa odznaki powinna mieć minimum 5 znaków oraz maksymalnie 50 znaków.",
    image: "Dodaj zdjęcie do odznaki.",
  };

  const [formError, setFormError] = useState({});
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (Object.keys(formError).length === 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [formError]);

  function formErrorStill(name, status_edit) {
    if (status_edit) {
      setFormError({
        ...formError,
        [name]: formErrorInitialEdit[name],
      });
    } else {
      setFormError({
        ...formError,
        [name]: formErrorInitialNew[name],
      });
    }
  }

  function formErrorDelete(name) {
    let copiedFormError = { ...formError };
    delete copiedFormError[name];
    setFormError(() => ({ ...copiedFormError }));
  }

  // VALIDATOR ZALEZNY OD TRYBU EDYCJI (status_edit == true) LUB TRYBU DODAWANIA (status_edit == false)

  function validator(name, value, status_edit) {
    if (status_edit == true) {
      switch (name) {
        case "name":
          if (
            value.length >= 5 &&
            value.length <= 50 &&
            (value !== openModalManageBadge.badge.name ||
              (value == openModalManageBadge.badge.name &&
                openModalManageBadge.valuesInput.image?.type !== undefined))
          ) {
            formErrorDelete(name);
          } else {
            formErrorStill(name, status_edit);
          }
          break;

        default:
          break;
      }
    } else {
      switch (name) {
        case "name":
          if (value.length >= 5 && value.length <= 50) {
            formErrorDelete(name);
          } else {
            formErrorStill(name, status_edit);
          }
          break;

        default:
          break;
      }
    }
  }

  function checkForm(value) {
    {
      return formError[value] ? (
        <span className="h-auto w-full font-mukta text-[11px] text-gray-300">
          {formError[value]}
        </span>
      ) : (
        <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
      );
    }
  }

  // RENDERY

  function iconInfoRender(state, details) {
    if (state == "awaiting") {
      return (
        <ExclamationIcon
          className="h-5 w-5 text-yellow-300"
          onMouseEnter={() => showDelayedModal(state, details)}
          onMouseLeave={hideModal}
        />
      );
    } else if (state == "need_improvement") {
      return (
        <PencilAltIcon
          className="h-5 w-5 text-yellow-300"
          onMouseEnter={() => showDelayedModal(state, details)}
          onMouseLeave={hideModal}
        />
      );
    } else if (state == "rejected") {
      return (
        <MinusCircleIcon
          className="h-5 w-5 text-red-500"
          onMouseEnter={() => showDelayedModal(state, details)}
          onMouseLeave={hideModal}
        />
      );
    }
  }

  function eventRender(event) {
    return (
      <div
        className={`flex h-24 min-h-24 w-48 min-w-48 flex-row rounded-lg bg-gradient-to-bl from-cyan-900 via-cyan-900 to-gray-800`}
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
          </div>
        </div>
      </div>
    );
  }
  // GDY status_settings==true TO ZNACZY ŻE MA SIE WYRENDEROWAC TRYB "NA GLOWNEJ STRONIE" Z PRZYCISKAMI DO ZARZĄDZANIA
  function eventBadgeRender(badge, event_id, event_title, status_settings) {
    return (
      <div
        className={`${
          status_settings == true
            ? "h-68 border-gray-700"
            : "h-52 border-blue-400 pt-3"
        } flex w-48 flex-col rounded-lg border-2`}
        key={badge.id}
      >
        <div className="flex h-3/5 w-full items-center justify-center">
          <img
            src={`${ips_config.BACKEND}/media/${badge.image}`}
            className="h-28 w-28 rounded-full object-cover transition ease-in-out hover:scale-110"
          ></img>
        </div>
        <div
          className={`${
            status_settings == false && "pt-1"
          } flex h-1/5 w-full items-center justify-center px-2`}
        >
          <span className="break-anywhere h-auto text-center font-mukta text-[13px] text-gray-100">
            {badge.name}
          </span>
        </div>
        <div
          className={`${
            status_settings == false && "pt-2"
          } h-auto w-full flex-col`}
        >
          <div className="flex h-1/2 w-full items-end justify-center">
            <span className="h-auto text-center font-mukta text-[10px] text-gray-100">
              Użyte kody
            </span>
          </div>
          <div className="flex h-1/2 w-full items-start justify-center">
            <span
              className={`${
                badge.used_codes_count == badge.codes.length
                  ? "text-red-400"
                  : "text-gray-100"
              } h-auto text-center font-mukta text-[10px]`}
            >
              {`${badge.used_codes_count} / ${badge.codes.length}`}
            </span>
          </div>
        </div>
        <div className="flex h-1/5 w-full flex-row">
          {status_settings == true && (
            <div className="flex h-auto w-full flex-row justify-between">
              <div className="flex h-full w-1/3 flex-col">
                <div className="flex h-1/3 w-full items-center justify-center">
                  <span className="h-auto text-center font-mukta text-[10px] text-gray-100">
                    Usuń:
                  </span>
                </div>
                <div className="flex h-2/3 w-full">
                  <div
                    className="group flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-bl from-red-500 via-red-400 to-red-400"
                    onClick={() => {
                      setOpenModalDeleteBadge({
                        status: !openModalDeleteBadge.status,
                        event_id: event_id,
                        badge: badge,
                      });
                    }}
                  >
                    <TrashIcon className="block h-4 w-4 text-gray-100 transition ease-in-out group-hover:scale-125"></TrashIcon>
                  </div>
                </div>
              </div>
              {/* ////// */}
              <div className="flex h-full w-auto items-center justify-center">
                {iconInfoRender(badge.verificated, badge.verificated_details)}
              </div>

              {/* ////// */}
              <div className="flex h-full w-1/3 flex-col">
                <div className="flex h-1/3 w-full items-center justify-center">
                  <span className="h-auto text-center font-mukta text-[10px] text-gray-100">
                    Zarządzaj:
                  </span>
                </div>
                <div className="flex h-2/3 w-full">
                  {badge.verificated !== "rejected" ? (
                    <div
                      className="group flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-gradient-to-bl from-blue-600 via-blue-500 to-blue-400"
                      onClick={() => {
                        setFormError(formErrorInitialEdit);

                        setOpenModalManageBadge({
                          status: !openModalManageBadge.status,
                          event_id: event_id,
                          event_title: event_title,
                          amount_new_badge_codes: 0,
                          badge: badge,
                          valuesInput: {
                            name: badge.name,
                            image: badge.image,
                          },
                        });
                      }}
                    >
                      <CogIcon className="block h-4 w-4 text-gray-100 transition ease-in-out group-hover:scale-125"></CogIcon>
                    </div>
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-lg bg-gradient-to-bl from-gray-600 via-gray-500 to-gray-400">
                      <CogIcon className="block h-4 w-4 text-gray-100"></CogIcon>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // GŁÓWNY RENDER

  function eventModule(event) {
    return (
      <div
        className="flex h-auto w-full flex-col items-center space-y-5 pt-8 md:flex-row md:items-start md:space-y-0 md:space-x-5 md:pt-0"
        id={event.title}
        key={event.id}
      >
        {eventRender(event)}

        <div className="flex h-auto flex-grow flex-wrap justify-evenly gap-3 rounded-lg border-2 border-blue-400 p-3">
          {event.badges.map((badge) =>
            eventBadgeRender(badge, event.id, event.title, true)
          )}
          <div
            className={`group flex h-60 w-48 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-700 hover:bg-gray-800`}
            onClick={() => {
              setFormError(formErrorInitialNew);
              setOpenModalNewBadge((prevState) => ({
                ...prevState,
                status: true,
                event_id: event.id,
              }));
            }}
          >
            <DocumentAddIcon
              className={`h-8 w-8 text-gray-300 transition ease-in-out group-hover:scale-125`}
            ></DocumentAddIcon>
          </div>
        </div>
      </div>
    );
  }

  // RENDER MODALI

  function modalDeleteFoundUsed() {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-full flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl lg:w-2/3">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Znaleziono nieprawidłowość
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalDeleteFoundUsed({
                  status: false,
                  selected_length: null,
                  used_codes: null,
                  deleted_codes: null,
                });
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Podczas próby usunięcia twoich kodów w ilości ${openModalDeleteFoundUsed.selected_length}, ktoś przed chwilą skorzystał z ${openModalDeleteFoundUsed.used_codes.length} z nich:`}
            </span>
          </div>

          <div className="flex max-h-38 w-9/10 shrink-0 flex-col space-y-1 overflow-y-auto px-5 md:w-2/3">
            {openModalDeleteFoundUsed.used_codes.map((code) => {
              return (
                <div
                  className={`flex w-full flex-row divide-x-2 divide-gray-700 rounded-xl border-2 border-gray-700 pt-1`}
                  key={code.id}
                >
                  <div className="flex w-1/2 items-center justify-center">
                    <span className="font-mukta text-[10px] text-white lg:text-[13px]">
                      {code.code}
                    </span>
                  </div>
                  <div className="flex w-[76px] items-center justify-center">
                    <span className="font-mukta text-[10px] text-white lg:text-[13px]">
                      {code.created_time.substring(0, 10)}
                    </span>
                  </div>
                  <div className="flex grow items-center justify-center px-2">
                    <span className="font-mukta text-[10px] text-white lg:text-[11px]">
                      {`Wykorzystano przez "${code.activated_by}"`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`W takim przypadku z twoich kodów w ilości ${openModalDeleteFoundUsed.selected_length}, zostanie usuniętych ${openModalDeleteFoundUsed.deleted_codes.length}.`}
            </span>
          </div>

          <div className="flex max-h-38 w-9/10 shrink-0 flex-col space-y-1 overflow-y-auto px-5 md:w-2/3">
            {openModalDeleteFoundUsed.deleted_codes.map((code) => {
              return (
                <div
                  className={`flex w-full flex-row divide-x-2 divide-red-400 rounded-xl border-2 border-red-400 py-1`}
                  key={code.id}
                >
                  <div className="flex w-1/2 items-center justify-center">
                    <span className="font-mukta text-[10px] text-white lg:text-[13px]">
                      {code.code}
                    </span>
                  </div>
                  <div className="flex w-1/6 items-center justify-center">
                    <span className="font-mukta text-[10px] text-white lg:text-[13px]">
                      {code.created_time.substring(0, 10)}
                    </span>
                  </div>
                  <div className="w/1/3 flex items-center justify-center px-2">
                    <span className="font-mukta text-[10px] text-white lg:text-[11px]">
                      {`Usunięte`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              setOpenModalDeleteFoundUsed({
                status: false,
                selected_length: null,
                used_codes: null,
                deleted_codes: null,
              });
            }}
          >
            <span className="text-center font-mukta text-[12px]">Zamknij</span>
          </button>
        </div>
      </div>
    );
  }

  function modalExportFoundUsed() {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-4">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-full flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl lg:w-2/3">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Znaleziono nieprawidłowość
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalExportFoundUsed({
                  status: false,
                  selected_length: null,
                  used_codes: null,
                  append_codes: null,
                });
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Podczas próby exportu twoich kodów w ilości ${openModalExportFoundUsed.selected_length}, ktoś przed chwilą skorzystał z ${openModalExportFoundUsed.used_codes.length} z nich:`}
            </span>
          </div>

          <div className="flex max-h-38 w-9/10 shrink-0 flex-col space-y-1 overflow-y-auto px-5 md:w-2/3">
            {openModalExportFoundUsed.used_codes.map((code) => {
              return (
                <div
                  className={`flex w-full flex-row divide-x-2 divide-gray-700 rounded-xl border-2 border-gray-700 pt-1`}
                  key={code.id}
                >
                  <div className="flex w-1/2 items-center justify-center">
                    <span className="font-mukta text-[10px] text-white lg:text-[13px]">
                      {code.code}
                    </span>
                  </div>
                  <div className="flex w-1/6 items-center justify-center">
                    <span className="font-mukta text-[10px] text-white lg:text-[13px]">
                      {code.created_time.substring(0, 10)}
                    </span>
                  </div>
                  <div className="flex w-1/3 items-center justify-center px-2">
                    <span className="text-center font-mukta text-[10px] text-white lg:text-[11px]">
                      {`Wykorzystano przez "${code.activated_by}"`}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Wiedząc, że chcesz wyeksportować kody w ilości ${openModalExportFoundUsed.selected_length}, zostało utworzone dodatkowo ${openModalExportFoundUsed.append_codes.length} i wliczone do twojego pliku ".xlsx"`}
            </span>
          </div>

          <div className="flex max-h-38 w-9/10 shrink-0 flex-col space-y-1 overflow-y-auto px-5 md:w-2/3">
            {openModalExportFoundUsed.append_codes.map((code) => {
              return (
                <div
                  className={`flex w-full flex-row divide-x-2 divide-yellow-400  rounded-xl border-2 border-yellow-400 py-1`}
                  key={code.id}
                >
                  <div className="flex w-1/2 items-center justify-center">
                    <span className="font-mukta text-[10px] text-white lg:text-[13px]">
                      {code.code}
                    </span>
                  </div>
                  <div className="flex w-1/6 items-center justify-center">
                    <span className="font-mukta text-[10px] text-white lg:text-[13px]">
                      {code.created_time.substring(0, 10)}
                    </span>
                  </div>
                  <div className="flex w-1/3 items-center justify-center px-2">
                    <span className="text-center font-mukta text-[10px] text-white lg:text-[11px]">
                      Zarezerwowano
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              setOpenModalExportFoundUsed({
                status: false,
                selected_length: null,
                used_codes: null,
                append_codes: null,
              });
            }}
          >
            <span className="text-center font-mukta text-[12px]">Zamknij</span>
          </button>
        </div>
      </div>
    );
  }

  function modalPopup() {
    let text;
    if (showPopup.state == "awaiting") {
      text = "Odznaka w trakcie weryfikacji";
    } else if (showPopup.state == "need_improvement") {
      text = "Odznaka wymaga zmian.";
    } else if (showPopup.state == "rejected") {
      text = "Odznaka usunięta.";
    }

    return (
      <div
        className={`absolute top-[-60px] left-[-135px] flex h-auto w-32 flex-col rounded-lg bg-gradient-to-bl from-gray-900 via-gray-900 to-gray-800`}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
        id="testtt"
      >
        <div className="flex h-6 w-full items-center justify-start rounded-t-lg bg-gradient-to-r from-gray-700 to-slate-600 ">
          <span className="h-auto w-fit pl-2 font-mukta text-[12px] text-gray-100 ">
            Status odznaki
          </span>
        </div>

        <div className="flex h-auto flex-col space-y-2 divide-y-2 divide-gray-700 py-3">
          <span className="h-auto px-2 text-center font-mukta text-[12px] text-gray-300">
            {text}
          </span>
          {showPopup.details !== null &&
            (showPopup.state == "need_improvement" ||
              showPopup.state == "rejected") && (
              <span className="h-auto px-2 pt-3 text-center font-mukta text-[12px] text-white">
                {showPopup.details}
              </span>
            )}
        </div>
      </div>
    );
  }

  function modalDeleteBadge() {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-full flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl lg:w-2/3">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Usuwanie odznaki
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalDeleteBadge({
                  status: !openModalDeleteBadge.status,
                  event_id: null,
                  badge: null,
                });
              }}
            />
          </div>
          <div className="flex px-2">
            <span className="font-mukta text-sm text-white lg:text-base">
              Usuwanie odznaki:
            </span>
          </div>
          <div className="flex px-8">
            {eventBadgeRender(openModalDeleteBadge.badge, null, null, false)}
          </div>
          <div className="flex">
            <span className="font-mukta text-sm text-white lg:text-base">
              Jesteś pewny, że chcesz usunąć powyższą odznakę?
            </span>
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              dispatch(
                badge_delete(
                  openModalDeleteBadge.event_id,
                  openModalDeleteBadge.badge.id,
                  xcsrftoken
                )
              );
            }}
          >
            <span className="text-center font-mukta text-[12px]">
              Usuń odznakę
            </span>
          </button>
        </div>
      </div>
    );
  }

  function modalNewBadge() {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-full flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-2/3">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Dodawanie odznaki
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalNewBadge({
                  status: !openModalNewBadge.status,
                  event_id: null,
                  valuesInput: {
                    name: null,
                    image: null,
                  },
                });
              }}
            />
          </div>
          <div className="flex">
            <span className="font-mukta text-sm text-white lg:text-base">
              Tworzenie odznaki:
            </span>
          </div>
          <div className="flex h-full w-3/4 flex-col space-y-4 px-6 pb-4">
            <div className="flex flex-col">
              <label
                htmlFor="showEndWithoutSeriesPageSelect"
                className="font-mukta text-sm text-gray-100 lg:text-base"
              >
                Nazwa odznaki
              </label>
              <input
                type="text"
                name="name"
                defaultValue={openModalNewBadge.valuesInput.name}
                onChange={(e) => handleNewValueChange(e)}
                placeholder="Podaj nazwę odznaki"
                maxLength="50"
                className=" w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 lg:text-base"
              ></input>
              <div className="flex h-12 w-auto pt-1">{checkForm("name")}</div>
            </div>

            <div className="flex flex-col space-y-1">
              <label
                htmlFor="showEndWithoutSeriesPageSelect"
                className="font-mukta text-sm text-gray-100 lg:text-base"
              >
                Obraz odznaki
              </label>
              <div className="full flex flex-row items-end">
                <input
                  type="file"
                  name="image"
                  className="grow font-mukta text-sm text-white lg:text-base"
                  accept="image/*"
                  onChange={(e) => {
                    handleNewAddImage(e);
                  }}
                />

                {openModalNewBadge.valuesInput.image !== null ? (
                  imageRender(openModalNewBadge.valuesInput.image)
                ) : (
                  <div
                    className={`group flex h-32 w-32 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-gray-300`}
                  >
                    <EmojiSadIcon
                      className={`h-8 w-8 text-gray-300 transition ease-in-out group-hover:scale-125`}
                    ></EmojiSadIcon>
                  </div>
                )}
              </div>
              <div className="flex h-12 w-auto pt-1">{checkForm("image")}</div>
            </div>
            <div className="flex h-auto w-full justify-end pt-3">
              <button
                disabled={!validated}
                type="submit"
                value="Submit"
                className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none`}
                onClick={() => {
                  if (validated) {
                    dispatch(
                      badge_create(
                        openModalNewBadge.event_id,
                        openModalNewBadge.valuesInput,
                        xcsrftoken
                      )
                    );
                  }
                }}
              >
                <span className="text-center font-mukta text-[12px]">
                  Stwórz odznakę
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function modalManageBadge() {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center px-3 pt-4">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-full flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl xl:w-2/3">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Zarządzanie odznaką
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalManageBadge({
                  status: !openModalManageBadge.status,
                  event_id: null,
                  event_title: null,
                  badge: null,
                  amount_new_badge_codes: null,
                  valuesInput: null,
                });
                setCodesTagged([]);
                setCkeckboxAllCodes(false);
              }}
            />
          </div>
          <div className="mr-1 flex max-h-[65vh] w-full flex-col items-center space-y-4 overflow-y-auto lg:max-h-[80vh]">
            <div className="flex px-2">
              <span className="font-mukta text-sm text-white lg:text-base">
                Zarządzanie odznaką:
              </span>
            </div>
            <div className="flex px-8">
              {eventBadgeRender(openModalManageBadge.badge, null, null, false)}
            </div>
            <div className="flex w-full flex-col gap-3 space-y-2 pt-4 pb-7 lg:flex-row lg:space-y-0">
              {/* LEWA STRONA */}
              <div className="flex h-full w-full flex-col space-y-4 px-6 lg:w-1/2">
                <div className="flex w-full items-center justify-center pt-2">
                  <span className="font-mukta text-lg text-white lg:text-xl">
                    Edytowanie odznaki
                  </span>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="showEndWithoutSeriesPageSelect"
                    className="font-mukta text-sm text-gray-100 lg:text-base"
                  >
                    Nazwa odznaki
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={openModalManageBadge.valuesInput.name}
                    onChange={(e) => handleManageValueChange(e)}
                    placeholder="Podaj nazwę odznaki"
                    maxLength="50"
                    className="w-full rounded-md border-2 border-blue-400 bg-transparent font-mukta text-sm text-gray-100 focus:ring-0 lg:text-base"
                  ></input>
                  <div className="flex h-12 w-auto pt-1">
                    {checkForm("name")}
                  </div>
                </div>

                <div className="flex flex-col space-y-1">
                  <label
                    htmlFor="showEndWithoutSeriesPageSelect"
                    className="font-mukta text-sm text-gray-100 lg:text-base"
                  >
                    Obraz odznaki
                  </label>
                  <div className="full flex flex-row items-end">
                    <input
                      type="file"
                      className="grow font-mukta text-sm text-white lg:text-base"
                      accept="image/*"
                      onChange={(e) => {
                        handleManageAddImage(e);
                      }}
                    />

                    {imageRender(openModalManageBadge.valuesInput.image)}
                  </div>
                </div>
                <div className="flex h-auto w-full justify-end pt-3">
                  <button
                    disabled={!validated}
                    type="submit"
                    value="Submit"
                    className={`h-[32px] w-[160px] items-center justify-center rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 py-1 px-10 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none`}
                    onClick={() => {
                      if (validated) {
                        dispatch(
                          badge_edit(
                            openModalManageBadge.event_id,
                            openModalManageBadge.badge.id,
                            openModalManageBadge.valuesInput,
                            xcsrftoken
                          )
                        );
                      }
                    }}
                  >
                    <span className="text-center font-mukta text-[12px]">
                      Zapisz zmiany
                    </span>
                  </button>
                </div>
              </div>

              {/* PRAWA STRONA */}

              <div className="flex h-full w-full flex-col space-y-4 px-6 lg:w-1/2">
                <div className="flex w-full flex-col items-center justify-center space-y-1">
                  <span className="font-mukta text-lg text-white lg:text-xl">
                    Zarządzanie kodami
                  </span>
                  <div className="flex w-full flex-row items-end justify-between">
                    <span className="font-mukta text-sm text-white lg:text-base">
                      {`${openModalManageBadge.badge.to_use_codes_count} aktywnych z ${openModalManageBadge.badge.codes.length}`}
                    </span>
                    <div className="flex w-[180px] flex-col">
                      <label
                        htmlFor="ordering"
                        className="font-mukta text-xs text-gray-200 "
                      >
                        Sortuj
                      </label>
                      <select
                        id="ordering"
                        value={ordering}
                        onChange={(e) => setOrdering(e.target.value)}
                        className="w-[180px] rounded-md border-2 border-blue-400 bg-transparent font-mukta text-xs text-gray-200"
                      >
                        <option
                          value="created_time"
                          className="font-mukta text-black"
                        >
                          Od daty utworzenia
                        </option>
                        <option
                          value="status"
                          className="font-mukta text-black"
                        >
                          Od statusu
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col space-y-1 pt-1">
                  <div className="flex w-full flex-row divide-x-2  divide-blue-400 border-b-2 border-blue-400">
                    <div className="flex w-[26px] items-center justify-center">
                      <input
                        type="checkbox"
                        name="events_to_reserve_all"
                        disabled={
                          openModalManageBadge.badge.to_use_codes_count == 0
                        }
                        onChange={(e) => {
                          if (
                            openModalManageBadge.badge.to_use_codes_count > 0
                          ) {
                            if (ckeckboxAllCodes == false) {
                              let array = [];
                              openModalManageBadge.badge.codes.forEach(
                                (obj) => {
                                  if (obj.status == "a) to_use") {
                                    array.push(obj.id);
                                  }
                                }
                              );
                              setCodesTagged(array);
                              setCkeckboxAllCodes(true);
                            } else {
                              setCodesTagged([]);
                              setCkeckboxAllCodes(false);
                            }
                          }
                        }}
                        checked={ckeckboxAllCodes}
                        className={`${
                          openModalManageBadge.badge.to_use_codes_count == 0 &&
                          "bg-gray-600 text-sm lg:text-base"
                        }`}
                      ></input>
                    </div>
                    <div className="flex w-[170px] items-center justify-center">
                      <span className="font-mukta text-xs text-white lg:text-[13px]">
                        Kod aktywacyjny
                      </span>
                    </div>
                    <div className="flex w-[76px] items-center justify-center ">
                      <span className="text-center font-mukta text-[9px] text-white">
                        Data utworzenia kodu
                      </span>
                    </div>
                    <div className="flex grow items-center justify-center">
                      <span className="-ml-3 text-center font-mukta text-[9px] text-white">
                        Status / Aktywowany przez:
                      </span>
                    </div>
                  </div>
                  <div className="flex max-h-38 min-h-38 w-full flex-col space-y-2 overflow-y-auto pr-2">
                    {openModalManageBadge.badge.codes.length > 0 ? (
                      openModalManageBadge.badge.codes.map((code) => {
                        let color;
                        let description;
                        if (code.status == "a) to_use") {
                          color = "divide-blue-400 border-blue-400";
                          description = "Aktywny";
                        } else if (code.status == "b) locked") {
                          color = "divide-yellow-400 border-yellow-400";
                          description = "Zarezerwowany";
                        } else if (code.status == "c) used") {
                          color = "divide-gray-700 border-gray-700";
                          description = `"${code.activated_by}"`;
                        }
                        return (
                          <div
                            className={`${
                              code.status !== "a) to_use" ? "pl-7" : "pl-1"
                            } flex flex-row items-center space-x-2`}
                            key={code.id}
                          >
                            {code.status == "a) to_use" && (
                              <input
                                type="checkbox"
                                name="events_to_reserve"
                                value={code.id}
                                onChange={(e) => {
                                  if (ckeckboxAllCodes == true) {
                                    setCkeckboxAllCodes(false);
                                  }

                                  let value = parseInt(e.target.value);

                                  if (codesTagged.includes(value)) {
                                    let filter_list = codesTagged.filter(
                                      (obj) => obj !== value
                                    );
                                    setCodesTagged(filter_list);
                                  } else {
                                    setCodesTagged((prevState) => [
                                      ...prevState,
                                      value,
                                    ]);
                                  }
                                }}
                                checked={codesTagged.includes(code.id)}
                              ></input>
                            )}

                            <div
                              className={`${color} flex grow flex-row divide-x-2 rounded-xl border-2`}
                            >
                              <div className="flex w-[166px] items-center justify-center">
                                <span className="font-mukta text-xs text-white lg:text-[13px]">
                                  {code.code}
                                </span>
                              </div>
                              <div className="flex w-[76px] items-center justify-center">
                                <span className="font-mukta text-xs text-white lg:text-[13px]">
                                  {code.created_time.substring(0, 10)}
                                </span>
                              </div>
                              <div className="flex grow items-center justify-center">
                                <span className="font-mukta text-[11px] text-white">
                                  {description}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="flex h-full items-center justify-center px-3 pt-4">
                        <span className="text-center font-mukta text-sm text-white lg:text-base">
                          Nie stworzono żadnego kodu do tej odznaki. Zaznacz na
                          dole ilość kodów do dodania, a następnie je dodaj.
                        </span>
                      </div>
                    )}
                  </div>
                  <div
                    className={`flex h-full w-full flex-row items-center justify-between pt-3`}
                  >
                    <form
                      className="flex w-auto flex-row items-center"
                      autoComplete="off"
                      onSubmit={(e) => {
                        e.preventDefault();
                        dispatch(
                          badgecodes_create(
                            openModalManageBadge.event_id,
                            openModalManageBadge.badge.id,
                            openModalManageBadge.amount_new_badge_codes,
                            xcsrftoken
                          )
                        );

                        setOpenModalManageBadge((prevState) => ({
                          ...prevState,
                          amount_new_badge_codes: 0,
                        }));
                      }}
                    >
                      <button
                        disabled={
                          openModalManageBadge.amount_new_badge_codes == 0
                        }
                        type="submit"
                        value="Submit"
                        className={`h-[30px] w-[90px] items-center justify-center rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none`}
                      >
                        <span className="text-center font-mukta text-[12px]">
                          {`Utwórz kody`}
                        </span>
                      </button>

                      <input
                        type="number"
                        name="nums_new_codes"
                        placeholder={0}
                        value={openModalManageBadge.amount_new_badge_codes}
                        onChange={(e) => {
                          setOpenModalManageBadge((prevState) => ({
                            ...prevState,
                            amount_new_badge_codes: parseInt(e.target.value)
                              ? parseInt(e.target.value)
                              : 0,
                          }));
                        }}
                        min="0"
                        max="100"
                        className="w-[65px] border-0 bg-transparent font-mukta text-white placeholder-white focus:ring-0"
                        id="amount_new_codes"
                      />
                    </form>

                    <div className="flex flex-col space-y-2">
                      <button
                        disabled={codesTagged.length == 0}
                        type="submit"
                        value="Submit"
                        className={`h-[32px] w-[150px] items-center justify-center rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-1 px-2 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none`}
                        onClick={() => {
                          if (codesTagged.length > 0) {
                            dispatch(
                              badgecodes_delete(
                                openModalManageBadge.event_id,
                                openModalManageBadge.badge.id,
                                codesTagged,
                                xcsrftoken
                              )
                            );
                          }
                        }}
                      >
                        <span className="text-center font-mukta text-[10px]">
                          {`Usuń zaznaczone (${codesTagged.length}/${openModalManageBadge.badge.to_use_codes_count})`}
                        </span>
                      </button>

                      <button
                        disabled={codesTagged.length == 0}
                        type="submit"
                        value="Submit"
                        className={`h-[32px] w-[150px] items-center justify-center rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 py-1 px-2 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none`}
                        onClick={() => {
                          if (codesTagged.length > 0) {
                            dispatch(
                              badgecodes_lock(
                                openModalManageBadge.event_id,
                                openModalManageBadge.badge.id,
                                codesTagged,
                                xcsrftoken
                              )
                            );
                          }
                        }}
                      >
                        <span className="text-center font-mukta text-[10px]">
                          {`Wyeksportuj zaznaczone (${codesTagged.length}/${openModalManageBadge.badge.to_use_codes_count})`}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openModalExportFoundUsed.status && modalExportFoundUsed()}
        {openModalDeleteFoundUsed.status && modalDeleteFoundUsed()}
      </div>
    );
  }

  // MODUŁ ZDJĘĆ

  function imageRender(data) {
    let image;
    if (data?.type !== undefined) {
      image = URL.createObjectURL(data);
    } else {
      image = `${ips_config.BACKEND}/media/${data}`;
    }

    return (
      <img
        src={image}
        className="h-32 w-32 shrink-0 rounded-full border-2 border-dashed border-blue-400 object-cover transition-opacity duration-150 ease-in-out group-hover:opacity-50"
      ></img>
    );
  }

  // HANDLERY DLA MODUŁU EDYCJI I MODUŁU DODAWANIA

  const handleManageAddImage = (e) => {
    const { files } = e.target;
    if (files && files[0].type.startsWith("image/")) {
      setOpenModalManageBadge((prevState) => ({
        ...prevState,
        valuesInput: {
          ...prevState.valuesInput,
          image: files[0],
        },
      }));
      if (
        openModalManageBadge.valuesInput.name.length >= 5 &&
        openModalManageBadge.valuesInput.name.length <= 50
      ) {
        formErrorDelete("name");
      }
    } else {
      e.target.value = null;
      setOpenModalManageBadge((prevState) => ({
        ...prevState,
        valuesInput: {
          ...prevState.valuesInput,
          image: openModalManageBadge.badge.image,
        },
      }));

      if (
        openModalManageBadge.valuesInput.name ==
          openModalManageBadge.badge.name ||
        openModalManageBadge.valuesInput.name.length < 5 ||
        openModalManageBadge.valuesInput.name.length > 50
      ) {
        formErrorStill("name", true);
      }
    }
  };

  function handleManageValueChange(e) {
    validator(e.target.name, e.target.value, true);
    setOpenModalManageBadge((prevState) => ({
      ...prevState,
      valuesInput: {
        ...prevState.valuesInput,
        [e.target.name]: e.target.value,
      },
    }));
  }

  ///

  const handleNewAddImage = (e) => {
    const { files } = e.target;
    if (files && files[0].type.startsWith("image/")) {
      setOpenModalNewBadge((prevState) => ({
        ...prevState,
        valuesInput: {
          ...prevState.valuesInput,
          image: files[0],
        },
      }));
      formErrorDelete("image");
    } else {
      e.target.value = null;
      setOpenModalNewBadge((prevState) => ({
        ...prevState,
        valuesInput: {
          ...prevState.valuesInput,
          image: null,
        },
      }));
      formErrorStill("image", false);
    }
  };

  function handleNewValueChange(e) {
    validator(e.target.name, e.target.value, false);
    setOpenModalNewBadge((prevState) => ({
      ...prevState,
      valuesInput: {
        ...prevState.valuesInput,
        [e.target.name]: e.target.value,
      },
    }));
  }

  function handleScrollToEvent(title) {
    const target = document.getElementById(title);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return [
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
  ];
}
export default useEventsBadgesPage;
