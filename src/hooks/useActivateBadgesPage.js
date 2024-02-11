import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ExclamationIcon,
  PencilAltIcon,
  MinusCircleIcon,
  ChevronRightIcon,
  XIcon,
  FlagIcon,
} from "@heroicons/react/solid";
import { badge_report } from "../actions/data";
import { getUserBadges } from "../selectors";
import { Link } from "react-router-dom";
import ips_config from "../ips_config";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function useActivateBadgesPage() {
  const dispatch = useDispatch();
  const userbadges = useSelector(getUserBadges);
  const [showPopup, setShowPopup] = useState({
    status: false,
    state: null,
    details: null,
  });
  const [timeoutId, setTimeoutId] = useState(null);
  const [mousePos, setMousePos] = useState({});
  const [valueInputCode, setValueInputCode] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });
  const [validated, setValidated] = useState(false);
  const inputsRef = useRef([]);

  const [showUsedCodeInfo, setShowUsedCodeInfo] = useState(false);
  const [openModalNewBadge, setOpenModalNewBadge] = useState({
    status: false,
    new_badge: null,
  });

  const [openModalUserMissingBadge, setOpenModalUserMissingBadge] = useState({
    status: false,
    new_badge: null,
    was_activated: null,
  });

  const [openModalUserChangeStatusBadge, setOpenModalUserChangeStatusBadge] =
    useState({
      status: false,
      old_badge: null,
      new_badge: null,
    });

  const [openModalAdminMissingBadge, setOpenModalAdminMissingBadge] = useState({
    status: false,
    new_badge: null,
  });

  const [openModalAdminChangeStatusBadge, setOpenModalAdminChangeStatusBadge] =
    useState({
      status: false,
      old_badge: null,
      new_badge: null,
    });

  const [openModalSameStatus, setOpenModalSameStatus] = useState({
    status: false,
    new_badge: null,
    old_badge: null,
    detected_change: null,
  });

  const [openModalReport, setOpenModalReport] = useState({
    status: false,
    badge: null,
    type: null,
    details: null,
  });

  const [
    openModalBadgeAnotherVerification,
    setOpenModalBadgeAnotherVerification,
  ] = useState(false);

  const [openModalBadgeIsDeleted, setOpenModalBadgeIsDeleted] = useState(false);

  // User dostaje informacje ze odznaka zmienila stan weryfikacji
  useEffect(() => {
    if (userbadges?.catch_another_verification !== undefined) {
      setOpenModalBadgeAnotherVerification(true);
    }
  }, [userbadges?.catch_another_verification]);

  // User i admin dostaje informacje ze odznaka zostala usunieta

  useEffect(() => {
    if (userbadges?.catch_badge_deleted !== undefined) {
      setOpenModalBadgeIsDeleted(true);
    }
  }, [userbadges?.catch_badge_deleted]);

  const reportOptions = {
    1: "Naruszenie regulaminu",
    2: "Dyskryminacja",
    3: "Fałszywe informacje",
    4: "Niezgodność z zasadami społeczności",
    5: "Obraźliwa miniaturka",
    6: "Propagowanie nielegalnych działań",
  };

  const handleValueChange = (e, index) => {
    if (/^[a-zA-Z0-9]*$/.test(e.target.value)) {
      const newValue = e.target.value.toUpperCase();

      setValueInputCode((prevState) => ({
        ...prevState,
        [index]: newValue,
      }));

      if (newValue.length === 4 && index < 4) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  function handleKeyPress(e) {
    const regex = /^[a-zA-Z0-9]*$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  }

  function handlePaste(e, index) {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain");
    const regex = /^[a-zA-Z0-9]*$/;
    if (regex.test(pastedData)) {
      e.target.value = pastedData.toUpperCase();
      setValueInputCode((prevState) => ({
        ...prevState,
        [index]: e.target.value,
      }));
    }
  }

  useEffect(() => {
    let state = Object.values(valueInputCode).every(
      (value) => value.length == 4
    );

    let is_used = userbadges.used_codes?.includes(
      Object.values(valueInputCode)
        .map((obj) => obj)
        .join("-")
    );
    if (is_used) {
      setShowUsedCodeInfo(true);
    } else {
      setShowUsedCodeInfo(false);
    }

    if (state && !is_used) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [valueInputCode]);

  function eventBadgeRender(badge, is_creator) {
    return (
      <div
        className={`flex h-60 w-48 flex-col rounded-lg border-2 border-blue-400 pt-3`}
        key={badge.id}
      >
        <div className="flex h-3/5 w-full items-center justify-center">
          <img
            src={`${ips_config.BACKEND}${badge.image}`}
            className="h-28 w-28 rounded-full object-cover transition ease-in-out hover:scale-110"
          ></img>
        </div>
        <div
          className={`-mt-2 flex h-1/5 w-full items-center justify-center px-2`}
        >
          <span className="break-anywhere h-auto text-center font-mukta text-[13px] text-gray-100">
            {badge.name}
          </span>
        </div>

        <div
          className={`flex h-auto w-full flex-row justify-between px-1 pt-1`}
        >
          {badge?.created_time !== undefined ? (
            <div className="flex h-full w-1/3 flex-col justify-end space-y-1 space-y-1 pb-2">
              <span className="break-anywhere h-auto text-center font-mukta text-[10px] text-gray-100">
                Utworzono:
              </span>
              <span className="break-anywhere h-auto text-center font-mukta text-[11px] text-gray-100">
                {moment(badge.created_time).format("DD.MM.YY")}
              </span>
            </div>
          ) : (
            <div className="flex h-full w-1/3 flex-col justify-end space-y-1 pb-2">
              <span className="break-anywhere h-auto text-center font-mukta text-[10px] text-gray-100">
                Aktywowano:
              </span>
              <span className="break-anywhere h-auto text-center font-mukta text-[11px] text-gray-100">
                {moment(badge.activated_time).format("DD.MM.YY")}
              </span>
            </div>
          )}

          <div className="flex h-full w-auto items-center justify-center">
            {iconInfoRender(badge)}
          </div>
          <div
            className={`flex h-auto w-1/3 flex-col items-end justify-end space-y-2 pb-3  pr-2`}
          >
            {is_creator == false && flagReportRender(badge)}

            <Link
              to={`/event/${badge.slug_event}-${badge.uuid_event}`}
              className="group flex w-fit cursor-pointer flex-row items-center justify-center space-x-1 rounded-lg border-2 border-blue-400 transition  ease-in-out hover:scale-110 hover:border-blue-300"
            >
              <ChevronRightIcon className="h-6 w-6 text-gray-300 transition ease-in-out" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  function flagReportRender(badge) {
    if (badge.verificated == "verificated") {
      return (
        <FlagIcon
          onClick={() => {
            if (badge.my_report == null) {
              setOpenModalReport({
                status: true,
                badge: badge,
                type: null,
                details: null,
              });
            }
          }}
          className={`${
            badge.my_report !== null
              ? "text-gray-400"
              : "cursor-pointer text-red-400"
          } mr-1 h-5 w-5`}
        ></FlagIcon>
      );
    } else {
      return <FlagIcon className="mr-1 h-5 w-5 text-yellow-400" />;
    }
  }

  function iconInfoRender(badge) {
    if (badge.verificated == "awaiting") {
      return (
        <ExclamationIcon
          className="h-5 w-5 text-yellow-300"
          onMouseEnter={() =>
            showDelayedModal(badge.verificated, badge.verificated_details)
          }
          onMouseLeave={hideModal}
        />
      );
    } else if (badge.verificated == "need_improvement") {
      return (
        <PencilAltIcon
          className="h-5 w-5 text-yellow-300"
          onMouseEnter={() =>
            showDelayedModal(badge.verificated, badge.verificated_details)
          }
          onMouseLeave={hideModal}
        />
      );
    } else if (badge.verificated == "rejected") {
      return (
        <MinusCircleIcon
          className="h-5 w-5 text-red-500"
          onMouseEnter={() =>
            showDelayedModal(badge.verificated, badge.verificated_details)
          }
          onMouseLeave={hideModal}
        />
      );
    }
  }

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

  function modalNewBadge() {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Dodano odznakę
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalNewBadge({
                  status: false,
                  new_badge: null,
                });
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Do twojego profilu została dodana nowa odznaka:`}
            </span>
          </div>

          <div className="flex  px-5">
            {eventBadgeRender(openModalNewBadge.new_badge, null)}
          </div>

          <div className="flex flex-col space-y-1 px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Użyty kod
            </span>

            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {openModalNewBadge.new_badge.code}
            </span>
          </div>

          {openModalNewBadge.new_badge.set_main_badge && (
            <div className="flex px-12">
              <span className="text-center font-mukta text-sm text-white lg:text-base">
                {`Jest to jedyna zweryfikowana odznaka, która została aktywowana przez Ciebie. Automatycznie została dodana ona jako Twoja główna odznaka i będzie widoczna po wejściu na Twój profil. Jeżeli chcesz zmienić swoją główną odznakę na inną aktywowaną, która jest zweryfikowana, możesz to zrobić z poziomu Ustawień -> Edycja profilu. Jako głównej odznaki nie możesz ustawić tej, którą stworzyłeś.`}
              </span>
            </div>
          )}

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              setOpenModalNewBadge({
                status: false,
                new_badge: null,
              });
            }}
          >
            <span className="text-center font-mukta text-[12px]">Zamknij</span>
          </button>
        </div>
      </div>
    );
  }

  function modalUserMissingBadge() {
    let title_activated_status;
    let description_activated_status;
    let description_new_status;
    let end_new_status;
    let used_code;

    if (openModalUserMissingBadge.was_activated) {
      title_activated_status = "Znaleziono wcześniej aktywowaną odznakę";
      description_activated_status = "Już próbowałeś aktywować tą odznakę";
      used_code = "nie został zużyty i dalej jest aktualny";
    } else {
      title_activated_status = "Wystąpił błąd podczas aktywowania odznaki";
      description_activated_status = "Próbujesz aktywować odznakę";
      used_code = "został zużyty";
    }

    if (openModalUserMissingBadge.new_badge.verificated == "verificated") {
      description_new_status = "która właśnie została zweryfikowana";
      end_new_status = "Odznaka od teraz jest widoczna na Twoim profilu";
    } else if (openModalUserMissingBadge.new_badge.verificated == "rejected") {
      description_new_status = "lecz na chwilę obecną jest usunięta";
      end_new_status =
        "Zostaniesz poinformowany, gdy odznaka wróci jako zweryfikowana";
    } else {
      description_new_status = "lecz na chwilę obecną przechodzi weryfikację";
      end_new_status =
        "Zostaniesz poinformowany, gdy odznaka wróci jako zweryfikowana";
    }

    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              {`${title_activated_status}`}
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalUserMissingBadge({
                  status: false,
                  new_badge: null,
                  was_activated: null,
                });
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`${description_activated_status}, ${description_new_status}. Jest to odznaka przypisana do wydarzenia "${openModalUserMissingBadge.new_badge.title_event}".`}
            </span>
          </div>

          <div className="flex  px-5">
            {openModalUserMissingBadge.new_badge?.name !== undefined &&
              eventBadgeRender(openModalUserMissingBadge.new_badge, null)}
          </div>

          <div className="flex flex-col space-y-1 px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Użyty kod
            </span>

            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {openModalUserMissingBadge.new_badge.code}
            </span>
          </div>

          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`${end_new_status}, a kod ${used_code}.`}
            </span>
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              setOpenModalUserMissingBadge({
                status: false,
                new_badge: null,
                was_activated: null,
              });
            }}
          >
            <span className="text-center font-mukta text-[12px]">Zamknij</span>
          </button>
        </div>
      </div>
    );
  }

  function modalUserChangeStatusBadge() {
    let description_new_status;

    if (openModalUserChangeStatusBadge.new_badge.verificated == "rejected") {
      description_new_status = `"usunięta"`;
    } else if (
      openModalUserChangeStatusBadge.new_badge.verificated == "need_improvement"
    ) {
      description_new_status = `"wymaga zmian"`;
    } else {
      description_new_status = `"oczekująca"`;
    }

    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Znaleziono zmianę statusu twojej odznaki
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalUserChangeStatusBadge({
                  status: false,
                  old_badge: null,
                  new_badge: null,
                });
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Próbujesz dodać do profilu odznakę, którą aktualnie masz już w swoim profilu, ale zmieniła swój status na ${description_new_status}. Jest to odznaka przypisana do wydarzenia "${openModalUserChangeStatusBadge.new_badge.title_event}".`}
            </span>
          </div>

          <div className="flex  px-5">
            {eventBadgeRender(openModalUserChangeStatusBadge.old_badge, null)}
          </div>

          <div className="flex flex-col space-y-1 px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Użyty kod
            </span>

            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {openModalUserChangeStatusBadge.new_badge.code}
            </span>
          </div>

          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Zostaniesz poinformowany, gdy odznaka wróci jako zweryfikowana, a
              kod nie został zużyty i dalej jest aktualny.
            </span>
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              setOpenModalUserChangeStatusBadge({
                status: false,
                old_badge: null,
                new_badge: null,
              });
            }}
          >
            <span className="text-center font-mukta text-[12px]">Zamknij</span>
          </button>
        </div>
      </div>
    );
  }

  function modalAdminMissingBadge() {
    let description_new_status;

    if (openModalAdminMissingBadge.new_badge.verificated == "rejected") {
      description_new_status = `"usunięta"`;
    } else if (openModalAdminMissingBadge.new_badge.verificated == "awaiting") {
      description_new_status = `"oczekująca"`;
    } else {
      description_new_status = `"wymaga zmian"`;
    }

    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Znaleziono niezweryfikowaną odznakę
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalAdminMissingBadge({
                  status: false,
                  new_badge: null,
                });
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Próbujesz dodać do profilu odznakę, która ma status ${description_new_status}, lecz jako administrator masz prawo widzieć tę odznakę już teraz. Jest to odznaka przypisana do wydarzenia "${openModalAdminMissingBadge.new_badge.title_event}".`}
            </span>
          </div>

          <div className="flex  px-5">
            {eventBadgeRender(openModalAdminMissingBadge.new_badge, null)}
          </div>

          <div className="flex flex-col space-y-1 px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Użyty kod
            </span>

            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {openModalAdminMissingBadge.new_badge.code}
            </span>
          </div>

          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Kod został zużyty.
            </span>
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              setOpenModalAdminMissingBadge({
                status: false,
                new_badge: null,
              });
            }}
          >
            <span className="text-center font-mukta text-[12px]">Zamknij</span>
          </button>
        </div>
      </div>
    );
  }

  function modalAdminChangeStatusBadge() {
    let description_old_status;
    let description_new_status;

    if (
      openModalAdminChangeStatusBadge.old_badge.verificated == "verificated"
    ) {
      description_old_status = `"zweryfikowana"`;
    } else if (
      openModalAdminChangeStatusBadge.old_badge.verificated == "rejected"
    ) {
      description_old_status = `"usunięta"`;
    } else if (
      openModalAdminChangeStatusBadge.old_badge.verificated ==
      "need_improvement"
    ) {
      description_old_status = `"wymaga zmian"`;
    } else {
      description_old_status = `"oczekująca"`;
    }

    if (
      openModalAdminChangeStatusBadge.new_badge.verificated == "verificated"
    ) {
      description_new_status = `"zweryfikowana"`;
    } else if (
      openModalAdminChangeStatusBadge.new_badge.verificated == "rejected"
    ) {
      description_new_status = `"usunięta"`;
    } else if (
      openModalAdminChangeStatusBadge.new_badge.verificated ==
      "need_improvement"
    ) {
      description_new_status = `"wymaga zmian"`;
    } else {
      description_new_status = `"oczekująca"`;
    }

    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Znaleziono zmianę statusu twojej odznaki
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalAdminChangeStatusBadge({
                  status: false,
                  old_badge: null,
                  new_badge: null,
                });
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Próbujesz dodać do profilu odznakę, którą aktualnie masz już w swoim profilu, ale zmieniła swój stan z ${description_old_status} na ${description_new_status}.  Jest to odznaka przypisana do wydarzenia "${openModalAdminChangeStatusBadge.new_badge.title_event}".`}
            </span>
          </div>

          <div className="flex w-full flex-row items-center justify-center  space-x-3  px-5">
            {eventBadgeRender(openModalAdminChangeStatusBadge.old_badge, null)}
            <ChevronRightIcon className="h-6 w-6 text-gray-300" />
            {eventBadgeRender(openModalAdminChangeStatusBadge.new_badge, null)}
          </div>

          <div className="flex flex-col space-y-1 px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Użyty kod
            </span>

            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {openModalAdminChangeStatusBadge.new_badge.code}
            </span>
          </div>

          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Kod dalej jest aktualny, więc możesz podzielić się nim ze swoim
              znajomym.
            </span>
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              setOpenModalAdminChangeStatusBadge({
                status: false,
                old_badge: null,
                new_badge: null,
              });
            }}
          >
            <span className="text-center font-mukta text-[12px]">Zamknij</span>
          </button>
        </div>
      </div>
    );
  }

  function modalSameStatus() {
    let title_status;
    if (openModalSameStatus.new_badge.verificated == "verificated") {
      title_status = "Znaleziono posiadaną odznakę";
    } else {
      title_status = "Znaleziono posiadaną niezweryfikowaną odznakę";
    }

    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              {title_status}
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalSameStatus({
                  status: false,
                  new_badge: null,
                  old_badge: null,
                  detected_change: null,
                });
              }}
            />
          </div>
          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {`Próbujesz dodać do profilu odznakę, którą aktualnie masz już w swoim profilu${
                openModalSameStatus.detected_change
                  ? ", ale wykryto pewne zmiany w odznacę"
                  : ""
              }. Jest to odznaka przypisana do wydarzenia "${
                openModalSameStatus.new_badge.title_event
              }"`}
            </span>
          </div>

          {openModalSameStatus.detected_change ? (
            <div className="flex w-full flex-row items-center justify-center  space-x-3  px-5">
              {eventBadgeRender(openModalSameStatus.old_badge, null)}
              <ChevronRightIcon className="h-6 w-6 text-gray-300" />
              {eventBadgeRender(openModalSameStatus.new_badge, null)}
            </div>
          ) : (
            <div className="flex  px-5">
              {eventBadgeRender(openModalSameStatus.new_badge, null)}
            </div>
          )}

          <div className="flex flex-col space-y-1 px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Użyty kod
            </span>

            <span className="text-center font-mukta text-sm text-white lg:text-base">
              {openModalSameStatus.new_badge.code}
            </span>
          </div>

          <div className="flex px-8">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Kod dalej jest aktualny, więc możesz podzielić się nim ze swoim
              znajomym.
            </span>
          </div>

          <button
            type="submit"
            value="Submit"
            className={`h-[33px] w-[120px] items-center justify-center rounded-full bg-gradient-to-r from-red-500 via-red-400 to-red-400 py-1 px-4 text-sm text-white hover:bg-gradient-to-bl focus:outline-none focus:ring-2 focus:ring-red-300`}
            onClick={() => {
              setOpenModalSameStatus({
                status: false,
                new_badge: null,
                old_badge: null,
                detected_change: null,
              });
            }}
          >
            <span className="text-center font-mukta text-[12px]">Zamknij</span>
          </button>
        </div>
      </div>
    );
  }

  function modalReport(xcsrftoken) {
    return (
      <div className="fixed inset-0 z-30 flex items-center justify-center px-2">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[650px] flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pt-6 pb-6 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Zgłaszanie odznaki
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalReport({
                  status: false,
                  badge: null,
                  type: null,
                  details: null,
                });
              }}
            />
          </div>
          <div className="flex max-h-[50vh] flex-col items-center space-y-6 overflow-y-auto">
            <div className="flex  px-5">
              {eventBadgeRender(openModalReport.badge, null)}
            </div>
            <div className="flex items-center pl-8">
              <span className="font-mukta text-sm text-white lg:text-base">
                Aby zgłosić powyższą odznakę, wybierz jedną z możliwych
                kategorii oraz opcjonalnie opisz dokładniej sytuację
              </span>
            </div>

            <div className="flex flex-col space-y-4">
              {Object.entries(reportOptions).map(([key, value]) => (
                <div className="flex flex-row items-center space-x-2" key={key}>
                  <input
                    type="radio"
                    name="report"
                    value={value}
                    onChange={(e) =>
                      setOpenModalReport({
                        ...openModalReport,
                        type: e.target.value,
                      })
                    }
                  ></input>

                  <label className="font-mukta text-sm text-gray-300 lg:text-base ">
                    {value}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex h-auto w-2/3 flex-col space-y-1">
              <textarea
                className="max-h-80 w-full resize-none rounded-lg border-2 border-gray-500 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0 lg:text-base"
                placeholder="Opcjonalnie dodaj komentarz do swojego zgłoszenia wydarzenia"
                onChange={(e) =>
                  setOpenModalReport({
                    ...openModalReport,
                    details: e.target.value,
                  })
                }
                maxLength="150"
              ></textarea>
              <div className="flex justify-end">
                <span
                  className={`${
                    openModalReport?.details?.length > 125
                      ? "text-red-500"
                      : "text-gray-500"
                  } font-mukta text-sm`}
                >
                  {`${
                    openModalReport?.details !== null
                      ? openModalReport?.details?.length
                      : 0
                  } / 150`}
                </span>
              </div>
            </div>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              disabled={openModalReport.type == null}
              onClick={() => {
                dispatch(
                  badge_report(
                    openModalReport.badge.id,
                    openModalReport.type,
                    openModalReport.details,
                    xcsrftoken
                  )
                );
                setOpenModalReport({
                  status: false,
                  badge: null,
                  type: null,
                  details: null,
                });
              }}
            >
              Zgłoś
            </button>
          </div>
        </div>
      </div>
    );
  }

  function modalBadgeChangeVerification() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-1/4">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Odznaka zmieniła stan weryfikacji
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalBadgeAnotherVerification(false);
              }}
            />
          </div>
          <div className="flex px-4">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Podczas próby zreportowania odznaki, zmieniła ona stan
              weryfikacji. Do momentu pozytywnego rozpatrzenia przez
              administratorów, zostanie Ci ona odebrana. W momencie
              przywrócenia, dostaniesz odpowiednie powiadomienie o tym
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              onClick={() => {
                setOpenModalBadgeAnotherVerification(false);
              }}
            >
              Zrozumiałem
            </button>
          </div>
        </div>
      </div>
    );
  }

  function modalBadgeIsDeleted() {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:w-1/4">
          <div className="flex w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-base text-white lg:text-lg">
              Odznaka została usunięta
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => {
                setOpenModalBadgeIsDeleted(false);
              }}
            />
          </div>
          <div className="flex px-4">
            <span className="text-center font-mukta text-sm text-white lg:text-base">
              Podczas próby zreportowania odznaki, została ona usunięta.
              Zostanie ona odebrana każdemu, kto ją odblokował.
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              onClick={() => {
                setOpenModalBadgeIsDeleted(false);
              }}
            >
              Zrozumiałem
            </button>
          </div>
        </div>
      </div>
    );
  }

  return [
    valueInputCode,
    setValueInputCode,
    openModalNewBadge,
    setOpenModalNewBadge,
    openModalUserMissingBadge,
    setOpenModalUserMissingBadge,
    openModalUserChangeStatusBadge,
    setOpenModalUserChangeStatusBadge,
    openModalAdminMissingBadge,
    setOpenModalAdminMissingBadge,
    openModalAdminChangeStatusBadge,
    setOpenModalAdminChangeStatusBadge,
    openModalSameStatus,
    setOpenModalSameStatus,
    openModalReport,
    openModalBadgeAnotherVerification,
    openModalBadgeIsDeleted,
    modalBadgeChangeVerification,
    modalBadgeIsDeleted,
    validated,
    modalPopup,
    modalNewBadge,
    modalUserMissingBadge,
    modalUserChangeStatusBadge,
    modalAdminMissingBadge,
    modalAdminChangeStatusBadge,
    modalSameStatus,
    modalReport,
    handleValueChange,
    handleKeyPress,
    handlePaste,
    inputsRef,
    showPopup,
    eventBadgeRender,
    showUsedCodeInfo,
  ];
}
export default useActivateBadgesPage;
