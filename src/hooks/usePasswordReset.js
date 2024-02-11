import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  passwordReset,
  passwordResetConfirm,
  generateNewCode,
  clear_password_reset,
} from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/solid";
import {
  getUser,
  getIsPasswordResetForm,
  getIsPasswordReset,
} from "../selectors";

function usePasswordReset() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [form, setForm] = useState({
    code: "",
    password: "",
    re_password: "",
  });

  const [validatedEmail, setValidatedEmail] = useState(false);
  const [validatedForm, setValidatedForm] = useState(false);
  const history = useNavigate();
  const user = useSelector(getUser);
  const isPasswordResetForm = useSelector(getIsPasswordResetForm);
  const isPasswordReset = useSelector(getIsPasswordReset);
  const [showCodeForm, setShowCodeForm] = useState(false);
  const [firstRender, setFirstRender] = useState(false);

  useEffect(() => {
    setShowCodeForm(false);
    if (isPasswordReset) {
      dispatch(clear_password_reset());
    }
    setFirstRender(true);
  }, []);

  const formErrorInitial = {
    code: "Kod składa się z 6 cyfr",
    password: "Minimum 8 znaków i hasła muszą pasować do siebie",
  };
  const [formError, setFormError] = useState(formErrorInitial);

  useEffect(() => {
    if (Object.keys(formError).length === 0) {
      setValidatedForm(true);
    } else {
      setValidatedForm(false);
    }
  }, [Object.keys(formError).length]);

  useEffect(() => {
    if (isPasswordResetForm) {
      history("/login/");
    }
  }, [isPasswordResetForm]);

  function validatorEmail(value) {
    var email = value;
    var indexSign = email.indexOf("@");
    var indexLastDot = email.lastIndexOf(".");

    if (
      indexSign > 0 && //1 znak przed małpą
      indexSign + 1 < indexLastDot && //1 znak miedzy małpą a kropką
      indexLastDot + 2 < email.length // 2 znaki po ostatniej kropce
    ) {
      setValidatedEmail(true);
    } else {
      setValidatedEmail(false);
    }
  }

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

  function validator(name, value) {
    switch (name) {
      case "code":
        if (value.length == 6) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "password":
        if (value.length >= 8 && value === form.re_password) {
          formErrorDelete(name);
        } else {
          formErrorStill(name);
        }
        break;

      case "re_password":
        if (value.length >= 8 && value === form.password) {
          formErrorDelete("password");
        } else {
          formErrorStill("password");
        }
        break;
      default:
        break;
    }
  }

  function handleInputChangeEmail(e) {
    validatorEmail(e.target.value);
    setEmail(e.target.value);
  }

  function handleSubmitEmail(e) {
    e.preventDefault();
    if (validatedEmail) {
      dispatch(passwordReset(email));
    }
  }

  function handleInputChangeForm(e) {
    validator(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    if (validatedForm) {
      dispatch(passwordResetConfirm(user, form));
    }
  }

  function handleSubmitNewCode(e) {
    e.preventDefault();
    dispatch(generateNewCode(user));
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
  ];
}
export default usePasswordReset;
