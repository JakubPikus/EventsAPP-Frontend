import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCities, getXCSRFToken, getEventTickets } from "../selectors";
import { event_tickets } from "../actions/data";
import { CLEAR_CITIES } from "../actions/types";
import { useParams } from "react-router-dom";

function ProviderEventTicketsPage({ children }) {
  const dispatch = useDispatch();

  const data = useSelector(getEventTickets);
  const cities = useSelector(getCities);

  const xcsrftoken = useSelector(getXCSRFToken);

  const { slug_uuid } = useParams();

  const [preCart, setPreCart] = useState({});
  const [cart, setCart] = useState({});

  const [endProvider, setEndProvider] = useState(false);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    let slug = slug_uuid.substring(0, slug_uuid.length - 37);
    let uuid = slug_uuid.substring(slug_uuid.length - 36);

    dispatch(event_tickets(slug, uuid));
  }, []);

  useEffect(() => {
    if (data?.tickets !== undefined && endProvider == false) {
      let obj_cart = {};
      data.tickets.forEach(
        (element) =>
          (obj_cart[element.ticket_type] = {
            id: element.id,
            stripe_id: element.stripe_id,
            avaible: element.quantity - element.reserved_tickets,
            price: element.price,
            details: element.ticket_details,
            tickets: [],
          })
      );
      setPreCart(JSON.parse(JSON.stringify(obj_cart)));
      setCart(JSON.parse(JSON.stringify(obj_cart)));
    }
  }, [data]);

  useEffect(() => {
    if (Object.keys(cart).length !== 0 && endProvider == false) {
      setEndProvider(true);
    }
  }, [cart]);

  return cloneElement(children, {
    data: data,
    preCart: preCart,
    setPreCart: setPreCart,
    cart: cart,
    setCart: setCart,
    xcsrftoken: xcsrftoken,
    endProvider: endProvider,
  });
}
export default ProviderEventTicketsPage;
