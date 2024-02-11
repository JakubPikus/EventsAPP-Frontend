import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import { user, events_user } from "../actions/data";
import { CLEAR_CITIES } from "../actions/types";
import { useNavigate, useParams } from "react-router-dom";

import {
  getUserData,
  getXCSRFToken,
  getUserEvents,
  getHandlerData,
  getCities,
} from "../selectors";

function ProviderUser({ children }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const { username } = useParams();
  const cities = useSelector(getCities);
  const userData = useSelector(getUserData);
  const xcsrftoken = useSelector(getXCSRFToken);
  const userEvents = useSelector(getUserEvents);
  const handler_data = useSelector(getHandlerData);
  const [searchFriend, setSearchFriend] = useState("");
  const [friendsList, setFriendsList] = useState({
    friendslist_together: [],
    friendslist_strange: [],
  });
  const [checkParams, setCheckParams] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [endProvider, setEndProvider] = useState(false);
  const [values, setValues] = useState(null);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    setEndProvider(false);
    setCheckParams(false);
    setSearchFriend("");

    let params = new URLSearchParams(document.location.search);
    let params_object = Object.fromEntries(params.entries());

    setValues({
      ...params_object,
      type: params_object?.type !== undefined ? params_object.type : "future",
      events_category:
        params_object?.events_category !== undefined
          ? params_object.events_category
          : "all",
    });
    dispatch(events_user(username, params_object));
  }, [username]);

  useEffect(() => {
    if (handler_data.code == 1301 || handler_data.code == 1302) {
      history(`/`);
    }
  }, [handler_data.code]);

  useEffect(() => {
    if (
      userEvents?.data !== null &&
      userEvents?.data !== undefined &&
      endProvider !== true
    ) {
      const filteredItem = Object.fromEntries(
        Object.entries(userEvents.value_not_found).filter(
          ([key, value]) => value !== null
        )
      );

      // JEŚLI ISTNIEJĄ, TO POBIERZ NOWE URL Z BACKENDU Z POPRAWNYM WYSZUKANIEM I PODMIEN INPUT WARTOŚCI DO FRONT
      if (Object.keys(filteredItem).length > 0) {
        let new_url = new URL(userEvents.meta.links.current);
        let new_searchParams = new URLSearchParams(new_url.search);
        new_searchParams.delete("username");

        let new_value = Object.fromEntries(new_searchParams.entries());
        let new_page = `/user/${username}`;

        if (new_searchParams.size > 0) {
          new_page += "?" + new_searchParams.toString();
        }

        setValues({
          ...new_value,
          type: new_value?.type !== undefined ? new_value.type : "future",
          events_category:
            new_value?.events_category !== undefined
              ? new_value.events_category
              : "all",
        });
        history(new_page);
      }

      setCheckParams(true);
    }
  }, [userEvents]);

  useEffect(() => {
    if (checkParams == true) {
      dispatch(user(username));
    }
  }, [checkParams]);

  useEffect(() => {
    if (userData.data !== null) {
      setActiveUser(userData.data);
      if (endProvider == false) {
        setFriendsList({
          friendslist_together: userData.data.friendslist_together,
          friendslist_strange: userData.data.friendslist_strange,
        });
      }
    }
  }, [userData.data]);

  useEffect(() => {
    if (activeUser !== null && activeUser !== undefined) {
      setEndProvider(true);
    }
  }, [activeUser]);

  return cloneElement(children, {
    activeUser: activeUser,
    userEvents: userEvents,
    values: values,
    endProvider: endProvider,
    xcsrftoken: xcsrftoken,
    searchFriend: searchFriend,
    setSearchFriend: setSearchFriend,
    friendsList: friendsList,
    setFriendsList: setFriendsList,
  });
}
export default ProviderUser;
