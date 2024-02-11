import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getXCSRFToken, getUser } from "../selectors";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  PlusCircleIcon,
  CheckCircleIcon,
  ClockIcon,
  XIcon,
  PencilAltIcon,
  MinusCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/solid";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  ticket_create,
  ticket_edit,
  ticket_delete,
  tickets_calendar,
  events_via_tickets,
  payment_confirmation_pdf,
} from "../actions/data";

import { useNavigate, Navigate } from "react-router-dom";

function useMyTicketsPageCreated() {
  const history = useNavigate();
  const xcsrftoken = useSelector(getXCSRFToken);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const moment = require("moment");
  const currentDate = moment();
  const currentMonth = currentDate.month();
  const currentYear = currentDate.year();

  // DO POBIERANIA BILANSU Z KWOT Z KAŻDEGO ROKU

  let months = {
    0: "Styczeń",
    1: "Luty",
    2: "Marzec",
    3: "Kwiecień",
    4: "Maj",
    5: "Czerwiec",
    6: "Lipiec",
    7: "Sierpień",
    8: "Wrzesień",
    9: "Październik",
    10: "Listopad",
    11: "Grudzień",
  };

  let yearOptions = [];
  for (let year = currentYear - 10; year <= currentYear + 10; year++) {
    yearOptions.push(
      <option className="text-black" key={year} value={year}>
        {year}
      </option>
    );
  }

  const [selectDate, setSelectDate] = useState({
    year: currentYear,
    month: currentMonth,
  });

  function handleMonthChange(e) {
    if (e.target.name == "year") {
      dispatch(
        tickets_calendar(false, parseInt(e.target.value), selectDate.month)
      );
    } else if (e.target.name == "month") {
      dispatch(
        tickets_calendar(false, selectDate.year, parseInt(e.target.value))
      );
    }
    setSelectDate({
      ...selectDate,
      [e.target.name]: parseInt(e.target.value),
    });
  }

  // POPUP DO STANU WERYFIKACJI

  const [showPopup, setShowPopup] = useState({
    status: false,
    state: null,
    details: null,
  });
  const [timeoutId, setTimeoutId] = useState(null);
  const [mousePos, setMousePos] = useState({});

  function listenPos() {
    window.addEventListener("mousemove", handleMouseMove);
  }

  const handleMouseMove = (event) => {
    setMousePos({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    listenPos();
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const showDelayedModal = (data) => {
    let id = setTimeout(() => {
      setShowPopup({
        status: true,
        state: data.verificated,
        details: data.verificated_details,
      });
    }, 200);

    setTimeoutId(id);
  };

  const hideModal = () => {
    setShowPopup({ status: false, state: null, details: null });
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };

  function modalPopup() {
    let text;
    if (showPopup.state == "need_improvement") {
      text = "Bilet wymaga zmian.";
    } else if (showPopup.state == "rejected") {
      text = "Bilet usunięty.";
    }

    return (
      <div
        className={`absolute top-[-60px] left-[-135px] flex h-auto w-32 flex-col rounded-lg bg-gradient-to-bl from-gray-900 via-gray-900 to-gray-800`}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0)`,
        }}
        id="testtt"
      >
        <div className="flex h-6 w-full items-center justify-start rounded-t-lg bg-gradient-to-r from-gray-700 to-slate-600 ">
          <span className="h-auto w-fit pl-2 font-mukta text-[12px] text-gray-100 ">
            Status biletu
          </span>
        </div>

        <div className="flex h-auto flex-col space-y-2 divide-y-2 divide-gray-700 py-3">
          <span className="h-auto px-2 text-center font-mukta text-[12px] text-gray-300">
            {text}
          </span>
          {showPopup.details !== null &&
            (showPopup.state == "need_improvement" ||
              showPopup.state == "rejected") && (
              <span className="h-auto px-2 pt-3 text-center font-mukta text-[12px] text-white">
                {showPopup.details}
              </span>
            )}
        </div>
      </div>
    );
  }

  // MODUŁY

  function ticketModule(ticket, modal_status, event_id, event_late) {
    function iconVerificated(type) {
      let icons = {
        awaiting: ClockIcon,
        need_improvement: PencilAltIcon,
        verificated: CheckCircleIcon,
        rejected: MinusCircleIcon,
      };
      const IconComponent = icons[type];

      return (
        <IconComponent
          className={`block h-8 w-8
          ${type == "awaiting" && "text-yellow-300"}
          ${type == "need_improvement" && "text-orange-500"}
          ${type == "verificated" && "text-green-200"}
          ${type == "rejected" && "text-red-500"}
          ${
            modal_status == false &&
            event_late == false &&
            "transition ease-in-out group-hover:scale-110"
          }`}
        />
      );
    }

    return (
      <div
        className={`flex flex-row min-h-[48px] divide-x-2 w-full ${
          event_late ? "divide-zinc-800" : "divide-blue-400"
        } ${modal_status == false && ticket.new && "bg-gray-500"}`}
        key={ticket.id}
      >
        <div
          className={`flex group w-1/5 h-auto items-center justify-center
          ${
            ticket.verificated == "verificated" &&
            "bg-green-400 transition ease-in-out"
          }
          ${
            modal_status == false &&
            ticket.verificated !== "verificated" &&
            "transition ease-in-out hover:bg-gray-500"
          }

          ${modal_status == false && event_late == false && "cursor-pointer"}
          `}
          onMouseEnter={() => {
            if (
              modal_status == false &&
              (ticket.verificated == "need_improvement" ||
                ticket.verificated == "rejected")
            ) {
              showDelayedModal(ticket);
            }
          }}
          onMouseLeave={() => {
            if (
              modal_status == false &&
              (ticket.verificated == "need_improvement" ||
                ticket.verificated == "rejected")
            ) {
              hideModal();
            }
          }}
          onClick={() => {
            if (modal_status == false && event_late == false) {
              let ticket_schema = {
                ...ticket,
                default_price: parseFloat(ticket.default_price).toFixed(2),
                price: parseFloat(ticket.price).toFixed(2),
                new_price: parseFloat(ticket.new_price).toFixed(2),
                quantity: ticket.quantity.toString(),
              };
              setOpenModalActions({
                status: true,
                event_id: event_id,
                data: JSON.parse(JSON.stringify(ticket_schema)),
                input: JSON.parse(JSON.stringify(ticket_schema)),
                validated: {
                  new_price: true,
                  ticket_type: true,
                  ticket_details: true,
                  quantity: true,
                },
              });
            }
          }}
        >
          {iconVerificated(ticket.verificated)}
        </div>

        <div
          className={`flex flex-col h-auto items-center justify-center w-1/5 ${
            ticket.price == ticket.new_price && "space-y-1"
          }`}
        >
          {ticket.default_price !== ticket.new_price && (
            <span className="h-auto line-through decoration-red-400 font-mukta text-xs text-center text-gray-400">
              {`${parseFloat(ticket.default_price).toFixed(2)} zł`}
            </span>
          )}
          {ticket.default_price !== ticket.price &&
            ticket.price !== ticket.new_price && (
              <span className="h-auto line-through decoration-red-400 font-mukta text-xs text-center text-gray-300">
                {`${parseFloat(ticket.price).toFixed(2)} zł`}
              </span>
            )}
          <span className="h-auto font-mukta text-xs text-center text-gray-200">
            {`${parseFloat(ticket.new_price).toFixed(2)} zł`}
          </span>
        </div>
        <div className="flex h-auto items-center justify-center w-1/5">
          <span className="h-auto font-mukta text-xs text-center text-gray-200">
            {ticket.ticket_type}
          </span>
        </div>
        <div className="flex h-auto items-center justify-center w-1/5">
          <span className="h-auto font-mukta text-xs text-center text-gray-200">
            {ticket.ticket_details}
          </span>
        </div>
        <div className="flex h-auto items-center justify-center w-1/5">
          <span className="h-auto font-mukta text-xs text-center text-gray-200">
            {`${ticket.quantity} (${ticket.reserved_tickets})`}
          </span>
        </div>
      </div>
    );
  }

  function modalValidationSame(was_allowed) {
    if (
      (openModalActions.data.new_price ==
        parseFloat(openModalActions.input.new_price).toFixed(2) &&
        openModalActions.data.ticket_type ==
          openModalActions.input.ticket_type &&
        openModalActions.data.ticket_details ==
          openModalActions.input.ticket_details &&
        openModalActions.data.quantity == openModalActions.input.quantity) ||
      openModalActions.data.reserved_tickets >
        parseInt(openModalActions.input.quantity) ||
      (was_allowed &&
        parseFloat(openModalActions.data.price) <
          parseFloat(openModalActions.input.new_price))
    ) {
      return false;
    } else {
      return true;
    }
  }

  function ticketInput(form_data, id, modal_status, setInputTicket) {
    let was_allowed = form_data.data?.was_allowed;

    return (
      <form
        className={`flex flex-row min-h-[48px] divide-x-2 w-full
        ${modal_status ? "divide-blue-200" : "divide-blue-400"}`}
        onSubmit={(e) => handleFormConfirm(e, form_data, id, modal_status)} //
      >
        <button
          type="submit"
          disabled={
            Object.values(form_data.validated).some(
              (validate) => validate === false
            ) || (modal_status ? !modalValidationSame(was_allowed) : false)
          }
          value="Submit"
          className={`flex group cursor-pointer h-12 items-center justify-center transition ease-in-out hover:bg-gray-500 disabled:cursor-not-allowed ${
            was_allowed && modal_status == true ? "w-1/3" : "w-1/5"
          }`}
        >
          <PlusCircleIcon
            className={`block h-8 w-8 transition ease-in-out group-hover:scale-110
        ${
          Object.values(form_data.validated).some(
            (validate) => validate === false
          ) || (modal_status ? !modalValidationSame(was_allowed) : false)
            ? "text-gray-500 group-hover:text-gray-400"
            : "text-green-400"
        }
        `}
          ></PlusCircleIcon>
        </button>

        <div
          className={`flex flex-row h-12 items-center justify-center ${
            was_allowed && modal_status == true ? "w-1/3" : "w-1/5"
          }`}
        >
          <input
            type="text"
            id="createTicketPriceInput"
            name="new_price"
            value={form_data.input.new_price}
            onChange={(e) =>
              handleValueChange(e, modal_status, id, setInputTicket)
            }
            placeholder={`${
              was_allowed
                ? `5.00 - ${form_data.data.price} zł`
                : "Cena (min. 5.00 zł)"
            }`}
            className={`${
              form_data.input.new_price !== "" ? "w-[83px]" : "w-full"
            } h-full text-gray-200 border-0 text-center bg-transparent font-mukta text-xs focus:ring-0`}
            autoComplete="false"
          ></input>
          {form_data.input.new_price !== "" && (
            <p className="text-center text-gray-200 -ml-2 font-mukta text-xs ">
              zł
            </p>
          )}
        </div>
        {!(was_allowed && modal_status == true) && (
          <div className="flex h-12 items-center justify-center w-1/5">
            <input
              type="text"
              id="createTicketTypeInput"
              name="ticket_type"
              maxLength={10}
              value={form_data.input.ticket_type}
              onChange={(e) =>
                handleValueChange(e, modal_status, id, setInputTicket)
              }
              placeholder="Rodzaj biletu (min. 3 znaki)"
              className="w-full h-full text-gray-200 border-0 text-center bg-transparent font-mukta text-xs focus:ring-0"
              autoComplete="false"
            ></input>
          </div>
        )}
        {!(was_allowed && modal_status == true) && (
          <div className="flex h-12 items-center justify-center w-1/5">
            <input
              type="text"
              id="createTicketDetailsInput"
              name="ticket_details"
              maxLength={40}
              value={form_data.input.ticket_details}
              onChange={(e) =>
                handleValueChange(e, modal_status, id, setInputTicket)
              }
              placeholder="Opis biletu (min. 3 znaki)"
              className="w-full h-full text-gray-200 border-0 text-center bg-transparent font-mukta text-xs focus:ring-0"
              autoComplete="false"
            ></input>
          </div>
        )}
        <div
          className={`flex h-12 items-center justify-center ${
            was_allowed && modal_status == true ? "w-1/3" : "w-1/5"
          }`}
        >
          <input
            type="text"
            id="createTicketQuantityInput"
            name="quantity"
            placeholder={"Ilość (min. 1)"}
            value={form_data.input.quantity}
            onChange={(e) =>
              handleValueChange(e, modal_status, id, setInputTicket)
            }
            className="w-full h-full text-gray-200 border-0 text-center bg-transparent font-mukta text-xs focus:ring-0"
            autoComplete="false"
          ></input>
        </div>
      </form>
    );
  }

  // VALIDACJA I HANDLERY

  function validatorInputTicket(name, value) {
    switch (name) {
      case "new_price":
        if (parseFloat(value) >= 5) {
          return true;
        } else {
          return false;
        }
        break;

      case "quantity":
        if (parseInt(value) >= 1) {
          return true;
        } else {
          return false;
        }
        break;

      case "ticket_type":
        if (value.length > 2) {
          return true;
        } else {
          return false;
        }
        break;

      case "ticket_details":
        if (value.length > 2) {
          return true;
        } else {
          return false;
        }
      default:
        break;
    }
  }

  const handleValueChange = (e, modal_status, id, setInputTicket) => {
    let setState;
    if (modal_status) {
      setState = setOpenModalActions;
    } else {
      setState = setInputTicket;
    }

    setState((prevState) => {
      let updatedState = { ...prevState };
      let input;

      if (e.target.name == "quantity") {
        let input_regex = e.target.value.match(/[1-9]{1}\d*/g);

        if (input_regex !== null) {
          document.getElementById("createTicketQuantityInput").value =
            input_regex[0];
          input = input_regex[0];
        } else {
          document.getElementById("createTicketQuantityInput").value = "";
          input = "";
        }
      } else if (e.target.name == "new_price") {
        let input_regex = e.target.value.match(
          /([1-9]{1}\d*)(\.{0,1}\d{0,2})/g
        );

        if (input_regex !== null) {
          document.getElementById("createTicketPriceInput").value =
            input_regex[0];

          input = input_regex[0];
        } else {
          document.getElementById("createTicketPriceInput").value = "";
          input = "";
        }
      } else if (
        e.target.name == "ticket_type" ||
        e.target.name == "ticket_details"
      ) {
        input = e.target.value;
      }

      if (modal_status) {
        updatedState.input[e.target.name] = input;

        updatedState.validated[e.target.name] = validatorInputTicket(
          e.target.name,
          input
        );
      } else {
        updatedState[id].input[e.target.name] = input;

        updatedState[id].validated[e.target.name] = validatorInputTicket(
          e.target.name,
          input
        );
      }

      return updatedState;
    });
  };

  function handleFormConfirm(e, form_data, id, modal_status) {
    e.preventDefault();

    if (
      !Object.values(form_data.validated).some((validate) => validate === false)
    ) {
      if (modal_status == false) {
        dispatch(ticket_create(id, form_data.input, xcsrftoken));
      } else if (modalValidationSame()) {
        dispatch(
          ticket_edit(
            id,
            form_data.event_id,
            form_data.input,
            form_data.data.edit_time,
            xcsrftoken
          )
        );
      }
    }
  }

  function eventCreatedModule(
    event,
    inputTicket,
    setInputTicket,
    eventRender,
    key
  ) {
    return (
      <div
        className="flex flex-col space-y-3 items-center md:flex-row md:space-y-0 md:items-start md:space-x-3 justify-center w-full h-auto py-4"
        key={key}
      >
        {eventRender(event)}
        <div
          className={`flex grow flex-col h-auto divide-y-2 border-2 rounded-lg h-auto overflow-hidden ${
            event.current ? "border-blue-400" : "border-zinc-800"
          } ${
            event.tickets.length > 0 ? "divide-blue-200" : "divide-blue-400"
          }`}
        >
          <div
            className={`flex flex-col w-full h-auto divide-y-2 ${
              event.current ? "divide-blue-400" : "divide-zinc-800"
            }`}
          >
            {event.tickets.length > 0 ? (
              event.tickets.map((ticket) =>
                ticketModule(ticket, false, event.id, !event.current)
              )
            ) : (
              <div className="flex h-[48px] w-full items-center justify-center">
                <span className="h-auto font-mukta text-[16px] text-center text-gray-200">
                  Wydarzenie nie posiada żadnego biletu.
                </span>
              </div>
            )}
          </div>

          {event.current &&
            ticketInput(inputTicket, event.id, false, setInputTicket)}
        </div>
      </div>
    );
  }

  // MODALE

  let initModalInput = {
    status: false,
    event_id: null,
    data: null,
    input: null,
    validated: {
      new_price: true,
      ticket_type: true,
      ticket_details: true,
      quantity: true,
    },
  };

  const [openModalActions, setOpenModalActions] = useState(initModalInput);

  function modalActions(data) {
    let text;
    if (data.verificated == "awaiting") {
      text = "Bilet oczekujący na akceptacje";
    } else if (data.verificated == "need_improvement") {
      text = "Bilet wymaga zmian";
    } else if (data.verificated == "verificated") {
      text = "Zweryfikowany bilet";
    } else if (data.verificated == "rejected") {
      text = "Odrzucony bilet";
    }

    function moduleEdit(data) {
      return (
        <div className="flex h-auto w-full items-center flex-col px-6 py-2 space-y-3">
          <span className="text-sm text-white font-mukta lg:text-lg">
            Wprowadź zmiany
          </span>

          <div
            className={`flex h-auto border-2 border-blue-200 overflow-hidden rounded-lg ${
              data.was_allowed ? "w-auto" : "w-full"
            }`}
          >
            {ticketInput(openModalActions, data.id, true)}
          </div>
        </div>
      );
    }

    function moduleDelete(data) {
      return (
        <div className="flex h-auto w-full items-center justify-center">
          <button
            onClick={() =>
              dispatch(
                ticket_delete(data.id, openModalActions.event_id, xcsrftoken)
              )
            }
            className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 px-6 py-2.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-red-300 hover:bg-gradient-to-br"
          >
            Usuń bilet
          </button>
        </div>
      );
    }

    function moduleVerificationDetails(data) {
      return (
        <div className="flex h-auto flex-col space-y-3 w-2/3 items-center justify-center">
          <span className="text-base text-white font-mukta lg:text-lg">
            Powód braku weryfikacji
          </span>
          <span className="text-sm text-gray-400 font-mukta lg:text-lg">
            {data.verificated_details}
          </span>
        </div>
      );
    }

    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center px-3">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-full flex-col items-center justify-center gap-2 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl lg:gap-7 2xl:w-2/3">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-5">
            <span className="text-sm text-white lg:text-lg">{text}</span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() => setOpenModalActions(initModalInput)}
            />
          </div>
          <div className="flex h-auto w-2/3 border-2 border-blue-400 rounded-lg">
            {ticketModule(data, true)}
          </div>
          {data.verificated_details !== "" && moduleVerificationDetails(data)}
          {data.verificated !== "rejected" && moduleEdit(data)}

          {data.was_allowed == false && data.verificated !== "rejected" && (
            <div className="flex h-auto w-full items-center justify-center px-6">
              <span className="text-sm text-white font-mukta lg:text-lg">
                Lub
              </span>
            </div>
          )}

          {data.was_allowed == false && moduleDelete(data)}

          <div className="flex pb-5 pt-8">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                setOpenModalActions(initModalInput);
              }}
            >
              Zamknij
            </button>
          </div>
        </div>
      </div>
    );
  }

  function renderSalaryInfo(event, eventRender) {
    function statusPaid(
      earn_cancel,
      current,
      paid_out,
      earn_something,
      paycheck_attachments
    ) {
      if (earn_cancel) {
        return (
          <div className="flex flex-row h-full items-center space-x-1">
            <div className={`block shrink-0 h-3 w-3 bg-red-600 rounded-full`} />
            <span className="h-auto text-center font-mukta text-sm text-gray-400">
              Wypłata za ten wydarzenie została zablokowana, a środki z tego
              wydarzenia zostały przekazane do zwrócenia dla kupujących.
            </span>
          </div>
        );
      } else if (current) {
        return (
          <div className="flex flex-row h-full items-center space-x-1">
            <div className={`block h-3 w-3 bg-green-400 rounded-full`} />
            <span className="h-auto font-mukta text-sm text-gray-400">
              Aktywne
            </span>
          </div>
        );
      } else if (paid_out) {
        return (
          <>
            <div className="flex pb-2 flex-row h-full  items-center space-x-1">
              <CheckCircleIcon className={`block h-4 w-4 text-green-400`} />
              <span className="h-auto font-mukta text-sm text-gray-400">
                Wypłacone
              </span>
            </div>

            <div
              className="flex flex-row h-8 w-32 rounded-xl items-center justify-between p-1 bg-green-400 transition ease-in-out hover:scale-110 cursor-pointer group"
              onClick={() => {
                dispatch(payment_confirmation_pdf(paycheck_attachments.id));
              }}
            >
              <CurrencyDollarIcon
                className={`block shrink-0 h-6 w-6 text-white group-hover:scale-110 transition ease-in-out`}
              />

              <div className="flex h-full grow items-center justify-center">
                <span className="h-autofont-mukta text-xs text-white group-hover:scale-110 transition ease-in-out">
                  Potwierdzenie
                </span>
              </div>
            </div>
            <span className="h-autofont-mukta text-[9px] text-gray-500">
              {paycheck_attachments.file.match(/[^/]+$/)[0]}
            </span>
          </>
        );
      } else if (earn_something) {
        return (
          <div className="flex flex-row h-full  items-center space-x-1">
            <ClockIcon className={`block h-4 w-4 text-yellow-400`} />
            <span className="h-auto font-mukta text-sm text-gray-400">
              Oczekiwanie na przelew
            </span>
          </div>
        );
      } else {
        return (
          <div className="flex flex-row h-full  items-center space-x-1">
            <span className="h-auto font-mukta text-sm text-gray-400">
              Brak zarobków
            </span>
          </div>
        );
      }
    }

    return (
      <>
        {eventRender(event)}

        <div className="flex flex-col divide-y-2 divide-zinc-700 w-full h-auto">
          {event.tickets.map((ticket, index) => (
            <div
              className={`flex divide-y-2 divide-zinc-900 bg-zinc-800 flex-col w-full h-auto ${
                index == 0 && "rounded-t-xl"
              }`}
              key={index}
            >
              <div className="flex flex-row p-3 w-full items-center justify-between">
                <span className="h-auto font-mukta text-sm sm:text-base text-gray-100">
                  {ticket.ticket_type}
                </span>

                <span className="h-auto font-mukta text-xs sm:text-sm text-gray-100">
                  {`Zajętych ${ticket.reserved}/${ticket.quantity}`}
                </span>
              </div>

              {/* ///////////// */}

              <div className="flex flex-row w-full divide-x-2 divide-zinc-900 h-auto justify-between">
                <div className="flex p-3 flex-col space-y-2 h-auto">
                  <div className="flex flex-col h-auto">
                    {ticket.statistics.sold_tickets.map(
                      (sold_ticket, sold_key) => (
                        <div
                          className="flex w-full justify-start"
                          key={sold_key}
                        >
                          <span className="h-auto font-mukta text-sm sm:text-base text-green-400">
                            {`${sold_ticket.count}   x   ${sold_ticket.purchase_price} zł = ${sold_ticket.total} zł`}
                          </span>
                        </div>
                      )
                    )}
                  </div>

                  {/* ///////////// */}

                  <div className="flex flex-col w-full h-auto">
                    {ticket.statistics.refunded_tickets.map(
                      (sold_ticket, sold_key) => (
                        <div
                          className="flex w-full justify-start"
                          key={sold_key}
                        >
                          <span className="h-auto font-mukta text-sm sm:text-base text-red-400">
                            {`${sold_ticket.count}   x   ${sold_ticket.purchase_price} zł = ${sold_ticket.total} zł`}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
                <div className="flex w-[100px] py-2 h-auto items-center justify-start flex-col">
                  <span className="h-auto font-mukta text-sm sm:text-base text-gray-300">
                    SUMA
                  </span>
                  <span className="h-auto font-mukta text-sm sm:text-base text-green-400">
                    {`+ ${ticket.statistics.earn} zł`}
                  </span>
                  <span className="h-auto font-mukta text-sm sm:text-base text-red-400">
                    {`- ${ticket.statistics.refund} zł`}
                  </span>
                </div>
              </div>
            </div>
          ))}

          <div className="flex flex-row w-full rounded-b-xl justify-between p-3 bg-gray-700 h-auto">
            <div className="flex flex-col space-y-1 items-start">
              <span className="h-auto font-mukta text-base text-gray-300">
                PODSUMOWANIE
              </span>

              {statusPaid(
                event.earn_cancel,
                event.current,
                event.paid_out,
                event.earn > 0,
                event.paycheck_attachments
              )}
            </div>

            {event.earn_cancel == false && event.earn > 0 && (
              <div className="flex flex-col divide-y-2 divide-zinc-900 items-end justify-end">
                <div className="flex flex-col justify-end items-end">
                  <span className="h-auto font-mukta text-base text-green-400">
                    {`${event.earn} zł`}
                  </span>
                  <div className="flex flex-row items-center space-x-2">
                    <span className="h-auto font-mukta text-xs text-gray-500">
                      (serwis)
                    </span>
                    <span className="h-auto font-mukta text-base text-gray-400">
                      x 0.95
                    </span>
                  </div>
                </div>
                <span className="h-auto font-mukta text-base text-green-400">
                  {`= ${(event.earn * 0.95).toFixed(2)} zł`}
                </span>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }

  function createdCategory(events, inputTicket, setInputTicket, eventRender) {
    if (user.pinned_bank) {
      if (events.created.data.length > 0) {
        return (
          <div className="flex h-full flex-col-reverse lg:flex-row w-full overflow-hidden rounded-b-xl">
            <div className="flex h-1/2 lg:h-full w-full lg:w-3/4 bg-gray-600">
              <Scrollbars
                renderThumbVertical={({ style, props }) => (
                  <div
                    {...props}
                    style={{
                      ...style,
                      backgroundColor: "#000",
                      width: "4px",
                      opacity: "0.6",
                    }}
                  ></div>
                )}
                renderView={({ style, props }) => (
                  <div
                    {...props}
                    style={{ ...style }}
                    id="scrollableDivCreated"
                  ></div>
                )}
              >
                <InfiniteScroll
                  dataLength={events.created.data.length}
                  next={() => {
                    dispatch(
                      events_via_tickets(
                        "created",
                        events.created.meta.links.next
                      )
                    );
                  }}
                  hasMore={events.created.meta.links.next !== null}
                  scrollableTarget="scrollableDivCreated"
                >
                  <div className="flex flex-col divide-y-2 divide-gray-700 md:divide-y-0 h-full w-full p-4">
                    {events.created.data.map((event, event_key) => {
                      if (inputTicket[event.id] !== undefined) {
                        return eventCreatedModule(
                          event,
                          inputTicket[event.id],
                          setInputTicket,
                          eventRender,
                          event_key
                        );
                      }
                    })}
                  </div>
                </InfiniteScroll>
              </Scrollbars>
            </div>

            <div className="flex flex-col h-1/2 lg:h-full w-full lg:w-1/4 bg-zinc-700 ">
              <div className="flex flex-col h-[90px] lg:h-[150px] bg-zinc-800 items-center w-full drop-shadow-2xl">
                <div className="flex w-full px-4">
                  <select
                    id="yearCalendarPageSelect"
                    name="year"
                    value={selectDate.year}
                    onChange={handleMonthChange}
                    className="w-full text-xs lg:text-base rounded-md border-2 mt-2 lg:mt-4 border-blue-400 bg-transparent font-mukta text-gray-100"
                  >
                    {yearOptions}
                  </select>
                </div>

                <Scrollbars
                  renderThumbHorizontal={({ style, props }) => (
                    <div
                      {...props}
                      style={{
                        ...style,
                        backgroundColor: "#000",
                        width: "4px",
                        opacity: "0.6",
                      }}
                    ></div>
                  )}
                >
                  <div className="flex flex-row p-2 lg:p-4 gap-4">
                    {Object.keys(months).map((month) => (
                      <button
                        key={month}
                        name="month"
                        value={month}
                        onClick={handleMonthChange}
                        className={`${
                          selectDate.month == month
                            ? "bg-gray-600"
                            : "bg-transparent hover:bg-gray-700"
                        } rounded-md border-2 border-blue-400 px-1 py-1 lg:py-2 text-center font-mukta text-gray-100 sm:w-auto sm:px-4 text-xs lg:text-base`}
                      >
                        {months[month]}
                      </button>
                    ))}
                  </div>
                </Scrollbars>
              </div>
              <div className="flex w-full grow">
                {events.calendar.data.length > 0 ? (
                  <Scrollbars
                    renderThumbVertical={({ style, props }) => (
                      <div
                        {...props}
                        style={{
                          ...style,
                          backgroundColor: "#000",
                          width: "4px",
                          opacity: "0.6",
                        }}
                      ></div>
                    )}
                    renderView={({ style, props }) => (
                      <div
                        {...props}
                        style={{ ...style }}
                        id="scrollableDivSalary"
                      ></div>
                    )}
                  >
                    <InfiniteScroll
                      dataLength={events.calendar.data.length}
                      next={() => {
                        dispatch(
                          tickets_calendar(
                            events.calendar.meta.links.next,
                            selectDate.year,
                            selectDate.month
                          )
                        );
                      }}
                      hasMore={events.calendar.meta.links.next !== null}
                      scrollableTarget="scrollableDivSalary"
                    >
                      <div className="flex divide-y-2 divide-zinc-800 flex-col h-full w-full items-center">
                        {events.calendar.data.map((event) => (
                          <div
                            className="flex flex-col space-y-4 items-center w-full h-auto p-4"
                            key={event.id}
                          >
                            {renderSalaryInfo(event, eventRender)}
                          </div>
                        ))}
                        <div className="flex w-full grow bg-zinc-800"></div>
                      </div>
                    </InfiniteScroll>
                  </Scrollbars>
                ) : (
                  <div className="flex w-full h-full items-center lg:items-start justify-center bg-zinc-800">
                    <span className="h-auto font-mukta px-4 lg:pt-4 text-center text-lg text-gray-100">
                      Brak przychodów w tym miesiącu
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="flex w-full h-full p-16 items-center justify-center bg-gray-600">
            <span className="h-auto font-mukta text-center text-base sm:text-2xl text-gray-100">
              Nie masz żadnych nierozliczonych starych wydarzeń oraz nowych
              zweryfikowanych wydarzeń. Stwórz nowe wydarzenie i poczekaj na
              jego weryfikacje, aby przypiąć do niego bilety do kupienia !
            </span>
          </div>
        );
      }
    } else {
      return (
        <div className="flex w-full h-full p-16 items-center justify-center bg-gray-600">
          <span className="h-auto font-mukta text-center text-base sm:text-2xl text-gray-100">
            Do zarządzania biletami w Twoich wydarzeniach, wpierw musisz
            podłączyć konto bankowe do profilu. Przejdź do ustawień, aby
            odblokować możliwość zarządzania biletami.
          </span>
        </div>
      );
    }
  }

  return [
    createdCategory,
    showPopup,
    modalPopup,
    setOpenModalActions,
    openModalActions,
    initModalInput,
    modalActions,
  ];
}
export default useMyTicketsPageCreated;
