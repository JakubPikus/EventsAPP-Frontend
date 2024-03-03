import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getXCSRFToken, getUser } from "../selectors";
import { Scrollbars } from "react-custom-scrollbars-2";
import Datepicker from "react-tailwindcss-datepicker";
import { ticket_pay } from "../actions/data";
import {
  MinusIcon,
  PlusIcon,
  TrashIcon,
  CreditCardIcon,
  PencilAltIcon,
} from "@heroicons/react/solid";
import moment, { updateLocale } from "moment";
moment.locale("pl");

function useEventTicketsPage() {
  const dispatch = useDispatch();
  const xcsrftoken = useSelector(getXCSRFToken);

  const [quantityTickets, setQuantityTickets] = useState(0);
  const [blockedPay, setBlockedPay] = useState(false);

  const handleValueDatepickerChange = (
    values,
    category,
    ticket_index,
    setPreCart
  ) => {
    setPreCart((prevState) => {
      let updatedState = { ...prevState };
      updatedState[category].tickets[ticket_index].date_of_birth =
        values["startDate"];
      if (values["startDate"] !== null) {
        updatedState[category].tickets[
          ticket_index
        ].validated.date_of_birth = true;
      } else {
        updatedState[category].tickets[
          ticket_index
        ].validated.date_of_birth = false;
      }
      return updatedState;
    });
  };

  const handleInputPreCart = (e, category, ticket_index, setPreCart) => {
    setPreCart((prevState) => {
      let updatedState = { ...prevState };
      updatedState[category].tickets[ticket_index][e.target.name] =
        e.target.value;
      if (e.target.value.length >= 3) {
        updatedState[category].tickets[ticket_index].validated[
          e.target.name
        ] = true;
      } else {
        updatedState[category].tickets[ticket_index].validated[
          e.target.name
        ] = false;
      }
      return updatedState;
    });
  };

  /////////// FUNKCJE DO MANIPULACJI STATEM KONKRETNYCH KOSZYKÓW

  //// USUWANIE

  function removeFromPreCart(category, ticket_index, setPreCart) {
    setPreCart((prevState) => {
      let updatedState = { ...prevState };
      updatedState[category].tickets = updatedState[category].tickets.filter(
        (_, index) => index !== ticket_index
      );
      return updatedState;
    });
  }

  function removeFromCart(category, ticket_index, setCart) {
    setQuantityTickets((prevState) => prevState - 1);
    setCart((prevState) => {
      let updatedState = { ...prevState };
      updatedState[category].tickets = updatedState[category].tickets.filter(
        (_, index) => index !== ticket_index
      );
      return updatedState;
    });
  }

  //// DODAWANIE

  function addToPreCart(category, obj_ticket, setPreCart) {
    setPreCart((prevState) => {
      let updatedState = { ...prevState };

      updatedState[category].tickets =
        updatedState[category].tickets.length > 0
          ? [...updatedState[category].tickets, obj_ticket]
          : [obj_ticket];

      return updatedState;
    });
  }

  function addToCart(category, obj_ticket, setCart) {
    setQuantityTickets((prevState) => prevState + 1);
    setCart((prevState) => {
      let updatedState = { ...prevState };
      updatedState[category].tickets =
        updatedState[category].tickets.length > 0
          ? [...updatedState[category].tickets, obj_ticket]
          : [obj_ticket];
      return updatedState;
    });
  }

  ///

  function handleSubmitPreCart(
    e,
    category,
    ticket_index,
    preCart,
    setCart,
    setPreCart
  ) {
    e.preventDefault();
    let obj_ticket = preCart[category].tickets[ticket_index];

    if (
      !Object.keys(obj_ticket.validated).some(
        (validator) => obj_ticket.validated[validator] == false
      ) &&
      quantityTickets < 10
    ) {
      addToCart(category, obj_ticket, setCart);
      removeFromPreCart(category, ticket_index, setPreCart);
    }
  }

  /////////// RENDERY

  //// GLOWNY PANEL BILETOW

  // DLA KATEGORII

  function renderCategory(ticket, preCart, cart, setPreCart) {
    return (
      <div className="flex flex-col" key={ticket.id}>
        <div className="flex flex-row items-center justify-between p-4">
          <span className="h-auto font-mukta text-sm text-white xl:text-base">
            {ticket.ticket_type}
          </span>

          {ticket.reserved_tickets !== ticket.quantity ? (
            <div className="flex flex-row space-x-6">
              <div className="flex flex-col items-end justify-center">
                {ticket.default_price !== ticket.price && (
                  <span className="h-auto text-center font-mukta line-through decoration-red-400 text-base text-gray-400 xl:text-lg">
                    {`${ticket.default_price} zł`}
                  </span>
                )}

                <span
                  className={`h-auto text-center font-mukta text-base xl:text-lg ${
                    ticket?.update_price == true
                      ? "text-amber-500"
                      : "text-white"
                  }`}
                >
                  {`${ticket.price} zł`}
                </span>

                <div className="break-anywhere flex flex-row items-center text-justify">
                  <span
                    className={`break-anywhere w-full font-mukta text-sm text-gray-500`}
                  >
                    {`Pozostało ${
                      ticket.quantity - ticket.reserved_tickets
                    } z ${ticket.quantity}`}
                  </span>
                </div>
              </div>

              <div className="flex w-20 justify-between flex-row items-center space-x-1">
                <div
                  className={`group flex shrink-0 h-5 w-5 rounded-md items-center justify-center
                  ${
                    preCart[ticket.ticket_type].tickets.length > 0
                      ? "bg-red-500 cursor-pointer"
                      : "bg-gray-500"
                  }`}
                  onClick={() => {
                    if (preCart[ticket.ticket_type].tickets.length > 0) {
                      setPreCart((prevState) => {
                        let updatedState = { ...prevState };
                        updatedState[ticket.ticket_type].tickets.splice(-1, 1);
                        return updatedState;
                      });
                    }
                  }}
                >
                  <MinusIcon className="h-3 w-3 text-white transition ease-in-out group-hover:scale-125" />
                </div>

                <span className="h-auto text-center font-mukta text-base text-white xl:text-lg">
                  {preCart[ticket.ticket_type].tickets.length +
                    cart[ticket.ticket_type].tickets.length}
                </span>

                <div
                  className={`group flex shrink-0 h-5 w-5 rounded-md items-center justify-center
                  ${
                    preCart[ticket.ticket_type].tickets.length +
                      cart[ticket.ticket_type].tickets.length <
                      ticket.quantity - ticket.reserved_tickets &&
                    quantityTickets < 10
                      ? "bg-green-400 cursor-pointer"
                      : "bg-gray-500"
                  }
                  `}
                  onClick={() => {
                    if (
                      preCart[ticket.ticket_type].tickets.length <
                        ticket.quantity - ticket.reserved_tickets &&
                      quantityTickets < 10
                    ) {
                      let obj_template = {
                        first_name: "",
                        last_name: "",
                        date_of_birth: null,
                        validated: {
                          first_name: false,
                          last_name: false,
                          date_of_birth: false,
                        },
                      };

                      addToPreCart(
                        ticket.ticket_type,
                        obj_template,
                        setPreCart
                      );
                    }
                  }}
                >
                  <PlusIcon className="h-3 w-3 text-white transition ease-in-out group-hover:scale-125" />
                </div>
              </div>
            </div>
          ) : (
            <span className="h-auto text-center font-mukta text-base text-red-500 xl:text-lg">
              WYPRZEDANE
            </span>
          )}
        </div>
        <span className="h-auto italic text-start w-full pb-1 px-4 font-mukta text-[10px] text-gray-500 xl:text-xs">
          {ticket.ticket_details}
        </span>
      </div>
    );
  }

  //// PRECART

  // DLA KATEGORII

  function renderPrecartCategory(
    data,
    category_name,
    preCart,
    cart,
    setPreCart,
    setCart,
    key
  ) {
    return (
      <div className="flex w-full h-auto flex-col overflow-hidden" key={key}>
        <div className="flex w-full rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-4">
          <span className="text-xs text-white md:text-base">
            {category_name}
          </span>
        </div>

        <div className="flex w-full flex-col p-2 h-auto bg-slate-500 space-y-2 rounded-b-2xl">
          <span className="text-xs text-white md:text-sm">{data.details}</span>
          {data.tickets.map((data, ticket_index) =>
            renderPrecartDetails(
              data,
              category_name,
              ticket_index,
              preCart,
              cart,
              setPreCart,
              setCart
            )
          )}
        </div>
      </div>
    );
  }

  // DLA BILETOW

  function renderPrecartDetails(
    data,
    category_name,
    ticket_index,
    preCart,
    cart,
    setPreCart,
    setCart
  ) {
    return (
      <form
        className="flex flex-col"
        onSubmit={(e) =>
          handleSubmitPreCart(
            e,
            category_name,
            ticket_index,
            preCart,
            setCart,
            setPreCart
          )
        }
        key={ticket_index}
      >
        <div className="flex w-full flex-row justify-between items-center rounded-t-lg bg-gradient-to-r from-gray-800 to-slate-700 py-px px-4">
          <span className="text-xs text-white md:text-sm">
            {`Bilet numer ${
              ticket_index + 1 + cart[category_name].tickets.length
            }`}
          </span>
          <TrashIcon
            className="h-4 w-4 text-red-500 cursor-pointer transition ease-in-out group-hover:scale-125"
            onClick={() => {
              removeFromPreCart(category_name, ticket_index, setPreCart);
            }}
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-around w-full h-auto bg-zinc-700 p-2 rounded-b-lg">
          <div className="flex w-auto flex-col space-y-1">
            <label className="font-mukta text-xs xl:text-sm text-gray-100">
              Imię użytkownika
            </label>
            <input
              type="text"
              name="first_name"
              value={data.first_name}
              onChange={(e) =>
                handleInputPreCart(e, category_name, ticket_index, setPreCart)
              }
              placeholder="Podaj imię"
              maxLength="200"
              className="rounded-md text-xs w-[170px] xl:text-sm xl:w-auto"
            ></input>
          </div>

          <div className="flex w-auto flex-col space-y-1">
            <label className="font-mukta text-xs xl:text-sm text-gray-100">
              Nazwisko użytkownika
            </label>
            <input
              type="text"
              name="last_name"
              value={data.last_name}
              onChange={(e) =>
                handleInputPreCart(e, category_name, ticket_index, setPreCart)
              }
              placeholder="Podaj nazwisko"
              maxLength="200"
              className="rounded-md text-xs w-[170px] xl:text-sm xl:w-auto"
            ></input>
          </div>

          <div className="flex w-auto flex-col space-y-1">
            <label className="font-mukta text-xs xl:text-sm text-gray-100">
              Data urodzenia użytkownika
            </label>

            <Datepicker
              asSingle={true}
              value={{
                startDate: data.date_of_birth,
                endDate: data.date_of_birth,
              }}
              popoverDirection="down"
              startFrom={new Date("1998-01-01")}
              displayFormat={"DD.MM.YYYY"}
              placeholder={"Brak"}
              onChange={(e) =>
                handleValueDatepickerChange(
                  e,
                  category_name,
                  ticket_index,
                  setPreCart
                )
              }
              inputClassName="rounded-md text-xs w-full xl:text-sm"
            />
          </div>
          <div className="flex grow pb-1 justify-center items-end xl:justify-end xl:pr-4">
            <button
              type="submit"
              value="Submit"
              disabled={
                Object.keys(data.validated).some(
                  (validator) => data.validated[validator] == false
                ) || quantityTickets >= 10
              }
              className={`h-7 w-full px-2 xl:w-36 rounded-lg bg-gradient-to-br from-green-400 via-green-500 to-green-600 py-1 text-center text-xs font-medium text-white shadow-lg shadow-green-500/10 focus:outline-none focus:ring-2 focus:ring-green-300 xl:h-9 xl:text-sm disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none`}
            >
              Dodaj do koszyka
            </button>
          </div>
        </div>
      </form>
    );
  }

  ////////// CART

  // DLA KATEGORII

  function renderCartCategory(category, cart, setCart, setPreCart, key) {
    return (
      <div
        className="flex h-auto flex-col space-y-1 w-full items-start p-4"
        key={key}
      >
        <div className="flex h-auto w-full flex-row justify-between">
          <span className="h-auto shrink-0 text-start font-mukta text-base text-gray-100  md:text-start md:text-base">
            {category}
          </span>

          {cart[category].removed && (
            <span className="h-auto shrink-0 text-end font-mukta text-base text-red-500  ">
              NIEDOSTĘPNE
            </span>
          )}

          {cart[category].tickets.length > cart[category].avaible && (
            <span className="h-auto shrink-0 text-end font-mukta text-base text-red-500  ">
              {cart[category].avaible == 0
                ? `WYPRZEDANE !`
                : `${
                    cart[category].tickets.length - cart[category].avaible
                  } za dużo !`}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full items-center">
          {cart[category].tickets.map((person, ticket_index) =>
            renderCartDetails(
              person,
              ticket_index,
              category,
              cart,
              setCart,
              setPreCart
            )
          )}
        </div>
      </div>
    );
  }

  // DLA BILETOW

  function renderCartDetails(
    person,
    ticket_index,
    category,
    cart,
    setCart,
    setPreCart
  ) {
    return (
      <div
        className="flex flex-row justify-between items-center space-x-4 h-8 w-full"
        key={ticket_index}
      >
        <span className="h-auto w-auto  shrink-0 text-center font-mukta text-sm text-gray-400 md:text-sm">
          {`${person.first_name} ${person.last_name}`}
        </span>

        <div className="flex flex-row items-center space-x-2 w-auto h-auto">
          <span className="h-auto w-auto  shrink-0 text-center font-mukta text-sm text-gray-400 md:text-sm">
            {person.date_of_birth}
          </span>

          <PencilAltIcon
            className="h-4 w-4 text-yellow-400 shrink-0 cursor-pointer"
            onClick={() => {
              addToPreCart(
                category,
                cart[category].tickets[ticket_index],
                setPreCart
              );
              removeFromCart(category, ticket_index, setCart);
            }}
          />

          <TrashIcon
            className="h-4 w-4 text-red-500 shrink-0 cursor-pointer"
            onClick={() => {
              removeFromCart(category, ticket_index, setCart);
            }}
          />
        </div>
      </div>
    );
  }

  // PODSUMOWANIE

  function renderCartSummary(cart, id) {
    return (
      <div className="flex flex-col h-auto w-full p-4">
        <div className="flex flex-row w-full space-x-2 pb-2 items-center">
          <CreditCardIcon className="h-6 w-6 text-gray-300 " />

          <span className="h-auto shrink-0 text-center font-mukta text-base text-gray-100  md:text-start md:text-xl">
            Podsumowanie
          </span>
        </div>
        {Object.keys(cart).map((category, key) => {
          if (cart[category].tickets.length > 0) {
            return (
              <div className="flex flex-row justify-between" key={key}>
                <span className="h-auto w-auto  shrink-0 text-start font-mukta text-sm text-gray-400 md:text-sm">
                  {`${category}`}
                </span>

                <span className="h-auto w-auto  shrink-0 text-end font-mukta text-sm text-gray-400 md:text-sm">
                  {`${cart[category].tickets.length} * ${
                    cart[category].price
                  } zł = ${(
                    cart[category].tickets.length * cart[category].price
                  ).toFixed(2)} zł`}
                </span>
              </div>
            );
          }
        })}
        <div className="flex flex-row justify-between pt-4">
          <span className="h-auto w-auto  shrink-0 text-start font-mukta text-sm text-gray-400 md:text-sm">
            SUMA
          </span>

          <span className="h-auto w-auto  shrink-0 text-end font-mukta text-sm text-gray-400 md:text-sm">
            {`${Object.values(cart)
              .reduce((acc, val) => acc + val.price * val.tickets.length, 0)
              .toFixed(2)} zł`}
          </span>
        </div>

        <div className="flex w-full justify-end pt-6">
          <button
            disabled={quantityTickets == 0 || !validator_pay(cart)}
            onClick={() => {
              if (quantityTickets > 0 && validator_pay(cart) && !blockedPay) {
                setBlockedPay(true);
                dispatch(ticket_pay(cart, id, xcsrftoken));
              }
            }}
            className="rounded-lg bg-gradient-to-r from-green-400 via-green-500 to-green-600 px-6 py-1.5 text-center text-sm font-medium text-white focus:ring-2 focus:ring-green-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
          >
            Kup
          </button>
        </div>
      </div>
    );
  }

  function validator_pay(cart) {
    if (
      Object.keys(cart).some((key) => {
        return (
          cart[key].tickets.length > cart[key].avaible ||
          (cart[key]?.removed == true && cart[key].tickets.length > 0)
        );
      })
    ) {
      return false;
    } else {
      return true;
    }
  }

  return [
    renderCategory,
    renderCartCategory,
    renderCartSummary,
    renderPrecartCategory,
    quantityTickets,
    setBlockedPay,
  ];
}
export default useEventTicketsPage;
