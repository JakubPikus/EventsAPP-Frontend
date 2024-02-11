import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { category_homescreen, series_data } from "../actions/data";
import { data_province } from "../actions/auth";
import { useLocation } from "react-router-dom";
import { CLEAR_CITIES } from "../actions/types";

import {
  getCategorys,
  getCities,
  getProvinces,
  getXCSRFToken,
  getSeries,
  getUser,
} from "../selectors";

function ProviderNewEvent({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const categorys = useSelector(getCategorys);
  const provinces = useSelector(getProvinces);
  const xcsrftoken = useSelector(getXCSRFToken);
  const cities = useSelector(getCities);
  const series = useSelector(getSeries);
  const user = useSelector(getUser);

  const [checkCategorys, setCheckCategorys] = useState(false);
  const [checkProvinces, setCheckProvinces] = useState(false);
  const [checkSeries, setCheckSeries] = useState(false);
  const [endProvider, setEndProvider] = useState(false);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    if (categorys == null) {
      dispatch(category_homescreen());
    }
    setCheckCategorys(true);
  }, []);

  useEffect(() => {
    if (checkCategorys) {
      if (provinces == null) {
        dispatch(data_province());
      }
      setCheckProvinces(true);
    }
  }, [checkCategorys]);

  useEffect(() => {
    if (checkProvinces) {
      if (series == null) {
        dispatch(series_data(user.username));
      }
      setCheckSeries(true);
    }
  }, [checkProvinces]);

  useEffect(() => {
    if (checkSeries) {
      setEndProvider(true);
    }
  }, [checkSeries]);

  return cloneElement(children, {
    categorys: categorys,
    provinces: provinces,
    series: series,
    xcsrftoken: xcsrftoken,
    endProvider: endProvider,
  });
}
export default ProviderNewEvent;
