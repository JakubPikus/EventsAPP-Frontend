import React from "react";
import { useState, useEffect, cloneElement, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CITIES } from "../actions/types";
import { check_localization, events_random } from "../actions/data";
import { data_province, data_cities } from "../actions/auth";

import {
  getCities,
  getCheckLocalization,
  getXCSRFToken,
  getEventsRandom,
  getProvinces,
  getUser,
} from "../selectors";

function ProviderEventsRandomPage({ children }) {
  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const provinces = useSelector(getProvinces);
  const checkLocalization = useSelector(getCheckLocalization);
  const xcsrftoken = useSelector(getXCSRFToken);
  const events = useSelector(getEventsRandom);
  const user = useSelector(getUser);

  const [checkProvinces, setCheckProvinces] = useState(false);
  const [endProvider, setEndProvider] = useState(false);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    dispatch(events_random(user.distance));
  }, []);

  useEffect(() => {
    if (events !== null && endProvider == false) {
      if (provinces == null) {
        dispatch(data_province());
      }
      checkGeolocation();
      setCheckProvinces(true);
    }
  }, [events]);

  useEffect(() => {
    if (checkProvinces == true && provinces !== null) {
      let province_filtred = provinces.find(
        (province) => province.name == user.city.county.province.name
      );

      dispatch(data_cities(xcsrftoken, province_filtred.id));
    }
  }, [checkProvinces, provinces]);

  useEffect(() => {
    if (checkProvinces == true && cities !== undefined && cities !== null) {
      setEndProvider(true);
    }
  }, [cities]);

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
    checkLocalization: checkLocalization,
    endProvider: endProvider,
    xcsrftoken: xcsrftoken,
    provinces: provinces,
    events: events,
  });
}
export default ProviderEventsRandomPage;
