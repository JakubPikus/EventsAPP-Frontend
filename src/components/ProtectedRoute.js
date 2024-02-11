import { useSelector } from "react-redux";
import { getIsAuthenticated, getIsNotValid, getIsLogout } from "../selectors";

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = useSelector(getIsAuthenticated);
  const isNotValid = useSelector(getIsNotValid);
  const isLogout = useSelector(getIsLogout);

  if (isAuthenticated && !isNotValid) {
    return children;
  } else if (isLogout) {
    return <Navigate to="/login" replace />;
  } else {
    return <Navigate to="/login/?error=unauthorized" replace />;
  }
}

export default ProtectedRoute;
