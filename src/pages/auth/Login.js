import React from "react";
import useLoginAuth from "../../hooks/useLoginAuth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [
    handleInputChange,
    handleSubmit,
    handleSubmitGmail,
    handleSubmitFacebook,
  ] = useLoginAuth();
  const history = useNavigate();

  return (
    <div className="flex h-full w-full items-center justify-center px-3">
      <div className="mt-16 flex h-3/5 max-h-[600px] min-h-[500px] w-72 flex-col items-center rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 shadow-blue-500/30 drop-shadow-2xl md:w-96">
        <div className="flex h-10 w-full shrink-0 items-center rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 px-5">
          <span className="text-xl text-white">Logowanie</span>
        </div>

        <div className="flex h-full w-full flex-col items-center justify-center space-y-3 pt-4">
          <form
            onSubmit={handleSubmit}
            className="flex w-7/12 flex-col space-y-4"
          >
            <div className="flex flex-col space-y-1">
              <label
                className="text-sm font-bold text-white"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleInputChange}
                className="rounded-md text-sm"
                required
              />
            </div>
            <div className="flex flex-col space-y-1 pb-5">
              <label
                className="text-sm font-bold text-white"
                htmlFor="username"
              >
                Hasło
              </label>
              <input
                type="password"
                autoComplete="off"
                name="password"
                placeholder="Hasło"
                onChange={handleInputChange}
                className="rounded-md text-sm"
                required
              />
              <div className="flex pt-3">
                <span
                  className="cursor-pointer text-sm text-white underline"
                  onClick={() => history("/password_reset/")}
                >
                  Nie pamiętasz hasła?
                </span>
              </div>
            </div>

            <button
              type="submit"
              value="Submit"
              aria-label="Zaloguj się"
              className="rounded-lg bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:ring-2 focus:ring-red-300"
            >
              Zaloguj się
            </button>
          </form>
          <div>
            <span className="text-md text-white">Lub</span>
          </div>
          <div className="flex w-7/12  flex-col justify-center gap-4 pb-14 md:flex-row md:gap-8">
            <button
              className="flex justify-center rounded-lg bg-blue-500 py-2.5 font-semibold text-white focus:ring-2 focus:ring-blue-400"
              aria-label="Zaloguj się kontem Facebook"
              onClick={handleSubmitFacebook}
            >
              <svg className="h-5 w-24 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button
              className="flex justify-center rounded-lg bg-red-500 py-2.5 font-semibold text-white focus:ring-2 focus:ring-red-400"
              aria-label="Zaloguj się kontem Gmail"
              onClick={handleSubmitGmail}
            >
              <svg className="h-5 w-24 fill-current" viewBox="0 0 24 24">
                <path
                  d="M12 0C5.372 0 0 5.373 0 12s5.372 12 12 12c6.627 0 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-3.868 0-7-3.14-7-7.018c0-3.878 3.132-7.018 7-7.018c1.89 0 3.47.697 4.682 1.829l-1.974 1.978v-.004c-.735-.702-1.667-1.062-2.708-1.062c-2.31 0-4.187 1.956-4.187 4.273c0 2.315 1.877 4.277 4.187 4.277c2.096 0 3.522-1.202 3.816-2.852H12.14v-2.737h6.585c.088.47.135.96.135 1.474c0 4.01-2.677 6.86-6.72 6.86z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
