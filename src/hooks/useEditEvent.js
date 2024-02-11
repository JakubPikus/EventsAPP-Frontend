import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/solid";
import {
  getCities,
  getNewEvent,
  getHandlerData,
  getEventRejected,
  getEvent,
} from "../selectors";

import { useNavigate, Navigate } from "react-router-dom";

function useEditEvent() {
  const history = useNavigate();
  const cities = useSelector(getCities);
  const handler_data = useSelector(getHandlerData);
  const new_event = useSelector(getNewEvent);
  const is_rejected = useSelector(getEventRejected);
  const eventData = useSelector(getEvent);

  // ZMIANA STRONY KIEDY ZMIANA BĘDZIE POMYŚLNA

  useEffect(() => {
    if (handler_data.code == "1210" || handler_data.code == "1211") {
      history(`/event/${new_event.slug}-${new_event.uuid}`);
    } else if (handler_data.code == "1212") {
      history(`/event/${is_rejected.slug}-${is_rejected.uuid}`);
    } else if (handler_data.code == "1213") {
      history(`/event/${eventData.slug}-${eventData.uuid}`);
    } else if (handler_data.code == "1300" || handler_data.code == "1201") {
      history(`/`);
    }
  }, [handler_data]);

  const formErrorInitial = {
    title:
      "Skonstruuj tytuł tak, aby trafił do jak największej ilości osób. Minimum 5 znaków.",
    startDate:
      "Ustaw datę wydarzenia. Pamiętaj, że nie możesz ustawić daty, która była w przeszłości.",
    schedule:
      "Ustal harmonogram wydarzenia lub dodaj chociaż jego godzinę rozpoczęcia. Pamiętaj o podaniu poprawnych godzin zakończenia.",
    city: "Wybierz miasto znajdujące się w podanym województwie.",
    image:
      "Ustaw chociaż jedno zdjęcie do wydarzenia. Pamiętaj, aby przesłane pliki były obrazkiem.",
    text: "Opis musi posiadać chociaż 50 znaków.",
  };
  const [formError, setFormError] = useState({});
  const [validated, setValidated] = useState(true);

  useEffect(() => {
    if (Object.keys(formError).length === 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [formError]);

  function formErrorStill(name) {
    setFormError({
      ...formError,
      [name]: formErrorInitial[name],
    });
  }

  function formErrorDelete(name) {
    let copiedFormError = { ...formError };
    delete copiedFormError[name];
    setFormError(() => ({ ...copiedFormError }));
  }

  function checkCity(temp) {
    for (var key in cities) {
      if (cities[key].name == temp) {
        return true;
      }
    }
    return false;
  }

  function validator(name, value) {
    switch (name) {
      case "title":
        if (value.length > 5) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "startDate":
        if (value !== null) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "city":
        if (checkCity(value)) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "text":
        if (value.length > 50) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;
      default:
        break;
    }
  }

  function checkForm(value) {
    {
      return formError[value] ? (
        <span className="h-auto w-full pl-1 pb-1 font-mukta text-sm text-gray-300">
          {formError[value]}
        </span>
      ) : (
        <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
      );
    }
  }

  // MODUŁ WYŚWIETLANIA STANU WYDARZENIA
  function infoRender(state, details) {
    if (state == "awaiting") {
      return (
        <div className="flex h-auto w-full items-center justify-center rounded-md bg-gradient-to-br from-yellow-600 via-yellow-500 to-yellow-300 p-6 opacity-75 drop-shadow-2xl">
          <span className="text-center font-mukta text-sm text-black  lg:text-lg">
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
  return [
    checkForm,
    validated,
    infoRender,
    formErrorStill,
    formErrorDelete,
    validator,
  ];
}
export default useEditEvent;
