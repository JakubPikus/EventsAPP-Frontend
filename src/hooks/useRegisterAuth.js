import React from "react";
import { useState, useEffect } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { register, data_province } from "../actions/auth";
import { getIsRegistered, getProvinces, getCities } from "../selectors";
import { useNavigate } from "react-router-dom";

function useRegisterAuth() {
  const dispatch = useDispatch();
  const isRegistered = useSelector(getIsRegistered);
  const provinces = useSelector(getProvinces);
  const cities = useSelector(getCities);
  const [validated, setValidated] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const history = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    re_password: "",
    email: "",
    first_name: "",
    last_name: "",
    province: "",
    city: "",
  });

  const formErrorInitial = {
    username: "Minimum 5 znaków, jedynie litery, cyfry i @/./+/-/_",
    password: "Minimum 8 znaków i hasła muszą pasować do siebie",
    email: "To nie przypomina email'a",
    first_name: "Uzupełnij wyłącznie imieniem",
    last_name: "Uzupełnij wyłącznie nazwiskiem",
    province: "Wybierz województwo",
    city: "Wybierz miasto znajdujące się w podanym województwie",
  };
  const [formError, setFormError] = useState(formErrorInitial);

  useEffect(() => {
    dispatch(data_province());
  }, []);

  useEffect(() => {
    if (Object.keys(formError).length === 0) {
      setValidated(true);
    } else {
      setValidated(false);
    }
  }, [formError]);

  useEffect(() => {
    if (isRegistered) {
      history("/login/");
    }
  }, [isRegistered]);

  function formErrorStill(name) {
    setFormError({
      ...formError,
      [name]: formErrorInitial[name],
    });
  }

  function formErrorDelete(name) {
    let copiedFormError = { ...formError };
    delete copiedFormError[name];
    setFormError(() => ({ ...copiedFormError }));
  }

  function checkMail(temp) {
    var email = temp;
    var indexSign = email.indexOf("@");
    var indexLastDot = email.lastIndexOf(".");

    if (
      indexSign > 0 && //1 znak przed małpą
      indexSign + 1 < indexLastDot && //1 znak miedzy małpą a kropką
      indexLastDot + 2 < email.length // 2 znaki po ostatniej kropce
    ) {
      return true;
    } else {
      return false;
    }
  }

  function checkUsername(temp) {
    var usernameRegex = /^[A-Za-z0-9@_+-.]*$/;
    var username = temp;

    if (username.match(usernameRegex) && username.length >= 5) {
      return true;
    } else {
      return false;
    }
  }

  function checkProvince(temp) {
    for (var key in provinces) {
      if (provinces[key].name == temp) {
        setSelectedProvince(provinces[key].id);
        return true;
      }
    }
    setSelectedProvince(null);
    return false;
  }

  function checkCity(temp) {
    for (var key in cities) {
      if (cities[key].name == temp) {
        return true;
      }
    }
    return false;
  }

  function validator(name, value) {
    switch (name) {
      case "username":
        if (checkUsername(value)) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "password":
        if (value.length >= 8 && value === user.re_password) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "re_password":
        if (value.length >= 8 && value === user.password) {
          formErrorDelete("password");
        } else {
          formErrorStill("password");
        }
        break;

      case "email":
        if (checkMail(value)) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "first_name":
        if (value.length > 2 && value.indexOf(" ") < 0) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "last_name":
        if (value.length > 2 && value.indexOf(" ") < 0) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;
      case "province":
        if (checkProvince(value)) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;
      case "city":
        if (checkCity(value)) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      default:
        break;
    }
  }
  function handleInputChange(e) {
    validator(e.target.name, e.target.value);
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validated) {
      dispatch(register(user));
    }
  }

  function checkForm(value) {
    {
      return formError[value] ? (
        <label className="text-sm text-white">{formError[value]}</label>
      ) : (
        <CheckIcon className="block h-8 w-8 text-green-400"></CheckIcon>
      );
    }
  }

  return [
    handleInputChange,
    handleSubmit,
    checkForm,
    validated,
    selectedProvince,
    formErrorStill,
    provinces,
    cities,
  ];
}
export default useRegisterAuth;
