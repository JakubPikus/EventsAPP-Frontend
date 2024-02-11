import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  category_homescreen,
  check_localization,
  events_homescreen,
} from "../actions/data";

import { CLEAR_CITIES } from "../actions/types";
import { data_province, data_cities } from "../actions/auth";
import {
  getUser,
  getXCSRFToken,
  getCategorys,
  getProvinces,
  getCities,
  getCheckLocalization,
  getEventsHomescreen,
} from "../selectors";

function ProviderHome({ children }) {
  const dispatch = useDispatch();

  const [skipFirstRender, setSkipFirstRender] = useState(false);
  const [checkCategorys, setCheckCategorys] = useState(false);
  const [checkProvinces, setCheckProvinces] = useState(false);
  const [checkCities, setCheckCities] = useState(false);

  const [endProvider, setEndProvider] = useState(false);

  const user = useSelector(getUser);
  const xcsrftoken = useSelector(getXCSRFToken);
  const checkLocalization = useSelector(getCheckLocalization);
  const provinces = useSelector(getProvinces);
  const cities = useSelector(getCities);
  const categorys = useSelector(getCategorys);
  const eventsHomescreen = useSelector(getEventsHomescreen);

  useEffect(() => {
    dispatch(events_homescreen(4));
    setSkipFirstRender(true);
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
  }, []);

  useEffect(() => {
    if (skipFirstRender && !endProvider) {
      if (categorys == null) {
        dispatch(category_homescreen());
      }
      setCheckCategorys(true);
    }
  }, [eventsHomescreen]);

  useEffect(() => {
    if (checkCategorys && categorys !== null) {
      if (provinces == null) {
        dispatch(data_province());
      }
      setCheckProvinces(true);
    }
  }, [checkCategorys, categorys]);

  useEffect(() => {
    if (checkProvinces && provinces !== null) {
      dispatch(data_cities(xcsrftoken, user.city.county.province.id));
    }
    setCheckCities(true);
  }, [provinces, checkProvinces]);

  useEffect(() => {
    if (cities !== null && cities !== undefined && checkCities) {
      checkGeolocation();
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
    user: user,
    xcsrftoken: xcsrftoken,
    checkLocalization: checkLocalization,
    provinces: provinces,
    cities: cities,
    categorys: categorys,
    eventsHomescreen: eventsHomescreen,
    endProvider: endProvider,
    checkCities: checkCities,
  });
}
export default ProviderHome;
