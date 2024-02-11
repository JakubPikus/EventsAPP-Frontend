import React, { useEffect, useState } from "react";
import useAccountConfirm from "../../hooks/useAccountConfirm";
import { RefreshIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { getHandlerAuth, getUser } from "../../selectors";

function AccountConfirmation() {
  const [handleInputChange, handleSubmit, handleSubmitNewCode] =
    useAccountConfirm();
  const [status, setStatus] = useState();
  const handler = useSelector(getHandlerAuth);
  const user = useSelector(getUser);

  function detail() {
    if (status === "toVerify") {
      return (
        <span className="pb-2 text-center text-sm text-white">
          Użytkownik "{user.username}" jest niezweryfikowany. Wejdź na email "
          {user.email}" i przepisz wysłany kod aby odblokować dostęp lub zaloguj
          się do konta poprzez jedno z podłączonych social media.
        </span>
      );
    } else if (status === "newDevice") {
      return (
        <span className="pb-2 text-center text-sm text-white">
          Wykryto logowanie z nowego urządzenia. Został wysłany kod weryfikujący
          na mail przypisany do konta. Aby odblokować dostęp podaj go lub
          zaloguj się do konta poprzez jedno z podłączonych social media.
        </span>
      );
    } else if (status === "toVerifyNewDevice") {
      return (
        <span className="pb-2 text-center text-sm text-white">
          Podaj kod z przypisanego do konta maila, aby odblokować dostęp lub
          zaloguj się do konta poprzez jedno z podłączonych social media.
        </span>
      );
    }
  }

  useEffect(() => {
    if (handler.code === "286") {
      setStatus("toVerify");
    } else if (handler.code === "288") {
      setStatus("newDevice");
    } else if (handler.code === "287") {
      setStatus("toVerifyNewDevice");
    }
  }, [handler.code]);
  return (
    <div className="mt-16 flex w-72 flex-col items-center justify-center gap-7 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-2xl md:w-96">
      <div className="flex h-10 w-full items-center rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
        <span className="text-xl text-white">Potwierdzanie konta</span>
      </div>
      <form
        className="flex w-7/12 flex-col space-y-4 pb-10"
        onSubmit={handleSubmit}
      >
        {detail()}

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-bold text-white" htmlFor="kod">
            Kod
          </label>
          <div className="flex w-full flex-row items-center justify-between">
            <input
              type="text"
              autoComplete="off"
              name="kod"
              placeholder="6-cyfrowy kod"
              className="flex w-3/4 rounded-md text-sm"
              required
              maxLength={6}
              onChange={handleInputChange}
            />
            <RefreshIcon
              className="h-8 w-8 shrink-0 cursor-pointer text-red-400"
              onClick={handleSubmitNewCode}
            ></RefreshIcon>
          </div>
        </div>

        <button
          type="submit"
          aria-label="Potwierdź weryfikację konta"
          value="Submit"
          className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-2 focus:ring-red-300"
        >
          Wyślij
        </button>
      </form>
    </div>
  );
}

export default AccountConfirmation;
