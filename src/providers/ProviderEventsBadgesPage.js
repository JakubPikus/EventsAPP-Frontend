import React from "react";
import { useState, useEffect, cloneElement, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CITIES } from "../actions/types";
import { getCities, getEventsViaBadges } from "../selectors";
import { events_via_badges } from "../actions/data";

function ProviderEventsBadgesPage({ children }) {
  const dispatch = useDispatch();
  const [endProvider, setEndProvider] = useState(false);
  const cities = useSelector(getCities);
  const events = useSelector(getEventsViaBadges);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    dispatch(events_via_badges("created_time"));
  }, []);

  useEffect(() => {
    if (events.events !== null) {
      setEndProvider(true);
    }
  }, [events]);

  return cloneElement(children, {
    endProvider: endProvider,
    events: events,
  });
}
export default ProviderEventsBadgesPage;
