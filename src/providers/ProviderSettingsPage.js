import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CLEAR_CITIES } from "../actions/types";

import {
  check_localization,
  user_validators,
  user_blocked_users,
  badges_settings,
  bank_number,
} from "../actions/data";
import { data_province, data_cities } from "../actions/auth";

import {
  getCities,
  getCheckLocalization,
  getXCSRFToken,
  getProvinces,
  getUser,
  getSettings,
} from "../selectors";

function ProviderSettingsPage({ children }) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const cities = useSelector(getCities);
  const provinces = useSelector(getProvinces);
  const checkLocalization = useSelector(getCheckLocalization);
  const settings = useSelector(getSettings);
  const xcsrftoken = useSelector(getXCSRFToken);

  const [checkProvinces, setCheckProvinces] = useState(false);
  const [endProvider, setEndProvider] = useState(false);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }

    dispatch(user_validators());
  }, []);

  useEffect(() => {
    if (
      settings?.ip_validators !== null &&
      settings?.ip_validators !== undefined
    ) {
      checkGeolocation();
      if (provinces == null) {
        dispatch(data_province());
      }
      setCheckProvinces(true);
    }
  }, [settings?.ip_validators]);

  useEffect(() => {
    if (
      checkLocalization !== null &&
      provinces !== null &&
      checkProvinces == true
    ) {
      let province_filtred = provinces.find(
        (province) => province.name == user.city.county.province.name
      );

      dispatch(data_cities(xcsrftoken, province_filtred.id));
    }
  }, [checkLocalization, provinces]);

  useEffect(() => {
    if (
      cities !== undefined &&
      cities !== null &&
      checkProvinces == true &&
      endProvider == false
    ) {
      dispatch(user_blocked_users());
    }
  }, [cities]);

  useEffect(() => {
    if (settings?.blocked_users !== undefined && endProvider == false) {
      dispatch(badges_settings());
    }
  }, [settings?.blocked_users]);

  useEffect(() => {
    if (settings?.badges !== undefined) {
      dispatch(bank_number());
    }
  }, [settings?.badges]);

  useEffect(() => {
    if (settings?.bank_number !== undefined) {
      setEndProvider(true);
    }
  }, [settings?.bank_number]);

  function checkGeolocation() {
    navigator.geolocation.getCurrentPosition(checkPosition);
  }

  function checkPosition(position) {
    dispatch(
      check_localization(
        xcsrftoken,
        position.coords.longitude,
        position.coords.latitude
      )
    );
  }

  return cloneElement(children, {
    user: user,
    provinces: provinces,
    checkLocalization: checkLocalization,
    settings: settings,
    endProvider: endProvider,
  });
}
export default ProviderSettingsPage;
