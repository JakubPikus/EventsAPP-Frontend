import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getXCSRFToken, getUser } from "../selectors";
import InfiniteScroll from "react-infinite-scroll-component";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  CheckCircleIcon,
  XIcon,
  ExclamationIcon,
  MinusCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/solid";
import {
  ticket_generate_pdf,
  ticket_refund,
  ordered_ticket_action,
  events_via_tickets,
  payment_confirmation_pdf,
} from "../actions/data";
import moment, { updateLocale } from "moment";
moment.locale("pl");

function useMyTicketsPageBought() {
  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);

  const user = useSelector(getUser);

  let initOpenRefund = {
    status: false,
    data: null,
    event_id: null,
    order_id: null,
    ticket_id: null,
  };

  const [openRefund, setOpenRefund] = useState(initOpenRefund);

  let initOrderCancel = {
    status: false,
    data: [],
    event_id: null,
    order_id: null,
    ticket_id: null,
    orderedticket_ids: [],
  };

  const [openOrderCancel, setOpenOrderCancel] = useState(initOrderCancel);

  const [blockedPay, setBlockedPay] = useState(false);

  function orderedCategory(
    orders,
    unpayedTickets,
    setUnpayedTickets,
    eventRender
  ) {
    if (orders.data.length > 0) {
      return (
        <div className="flex h-full flex-row w-full  items-center overflow-hidden rounded-b-xl bg-gray-600">
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
                id="scrollableDivBought"
              ></div>
            )}
          >
            <InfiniteScroll
              dataLength={orders.data.length}
              next={() => {
                dispatch(events_via_tickets("bought", orders.meta.links.next));
              }}
              hasMore={orders.meta.links.next !== null}
              scrollableTarget="scrollableDivBought"
            >
              <div className="flex flex-col">
                {!user.pinned_bank && (
                  <span className="h-auto font-mukta text-center text-xl pt-8 text-gray-100">
                    ! Aby odblokować możliwość zwrotów biletów, wpierw musisz
                    połączyć swoje konto bankowe w ustawieniach !
                  </span>
                )}

                <div className="flex flex-col divide-y-2 divide-gray-700 lg:divide-y-0 h-full w-full items-center px-2 md:px-4 py-4">
                  {orders.data.map((order) =>
                    ordersModule(
                      order,
                      unpayedTickets,
                      setUnpayedTickets,
                      eventRender
                    )
                  )}
                </div>
              </div>
            </InfiniteScroll>
          </Scrollbars>
        </div>
      );
    } else {
      return (
        <div className="flex w-full h-full p-16 items-center justify-center bg-gray-600">
          <span className="h-auto font-mukta text-center text-base sm:text-2xl text-gray-100">
            Nie masz żadnych zamówionych biletów.
          </span>
        </div>
      );
    }
  }

  function ordersModule(order, unpayedTickets, setUnpayedTickets, eventRender) {
    function ticketStatus(
      paid,
      id,
      used,
      refunded,
      paid_out,
      purchase_price,
      unpayedTickets,
      setUnpayedTickets
    ) {
      if (!paid) {
        return (
          <input
            type="checkbox"
            name="report"
            value={id}
            checked={Object.keys(unpayedTickets).includes(id.toString())}
            onChange={(e) =>
              setUnpayedTickets((prevState) => {
                let updatedState = { ...prevState };

                if (Object.keys(updatedState).includes(id.toString())) {
                  delete updatedState[id];
                } else {
                  updatedState[id] = purchase_price;
                }

                return updatedState;
              })
            }
          ></input>
        );
      } else if (refunded) {
        if (paid_out) {
          return (
            <span
              className={`h-auto font-mukta text-center text-[9px] sm:text-xs py-1 sm:px-1 text-green-400`}
            >
              Wypłacone na konto
            </span>
          );
        } else if (!user.pinned_bank) {
          return (
            <span
              className={`h-auto font-mukta text-center text-[9px] sm:text-xs py-1 sm:px-1 text-zinc-400`}
            >
              Podłącz w ustawieniach konto bankowe aby otrzymać zwrot
            </span>
          );
        } else {
          return (
            <span
              className={`h-auto break-anywhere font-mukta text-center text-[9px] sm:text-xs py-1 sm:px-1 text-orange-500`}
            >
              Oczekiwanie na zwrot kwoty
            </span>
          );
        }
      } else if (used) {
        return (
          <MinusCircleIcon className={`block shrink-0 h-4 w-4 text-red-500`} />
        );
      } else {
        return (
          <CheckCircleIcon
            className={`block shrink-0 h-4 w-4 text-green-400`}
          />
        );
      }
    }

    function ticketAction(
      paid,
      ticket,
      event_id,
      order_id,
      ticketgroup_id,
      expired_refund
    ) {
      if (!paid) {
        return (
          <button
            className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-5 py-0.5 text-white font-semibold hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
            onClick={() => {
              setOpenOrderCancel({
                status: true,
                data: [ticket],
                event_id: event_id,
                order_id: order_id,
                ticket_id: ticketgroup_id,
                orderedticket_ids: [ticket.id],
              });
            }}
          >
            Usuń
          </button>
        );
      } else if (ticket.refunded) {
        return (
          <span className="h-auto font-mukta text-center text-[9px] sm:text-xs text-orange-400 py-1 sm:px-1">
            Zwrócono
          </span>
        );
      } else if (ticket.used) {
        return (
          <span className="h-auto break-anywhere font-mukta text-center text-[9px] sm:text-xs text-gray-300 py-1 sm:px-1">
            {`Użyty${
              ticket.used_time !== null
                ? ` ${moment(ticket.used_time).format("L LTS")}`
                : ``
            }`}
          </span>
        );
      } else {
        return (
          <div
            className={`flex flex-col space-y-2 2xl:space-y-0 2xl:flex-row w-full px-1 sm:px-3 ${
              user.pinned_bank && !expired_refund
                ? "justify-around space-x-0 2xl:space-x-2"
                : "justify-center"
            }`}
          >
            <button
              className="rounded-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-[9px] sm:text-xs  px-2 py-0.5 text-white font-semibold hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => {
                dispatch(
                  ticket_generate_pdf(order_id, ticketgroup_id, ticket.id)
                );
              }}
            >
              Pobierz
            </button>
            {user.pinned_bank && !expired_refund && (
              <button
                className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 text-[9px] sm:text-xs  px-2 text-white  font-semibold hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={() => {
                  setOpenRefund({
                    status: true,
                    data: ticket,
                    event_id: event_id,
                    order_id: order_id,
                    ticket_id: ticketgroup_id,
                  });
                }}
              >
                Zwróć
              </button>
            )}
          </div>
        );
      }
    }

    return (
      <div
        className="flex flex-col h-auto w-full items-center justify-center space-y-4 md:w-11/12 lg:space-y-0 lg:flex-row lg:space-x-8 lg:items-start py-8"
        key={order.id}
      >
        {eventRender(order.event)}
        <div
          className={`flex w-full flex-col space-y-2 h-auto border-2 rounded-lg overflow-hidden border-blue-400
          ${
            order.event.verificated !== "verificated" &&
            !order.is_paid &&
            "bg-red-400"
          }
          ${
            order.event.verificated == "verificated" &&
            !order.is_paid &&
            "bg-gray-500"
          } 
          ${order.is_paid && "bg-gray-700"}`}
        >
          <div className="flex flex-col p-4 h-auto w-full">
            <span
              className={`h-auto font-mukta text-center text-base ${
                order.is_paid ? "text-gray-400" : "text-gray-300"
              }`}
            >
              {`Złożono zamówienie - ${moment(order.stripe_created_at).format(
                "LLL"
              )}`}
            </span>

            {order.is_paid ? (
              <div className="flex flex-row w-full pt-2 items-center justify-center space-x-2">
                <CheckCircleIcon className={`block h-4 w-4 text-green-400`} />
                <span className="h-auto font-mukta text-center text-lg text-green-500">
                  {`Zapłacono${
                    order.paid_time !== null
                      ? ` - ${moment(order.paid_time).format("LLL")}`
                      : ``
                  }`}
                </span>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 pt-2">
                <div className="flex flex-row w-full items-center justify-center space-x-2">
                  <ExclamationIcon
                    className={`block h-6 w-6 text-yellow-400`}
                  />
                  <span className="h-auto font-mukta text-center text-lg text-yellow-500">
                    {`Wygaśnięcie zamówienia - ${moment(
                      order.order_expires_at
                    ).format("LLL")} (${moment(
                      order.order_expires_at
                    ).fromNow()})   !`}
                  </span>
                </div>
              </div>
            )}

            {order.awaitings_refund_amount !== null && !user.pinned_bank && (
              <div className="flex pt-2 px-4 flex-col space-y-2">
                <span className="h-auto font-mukta text-center text-xl text-red-500">
                  ! UWAGA !
                </span>

                <span className="h-auto font-mukta text-center text-base text-red-400">
                  Wydarzenie, na które kupiłeś bilety zostało anulowane. W danej
                  chwili nie masz żadnego podpiętego numeru bankowego, aby
                  zwrócić na nie Twoją należność. Podłącz konto bankowe w
                  ustawieniach.
                </span>
                <span className="h-auto font-mukta text-center text-base text-red-400">
                  {`Kwota: +${order.awaitings_refund_amount} zł`}
                </span>
              </div>
            )}

            {order.stripe_refund_order !== null && (
              <div className="flex pt-2 flex-col space-y-2">
                <span className="h-auto font-mukta text-center text-base text-gray-400">
                  Wydarzenie zostało anulowane przez administracje. Pieniądze
                  zostaną zwrócone na konto, z którego została wykonana
                  płatność.
                </span>
                <div className="flex flex-row px-2 w-full items-center justify-center space-x-2">
                  <ExclamationIcon
                    className={`block shrink-0 h-6 w-6 text-yellow-400`}
                  />
                  <span className="h-auto font-mukta text-center text-lg text-yellow-500">
                    {`Zwrócono ${
                      order.stripe_refund_order !== null
                        ? ` - ${moment(order.stripe_refund_order).format(
                            "LLL"
                          )}`
                        : ``
                    }`}
                  </span>
                </div>
              </div>
            )}

            {order.event.verificated !== "verificated" && !order.is_paid && (
              <>
                <span className="h-auto font-mukta pt-4 text-center text-2xl text-yellow-500">
                  ! UWAGA !
                </span>
                <span className="h-auto font-mukta px-2 pt-4 text-center text-base text-yellow-500">
                  Zamówienie zostało złożone w momencie gdy te wydarzenie było
                  "zweryfikowane". Z różnych przyczyn administracja zmieniła
                  stan tego wydarzenia na "niezweryfikowane". Od tego czasu nie
                  można składać zamówień na nowe bilety w tym wydarzeniu, jednak
                  twoje bilety są dalej zarezerwowane. W przypadku ich opłaty
                  przed wygaśnięciem zamówienia, będziesz w ich posiadaniu, a
                  gdy organizator nie poczyni kroków do jego ponownej
                  weryfikacji, pieniądze zostaną zwrócone. Przed dokonaniem
                  decyzji, nie możesz składać zamówienia na inne wydarzenia.
                </span>
              </>
            )}
          </div>

          <div className="flex flex-col divide-y-2 w-full divide-blue-400">
            <div className="flex flex-col w-full space-y-5 pb-4 px-2 md:px-8">
              {order.tickets.map((ticket, key) => (
                <div
                  className="flex flex-col h-auto w-full rounded-b-lg rounded-t-xl overflow-hidden bg-gray-600"
                  key={key}
                >
                  <div className="flex h-8 w-full items-center justify-start bg-blue-400 px-2">
                    <span className="h-auto font-mukta text-start text-base text-gray-100">
                      {ticket.ticket_type}
                    </span>
                  </div>

                  <div className="flex flex-col divide-y-2 divide-blue-400 rounded-b-lg border-2 border-blue-400">
                    <div className="flex flex-row divide-x-2 divide-blue-400 h-auto h-6 w-full">
                      <span className="h-auto break-anywhere font-mukta text-center w-1/4 sm:w-1/3 text-xs text-gray-500 py-1 sm:px-1">
                        Imię i nazwisko
                      </span>

                      <span className="h-auto font-mukta text-center w-1/6 text-xs text-gray-500 py-1 sm:px-1">
                        Data urodzenia
                      </span>

                      <span
                        className={`h-auto font-mukta text-center w-1/6 text-xs w-1/6 text-gray-500 py-1 sm:px-1 text-gray-500`}
                      >
                        Cena zakupu
                      </span>

                      <span
                        className={`h-auto font-mukta text-center w-1/6 text-xs w-1/6 text-gray-500 py-1 sm:px-1 text-gray-500`}
                      >
                        Status
                      </span>
                      <span
                        className={`h-auto font-mukta w-1/4 sm:w-1/6 text-center text-xs w-1/6 text-gray-100 py-1 sm:px-1 text-gray-500`}
                      >
                        Akcja
                      </span>
                    </div>

                    {ticket.details.map((person, person_key) => (
                      <div
                        className="flex flex-row divide-x-2 divide-blue-400 h-auto h-8 w-full"
                        key={person_key}
                      >
                        <span className="h-auto break-anywhere font-mukta text-center w-1/4 sm:w-1/3 text-[9px] sm:text-sm 2xl:text-base text-gray-100 py-1 sm:px-1">
                          {`${person.first_name} ${person.last_name}`}
                        </span>

                        <span className="h-auto font-mukta text-center w-1/6 text-[9px] sm:text-sm 2xl:text-base text-gray-100 py-1 sm:px-1">
                          {person.date_of_birth}
                        </span>

                        <span
                          className={`h-auto font-mukta text-center text-[9px] sm:text-sm 2xl:text-base w-1/6 text-gray-100 py-1 sm:px-1 ${
                            ticket?.new_price
                              ? "text-green-500"
                              : "text-gray-100"
                          }`}
                        >
                          {`${person.purchase_price.toFixed(2)} zł`}
                        </span>

                        <div className="flex w-1/6 items-center justify-center py-1 sm:px-1">
                          {ticketStatus(
                            order.is_paid,
                            person.id,
                            person.used,
                            person.refunded,
                            person.paid_out,
                            person.purchase_price,
                            unpayedTickets,
                            setUnpayedTickets
                          )}
                        </div>
                        <div className="flex w-1/4 sm:w-1/6 items-center justify-center py-1 sm:px-1">
                          {ticketAction(
                            order.is_paid,
                            person,
                            order.event.id,
                            order.id,
                            ticket.id,
                            order.expired_refund
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {order.paycheck_attachments.length > 0 && (
              <div className="flex flex-col space-y-2 h-auto w-full overflow-hidden p-2 bg-zinc-700">
                <span className="h-auto font-mukta text-start text-base text-gray-100">
                  Płatności za zwroty
                </span>

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
                  style={{ width: "100%", height: 135 }}
                >
                  <div className="flex flex-row divide-x-2 divide-gray-500">
                    {order.paycheck_attachments.map(
                      (paycheck_attachment, attachment_key) => (
                        <div
                          className="flex flex-col items-center space-y-1 pt-2 px-4"
                          key={attachment_key}
                        >
                          <div
                            className="flex flex-row h-8 w-32 rounded-xl items-center justify-between p-1 bg-green-400 cursor-pointer"
                            onClick={() => {
                              dispatch(
                                payment_confirmation_pdf(paycheck_attachment.id)
                              );
                            }}
                          >
                            <CurrencyDollarIcon
                              className={`block shrink-0 h-6 w-6 text-white`}
                            />

                            <div className="flex h-full grow items-center justify-center">
                              <span className="h-autofont-mukta text-xs text-white">
                                Potwierdzenie
                              </span>
                            </div>
                          </div>
                          <span className="h-auto font-mukta text-[9px] text-gray-500">
                            {paycheck_attachment.file.match(/[^/]+$/)[0]}
                          </span>

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
                            style={{ width: "100%", height: 60 }}
                          >
                            <div className="flex w-full items-center flex-col space-y-3 py-1 px-3">
                              {paycheck_attachment.tickets_details.map(
                                (person, person_key) => (
                                  <span
                                    className="h-auto font-mukta text-center text-xs text-gray-400"
                                    key={person_key}
                                  >
                                    {person}
                                  </span>
                                )
                              )}
                            </div>
                          </Scrollbars>
                        </div>
                      )
                    )}
                  </div>
                </Scrollbars>
              </div>
            )}
          </div>

          {!order.is_paid && (
            <div className="flex flex-row space-x-8 h-8 w-auto pb-6 items-center justify-center">
              <button
                className="rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600  px-10 py-1 text-gray-800 font-semibold hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
                onClick={() => {
                  if (!blockedPay) {
                    setBlockedPay(true);
                    dispatch(
                      ordered_ticket_action(
                        order.event.id,
                        order.id,
                        null,
                        Object.keys(unpayedTickets),
                        "pay",
                        xcsrftoken
                      )
                    );
                  }
                }}
                disabled={Object.keys(unpayedTickets).length == 0}
              >
                {Object.keys(unpayedTickets).length == 0
                  ? "Zaznacz bilety do opłacenia"
                  : `Opłać zaznaczone (${Object.values(unpayedTickets)
                      .reduce((acc, val) => acc + val, 0)
                      .toFixed(2)} zł)`}
              </button>

              <button
                className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
                onClick={() => {
                  let temp_tickets = [];
                  let temp_ids = [];

                  order.tickets.forEach((ticket_order) => {
                    ticket_order.details.forEach((ticket_detail) => {
                      temp_tickets.push(ticket_detail);
                      temp_ids.push(ticket_detail.id);
                    });
                  });

                  setOpenOrderCancel({
                    status: true,
                    data: temp_tickets,
                    event_id: order.event.id,
                    order_id: order.id,
                    ticket_id: null,
                    orderedticket_ids: temp_ids,
                  });
                }}
              >
                Usuń zamówienie
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  function modalRefund(xcsrftoken) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-5/6 lg:w-2/6 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
            <span className="p-1 text-base text-white md:text-xl">
              Zwracanie biletu
            </span>
            <XIcon
              onClick={() => setOpenRefund(initOpenRefund)}
              className="h-6 w-6 cursor-pointer text-red-400"
            />
          </div>
          <div className="flex w-full h-auto px-8">
            <div className="flex flex-row divide-x-2 border-2 border-blue-400 rounded-xl divide-blue-400 h-auto h-8 w-full">
              <span className="h-auto font-mukta text-center w-1/3 text-base text-gray-100 p-1">
                {`${openRefund.data.first_name} ${openRefund.data.last_name}`}
              </span>

              <span className="h-auto font-mukta text-center w-1/3 text-base text-gray-100 p-1">
                {openRefund.data.date_of_birth}
              </span>

              <span className="h-auto font-mukta text-center text-base w-1/3 text-gray-100 p-1">
                {`${openRefund.data.purchase_price} zł`}
              </span>
            </div>
          </div>

          <div className="flex items-center px-3">
            <span className="text-center font-mukta text-sm text-white md:text-base">
              Jesteś pewny, że chcesz zwrócić ten bilet? Po zaakceptowaniu nie
              będziesz mógł cofnąć swojej decyzji, a w sytuacji gdy
              administrator otworzy bramkę z płatnością, nie będziesz mógł
              zmienić swojego konta bankowego. Przed podjęciem decyzji sprawdź,
              czy Twoje konto bankowe w ustawieniach jest poprawne.
            </span>
          </div>

          <div className="flex">
            <button
              className="rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600  px-10 py-1 text-black hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={() => {
                dispatch(
                  ticket_refund(
                    openRefund.order_id,
                    openRefund.ticket_id,
                    openRefund.data.id,
                    openRefund.event_id,
                    xcsrftoken
                  )
                );
              }}
            >
              Zwróć
            </button>
          </div>

          <span className="text-center font-mukta text-sm text-white md:text-base">
            Lub
          </span>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                setOpenRefund(initOpenRefund);
              }}
            >
              Wyjdź
            </button>
          </div>
        </div>
      </div>
    );
  }

  function modalOrderCancel(xcsrftoken) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-5/6 lg:w-2/6 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
            <span className="p-1 text-base text-white md:text-xl">
              {`${
                openOrderCancel.data.length > 1
                  ? "Usuwanie zamówienia"
                  : "Usuwanie biletu"
              }`}
            </span>
            <XIcon
              onClick={() => setOpenOrderCancel(initOrderCancel)}
              className="h-6 w-6 cursor-pointer text-red-400"
            />
          </div>
          <div className="flex flex-col space-y-2 w-full h-auto px-8">
            {openOrderCancel.data.map((ticket, cancel_key) => (
              <div
                className="flex flex-row divide-x-2 border-2 border-blue-400 rounded-xl divide-blue-400 h-auto h-8 w-full"
                key={cancel_key}
              >
                <span className="h-auto font-mukta text-center w-1/3 text-base text-gray-100 p-1">
                  {`${ticket.first_name} ${ticket.last_name}`}
                </span>

                <span className="h-auto font-mukta text-center w-1/3 text-base text-gray-100 p-1">
                  {ticket.date_of_birth}
                </span>

                <span className="h-auto font-mukta text-center text-base w-1/3 text-gray-100 p-1">
                  {`${ticket.purchase_price} zł`}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center px-3">
            <span className="text-center font-mukta text-sm text-white md:text-base">
              {`${
                openOrderCancel.data.length > 1
                  ? "Jesteś pewny, że chcesz usunąć te zamówienie? Wszystkie bilety z tego zamówienia przestaną być zarezerwowane."
                  : "Jesteś pewny, że chcesz anulować ten bilet? Po anulowaniu ten bilet przestanie być zarezerwowany."
              }`}
            </span>
          </div>

          <div className="flex">
            <button
              className="rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600  px-10 py-1 text-black hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-yellow-300"
              onClick={() => {
                dispatch(
                  ordered_ticket_action(
                    openOrderCancel.event_id,
                    openOrderCancel.order_id,
                    openOrderCancel.ticket_id,
                    openOrderCancel.orderedticket_ids,
                    "cancel",
                    xcsrftoken
                  )
                );
              }}
            >
              Usuń
            </button>
          </div>

          <span className="text-center font-mukta text-sm text-white md:text-base">
            Lub
          </span>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                setOpenOrderCancel(initOrderCancel);
              }}
            >
              Wyjdź
            </button>
          </div>
        </div>
      </div>
    );
  }

  return [
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
  ];
}
export default useMyTicketsPageBought;
