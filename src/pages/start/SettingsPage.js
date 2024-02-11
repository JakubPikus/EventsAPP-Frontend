import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useSelector, useDispatch } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { getXCSRFToken } from "../../selectors";
import { data_cities } from "../../actions/auth";
import useSettingsPage from "../../hooks/useSettingsPage";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function SettingsPage({
  user,
  provinces,
  checkLocalization,
  settings,
  endProvider,
}) {
  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);

  const [
    renderCategory,
    updateCheckLocalization,
    setUpdateCheckLocalization,
    formUser,
    setFormUser,
    formErrorEditStill,
    openModalLogoutAll,
    setOpenModalLogoutAll,
    modalLogoutAll,
    openModalDeleteAcount,
    modalDeleteAccount,
    checkNewLocalization,
  ] = useSettingsPage();

  const [activeCategoryList, setActiveCategoryList] = useState("manage");

  let initListCategory = {
    manage: "Zarządzaj kontem",
    edit: "Edytuj profil",
    security: "Bezpieczeństwo",
  };

  useEffect(() => {
    if (
      settings?.ip_validators !== undefined &&
      settings.ip_validators.other.length == 0 &&
      endProvider == true
    ) {
      setOpenModalLogoutAll(false);
    }
  }, [settings?.ip_validators?.other]);

  useEffect(() => {
    if (endProvider) {
      // GDY WOJEWODZTWO ZOSTANIE ZMIENIONE RECZNIE, A NIE ZA POMOCA AUTO CHECK LOCALIZATION
      if (updateCheckLocalization == false) {
        formErrorEditStill("city");
        setFormUser({ ...formUser, city: "Brak" });
      } else {
        setUpdateCheckLocalization(false);
      }

      let province_filtred = provinces.find(
        (province) => province.name == formUser.province
      );
      dispatch(data_cities(xcsrftoken, province_filtred.id));
    }
  }, [formUser.province]);

  return (
    <Dashboard>
      <div
        className={` flex w-full grow flex-col items-center overflow-y-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-4`}
      >
        {endProvider ? (
          <div className="flex h-full w-full flex-col space-y-3 px-3 pt-12 sm:px-3 md:w-4/5 md:px-0">
            <span className="h-auto text-center font-mukta text-lg text-gray-100  md:text-start md:text-2xl">
              Ustawienia
            </span>
            {checkNewLocalization(checkLocalization, xcsrftoken)}
            <div className="flex h-full w-full items-center justify-center">
              <div className="-mt-20 flex h-4/5 w-full flex-col overflow-hidden rounded-xl lg:w-9/10 xl:w-4/5 2xl:w-3/5">
                <div className="flex h-12 w-full shrink-0 flex-row bg-blue-200">
                  {Object.keys(initListCategory).map((category, index) => (
                    <div
                      className={`${
                        activeCategoryList === category
                          ? "bg-gray-600"
                          : "cursor-pointer bg-gray-700 drop-shadow-2xl  hover:bg-gray-800"
                      } flex h-full w-1/3 items-center justify-center px-2 text-xs md:text-base`}
                      key={index}
                      onClick={() => {
                        setActiveCategoryList(category);
                      }}
                    >
                      <p className="text-md text-center font-mukta text-white">
                        {initListCategory[category]}
                      </p>
                    </div>
                  ))}
                </div>
                {renderCategory(activeCategoryList, user)}
              </div>
            </div>
            {openModalLogoutAll && modalLogoutAll()}
            {openModalDeleteAcount && modalDeleteAccount()}
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

export default SettingsPage;
