import {
  ADMIN_LOGS_SUCCESS,
  ADMIN_LOGS_FAIL,
  ADMIN_LOGS_NEXT_SUCCESS,
  ADMIN_LOGS_NEXT_FAIL,
  ADMIN_LOGS_REFRESH_SUCCESS,
  ADMIN_LOGS_REFRESH_FAIL,
  ADMIN_RESET,
  ADMIN_DATA_SUCCESS,
  ADMIN_DATA_FAIL,
  ADMIN_DATA_NEXT_SUCCESS,
  ADMIN_DATA_NEXT_FAIL,
  ADMIN_DATA_ACTION_SUCCESS,
  ADMIN_DATA_ACTION_NOTVALID_SUCCESS,
  ADMIN_DATA_ACTION_USERCHANGED_SUCCESS,
  ADMIN_DATA_ACTION_FAIL,
  ADMIN_DATA_LOGOUT_NOTVALID_SUCCESS,
  ADMIN_OPEN_GATEWAY_PAYCHECK_SUCCESS,
  ADMIN_OPEN_GATEWAY_PAYCHECK_ALREADY_OPENED_SUCCESS,
  ADMIN_OPEN_GATEWAY_PAYCHECK_FAIL,
} from "./types";
import ips_config from "../ips_config";

import { refresh, admin_not_permission } from "./auth";
import { data_reset, handleCommonStatuses } from "./data";

export const admin_logs = (XCSRFToken) => async (dispatch) => {
  let cursor_id = 0;
  let excluded_ids = [];

  const body = JSON.stringify({
    cursor_id,
    excluded_ids,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/admin/logs`, {
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
      dispatch(refresh(admin_logs, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 425) {
      dispatch(admin_not_permission(data));
    } else if (res.status === 200) {
      dispatch(data_reset());
      dispatch({
        type: ADMIN_LOGS_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
      });
    } else {
      dispatch({
        type: ADMIN_LOGS_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: ADMIN_LOGS_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const admin_logs_next =
  (cursor_id, excluded_ids, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      cursor_id,
      excluded_ids,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/admin/logs`, {
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
        dispatch(refresh(admin_logs_next, cursor_id, excluded_ids, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 425) {
        dispatch(admin_not_permission(data));
      } else if (res.status === 200) {
        dispatch({
          type: ADMIN_LOGS_NEXT_SUCCESS,
          success: data.success,
          code: data.code,
          data: data.data,
        });
      } else {
        dispatch({
          type: ADMIN_LOGS_NEXT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: ADMIN_LOGS_NEXT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const admin_logs_refresh =
  (cursor_id, excluded_ids, username, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      cursor_id,
      excluded_ids,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/admin/logs_refresh`, {
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
        dispatch(
          refresh(
            admin_logs_refresh,
            cursor_id,
            excluded_ids,
            username,
            XCSRFToken
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 425) {
        dispatch(admin_not_permission(data));
      } else if (res.status === 200) {
        dispatch({
          type: ADMIN_LOGS_REFRESH_SUCCESS,
          success: data.success,
          code: data.code,
          data: data.data,
          user: username,
        });
      } else {
        dispatch({
          type: ADMIN_LOGS_REFRESH_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: ADMIN_LOGS_REFRESH_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const admin_data = (name, category, XCSRFToken) => async (dispatch) => {
  let excluded_ids = [];
  let mode = "start";

  const body = JSON.stringify({
    excluded_ids,
    mode,
    name,
  });

  try {
    const res = await fetch(`${ips_config.BACKEND}/api/admin/${category}`, {
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
      dispatch(refresh(admin_data, name, category, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 425) {
      dispatch(admin_not_permission(data));
    } else if (res.status === 200) {
      dispatch({
        type: ADMIN_DATA_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
        name: name,
        category: category,
      });
    } else {
      dispatch({
        type: ADMIN_DATA_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: ADMIN_DATA_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const admin_data_next =
  (excluded_ids, mode, name, category, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      excluded_ids,
      mode,
      name,
    });

    try {
      const res = await fetch(`${ips_config.BACKEND}/api/admin/${category}`, {
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
        dispatch(
          refresh(
            admin_data_next,
            excluded_ids,
            mode,
            name,
            category,
            XCSRFToken
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 425) {
        dispatch(admin_not_permission(data));
      } else if (res.status === 200) {
        dispatch({
          type: ADMIN_DATA_NEXT_SUCCESS,
          success: data.success,
          code: data.code,
          data: data.data,
          end_pagination: data.end_pagination,
          excluded_ids: data.excluded_ids,
          mode: mode,
          category: category,
        });
      } else {
        dispatch({
          type: ADMIN_DATA_NEXT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: ADMIN_DATA_NEXT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const admin_data_action =
  (target_id, type, objects, category, XCSRFToken, extra1, extra2) =>
  async (dispatch) => {
    let body;
    let page = `${ips_config.BACKEND}/api/admin/${objects}/${category}_action`;
    if (category == "reports") {
      if (objects !== "comments") {
        let actual_status = extra1;
        let details = extra2;

        body = JSON.stringify({
          target_id,
          actual_status,
          details,
          type,
        });
      } else {
        let details = extra1;
        body = JSON.stringify({
          target_id,
          details,
          type,
        });
      }
    } else if (category == "awaitings") {
      let actual_edit_time = extra1;
      let details = extra2?.details ? extra2.details : "";
      let stripe_id = extra2?.stripe_id ? extra2.stripe_id : "";

      if (objects == "tickets") {
        body = JSON.stringify({
          target_id,
          actual_edit_time,
          stripe_id,
          details,
          type,
        });
      } else {
        body = JSON.stringify({
          target_id,
          actual_edit_time,
          details,
          type,
        });
      }
    } else if (extra1 == "logouts") {
      page = `${ips_config.BACKEND}/api/admin/accounts/logouts_action`;

      if (type == "single") {
        let ipaddress_id = extra2;

        body = JSON.stringify({
          target_id,
          ipaddress_id,
          type,
        });
      } else {
        body = JSON.stringify({
          target_id,
          type,
        });
      }
    } else if (category == "bans") {
      body = JSON.stringify({
        target_id,
      });
    } else if (category == "paychecks") {
      body = new FormData();
      body.append("pdf_confirm_payment", extra1);
      body.append("uuid_gateway", extra2);
    }

    let headers_settings;

    if (category == "paychecks") {
      headers_settings = {
        "X-CSRFToken": XCSRFToken,
      };
    } else {
      headers_settings = {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": XCSRFToken,
      };
    }

    try {
      const res = await fetch(page, {
        credentials: "include",
        method: "POST",
        headers: headers_settings,
        body: body,
      });

      const data = await res.json();

      if (res.status === 403) {
        dispatch(
          refresh(
            admin_data_action,
            target_id,
            type,
            objects,
            category,
            XCSRFToken,
            extra1,
            extra2
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 425) {
        dispatch(admin_not_permission(data));
      } else if (res.status === 223) {
        // KAZDY PRZYPADEK GDY TRZEBA OCZYSCIC REDUCER Z AKCYJNEGO OBIEKTU BO NP NIE ZNALEZIONO ALBO OCENIONO
        dispatch({
          type: ADMIN_DATA_ACTION_NOTVALID_SUCCESS,
          success: data.detail,
          code: data.code,
          target_id: target_id,
          objects: objects,
          category: category,
          statistic_change: data.statistic_change,
        });
      } else if (res.status === 224) {
        dispatch({
          type: ADMIN_DATA_ACTION_USERCHANGED_SUCCESS, // GDY W DANYM OBIEKCIE ZNALEZIONO ZMIANY TO TRZEBA PODMIENIC WARTOSCI
          success: data.detail,
          code: data.code,
          data: data.data,
          target_id: target_id,
          objects: objects,
          category: category,
        });
      } else if (res.status === 225) {
        // TO NIE TEGO - DO WYLOGOWANIA GDY VALIDATOR ZOSTANIE USUNIETY Z BAZY
        dispatch({
          type: ADMIN_DATA_LOGOUT_NOTVALID_SUCCESS,
          error: data.detail,
          code: data.code,
          user: target_id,
          ip_address: extra2,
        });
      } else if (res.status === 200) {
        dispatch({
          type: ADMIN_DATA_ACTION_SUCCESS,
          success: data.success,
          code: data.code,
          data: data.data,
          target_id: target_id,
          objects: objects,
          category: category,
          extra1: extra1,
        });
      } else {
        dispatch({
          type: ADMIN_DATA_ACTION_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: ADMIN_DATA_ACTION_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const admin_open_gateway_paycheck =
  (target_id, user_id, mode, orderedticket_ids, optional_data, XCSRFToken) =>
  async (dispatch) => {
    let body;

    if (mode == "tickets") {
      let event_id = optional_data;
      body = JSON.stringify({
        event_id,
        user_id,
        mode,
        orderedticket_ids,
      });
    } else {
      let event_id = target_id;
      body = JSON.stringify({
        event_id,
        user_id,
        mode,
      });
    }

    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/admin/open_gateway_paycheck`,
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
        dispatch(
          refresh(
            admin_open_gateway_paycheck,
            target_id,
            user_id,
            mode,
            orderedticket_ids,
            optional_data,
            XCSRFToken
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 425) {
        dispatch(admin_not_permission(data));
      } else if (res.status === 223) {
        // KAZDY PRZYPADEK GDY TRZEBA OCZYSCIC REDUCER Z AKCYJNEGO OBIEKTU BO NP NIE ZNALEZIONO ALBO OCENIONO
        dispatch({
          type: ADMIN_DATA_ACTION_NOTVALID_SUCCESS,
          success: data.detail,
          code: data.code,
          target_id: target_id,
          objects: mode,
          category: "paychecks",
          statistic_change: false,
        });
      } else if (res.status === 224) {
        dispatch({
          type: ADMIN_DATA_ACTION_USERCHANGED_SUCCESS, // GDY W DANYM OBIEKCIE ZNALEZIONO ZMIANY TO TRZEBA PODMIENIC WARTOSCI
          success: data.detail,
          code: data.code,
          data: data.data,
          target_id: target_id,
          objects: "tickets",
          category: "paychecks",
          all_ids: data.all_ids,
          total_price: data.total_price,
        });
      } else if (res.status === 225) {
        // CUSTOMOWY JAK INNY ADMIN WCZESNIEJ JUZ OTWORZYL
        dispatch({
          type: ADMIN_OPEN_GATEWAY_PAYCHECK_ALREADY_OPENED_SUCCESS,
          success: data.detail,
          code: data.code,
          target_id: target_id,
          mode: mode,
          payment_locked_expires: data.payment_locked_expires,
        });
      } else if (res.status === 200) {
        dispatch({
          type: ADMIN_OPEN_GATEWAY_PAYCHECK_SUCCESS,
          success: data.success,
          code: data.code,
          target_id: target_id,
          mode: mode,
          payment_locked_expires: data.payment_locked_expires,
          uuid_gateway: data.uuid_gateway,
          bank_number: data.bank_number,
        });
      } else {
        dispatch({
          type: ADMIN_OPEN_GATEWAY_PAYCHECK_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: ADMIN_OPEN_GATEWAY_PAYCHECK_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

// ADMIN_OPEN_GATEWAY_PAYCHECK_NOTVALID_SUCCESS,

///

export const admin_reset = () => async (dispatch) => {
  dispatch({
    type: ADMIN_RESET,
  });
};
