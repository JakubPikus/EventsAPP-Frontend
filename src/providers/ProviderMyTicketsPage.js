import React from "react";
import { useState, useEffect, cloneElement, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CITIES } from "../actions/types";
import { getCities, getEventsViaTickets, getUser } from "../selectors";
import { events_via_tickets, tickets_calendar } from "../actions/data";

function ProviderMyTicketsPage({ children }) {
  const dispatch = useDispatch();
  const [endProvider, setEndProvider] = useState(false);
  const cities = useSelector(getCities);
  const events = useSelector(getEventsViaTickets);
  const [inputTicket, setInputTicket] = useState({});
  const [unpayedTickets, setUnpayedTickets] = useState({});
  const params = new URLSearchParams(document.location.search);
  const user = useSelector(getUser);
  const moment = require("moment");

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    dispatch(events_via_tickets(params.get("order")));
  }, []);

  useEffect(() => {
    if (events?.created?.data !== undefined) {
      setInputTicket((prevState) => {
        let state = { ...prevState };

        for (const element of events.created.data) {
          if (!Object.keys(state).includes(element.id.toString())) {
            state[element.id] = {
              input: {
                new_price: "",
                ticket_type: "",
                ticket_details: "",
                quantity: "",
              },
              validated: {
                new_price: false,
                ticket_type: false,
                ticket_details: false,
                quantity: false,
              },
            };
          }
        }
        return state;
      });

      if (endProvider == false) {
        let unpayed_order = events.bought.data.find(
          (order) => order.is_paid == false
        );

        if (unpayed_order) {
          let obj_temp_tickets = {};
          unpayed_order.tickets.forEach((type) => {
            type.details.forEach(
              (ticket) => (obj_temp_tickets[ticket.id] = ticket.purchase_price)
            );
          });

          setUnpayedTickets(obj_temp_tickets);
        }

        if (user.pinned_bank) {
          const currentDate = moment();
          const currentMonth = currentDate.month();
          const currentYear = currentDate.year();
          dispatch(tickets_calendar(false, currentYear, currentMonth));
        } else {
          setEndProvider(true);
        }
      }
    }
  }, [events?.created?.data]);

  useEffect(() => {
    if (events?.calendar !== undefined && endProvider == false) {
      setEndProvider(true);
    }
  }, [events?.calendar]);

  return cloneElement(children, {
    events: events,
    inputTicket: inputTicket,
    setInputTicket: setInputTicket,
    unpayedTickets: unpayedTickets,
    setUnpayedTickets: setUnpayedTickets,
    endProvider: endProvider,
  });
}
export default ProviderMyTicketsPage;
