import React from "react";
import { useState, useEffect, cloneElement, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CITIES } from "../actions/types";
import { getCities, getUserBadges } from "../selectors";
import { user_badges } from "../actions/data";

function ProviderActivateBadgesPage({ children }) {
  const dispatch = useDispatch();
  const [endProvider, setEndProvider] = useState(false);
  const cities = useSelector(getCities);
  const badges = useSelector(getUserBadges);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }

    dispatch(user_badges());
  }, []);

  useEffect(() => {
    if (badges.created_badges !== null) {
      setEndProvider(true);
    }
  }, [badges.created_badges]);

  return cloneElement(children, {
    endProvider: endProvider,
    badges: badges,
  });
}
export default ProviderActivateBadgesPage;
