import React, { useEffect } from "react";

import FirstVisitor from "./FirstVisitor";
import { useSelector } from "react-redux";
import {
  getIsAuthenticated,
  getIsLogout,
  getIsNotValid,
} from "../../selectors";
import Login from "./Login";
import AccountConfirmation from "./AccountConfirmation";
import HomePage from "../../components/HomePage";
import { Navigate } from "react-router-dom";

import ProviderHome from "../../providers/ProviderHome";
import Home from "../start/Home";

function Start() {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isLogout = useSelector(getIsLogout);
  const isNotValid = useSelector(getIsNotValid);

  if (isNotValid) {
    return (
      <HomePage>
        <AccountConfirmation />
      </HomePage>
    );
  } else if (isAuthenticated && !isNotValid) {
    return (
      <ProviderHome>
        <Home />
      </ProviderHome>
    );
  } else if (isLogout) {
    return <Navigate to="/login" replace />;
  } else {
    return <FirstVisitor />;
  }
}

export default Start;
