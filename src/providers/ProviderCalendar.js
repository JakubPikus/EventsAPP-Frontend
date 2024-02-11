import React from "react";
import { useState, useEffect, cloneElement, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { events_via_calendar } from "../actions/data";
import { CLEAR_CITIES } from "../actions/types";

import { getCities, getEventsViaCalendar } from "../selectors";

function ProviderCalendar({ children }) {
  const moment = require("moment");
  const currentDate = moment();
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const events = useSelector(getEventsViaCalendar);
  const [endProvider, setEndProvider] = useState(false);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    dispatch(events_via_calendar(currentYear, currentMonth));
  }, []);

  useEffect(() => {
    if (events !== null) {
      setEndProvider(true);
    }
  }, [events]);

  return cloneElement(children, {
    endProvider: endProvider,
    events: events,
  });
}
export default ProviderCalendar;
