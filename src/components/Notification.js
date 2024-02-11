import React, { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import {
  getHandlerAuth,
  getHandlerData,
  getHandlerAdmin,
  getHandlerWebsockets,
} from "../selectors";
import { XIcon } from "@heroicons/react/solid";
import { useNavigate, useSearchParams } from "react-router-dom";

function Notification() {
  const handler_auth = useSelector(getHandlerAuth);
  const handler_data = useSelector(getHandlerData);
  const handler_admin = useSelector(getHandlerAdmin);
  const handler_websockets = useSelector(getHandlerWebsockets);

  const history = useNavigate();

  const initialNotificationDetail = {
    100: "Konto zostało utworzone. Sprawdź skrzynkę mailową w celu potwierdzenia rejestracji.",
    101: "Istnieje już osoba z takim nickiem.",
    102: "Istnieje już konto przypisane do tego maila. W celu odzyskania konta, skorzystaj z funkcji przypominania hasła.",
    201: "Konto jest nieaktywne. Zanim zalogujesz się, sprawdź skrzynkę mailową w celu potwierdzenia rejestracji.",
    202: "Złe dane logowania.",
    322: "Użytkownik został wylogowany.",
    400: "Pomyślnie wylogowano. Zaloguj się ponownie.",
    418: "Zaloguj się ponownie.",
    419: "Zaloguj się ponownie.",
    420: "Twoja sesja wygasła. Zaloguj się ponownie.",
    421: "Adres IP jest zbanowany.",
    422: "Użytkownik jest zbanowany.",
    423: "Użytkownik usunięty.",
    424: "Adres IP usunięty.",
    430: "Zostałeś przeniesiony na główną stronę",
    440: "Zaloguj się ponownie.",
    600: "Twoje konto zostało zweryfikowane.",
    601: "Podałeś zły kod lub został już on użyty.",
    640: "Kolejny kod będziesz mógł wygenerować za 24h.",
    700: "Sprawdź skrzynkę mailową w celu potwierdzenia konta.",
    899: "Na podany mail został wysłany unikalny kod autoryzujący. Podaj go i przejdź do łączenia konta bankowego.",
    900: "Na podany mail został wysłany unikalny kod autoryzujący. Podaj go i ustaw nowe hasło do konta.",
    901: "Do danego email'a nie jest przypisany żaden użytkownik.",
    950: "Do użytkownika przypisane zostało nowe miasto.",
    951: "Do użytkownika przypisany został nowy dystans.",
    990: "Pomyślnie zmieniono hasło.",
    991: "Kod autoryzujący jest niepoprawny.",
    993: "Hasła do siebie nie pasują.",
    1010: "Zgłoszenie zostało wysłane.",
    1011: "Został on już wcześniej usunięty",
    1012: "Zmienił on stan na niewidoczny",
    1050: "Wziąłeś udział w wydarzeniu.",
    1051: "Przestałeś brać udział w wydarzeniu.",
    1100: "Zaproszenie zostało wysłane.",
    1101: "Cofnięto wysłanie zaproszenia.",
    1102: "Zaproszenie zostało zaakceptowane.",
    1103: "Zaproszenie zostało odrzucone.",
    1104: "Usunięto użytkownika z listy znajomych.",
    1201: "Nie masz dostępu do tej strony.",
    1210: "Znajduje się teraz w poczekalni. Po zaakceptowaniu przez administratora, stanie się widoczne dla innych użytkowników.",
    1211: "Zostałeś na nie przekierowany.",
    1212: "Nie możesz edytować takich wydarzeń. Zostałeś cofnięty do poziomu swojego wydarzenia",
    1250: "Każde wydarzenie posiada unikalną nazwę. Prosimy o zmianę tytułu.",
    1300: "Wydarzenie zostało usunięte lub wprowadzane dane są błędne.",
    1301: "Użytkownik został usunięty lub wprowadzane dane są błędne.",
    1302: "Nie masz dostępu do tej strony.",
    1397: "Twoje wydarzenie zmieniło stan zweryfikowania. Twoja akcja nie została wykonana, jak i większosć akcji jest zablokowana do momentu zweryfikowania wydarzenia.",
    1398: "Odznaka zmieniła stan zweryfikowania.",
    1399: "Wydarzenie zmieniło stan zweryfikowania. Twoja akcja nie została wykonana, jak i większosć akcji jest zablokowana do momentu zweryfikowania wydarzenia.",
    1400: "Wydarzenie zostało usunięte.",
    1401: "Komentarz został usunięty.",
    1405: "W trakcie próby wzięcia udziału, wydarzenie zostało usunięte",
    1406: "Podczas próby wzięcia udziału, stan wydarzenia został zmieniony na niezweryfikowany. W momencie jego powrotu do zweryfikowanych, pojawi się ono ponownie w puli losowań.",
    1420: "Przypisano wydarzenie pod serie.",
    1421: "Usunięto wydarzenie z serii.",
    1422: "Seria została utworzona.",
    1423: "Seria została usunięta.",
    1424: "Seria została zedytowana.",
    1425: "Aby zedytować swoją serię, musisz podać inną nazwę lub inny opis.",
    1440: "Proszę o podanie innej nazwy.",
    1500: "Dokonano rezerwacji kodów aktywacyjnych do odznaki.",
    1501: "Utworzono nowe kody aktywacyjne.",
    1502: "Zaznaczone kody aktywacyjne zostały usunięte.",
    1503: "Twoja odznaka została zedytowana. Po weryfikacji przez administratorów, twoja odznaka będzie dopuszczona do aktywacji kodowej.",
    1504: "Twoja odznaka została zedytowana.",
    1505: "Nie zostały wprowadzone żadne zmiany.",
    1506: "Odznaka została utworzona. Po weryfikacji przez administratorów, twoja odznaka będzie dopuszczona do aktywacji kodowej.",
    1507: "Odznaka została utworzona.",
    1508: "Odznaka została usunięta.",
    1510: "Proszę podać inną nazwę.",
    1511: "Nie można wykonywać akcji na odrzuconej odznacę. Możesz jedynie ją usunąć lub skontaktować się z administracją.",
    1512: "Została ona usunięta przed wykonaniem tej akcji.",
    1513: "Pomiędzy edycjami musisz odczekać przynajmniej 3 minuty.",
    1550: "Sprawdź, czy napewno przepisujesz poprawny kod.",
    1551: "Proszę podać inny kod.",
    1553: "Możesz podzielić się z kimś tym kodem.",
    1600: "Pomyślnie wylogowano się z Twojego konta.",
    1601: "Niektóre validatory zostały usunięte.",
    1649: "Pomyślnie odblokowano użytkownika, jednak ten sam użytkownik ma Ciebie zablokowanego.",
    1650: "Pomyślnie odblokowano użytkownika, jednak ten sam użytkownik ma Ciebie zablokowanego. Do czasu odblokowania, będzie on dla Ciebie niewidoczny.",
    1651: "Pomyślnie odblokowano użytkownika.",
    1652: "Użytkownik został zablokowany. Gdy byliście znajomymi, od teraz nimi nie jesteście.",
    1660: "Próbujesz cofnąć zaproszenie, które zostało już wcześniej odrzucone.",
    1661: "Próbujesz zaprosić użytkownika, który pierwszy Ciebie zaprosił.",
    1662: "Próbujesz cofnąć zaproszenie, które zostało już wcześniej zaakceptowane",
    1663: "Próbujesz wykonać akcję na użytkowniku, który Cię zablokował.",
    1664: "Próbujesz odpowiedzieć na zaproszenie, które zostało cofnięte lub ktoś odrzucił je z twojego konta.",
    1665: "Próbujesz usunąć użytkownika, który sam przed chwilą Cię usunął lub ktoś usunął go z twojego konta.",
    1700: "Twoje konto Google zostało odpięte.",
    1701: "Twoje konto Facebook zostało odpięte.",
    1710: "Podaj poprawne, aktualne hasło",
    1720: "Na twój aktualny e-mail, jak i nowy zostały wysłane kody weryfikujące. Podaj je, aby podpiąć nowy mail do konta.",
    1721: "Podawany nowy mail, jest już podpięty pod inne konto.",
    1722: "Twoje konto od teraz jest podpięte pod inny e-mail.",
    1723: "Inny użytkownik zdążył przypisać sobie ten sam e-mail, na którego próbujesz zmienić przypisanie swojego konta",
    1724: "Podaj poprawny kod",
    1725: "Nowy kod został wysłany na twój nowy e-mail.",
    1726: "Wszystkie Twoje wydarzenia jak i cała aktywność na stronie została usunięta.",
    1800: "Konto zostało zedytowane pomyślnie.",
    1810: "Proszę podać inną nazwę użytkownika.",
    1815: "Aby zedytować profil, musisz wpierw wprowadzić zmiany w formularzu.",
    1920: "Odznaka została ustawiona jako główna.",
    1930: "Odznaka została Ci odebrana.",
    2001: "Dane zostały przefiltrowane.",
    2002: "Dane zostały odświeżone.",
    2010: "Wydarzenie zostało wysłane do poprawy",
    2011: "Wydarzenie zostało wysłane do usunięcia",
    2012: "Wydarzenie zostało oczyszczone ze zgłoszeń",
    2013: "Te wydarzenie zostało już oczyszczone przez administratora",
    2014: "Te wydarzenie zostało już ocenione przez administratora",
    2015: "Podczas próby akcji na wydarzeniu wykryto, że organizator wprowadził zmiany do swojego wydarzenia. Dane zostały zaktualizowane.",
    2016: "Podczas próby akcji na wydarzeniu wykryto, że organizator usunął wydarzenie.",
    2020: "Odznaka została wysłana do poprawy",
    2021: "Odznaka została wysłana do usunięcia",
    2022: "Odznaka została oczyszczona ze zgłoszeń",
    2023: "Ta odznaka została już oczyszczona przez administratora",
    2024: "Ta odznaka została już oceniona przez administratora",
    2025: "Podczas próby akcji na odznace wykryto, że organizator wprowadził zmiany do swojej odznaki. Dane zostały zaktualizowane.",
    2026: "Podczas próby akcji na odznace wykryto, że organizator usunął odznakę.",
    2031: "Komentarz został zablokowany",
    2032: "Komentarz został oczyszczony ze zgłoszeń",
    2033: "Ten komentarz został już oczyszczony przez administratora",
    2034: "Ten komentarz został już oceniony przez administratora",
    2036: "Podczas próby akcji na komentarzu wykryto, że został on usunięty.",
    2037: "Bilet został wysłany do usunięcia",
    2038: "Bilet został wysłany do poprawy",

    2042: "Wydarzenie zostało zweryfikowane",
    2043: "Te wydarzenie przeszło już proces sprawdzania",

    2044: "Odznaka została zweryfikowana",
    2045: "Ta odznaka przeszła już proces sprawdzania",
    2046: "Bilet został zweryfikowany.",

    2050: "Użytkownik został zbanowany",
    2051: "Podczas próby akcji na użytkowniku wykryto, że konto zostało usunięte",
    2052: "Podczas próby akcji na użytkowniku wykryto, że konto zostało już zbanowane",

    2055: "Adres IP zostało zbanowane",
    2056: "Podczas próby akcji na adresie IP wykryto, że adres został usunięty",
    2057: "Podczas próby akcji na adresie IP wykryto, że adres został już zbanowany",
    2058: "Połączenie zostanie usunięte dla tego użytkownika",

    2060: "Użytkownik został wylogowany ze wszystkich adresów IP",
    2061: "Z podanego adresu IP zostały wylogowane wszystkie konta",
    2062: "Konto zostało wylogowane",

    2070: "Już ktoś inny odblokował tego użytkownika z Twojego konta",
    2071: "Już ktoś inny zablokował tego użytkownika z Twojego konta",
    2072: "Już ktoś inny zaprosił tego użytkownika z Twojego konta",
    2073: "Użytkownik został usunięty",
    2075: "Konto bankowe zostało podpięte",
    2076: "Konto bankowe zostało odpięte",
    2080: "Podany kod jest poprawny",
    2081: "Po przejściu weryfikacji przez administrację, zostaniesz o tym powiadomoniony",
    2082: "Zarządzanie biletami na te wydarzenie zostało wyłączone",
    2083: "Edytując jedynie ilość, bilet nie musi przechodzić weryfikacji. Odrazu jest dostępny do kupienia",

    2090: "Ustaw w bilecie inną nazwę",
    2091: "Do momentu zweryfikowania wydarzenia ponownie, straciłeś możliwość tworzenia biletów pod te wydarzenie.",
    2092: "Zostało ono usunięte przez administrację lub ktoś usunął je z twojego konta.",
    2093: "Do uzyskania możliwości zarządzania biletami, podepnij swoje konto.",
    2094: "Dane zostały odświeżone.",
    2095: "Podaj inny rodzaj biletu.",
    2096: "Musisz podać większą ilość dostępnych biletów do poprawnej edycji.",

    2100: "Bilet został usunięty.",

    2110: "Zaraz zostaniesz przekierowany do płatności.",
    2111: "Spróbuj ponownie później.",
    2112: "Przed rozpoczęciem kolejnej transakcji, musisz uregulować lub zanulować poprzednią.",
    2113: "Zostało ono usunięte przez organizatora lub administrację.",
    2114: "Została usunięta możliwość jego kupna.",
    2115: "Zapraszamy do kupna biletów na inne wydarzenia.",
    2116: "Do czasu ich zweryfikowania, ich zakup został zablokowany.",
    2117: "Informacje zostały zaktualizowane.",
    2118: "Chwilowo opłata biletów jest niemożliwa.",
    2119: "Do tego czasu płatność za bilet, który chcesz kupić zostanie zablokowana.",
    2120: "Do czasu jego weryfikacji, zniknie ono z możliwości wyszukania go.",
    2130: "Zaraz rozpocznie się pobieranie biletu.",
    2131: "Zaraz rozpocznie się pobieranie potwierdzenia płatności.",

    2134: "Możliwość zwrotu biletów na te wydarzenie została zablokowana.",

    2135: "Środki zostały zwrócone na konto bankowe podpięte w ustawieniach",
    2136: "Bilet jest w oczekiwaniu aż administracja zwróci pieniądze na konto podpięte w ustawieniach.",
    2137: "Do uzyskania możliwości zwracania biletów, podepnij swoje konto.",
    2138: "W razie problemów, skontaktuj się z organizatorem jeśli ktoś użył Twój bilet.",

    2139: "Bilet został przekazany do zwrotu.",
    2140: "Od tego momentu nie będzie dalej widniał jako zarezerwowany.",
    2141: "Możesz pobrać swoje opłacone bilety.",
    2142: "Bilety zostały odświeżone.",

    2150: "Zapraszamy do kupna innych biletów.",
    2151: "Środki zostaną zwrócone na konto.",
    2152: "Spróbuj opłacić zamówienie za chwilę.",
    2155: "Zamówienia można próbować opłacać w odstępie 5 minut.",
    2160: "Sprawdź w panelu swoich biletów status weryfikacji.",
    2161: "Płatności za zamówienia, w których żaden bilet nie został zwrócony ani użyty zostały cofnięte. Za pozostałe otrzymasz wkrótce zwrot na konto podpięte w ustawieniach.",
    2162: "Zapraszamy do podjęcia innych akcji. W momencie porzucenia przez administratora wykonania przelewu, bramka zostanie otwarta do 30 minut.",
    2163: "W określonym czasie wykonaj teraz przelew na konto podane poniżej oraz przed potwierdzeniem zamieść potwierdzenie PDF przelewu.",
    2164: "Do tego czasu wypłata za wydarzenie zostanie zablokowana",
    2165: "Zapraszamy do podjęcia innych akcji.",
    2166: "Prosimy przesłać poprawny plik PDF z potwierdzeniem przelewu.",
    2167: "Otwórz ją ponownie w celu ponownej próby wykonania płatności.",
    2168: "Dane w panelu biletów zostały zaktualizowane.",
    2169: "Przejdź do zakładki z ustawieniami i podepnij konto bankowe, aby dostać przelew ze zwrotów za anulowane wydarzenie.",
    2170: "Została rozpoczęta procedura płatności związana z twoim biletem bądź wydarzeniem. Spróbuj zmienić konto za chwilę.",
    2171: "Sprawdź szczegóły z jakiego powodu została zablokowana ta czynność",

    ip_banned: "Adres IP jest zbanowany.",
    user_banned: "Użytkownik jest zbanowany.",
    social_user: "Zaloguj się emailem i powiąż swoje główne konto.",
    not_verificated: "Zaloguj się za pomocą maila i przejdź weryfikacje konta.",
    unauthorized: "Zaloguj się, aby mieć dostęp do tej strony.",
    not_admin: "Do tej strony ma dostęp jedynie administrator",
    not_organizer: "Nie jesteś organizatorem tego wydarzenia.",
    gmail_linked: "Konto zostało powiązane z Google",
    facebook_linked: "Konto zostało powiązane z Facebook",
    gmail_usage: "Te konto Google jest już powiązane z innym kontem",
    facebook_usage: "Te konto Facebook jest już powiązane z innym kontem",
  };

  const initialSuccessTitle = {
    gmail_linked: "Powiązanie poprawne",
    facebook_linked: "Powiązanie poprawne",
  };

  const initialErrorTitle = {
    ip_banned: "Logowanie nie powiodło się",
    user_banned: "Logowanie nie powiodło się",
    social_user: "Konto nie jest powiązane",
    not_verificated: "Konto nie jest zweryfikowane",
    unauthorized: "Brak zalogowanego użytkownika",
    not_admin: "Brak dostępu",
    not_organizer: "Brak dostępu",
    gmail_usage: "Błąd w powiązaniu",
    facebook_usage: "Błąd w powiązaniu",
  };

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);

    let error = params.get("error");
    let success = params.get("success");

    if (error != null) {
      showHandler(error, initialErrorTitle[error]);
    } else if (success != null) {
      showHandler(success, initialSuccessTitle[success]);
    }
  }, []);

  useEffect(() => {
    showHandler(handler_auth.code, handler_auth.error, handler_auth.success);
  }, [handler_auth]);

  useEffect(() => {
    showHandler(handler_data.code, handler_data.error, handler_data.success);
  }, [handler_data]);

  useEffect(() => {
    showHandler(
      handler_websockets.code,
      handler_websockets.error,
      handler_websockets.success
    );
  }, [handler_websockets]);

  useEffect(() => {
    if (handler_admin !== undefined) {
      showHandler(
        handler_admin.code,
        handler_admin.error,
        handler_admin.success
      );
    }
  }, [handler_admin]);

  function showHandler(error, ...title) {
    let handler_div = document.getElementById("handler_div");
    let handler_title = document.getElementById("handler_title");
    let handler_detail = document.getElementById("handler_detail");

    if (Object.keys(initialNotificationDetail).includes(error)) {
      handler_title.innerHTML = title.join("");
      handler_detail.innerHTML = initialNotificationDetail[error];
      handler_div.classList.remove("hidden");

      setTimeout(() => {
        handler_div.classList.add("hidden");
      }, 4000);
    }
  }

  return (
    <div
      id="handler_div"
      className="fixed top-5 left-1/2 z-30 flex hidden h-[150px] w-[300px] -translate-x-1/2 justify-center"
    >
      <div className="absolute top-20 flex h-[150px] w-[300px]">
        <div className="flex w-full flex-col rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-2xl">
          <div className="flex h-12 w-full flex-row items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-3">
            <span className="text-white" id="handler_title"></span>
            <XIcon
              onClick={() => {
                document.getElementById("handler_div").classList.add("hidden");
              }}
              className="-mr-2 block h-8 w-8 cursor-pointer text-red-400"
            ></XIcon>
          </div>

          <div className="flex flex-col justify-center p-3">
            <span className="text-sm text-white" id="handler_detail"></span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Notification;
