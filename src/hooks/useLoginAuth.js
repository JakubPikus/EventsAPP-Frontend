import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/auth";
import { getIsNotValid } from "../selectors";
import { useNavigate } from "react-router-dom";
import ips_config from "../ips_config";

function useLoginAuth() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({ username: "", password: "" });
  const isNotValid = useSelector(getIsNotValid);
  const history = useNavigate();

  useEffect(() => {
    if (isNotValid) {
      history("/");
    }
  }, [isNotValid]);

  function openFacebookLoginPage() {
    const params = {
      client_id: "774823227400031",
      redirect_uri: `${ips_config.BACKEND}/api/account/login/facebook`,
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `https://www.facebook.com/v16.0/dialog/oauth?${urlParams}`;
  }

  function openGoogleLoginPage() {
    const params = {
      response_type: "code",
      client_id:
        "298963308775-ao9rr2jc1hobam57co8qpvkpkvjierpb.apps.googleusercontent.com",
      redirect_uri: `${ips_config.BACKEND}/api/account/login/google`,
      prompt: "select_account",
      access_type: "offline",
      scope:
        "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile",
    };

    const urlParams = new URLSearchParams(params).toString();

    window.location = `https://accounts.google.com/o/oauth2/v2/auth?${urlParams}`;
  }

  function handleInputChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(login(user));
  }

  function handleSubmitGmail(e) {
    e.preventDefault();
    openGoogleLoginPage();
  }

  function handleSubmitFacebook(e) {
    e.preventDefault();
    openFacebookLoginPage();
  }

  return [
    handleInputChange,
    handleSubmit,
    handleSubmitGmail,
    handleSubmitFacebook,
  ];
}
export default useLoginAuth;
