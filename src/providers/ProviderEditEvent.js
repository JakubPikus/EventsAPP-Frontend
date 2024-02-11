import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEvent,
  getCities,
  getCategorys,
  getProvinces,
  getXCSRFToken,
  getSeries,
  getUser,
} from "../selectors";
import { event, category_homescreen, series_data } from "../actions/data";
import { data_province, data_cities } from "../actions/auth";
import { CLEAR_CITIES } from "../actions/types";
import { useNavigate, useParams } from "react-router-dom";

function ProviderEditEvent({ children }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const eventData = useSelector(getEvent);
  const cities = useSelector(getCities);
  const categorys = useSelector(getCategorys);
  const provinces = useSelector(getProvinces);
  const user = useSelector(getUser);
  const xcsrftoken = useSelector(getXCSRFToken);
  const series = useSelector(getSeries);
  const { slug_uuid } = useParams();

  const [activeEvent, setActiveEvent] = useState(null);
  const [checkCategorys, setCheckCategorys] = useState(false);
  const [checkProvinces, setCheckProvinces] = useState(false);
  const [checkSeries, setCheckSeries] = useState(false);
  const [endProvider, setEndProvider] = useState(false);

  const [valueInput, setValueInput] = useState({
    title: "",
    images: {},
    category: "",
    schedule: {},
    province: "",
    series: "",
    city: "",
    text: "",
  });

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    let slug = slug_uuid.substring(0, slug_uuid.length - 37);
    let uuid = slug_uuid.substring(slug_uuid.length - 36);

    if (
      eventData == null ||
      (eventData.slug !== slug && eventData.uuid !== uuid)
    ) {
      dispatch(event(slug, uuid));
    } else {
      if (eventData.user !== user.username) {
        history(`/?error=not_organizer`);
      }
    }
  }, []);

  useEffect(() => {
    if (eventData !== null) {
      // "JAK NIE MA 'event' W REDUX, ALBO JEST INNY W REDUX NIZ TEN NA KTORY WCHODZIMY"

      if (eventData.user !== user.username) {
        history(`/?error=not_organizer`);
      }

      setActiveEvent(eventData);
      const objectSchedule = eval(eventData.schedule).map(
        ([startHours, startMinutes, endHours, endMinutes, details]) => ({
          startHours,
          startMinutes,
          endHours: endHours === undefined ? "" : endHours,
          endMinutes: endMinutes === undefined ? "" : endMinutes,
          details,
        })
      );

      setValueInput({
        title: eventData.title,
        images: eventData.image,
        category: eventData.category,
        schedule: objectSchedule,
        province: eventData.province,
        series: eventData.series == null ? "" : eventData.series,
        city: eventData.city,
        text: eventData.text,
        startDate: eventData.event_date,
        endDate: eventData.event_date,
      });
    }
  }, [eventData]);

  useEffect(() => {
    if (activeEvent !== null) {
      if (categorys == null) {
        dispatch(category_homescreen());
      }
      setCheckCategorys(true);
    }
  }, [activeEvent]);

  useEffect(() => {
    if (checkCategorys) {
      if (series == null) {
        dispatch(series_data(user.username));
      }
      setCheckSeries(true);
    }
  }, [checkCategorys]);

  useEffect(() => {
    if (checkSeries) {
      if (provinces == null) {
        dispatch(data_province());
      }
      setCheckProvinces(true);
    }
  }, [checkSeries]);

  useEffect(() => {
    if (checkProvinces && provinces !== null) {
      let province_filtred = provinces.filter(
        (province) => province.name == valueInput.province
      );
      dispatch(data_cities(xcsrftoken, province_filtred[0].id));
    }
  }, [checkProvinces, provinces]);

  useEffect(() => {
    if (cities !== null && cities !== undefined) {
      setEndProvider(true);
    }
  }, [cities]);

  return cloneElement(children, {
    activeEvent: activeEvent,
    valueInput: valueInput,
    setValueInput: setValueInput,
    categorys: categorys,
    provinces: provinces,
    cities: cities,
    series: series,
    xcsrftoken: xcsrftoken,
    endProvider: endProvider,
  });
}
export default ProviderEditEvent;
