import React from "react";
import { useState, useEffect, cloneElement, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CITIES } from "../actions/types";
import { getCities } from "../selectors";

function ProviderFindFriendsPage({ children }) {
  const dispatch = useDispatch();
  const [endProvider, setEndProvider] = useState(false);
  const cities = useSelector(getCities);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }

    setEndProvider(true);
  }, []);

  return cloneElement(children, {
    endProvider: endProvider,
  });
}
export default ProviderFindFriendsPage;
