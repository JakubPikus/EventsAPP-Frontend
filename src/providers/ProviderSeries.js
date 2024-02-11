import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getEventsViaSeries } from "../selectors";
import { events_via_series } from "../actions/data";

import { CLEAR_CITIES } from "../actions/types";

function ProviderSeries({ children }) {
  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const events = useSelector(getEventsViaSeries);
  const [endProvider, setEndProvider] = useState(false);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    dispatch(events_via_series());
  }, []);

  useEffect(() => {
    if (events.events_no_series !== null) {
      setEndProvider(true);
    }
  }, [events]);

  return cloneElement(children, {
    events: events,
    endProvider: endProvider,
  });
}
export default ProviderSeries;
