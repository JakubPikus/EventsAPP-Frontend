import React, { useEffect, useRef, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { XIcon, RefreshIcon } from "@heroicons/react/solid";
import { getXCSRFToken, getUser } from "../../selectors";
import { Scrollbars } from "react-custom-scrollbars-2";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import ips_config from "../../ips_config";
import moment from "moment";
import {
  admin_logs_next,
  admin_data,
  admin_data_next,
  admin_data_action,
  admin_open_gateway_paycheck,
} from "../../actions/admin";
import "moment/locale/pl";
moment.locale("pl");

function DashboardPage({
  logs,
  settings,
  cursorId,
  setCursorId,
  excludedIdsLogs,
  setExcludedIdsLogs,
  endProvider,
}) {
  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);
  const user = useSelector(getUser);

  // DO USTALANIA LISTY EXCLUDEDIDS BEZ BRANIA POD UWAGE LOKALNYCH LOGS'ÓW

  useEffect(() => {
    if (logs?.data !== undefined && logs?.data.length !== 0) {
      let ids_arrays = [];
      logs.data.forEach((obj) => {
        if (!obj.hasOwnProperty("local")) {
          ids_arrays.push(obj.id);
        }
      });
      setExcludedIdsLogs(ids_arrays);

      let cursor = logs.data.find((obj) => !obj.hasOwnProperty("local"));

      if (cursor !== undefined) {
        setCursorId(cursor.id);
      }
    }
  }, [logs?.data]);

  //////// GŁÓWNY MODUŁ KATEGORII

  const [activeCategoryList, setActiveCategoryList] = useState("reports");

  let initListCategory = {
    reports: "Reporty",
    awaitings: "Oczekujące wydarzenia, odznaki i bilety",
    bans: "Ograniczenia użytkowników i adresów IP",
    paychecks: "Niezrealizowane wypłaty za wydarzenia i zwrot biletów",
  };

  let verificatedTypes = {
    verificated: "Zweryfikowane",
    awaiting: "Oczekujące na akceptacje",
    need_improvment: "Wymagane poprawy przez organizatora",
  };

  // USEEFFECT OD WYŁĄCZANIA MODALA

  useEffect(() => {
    if (settings.data?.[activeCategoryList]?.modal_settings !== undefined) {
      setOpenModalActions({
        status: !openModalActions.status,
        data: null,
        details: null,
      });
    }
  }, [settings.data?.[activeCategoryList]?.modal_settings]);

  // ZMIENNE DO NAWIGOWANIA

  // AKTYWNE PODKATEGORIE W KAZDEJ Z KATEGORII
  const [activeObjects, setActiveObjects] = useState({
    reports: "events",
    awaitings: "events",
    bans: "users",
    paychecks: "events",
  });

  // WSZYSTKIE PODKATEGORIE W KAZDEJ Z KATEGORII

  let categoryObjects = {
    reports: {
      events: "Wydarzenia",
      comments: "Komentarze",
      badges: "Odznaki",
    },
    awaitings: {
      events: "Wydarzenia",
      badges: "Odznaki",
      tickets: "Bilety",
    },
    bans: {
      users: "Użytkownicy",
      ips: "Adresy IP",
    },
    paychecks: {
      events: "Wydarzenia",
      tickets: "Zwrot biletów",
    },
  };

  // INPUT DO FILTROWANIA DANYCH I POBIERANIA DANYCH

  const [inputFilter, setInputFilter] = useState({
    reports: "",
    awaitings: "",
    bans: "",
    paychecks: "",
  });

  const handleValueChange = (e) => {
    setInputFilter({ ...inputFilter, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (settings.name[activeCategoryList] !== inputFilter[activeCategoryList]) {
      dispatch(
        admin_data(
          inputFilter[activeCategoryList],
          activeCategoryList,
          xcsrftoken
        )
      );
    }
  }

  // SETTINGSY MODALA

  const [openModalActions, setOpenModalActions] = useState({
    status: false,
    data: null,
    details: null,
  });

  function modalRender(category, objects) {
    const modalChoice = {
      reports: modalReportActions,
      awaitings: modalAwaitingActions,
      bans: modalBanActions,
      paychecks: modalPaychecksActions,
    };

    return modalChoice[category](category, objects);
  }

  const scrollbarsRef = useRef(null);

  /// DO ZMIANY POZIOMU SCROLLBARA GDY ZOSTANĄ ODSWIEZONE DANE

  useEffect(() => {
    if (
      endProvider &&
      settings.data?.[activeCategoryList]?.[activeObjects[activeCategoryList]]
        .excluded_ids !== undefined &&
      settings.data?.[activeCategoryList][activeObjects[activeCategoryList]]
        .excluded_ids.length <=
        settings.data?.[activeCategoryList][activeObjects[activeCategoryList]]
          .limit
    ) {
      if (scrollbarsRef.current) {
        scrollbarsRef.current.scrollTop(0);
      }
    }
  }, [
    settings.data?.[activeCategoryList]?.[activeObjects[activeCategoryList]]
      .excluded_ids,
  ]);

  // DO DISPATCHA NOWEJ KATEGORII

  useEffect(() => {
    if (endProvider) {
      dispatch(
        admin_data(
          settings.name[activeCategoryList] !== undefined
            ? settings.name[activeCategoryList]
            : "",
          activeCategoryList,
          xcsrftoken
        )
      );
    }
  }, [activeCategoryList]);

  ///////////////////////////////////////////// POZOSTAŁE ZMIENNE DO PRAWIDŁOWEGO WYŚWIETLANIA

  let informationOwnObiect = {
    events: "Twoje wydarzenie",
    comments: "Twój komentarz",
    badges: "Twoja odznaka",
    ips: "Twój adres IP",
    users: "Twój profil",
    tickets: "Twój bilet",
  };

  function renderCategory(category, objects) {
    return (
      <form
        className="flex h-full w-full flex-col items-center divide-y-2 divide-gray-800 overflow-y-auto  bg-gray-600"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col items-center justify-center space-y-2 p-2 md:space-y-5">
          <div className="flex w-full flex-row items-center justify-center">
            <input
              type="text"
              name={category}
              value={inputFilter[category]}
              onChange={handleValueChange}
              placeholder="Podaj nazwę wydarzenia lub autora"
              className="h-4/5 w-full rounded-l-md border-2 border-blue-400 bg-transparent font-mukta text-[13px] text-gray-100 focus:border-blue-500 focus:ring-0 sm:h-full md:text-base lg:text-lg"
            ></input>
            <button
              type="submit"
              disabled={
                settings.name[category] == inputFilter[category] ||
                settings.name[category] == undefined
              }
              value="Submit"
              aria-label={`Wyszukaj obiekty w kategorii "${initListCategory[category]}"`}
              className="h-4/5 shrink-0 rounded-r-md bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-5 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-0 focus:ring-sky-800 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:shadow-none sm:h-full"
            >
              <p className="font-mukta text-[13px] font-bold md:text-sm">
                Szukaj
              </p>
            </button>
          </div>

          <div className="flex w-full flex-col items-center space-y-3 md:space-y-5 ">
            <div className="flex h-full w-full items-center justify-center ">
              <div
                className="group flex h-[33px] w-full shrink-0 shrink-0 cursor-pointer items-center justify-center rounded-lg border-2 border-green-400   sm:h-[42px] md:h-[47px]  xl:h-[50px]"
                onClick={() => {
                  dispatch(
                    admin_data(settings.name[category], category, xcsrftoken)
                  );
                }}
              >
                <RefreshIcon className=" h-10 w-10 px-2 text-green-400 transition ease-in-out group-hover:scale-110 sm:h-12 sm:w-12" />
              </div>
            </div>

            <div className="flex h-full w-full flex-row items-center justify-between space-x-4  sm:space-x-10">
              {Object.keys(categoryObjects[category]).map(
                (self_object, index) => (
                  <button
                    name="object"
                    value={self_object}
                    aria-label={`Zmiana typu obiektów kategorii "${initListCategory[category]}" na "${categoryObjects[category][self_object]}"`}
                    key={index}
                    onClick={(e) => {
                      if (objects !== e.target.value) {
                        setActiveObjects({
                          ...activeObjects,
                          [activeCategoryList]: e.target.value,
                        });
                      }
                    }}
                    className={`${
                      objects == self_object
                        ? "bg-gray-500"
                        : "bg-transparent hover:bg-gray-700"
                    } h-[33px] grow rounded-md border-2 border-blue-400 px-1 font-mukta text-xs text-gray-100 sm:h-[42px] sm:px-2 sm:text-[13px] md:h-[47px] md:text-sm lg:text-base xl:h-[50px] xl:px-4`}
                  >
                    {categoryObjects[category][self_object]}
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        {renderObjects(category, objects)}
      </form>
    );
  }

  function infiniteLoadEvents() {
    dispatch(
      admin_data_next(
        settings.data[activeCategoryList][activeObjects[activeCategoryList]]
          .excluded_ids,
        activeObjects[activeCategoryList],
        settings.name[activeCategoryList],
        activeCategoryList,
        xcsrftoken
      )
    );
  }

  // KATEGORIE RENDEROWANIA POD GUI REPORTOW

  function renderObjects(category, objects) {
    /// ZMIENNE DO WSTAWIENIA INFORMACJI O BRAKU DANYCH (MOGĄ BYĆ WSPÓLNE BO TE SAME KOMUNIKATY)
    let target = {
      events: "wydarzeń",
      comments: "komentarzy",
      badges: "odznak",
      users: "użytkowników",
      ips: "adresów ip",
      tickets: "biletów",
    };

    let renderForObject = {
      reports: renderReports,
      awaitings: renderAwaitings,
      bans: renderBans,
      paychecks: renderPaychecks,
    };

    return settings.data?.[category]?.[objects] !== undefined ? (
      <div
        className={`flex h-full w-full ${
          settings.data?.[category]?.[objects].data.length == 0
            ? "items-center justify-center"
            : "pt-1"
        }`}
      >
        {settings.data[category][objects].data.length > 0 ? (
          <Scrollbars
            ref={scrollbarsRef}
            renderThumbVertical={({ style, props }) => (
              <div
                {...props}
                style={{
                  ...style,
                  backgroundColor: "#000",
                  width: "4px",
                  opacity: "0.6",
                }}
              ></div>
            )}
            renderView={({ style, props }) => (
              <div
                {...props}
                style={{ ...style }}
                id="scrollableDivObjects"
              ></div>
            )}
          >
            <InfiniteScroll
              dataLength={settings.data[category][objects].data.length}
              next={() => infiniteLoadEvents()}
              hasMore={!settings.data[category][objects].end_pagination}
              scrollableTarget="scrollableDivObjects"
            >
              <div
                className={`flex flex-wrap overflow-x-hidden ${
                  category != "awaitings" && "space-y-6 px-3 pb-3"
                }`}
              >
                {settings.data[category][objects].data.map((obj) =>
                  renderForObject[category](obj, objects, true, false)
                )}
              </div>
            </InfiniteScroll>
          </Scrollbars>
        ) : (
          <span className="break-anywhere p-2 text-center font-mukta text-xl text-gray-100">
            {`Nie znaleziono żadnych ${target[objects]}`}
          </span>
        )}
      </div>
    ) : (
      <div className="flex h-full w-full items-center justify-center">
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      </div>
    );
  }

  ////////////////////////////////////////////////////////////////////////////// UNIKALNE RENDERY

  ///////////////////////////// BANOWANIE

  function renderBans(data, objects, dashboard_mode, detail_mode) {
    let banTypes = {
      count_reports: "Zgłaszane",
      count_active_objects: "Aktywne",
      count_deleted: "Usunięte",
    };

    let objectsTypes = {
      events: "Wydarzenia",
      badges: "Odznaki",
      comments: "Komentarze",
      all: "SUMA",
    };

    function renderButtons(data, objects, dashboard_mode, detail_mode) {
      if (dashboard_mode) {
        return (
          <button
            className={`h-auto w-auto rounded-lg bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 px-3 py-1 text-center text-[10px] font-medium text-white shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:h-9 2xl:h-10 2xl:w-28`}
            onClick={() => {
              setOpenModalActions({
                status: true,
                data: data,
                details: null,
              });
            }}
          >
            Wykonaj akcję
          </button>
        );
      } else if (
        (objects == "users" && data.username != user.username) ||
        (objects == "ips" && data.ip_address != settings.data.bans.ips.self_ip)
      ) {
        return (
          <>
            <button
              className={` h-auto w-auto rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600 py-1 px-3 text-center text-[10px] font-medium text-white shadow-lg shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300 md:h-9 2xl:h-10 2xl:w-28`}
              onClick={() => {
                dispatch(
                  admin_data_action(
                    data.id,
                    objects,
                    objects,
                    activeCategoryList,
                    xcsrftoken
                  )
                );
              }}
            >
              {objects == "users" ? "Zbanuj użytkownika" : "Zbanuj adres IP"}
            </button>
            {logoutModule(objects, detail_mode)}
          </>
        );
      }
    }

    function logoutModule(objects, detail_mode) {
      if (detail_mode == "parent") {
        if (objects == "users") {
          return (
            <button
              className={`h-auto w-auto rounded-lg bg-gradient-to-br from-yellow-400  via-yellow-500 to-yellow-600 py-1 px-1 text-center text-[10px] font-medium text-gray-700 shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:h-9 2xl:h-10 2xl:w-28`}
              onClick={() => {
                dispatch(
                  admin_data_action(
                    data.id,
                    "all_ips",
                    objects,
                    activeCategoryList,
                    xcsrftoken,
                    "logouts"
                  )
                );
              }}
            >
              Wyloguj konto ze wszystkich adresów IP
            </button>
          );
        } else {
          return (
            <button
              className={`h-auto w-auto rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-1 px-3 text-center text-[10px] font-medium text-gray-700 shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:h-9 2xl:h-10 2xl:w-28`}
              onClick={() => {
                dispatch(
                  admin_data_action(
                    data.id,
                    "all_users",
                    objects,
                    activeCategoryList,
                    xcsrftoken,
                    "logouts"
                  )
                );
              }}
            >
              Wyloguj wszystkie konta z tego adresu IP
            </button>
          );
        }
      } else if (detail_mode == "child") {
        return (
          <button
            className={`h-auto max-w-[115px]  rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-1 px-3 text-center text-[10px] font-medium text-gray-700 shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:h-9 2xl:h-10 2xl:w-28`}
            onClick={() => {
              dispatch(
                admin_data_action(
                  objects == "users" ? data.id : openModalActions.data.id,
                  "single",
                  objects,
                  activeCategoryList,
                  xcsrftoken,
                  "logouts",
                  objects == "users" ? openModalActions.data.id : data.id
                )
              );
            }}
          >
            Wyloguj konto z tego adresu IP
          </button>
        );
      }
    }

    function responsiveButtons(detail_mode) {
      return (
        ((objects == "ips" &&
          data.ip_address != settings.data.bans.ips.self_ip) ||
          objects == "users" ||
          dashboard_mode == true) && (
          <div
            className={`flex w-full flex-col items-center justify-evenly space-y-2  p-2 `}
          >
            {objects == "users" && (
              <Link to={`/user/${data.username}`}>
                <button
                  className={`h-auto w-auto rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-3 py-1 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 md:h-9 2xl:h-10 2xl:w-28`}
                >
                  Przejdź na profil
                </button>
              </Link>
            )}

            {renderButtons(data, objects, dashboard_mode, detail_mode)}
          </div>
        )
      );
    }

    return (
      <div
        className={`flex h-auto w-full flex-col divide-y-2 divide-blue-400 rounded-xl border-2 border-blue-400 bg-gray-700 ${
          detail_mode == false && "xl:flex-row xl:divide-y-0 xl:divide-x-2"
        }`}
        key={data.id}
      >
        {objects == "users" ? (
          <div
            className={`flex h-auto w-full flex-row divide-x-2 divide-blue-400 ${
              detail_mode == false && "xl:w-3/10"
            }`}
          >
            <div
              className={`flex h-full w-full flex-row items-center justify-center`}
            >
              <div className="group flex h-fit w-14 flex-col items-center justify-center space-y-1 px-1 py-2 md:w-28 xl:w-1/3">
                <Link
                  to={`/user/${data.username}`}
                  target="_blank"
                  className="flex h-10 w-10 justify-center xl:h-11 xl:w-11 2xl:h-12 2xl:w-12"
                >
                  <img
                    src={`${ips_config.BACKEND}${data.image_thumbnail}`}
                    className="h-10 w-10 rounded-full object-cover transition ease-in-out group-hover:scale-110 xl:h-11 xl:w-11 2xl:h-12 2xl:w-12"
                  ></img>
                </Link>
                <Link
                  to={`/user/${data.username}`}
                  target="_blank"
                  className="flex w-auto items-center"
                >
                  <span className="text-center font-mukta text-[11px] text-gray-100 xl:text-[12px]">
                    {data.username}
                  </span>
                </Link>

                {objects == "users" && data.username == user.username && (
                  <span className="shrink-0 text-center font-mukta text-[10px] text-green-500 xl:text-[12px]">
                    {informationOwnObiect[objects]}
                  </span>
                )}
              </div>
              <div className="group flex h-full grow flex-col items-center justify-center space-y-1 px-3 py-2 xl:w-2/3">
                <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                  {`Imię i nazwisko: ${data.first_name}  ${data.last_name}`}
                </span>
                <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                  {`Miejscowość: ${data.city} (${data.province})`}
                </span>
                <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                  {`Email: ${data.email}`}
                </span>

                {data?.name_device != undefined && (
                  <>
                    <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                      {`Urządzenie: ${data.name_device}`}
                    </span>
                    <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                      {`Ostatnie miejsce logowania: ${data.last_login_city} (${data.last_login_province})`}
                    </span>
                    <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                      {`Ostatnia data logowania: ${moment(
                        data.last_login_time
                      ).format("LLLL")}`}
                    </span>
                    {data.is_banned && (
                      <span className="text-center font-mukta text-[11px] text-gray-100">
                        ZBANOWANY
                      </span>
                    )}
                  </>
                )}

                {data.is_admin && (
                  <span className="text-center font-mukta text-[11px] text-red-400">
                    ADMINISTRATOR
                  </span>
                )}
              </div>
            </div>
            <div
              className={`block flex w-1/2 ${
                detail_mode == false && "xl:hidden"
              }`}
            >
              {responsiveButtons(detail_mode)}
            </div>
          </div>
        ) : (
          <div
            className={`flex h-auto w-full flex-row items-center divide-x-2 divide-blue-400 ${
              detail_mode == false && "xl:w-3/10"
            }`}
          >
            <div
              className={`group flex h-full w-full  flex-col items-center justify-center space-y-1 px-2 ${
                detail_mode != false && "py-2"
              }`}
            >
              <span
                className={`text-center font-mukta text-gray-100 ${
                  data?.name_device == undefined
                    ? "text-[11px] xl:text-[15px]"
                    : "text-[11px]"
                }`}
              >
                {`Adres IP: ${data.ip_address}`}
              </span>
              {objects == "ips" &&
                data.ip_address == settings.data.bans.ips.self_ip && (
                  <span className="text-center font-mukta text-[10px] text-green-500 xl:text-[12px]">
                    {informationOwnObiect[objects]}
                  </span>
                )}
              {data?.name_device != undefined && (
                <>
                  <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                    {`Urządzenie: ${data.name_device}`}
                  </span>
                  <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                    {`Ostatnie miejsce logowania: ${data.last_login_city} (${data.last_login_province})`}
                  </span>
                  <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                    {`Ostatnia data logowania: ${moment(
                      data.last_login_time
                    ).format("LLLL")}`}
                  </span>
                  {data.is_banned && (
                    <span className="text-center font-mukta text-[10px] text-gray-100 xl:text-[11px]">
                      ADRES ZBANOWANY
                    </span>
                  )}
                </>
              )}
            </div>
            <div
              className={` ${
                data?.ip_address != settings.data.bans.ips.self_ip &&
                detail_mode != false &&
                "block flex w-1/2"
              }  ${detail_mode == false && "xl:hidden"}`}
            >
              {responsiveButtons(detail_mode)}
            </div>
          </div>
        )}

        {data?.count_reports != undefined && (
          <div
            className={`flex h-[68px] w-full flex-col items-center justify-center divide-y-2 divide-blue-400 lg:h-[86px] xl:h-full ${
              detail_mode == false && "xl:w-7/10"
            }`}
          >
            <div className="flex h-1/4 w-full flex-row  items-center justify-center divide-x-2 divide-blue-400">
              <div className="flex h-full w-[60px] items-center justify-center md:w-1/3">
                <span className="text-center font-mukta text-[10px] text-gray-100 md:text-[13px]">
                  Obiekty:
                </span>
              </div>

              {Object.keys(objectsTypes).map((type, index) => (
                <div
                  className="flex h-full w-1/5 items-center justify-center"
                  key={index}
                >
                  <span className="px-1 text-center font-mukta text-[10px] text-gray-100 md:text-[11px]">
                    {objectsTypes[type]}
                  </span>
                </div>
              ))}
            </div>

            {Object.keys(banTypes).map((type, index) => (
              <div
                className="flex h-1/4 w-full flex-row  items-center justify-center divide-x-2 divide-blue-400"
                key={index}
              >
                <div className="flex h-full w-[60px] items-center justify-center md:w-1/3">
                  <span className="text-center font-mukta text-[10px] text-gray-100 md:text-[13px]">
                    {banTypes[type]}
                  </span>
                </div>

                {Object.keys(objectsTypes).map((objectType, index) => (
                  <div
                    className="flex h-full w-1/5 items-center justify-center"
                    key={index}
                  >
                    <span
                      className={`text-center font-mukta text-[10px] md:text-[13px] ${
                        data[type][objectType] > 0
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }`}
                    >
                      {data[type][objectType]}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div
          className={`hidden w-1/5 ${
            detail_mode == false && "xl:block xl:flex"
          }`}
        >
          {responsiveButtons(detail_mode)}
        </div>
      </div>
    );
  }

  function modalBanActions(category, objects) {
    let title;
    let description;

    if (objects == "users") {
      title = "Wykonaj akcję na użytkowniku";
      description = "Adresy IP powiązane z kontem";
    } else {
      title = "Wykonaj akcję na adresie IP";
      description = "Konta powiązane z adresem IP";
    }

    return (
      <div className="fixed inset-0 z-20 flex h-full w-full items-center justify-center px-3">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>
        <div className="z-30 flex h-auto w-full flex-col items-center justify-center  gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-3/4 xl:w-2/3">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">{title}</span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenModalActions({
                  status: !openModalActions.status,
                  data: null,
                  details: null,
                })
              }
            />
          </div>

          <div className="flex h-auto w-9/10 px-5 xl:w-4/5">
            {renderBans(openModalActions.data, objects, false, "parent")}
          </div>

          <div className="flex h-full w-9/10 flex-col items-center justify-center space-y-1 xl:w-4/5">
            <span className="text-md text-center font-mukta text-white">
              {description}
            </span>

            <Scrollbars
              renderThumbVertical={({ style, props }) => (
                <div
                  {...props}
                  style={{
                    ...style,
                    backgroundColor: "#000",
                    width: "4px",
                    opacity: "0.6",
                  }}
                ></div>
              )}
              style={{ width: "100%", height: 300 }}
            >
              <div className="flex w-full flex-col space-y-6 py-1 px-3">
                {openModalActions.data.details.length > 0 ? (
                  openModalActions.data.details.map((detail) =>
                    renderBans(
                      detail,
                      objects == "users" ? "ips" : "users",
                      false,
                      "child"
                    )
                  )
                ) : (
                  <div className="flex h-[200px] w-full items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 via-gray-600 to-slate-500 drop-shadow-3xl">
                    <span className="px-2 text-center font-mukta text-base text-gray-200 lg:text-xl">
                      {`Wszystkie ${
                        objects == "users" ? "adresy IP" : "konta"
                      } zostały zbanowane bądź usunięte`}
                    </span>
                  </div>
                )}
              </div>
            </Scrollbars>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                setOpenModalActions({
                  status: !openModalActions.status,
                  data: null,
                  details: null,
                });
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  }

  /////////////////////////// OCZEKUJĄCE

  function renderAwaitings(data, objects, dashboard_mode) {
    function renderType(objects) {
      if (objects == "events") {
        return (
          <div className="flex w-full flex-col items-center justify-center space-y-3 divide-y-2 divide-blue-400">
            <div className="flex h-full w-full items-center justify-center">
              <span className="break-anywhere px-2 pt-2 text-center font-mukta text-sm text-gray-100">
                {`Nazwa wydarzenia: ${data.title}`}
              </span>
            </div>
            <div className="flex h-auto w-full items-center justify-center">
              <span className="break-anywhere py-2 px-4 text-center font-mukta text-sm text-gray-100">
                {`Opis wydarzenia: ${data.text}`}
              </span>
            </div>
          </div>
        );
      } else if (objects == "badges") {
        return (
          <div className="flex w-36 grow flex-row items-center justify-center space-x-3 ">
            <div className="flex flex-col items-center space-y-1 py-4 md:space-y-3">
              <img
                src={`${ips_config.BACKEND}${data.image}`}
                className="h-12 w-12 object-cover rounded-full md:h-16 md:w-16"
              ></img>
              <span className="break-anywhere p-2 text-center font-mukta text-sm text-gray-100">
                {data.name}
              </span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex w-full flex-col items-center justify-center divide-y-2 divide-blue-400">
            <div className="flex flex-row divide-x-2 divide-blue-400 w-full">
              <div className="flex h-full w-1/2 items-center justify-center">
                <span className="h-full font-mukta text-sm p-2 text-center text-gray-200">
                  {`Typ biletu: ${data.ticket_type}`}
                </span>
              </div>

              <div className="flex h-full w-1/2 items-center justify-center">
                <span className="h-full font-mukta text-sm p-2 text-center text-gray-200">
                  {`Nazwa wydarzenia: ${data.event_title}`}
                </span>
              </div>
            </div>
            <div className="flex flex-row h-full divide-x-2 divide-blue-400 w-full">
              <div className="flex h-auto w-1/2 items-center justify-center">
                <span className="break-anywhere py-2 px-4 text-center font-mukta text-sm text-gray-100">
                  {`Opis biletu: ${data.ticket_details}`}
                </span>
              </div>
              <div className="flex h-full flex-col w-1/4 items-center justify-center">
                {data.default_price !== data.price && (
                  <span
                    className={`break-anywhere py-1 px-4 text-center font-mukta text-sm text-gray-500`}
                  >
                    {`Pierwsza cena: ${data.default_price} zł`}
                  </span>
                )}
                <span
                  className={`break-anywhere py-1 px-4 text-center font-mukta text-sm text-gray-100`}
                >
                  {`${
                    data.price !== data.new_price
                      ? "Zatwierdzona cena:"
                      : "Cena biletu:"
                  } ${data.price} zł`}
                </span>
                {data.price !== data.new_price && (
                  <span
                    className={`break-anywhere py-1 px-4 text-center font-mukta text-sm text-green-500`}
                  >
                    {`Nowa cena: ${data.new_price} zł`}
                  </span>
                )}
              </div>

              <div className="flex h-auto w-1/4 items-center justify-center">
                <span
                  className={`break-anywhere py-2 px-4 text-center font-mukta text-sm ${
                    data.stripe_id !== "" ? "text-gray-100" : "text-green-500"
                  }`}
                >
                  {data.stripe_id !== ""
                    ? `Kupionych: ${data.reserved_tickets}/${data.quantity}`
                    : `NOWY !`}
                </span>
              </div>
            </div>
          </div>
        );
      }
    }

    function responsiveButtons() {
      return (
        <>
          <Link to={`/event/${data.slug}-${data.uuid}`}>
            <button
              className={`h-auto w-auto rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-1 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 md:h-9 md:w-20 2xl:h-10 2xl:w-28`}
            >
              Przejdź do wydarzenia
            </button>
          </Link>

          {dashboard_mode && (
            <button
              className={`h-auto w-auto rounded-lg bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 p-1 text-center text-[10px] font-medium text-white shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:h-9 md:w-20 2xl:h-10 2xl:w-28`}
              onClick={() => {
                setOpenModalActions({
                  status: true,
                  data: data,
                  details: null,
                });
              }}
            >
              Wykonaj akcję
            </button>
          )}
        </>
      );
    }

    return (
      <div
        className={`flex h-auto w-full items-center justify-center py-1 ${
          objects == "badges" ? "px-2 md:w-1/2" : "pl-1 pr-3"
        }`}
        key={data.id}
      >
        <div className="flex h-full w-full flex-col items-center justify-center divide-y-2 divide-blue-400 rounded-xl border-2 border-blue-400 bg-gray-700">
          <div
            className={`flex h-full w-full flex-row divide-x-2 divide-blue-400   `}
          >
            <div
              className={`group flex flex-col items-center justify-center space-y-1 py-2 ${
                objects == "badges" ? "w-1/4 md:w-1/2 xl:w-1/4" : "w-[100px]"
              }`}
            >
              <Link
                to={`/user/${data.user}`}
                target="_blank"
                className="flex h-10 w-10 justify-center md:h-12 md:w-12"
              >
                <img
                  src={`${ips_config.BACKEND}/media/${data.user_image}`}
                  className="h-10 w-10 rounded-full object-cover transition ease-in-out group-hover:scale-110 md:h-12 md:w-12"
                ></img>
              </Link>
              <Link
                to={`/user/${data.user}`}
                target="_blank"
                className="flex w-auto items-center"
              >
                <span className="text-center font-mukta text-sm text-gray-100">
                  {data.user}
                </span>
              </Link>
              {data.user == user.username && (
                <span className="text-center font-mukta text-[12px] text-green-500">
                  {informationOwnObiect[objects]}
                </span>
              )}
            </div>
            {renderType(objects)}

            <div
              className={`${
                objects == "badges" ? "block flex w-1/3" : "hidden w-auto"
              }   flex-col items-center justify-evenly px-5 md:hidden xl:block xl:flex`}
            >
              {responsiveButtons()}
            </div>
          </div>
          <div
            className={`${
              objects == "badges" ? "hidden md:block md:flex" : "flex"
            }  h-auto w-full flex-row items-center justify-evenly py-2 xl:hidden`}
          >
            {responsiveButtons()}
          </div>
        </div>
      </div>
    );
  }

  function modalAwaitingActions(category, objects) {
    let title;

    if (objects == "events") {
      title = "Wykonaj akcję na wydarzeniu";
    } else if (objects == "badges") {
      title = "Wykonaj akcję na odznace";
    } else {
      title = "Wykonaj akcję na bilecie";
    }

    function renderType(objects) {
      if (objects == "events") {
        return (
          <>
            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-lg">
              {`Nazwa wydarzenia: ${openModalActions.data.title}`}
            </span>

            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-lg">
              {`Opis wydarzenia: ${openModalActions.data.text}`}
            </span>
          </>
        );
      } else if (objects == "badges") {
        return (
          <div className="flex w-36 grow flex-row items-center justify-center space-x-3 ">
            <div className="flex flex-col items-center space-y-3">
              <img
                src={`${ips_config.BACKEND}${openModalActions.data.image}`}
                className="h-32 object-cover w-32 rounded-full"
              ></img>
              <span className="break-anywhere p-2 text-center font-mukta text-base text-gray-100 md:text-lg">
                {openModalActions.data.name}
              </span>
            </div>
          </div>
        );
      } else if (objects == "tickets") {
        return (
          <>
            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-lg">
              {`Nazwa wydarzenia: ${openModalActions.data.event_title}`}
            </span>

            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-lg">
              {`Typ biletu: ${openModalActions.data.ticket_type}`}
            </span>

            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-lg">
              {`Opis biletu: ${openModalActions.data.ticket_details}`}
            </span>

            {openModalActions.data.stripe_id !== "" && (
              <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-lg">
                {`Kupionych: ${openModalActions.data.reserved_tickets}/${openModalActions.data.quantity}`}
              </span>
            )}

            {openModalActions.data.default_price !==
              openModalActions.data.price && (
              <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-500 md:text-lg">
                {`Pierwsza cena: ${openModalActions.data.default_price} zł`}
              </span>
            )}

            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-lg">
              {`${
                openModalActions.data.price !== openModalActions.data.new_price
                  ? "Zatwierdzona cena:"
                  : "Cena biletu:"
              } ${openModalActions.data.price} zł`}
            </span>

            {openModalActions.data.price !==
              openModalActions.data.new_price && (
              <span
                className={`break-anywhere p-2 text-center font-mukta text-[12px] text-green-500 md:text-lg`}
              >
                {`Nowa cena: ${openModalActions.data.new_price} zł`}
              </span>
            )}
          </>
        );
      }
    }

    function ticketStripeIDTicket(data) {
      if (data.stripe_id == "") {
        return (
          <>
            <span className="break-anywhere p-2 text-center font-mukta text-yellow-400 text-base">
              Przed zweryfikowaniem musisz utworzyć nowy bilet w panelu Stripe z
              nazwą określoną poniżej i wygenerować dla niego Stripe Price ID z
              ceną podaną poniżej!
            </span>
            <span className="break-anywhere p-2 text-center font-mukta text-gray-100 text-base">
              {`Stripe ID: ${data.stripe_name_product}`}
            </span>
            <span className="break-anywhere p-2 text-center font-mukta text-gray-100 text-base">
              {`Cena biletu: ${data.new_price} zł`}
            </span>
            <input
              type="text"
              className="h-auto w-[550px] items-center rounded-lg border-2 border-blue-400 bg-transparent font-mukta font-mukta text-white focus:ring-0 text-base"
              placeholder={"Price ID"}
              onChange={(e) =>
                setOpenModalActions({
                  ...openModalActions,
                  details: {
                    ...openModalActions.details,
                    stripe_id: e.target.value,
                  },
                })
              }
              maxLength="30"
            ></input>
          </>
        );
      } else if (data.price !== data.new_price) {
        return (
          <>
            <span className="break-anywhere p-2 text-center font-mukta text-yellow-400 text-base">
              W związku z ustaleniem nowej ceny biletu, musisz odnaleźć bilet w
              panelu Stripe z nazwą określoną poniżej i wygenerować jego nowy
              Stripe Price ID !
            </span>
            <span className="break-anywhere p-2 text-center font-mukta text-gray-100 text-base">
              {`Stripe ID: ${data.stripe_name_product}`}
            </span>
            <span className="break-anywhere p-2 text-center font-mukta text-gray-100 text-base">
              {`Cena biletu: ${data.new_price} zł`}
            </span>
            <input
              type="text"
              className="h-auto w-[550px] rounded-lg border-2 border-blue-400 bg-transparent font-mukta font-mukta text-white focus:ring-0 text-base"
              placeholder={"Price ID"}
              onChange={(e) =>
                setOpenModalActions({
                  ...openModalActions,
                  details: {
                    ...openModalActions.details,
                    stripe_id: e.target.value,
                  },
                })
              }
              maxLength="30"
            ></input>
          </>
        );
        // GDY NASZA CENA ULEGNIE ZMIANIE TO TRZEBA ZAPODAC NOWY STRIPE ID PRODUKTU
      }
    }

    return (
      <div className="fixed inset-0 z-20 flex h-full  w-full items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex h-auto w-4/5 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-3/4 xl:w-2/3">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5 py-1">
            <span className="text-sm text-white lg:text-lg">{title}</span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenModalActions({
                  status: !openModalActions.status,
                  data: null,
                  details: null,
                })
              }
            />
          </div>

          <div className="flex h-auto w-full flex-col items-center justify-center space-y-1 px-5">
            {renderType(objects)}

            {openModalActions.data.verificated_details !== "" &&
              openModalActions.data.verificated_details !== null && (
                <span className="break-anywhere p-2 text-center font-mukta text-[12px]  text-gray-100 md:text-lg">
                  {`Powód niezweryfikowania: ${openModalActions.data.verificated_details}`}
                </span>
              )}

            <div className="flex w-2/3 flex-col items-center">
              {(objects !== "tickets" ||
                openModalActions.data?.was_allowed == false) && (
                <>
                  <textarea
                    className="h-24 w-full resize-none rounded-lg border-2 border-blue-400 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0 md:h-40 md:text-lg"
                    placeholder={"Podaj szczegóły"}
                    onChange={(e) =>
                      setOpenModalActions({
                        ...openModalActions,
                        details: {
                          ...openModalActions.details,
                          details: e.target.value,
                        },
                      })
                    }
                    maxLength="150"
                  ></textarea>
                  <span
                    className={`${
                      openModalActions.details?.details !== undefined &&
                      openModalActions.details?.details?.length > 125
                        ? "text-red-500"
                        : "text-gray-500"
                    } pl-3 pt-1 font-mukta text-sm`}
                  >
                    {`${
                      openModalActions.details?.details?.length !== undefined
                        ? openModalActions.details.details.length
                        : 0
                    } / 150`}
                  </span>

                  <div className="flex w-full flex-row justify-evenly space-x-8">
                    <button
                      className={`h-auto min-h-[38px] w-auto rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-1 px-3 text-center text-[10px] font-medium text-gray-700 shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300`}
                      onClick={() => {
                        dispatch(
                          admin_data_action(
                            openModalActions.data.id,
                            "need_improvement",
                            objects,
                            category,
                            xcsrftoken,
                            openModalActions.data.edit_time,
                            openModalActions.details
                          )
                        );
                      }}
                    >
                      Zmień status na "wymaga zmiany"
                    </button>

                    <button
                      className={`h-auto min-h-[38px] w-auto rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600 py-1 px-3 text-center text-[10px] font-medium text-white shadow-lg shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300`}
                      onClick={() => {
                        dispatch(
                          admin_data_action(
                            openModalActions.data.id,
                            "remove",
                            objects,
                            category,
                            xcsrftoken,
                            openModalActions.data.edit_time,
                            openModalActions.details
                          )
                        );
                      }}
                    >
                      Zmień status na "do usunięcia"
                    </button>
                  </div>

                  <span className="text-center font-mukta text-sm text-white">
                    Lub
                  </span>
                </>
              )}

              {objects == "tickets" &&
                ticketStripeIDTicket(openModalActions.data)}

              <button
                disabled={
                  objects == "tickets" &&
                  openModalActions.details?.stripe_id?.length !== 30
                }
                className={`mt-3 h-10 w-28 rounded-lg bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-1 px-3 text-center text-[10px] font-medium text-white shadow-lg shadow-green-500/10 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:cursor-not-allowed disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800`}
                onClick={() => {
                  if (
                    !(
                      objects == "tickets" &&
                      openModalActions.details?.stripe_id.length !== 30
                    )
                  ) {
                    dispatch(
                      admin_data_action(
                        openModalActions.data.id,
                        "accepted",
                        objects,
                        category,
                        xcsrftoken,
                        openModalActions.data.edit_time,
                        openModalActions.details
                      )
                    );
                  }
                }}
              >
                Zweryfikuj
              </button>
            </div>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                setOpenModalActions({
                  status: !openModalActions.status,
                  data: null,
                  details: null,
                });
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  }

  ///REPORTOWANIE

  function renderReports(data, objects, dashboard_mode) {
    let reportTypes = {
      events: {
        type0: "Naruszenie regulaminu",
        type1: "Dyskryminacja",
        type2: "Fałszywe informacje",
        type3: "Niezgodność z zasadami społeczności",
        type4: "Niewłaściwe zachowanie organizatora",
        type5: "Propagowanie nielegalnych działań",
      },
      comments: {
        type0: "Treści reklamowe lub spam",
        type1: "Materiały erotyczne i pornograficzne",
        type2: "Wykorzystywanie dzieci",
        type3: "Propagowanie terroryzmu",
        type4: "Nękanie lub dokuczanie",
        type5: "Nieprawdziwe informacje",
      },
      badges: {
        type0: "Naruszenie regulaminu",
        type1: "Dyskryminacja",
        type2: "Fałszywe informacje",
        type3: "Niezgodność z zasadami społeczności",
        type4: "Obraźliwa miniaturka",
        type5: "Propagowanie nielegalnych działań",
      },
    };

    function renderType(objects) {
      if (objects == "events") {
        return (
          <div className="flex w-1/2  flex-col items-center justify-center  xl:w-3/4">
            <span className="break-anywhere p-2 text-center font-mukta text-[10px] text-gray-100 xl:text-sm">
              {`Nazwa wydarzenia: ${data.title}`}
            </span>
            <span className="break-anywhere p-2 text-center font-mukta text-[10px] text-gray-100 xl:text-sm">
              {`Stan weryfikacji: ${verificatedTypes[data.verificated]}`}
            </span>
          </div>
        );
      } else if (objects == "badges") {
        return (
          <div className="flex flex-col items-center justify-center md:flex-row md:space-x-3 xl:w-3/4 ">
            <div className="flex h-1/2 w-full shrink-0 flex-row items-center justify-center md:h-1/2 md:w-16 md:flex-col xl:w-24 xl:space-y-2">
              <img
                src={`${ips_config.BACKEND}${data.image}`}
                className="h-8 w-8 shrink-0 object-cover rounded-full md:h-12 md:w-12 xl:h-16 xl:w-16"
              ></img>
              <span className="break-anywhere p-2 text-center font-mukta text-[10px] text-gray-100 xl:text-sm">
                {data.name}
              </span>
            </div>

            <div className="flex h-1/2 w-full items-center justify-center md:h-full">
              <span className="break-anywhere p-2 text-center font-mukta text-[10px] text-gray-100 xl:text-sm">
                {`Stan weryfikacji: ${verificatedTypes[data.verificated]}`}
              </span>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex w-1/2 flex-col items-center justify-center  xl:w-3/4">
            <span className="break-anywhere p-2 text-center font-mukta text-[10px] text-gray-100 xl:text-[12px]">
              {`Tekst komentarza: ${data.text}`}
            </span>
            <span className="break-anywhere p-2 text-center font-mukta text-[10px] text-gray-100 xl:text-[12px]">
              {`Wynik reakcji na komentarz: ${data.score}`}
            </span>
          </div>
        );
      }
    }

    function responsiveButtons() {
      return (
        <>
          <Link to={`/event/${data.slug}-${data.uuid}`}>
            <button
              className={`h-auto w-auto rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 px-1 py-1 text-center text-[9px] font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 md:py-2 md:text-[10px] xl:w-28`}
            >
              Przejdź do wydarzenia
            </button>
          </Link>

          {dashboard_mode && (
            <button
              className={`h-auto w-auto rounded-lg bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 px-1 py-1 text-center text-[9px] font-medium text-white shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:py-2 md:text-[10px] xl:w-28`}
              onClick={() => {
                setOpenModalActions({
                  status: true,
                  data: data,
                  details: null,
                });
              }}
            >
              Wykonaj akcję
            </button>
          )}
        </>
      );
    }

    return (
      <div
        className="flex h-auto w-full flex-col divide-y-2 divide-blue-400 rounded-xl border-2 border-blue-400 bg-gray-700 xl:flex-row xl:divide-y-0 xl:divide-x-2"
        key={data.id}
      >
        <div className="flex h-1/2 w-full flex-row divide-x-2 divide-blue-400 xl:h-full xl:w-[45%]">
          <div className="group flex  w-1/4 flex-col items-center justify-center space-y-1 py-2 sm:w-1/3 xl:w-1/5">
            <Link
              to={`/user/${data.user}`}
              target="_blank"
              className="flex h-9 w-9 justify-center sm:h-10 sm:w-10 xl:h-12 xl:w-12"
            >
              <img
                src={`${ips_config.BACKEND}/media/${data.user_image}`}
                className="h-9 w-9 rounded-full object-cover transition ease-in-out group-hover:scale-110 sm:h-10 sm:w-10 xl:h-12 xl:w-12"
              ></img>
            </Link>
            <Link
              to={`/user/${data.user}`}
              target="_blank"
              className="flex w-auto items-center"
            >
              <span className="text-center font-mukta text-xs text-gray-100 xl:text-sm">
                {data.user}
              </span>
            </Link>
            {data.user == user.username && (
              <span className="px-2 text-center font-mukta text-[10px] text-green-500 xl:text-[12px]">
                {informationOwnObiect[objects]}
              </span>
            )}
          </div>
          {renderType(objects)}
          <div className="flex w-1/3 flex-col  items-center justify-evenly space-y-1 py-1 px-2 sm:w-2/5 sm:py-0 md:px-0 xl:hidden">
            {responsiveButtons()}
          </div>
        </div>

        <div className="flex h-auto w-full flex-row  divide-x-2 divide-blue-400 xl:h-full xl:w-[38%]">
          <div className="flex h-full w-1/6 flex-col items-center justify-center space-y-1 xl:w-1/4">
            <span className="p-1 px-2 text-center font-mukta text-[9px] text-gray-100 sm:text-[10px]">
              Ilość wszystkich zgłoszeń:
            </span>
            <span className="p-1 text-center font-mukta text-xs text-yellow-400 sm:text-sm">
              {data.count_types.all_types}
            </span>
          </div>

          <div className="flex h-full w-5/6 flex-col divide-y-2 divide-blue-400 xl:w-3/4">
            <div className="flex h-1/2 w-full flex-row divide-x-2 divide-blue-400">
              {Object.keys(reportTypes[objects])
                .slice(0, 3)
                .map((type, index) => (
                  <div
                    className="flex h-full w-1/3 flex-col items-center justify-between"
                    key={index}
                  >
                    <span className="h-1/2 p-1 text-center font-mukta text-[9px] text-gray-100 xl:h-2/3 xl:text-[10px]">
                      {reportTypes[objects][type]}
                    </span>
                    <span
                      className={`h-1/2 p-2 text-center font-mukta text-sm md:p-1 xl:h-1/3 ${
                        data.count_types[type] == 0
                          ? "text-gray-500"
                          : "text-yellow-400"
                      }`}
                    >
                      {data.count_types[type]}
                    </span>
                  </div>
                ))}
            </div>

            <div className="flex h-1/2 w-full flex-row divide-x-2 divide-blue-400">
              {Object.keys(reportTypes[objects])
                .slice(3, 6)
                .map((type, index) => (
                  <div
                    className="flex h-full w-1/3 flex-col items-center justify-between"
                    key={index}
                  >
                    <span className="h-1/2 p-1 text-center font-mukta text-[9px] text-gray-100 xl:h-2/3 xl:text-[10px]">
                      {reportTypes[objects][type]}
                    </span>
                    <span
                      className={`h-1/2 p-2 text-center font-mukta text-sm md:p-1 xl:h-1/3 ${
                        data.count_types[type] == 0
                          ? "text-gray-500"
                          : "text-yellow-400"
                      }`}
                    >
                      {data.count_types[type]}
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="hidden w-1/6 flex-col items-center justify-evenly xl:block xl:flex">
          {responsiveButtons()}
        </div>
      </div>
    );
  }

  /// RENDER ZGŁOSZEŃ W REPORTACH

  function renderReporter(data) {
    return (
      <div
        className="flex h-32 w-full flex-row divide-x-2 divide-blue-400 rounded-xl border-2 border-blue-400 bg-gray-700"
        key={data.id}
      >
        <div className="group flex w-[15%] flex-col items-center justify-center space-y-1 sm:w-1/10">
          <Link
            to={`/user/${data.user}`}
            target="_blank"
            className="flex h-8 w-8 justify-center"
          >
            <img
              src={`${ips_config.BACKEND}/media/${data.user_image}`}
              className="h-8 w-8 rounded-full object-cover transition ease-in-out group-hover:scale-110"
            ></img>
          </Link>
          <Link
            to={`/user/${data.user}`}
            target="_blank"
            className="flex w-auto items-center"
          >
            <span className="text-center font-mukta text-[12px] text-gray-100">
              {data.user}
            </span>
          </Link>
          {data.user == user.username && (
            <span className="xm:text-[12px] text-center font-mukta text-[10px] text-green-500">
              Twoje zgłoszenie
            </span>
          )}
        </div>

        <div className="flex w-auto w-[85%] flex-col divide-y-2 divide-blue-400 sm:w-9/10 sm:flex-row sm:divide-y-0 sm:divide-x-2">
          <div className="flex h-1/4 w-full flex-col items-start  justify-center space-y-3 px-4 sm:h-full sm:w-1/5">
            <span className="text-center font-mukta text-[10px] text-gray-100 sm:text-[12px] md:text-sm">
              {`Rodzaj zgłoszenia: ${data.type}`}
            </span>
          </div>
          <div className="flex h-3/4 w-full flex-col items-start justify-between divide-y-2 divide-blue-400 sm:h-full sm:w-4/5">
            <div className="flex h-auto min-h-[32px] w-full flex-row items-center justify-between divide-x-2 divide-blue-400">
              <div className="flex h-full w-1/3 items-center justify-center">
                <span className="h-auto px-1 text-center font-mukta text-[10px] text-gray-100 sm:text-[12px] md:text-[13px]">
                  {`Szczegóły zgłoszenia: `}
                </span>
              </div>

              <div className="flex h-full w-2/3 items-center justify-center">
                <span className=" h-auto px-1 text-center font-mukta text-[10px] text-gray-100 sm:text-[12px] md:text-[13px]">
                  {`Data zgłoszenia: ${moment(data.created_time).format(
                    "LLLL"
                  )}`}
                </span>
              </div>
            </div>

            <div className="flex h-24  w-full">
              {data.details !== "" && data.details !== null ? (
                <span className="break-anywhere p-2 text-start font-mukta text-[10px] text-gray-100 sm:text-[12px]">
                  {data.details}
                </span>
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <div className="flex h-2/3 w-9/10 items-center justify-center rounded-lg bg-gradient-to-br from-gray-600 via-gray-500 to-slate-500 drop-shadow-3xl md:w-2/3">
                    <span className="break-anywhere p-2 text-center font-mukta text-[10px]  text-gray-100 md:text-[12px] lg:text-[13px]">
                      Użytkownik nie zamieścił szczegółów na temat swojego
                      zgłoszenia
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // MODALE DO ZARZĄDZANIA AKCJĄ OBIEKTU

  function modalReportActions(category, objects) {
    let title;

    if (objects == "events") {
      title = "Wykonaj akcję na wydarzeniu";
    } else if (objects == "badges") {
      title = "Wykonaj akcję na odznace";
    } else {
      title = "Wykonaj akcję na komentarzu";
    }

    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center px-3">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:gap-7 2xl:w-2/3">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">{title}</span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenModalActions({
                  status: !openModalActions.status,
                  data: null,
                  details: null,
                })
              }
            />
          </div>
          <div className="flex h-auto w-full px-5 lg:w-4/5">
            {renderReports(openModalActions.data, objects, false)}
          </div>

          <div className="flex h-auto  w-full flex-col space-y-2 px-5 lg:flex-row lg:space-y-0 lg:space-x-4">
            <div className="flex max-h-[165px] w-full flex-col items-center justify-center space-y-1 lg:h-full lg:max-h-[328px] lg:w-2/3">
              <span className="text-center font-mukta text-sm text-white lg:text-base">
                Zgłoszenia na powyższy obiekt
              </span>

              <Scrollbars
                renderThumbVertical={({ style, props }) => (
                  <div
                    {...props}
                    style={{
                      ...style,
                      backgroundColor: "#000",
                      width: "4px",
                      opacity: "0.6",
                    }}
                  ></div>
                )}
                style={{ width: "100%", height: 300 }}
              >
                <div className="flex w-full flex-col space-y-6 py-1 lg:px-3">
                  {openModalActions.data.reported_by.map((reporter) =>
                    renderReporter(reporter)
                  )}
                </div>
              </Scrollbars>
            </div>

            <div className="flex h-full w-full flex-col items-center justify-center space-y-1 lg:w-1/3 lg:space-y-2">
              <span className="text-center font-mukta text-sm text-white lg:text-base">
                Wykonaj akcję
              </span>

              <textarea
                className="h-28 w-full resize-none rounded-lg border-2 border-blue-400 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0 lg:h-40 lg:text-lg"
                placeholder={"Podaj szczegóły"}
                onChange={(e) =>
                  setOpenModalActions({
                    ...openModalActions,
                    details: e.target.value,
                  })
                }
                maxLength="150"
              ></textarea>
              <span
                className={`${
                  openModalActions.details?.length > 125
                    ? "text-red-500"
                    : "text-gray-500"
                } font-mukta text-sm`}
              >
                {`${
                  openModalActions.details?.length !== undefined
                    ? openModalActions.details.length
                    : 0
                } / 150`}
              </span>

              {objects !== "comments" ? (
                <>
                  <div className="flex w-full flex-row justify-evenly space-x-3">
                    <button
                      className={`h-10 w-32 rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-1 px-3 text-center text-[9px] font-medium text-gray-700 shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 lg:text-[10px]`}
                      onClick={() => {
                        dispatch(
                          admin_data_action(
                            openModalActions.data.id,
                            "need_improvement",
                            objects,
                            category,
                            xcsrftoken,
                            openModalActions.data.verificated,
                            openModalActions.details
                          )
                        );
                      }}
                    >
                      Zmień status na "wymaga zmiany"
                    </button>

                    <button
                      className={`h-10 w-28 rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600 py-1 px-3 text-center text-[9px] font-medium text-white shadow-lg shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300 lg:text-[10px]`}
                      onClick={() => {
                        dispatch(
                          admin_data_action(
                            openModalActions.data.id,
                            "remove",
                            objects,
                            category,
                            xcsrftoken,
                            openModalActions.data.verificated,
                            openModalActions.details
                          )
                        );
                      }}
                    >
                      Zmień status na "do usunięcia"
                    </button>
                  </div>

                  <span className="text-center font-mukta text-sm text-white">
                    Lub
                  </span>

                  <button
                    className={`mt-1 h-10 w-28 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-1 px-3 text-center text-[9px] font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 lg:text-[10px]`}
                    onClick={() => {
                      dispatch(
                        admin_data_action(
                          openModalActions.data.id,
                          "cancel",
                          objects,
                          category,
                          xcsrftoken,
                          openModalActions.data.verificated,
                          openModalActions.details
                        )
                      );
                    }}
                  >
                    Usuń wszystkie zgłoszenia
                  </button>
                </>
              ) : (
                <div className="flex w-full flex-row justify-evenly">
                  <button
                    className={`h-10 w-32 rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600 py-1 px-3 text-center text-[9px] font-medium text-white shadow-lg shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300 lg:text-[10px]`}
                    onClick={() =>
                      dispatch(
                        admin_data_action(
                          openModalActions.data.id,
                          "remove",
                          objects,
                          category,
                          xcsrftoken,
                          openModalActions.details
                        )
                      )
                    }
                  >
                    Usuń komentarz
                  </button>
                  <button
                    className={`h-10 w-28 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-1 px-3 text-center text-[9px] font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 lg:text-[10px]`}
                    onClick={() =>
                      dispatch(
                        admin_data_action(
                          openModalActions.data.id,
                          "cancel",
                          objects,
                          category,
                          xcsrftoken
                        )
                      )
                    }
                  >
                    Usuń wszystkie zgłoszenia
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex py-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                setOpenModalActions({
                  status: !openModalActions.status,
                  data: null,
                  details: null,
                });
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  }

  ////// WYPŁATY I ZWROTY

  function renderPaychecks(data, objects, dashboard_mode) {
    function renderType(objects) {
      return (
        <div className="flex w-full flex-col items-center justify-center space-y-3 divide-y-2 divide-blue-400">
          {data.payment_locked_expires !== null && (
            <div className="flex flex-col h-22 w-full items-center justify-center">
              <span className="break-anywhere px-2 pt-2 text-center font-mukta text-sm text-gray-100">
                {data.payment_locked
                  ? `Płatność rozpoczęta przez innego administratora. Gdy nie zostanie sfinalizowana, bramka zostanie otwarta o:`
                  : `Bramka została otwarta przez Ciebie. Czas na opłatę mija o godzinie:`}
              </span>
              <span className="break-anywhere px-2 pt-2 text-center font-mukta text-sm text-gray-100">
                {moment(data.payment_locked_expires).format("LTS")}
              </span>
            </div>
          )}

          <div className="flex h-full w-full items-center justify-center">
            <span className="break-anywhere px-2 pt-2 text-center font-mukta text-sm text-gray-100">
              {`Nazwa wydarzenia: ${data.title}`}
            </span>
          </div>
          <div className="flex flex-row divide-x-2 divide-blue-400 h-auto md:min-h-[40px] w-full items-center justify-center">
            <div className="flex flex-col py-6 w-1/2 h-full items-center justify-center">
              <span className="break-anywhere px-2 text-center font-mukta text-xs md:text-sm text-gray-300">
                {objects == "events"
                  ? `Zarobiona kwota za bilety: ${data.price_before_commission} zł`
                  : `Ilość biletów do zwrócenia: ${data.total_tickets}`}
              </span>

              {objects == "events" && (
                <span className="break-anywhere px-2 text-center font-mukta text-xs md:text-sm text-green-500">
                  {`Zysk dla strony za opłatę serwisową: ${(
                    data.price_before_commission - data.price
                  ).toFixed(2)} zł`}
                </span>
              )}
            </div>

            <div className="flex w-1/2 py-2 h-full items-center justify-center">
              <span className="break-anywhere px-2 text-center font-mukta text-xs md:text-sm text-gray-100">
                {objects == "events"
                  ? `Do wypłaty dla organizatora: ${data.price} zł`
                  : `Do zwrócenia za wszystkie bilety: ${data.price} zł`}
              </span>
            </div>
          </div>
        </div>
      );
    }

    function responsiveButtons() {
      if (data.payment_locked) {
        return (
          <div
            className={`flex h-auto w-auto rounded-lg items-center justify-center bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 p-1 text-center text-[10px] font-medium text-white shadow-lg shadow-gray-500/10 focus:outline-none focus:ring-2 focus:ring-gray-300 md:h-9 md:w-20 2xl:h-10 2xl:w-28`}
          >
            Zablokowane
          </div>
        );
      } else {
        return (
          <button
            className={`h-auto w-auto rounded-lg bg-gradient-to-br from-yellow-600 via-yellow-700 to-yellow-800 p-1 text-center text-[10px] font-medium text-white shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 md:h-9 md:w-20 2xl:h-10 2xl:w-28`}
            onClick={() => {
              setOpenModalActions({
                status: true,
                data: data,
                details: null,
              });
            }}
          >
            Wykonaj akcję
          </button>
        );
      }
    }

    return (
      <div
        className={`flex h-auto w-full items-center justify-center py-1 ${
          objects == "badges" ? "px-2 md:w-1/2" : "pl-1 pr-3"
        }`}
        key={data.id}
      >
        <div
          className={`flex h-full w-full flex-col items-center justify-center divide-y-2 divide-blue-400 rounded-xl border-2 border-blue-400
        ${
          data.payment_locked == false &&
          data.payment_locked_expires == null &&
          "bg-gray-700"
        }
        ${
          data.payment_locked == false &&
          data.payment_locked_expires !== null &&
          "bg-emerald-900"
        }
        ${data.payment_locked && "bg-red-400"}
        
        `}
        >
          <div
            className={`flex h-full w-full flex-row divide-x-2 divide-blue-400   `}
          >
            <div
              className={`group flex flex-col items-center justify-center space-y-1 py-2 w-[100px]`}
            >
              <Link
                to={`/user/${data.user}`}
                target="_blank"
                className="flex h-10 w-10 justify-center md:h-12 md:w-12"
              >
                <img
                  src={`${ips_config.BACKEND}/media/${data.user_image}`}
                  className="h-10 w-10 rounded-full object-cover transition ease-in-out group-hover:scale-110 md:h-12 md:w-12"
                ></img>
              </Link>
              <Link
                to={`/user/${data.user}`}
                target="_blank"
                className="flex w-auto items-center"
              >
                <span className="text-center font-mukta text-sm text-gray-100">
                  {data.user}
                </span>
              </Link>
              {data.user == user.username && (
                <span className="text-center font-mukta text-[12px] text-green-500">
                  {objects == "tickets"
                    ? "Twoje zamówienie"
                    : "Twoje wydarzenie"}
                </span>
              )}
            </div>

            {renderType(objects)}

            <div
              className={`${
                objects == "badges" ? "block flex w-1/3" : "hidden w-auto"
              }   flex-col items-center justify-evenly px-5 md:hidden xl:block xl:flex`}
            >
              <Link to={`/event/${data.slug}-${data.uuid}`}>
                <button
                  className={`h-auto w-auto rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-1 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 md:h-9 md:w-20 2xl:h-10 2xl:w-28`}
                >
                  Przejdź do wydarzenia
                </button>
              </Link>
              {dashboard_mode && responsiveButtons()}
            </div>
          </div>
          <div
            className={`${
              objects == "badges" ? "hidden md:block md:flex" : "flex"
            }  h-auto w-full flex-row items-center justify-evenly py-2 xl:hidden`}
          >
            <Link to={`/event/${data.slug}-${data.uuid}`}>
              <button
                className={`h-auto w-auto rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-1 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 md:h-9 md:w-20 2xl:h-10 2xl:w-28`}
              >
                Przejdź do wydarzenia
              </button>
            </Link>

            {dashboard_mode && responsiveButtons()}
          </div>
        </div>
      </div>
    );
  }

  // MODAL DO WYPŁAT I ZWROTÓW

  function modalPaychecksActions(category, objects) {
    let title;

    if (objects == "events") {
      title = "Wykonaj wypłatę dla organizatora za wydarzenie";
    } else {
      title = "Wykonaj zwrot biletów dla kupującego";
    }

    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center px-3">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:gap-7 2xl:w-2/3">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">{title}</span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenModalActions({
                  status: !openModalActions.status,
                  data: null,
                  details: null,
                })
              }
            />
          </div>

          <div className="flex h-auto w-full px-5 lg:w-4/5">
            {renderPaychecks(openModalActions.data, objects, false)}
          </div>

          <div className="flex flex-row w-full justify-center px-4">
            {objects == "tickets" && (
              <div className="flex flex-col space-y-1 w-full h-full">
                <div className="flex w-full pr-3">
                  <div
                    className={`flex flex-row h-auto w-full flex-row divide-x-2 divide-blue-400 rounded-lg border-2 border-blue-400 bg-gray-800`}
                  >
                    <div className="flex h-full w-1/4 items-center justify-center p-1">
                      <span className="break-anywhere text-center font-mukta text-[12px] text-gray-100">
                        Typ biletu
                      </span>
                    </div>
                    <div className="flex h-full w-1/4 items-center justify-center p-1">
                      <span className="break-anywhere text-center font-mukta text-[12px] text-gray-100">
                        Imię i nazwisko
                      </span>
                    </div>

                    <div className="flex h-full w-1/4 items-center justify-center p-1">
                      <span className="break-anywhere text-center font-mukta text-[12px] text-gray-100">
                        Data urodzenia
                      </span>
                    </div>

                    <div className="flex h-full w-1/4 items-center justify-center p-1">
                      <span className="break-anywhere text-center font-mukta text-[12px] text-gray-100">
                        Cena w momencie zakupu
                      </span>
                    </div>
                  </div>
                </div>

                <Scrollbars
                  renderThumbVertical={({ style, props }) => (
                    <div
                      {...props}
                      style={{
                        ...style,
                        backgroundColor: "#000",
                        width: "4px",
                        opacity: "0.6",
                      }}
                    ></div>
                  )}
                  style={{ width: "100%", height: 350 }}
                >
                  <div className="flex w-full flex-col space-y-2 py-1 w-1/2 pr-3">
                    {openModalActions.data.ticket_details.map(
                      (ticket_detail, detail_key) => (
                        <div
                          className={`flex flex-row h-12 w-full flex-row divide-x-2 divide-blue-400 rounded-xl border-2 border-blue-400 bg-gray-700`}
                          key={detail_key}
                        >
                          <div className="flex h-full w-1/4 items-center justify-center p-2">
                            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-base">
                              {ticket_detail.ticket_type}
                            </span>
                          </div>

                          <div className="flex h-full w-1/4 items-center justify-center p-2">
                            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-base">
                              {`${ticket_detail.first_name} ${ticket_detail.last_name}`}
                            </span>
                          </div>

                          <div className="flex h-full w-1/4 items-center justify-center p-2">
                            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-base">
                              {ticket_detail.date_of_birth}
                            </span>
                          </div>

                          <div className="flex h-full w-1/4 items-center justify-center p-2">
                            <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-base">
                              {`${ticket_detail.price.toFixed(2)} zł`}
                            </span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </Scrollbars>
              </div>
            )}

            {openModalActions.data.payment_locked == false &&
            openModalActions.data.payment_locked_expires == null ? (
              <div className="flex flex-col items-center justify-center w-1/2 space-y-8">
                <button
                  className={`mt-3 h-20 w-34 rounded-lg bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-1 px-3 text-center text-[10px] font-medium text-white shadow-lg shadow-green-500/10 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:cursor-not-allowed disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800`}
                  onClick={() => {
                    if (objects == "tickets") {
                      dispatch(
                        admin_open_gateway_paycheck(
                          openModalActions.data.id,
                          openModalActions.data.user_id,
                          objects,
                          openModalActions.data.all_orderedtickets_ids,
                          openModalActions.data.event_id,
                          xcsrftoken
                        )
                      );
                    } else {
                      dispatch(
                        admin_open_gateway_paycheck(
                          openModalActions.data.id,
                          openModalActions.data.user_id,
                          objects,
                          null,
                          null,
                          xcsrftoken
                        )
                      );
                    }
                  }}
                >
                  Otwórz bramkę z płatnością
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-1/2 space-y-8">
                <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-base">
                  {`Kwota do przelania: ${openModalActions.data.price} zł`}
                </span>

                <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-base">
                  {`Tytuł: ${openModalActions.data.title} ${
                    objects == "tickets" ? "(ZWROT BILETÓW)" : "(ROZLICZENIE)"
                  }`}
                </span>

                {openModalActions.data.payment_information?.bank_number !==
                  undefined && (
                  <span className="break-anywhere p-2 text-center font-mukta text-[12px] text-gray-100 md:text-base">
                    {`Nr konta bankowego: ${openModalActions.data.payment_information.bank_number.replace(
                      /(.{2})(.{2})/g,
                      "$1 $2"
                    )}`}
                  </span>
                )}

                <div className="flex flex-col items-center justify-center space-y-1">
                  <input
                    className="font-mukta ml-20 text-sm text-white lg:text-base"
                    type="file"
                    onChange={(e) => {
                      setOpenModalActions({
                        ...openModalActions,
                        details: e.target.files[0],
                      });
                    }}
                    accept=".pdf"
                  />
                  <span className="h-auto w-full text-center font-mukta text-[11px] text-gray-300">
                    Potwierdzenie przelewu w formacie PDF.
                  </span>
                </div>

                <button
                  disabled={
                    openModalActions.details?.type !== "application/pdf"
                  }
                  className={`mt-3 h-10 w-34 rounded-lg bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-1 px-3 text-center text-[10px] font-medium text-white shadow-lg shadow-green-500/10 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:cursor-not-allowed disabled:from-gray-600 disabled:via-gray-700 disabled:to-gray-800`}
                  onClick={() => {
                    if (openModalActions.details?.type == "application/pdf") {
                      dispatch(
                        admin_data_action(
                          openModalActions.data.id,
                          null,
                          objects,
                          category,
                          xcsrftoken,
                          openModalActions.details,
                          openModalActions.data.payment_information.uuid_gateway
                        )
                      );
                    }
                  }}
                >
                  Potwierdź wykonanie przelewu
                </button>
              </div>
            )}
          </div>

          <div className="flex py-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                setOpenModalActions({
                  status: !openModalActions.status,
                  data: null,
                  details: null,
                });
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ADMIN LOGI

  function renderAdminLog(data) {
    let action_type = {
      confirmation: "Zatwierdzenie",
      deletion: "Usuwanie",
      to_improvement: "Do poprawy",
      clear: "Oczyszczenie z reportów",
      ban_user: "Banowanie użytkownika",
      ban_ip: "Banowanie adresu IP",
      logout: "Wylogowywanie",
      paycheck: "Wypłata środków",
    };

    let content_type = {
      MyUser: "Użytkownik",
      IPAddress: "Adres IP",
      IPAddressValidator: "Uwierzytelniacz",
      Event: "Wydarzenie",
      CommentEvent: "Komentarz",
      Badge: "Odznaka",
      Ticket: "Bilet",
      GatewayPaycheck: "Bramka płatności",
    };

    return (
      <div
        className={`flex h-[73px] w-full flex-row items-center divide-x-2 divide-gray-800 xl:h-20 ${
          data.new ? "bg-slate-500" : "bg-slate-700"
        }`}
        key={data.id}
      >
        <div className="group flex h-full w-20 flex-col items-center justify-center space-y-2">
          <Link
            to={`/user/${data.user}`}
            className="flex h-7 w-7 items-center justify-center sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
          >
            <img
              src={`${ips_config.BACKEND}/media/${data.user_image}`}
              className="h-7 w-7 rounded-full object-cover transition ease-in-out group-hover:scale-110 sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 xl:h-9 xl:w-9"
            ></img>
          </Link>
          <Link to={`/user/${data.user}`} className="flex w-auto items-center">
            <span className="font-mukta text-[11px] text-gray-100 sm:text-[9px]  md:text-[10px]  lg:text-[11px] xl:text-[13px]">
              {data.user}
            </span>
          </Link>
        </div>
        <div className="flex h-full w-1/2 flex-col divide-y-2 divide-gray-800 sm:w-[210px] ">
          <div className="flex h-1/2 w-full items-center justify-center px-2">
            <span className="h-auto text-center font-mukta text-[11px] text-gray-100 sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[14px]">
              {`Akcja: ${action_type[data.action_flag]}`}
            </span>
          </div>
          <div className="flex h-1/2 w-full items-center justify-center px-2">
            <span className="h-auto text-center font-mukta text-[11px] text-gray-100 sm:text-[9px] md:text-[10px] lg:text-[11px] xl:text-[14px]">
              {`Obiekt: ${content_type[data.content_type]}`}
            </span>
          </div>
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center sm:w-[80px]">
          <span className="h-auto text-center font-mukta text-[11px] text-gray-100 sm:text-[8px] md:text-[9px] lg:text-[11px] xl:text-[13px]">
            {moment(data.action_time).format("L")}
          </span>
          <span className="h-auto text-center font-mukta text-[11px] text-gray-100 sm:text-[8px] lg:text-[11px] xl:text-[13px]">
            {moment(data.action_time).format("LTS")}
          </span>
        </div>
      </div>
    );
  }

  function moduleAdminLogs(logs, cursorId, excludedIdsLogs) {
    return logs.data.length > 0 ? (
      <Scrollbars
        renderThumbVertical={({ style, props }) => (
          <div
            {...props}
            style={{
              ...style,
              backgroundColor: "#000",
              width: "4px",
              opacity: "0.6",
            }}
          ></div>
        )}
        renderView={({ style, props }) => (
          <div
            {...props}
            style={{ ...style, backgroundColor: "#1f2937" }}
            id="scrollableDivAdmin"
          ></div>
        )}
      >
        <InfiniteScroll
          dataLength={logs.data.length}
          next={() =>
            dispatch(admin_logs_next(cursorId, excludedIdsLogs, xcsrftoken))
          }
          hasMore={!logs.end_pagination}
          scrollableTarget="scrollableDivAdmin"
        >
          <div
            className={`flex h-auto w-full flex-col items-center divide-y-2 divide-gray-800 overflow-hidden rounded-b-xl sm:rounded-none`}
          >
            {logs.data.map((log) => renderAdminLog(log))}
          </div>
        </InfiniteScroll>
      </Scrollbars>
    ) : (
      <div className="flex h-full w-full items-center justify-center bg-slate-700">
        <span className="h-auto text-center font-mukta text-lg text-gray-100">
          Brak logów
        </span>
      </div>
    );
  }

  return (
    <Dashboard>
      <div
        className={`flex h-full w-full flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-4`}
      >
        {endProvider ? (
          <div className="mt-7 flex h-full w-9/10 flex-col divide-y-2 divide-gray-800 overflow-hidden rounded-2xl sm:flex-row sm:divide-y-0 sm:divide-x-2 lg:w-4/5 ">
            <div className="flex h-3/4 w-full flex-col bg-gray-500 sm:h-full sm:w-7/10 xl:w-3/4">
              <div className="flex h-12 w-full flex-row bg-blue-200">
                {Object.keys(initListCategory).map((category, index) => (
                  <div
                    className={`${
                      activeCategoryList === category
                        ? "bg-gray-500"
                        : "cursor-pointer bg-gray-700 drop-shadow-2xl  hover:bg-gray-800"
                    } flex h-full w-1/3 items-center justify-center p-1`}
                    key={index}
                    onClick={() => {
                      setActiveCategoryList(category);
                    }}
                  >
                    <p className="text-center font-mukta  text-[10px] text-white xl:text-[12px] 2xl:text-[15px]">
                      {initListCategory[category]}
                    </p>
                  </div>
                ))}
              </div>
              {renderCategory(
                activeCategoryList,
                activeObjects[activeCategoryList]
              )}
            </div>

            <div className="flex h-1/4 w-full sm:h-full sm:w-3/10 xl:w-1/4">
              {moduleAdminLogs(logs, cursorId, excludedIdsLogs)}
            </div>
            {openModalActions.status &&
              modalRender(
                activeCategoryList,
                activeObjects[activeCategoryList]
              )}
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

export default DashboardPage;
