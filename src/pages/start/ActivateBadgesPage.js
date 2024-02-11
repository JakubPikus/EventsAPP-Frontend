import React, { useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { badge_activate } from "../../actions/data";
import { getXCSRFToken } from "../../selectors";
import useActivateBadgesPage from "../../hooks/useActivateBadgesPage";

function ActivateBadgesPage({ endProvider, badges }) {
  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);
  const [
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
  ] = useActivateBadgesPage();

  useEffect(() => {
    // USEEFFECT OD POMYSLNEGO ODBLOKOWANIA ODZNAKI
    if (endProvider == true) {
      for (let i = 0; i < 5; i++) {
        const inputElement = document.getElementById(`InputcodeActive${i}`);
        if (inputElement) {
          inputElement.value = "";
        }
      }

      setOpenModalNewBadge({
        status: true,
        new_badge: badges.new_badge,
      });

      setValueInputCode({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
      });
    }
  }, [badges.new_badge]);

  useEffect(() => {
    if (endProvider == true) {
      // CZYSZCZENIE INPUTU
      for (let i = 0; i < 5; i++) {
        const inputElement = document.getElementById(`InputcodeActive${i}`);
        if (inputElement) {
          inputElement.value = "";
        }
      }

      switch (badges.not_valid_code_badge.modal_option_frontend?.mode) {
        case "user_not_reducer":
          setOpenModalUserMissingBadge({
            status: true,
            new_badge: badges.not_valid_code_badge.badge,
            was_activated:
              badges.not_valid_code_badge.modal_option_frontend.was_activated,
          });

          break;

        case "user_in_reducer":
          setOpenModalUserChangeStatusBadge({
            status: true,
            old_badge:
              badges.not_valid_code_badge.modal_option_frontend.old_badge,
            new_badge: badges.not_valid_code_badge.badge,
          });

          break;

        case "admin_not_reducer":
          setOpenModalAdminMissingBadge({
            status: true,
            new_badge: badges.not_valid_code_badge.badge,
          });

          break;

        case "admin_in_reducer":
          setOpenModalAdminChangeStatusBadge({
            status: true,
            old_badge:
              badges.not_valid_code_badge.modal_option_frontend.old_badge,
            new_badge: badges.not_valid_code_badge.badge,
          });

          break;

        case "normal_in_reducer":
          setOpenModalSameStatus({
            status: true,
            new_badge: badges.not_valid_code_badge.badge,
            old_badge:
              badges.not_valid_code_badge.modal_option_frontend.old_badge,
            detected_change:
              badges.not_valid_code_badge.modal_option_frontend.detected_change,
          });

          break;

        default:
          break;
      }

      setValueInputCode({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
      });
    }
  }, [badges.not_valid_code_badge.badge?.code]); // tutaj trzeba dodać kod, bo przy dwukrotym odblokowaniu tej samej odznaki z roznymi kodami, nie bedzie sie aktywowalo bo odznaka nie bedzie sie zmieniac

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center overflow-x-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-4`}
      >
        {endProvider ? (
          <div className="flex h-full w-9/10 flex-col space-y-6 pt-12 lg:w-4/5">
            <span className="h-auto text-center font-mukta text-xl text-gray-100 md:text-start md:text-3xl">
              Dodaj odznakę do swojego profilu
            </span>
            <div className="flex flex-col items-center">
              <form
                className="flex flex-col justify-center space-y-5 pt-8 md:flex-row md:space-y-0 md:space-x-12"
                onSubmit={(e) => {
                  e.preventDefault();

                  if (validated == true) {
                    dispatch(badge_activate(valueInputCode, xcsrftoken));
                  }
                }}
              >
                <div className="flex flex-row items-center justify-center gap-2 md:gap-3 xs:gap-1">
                  {Array.from({ length: 5 }, (_, index) => (
                    <React.Fragment key={index}>
                      <input
                        type="text"
                        id={`InputcodeActive${index}`}
                        pattern="^[a-zA-Z0-9]*$"
                        name={index}
                        value={valueInputCode.index}
                        onChange={(e) => handleValueChange(e, index)}
                        onKeyPress={(e) => handleKeyPress(e)}
                        onPaste={(e) => handlePaste(e, index)}
                        ref={(el) => (inputsRef.current[index] = el)}
                        placeholder=""
                        maxLength={4}
                        className="w-14 rounded-md border-2 border-blue-400 bg-transparent text-center font-mukta text-xs uppercase text-white focus:ring-0 md:w-16 md:text-sm lg:w-20 lg:text-lg xs:w-12 xs:text-[10px]"
                      ></input>
                      {index !== 4 && (
                        <p className="text-md font-mukta font-bold text-gray-100">
                          -
                        </p>
                      )}
                    </React.Fragment>
                  ))}
                </div>

                <button
                  disabled={!validated}
                  type="submit"
                  className="rounded-md bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 px-20 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-0 focus:ring-sky-800 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-gray-300 disabled:shadow-none md:px-5"
                >
                  <p className="font-mukta text-sm font-bold">Aktywuj</p>
                </button>
              </form>
              <div className="flex h-8 w-[650px] items-center  justify-center">
                {showUsedCodeInfo && (
                  <span className="h-auto text-center font-mukta text-sm text-red-400">
                    Podany kod został już przez Ciebie użyty.
                  </span>
                )}
              </div>
            </div>
            {badges.created_badges?.length > 0 ||
            badges.activated_badges?.length > 0 ? (
              <div className="flex flex-col space-y-8 divide-y-2 divide-blue-400">
                {badges.created_badges?.length > 0 && (
                  <div className="flex flex-col space-y-12 px-3">
                    <span className="h-auto text-center font-mukta text-base text-gray-100  md:text-start md:text-2xl">
                      Utworzone odznaki
                    </span>

                    <div className="flex h-auto flex-grow flex-wrap justify-evenly gap-3 rounded-lg border-2 border-blue-400 p-3">
                      {badges.created_badges.map((badge) =>
                        eventBadgeRender(badge, true)
                      )}
                    </div>
                  </div>
                )}

                {badges.activated_badges?.length > 0 && (
                  <div
                    className={`flex flex-col space-y-12 px-3 ${
                      badges.created_badges?.length && "pt-8"
                    } pb-4`}
                  >
                    <span className="h-auto text-center font-mukta text-base text-gray-100  md:text-start md:text-2xl">
                      Aktywowane odznaki
                    </span>
                    <div className="flex h-auto flex-grow flex-wrap justify-evenly gap-3 rounded-lg border-2 border-blue-400 p-3">
                      {badges.activated_badges.map((badge) =>
                        eventBadgeRender(badge, false)
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-auto w-full items-center justify-center pt-16">
                <div className="flex h-[200px] w-[820px] items-center rounded-lg bg-gradient-to-br from-gray-600 via-gray-600 to-slate-500 px-3 drop-shadow-3xl">
                  <span className="text-center font-mukta text-xl text-gray-200">
                    Nie została znaleziona żadna utworzona odznaka, ani żadna
                    aktywna odznaka odblokowana przez twoje konto. Możliwe, że
                    wszystkie twoje aktywowane odznaki zostały usunięte lub
                    podjęte weryfikacji, dlatego znikły one z Twojego profilu do
                    momentu przywrócenia ich. Utwórz nową odznakę lub aktywuj
                    obcą odznakę kodem wypełniając formularz powyżej.
                  </span>
                </div>
              </div>
            )}

            {openModalBadgeAnotherVerification &&
              modalBadgeChangeVerification()}
            {openModalBadgeIsDeleted && modalBadgeIsDeleted()}
            {showPopup.status && modalPopup()}
            {openModalNewBadge.status && modalNewBadge()}
            {openModalUserMissingBadge.status && modalUserMissingBadge()}
            {openModalUserChangeStatusBadge.status &&
              modalUserChangeStatusBadge()}
            {openModalAdminMissingBadge.status && modalAdminMissingBadge()}
            {openModalAdminChangeStatusBadge.status &&
              modalAdminChangeStatusBadge()}
            {openModalSameStatus.status && modalSameStatus()}
            {openModalReport.status && modalReport(xcsrftoken)}
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

export default ActivateBadgesPage;
