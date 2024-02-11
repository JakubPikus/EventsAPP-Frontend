import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { accountConfirm, generateNewCode } from "../actions/auth";
import { getXCSRFToken, getUser } from "../selectors";

function useAccountConfirm() {
  const dispatch = useDispatch();
  const XCSRFToken = useSelector(getXCSRFToken);
  const user = useSelector(getUser);

  const [code, setCode] = useState("");

  function handleInputChange(e) {
    setCode(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(accountConfirm(code, user));
  }

  function handleSubmitNewCode(e) {
    e.preventDefault();
    dispatch(generateNewCode(user));
  }

  return [handleInputChange, handleSubmit, handleSubmitNewCode];
}
export default useAccountConfirm;
