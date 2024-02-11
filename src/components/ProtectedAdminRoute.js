import { useSelector } from "react-redux";
import {
  getIsAuthenticated,
  getUser,
  getIsNotValid,
  getIsLogout,
} from "../selectors";

import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isLogout = useSelector(getIsLogout);
  const isNotValid = useSelector(getIsNotValid);
  const user = useSelector(getUser);

  if (isAuthenticated && !isNotValid && user.is_admin) {
    return children;
  } else if (isLogout) {
    return <Navigate to="/login" replace />;
  } else if (!isAuthenticated && !isNotValid) {
    return <Navigate to="/login/?error=unauthorized" replace />;
  } else {
    return <Navigate to="/?error=not_admin" replace />;
  }
}

export default ProtectedAdminRoute;
