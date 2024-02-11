import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import { event, comment_event, event_participants } from "../actions/data";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { CLEAR_CITIES } from "../actions/types";

import {
  getEvent,
  getUser,
  getCommentEvent,
  getXCSRFToken,
  getCities,
  getEventParticipants,
  getHandlerData,
} from "../selectors";

function ProviderEvent({ children }) {
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();
  const { slug_uuid } = useParams();

  const eventData = useSelector(getEvent);
  const commentEventData = useSelector(getCommentEvent);
  const xcsrfToken = useSelector(getXCSRFToken);
  const cities = useSelector(getCities);
  const eventParticipants = useSelector(getEventParticipants);
  const handler_data = useSelector(getHandlerData);
  const user = useSelector(getUser);

  const [activeEvent, setActiveEvent] = useState(null);
  const [checkComments, setCheckComments] = useState(false);
  const [endProvider, setEndProvider] = useState(false);

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    setActiveImage(0);
    setEndProvider(false);
    setCheckComments(false);
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    let slug = slug_uuid.substring(0, slug_uuid.length - 37);
    let uuid = slug_uuid.substring(slug_uuid.length - 36);
    dispatch(event(slug, uuid));
  }, [slug_uuid]);

  useEffect(() => {
    if (handler_data.code == 1201 || handler_data.code == 1300) {
      history(`/`);
    } else if (handler_data.code == 1400) {
      history(`/user/${user.username}?type=created_future`);
    }
  }, [handler_data.code]);

  useEffect(() => {
    if (eventData !== null) {
      setActiveEvent(eventData);
    }
  }, [eventData]);

  useEffect(() => {
    if (activeEvent !== null && checkComments == false) {
      let slug = slug_uuid.substring(0, slug_uuid.length - 37);
      let uuid = slug_uuid.substring(slug_uuid.length - 36);
      dispatch(comment_event(slug, uuid));
    }
  }, [activeEvent]);

  useEffect(() => {
    if (commentEventData?.meta?.count !== undefined && endProvider == false) {
      let slug = slug_uuid.substring(0, slug_uuid.length - 37);
      let uuid = slug_uuid.substring(slug_uuid.length - 36);
      dispatch(event_participants(slug, uuid));
      setCheckComments(true);
    }
  }, [commentEventData?.meta?.count]);

  useEffect(() => {
    if (eventParticipants !== null && eventParticipants !== undefined) {
      setEndProvider(true);
    }
  }, [eventParticipants]);

  return cloneElement(children, {
    activeEvent: activeEvent,
    commentEventData: commentEventData,
    endProvider: endProvider,
    xcsrfToken: xcsrfToken,
    slug: slug_uuid.substring(0, slug_uuid.length - 37),
    uuid: slug_uuid.substring(slug_uuid.length - 36),
    eventParticipants: eventParticipants,
    activeImage: activeImage,
    setActiveImage: setActiveImage,
  });
}
export default ProviderEvent;
