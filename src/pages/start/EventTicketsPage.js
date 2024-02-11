import { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { RotatingLines } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars-2";
import Datepicker from "react-tailwindcss-datepicker";
import {
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
  CreditCardIcon,
  PencilAltIcon,
} from "@heroicons/react/solid";
import moment from "moment";
import "moment/locale/pl";
import { getUser } from "../../selectors";
import { ticket_pay } from "../../actions/data";
import useEventTicketsPage from "../../hooks/useEventTicketsPage";
moment.locale("pl");

function EventTicketsPage({
  data,
  preCart,
  setPreCart,
  cart,
  setCart,
  xcsrftoken,
  endProvider,
}) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [
    renderCategory,
    renderCartCategory,
    renderCartSummary,
    renderPrecartCategory,
    quantityTickets,
    setBlockedPay,
  ] = useEventTicketsPage();

  const { slug_uuid } = useParams();

  // PROCES PRZECHODZENIA DO PŁATNOSCI ORAZ ŁAPANIE BŁĘDÓW

  useEffect(() => {
    if (data?.url_payment !== undefined) {
      setTimeout(() => {
        window.location.href = data.url_payment;
      }, 2000);
    }
  }, [data?.url_payment]);

  useEffect(() => {
    if (data?.is?.redirect !== undefined) {
      if (data.is.redirect == "main_page") {
        history("/");
      } else if (data.is.redirect == "orders") {
        history("/my_tickets");
      } else if (data.is.redirect == "event") {
        let slug = slug_uuid.substring(0, slug_uuid.length - 37);
        let uuid = slug_uuid.substring(slug_uuid.length - 36);
        history(`/event/${slug}-${uuid}`);
      }
    } else if (data?.is?.correct_tickets !== undefined) {
      setBlockedPay(false);

      setCart((prevState) => {
        let updatedState = { ...prevState };
        let newData = data.is.correct_tickets;

        Object.keys(updatedState).forEach((key) => {
          if (!Object.keys(newData).includes(updatedState[key].id.toString())) {
            updatedState[key].removed = true;
          } else {
            console.log(updatedState[key]);
            updatedState[key].stripe_id = newData[updatedState[key].id];
          }
        });

        return updatedState;
      });

      setPreCart((prevState) => {
        let updatedState = { ...prevState };
        let newData = data.is.correct_tickets;

        Object.keys(updatedState).forEach((key) => {
          if (!Object.keys(newData).includes(updatedState[key].id.toString())) {
            delete updatedState[key];
          } else {
            updatedState[key].stripe_id = newData[updatedState[key].id];
          }
        });

        return updatedState;
      });
    } else if (data?.is?.missing_data !== undefined) {
      setBlockedPay(false);
      setCart((prevState) => {
        let updatedState = { ...prevState };
        let newData = data.is.missing_data;
        let cartKeys = Object.keys(updatedState);

        Object.keys(newData).forEach((stripe_id) => {
          let key_ticket = cartKeys.find(
            (key) => updatedState[key].stripe_id == stripe_id
          );

          if (key_ticket) {
            if (newData[stripe_id].hasOwnProperty("new_price")) {
              updatedState[key_ticket].price =
                newData[stripe_id].new_price.toString();
            }

            if (newData[stripe_id].hasOwnProperty("quantity")) {
              updatedState[key_ticket].avaible =
                newData[stripe_id].quantity.quantity -
                newData[stripe_id].quantity.reserved_tickets;
            }
          }
        });
        return updatedState;
      });
    }
  }, [data?.is]);

  return (
    <Dashboard>
      <div
        className={` flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600 pb-4`}
      >
        {endProvider ? (
          <div className="flex flex-col h-full w-full md:w-4/5 items-center space-y-3 px-3 pt-4 xl:w-full">
            <span className="h-auto w-full truncate shrink-0 px-4 text-center font-mukta text-lg text-gray-100 xl:w-4/5 xl:text-start xl:text-2xl">
              {`Kup bilet na wydarzenie ${data.title}`}
            </span>

            <div className="flex h-full pb-8 w-full flex-col-reverse justify-center px-3 xl:flex-row xl:space-x-8">
              {/* LEWA STRONA */}

              <div
                id="left_side"
                className="flex h-full flex-col divide-y-[3px] w-full xl:w-[750px] mt-8 xl:mt-0 divide-blue-400  border-blue-400  rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 drop-shadow-2xl"
              >
                <div className="flex flex-col divide-y-2 divide-blue-400 flex w-full max-h-[40%] shrink-0 overflow-auto">
                  {data.tickets.map((ticket) =>
                    renderCategory(ticket, preCart, cart, setPreCart)
                  )}
                </div>
                <div className="flex w-full grow overflow-auto bg-gray-700">
                  <div className="flex w-full h-fit p-4  space-y-8 flex-col">
                    {Object.keys(preCart).some((key) => {
                      return preCart[key].tickets.length > 0;
                    }) ? (
                      Object.keys(preCart).map((type, key) => {
                        if (preCart[type].tickets.length > 0) {
                          return renderPrecartCategory(
                            preCart[type],
                            type,
                            preCart,
                            cart,
                            setPreCart,
                            setCart,
                            key
                          );
                        }
                      })
                    ) : (
                      <span className="break-anywhere h-auto py-5 text-center font-mukta text-xl text-gray-200">
                        Wybierz bilet z listy powyżej
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {/* PRAWA STRONA */}
              <div
                id="right_side"
                className={`flex w-full xl:w-[300px] divide-y-2 divide-blue-400 h-fit flex-col  border-blue-400 rounded-md border-2 bg-gradient-to-bl from-gray-900 via-gray-900 to-slate-800 drop-shadow-2xl`}
              >
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-row justify-between h-auto px-4 py-2">
                    <div className="flex flex-row  w-full items-center space-x-2">
                      <ShoppingCartIcon className="h-6 w-6 text-gray-300 " />
                      <span className="h-auto shrink-0 text-center font-mukta text-base text-gray-100  md:text-start md:text-xl">
                        Koszyk
                      </span>
                    </div>

                    <span className="h-auto w-auto  shrink-0 text-center font-mukta text-base text-gray-100 md:text-xl">
                      {quantityTickets}
                    </span>
                  </div>

                  {quantityTickets == 10 && (
                    <span className="h-auto w-auto px-4 pb-2  shrink-0 text-center font-mukta text-base text-yellow-500 md:text-sm">
                      Możesz kupić maksymalnie 10 biletów w 1 zamówieniu !
                    </span>
                  )}
                </div>

                <div className="flex flex-col divide-y-2 divide-blue-400 h-auto w-full">
                  {quantityTickets > 0 ? (
                    <>
                      {Object.keys(cart).map((category, key) => {
                        if (cart[category].tickets.length > 0) {
                          return renderCartCategory(
                            category,
                            cart,
                            setCart,
                            setPreCart,
                            key
                          );
                        }
                      })}
                      {renderCartSummary(cart, data.id)}
                    </>
                  ) : (
                    <span className="h-auto w-full  shrink-0 text-center font-mukta text-base text-gray-100 md:text-xl p-4">
                      Twój koszyk jest pusty
                    </span>
                  )}
                </div>
              </div>
            </div>
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

export default EventTicketsPage;
