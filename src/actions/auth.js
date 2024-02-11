import {
  TOKENS_NOT_FOUND,
  TOKEN_ACCESS_NOT_VALID,
  TOKEN_REFRESH_NOT_VALID,
  TOKEN_REFRESH_IS_BLACKLISTED,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_NOT_VERIFICATED,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  GETUSER_SUCCESS,
  GETUSER_FAIL,
  GETUSER_FAIL_REFRESH,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  SET_LOGOUT_FALSE,
  ACCOUNT_CONFIRM_SUCCESS,
  ACCOUNT_CONFIRM_FAIL,
  GENERATE_NEWCODE_SUCCESS,
  GENERATE_NEWCODE_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
  PASSWORD_RESET_CONFIRM_SUCCESS,
  PASSWORD_RESET_CONFIRM_FAIL,
  DATA_PROVINCE_SUCCESS,
  DATA_PROVINCE_FAIL,
  DATA_CITIES_SUCCESS,
  DATA_CITIES_FAIL,
  CHANGE_USER_LOCATION_SUCCESS,
  CHANGE_USER_LOCATION_FAIL,
  CHANGE_USER_DISTANCE_SUCCESS,
  CHANGE_USER_DISTANCE_FAIL,
  MENU_STATE_CHANGE,
  UNLINKED_GOOGLE_SUCCESS,
  UNLINKED_GOOGLE_FAIL,
  UNLINKED_FACEBOOK_SUCCESS,
  UNLINKED_FACEBOOK_FAIL,
  SET_NEW_EMAIL,
  ACCOUNT_DELETE_SUCCESS,
  ACCOUNT_DELETE_FAIL,
  ACCOUNT_EDIT_SUCCESS,
  ACCOUNT_EDIT_FAIL,
  IPADDRESS_BANNED,
  USER_BANNED,
  USER_DELETED,
  IPADDRESS_DELETED,
  ADMIN_NOT_PERMISSION,
  CLEAR_PASSWORD_RESET,
  SET_PINNED_BANK,
  SET_UNPINNED_BANK,
} from "./types";
import ips_config from "../ips_config";
import { clear_socket } from "./websockets";

function getNewXCSRFToken(res) {
  for (var header of res.headers.entries()) {
    if (header[0] === "x-csrftoken") {
      return header[1];
    }
  }
}

export const register = (user) => async (dispatch) => {
  const {
    username,
    password,
    re_password,
    email,
    first_name,
    last_name,
    province,
    city,
  } = user;

  const body = JSON.stringify({
    username,
    password,
    re_password,
    email,
    first_name,
    last_name,
    province,
    city,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/register`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 421) {
      dispatch({
        type: IPADDRESS_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 201) {
      dispatch({
        type: REGISTER_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: REGISTER_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      error: "Coś poszło nie tak z próbą półączenia z backendem",
      code: "150",
    });
  }
};

export const login = (user) => async (dispatch) => {
  const { username, password } = user;

  const body = JSON.stringify({
    username,
    password,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/login`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });
    var xcsrftoken = getNewXCSRFToken(res);

    const data = await res.json();

    if (res.status === 421) {
      dispatch({
        type: IPADDRESS_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 422) {
      dispatch({
        type: USER_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: LOGIN_SUCCESS,
        success: data.success,
        user: data.user,
        xcsrftoken: xcsrftoken,
        code: data.code,
      });
    } else if (res.status === 224) {
      dispatch({
        type: USER_NOT_VERIFICATED,
        success: data.success,
        code: data.code,
        user: data.user,
      });
    } else {
      dispatch({
        type: LOGIN_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "250",
    });
  }
};

export const logout = (XCSRFToken) => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/logout`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": XCSRFToken,
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(logout, XCSRFToken));
    } else if (res.status === 419 || res.status === 420) {
      dispatch(clear_socket());
      dispatch({
        type: LOGOUT_SUCCESS,
        success: "Wylogowano",
        code: "400",
      });
    } else if (res.status === 200) {
      dispatch(clear_socket());
      dispatch({
        type: LOGOUT_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: LOGOUT_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: LOGOUT_FAIL,
      error: "Coś poszło nie tak z próbą półączenia z backendem",
      code: "450",
    });
  }
};

export const user = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/user`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    var xcsrftoken = getNewXCSRFToken(res);

    const data = await res.json();

    if (res.status === 403) {
      dispatch({
        type: GETUSER_FAIL_REFRESH,
        error: data.detail,
        code: data.code,
      });
      dispatch(refresh(user));
    } else if (res.status === 200) {
      dispatch({
        type: GETUSER_SUCCESS,
        success: data.success,
        user: data.user,
        xcsrftoken: xcsrftoken,
        code: data.code,
      });
    } else {
      dispatch({
        type: GETUSER_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: GETUSER_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "350",
    });
  }
};

export const accountConfirm = (code_random, user) => async (dispatch) => {
  const { username } = user;
  const body = JSON.stringify({
    username,
    code_random,
  });

  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/confirm`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: body,
    });

    var xcsrftoken = getNewXCSRFToken(res);

    const data = await res.json();
    if (res.status === 421) {
      dispatch({
        type: IPADDRESS_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 422) {
      dispatch({
        type: USER_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: ACCOUNT_CONFIRM_SUCCESS,
        success: data.success,
        code: data.code,
        xcsrftoken: xcsrftoken,
        user: data.user,
      });
    } else {
      dispatch({
        type: ACCOUNT_CONFIRM_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: ACCOUNT_CONFIRM_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "650",
    });
  }
};

export const generateNewCode = (user) => async (dispatch) => {
  const body = JSON.stringify({
    user,
  });

  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/generate_new_code`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    const data = await res.json();

    if (res.status === 201) {
      dispatch({
        type: GENERATE_NEWCODE_SUCCESS,
        success: data.success,
        code: data.code,
        user: data.user,
      });
    } else if (res.status === 429) {
      dispatch({
        type: GENERATE_NEWCODE_FAIL,
        error: "Za dużo żądań.",
        code: "640",
      });
    } else {
      dispatch({
        type: GENERATE_NEWCODE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: GENERATE_NEWCODE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "650",
    });
  }
};

export const passwordReset = (email) => async (dispatch) => {
  const body = JSON.stringify({
    email,
  });

  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/password_reset`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    const data = await res.json();

    if (res.status === 421) {
      dispatch({
        type: IPADDRESS_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 422) {
      dispatch({
        type: USER_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: PASSWORD_RESET_SUCCESS,
        success: data.success,
        code: data.code,
        user: data.user,
      });
    } else if (res.status === 429) {
      dispatch({
        type: PASSWORD_RESET_FAIL,
        error: "Za dużo żądań.",
        code: "940",
      });
    } else {
      dispatch({
        type: PASSWORD_RESET_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "950",
    });
  }
};

export const passwordResetConfirm = (user, form) => async (dispatch) => {
  const { email } = user;
  const { code, password, re_password } = form;
  const body = JSON.stringify({
    email,
    code,
    password,
    re_password,
  });

  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/password_reset_confirm`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: body,
      }
    );

    const data = await res.json();

    if (res.status === 421) {
      dispatch({
        type: IPADDRESS_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 422) {
      dispatch({
        type: USER_BANNED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_SUCCESS,
        success: data.success,
        code: data.code,
        user: data.user,
      });
    } else if (res.status === 429) {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
        error: "Za dużo żądań.",
        code: "970",
      });
    } else {
      dispatch({
        type: PASSWORD_RESET_CONFIRM_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: PASSWORD_RESET_CONFIRM_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "980",
    });
  }
};

export const refresh =
  (prevRequest, ...temp) =>
  async (dispatch) => {
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/token/refresh`, {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 418) {
        dispatch(token_refresh_not_valid());
      } else if (res.status === 440) {
        dispatch(token_refresh_is_blacklisted());
      } else if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          success: data.success,
          code: data.code,
        });
        dispatch(prevRequest(...temp));
      } else {
        dispatch({
          type: REFRESH_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: REFRESH_FAIL,
        error: "Coś poszło nie tak z próbą półączenia z backendem",
        code: "550",
      });
    }
  };

export const data_province = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/provinces`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(data_province));
    } else if (res.status === 419) {
      dispatch(token_access_not_valid());
    } else if (res.status === 420) {
      dispatch(tokens_not_found(data));
    } else if (res.status === 200) {
      dispatch({
        type: DATA_PROVINCE_SUCCESS,
        success: data.success,
        code: data.code,
        provinces: data.provinces,
      });
    } else if (res.status === 429) {
      dispatch({
        type: DATA_PROVINCE_FAIL,
        error: "Za dużo żądań.",
        code: "970",
      });
    } else {
      dispatch({
        type: DATA_PROVINCE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: DATA_PROVINCE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "980",
    });
  }
};

export const data_cities = (XCSRFToken, province_id) => async (dispatch) => {
  const body = JSON.stringify({
    province_id,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/cities`, {
      credentials: "include",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": XCSRFToken,
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(data_cities, XCSRFToken, province_id));
    } else if (res.status === 419) {
      dispatch(token_access_not_valid());
    } else if (res.status === 420) {
      dispatch(tokens_not_found(data));
    } else if (res.status === 200) {
      dispatch({
        type: DATA_CITIES_SUCCESS,
        success: data.success,
        code: data.code,
        cities: data.cities,
      });
    } else if (res.status === 429) {
      dispatch({
        type: DATA_CITIES_FAIL,
        error: "Za dużo żądań.",
        code: "970",
      });
    } else {
      dispatch({
        type: DATA_CITIES_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: DATA_CITIES_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "980",
    });
  }
};

export const change_user_location =
  (XCSRFToken, location) => async (dispatch) => {
    const body = JSON.stringify({
      location,
    });
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/change_user_location`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": XCSRFToken,
          },
          body: body,
        }
      );

      const data = await res.json();

      if (res.status === 403) {
        dispatch(refresh(change_user_location, XCSRFToken, location));
      } else if (res.status === 419) {
        dispatch(token_access_not_valid());
      } else if (res.status === 420) {
        dispatch(tokens_not_found(data));
      }

      if (res.status === 200) {
        dispatch({
          type: CHANGE_USER_LOCATION_SUCCESS,
          user: data.user,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: CHANGE_USER_LOCATION_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: CHANGE_USER_LOCATION_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9170",
      });
    }
  };

export const change_user_distance =
  (XCSRFToken, distance) => async (dispatch) => {
    const body = JSON.stringify({
      distance,
    });
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/change_user_distance`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": XCSRFToken,
          },
          body: body,
        }
      );

      const data = await res.json();

      if (res.status === 403) {
        dispatch(refresh(change_user_distance, XCSRFToken, distance));
      } else if (res.status === 419) {
        dispatch(token_access_not_valid());
      } else if (res.status === 420) {
        dispatch(tokens_not_found(data));
      }

      if (res.status === 200) {
        dispatch({
          type: CHANGE_USER_DISTANCE_SUCCESS,
          user: data.user,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: CHANGE_USER_DISTANCE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: CHANGE_USER_DISTANCE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9170",
      });
    }
  };

export const unlink_google = (XCSRFToken) => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/link/google`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": XCSRFToken,
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(unlink_google, XCSRFToken));
    } else if (res.status === 419) {
      dispatch(token_access_not_valid());
    } else if (res.status === 420) {
      dispatch(tokens_not_found(data));
    } else if (res.status === 200) {
      dispatch({
        type: UNLINKED_GOOGLE_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: UNLINKED_GOOGLE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: UNLINKED_GOOGLE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const unlink_facebook = (XCSRFToken) => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/link/facebook`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": XCSRFToken,
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(unlink_facebook, XCSRFToken));
    } else if (res.status === 419) {
      dispatch(token_access_not_valid());
    } else if (res.status === 420) {
      dispatch(tokens_not_found(data));
    } else if (res.status === 200) {
      dispatch({
        type: UNLINKED_FACEBOOK_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: UNLINKED_FACEBOOK_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: UNLINKED_FACEBOOK_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const account_delete = (password, XCSRFToken) => async (dispatch) => {
  const body = JSON.stringify({
    password,
  });

  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/account_delete`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": XCSRFToken,
        },
        body: body,
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(account_delete, password, XCSRFToken));
    } else if (res.status === 419) {
      dispatch(token_access_not_valid());
    } else if (res.status === 420) {
      dispatch(tokens_not_found(data));
    } else if (res.status === 200) {
      dispatch(clear_socket());
      dispatch({
        type: ACCOUNT_DELETE_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: ACCOUNT_DELETE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: ACCOUNT_DELETE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const account_edit = (values, XCSRFToken) => async (dispatch) => {
  const { username, first_name, last_name, province, city, image } = values;

  const formData = new FormData();
  formData.append("username", username);
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("province", province);
  formData.append("city_target", city);
  formData.append(`image`, image);

  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/account_edit`, {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CSRFToken": XCSRFToken,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(account_edit, values, XCSRFToken));
    } else if (res.status === 419) {
      dispatch(token_access_not_valid());
    } else if (res.status === 420) {
      dispatch(tokens_not_found(data));
    } else if (res.status === 200) {
      dispatch({
        type: ACCOUNT_EDIT_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
      });
    } else {
      dispatch({
        type: ACCOUNT_EDIT_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: ACCOUNT_EDIT_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const setLogoutFalse = () => async (dispatch) => {
  dispatch({
    type: SET_LOGOUT_FALSE,
  });
};

export const tokens_not_found = (data) => async (dispatch) => {
  dispatch(clear_socket());
  dispatch({
    type: TOKENS_NOT_FOUND,
    error: data.detail,
    code: data.code,
  });
};

export const token_access_not_valid = () => async (dispatch) => {
  dispatch(clear_socket());
  dispatch({
    type: TOKEN_ACCESS_NOT_VALID,
    error: "Access token jest niepoprawny",
    code: "419",
  });
};

export const token_refresh_not_valid = () => async (dispatch) => {
  dispatch(clear_socket());
  dispatch({
    type: TOKEN_REFRESH_NOT_VALID,
    error: "Refresh token jest niepoprawny",
    code: "418",
  });
};

export const token_refresh_is_blacklisted = () => async (dispatch) => {
  dispatch(clear_socket());
  dispatch({
    type: TOKEN_REFRESH_IS_BLACKLISTED,
    error: "Token znajduje się na czarnej liście",
    code: "440",
  });
};

export const user_banned = (data) => async (dispatch) => {
  dispatch(clear_socket());
  dispatch({
    type: USER_BANNED,
    error: data.detail,
    code: data.code,
  });
};

export const ipaddress_banned = (data) => async (dispatch) => {
  dispatch(clear_socket());
  dispatch({
    type: IPADDRESS_BANNED,
    error: data.detail,
    code: data.code,
  });
};

export const user_deleted = (data) => async (dispatch) => {
  dispatch(clear_socket());
  dispatch({
    type: USER_DELETED,
    error: data.detail,
    code: data.code,
  });
};

export const ipaddress_deleted = (data) => async (dispatch) => {
  dispatch(clear_socket());
  dispatch({
    type: IPADDRESS_DELETED,
    error: data.detail,
    code: data.code,
  });
};

export const set_new_email = (email) => async (dispatch) => {
  dispatch({
    type: SET_NEW_EMAIL,
    email: email,
  });
};

export const set_pinned_bank = () => async (dispatch) => {
  dispatch({
    type: SET_PINNED_BANK,
  });
};

export const set_unpinned_bank = () => async (dispatch) => {
  dispatch({
    type: SET_UNPINNED_BANK,
  });
};

export const change_state_menu = () => async (dispatch) => {
  dispatch({
    type: MENU_STATE_CHANGE,
  });
};

export const admin_not_permission = (data) => async (dispatch) => {
  dispatch({
    type: ADMIN_NOT_PERMISSION,
    error: data.detail,
    code: data.code,
  });
};

export const clear_password_reset = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PASSWORD_RESET,
  });
};
