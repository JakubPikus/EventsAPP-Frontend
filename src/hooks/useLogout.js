import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/auth";
import { getXCSRFToken } from "../selectors";
import { useNavigate } from "react-router-dom";

function useLogout() {
  const dispatch = useDispatch();
  const XCSRFToken = useSelector(getXCSRFToken);
  const history = useNavigate();

  function logoutSubmit(e) {
    e.preventDefault();
    dispatch(logout(XCSRFToken));
  }

  return [logoutSubmit];
}
export default useLogout;
