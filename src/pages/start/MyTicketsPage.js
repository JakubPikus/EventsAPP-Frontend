import React, { useEffect, useState } from "react";
import Dashboard from "../../components/Dashboard";
import { useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { getXCSRFToken } from "../../selectors";

import { LocationMarkerIcon, CalendarIcon } from "@heroicons/react/solid";
import moment, { updateLocale } from "moment";
import "moment/locale/pl";
import ips_config from "../../ips_config";
import { Link } from "react-router-dom";

import useMyTicketsPageCreated from "../../hooks/useMyTicketsPageCreated";
import useMyTicketsPageBought from "../../hooks/useMyTicketsPageBought";
moment.locale("pl");

function MyTicketsPage({
  events,
  inputTicket,
  setInputTicket,
  unpayedTickets,
  setUnpayedTickets,
  endProvider,
}) {
  const xcsrftoken = useSelector(getXCSRFToken);

  const [
    createdCategory,
    showPopup,
    modalPopup,
    setOpenModalActions,
    openModalActions,
    initModalInput,
    modalActions,
  ] = useMyTicketsPageCreated();

  const [
    orderedCategory,
    modalRefund,
    modalOrderCancel,
    initOpenRefund,
    initOrderCancel,
    setOpenRefund,
    openRefund,
    setBlockedPay,
    openOrderCancel,
    setOpenOrderCancel,
  ] = useMyTicketsPageBought();

  const [activeCategoryTickets, setActiveCategoryTickets] = useState("ordered");

  let initListCategory = {
    ordered: "Zamówione bilety",
    created: "Stworzone bilety",
  };

  useEffect(() => {
    if (events?.is?.timestamp !== undefined) {
      if (events.is.type == "new_ticket") {
        setInputTicket((prevState) => ({
          ...prevState,
          [events.is.event_id]: {
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
          },
        }));
      } else if (events.is.type == "verification_ticket") {
        setOpenModalActions((prevState) => ({
          ...prevState,
          data: {
            ...prevState.data,
            verificated: events.is.verificated,
            verificated_details: events.is.verificated_details,
            stripe_id: events.is.stripe_id,
            was_allowed: events.is.was_allowed,
            ticket_type: events.is.ticket_type,
            ticket_details: events.is.ticket_details,
            default_price: events.is.default_price,
            price: events.is.price,
            new_price: events.is.new_price,
            quantity: events.is.quantity,
            edit_time: events.is.edit_time,
          },
          input: {
            ...prevState.input,
            verificated: events.is.verificated,
            verificated_details: events.is.verificated_details,
            stripe_id: events.is.stripe_id,
            was_allowed: events.is.was_allowed,
            ticket_type: events.is.ticket_type,
            ticket_details: events.is.ticket_details,
            default_price: events.is.default_price,
            price: events.is.price,
            new_price: events.is.new_price,
            quantity: events.is.quantity,
            edit_time: events.is.edit_time,
          },
        }));
      } else if (events.is.type == "edit_ticket") {
        setOpenModalActions(initModalInput);
      } else if (events.is.type == "refund_ticket") {
        setOpenRefund(initOpenRefund);
      } else if (events.is.type == "ordered_ticket_action") {
        setBlockedPay(false);
        setOpenOrderCancel(initOrderCancel);
      } else if (events.is.type == "ordered_ticket_repay") {
        setTimeout(() => {
          window.location.href = events.is.url_payment;
        }, 2000);
      } else if (events.is.type == "refresh_cart_price") {
        setBlockedPay(false);
        setUnpayedTickets((prevState) => {
          let updatedState = { ...prevState };

          Object.keys(updatedState).forEach((key) => {
            if (Object.keys(events.is.refreshed_id_price).includes(key)) {
              updatedState[key] = events.is.refreshed_id_price[key];
            }
          });
          return updatedState;
        });
      } else if (events.is.type == "websocket") {
        setOpenRefund(initOpenRefund);
        setOpenOrderCancel(initOrderCancel);
      }
    }
  }, [events?.is?.timestamp]);

  function eventRender(event) {
    return (
      <div
        className={`flex h-24 min-h-24 w-48 min-w-48 flex-row rounded-lg bg-gradient-to-bl ${
          event.current
            ? "from-cyan-900 via-cyan-900 to-gray-800"
            : "from-zinc-900 via-zinc-800 to-zinc-700"
        }`}
      >
        <div className="flex h-auto w-1/3 overflow-hidden rounded-l-lg">
          <img
            src={`${ips_config.BACKEND}/media/${event.image}`}
            className="h-full w-full object-cover transition ease-in-out hover:scale-110"
          ></img>
        </div>
        <div className="break-anywhere flex w-2/3 flex-col items-center">
          <Link
            to={`/event/${event.slug}-${event.uuid}`}
            className="max-w-full flex px-1 pt-1"
          >
            <span className="h-auto max-w-[120px] cursor-pointer truncate font-mukta text-[12px] text-gray-100 hover:bg-slate-400 hover:text-black">
              {event.title}
            </span>
          </Link>
          <span className="h-auto font-mukta text-[9px] text-gray-400">
            {event.category}
          </span>
          <div className="flex h-full w-full flex-row pl-1 pt-1">
            <div className="flex h-full w-2/3 flex-col space-y-2">
              <div className="flex flex-row items-center">
                <LocationMarkerIcon className="block h-5 w-5 text-gray-100"></LocationMarkerIcon>
                <span className="h-auto font-mukta text-[9px] text-gray-100">
                  {event.city}
                </span>
              </div>
              <div className="flex flex-row items-center space-x-1">
                <CalendarIcon className="block h-4 w-4 text-gray-100"></CalendarIcon>
                <span className="h-auto font-mukta text-[8px] text-gray-400">
                  {event.event_date}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderCategory(category, events) {
    if (category == "ordered") {
      return orderedCategory(
        events.bought,
        unpayedTickets,
        setUnpayedTickets,
        eventRender
      );
    } else {
      return createdCategory(events, inputTicket, setInputTicket, eventRender);
    }
  }

  // h-full

  return (
    <Dashboard>
      <div
        className={` flex w-full h-full flex-col items-center overflow-y-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-4`}
      >
        {endProvider ? (
          <div className="flex h-full w-full flex-col space-y-3 px-3 pt-4 sm:px-3 xl:w-5/6 ">
            <span className="h-8 text-center font-mukta text-lg text-gray-100  md:text-start md:text-2xl">
              Twoje bilety
            </span>
            <div className="flex flex-col h-full w-full">
              <div className="flex h-12 w-full flex-row overflow-hidden rounded-t-xl">
                {Object.keys(initListCategory).map((category, index) => (
                  <div
                    className={`${
                      activeCategoryTickets === category
                        ? "bg-gray-600"
                        : "cursor-pointer bg-gray-700 drop-shadow-2xl  hover:bg-gray-800"
                    } flex h-full w-1/2 py-2 items-center justify-center px-2 text-xs md:text-base`}
                    key={index}
                    onClick={() => {
                      setActiveCategoryTickets(category);
                    }}
                  >
                    <p className="text-md h-auto text-center font-mukta text-white">
                      {initListCategory[category]}
                    </p>
                  </div>
                ))}
              </div>
              {renderCategory(activeCategoryTickets, events)}
            </div>
            {showPopup.status && modalPopup()}
            {openModalActions.status && modalActions(openModalActions.data)}
            {openRefund.status && modalRefund(xcsrftoken)}
            {openOrderCancel.status && modalOrderCancel(xcsrftoken)}
          </div>
        ) : (
          <div className="flex w-full grow items-center justify-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        )}
      </div>
    </Dashboard>
  );
}

export default MyTicketsPage;
