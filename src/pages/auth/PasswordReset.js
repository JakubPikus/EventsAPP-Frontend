import React, { useEffect, useState } from "react";
import HomePage from "../../components/HomePage";
import { CheckIcon, RefreshIcon } from "@heroicons/react/solid";
import usePasswordReset from "../../hooks/usePasswordReset";
import { useSelector } from "react-redux";
import { getIsPasswordReset, getUser } from "../../selectors";

function PasswordReset() {
  const [
    handleInputChangeEmail,
    handleSubmitEmail,
    validatedEmail,
    handleInputChangeForm,
    handleSubmitForm,
    validatedForm,
    checkForm,
    handleSubmitNewCode,
    showCodeForm,
    setShowCodeForm,
    firstRender,
  ] = usePasswordReset();

  const isPasswordReset = useSelector(getIsPasswordReset);
  const user = useSelector(getUser);

  useEffect(() => {
    if (isPasswordReset && firstRender) {
      setShowCodeForm(true);
    }
  }, [isPasswordReset]);

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div
        className={`mt-12 flex   ${
          showCodeForm
            ? "max-h-[700px] min-h-[300px] "
            : "max-h-[500px] min-h-[200px] "
        } w-80 flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-2xl`}
      >
        <div className="flex h-10 w-full shrink-0 items-center rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
          <span className="text-xl text-white">Resetowanie hasła</span>
        </div>
        <form
          className="flex h-full  w-7/12 flex-col space-y-3 py-8"
          onSubmit={handleSubmitEmail}
        >
          {!showCodeForm && (
            <span className="pb-2 text-center text-sm text-white">
              Podaj adres email konta, do którego chcesz odzyskać dostęp.
            </span>
          )}
          <div className="flex flex-col space-y-1 pb-3">
            <label className="text-sm font-bold text-white" htmlFor="Email">
              Email
            </label>
            <input
              disabled={isPasswordReset}
              id="inputEmail"
              type="text"
              name="EmailRemember"
              placeholder="Email"
              className={`rounded-md text-sm `}
              onChange={handleInputChangeEmail}
              required
            />
            {validatedEmail ? (
              <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
            ) : (
              <span className="text-sm text-white">Uzupełnij email</span>
            )}
          </div>

          {!showCodeForm && (
            <button
              id="submitEmail"
              aria-label="Wyślij wiadomość z kodem na email"
              type="submit"
              value="Submit"
              disabled={!validatedEmail}
              className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-red-500/30 focus:outline-none focus:ring-4 focus:ring-blue-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none "
            >
              Wyślij
            </button>
          )}
        </form>

        {showCodeForm && (
          <form
            className="-mt-10 flex w-7/12 flex-col space-y-4 pb-10"
            id="codeForm"
            onSubmit={handleSubmitForm}
          >
            <div className="flex flex-col space-y-4 pb-5">
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-bold text-white" htmlFor="code">
                  Kod
                </label>
                <div className="flex w-full flex-row items-center justify-between">
                  <input
                    type="text"
                    autoComplete="off"
                    name="code"
                    placeholder="6-cyfrowy kod"
                    className="flex w-3/4 rounded-md text-sm"
                    onChange={handleInputChangeForm}
                    required
                  />
                  <RefreshIcon
                    className="h-8 w-8 shrink-0 cursor-pointer text-red-400"
                    onClick={handleSubmitNewCode}
                  ></RefreshIcon>
                </div>

                {checkForm("code")}
              </div>

              <div className="flex flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="password"
                >
                  Nowe hasło
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  placeholder="Nowe hasło"
                  className="rounded-md text-sm"
                  onChange={handleInputChangeForm}
                  required
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label
                  className="text-sm font-bold text-white"
                  htmlFor="re_password"
                >
                  Powtórz hasło
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="re_password"
                  placeholder="Powtórz hasło"
                  className="rounded-md text-sm"
                  onChange={handleInputChangeForm}
                  required
                />
                {checkForm("password")}
              </div>
            </div>

            <button
              type="submit"
              aria-label="Potwierdź ustawienie nowego hasła"
              value="Submit"
              disabled={!validatedForm}
              className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-2.5 text-center text-sm font-medium text-white shadow-lg shadow-red-500/30 focus:outline-none focus:ring-4 focus:ring-blue-300 enabled:hover:bg-gradient-to-br disabled:cursor-not-allowed disabled:from-gray-500 disabled:via-gray-600 disabled:to-gray-700 disabled:text-black disabled:shadow-none "
            >
              Wyślij
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PasswordReset;
