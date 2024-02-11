import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { events_list, category_homescreen } from "../actions/data";
import { data_province, data_cities } from "../actions/auth";
import { useNavigate } from "react-router-dom";

import {
  getEventsList,
  getCategorys,
  getProvinces,
  getCities,
  getXCSRFToken,
} from "../selectors";

function ProviderEventsFindPage({ children }) {
  const dispatch = useDispatch();
  const history = useNavigate();

  const [skipFirstRender, setSkipFirstRender] = useState(false);
  const [endProvider, setEndProvider] = useState(false);
  const [checkParams, setCheckParams] = useState(false);
  const [checkCategorys, setCheckCategorys] = useState(false);
  const [checkProvinces, setCheckProvinces] = useState(false);

  const [values, setValues] = useState(null);

  const xcsrftoken = useSelector(getXCSRFToken);
  const eventList = useSelector(getEventsList);
  const categorys = useSelector(getCategorys);
  const provinces = useSelector(getProvinces);
  const cities = useSelector(getCities);

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    let params_object = Object.fromEntries(params.entries());

    setValues(params_object);
    setSkipFirstRender(true);
  }, []);

  useEffect(() => {
    if (skipFirstRender && !endProvider && values !== null) {
      dispatch(events_list(values));
    }
  }, [values]);

  useEffect(() => {
    if (
      skipFirstRender &&
      !endProvider &&
      eventList?.value_not_found !== undefined
    ) {
      // PRZYJECIE OD BACKANDU WARTOSCI PARAMETROW, KTORE ZOSTALY BLEDNIE WPISANE (NIE SA ROWNE NONE)
      const filteredItem = Object.fromEntries(
        //skrzeczy tutej "Uncaught TypeError: Cannot convert undefined or null to object"
        Object.entries(eventList.value_not_found).filter(
          ([key, value]) => value !== null
        )
      );
      // JEŚLI ISTNIEJĄ, TO POBIERZ NOWE URL Z BACKENDU Z POPRAWNYM WYSZUKANIEM I PODMIEN INPUT WARTOŚCI DO FRONT
      if (Object.keys(filteredItem).length > 0) {
        let new_url = new URL(eventList.meta.links.current);
        let new_searchParams = new URLSearchParams(new_url.search);
        let new_value = Object.fromEntries(new_searchParams.entries());
        setValues(new_value);
        history("/events_list" + new_url.search);
      }
      setCheckParams(true);
    }
  }, [eventList]);

  useEffect(() => {
    if (skipFirstRender && !endProvider) {
      if (categorys == null) {
        dispatch(category_homescreen());
      }
      setCheckCategorys(true);
    }
  }, [checkParams]);

  useEffect(() => {
    if (checkCategorys && !endProvider) {
      if (provinces == null) {
        dispatch(data_province());
      }
      setCheckProvinces(true);
    }
  }, [checkCategorys]);

  useEffect(() => {
    if (checkProvinces && provinces !== null) {
      if (values.province !== undefined) {
        let province_id = provinces.filter(
          (province) => province.name == values.province
        )[0].id;
        dispatch(data_cities(xcsrftoken, province_id));
      }
      setEndProvider(true);
    }
  }, [checkProvinces, provinces]);

  useEffect(() => {
    if (skipFirstRender && !endProvider) {
      setEndProvider(true);
    }
  }, [cities]);

  return cloneElement(children, {
    values: values,
    eventList: eventList,
    categorys: categorys,
    provinces: provinces,
    cities: cities,
    endProvider: endProvider,
    xcsrftoken: xcsrftoken,
  });
}
export default ProviderEventsFindPage;
