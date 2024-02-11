import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  event_user_participate,
  event_report,
  event_delete,
} from "../actions/data";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PhotographIcon,
  XIcon,
  ExclamationIcon,
  PencilAltIcon,
  MinusCircleIcon,
  TrashIcon,
  FlagIcon,
  TicketIcon,
  ClockIcon,
  CheckCircleIcon,
} from "@heroicons/react/solid";
import ips_config from "../ips_config";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function useEventPage() {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [showWrapper, setShowWrapper] = useState({
    schedule: false,
    series: false,
    participants: false,
    tickets: false,
  });

  useEffect(() => {
    if (window.innerWidth > 767) {
      setShowWrapper({
        schedule: true,
        series: true,
        participants: true,
        tickets: true,
      });
    }
  }, []);

  // MODUŁ WYSWIETLANIA STANU WERYFIKACJI

  function infoRender(state, details) {
    if (state == "awaiting") {
      return (
        <div className="flex h-auto w-full items-center justify-center rounded-md bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-300 p-6 opacity-75 drop-shadow-2xl">
          <span className="text-center font-mukta text-sm text-black lg:text-lg">
            Wydarzenie jest w trakcie weryfikacji. Do czasu zatwierdzenia, dane
            wydarzenie jest widoczne tylko dla organizatora oraz
            administratorów. Nowo dodane wydarzenia jak i wydarzenia, które
            zostały zmodyfikowane przechodzą przez ten etap w celu sprawdzenia
            poprawności, jak i czy zawarte treści nie naruszają regulaminu
            strony.
          </span>
        </div>
      );
    } else if (state == "need_improvement") {
      return (
        <div className="flex h-auto w-full flex-col items-center justify-center space-y-8 rounded-md bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-300 p-6 opacity-75 drop-shadow-2xl">
          <span className="text-center font-mukta text-sm text-black lg:text-lg">
            Wydarzenie zostało sprawdzone, ale wymaga kilku zmian do poprawnego
            zaakceptowania. W tej chwili widoczne jest tylko dla organizatora
            oraz administratorów. Zedytuj swoje wydarzenie poprawiając poniższe
            rzeczy:
          </span>
          <span className="text-center font-mukta text-sm text-black lg:text-lg">
            {details}
          </span>
        </div>
      );
    } else if (state == "rejected") {
      return (
        <div className="flex h-auto w-full flex-col items-center justify-center space-y-8 rounded-md bg-gradient-to-br from-red-600 via-red-500 to-red-300 p-6 opacity-75 drop-shadow-2xl">
          <span className="text-center font-mukta text-sm text-black lg:text-lg">
            Wydarzenie zostało kategorycznie usunięte z powodu naruszania
            regulaminu naszej strony. W przeciągu paru dni wydarzenie zniknie ze
            strony. W tej chwili widoczne jest tylko dla organizatora oraz
            administratorów. Poniżej podany jest powód:
          </span>
          <span className="text-center font-mukta text-sm text-black lg:text-lg">
            {details}
          </span>
        </div>
      );
    }
  }

  function infoRenderIcon(state) {
    if (state == "awaiting") {
      return (
        <div className="mt-1 flex flex-row items-center space-x-1 pl-1">
          <ExclamationIcon className="h-8 w-8 text-yellow-300" />
          <span className="h-auto font-mukta text-[10px] text-gray-200">
            Wydarzenie weryfikowane.
          </span>
        </div>
      );
    } else if (state == "need_improvement") {
      return (
        <div className="flex flex-row items-center space-x-1 pl-1">
          <PencilAltIcon className=" h-8 w-8 text-yellow-300" />
          <span className="h-auto font-mukta text-[10px] text-gray-200">
            Wydarzenie wymaga zmian.
          </span>
        </div>
      );
    } else if (state == "rejected") {
      return (
        <div className="mt-1 flex flex-row items-center space-x-1 pl-1">
          <MinusCircleIcon className="-mt-1 h-6 w-6 text-red-500" />
          <span className="h-auto font-mukta text-[10px] text-gray-200">
            Wydarzenie usunięte.
          </span>
        </div>
      );
    }
  }

  // MODUŁ REPORTOWANIA

  const reportOptions = {
    1: "Naruszenie regulaminu",
    2: "Dyskryminacja",
    3: "Fałszywe informacje",
    4: "Niezgodność z zasadami społeczności",
    5: "Niewłaściwe zachowanie organizatora",
    6: "Propagowanie nielegalnych działań",
  };

  // MODUL USUWANIA

  const [openDelete, setOpenDelete] = useState({
    status: false,
    slug: null,
    uuid: null,
  });

  function modalDelete(xcsrfToken) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/6 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
            <span className="p-1 text-base text-white md:text-xl">
              Usuwanie wydarzenia
            </span>
            <XIcon
              onClick={() =>
                setOpenDelete({ status: false, slug: null, uuid: null })
              }
              className="h-6 w-6 cursor-pointer text-red-400"
            />
          </div>
          <div className="flex items-center px-3">
            <span className="text-center font-mukta text-sm text-white md:text-base">
              Czy napewno chcesz usunąć te wydarzenie? Wraz z nim usuną się
              wszystkie komentarze, jak i nie będzie możliwe jego odzyskanie.
            </span>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300"
              onClick={() => {
                dispatch(
                  event_delete(openDelete.slug, openDelete.uuid, xcsrfToken)
                );
                setOpenDelete({ status: false, slug: null, uuid: null });
              }}
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
    );
  }

  // MODUL REPORTOWANIA

  const reportInit = {
    status: false,
    id_event: null,
    type: null,
    details: null,
  };

  const [openReport, setOpenReport] = useState(reportInit);

  function modalReport(xcsrfToken) {
    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-2/3 flex-col  items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-xl md:w-1/2 xl:w-2/6">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
            <span className="p-1 text-base text-white md:text-xl">
              Zgłaszanie wydarzenia
            </span>
            <XIcon
              onClick={() => setOpenReport(reportInit)}
              className="h-6 w-6 cursor-pointer text-red-400"
            />
          </div>
          <div className="flex items-center">
            <span className="px-4 text-center font-mukta text-sm text-white md:text-base">
              Aby zgłosić wydarzenie, wybierz jedną z możliwych kategorii oraz
              opcjonalnie opisz dokładniej sytuację
            </span>
          </div>

          <div className="flex flex-col space-y-4 px-3">
            {Object.entries(reportOptions).map(([key, value]) => (
              <div className="flex flex-row items-center space-x-2" key={key}>
                <input
                  type="radio"
                  name="report"
                  value={value}
                  onChange={(e) =>
                    setOpenReport({
                      ...openReport,
                      type: e.target.value,
                    })
                  }
                ></input>

                <label className="font-mukta text-sm text-gray-300 md:text-base ">
                  {value}
                </label>
              </div>
            ))}
          </div>
          <div className="flex h-auto w-2/3 flex-col space-y-1">
            <textarea
              className="max-h-80 w-full resize-none rounded-lg border-2 border-gray-500 bg-transparent font-mukta font-mukta text-sm text-white focus:ring-0 md:text-base"
              placeholder="Opcjonalnie dodaj komentarz do swojego zgłoszenia wydarzenia"
              onChange={(e) =>
                setOpenReport({
                  ...openReport,
                  details: e.target.value,
                })
              }
              maxLength="150"
            ></textarea>
            <div className="flex justify-end">
              <span
                className={`${
                  openReport?.details?.length > 125
                    ? "text-red-500"
                    : "text-gray-500"
                } font-mukta text-sm`}
              >
                {`${
                  openReport?.details !== null ? openReport?.details?.length : 0
                } / 150`}
              </span>
            </div>
          </div>

          <div className="flex pb-5">
            <button
              className="rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600  px-10 py-1 text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none"
              disabled={openReport.type == null}
              onClick={() => {
                dispatch(event_report(openReport, xcsrfToken));
                setOpenReport(reportInit);
              }}
            >
              Zgłoś
            </button>
          </div>
        </div>
      </div>
    );
  }

  function buttonActions(event, user) {
    if (event.user == user.username) {
      return (
        <>
          <TicketIcon
            className={`h-7 w-7 cursor-pointer text-yellow-400`}
          ></TicketIcon>

          <TrashIcon
            onClick={() => {
              setOpenDelete({
                status: true,
                slug: event.slug,
                uuid: event.uuid,
              });
            }}
            className={`h-7 w-7 cursor-pointer text-red-400`}
          ></TrashIcon>
        </>
      );
    } else if (event.verificated == "verificated") {
      return (
        <FlagIcon
          onClick={() => {
            if (event.my_report == null) {
              setOpenReport({
                status: true,
                id_event: event.id,
                type: null,
                details: null,
              });
            }
          }}
          className={`${
            event.my_report !== null
              ? "text-gray-400"
              : "cursor-pointer text-red-400"
          } h-7 w-7`}
        ></FlagIcon>
      );
    } else {
      return <FlagIcon className="h-7 w-7 text-yellow-400" />;
    }
  }

  // MODUŁ HAMONOGRAMU

  function eventScheduleRender(schedule) {
    let scheduleArray = eval(schedule);

    return (
      <div className="flex flex-col divide-y-2 divide-blue-400">
        {scheduleArray.map((schedule, index) => (
          <div
            className="flex flex-row items-center justify-between p-4"
            key={index}
          >
            <div className="flex flex-row items-center">
              <span className="h-auto font-mukta text-sm text-white xl:text-base">{`${String(
                schedule[0]
              ).padStart(2, "0")}:${String(schedule[1]).padStart(
                2,
                "0"
              )}`}</span>
              {schedule[2] !== "" && schedule[3] !== "" && (
                <span className="h-auto pl-1 font-mukta text-sm text-white xl:text-base">{`- ${String(
                  schedule[2]
                ).padStart(2, "0")}:${String(schedule[3]).padStart(
                  2,
                  "0"
                )}`}</span>
              )}
            </div>
            <div className="break-anywhere flex items-center pl-5 text-justify">
              <span className="break-anywhere w-full font-mukta text-sm text-gray-200">
                {schedule[4]}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // MODUŁ Biletów

  function eventTicketsRender(event, user) {
    function ticketsButton(event, username, pinned_bank) {
      let tickets_avaible = event.tickets.some(
        (ticket) => ticket.reserved_tickets < ticket.quantity
      );

      if (event.user == username && !pinned_bank) {
        return (
          <>
            <span className="h-auto text-center font-mukta text-sm text-white xl:text-sm">
              Aby dodać bilety do tego wydarzenia, wpierw musisz podłączyć konto
              bankowe do swojego profilu.
            </span>

            <Link to={`/settings`}>
              <button
                className={`h-7 w-36 rounded-lg bg-gradient-to-br from-green-400 via-green-500 to-green-600 py-1 text-center text-xs font-medium text-white shadow-lg shadow-green-500/10 focus:outline-none focus:ring-2 focus:ring-green-300 xl:h-9 xl:text-sm`}
              >
                Podłącz konto
              </button>
            </Link>
          </>
        );
      } else if (event.user == username && pinned_bank) {
        return (
          <>
            {event.tickets.length == 0 && (
              <span className="h-auto text-center font-mukta text-sm text-white xl:text-sm">
                Nie posiadasz jeszcze żadnego, dodanego biletu do tego
                wydarzenia.
              </span>
            )}

            <Link to={`/my_tickets`}>
              <button
                className={`h-7 w-36 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-1 text-center text-xs font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 xl:h-9 xl:text-sm`}
              >
                Zarządzaj biletami
              </button>
            </Link>
          </>
        );
      } else if (tickets_avaible) {
        return (
          <Link to={`/tickets/${event.slug}-${event.uuid}`}>
            <button
              className={`h-7 w-36 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-1 text-center text-xs font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 xl:h-9 xl:text-sm`}
            >
              Kup bilet
            </button>
          </Link>
        );
      } else {
        return (
          <div
            className={`h-7 w-36 rounded-lg bg-gradient-to-br from-gray-400 via-gray-500 text-center to-gray-600 py-1 shadow-lg shadow-gray-500/10 focus:outline-none focus:ring-2 focus:ring-gray-300 xl:h-9`}
          >
            <span className="break-anywhere text-center text-xs font-medium text-white xl:text-sm">
              Brak biletów
            </span>
          </div>
        );
      }
    }

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
          className={`block h-4 w-4 
          ${type == "awaiting" && "text-yellow-300"}
          ${type == "need_improvement" && "text-orange-500"}
          ${type == "verificated" && "text-green-400"}
          ${type == "rejected" && "text-red-500"}
         `}
        />
      );
    }

    let tickets = event.tickets;

    return (
      <div className="flex flex-col divide-y-2 divide-blue-400">
        {tickets.length > 0 &&
          tickets.map((ticket) => (
            <div className="flex flex-col items-center" key={ticket.id}>
              <div
                className="flex flex-row w-full items-center justify-between px-3 pt-4 pb-1"
                key={ticket.id}
              >
                <div className="flex h-full justify-center items-start flex-col">
                  <div className="flex h-auto w-auto items-center justify-center space-x-2 flex-row">
                    {(event.user == user.username || user.is_admin) &&
                      iconVerificated(ticket.verificated)}
                    <span className="h-auto font-mukta text-sm text-white xl:text-base">
                      {ticket.ticket_type}
                    </span>
                  </div>
                  {(event.user == user.username || user.is_admin) &&
                    ticket.was_allowed &&
                    ticket.verificated !== "verificated" && (
                      <span className="h-auto font-mukta text-sm text-green-400 xl:text-xs">
                        Bilet dopuszczony do sprzedaży
                      </span>
                    )}

                  {ticket.my_tickets > 0 && (
                    <span className="h-auto font-mukta text-sm text-green-400">
                      {`Posiadane bilety - ${ticket.my_tickets}`}
                    </span>
                  )}

                  {ticket.my_not_paid_tickets > 0 && (
                    <span className="h-auto font-mukta text-xs text-red-400">
                      {`w tym ${ticket.my_not_paid_tickets} nieopłacone !`}
                    </span>
                  )}
                </div>

                <div className="flex flex-col items-end justify-center">
                  {ticket.default_price !== ticket.price && (
                    <span className="h-auto line-through decoration-red-400 text-center font-mukta text-base text-gray-400 xl:text-lg">
                      {`${parseFloat(ticket.default_price).toFixed(2)} zł`}
                    </span>
                  )}

                  <span
                    className={`h-auto text-center font-mukta text-base xl:text-lg ${
                      ticket.was_allowed &&
                      ticket.verificated !== "verificated" &&
                      (event.user == user.username || user.is_admin)
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {`${parseFloat(ticket.price).toFixed(2)} zł`}
                  </span>

                  {(event.user == user.username || user.is_admin) &&
                    ticket.price !== ticket.new_price && (
                      <span
                        className={`h-auto text-center font-mukta text-base xl:text-lg text-yellow-400`}
                      >
                        {`${parseFloat(ticket.new_price).toFixed(2)} zł`}
                      </span>
                    )}

                  <div className="break-anywhere flex flex-row items-center text-justify">
                    <span
                      className={`break-anywhere w-full font-mukta text-sm
                ${
                  ticket.quantity - ticket.reserved_tickets == 0 &&
                  "text-gray-800"
                }
                ${
                  ticket.quantity - ticket.reserved_tickets < 6 &&
                  "text-red-500"
                }
                ${
                  ticket.quantity - ticket.reserved_tickets >= 6 &&
                  "text-gray-500"
                }`}
                    >
                      {`${ticket.quantity - ticket.reserved_tickets}  / ${
                        ticket.quantity
                      }`}
                    </span>
                  </div>
                </div>
              </div>
              <span className="h-auto italic text-start w-full pb-1 px-2 font-mukta text-[10px] text-gray-500 xl:text-xs">
                {ticket.ticket_details}
              </span>
            </div>
          ))}

        <div className="flex flex-col space-y-4 items-center justify-center p-4">
          {ticketsButton(event, user.username, user.pinned_bank)}
        </div>
      </div>
    );
  }

  // MODUŁ "WZIELI UDZIAŁ"

  function participantsModule(eventParticipants, activeEvent) {
    if (
      eventParticipants.friends.meta.count == 0 &&
      eventParticipants.rest_users.meta.count == 0
    ) {
      return (
        <div className="flex w-full flex-col items-center p-4">
          {activeEvent.participant_self ? (
            <span className="h-auto font-mukta text-sm text-gray-200">
              Tylko ty wziąłeś udział w tym wydarzeniu.
            </span>
          ) : (
            <span className="h-auto font-mukta text-sm text-gray-200">
              Nikt nie wziął udziału w tym wydarzeniu.
            </span>
          )}
        </div>
      );
    } else {
      return eventParticipantsRender(eventParticipants);
    }
  }

  function eventParticipantsTemplate(user) {
    return (
      <div className="flex w-1/3 flex-col items-center p-4" key={user.id}>
        <Link
          to={`/user/${user.username}`}
          className="flex h-12 w-12 xl:h-16 xl:w-16"
        >
          <img
            src={`${ips_config.BACKEND}${user.image_thumbnail}`}
            className="h-12 w-12 cursor-pointer rounded-full transition ease-in-out hover:scale-110 xl:h-16 xl:w-16"
          ></img>
        </Link>

        <Link
          to={`/user/${user.username}`}
          className="flex h-auto items-center"
        >
          <span className="h-auto cursor-pointer pt-2 font-mukta text-sm text-gray-200">
            {user.username}
          </span>
        </Link>
      </div>
    );
  }

  function eventParticipantsRender(eventParticipants) {
    return (
      <>
        <div id="znajomi" className="flex h-auto w-auto flex-col items-center">
          <span className="h-auto pt-2 font-mukta text-sm text-gray-200 xl:text-base">
            Znajomi:
          </span>
          <div className="flex h-auto w-full flex-row flex-wrap items-center justify-center">
            {eventParticipants.friends.meta.count == 0 ? (
              <div className="flex w-full flex-col items-center p-4">
                <span className="h-auto text-center font-mukta text-sm text-gray-200">
                  Nikt z twoich znajomych nie wziął udziału w tym wydarzeniu.
                </span>
              </div>
            ) : (
              eventParticipants.friends.data.map((friend) =>
                eventParticipantsTemplate(friend)
              )
            )}
          </div>
          {eventParticipants.friends.meta.count > 15 && (
            <div className="flex h-auto w-full items-center justify-center pb-4">
              <span className="h-auto text-center font-mukta text-sm text-gray-200 xl:text-base">
                {`i ${
                  eventParticipants.friends.meta.count - 15
                } z twoich znajomych`}
              </span>
            </div>
          )}
        </div>
        <div id="reszta" className="flex h-auto w-auto flex-col items-center">
          <span className="h-auto pt-2 font-mukta text-sm text-gray-200 xl:text-base">
            Reszta użytkowników:
          </span>
          <div className="flex h-auto w-full flex-row flex-wrap items-center justify-center">
            {eventParticipants.rest_users.meta.count == 0 ? (
              <div className="flex w-full flex-col items-center p-4">
                <span className="h-auto text-center font-mukta text-sm text-gray-200">
                  Nikt oprócz twoich znajomych nie wziął udziału w tym
                  wydarzeniu.
                </span>
              </div>
            ) : (
              eventParticipants.rest_users.data.map((user) =>
                eventParticipantsTemplate(user)
              )
            )}
          </div>
          {eventParticipants.rest_users.meta.count > 15 && (
            <div className="flex h-auto w-full items-center justify-center pb-4">
              <span className="h-auto text-center font-mukta text-sm text-gray-200 xl:text-base">
                {`i ${
                  eventParticipants.rest_users.meta.count - 15
                } z reszty użytkowników`}
              </span>
            </div>
          )}
        </div>
      </>
    );
  }

  // MODUŁ OBRAZKÓW

  function imageRender(images, activeImage, setActiveImage) {
    let numbersImages = images.length;
    return (
      <div className="flex flex-col">
        <div
          id="image"
          className="flex h-[250px] w-auto select-none flex-row justify-center pt-4 lg:h-[500px]"
        >
          <div className="flex h-auto w-12 items-center">
            <ChevronLeftIcon
              className="h-12 w-12 cursor-pointer text-gray-400 hover:text-gray-300"
              onClick={() => {
                setActiveImage((prevIndex) =>
                  prevIndex === 0 ? numbersImages - 1 : prevIndex - 1
                );
              }}
            />
          </div>

          <div
            className={` h-full w-10/12 bg-contain bg-center bg-no-repeat duration-300`}
            style={{
              backgroundImage: `url(${ips_config.BACKEND}/media/${images[activeImage].image})`,
            }}
          ></div>

          <div className="flex h-auto w-12 items-center">
            <ChevronRightIcon
              className="h-12 w-12 cursor-pointer text-gray-400 hover:text-gray-300"
              onClick={() => {
                setActiveImage((prevIndex) => (prevIndex + 1) % numbersImages);
              }}
            />
          </div>
        </div>
        <div className="flex h-8 w-full flex-row items-center justify-center space-x-2">
          {images.map((image, index) => (
            <div className="flex" key={index}>
              <PhotographIcon
                className={`${
                  index == activeImage
                    ? "h-5 w-5 text-gray-300"
                    : "h-4 w-4 text-gray-400"
                } cursor-pointer`}
                onClick={() => {
                  setActiveImage(index);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // MODUŁ ORGANIZATORA

  function eventActionSeries(event, username, xcsrfToken) {
    if (event.current) {
      if (event.participant_self == null && event.verificated !== "rejected") {
        return (
          <Link to={`/edit/${event.slug}-${event.uuid}`}>
            <button
              className={`h-auto w-auto rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 p-1 text-center text-[10px] font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300`}
            >
              Edytuj wydarzenie
            </button>
          </Link>
        );
      } else if (
        event.user__username !== username &&
        event.verificated == "verificated"
      ) {
        return (
          <button
            type="submit"
            value="Submit"
            className={`${
              event.participant_self == true
                ? "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-black shadow-gray-500/10 focus:ring-gray-300"
                : "bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white shadow-green-500/10 focus:ring-green-300"
            } h-auto w-auto rounded-lg p-1 text-center text-[10px] font-medium shadow-lg focus:outline-none focus:ring-2`}
            onClick={() =>
              dispatch(event_user_participate(event.id, xcsrfToken))
            }
          >
            {event.participant_self == true
              ? "Przestań brać udział"
              : "Weź udział"}
          </button>
        );
      }
    } else {
      return (
        <span className="h-auto w-24 text-center font-mukta text-sm text-gray-200">
          Zakończone
        </span>
      );
    }
  }

  function eventAction(event, user, xcsrfToken) {
    if (event.current) {
      if (event.verificated == "rejected") {
        return (
          <div
            className={`flex h-7 w-36 items-center justify-center rounded-lg bg-gradient-to-br from-red-400 via-red-500 to-red-600 py-1 shadow-lg shadow-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-300 xl:h-9`}
          >
            <span className="h-auto w-full text-center font-mukta text-xs font-bold font-medium text-black xl:text-sm">
              Wydarzenie usunięte
            </span>
          </div>
        );
      } else if (event.user == user.username) {
        return (
          <Link to={`/edit/${event.slug}-${event.uuid}`}>
            <button
              type="submit"
              value="Submit"
              className={`h-7 w-36 rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-1 text-center text-xs font-medium text-white shadow-lg shadow-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-300 xl:h-9 xl:text-sm`}
            >
              Edytuj wydarzenie
            </button>
          </Link>
        );
      } else if (
        event.verificated == "need_improvement" ||
        event.verificated == "awaiting"
      ) {
        return (
          <div
            className={`flex h-7 w-36 items-center justify-center rounded-lg bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 py-1 shadow-lg shadow-yellow-500/10 focus:outline-none focus:ring-2 focus:ring-yellow-300 xl:h-9`}
          >
            <span className="h-auto w-full text-center font-mukta text-xs font-medium text-black xl:text-sm">
              W trakcie weryfikacji
            </span>
          </div>
        );
      } else {
        return (
          <button
            type="submit"
            value="Submit"
            className={`${
              event.participant_self == true
                ? "bg-gradient-to-r from-gray-500 via-gray-600 to-gray-700 text-black shadow-gray-500/10 focus:ring-gray-300"
                : "bg-gradient-to-br from-green-400 via-green-500 to-green-600 text-white shadow-green-500/10 focus:ring-green-300"
            } h-7 w-36 rounded-lg py-1 text-center text-xs font-medium shadow-lg focus:outline-none focus:ring-2 xl:h-9 xl:text-sm`}
            onClick={() =>
              dispatch(event_user_participate(event.id, xcsrfToken))
            }
          >
            {event.participant_self == true
              ? "Przestań brać udział"
              : "Weź udział"}
          </button>
        );
      }
    } else {
      return (
        <div
          id="actions"
          className="flex h-20 w-full flex-row items-center justify-center space-x-8"
        >
          <span className="h-auto pt-2 font-mukta text-sm text-gray-200 xl:text-base">
            Wydarzenie odbyło się {moment(event.event_date).fromNow()}.
          </span>
        </div>
      );
    }
  }

  return [
    imageRender,
    eventAction,
    buttonActions,
    eventParticipantsRender,
    eventScheduleRender,
    eventTicketsRender,
    eventActionSeries,
    modalReport,
    openReport,
    setOpenReport,
    modalDelete,
    openDelete,
    setOpenDelete,
    infoRender,
    infoRenderIcon,
    participantsModule,
    showWrapper,
    setShowWrapper,
  ];
}
export default useEventPage;
