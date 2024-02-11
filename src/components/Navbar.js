import React from "react";
import { MenuIcon, XIcon, StatusOfflineIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { setLogoutFalse } from "../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  getIsLogout,
  getIsAuthenticated,
  getIsNotValid,
  getUser,
  getContactWebsockets,
} from "../selectors";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [logoutSubmit] = useLogout();
  const isLogout = useSelector(getIsLogout);
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isNotValid = useSelector(getIsNotValid);
  const user = useSelector(getUser);

  const socket = useSelector(getContactWebsockets);
  const history = useNavigate();

  const handleClick = () => {
    setIsMenuActive((current) => !current);
  };

  useEffect(() => {
    let list = document.getElementById("list");
    let wrapper = document.getElementById("wrapper");
    if (isMenuActive) {
      list.classList.remove("hidden");
      wrapper.classList.add("h-48");
    } else if (!isMenuActive) {
      list.classList.add("hidden");
      wrapper.classList.remove("h-48");
    }
  }, [isMenuActive]);

  function goStartPage() {
    if (isLogout) {
      dispatch(setLogoutFalse());
    }

    history("/");
  }

  function menuButton() {
    if (isAuthenticated || isNotValid) {
      return (
        <>
          {socket.isConnected == false && isAuthenticated && (
            <div className="hidden h-8 flex-row items-center  justify-between space-x-2 rounded-xl bg-gray-800 px-3 md:block md:flex">
              <StatusOfflineIcon className="block h-6 w-6 text-red-400"></StatusOfflineIcon>

              <span className="text-xs text-white">
                Połączenie zostało zerwane
              </span>
            </div>
          )}
          {user.is_admin && !isNotValid && (
            <Link to="/admin/dashboard" className="w-full md:w-auto md:px-5">
              <button className="w-full rounded-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 py-3 font-mukta font-bold text-gray-100 hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-orange-300 md:w-auto md:py-1 md:px-4">
                Panel administracyjny
              </button>
            </Link>
          )}

          <button
            className="w-full rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-3 font-mukta text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 md:w-auto md:py-1 md:px-4"
            type="submit"
            onClick={logoutSubmit}
          >
            Wyloguj się
          </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/login" className="flex w-full md:w-auto md:px-5">
            <button className="w-full rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-3 font-mukta text-lg text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 md:w-auto md:py-1 md:px-5">
              Zaloguj się
            </button>
          </Link>
          <Link to="/register" className="flex w-full md:w-auto md:px-5">
            <button className="w-full rounded-full bg-gradient-to-r from-red-400 via-red-500 to-red-600 py-3 font-mukta text-lg text-white hover:bg-gradient-to-br focus:outline-none focus:ring-2 focus:ring-red-300 md:w-auto md:py-1 md:px-5 ">
              Zarejestruj się
            </button>
          </Link>
        </>
      );
    }
  }

  return (
    <>
      <div className="fixed top-0 left-0 z-40 flex h-14 w-screen flex-row items-center justify-between bg-gray-900 px-8 drop-shadow-2xl">
        <div>
          <span
            className="cursor-pointer text-2xl text-white"
            onClick={goStartPage}
          >
            EventsAPP
          </span>
        </div>

        <div
          id="wrapper"
          className="absolute top-12 left-0 z-50 w-screen rounded-b-xl bg-gray-900 md:hidden md:h-0"
        >
          {isMenuActive && (
            <div className="z-50 h-full flex-col space-y-8 px-12 pt-6 sm:px-32 md:hidden">
              {menuButton()}
            </div>
          )}
        </div>
        <div className="flex flex-row items-end justify-end space-x-6">
          {socket.isConnected == false && isAuthenticated && (
            <div className="flex h-8 flex-row items-center  justify-between space-x-2 rounded-xl bg-gray-800 px-3 md:hidden">
              <StatusOfflineIcon className="block h-6 w-6 text-red-400"></StatusOfflineIcon>
            </div>
          )}

          {isMenuActive ? (
            <XIcon
              className="block h-8 w-8 cursor-pointer text-red-400 md:hidden"
              onClick={handleClick}
            ></XIcon>
          ) : (
            <MenuIcon
              className="block h-8 w-8 cursor-pointer text-red-400 md:hidden"
              onClick={handleClick}
            />
          )}
        </div>

        <div
          className="absolute left-1/4 right-1/4 top-[80px] hidden h-0 w-0 flex-col md:static md:left-auto md:right-auto md:top-[0px] md:flex md:h-auto md:w-auto md:flex-row md:gap-20"
          id="list"
        >
          <div className="hidden flex-row space-x-4 md:block md:flex">
            {menuButton()}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
