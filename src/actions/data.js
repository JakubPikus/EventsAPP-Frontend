import {
  DATA_HOMESCREEN_SUCCESS,
  DATA_HOMESCREEN_FAIL,
  DATA_HOMESCREEN_NEXT_SUCCESS,
  DATA_HOMESCREEN_NEXT_FAIL,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_SUCCESS,
  EVENT_FAIL,
  CATEGORY_HOMESCREEN_SUCCESS,
  CATEGORY_HOMESCREEN_FAIL,
  CHECK_LOCALIZATION_SUCCESS,
  CHECK_LOCALIZATION_FAIL,
  COMMENT_EVENT_SUCCESS,
  COMMENT_EVENT_FAIL,
  COMMENT_EVENT_REACTION_SUCCESS,
  COMMENT_EVENT_REACTION_FAIL,
  COMMENT_EVENT_REPORT_SUCCESS,
  COMMENT_EVENT_REPORT_FAIL,
  USER_SUCCESS,
  USER_FAIL,
  COMMENT_EVENT_POST_SUCCESS,
  COMMENT_EVENT_POST_FAIL,
  COMMENT_EVENT_DELETE_SUCCESS,
  COMMENT_EVENT_DELETE_FAIL,
  EVENT_USER_SUCCESS,
  EVENT_USER_FAIL,
  EVENT_USER_PARTICIPATE_SUCCESS,
  EVENT_USER_PARTICIPATE_FAIL,
  EVENT_PARTICIPANTS_SUCCESS,
  EVENT_PARTICIPANTS_FAIL,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_NOTVALID_SUCCESS,
  FRIEND_REQUEST_FAIL,
  WEBSOCKETS_FRIEND_REQUEST_REACTION_SUCCESS,
  FRIEND_REQUEST_REACTION_NOTVALID_SUCCESS,
  FRIEND_REQUEST_REACTION_FAIL,
  FRIEND_REMOVE_SUCCESS,
  FRIEND_REMOVE_NOTVALID_SUCCESS,
  FRIEND_REMOVE_FAIL,
  SERIES_SUCCESS,
  SERIES_FAIL,
  EVENT_REPORT_SUCCESS,
  EVENT_REPORT_FAIL,
  EVENT_DELETE_SUCCESS,
  EVENT_DELETE_FAIL,
  EVENT_EDIT_SUCCESS,
  EVENT_EDIT_FAIL,
  EVENT_VIA_SERIES_SUCCESS,
  EVENT_VIA_SERIES_FAIL,
  EVENT_ADD_SERIES_SUCCESS,
  EVENT_ADD_SERIES_FAIL,
  EVENT_DELETE_SERIES_SUCCESS,
  EVENT_DELETE_SERIES_FAIL,
  SERIES_CREATE_SUCCESS,
  SERIES_CREATE_FAIL,
  SERIES_DELETE_SUCCESS,
  SERIES_DELETE_FAIL,
  SERIES_EDIT_SUCCESS,
  SERIES_EDIT_FAIL,
  EVENT_VIA_CALENDAR_SUCCESS,
  EVENT_VIA_CALENDAR_FAIL,
  EVENT_RANDOM_SUCCESS,
  EVENT_RANDOM_FAIL,
  EVENT_RANDOM_REACTION_SUCCESS,
  EVENT_RANDOM_REACTION_FAIL,
  CLEAR_EVENT_RANDOM,
  EVENT_PROVINCE_MAP_SUCCESS,
  EVENT_PROVINCE_MAP_FAIL,
  EVENT_COUNTY_MAP_SUCCESS,
  EVENT_COUNTY_MAP_FAIL,
  FIND_FRIENDS_SUCCESS,
  FIND_FRIENDS_FAIL,
  FIND_FRIENDS_NEXT_SUCCESS,
  FIND_FRIENDS_NEXT_FAIL,
  EVENT_VIA_BAGDES_SUCCESS,
  EVENT_VIA_BAGDES_FAIL,
  BADGECODES_LOCKED_SUCCESS,
  BADGECODES_LOCKED_FAIL,
  BADGECODES_CREATE_SUCCESS,
  BADGECODES_CREATE_FAIL,
  BADGECODES_DELETE_SUCCESS,
  BADGECODES_DELETE_FAIL,
  BADGE_EDIT_SUCCESS,
  BADGE_EDIT_FAIL,
  BADGE_CREATE_SUCCESS,
  BADGE_CREATE_FAIL,
  BADGE_DELETE_SUCCESS,
  BADGE_DELETE_FAIL,
  USER_BADGES_SUCCESS,
  USER_BADGES_FAIL,
  BADGE_ACTIVATE_SUCCESS,
  BADGE_ACTIVATE_NOTVALID_CODE_SUCCESS,
  BADGE_ACTIVATE_FAIL,
  BADGE_REPORT_SUCCESS,
  BADGE_REPORT_FAIL,
  USER_VALIDATORS_SUCCESS,
  USER_VALIDATORS_FAIL,
  USER_BLOCKED_USERS_SUCCESS,
  USER_BLOCKED_USERS_FAIL,
  LOGOUT_FROM_DEVICES_SUCCESS,
  LOGOUT_FROM_DEVICES_NOTVALID_SUCCESS,
  LOGOUT_FROM_DEVICES_FAIL,
  BLOCK_USER_SUCCESS,
  BLOCK_USER_FAIL,
  UNBLOCK_USER_SUCCESS,
  UNBLOCK_USER_NOTVALID_SUCCESS,
  UNBLOCK_USER_FAIL,
  PASSWORD_CHANGE_SUCCESS,
  PASSWORD_CHANGE_FAIL,
  PASSWORD_CHANGE_CONFIRM_SUCCESS,
  PASSWORD_CHANGE_CONFIRM_FAIL,
  GENERATE_NEWCODE_SUCCESS,
  GENERATE_NEWCODE_FAIL,
  EMAIL_CHANGE_SUCCESS,
  EMAIL_CHANGE_FAIL,
  EMAIL_CHANGE_CONFIRM_SUCCESS,
  EMAIL_CHANGE_CONFIRM_NOTVALID_SUCCESS,
  EMAIL_CHANGE_CONFIRM_FAIL,
  GENERATE_NEWCODE_EMAIL_SUCCESS,
  GENERATE_NEWCODE_EMAIL_NOTVALID_SUCCESS,
  GENERATE_NEWCODE_EMAIL_FAIL,
  BADGE_SETTINGS_SUCCESS,
  BADGE_SETTINGS_FAIL,
  BADGE_SET_MAIN_SUCCESS,
  BADGE_SET_MAIN_NOTVALID_SUCCESS,
  BADGE_SET_MAIN_FAIL,
  EVENT_IS_DELETED,
  EVENT_IS_REJECTED,
  EVENT_IS_NOT_VERIFICATED,
  BADGE_IS_DELETED,
  BADGE_IS_NOT_VERIFICATED,
  BADGE_OWNER_IS_DELETED,
  BADGE_OWNER_IS_NOT_VERIFICATED,
  COMMENT_EVENT_NOTVALID,
  DATA_RESET,
  WEBSOCKETS_FILTER_REMOVE_FRIEND_LIST,
  WEBSOCKETS_FILTER_ADD_FRIEND_LIST,
  WEBSOCKETS_CATCH_BLOCKED_STATUS,
  WEBSOCKETS_CATCH_UNBLOCKED_STATUS,
  WEBSOCKETS_CATCH_DELETED_USER,
  WEBSOCKETS_INVITATION_REMOVE,
  WEBSOCKETS_CATCH_DELETED_USER_USERNAME,
  EVENT_TICKETS_SUCCESS,
  EVENT_TICKETS_NOTVALID_SUCCESS,
  EVENT_TICKETS_FAIL,
  BANK_NUMBER_SUCCESS,
  BANK_NUMBER_FAIL,
  BANK_NUMBER_CHANGE_SUCCESS,
  BANK_NUMBER_CHANGE_FAIL,
  BANK_NUMBER_CHANGE_CONFIRM_SUCCESS,
  BANK_NUMBER_CHANGE_CONFIRM_NOTVALID_SUCCESS,
  BANK_NUMBER_CHANGE_CONFIRM_FAIL,
  EVENT_VIA_TICKETS_SUCCESS,
  EVENT_VIA_TICKETS_FAIL,
  TICKET_CREATE_SUCCESS,
  TICKET_CREATE_FAIL,
  TICKET_CREATE_NOTVALID_SUCCESS,
  TICKET_EDIT_SUCCESS,
  TICKET_EDIT_FAIL,
  TICKET_EDIT_NOTVALID_SUCCESS,
  TICKET_DELETE_SUCCESS,
  TICKET_DELETE_FAIL,
  TICKET_DELETE_NOTVALID_SUCCESS,
  TICKET_PAY_SUCCESS,
  TICKET_PAY_FAIL,
  TICKET_PAY_NOTVALID_SUCCESS,
  TICKET_GENERATE_PDF_SUCCESS,
  TICKET_GENERATE_PDF_FAIL,
  TICKET_GENERATE_PDF_NOTVALID_SUCCESS,
  TICKET_REFUND_SUCCESS,
  TICKET_REFUND_FAIL,
  TICKET_REFUND_NOTVALID_SUCCESS,
  TICKET_ORDER_CANCEL_SUCCESS,
  TICKET_ORDER_REPAY_SUCCESS,
  TICKET_ORDER_ACTION_FAIL,
  TICKET_ORDER_ACTION_NOTVALID_SUCCESS,
  TICKET_CALENDAR_SUCCESS,
  TICKET_CALENDAR_FAIL,
  PAYMENT_CONFIRMATION_PDF_SUCCESS,
  PAYMENT_CONFIRMATION_PDF_FAIL,
} from "./types";
import ips_config from "../ips_config";
import {
  refresh,
  tokens_not_found,
  token_access_not_valid,
  set_new_email,
  user_banned,
  ipaddress_banned,
  user_deleted,
  ipaddress_deleted,
  set_pinned_bank,
  set_unpinned_bank,
  check_bank,
} from "./auth";
import { find_user_in_websockets, send_invite } from "./websockets";

export const handleCommonStatuses = (res, data, dispatch) => {
  switch (res.status) {
    // gdy nie ma ACCESS_TOKEN to 403 i wywolanie REFRESH =>  418 jak REFRESH_TOKEN zły / 440 jak REFRESH_TOKEN zablokowany
    case 419: // custom_esception_handler GDY ACCESS_TOKEN niepoprawny
      dispatch(token_access_not_valid());
      return true;

    case 420: // views GDY NIE MA ANI ACCESS_TOKEN I REFRESH_TOKEN
      dispatch(tokens_not_found(data));
      return true;
    case 421:
      dispatch(ipaddress_banned(data));
      return true;
    case 422:
      dispatch(user_banned(data));
      return true;
    case 423:
      dispatch(user_deleted(data));
      return true;
    case 424:
      dispatch(ipaddress_deleted(data));
      return true;
    default:
      return false;
  }
};

export const events_homescreen = (limit) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/events_homescreen?limit=${limit}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_homescreen, limit));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: DATA_HOMESCREEN_SUCCESS,
        data: data.data,
        meta: data.events,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: DATA_HOMESCREEN_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: DATA_HOMESCREEN_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const events_homescreen_next = (next) => async (dispatch) => {
  try {
    const res = await fetch(`${next}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_homescreen_next, next));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: DATA_HOMESCREEN_NEXT_SUCCESS,
        data: data.data,
        meta: data.events,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: DATA_HOMESCREEN_NEXT_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: DATA_HOMESCREEN_NEXT_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const category_homescreen = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/category_active`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(category_homescreen));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: CATEGORY_HOMESCREEN_SUCCESS,
        categorys: data.categorys,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: CATEGORY_HOMESCREEN_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: CATEGORY_HOMESCREEN_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9170",
    });
  }
};

export const check_localization =
  (XCSRFToken, longitude, latitude) => async (dispatch) => {
    const body = JSON.stringify({
      longitude,
      latitude,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/check_user_location`, {
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
        dispatch(refresh(check_localization, XCSRFToken, longitude, latitude));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: CHECK_LOCALIZATION_SUCCESS,
          check_localization: data.city,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: CHECK_LOCALIZATION_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: CHECK_LOCALIZATION_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9170",
      });
    }
  };

export const events_list = (values) => async (dispatch) => {
  let page = `${ips_config.BACKEND}/api/events_list`;
  let params = new URLSearchParams();

  if (Object.keys(values).length > 0) {
    for (const [key, value] of Object.entries(values)) {
      params.append(key, value);
    }
    page += "?" + params.toString();
  }

  try {
    const res = await fetch(`${page}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_list, values));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_LIST_SUCCESS,
        data: data.data,
        value_not_found: data.value_not_found,
        meta: data.events,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: EVENT_LIST_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_LIST_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const event = (slug, uuid) => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/event/${slug}-${uuid}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(event, slug, uuid));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_SUCCESS,
        data: data.data,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: EVENT_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const comment_event = (slug, uuid) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/event/comment?slug=${slug}&uuid=${uuid}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(comment_event, slug, uuid));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: COMMENT_EVENT_SUCCESS,
        data: data.data,
        meta: {
          count: data.meta.count,
        },
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: COMMENT_EVENT_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: COMMENT_EVENT_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const comment_event_post =
  (XCSRFToken, slug, uuid, text, reply) => async (dispatch) => {
    let id_reply;
    if (reply == undefined || reply == "main_comment") {
      id_reply = "";
    } else {
      id_reply = reply;
    }
    const body = JSON.stringify({
      slug,
      uuid,
      text,
      id_reply,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/event/comment`, {
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
          refresh(comment_event_post, XCSRFToken, slug, uuid, text, reply)
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: COMMENT_EVENT_NOTVALID,
          data: data.data,
          meta: {
            count: data.meta.count,
          },
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 223) {
        dispatch({
          type: EVENT_IS_NOT_VERIFICATED,
          error: data.detail,
          code: data.code,
          is_admin: data.is_admin,
          status: data.status,
        });
      } else if (res.status === 224) {
        dispatch({
          type: EVENT_IS_DELETED,
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 200) {
        dispatch({
          type: COMMENT_EVENT_POST_SUCCESS,
          data: data.data,
          meta: {
            count: data.meta.count,
          },
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: COMMENT_EVENT_POST_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: COMMENT_EVENT_POST_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const comment_event_delete =
  (XCSRFToken, slug, uuid, id) => async (dispatch) => {
    const body = JSON.stringify({
      slug,
      uuid,
      id,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/event/comment`, {
        credentials: "include",
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": XCSRFToken,
        },
        body: body,
      });

      const data = await res.json();

      if (res.status === 403) {
        dispatch(refresh(comment_event_delete, XCSRFToken, slug, uuid, id));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: COMMENT_EVENT_NOTVALID,
          data: data.data,
          meta: {
            count: data.meta.count,
          },
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 224) {
        dispatch({
          type: EVENT_IS_DELETED,
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 200) {
        dispatch({
          type: COMMENT_EVENT_DELETE_SUCCESS,
          data: data.data,
          meta: {
            count: data.meta.count,
          },
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: COMMENT_EVENT_DELETE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: COMMENT_EVENT_DELETE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const comment_event_reaction =
  (XCSRFToken, id_comment, type, slug, uuid) => async (dispatch) => {
    const body = JSON.stringify({
      id_comment,
      type,
      slug,
      uuid,
    });
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/event/comment_reaction`,
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
            comment_event_reaction,
            XCSRFToken,
            id_comment,
            type,
            slug,
            uuid
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: COMMENT_EVENT_NOTVALID,
          data: data.data,
          meta: {
            count: data.meta.count,
          },
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 224) {
        dispatch({
          type: EVENT_IS_DELETED,
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 200) {
        dispatch({
          type: COMMENT_EVENT_REACTION_SUCCESS,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: COMMENT_EVENT_REACTION_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: COMMENT_EVENT_REACTION_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const comment_event_report =
  (report, slug, uuid, XCSRFToken) => async (dispatch) => {
    const { id_comment, type } = report;
    const details = report.details || "";

    const body = JSON.stringify({
      id_comment,
      type,
      details,
      slug,
      uuid,
    });

    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/event/comment_report`,
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
        dispatch(refresh(comment_event_report, report, slug, uuid, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: COMMENT_EVENT_NOTVALID,
          data: data.data,
          meta: {
            count: data.meta.count,
          },
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 224) {
        dispatch({
          type: EVENT_IS_DELETED,
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 200) {
        dispatch({
          type: COMMENT_EVENT_REPORT_SUCCESS,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: COMMENT_EVENT_REPORT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: COMMENT_EVENT_REPORT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const user = (username) => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/user/${username}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(user, username));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: USER_SUCCESS,
        data: data.data,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: USER_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const events_user = (username, values) => async (dispatch) => {
  let page = `${ips_config.BACKEND}/api/events_user?username=${username}`;
  let params = new URLSearchParams();

  if (Object.keys(values).length > 0) {
    for (const [key, value] of Object.entries(values)) {
      params.append(key, value);
    }
    page += "&" + params.toString();
  }

  try {
    const res = await fetch(`${page}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_user, username, values));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 222) {
      dispatch({
        type: EVENT_USER_FAIL,
        error: data.detail,
        code: data.code,
      });

      dispatch(find_user_in_websockets(username));
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_USER_SUCCESS,
        data: data.data,
        value_not_found: data.value_not_found,
        meta: data.meta,
        success: data.success,
        code: data.code,
        categories: data.categories,
        last_category: values.type,
      });
    } else {
      dispatch({
        type: EVENT_USER_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: EVENT_USER_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const event_user_participate =
  (id_event, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      id_event,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/user_participate`, {
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
        dispatch(refresh(event_user_participate, id_event, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 223) {
        dispatch({
          type: EVENT_IS_NOT_VERIFICATED,
          error: data.detail,
          code: data.code,
          is_admin: data.is_admin,
          status: data.status,
        });
      } else if (res.status === 224) {
        dispatch({
          type: EVENT_IS_DELETED,
          error: data.detail,
          code: data.code,
        });
      } else if (res.status === 200) {
        dispatch({
          type: EVENT_USER_PARTICIPATE_SUCCESS,
          success: data.success,
          code: data.code,
          id_event: id_event,
        });
      } else {
        dispatch({
          type: EVENT_USER_PARTICIPATE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: EVENT_USER_PARTICIPATE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const event_participants = (slug, uuid) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/event_participants/${slug}-${uuid}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(event_participants, slug, uuid));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_PARTICIPANTS_SUCCESS,
        participants: data.participants,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: EVENT_PARTICIPANTS_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_PARTICIPANTS_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const friend_request =
  (id_target, type, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      id_target,
      type,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/friend/request`, {
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
        dispatch(refresh(friend_request, id_target, type, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: FRIEND_REQUEST_FAIL,
          error: data.detail,
          code: data.code,
        });

        dispatch({
          type: WEBSOCKETS_CATCH_DELETED_USER,
          user: id_target,
        });
      } else if (res.status === 223) {
        dispatch({
          type: FRIEND_REQUEST_NOTVALID_SUCCESS,
          success: data.detail,
          code: data.code,
          user: data.user,
          target_user: data.target_user,
          react_target_user: data.react_target_user,
          is_admin: data.is_admin,
        });

        // if (data.react_target_user == "Accepted") {  TO NIE NO BO PRZYPADEK Z POWIADOMIENIA WYCHODZI
        //   dispatch({
        //     type: WEBSOCKETS_FILTER_ADD_FRIEND_LIST,
        //     add_user: data.target_user,
        //   });
        // }
      } else if (res.status === 200) {
        dispatch({
          type: FRIEND_REQUEST_SUCCESS,
          success: data.success,
          code: data.code,
          id_target: id_target,
        });

        if (data.type == "invite") {
          dispatch(send_invite(id_target));
        }
      } else {
        dispatch({
          type: FRIEND_REQUEST_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: FRIEND_REQUEST_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const friend_request_reaction =
  (id_target, type, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      id_target,
      type,
    });
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/friend/request_reaction`,
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
        dispatch(refresh(friend_request_reaction, id_target, type, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: FRIEND_REQUEST_REACTION_FAIL,
          error: data.detail,
          code: data.code,
        });

        dispatch({
          type: WEBSOCKETS_CATCH_DELETED_USER,
          user: id_target,
        });
      } else if (res.status === 223) {
        dispatch({
          type: FRIEND_REQUEST_REACTION_NOTVALID_SUCCESS, // SYTUACJA KIEDY CHCEMY ODPOWIEDZIEC NA ZAPROSZENIE W MOMENCIE GDY INNY USER COFNAL ZAPROSZENIE / ZABLOKOWAL
          code: data.code,
          success: data.detail,
          target_user: data.target_user,
          type_reaction: data.type_reaction,
          user_is_blocked: data.user_is_blocked,
          target_blocked_by_us: data.target_blocked_by_us,
          user_is_friend: data.user_is_friend,
          user: data.user,
          is_admin: data.is_admin,
        });

        dispatch({
          type: WEBSOCKETS_INVITATION_REMOVE,
          target_user: id_target,
        });

        if (data.user_is_blocked == true || data.target_blocked_by_us == true) {
          dispatch({
            type: WEBSOCKETS_CATCH_BLOCKED_STATUS,
            data: {
              room_user_id: id_target,
              block_target_user: data.target_blocked_by_us,
              blocked_by_target_user: data.user_is_blocked,
            },
          });
        }
      } else if (res.status === 200) {
        dispatch({
          type: WEBSOCKETS_FRIEND_REQUEST_REACTION_SUCCESS,
          success: data.success,
          code: data.code,
          type_reaction: data.type_reaction,
          user: data.user,
          id_target: id_target,
        });
        dispatch({
          type: WEBSOCKETS_INVITATION_REMOVE,
          target_user: id_target,
        });

        if (data.type_reaction == "accept") {
          dispatch({
            type: WEBSOCKETS_FILTER_ADD_FRIEND_LIST,
            add_user: data.target_user,
            stats: false,
          });
        }
      } else {
        dispatch({
          type: FRIEND_REQUEST_REACTION_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: FRIEND_REQUEST_REACTION_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const friend_remove = (id_target, XCSRFToken) => async (dispatch) => {
  const body = JSON.stringify({
    id_target,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/friend/remove`, {
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
      dispatch(refresh(friend_remove, id_target, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 222) {
      dispatch({
        type: FRIEND_REMOVE_FAIL,
        error: data.detail,
        code: data.code,
      });

      dispatch({
        type: WEBSOCKETS_CATCH_DELETED_USER,
        user: id_target,
      });
    } else if (res.status === 223) {
      dispatch({
        type: FRIEND_REMOVE_NOTVALID_SUCCESS,
        success: data.detail,
        code: data.code,
        remove_user: data.remove_user,
        user: data.user,
        user_is_blocked: data.user_is_blocked,
        is_admin: data.is_admin,
      });

      dispatch({
        type: WEBSOCKETS_FILTER_REMOVE_FRIEND_LIST,
        remove_user: data.remove_user,
      });
    } else if (res.status === 200) {
      dispatch({
        type: FRIEND_REMOVE_SUCCESS,
        success: data.success,
        code: data.code,
        user: data.user, // WARTOSC - MOJ ID
        remove_user: data.remove_user, // OBIEKT ID I USERNAME USUWANEGO USERA
      });

      dispatch({
        type: WEBSOCKETS_FILTER_REMOVE_FRIEND_LIST,
        remove_user: data.remove_user,
      });
    } else {
      dispatch({
        type: FRIEND_REMOVE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: FRIEND_REMOVE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const event_create = (values, XCSRFToken) => async (dispatch) => {
  const {
    title,
    text,
    category,
    series,
    startDate,
    province,
    city,
    images,
    schedule,
  } = values;

  const formData = new FormData();
  formData.append("title", title);
  formData.append("text", text);
  formData.append("category", category);
  formData.append("series", series);
  formData.append("event_date", startDate);
  formData.append("province", province);
  formData.append("city", city);

  let scheduleTemp = [];
  Object.values(schedule).forEach((schedul, index) => {
    scheduleTemp[index] = [
      schedul["startHours"],
      schedul["startMinutes"],
      schedul["endHours"],
      schedul["endMinutes"],
      schedul["details"],
    ];
  });
  formData.append(`schedule`, JSON.stringify(scheduleTemp));

  Object.values(images).forEach((image, index) => {
    formData.append(`image${index}`, image);
  });

  try {
    const res = await fetch(`${ips_config.BACKEND}/api/add_event`, {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CSRFToken": XCSRFToken,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(event_create, values, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_CREATE_SUCCESS,
        success: data.success,
        code: data.code,
        slug: data.slug,
        uuid: data.uuid,
      });
    } else {
      dispatch({
        type: EVENT_CREATE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: EVENT_CREATE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const series_data = (user) => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/series?user=${user}`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(series_data, user));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: SERIES_SUCCESS,
        data: data.data,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: SERIES_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: SERIES_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const event_report = (values, XCSRFToken) => async (dispatch) => {
  const { id_event, type, details } = values;
  const body = JSON.stringify({
    id_event,
    type,
    details,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/event_report`, {
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
      dispatch(refresh(event_report, values, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 223) {
      dispatch({
        type: EVENT_IS_NOT_VERIFICATED,
        error: data.detail,
        code: data.code,
        is_admin: data.is_admin,
        status: data.status,
      });
    } else if (res.status === 224) {
      dispatch({
        type: EVENT_IS_DELETED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_REPORT_SUCCESS,
        success: data.success,
        code: data.code,
        my_report: type,
      });
    } else {
      dispatch({
        type: EVENT_REPORT_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_REPORT_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const event_delete = (slug, uuid, XCSRFToken) => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/event/${slug}-${uuid}`, {
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
      dispatch(refresh(event_delete, slug, uuid, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_DELETE_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: EVENT_DELETE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: EVENT_DELETE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const event_edit = (id, values, XCSRFToken) => async (dispatch) => {
  const {
    title,
    text,
    category,
    series,
    startDate,
    province,
    city,
    images,
    schedule,
  } = values;

  const formData = new FormData();
  formData.append("id", id);
  formData.append("title", title);
  formData.append("text", text);
  formData.append("category", category);
  formData.append("series", series);
  formData.append("event_date", startDate);
  formData.append("province", province);
  formData.append("city", city);

  let scheduleTemp = [];
  Object.values(schedule).forEach((schedul, index) => {
    scheduleTemp[index] = [
      schedul["startHours"],
      schedul["startMinutes"],
      schedul["endHours"],
      schedul["endMinutes"],
      schedul["details"],
    ];
  });
  formData.append(`schedule`, JSON.stringify(scheduleTemp));

  Object.values(images).forEach((image, index) => {
    if (image?.id == undefined) {
      formData.append(`image${index}`, image);
    } else {
      formData.append(`image${index}`, image.id);
    }
  });

  try {
    const res = await fetch(`${ips_config.BACKEND}/api/edit_event`, {
      credentials: "include",
      method: "POST",
      headers: {
        "X-CSRFToken": XCSRFToken,
      },
      body: formData,
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(event_edit, id, values, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 223) {
      dispatch({
        type: EVENT_IS_REJECTED,
        error: data.success,
        code: data.code,
        slug: data.slug,
        uuid: data.uuid,
      });
    } else if (res.status === 224) {
      dispatch({
        type: EVENT_IS_DELETED,
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_EDIT_SUCCESS,
        success: data.success,
        code: data.code,
        slug: data.slug,
        uuid: data.uuid,
      });
    } else {
      dispatch({
        type: EVENT_EDIT_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: EVENT_EDIT_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const events_via_series = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/events_series`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_via_series));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_VIA_SERIES_SUCCESS,
        events_no_series: data.events_no_series,
        events_with_series: data.events_with_series,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: EVENT_VIA_SERIES_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_VIA_SERIES_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const event_add_series =
  (id_event, series, event_date, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      id_event,
      series,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/event_edit_series`, {
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
          refresh(event_add_series, id_event, series, event_date, XCSRFToken)
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: EVENT_ADD_SERIES_SUCCESS,
          success: data.success,
          code: data.code,
          id: id_event,
          event_date: event_date,
          series: series,
        });
      } else {
        dispatch({
          type: EVENT_ADD_SERIES_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: EVENT_ADD_SERIES_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const event_delete_series =
  (id_event, series, event_date, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      id_event,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/event_edit_series`, {
        credentials: "include",
        method: "DELETE",
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
          refresh(event_delete_series, id_event, series, event_date, XCSRFToken)
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: EVENT_DELETE_SERIES_SUCCESS,
          success: data.success,
          code: data.code,
          id: id_event,
          event_date: event_date,
          series: series,
        });
      } else {
        dispatch({
          type: EVENT_DELETE_SERIES_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: EVENT_DELETE_SERIES_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const series_create = (values, XCSRFToken) => async (dispatch) => {
  const { name, description } = values;
  const body = JSON.stringify({
    name,
    description,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/series`, {
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
      dispatch(refresh(series_create, values, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: SERIES_CREATE_SUCCESS,
        success: data.success,
        code: data.code,
        name: name,
        description: description,
      });
    } else {
      dispatch({
        type: SERIES_CREATE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: SERIES_CREATE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const series_delete = (name, XCSRFToken) => async (dispatch) => {
  const body = JSON.stringify({
    name,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/series`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": XCSRFToken,
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(series_delete, name, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: SERIES_DELETE_SUCCESS,
        success: data.success,
        code: data.code,
        name: name,
      });
    } else {
      dispatch({
        type: SERIES_DELETE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: SERIES_DELETE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const series_edit = (series, values, XCSRFToken) => async (dispatch) => {
  const { name, description } = values;
  const body = JSON.stringify({
    series,
    name,
    description,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/edit_series`, {
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
      dispatch(refresh(series_edit, series, values, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: SERIES_EDIT_SUCCESS,
        success: data.success,
        code: data.code,
        series: series,
        name: name,
        description: description,
      });
    } else {
      dispatch({
        type: SERIES_EDIT_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: SERIES_EDIT_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const events_via_calendar = (year, month) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/events_calendar?year=${year}&month=${month}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_via_calendar, year, month));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_VIA_CALENDAR_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
      });
    } else {
      dispatch({
        type: EVENT_VIA_CALENDAR_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_VIA_CALENDAR_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const events_random = (distance) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/events_random?distance=${distance}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_random, distance));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_RANDOM_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
      });
    } else {
      dispatch({
        type: EVENT_RANDOM_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: EVENT_RANDOM_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const events_random_reaction =
  (id_event, type, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      id_event,
      type,
    });
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/events_random_reaction`,
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
        dispatch(refresh(events_random_reaction, id_event, type, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 223) {
        dispatch({
          type: EVENT_IS_NOT_VERIFICATED,
          error: data.detail,
          code: data.code,
          id: id_event,
        });
      } else if (res.status === 224) {
        dispatch({
          type: EVENT_IS_DELETED,
          error: data.detail,
          code: data.code,
          id: id_event,
        });
      } else if (res.status === 200) {
        dispatch({
          type: EVENT_RANDOM_REACTION_SUCCESS,
          success: data.success,
          code: data.code,
          id: id_event,
        });
      } else {
        dispatch({
          type: EVENT_RANDOM_REACTION_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: EVENT_RANDOM_REACTION_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const clear_events_random = () => async (dispatch) => {
  dispatch({
    type: CLEAR_EVENT_RANDOM,
    success: "Czyszczenie reducera przez zmianę filtrów szukania.",
    code: "123123",
  });
};

export const events_province_map = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/province_map`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_province_map));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_PROVINCE_MAP_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
      });
    } else {
      dispatch({
        type: EVENT_PROVINCE_MAP_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_PROVINCE_MAP_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const events_county_map = (province_id) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/county_map?province=${province_id}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_county_map, province_id));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_COUNTY_MAP_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
      });
    } else {
      dispatch({
        type: EVENT_COUNTY_MAP_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_COUNTY_MAP_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const find_friends =
  (target_username, excluded_ids, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      target_username,
      excluded_ids,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/find_friends`, {
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
          refresh(find_friends, target_username, excluded_ids, XCSRFToken)
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: FIND_FRIENDS_SUCCESS,
          success: data.success,
          code: data.code,
          data: data.data,
          count: data.count,
        });
      } else {
        dispatch({
          type: FIND_FRIENDS_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: FIND_FRIENDS_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const find_friends_next =
  (target_username, excluded_ids, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      target_username,
      excluded_ids,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/find_friends`, {
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
          refresh(find_friends_next, target_username, excluded_ids, XCSRFToken)
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: FIND_FRIENDS_NEXT_SUCCESS,
          data: data.data,
          count: data.count,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: FIND_FRIENDS_NEXT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: FIND_FRIENDS_NEXT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const events_via_badges = (ordering) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/events_badges?ordering=${ordering}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_via_badges, ordering));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_VIA_BAGDES_SUCCESS,
        success: data.success,
        code: data.code,
        events: data.data,
      });
    } else {
      dispatch({
        type: EVENT_VIA_BAGDES_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_VIA_BAGDES_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const badgecodes_lock =
  (event_id, badge_id, badge_codes_id_list, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      event_id,
      badge_id,
      badge_codes_id_list,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/badge_codes_lock`, {
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
            badgecodes_lock,
            event_id,
            badge_id,
            badge_codes_id_list,
            XCSRFToken
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: BADGE_OWNER_IS_DELETED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
        });
      } else if (res.status === 223) {
        dispatch({
          type: BADGE_OWNER_IS_NOT_VERIFICATED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
          status: data.status,
        });
      } else if (res.status === 200) {
        dispatch({
          type: BADGECODES_LOCKED_SUCCESS,

          locked_codes: data.locked_codes.data,
          used_codes: data.used_codes.data,

          locked_old_codes_id_list: data.locked_codes.id_list,
          used_old_codes_id_list: data.used_codes.id_list,

          append_codes: data.locked_codes.append_data,

          success: data.success,
          code: data.code,

          event_id: event_id,
          badge_id: badge_id,
        });
      } else {
        dispatch({
          type: BADGECODES_LOCKED_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: BADGECODES_LOCKED_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const badgecodes_create =
  (event_id, badge_id, amount, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      event_id,
      badge_id,
      amount,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/badge_codes_create`, {
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
          refresh(badgecodes_create, event_id, badge_id, amount, XCSRFToken)
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: BADGE_OWNER_IS_DELETED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
        });
      } else if (res.status === 223) {
        dispatch({
          type: BADGE_OWNER_IS_NOT_VERIFICATED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
          status: data.status,
        });
      } else if (res.status === 200) {
        dispatch({
          type: BADGECODES_CREATE_SUCCESS,
          data: data.data,
          success: data.success,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
        });
      } else {
        dispatch({
          type: BADGECODES_CREATE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: BADGECODES_CREATE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const badgecodes_delete =
  (event_id, badge_id, badge_codes_id_list, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      event_id,
      badge_id,
      badge_codes_id_list,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/badge_codes_delete`, {
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
            badgecodes_delete,
            event_id,
            badge_id,
            badge_codes_id_list,
            XCSRFToken
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: BADGE_OWNER_IS_DELETED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
        });
      } else if (res.status === 223) {
        dispatch({
          type: BADGE_OWNER_IS_NOT_VERIFICATED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
          status: data.status,
        });
      } else if (res.status === 200) {
        dispatch({
          type: BADGECODES_DELETE_SUCCESS,
          success: data.success,
          code: data.code,
          deleted_codes: data.deleted_codes.data,
          deleted_old_codes_id_list: data.deleted_codes.id_list,
          used_old_codes_id_list: data.used_codes.id_list,
          used_codes: data.used_codes.data,

          event_id: event_id,
          badge_id: badge_id,
        });
      } else {
        dispatch({
          type: BADGECODES_DELETE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: BADGECODES_DELETE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const badge_edit =
  (event_id, badge_id, values, XCSRFToken) => async (dispatch) => {
    const { name, image } = values;

    const formData = new FormData();
    formData.append("badge_id", badge_id);
    formData.append("name", name);
    formData.append(`image`, image);

    try {
      const res = await fetch(`${ips_config.BACKEND}/api/badge_edit`, {
        credentials: "include",
        method: "POST",
        headers: {
          "X-CSRFToken": XCSRFToken,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.status === 403) {
        dispatch(refresh(badge_edit, event_id, badge_id, values, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: BADGE_OWNER_IS_DELETED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
        });
      } else if (res.status === 223) {
        dispatch({
          type: BADGE_OWNER_IS_NOT_VERIFICATED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
          status: data.status,
        });
      } else if (res.status === 200) {
        dispatch({
          type: BADGE_EDIT_SUCCESS,
          success: data.success,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
          status: data.status,
          image: data.image,
          name: data.name,
        });
      } else {
        dispatch({
          type: BADGE_EDIT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: BADGE_EDIT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const badge_create =
  (event_id, values, XCSRFToken) => async (dispatch) => {
    const { name, image } = values;

    const formData = new FormData();
    formData.append("event_id", event_id);
    formData.append("name", name);
    formData.append(`image`, image);

    try {
      const res = await fetch(`${ips_config.BACKEND}/api/badge_create`, {
        credentials: "include",
        method: "POST",
        headers: {
          "X-CSRFToken": XCSRFToken,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.status === 403) {
        dispatch(refresh(badge_create, event_id, values, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: BADGE_CREATE_SUCCESS,
          success: data.success,
          code: data.code,
          badge: data.data,
          event_id: event_id,
        });
      } else {
        dispatch({
          type: BADGE_CREATE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: BADGE_CREATE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const badge_delete =
  (event_id, badge_id, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      badge_id,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/badge_delete`, {
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
        dispatch(refresh(badge_delete, event_id, badge_id, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: BADGE_OWNER_IS_DELETED,
          error: data.detail,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
        });
      } else if (res.status === 200) {
        dispatch({
          type: BADGE_DELETE_SUCCESS,
          success: data.success,
          code: data.code,
          event_id: event_id,
          badge_id: badge_id,
        });
      } else {
        dispatch({
          type: BADGE_DELETE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: BADGE_DELETE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const user_badges = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/user_badges`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(user_badges));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: USER_BADGES_SUCCESS,
        success: data.success,
        code: data.code,
        created_badges: data.created_badges,
        activated_badges: data.activated_badges,
      });
    } else {
      dispatch({
        type: USER_BADGES_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_BADGES_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const badge_activate = (code_obj, XCSRFToken) => async (dispatch) => {
  let code = Object.values(code_obj)
    .map((obj) => obj)
    .join("-");

  const body = JSON.stringify({
    code,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/badge_activate`, {
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
      dispatch(refresh(badge_activate, code_obj, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 223) {
      dispatch({
        type: BADGE_ACTIVATE_NOTVALID_CODE_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
        was_activated: data.was_activated,
        code_activation: code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: BADGE_ACTIVATE_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
        code_activation: code,
        set_main_badge: data.set_main_badge,
      });
    } else {
      dispatch({
        type: BADGE_ACTIVATE_FAIL,
        error: data.detail,
        code: data.code,
        code_activation: code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: BADGE_ACTIVATE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const badge_report =
  (id_badge, type, details, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      id_badge,
      type,
      details,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/badge_report`, {
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
        dispatch(refresh(badge_report, id_badge, type, details, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 224) {
        dispatch({
          type: BADGE_IS_DELETED,
          success: data.detail,
          code: data.code,
          id_badge: id_badge,
        });
      } else if (res.status === 223) {
        dispatch({
          type: BADGE_IS_NOT_VERIFICATED,
          success: data.detail,
          code: data.code,
          is_admin: data.is_admin,
          status: data.status,
          id_badge: id_badge,
        });
      } else if (res.status === 200) {
        dispatch({
          type: BADGE_REPORT_SUCCESS,
          success: data.success,
          code: data.code,
          my_report: type,
          id_badge: id_badge,
        });
      } else {
        dispatch({
          type: BADGE_REPORT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: BADGE_REPORT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const user_validators = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/user_validators`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(user_validators));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: USER_VALIDATORS_SUCCESS,
        success: data.success,
        code: data.code,
        ip_validators: data.ip_validators,
      });
    } else {
      dispatch({
        type: USER_VALIDATORS_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_VALIDATORS_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const user_blocked_users = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/user_block_users`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(user_blocked_users));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: USER_BLOCKED_USERS_SUCCESS,
        success: data.success,
        code: data.code,
        blocked_users: data.blocked_users,
      });
    } else {
      dispatch({
        type: USER_BLOCKED_USERS_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: USER_BLOCKED_USERS_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const logout_from_devices =
  (devices_id_list, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      devices_id_list,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/logout_devices`, {
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
        dispatch(refresh(logout_from_devices, devices_id_list, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: LOGOUT_FROM_DEVICES_NOTVALID_SUCCESS,
          error: data.detail,
          code: data.code,
          missing_ids: data.data,

          //ID ZWRACANE
        });
      } else if (res.status === 200) {
        dispatch({
          type: LOGOUT_FROM_DEVICES_SUCCESS,
          success: data.success,
          code: data.code,
          devices_id_list: devices_id_list,
        });
      } else {
        dispatch({
          type: LOGOUT_FROM_DEVICES_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: LOGOUT_FROM_DEVICES_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const block_user = (id_target, XCSRFToken) => async (dispatch) => {
  const body = JSON.stringify({
    id_target,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/user_block_users`, {
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
      dispatch(refresh(block_user, id_target, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: BLOCK_USER_SUCCESS,
        success: data.success,
        code: data.code,
        id_target: id_target,
        request_user_id: data.request_user_id,
      });

      dispatch({
        type: WEBSOCKETS_INVITATION_REMOVE,
        target_user: id_target,
      });

      dispatch({
        type: WEBSOCKETS_CATCH_BLOCKED_STATUS,
        data: {
          room_user_id: id_target,
          block_target_user: true,
          blocked_by_target_user: data.target_blocked_user,
        },
      });
    } else if (res.status === 222) {
      dispatch({
        type: BLOCK_USER_FAIL,
        error: data.detail,
        code: data.code,
      });

      dispatch({
        type: WEBSOCKETS_CATCH_DELETED_USER,
        user: id_target,
      });
    } else if (res.status === 223) {
      dispatch({
        type: BLOCK_USER_SUCCESS,
        success: data.detail,
        code: data.code,
        id_target: id_target,
        request_user_id: data.request_user_id,
      });

      dispatch({
        type: WEBSOCKETS_INVITATION_REMOVE,
        target_user: id_target,
      });

      dispatch({
        type: WEBSOCKETS_CATCH_BLOCKED_STATUS,
        data: {
          room_user_id: id_target,
          block_target_user: true,
          blocked_by_target_user: data.target_blocked_user,
        },
      });
    } else {
      dispatch({
        type: BLOCK_USER_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: BLOCK_USER_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const unblock_user = (id_target, XCSRFToken) => async (dispatch) => {
  const body = JSON.stringify({
    id_target,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/user_block_users`, {
      credentials: "include",
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-CSRFToken": XCSRFToken,
      },
      body: body,
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(unblock_user, id_target, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 222) {
      dispatch({
        type: UNBLOCK_USER_NOTVALID_SUCCESS,
        error: data.detail,
        code: data.code,
        id_target: id_target,
      });

      dispatch({
        type: WEBSOCKETS_CATCH_DELETED_USER,
        user: id_target,
      });
    } else if (res.status === 223) {
      dispatch({
        type: UNBLOCK_USER_NOTVALID_SUCCESS,
        error: data.detail,
        code: data.code,
        id_target: id_target,
        is_friend: data.is_friend,
      });

      dispatch({
        type: WEBSOCKETS_CATCH_UNBLOCKED_STATUS,
        data: {
          room_user_id: id_target,
          block_target_user: false,
          blocked_by_target_user: data.target_blocked_user,
        },
      });
    } else if (res.status === 200) {
      dispatch({
        type: UNBLOCK_USER_SUCCESS,
        success: data.success,
        code: data.code,
        target_blocked_user: data.target_blocked_user,
        is_admin: data.is_admin,
        id_target: id_target,
      });

      dispatch({
        type: WEBSOCKETS_CATCH_UNBLOCKED_STATUS,
        data: {
          room_user_id: id_target,
          block_target_user: false,
          blocked_by_target_user: data.target_blocked_user,
        },
      });
    } else {
      dispatch({
        type: UNBLOCK_USER_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: UNBLOCK_USER_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const password_change = (password, XCSRFToken) => async (dispatch) => {
  const body = JSON.stringify({
    password,
  });
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/password_change`,
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
      dispatch(refresh(password_change, password, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: PASSWORD_CHANGE_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: PASSWORD_CHANGE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: PASSWORD_CHANGE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const password_change_confirm =
  (email, input, XCSRFToken) => async (dispatch) => {
    const { code, password, re_password } = input;
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
            "X-CSRFToken": XCSRFToken,
          },
          body: body,
        }
      );

      const data = await res.json();

      if (res.status === 403) {
        dispatch(refresh(password_change_confirm, email, input, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: PASSWORD_CHANGE_CONFIRM_SUCCESS,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: PASSWORD_CHANGE_CONFIRM_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: PASSWORD_CHANGE_CONFIRM_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const generate_new_code = (user, XCSRFToken) => async (dispatch) => {
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
          "X-CSRFToken": XCSRFToken,
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

export const email_change = (new_email, XCSRFToken) => async (dispatch) => {
  const body = JSON.stringify({
    new_email,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/email_change`, {
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
      dispatch(refresh(email_change, new_email, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EMAIL_CHANGE_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: EMAIL_CHANGE_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: EMAIL_CHANGE_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const email_change_confirm = (input, XCSRFToken) => async (dispatch) => {
  const { old_code, new_code } = input;
  const body = JSON.stringify({
    old_code,
    new_code,
  });

  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/email_change_confirm`,
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
      dispatch(refresh(email_change_confirm, input, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 223) {
      dispatch({
        type: EMAIL_CHANGE_CONFIRM_NOTVALID_SUCCESS,
        success: data.detail,
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch(set_new_email(data.new_email));
      dispatch({
        type: EMAIL_CHANGE_CONFIRM_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: EMAIL_CHANGE_CONFIRM_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: EMAIL_CHANGE_CONFIRM_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const generate_email_new_code = (XCSRFToken) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/email_change_new_code`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-CSRFToken": XCSRFToken,
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(generate_email_new_code, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 223) {
      dispatch({
        type: GENERATE_NEWCODE_EMAIL_NOTVALID_SUCCESS,
        success: data.detail,
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: GENERATE_NEWCODE_EMAIL_SUCCESS,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: GENERATE_NEWCODE_EMAIL_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: GENERATE_NEWCODE_EMAIL_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const badges_settings = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/badges`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(badges_settings));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: BADGE_SETTINGS_SUCCESS,
        success: data.success,
        code: data.code,
        badges: data.data,
      });
    } else {
      dispatch({
        type: BADGE_SETTINGS_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: BADGE_SETTINGS_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const set_main_badge = (badge_id, XCSRFToken) => async (dispatch) => {
  const body = JSON.stringify({
    badge_id,
  });
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/set_main_badge`,
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
      dispatch(refresh(set_main_badge, badge_id, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 223) {
      dispatch({
        type: BADGE_SET_MAIN_NOTVALID_SUCCESS,
        success: data.detail,
        code: data.code,
        badge_id: badge_id,
      });
    } else if (res.status === 200 || res.status === 224) {
      dispatch({
        type: BADGE_SET_MAIN_SUCCESS,
        success: data.success,
        code: data.code,
        badge_id: badge_id,
      });
    } else {
      dispatch({
        type: BADGE_SET_MAIN_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: BADGE_SET_MAIN_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const event_tickets = (slug, uuid) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/tickets/${slug}-${uuid}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(event_tickets, slug, uuid));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 222) {
      dispatch({
        type: EVENT_TICKETS_NOTVALID_SUCCESS,
        data: data.data,
        redirect: "main_page",
        error: data.detail,
        code: data.code,
      });
    } else if (res.status === 223) {
      dispatch({
        type: EVENT_TICKETS_NOTVALID_SUCCESS,
        data: data.data,
        error: data.detail,
        redirect: "event",
        code: data.code,
      });
    } else if (res.status === 224) {
      dispatch({
        type: EVENT_TICKETS_NOTVALID_SUCCESS,
        data: data.data,
        error: data.detail,
        redirect: "orders",
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_TICKETS_SUCCESS,
        data: data.data,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: EVENT_TICKETS_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: EVENT_TICKETS_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const bank_number_change =
  (password, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      password,
    });
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/account/change_bank_number`,
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
        dispatch(refresh(bank_number_change, password, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: BANK_NUMBER_CHANGE_SUCCESS,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: BANK_NUMBER_CHANGE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: BANK_NUMBER_CHANGE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const bank_number_change_confirm =
  (code, status_connect, XCSRFToken, new_bank_number) => async (dispatch) => {
    const body = JSON.stringify({
      code,
      status_connect,
      new_bank_number,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/account/bank_number`, {
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
            bank_number_change_confirm,
            code,
            status_connect,
            XCSRFToken,
            new_bank_number
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: BANK_NUMBER_CHANGE_CONFIRM_NOTVALID_SUCCESS,
          error: data.detail,
          mode: status_connect ? "change" : "delete",
          blocked_remove_bank_account: data.blocked_remove_bank_account,
          code: data.code,
        });
      } else if (res.status === 200) {
        if (status_connect == false) {
          dispatch(set_unpinned_bank());
        } else if (data.status_unpinned) {
          dispatch(set_pinned_bank());
        }
        dispatch({
          type: BANK_NUMBER_CHANGE_CONFIRM_SUCCESS,
          bank_number: data.data,
          status_connect: status_connect,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: BANK_NUMBER_CHANGE_CONFIRM_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: BANK_NUMBER_CHANGE_CONFIRM_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const bank_number = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/bank_number`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(bank_number));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      if (data.data.bank_number !== "") {
        dispatch(set_pinned_bank());
      } else {
        dispatch(set_unpinned_bank());
      }

      dispatch({
        type: BANK_NUMBER_SUCCESS,
        data: data.data,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: BANK_NUMBER_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: BANK_NUMBER_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const events_via_tickets = (temp_data, page) => async (dispatch) => {
  let url;

  if (temp_data == "bought" || temp_data == "created") {
    url = page;
  } else if (temp_data !== null) {
    url = `${ips_config.BACKEND}/api/events_tickets?order=${temp_data}&mode=start&limit=6`;
  } else {
    url = `${ips_config.BACKEND}/api/events_tickets?mode=start&limit=6`;
  }

  try {
    const res = await fetch(url, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(events_via_tickets, temp_data, page));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: EVENT_VIA_TICKETS_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
        mode:
          temp_data == "bought" || temp_data == "created" ? temp_data : "start",
      });
    } else {
      dispatch({
        type: EVENT_VIA_TICKETS_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: EVENT_VIA_TICKETS_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const ticket_create =
  (event_id, input, XCSRFToken) => async (dispatch) => {
    let { new_price, ticket_type, ticket_details, quantity } = input;
    let price = parseFloat(new_price).toFixed(2);

    const body = JSON.stringify({
      price,
      ticket_type,
      ticket_details,
      quantity,
      event_id,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/events_tickets`, {
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
        dispatch(refresh(ticket_create, event_id, input, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch(set_unpinned_bank());
        dispatch({
          type: TICKET_CREATE_NOTVALID_SUCCESS,
          error: data.detail,
          bank_problem: true,
          code: data.code,
        });
      } else if (res.status === 223 || res.status === 224) {
        dispatch({
          type: TICKET_CREATE_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          event_problem: true,
          code: data.code,
        });
      } else if (res.status === 225) {
        dispatch({
          type: TICKET_CREATE_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          event_late: true,
          code: data.code,
        });
      } else if (res.status === 200) {
        const now = new Date();
        const timestamp = Math.floor(now.getTime() / 1000);
        dispatch({
          type: TICKET_CREATE_SUCCESS,
          success: data.success,
          event_id: event_id,
          ticket_id: data.ticket_id,
          edit_time: data.edit_time,
          input: input,
          timestamp: timestamp,
          code: data.code,
        });
      } else {
        dispatch({
          type: TICKET_CREATE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: TICKET_CREATE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const ticket_edit =
  (ticket_id, event_id, input, actual_edit_time, XCSRFToken) =>
  async (dispatch) => {
    let { new_price, ticket_type, ticket_details, quantity, verificated } =
      input;
    let price = parseFloat(new_price).toFixed(2);

    const body = JSON.stringify({
      price,
      ticket_type,
      ticket_details,
      quantity,
      ticket_id,
      event_id,
      verificated,
      actual_edit_time,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/ticket_edit`, {
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
      const now = new Date();
      const timestamp = Math.floor(now.getTime() / 1000);

      if (res.status === 403) {
        dispatch(
          refresh(
            ticket_edit,
            ticket_id,
            event_id,
            input,
            actual_edit_time,
            XCSRFToken
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch(set_unpinned_bank());
        dispatch({
          type: TICKET_EDIT_NOTVALID_SUCCESS,
          error: data.detail,
          bank_problem: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 223 || res.status === 224) {
        // DELETE EVENT
        dispatch({
          type: TICKET_EDIT_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          event_problem: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 225) {
        // DELETE TICKET
        dispatch({
          type: TICKET_EDIT_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          ticket_id: ticket_id,
          ticket_problem: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 226) {
        // CHANGE DATA TICKET VERIFICATION
        console.log(data.data);
        dispatch({
          type: TICKET_EDIT_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          ticket_id: ticket_id,
          verification_problem: true,
          data: data.data,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 227) {
        // EVENT LATE
        dispatch({
          type: TICKET_EDIT_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          event_late: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 228) {
        // TO MUCH BOUGHT TICKETS
        dispatch({
          type: TICKET_EDIT_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          ticket_id: ticket_id,
          too_much_tickets: true,
          reserverd_tickets: data.reserverd_tickets,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 200) {
        dispatch({
          type: TICKET_EDIT_SUCCESS,
          success: data.success,
          event_id: event_id,
          ticket_id: ticket_id,
          timestamp: timestamp,
          input: input,
          code: data.code,
          edit_time: data.edit_time,
        });
      } else {
        dispatch({
          type: TICKET_EDIT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: TICKET_EDIT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const ticket_delete =
  (ticket_id, event_id, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      ticket_id,
      event_id,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/ticket_delete`, {
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
      const now = new Date();
      const timestamp = Math.floor(now.getTime() / 1000);

      if (res.status === 403) {
        dispatch(refresh(ticket_delete, ticket_id, event_id, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch(set_unpinned_bank());
        dispatch({
          type: TICKET_DELETE_NOTVALID_SUCCESS,
          error: data.detail,
          bank_problem: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 223 || res.status === 224) {
        // DELETE EVENT
        dispatch({
          type: TICKET_DELETE_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          event_problem: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 225) {
        // DELETE TICKET
        dispatch({
          type: TICKET_DELETE_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          ticket_id: ticket_id,
          ticket_problem: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 226) {
        // CHANGE DATA TICKET VERIFICATION
        dispatch({
          type: TICKET_DELETE_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          ticket_id: ticket_id,
          data: data.data,
          verification_problem: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 227) {
        // EVENT LATE
        dispatch({
          type: TICKET_DELETE_NOTVALID_SUCCESS,
          error: data.detail,
          event_id: event_id,
          event_late: true,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 200) {
        dispatch({
          type: TICKET_DELETE_SUCCESS,
          success: data.success,
          event_id: event_id,
          ticket_id: ticket_id,
          timestamp: timestamp,
          code: data.code,
        });
      } else {
        dispatch({
          type: TICKET_DELETE_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: TICKET_DELETE_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const ticket_pay = (cart, event_id, XCSRFToken) => async (dispatch) => {
  let tickets_data = {};

  Object.keys(cart).forEach((key) => {
    if (cart[key].tickets.length > 0) {
      tickets_data[cart[key].stripe_id] = {
        price: cart[key].price,
        personal_data: [],
      };

      cart[key].tickets.forEach((ticket) => {
        tickets_data[cart[key].stripe_id].personal_data.push({
          first_name: ticket.first_name,
          last_name: ticket.last_name,
          date_of_birth: ticket.date_of_birth,
        });
      });
    }
  });

  const body = JSON.stringify({
    tickets_data,
    event_id,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/ticket_pay`, {
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
      dispatch(refresh(ticket_pay, cart, event_id, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 222) {
      dispatch({
        type: TICKET_PAY_NOTVALID_SUCCESS,
        error: data.detail,
        redirect: "event",
        code: data.code,
      });
    } else if (res.status === 223) {
      dispatch({
        type: TICKET_PAY_NOTVALID_SUCCESS,
        error: data.detail,
        correct_tickets: data.correct_tickets,
        code: data.code,
      });
    } else if (res.status === 224) {
      dispatch({
        type: TICKET_PAY_NOTVALID_SUCCESS,
        error: data.detail,
        error_tickets: data.error_tickets,
        code: data.code,
      });
    } else if (res.status === 225) {
      dispatch({
        type: TICKET_PAY_NOTVALID_SUCCESS,
        error: data.detail,
        redirect: "orders",
        code: data.code,
      });
    } else if (res.status === 226) {
      dispatch({
        type: TICKET_PAY_NOTVALID_SUCCESS,
        error: data.detail,
        redirect: "main_page",
        code: data.code,
      });
    } else if (res.status === 200) {
      dispatch({
        type: TICKET_PAY_SUCCESS,
        success: data.success,
        url_payment: data.url,
        code: data.code,
      });
    } else {
      dispatch({
        type: TICKET_PAY_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: TICKET_PAY_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const ticket_generate_pdf =
  (order_id, ticket_id, id) => async (dispatch) => {
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/ticket/generate/${id}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        const blob = await res.blob();

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `ticket_${id}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        dispatch({
          type: TICKET_GENERATE_PDF_SUCCESS,
          success: "Sukces",
          code: "2130",
        });
      } else {
        const data = await res.json();

        if (res.status === 403) {
          dispatch(refresh(ticket_generate_pdf, order_id, ticket_id, id));
        } else if (handleCommonStatuses(res, data, dispatch)) {
        } else if (res.status === 222) {
          dispatch({
            // NIE MA TAKIEGO BILETU
            type: TICKET_GENERATE_PDF_NOTVALID_SUCCESS,
            error: data.detail,
            ticket_missing: true,
            order_id: order_id,
            ticket_id: ticket_id,
            orderedticket_id: id,
            code: data.code,
          });
        } else if (res.status === 223) {
          // BILET ZOSTAŁ PRZEKAZANY DO ZWROTU
          dispatch({
            type: TICKET_GENERATE_PDF_NOTVALID_SUCCESS,
            error: data.detail,
            payed: data.paid_out_status,
            order_id: order_id,
            ticket_id: ticket_id,
            orderedticket_id: id,
            code: data.code,
          });
        } else {
          dispatch({
            type: TICKET_GENERATE_PDF_FAIL,
            error: data.detail,
            code: data.code,
          });
        }
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: TICKET_GENERATE_PDF_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const ticket_refund =
  (order_id, ticket_id, orderedticket_id, event_id, XCSRFToken) =>
  async (dispatch) => {
    const body = JSON.stringify({
      orderedticket_id,
      event_id,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/ticket_refund`, {
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
      const now = new Date();
      const timestamp = Math.floor(now.getTime() / 1000);

      if (res.status === 403) {
        dispatch(
          refresh(ticket_refund, orderedticket_id, event_id, XCSRFToken)
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch(set_unpinned_bank());
        dispatch({
          type: TICKET_REFUND_NOTVALID_SUCCESS,
          error: data.detail,
          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 223) {
        // DELETE EVENT
        dispatch({
          type: TICKET_REFUND_NOTVALID_SUCCESS,
          error: data.detail,

          event_id: event_id,
          event_problem: true,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 224) {
        // DELETE ORDERTICKET
        dispatch({
          type: TICKET_REFUND_NOTVALID_SUCCESS,
          error: data.detail,

          order_id: order_id,
          ticket_id: ticket_id,
          orderedticket_id: orderedticket_id,
          orderedticket_problem: true,

          timestamp: timestamp,
          code: data.code,
        });
      }

      ///////////////
      else if (res.status === 225) {
        // BILET PRZEKAZANY ZOSTAŁ DO ZWROTU
        dispatch({
          type: TICKET_REFUND_NOTVALID_SUCCESS,
          error: data.detail,

          payed: data.paid_out_status,
          order_id: order_id,
          ticket_id: ticket_id,
          orderedticket_id: orderedticket_id,
          refund_problem: true,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 226) {
        // EXPIRED REFUND
        dispatch({
          type: TICKET_REFUND_NOTVALID_SUCCESS,
          error: data.detail,

          event_id: event_id,
          expired_refund: true,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 227) {
        // USED TICKET
        dispatch({
          type: TICKET_REFUND_NOTVALID_SUCCESS,
          error: data.detail,

          order_id: order_id,
          ticket_id: ticket_id,
          orderedticket_id: orderedticket_id,
          used_time: data.used_time,
          used_ticket: true,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 200) {
        dispatch({
          type: TICKET_REFUND_SUCCESS,
          success: data.success,

          order_id: order_id,
          ticket_id: ticket_id,
          orderedticket_id: orderedticket_id,

          timestamp: timestamp,
          code: data.code,
        });
      } else {
        dispatch({
          type: TICKET_REFUND_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: TICKET_REFUND_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const ordered_ticket_action =
  (event_id, order_id, ticket_id, orderedticket_ids, action_type, XCSRFToken) =>
  async (dispatch) => {
    const body = JSON.stringify({
      event_id,
      order_id,
      orderedticket_ids,
      action_type,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/order_action`, {
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
      const now = new Date();
      const timestamp = Math.floor(now.getTime() / 1000);

      if (res.status === 403) {
        dispatch(
          refresh(
            ordered_ticket_action,
            event_id,
            order_id,
            ticket_id,
            orderedticket_ids,
            action_type,
            XCSRFToken
          )
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        // DELETE EVENT
        dispatch({
          type: TICKET_ORDER_ACTION_NOTVALID_SUCCESS,
          error: data.detail,

          event_id: event_id,
          event_delete: true,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 223 || res.status === 224) {
        // DELETE ORDER
        dispatch({
          type: TICKET_ORDER_ACTION_NOTVALID_SUCCESS,
          error: data.detail,

          order_id: order_id,
          order_delete: true,

          timestamp: timestamp,
          code: data.code,
        });
      }

      ///////////////
      else if (res.status === 225) {
        dispatch({
          type: TICKET_ORDER_ACTION_NOTVALID_SUCCESS,
          error: data.detail,

          order_id: order_id,
          paid_time: data.paid_time,
          exists_orderedtickets: data.exists_orderedtickets,
          order_paid: true,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 226) {
        dispatch({
          type: TICKET_ORDER_ACTION_NOTVALID_SUCCESS,
          error: data.detail,

          order_id: order_id,
          ticket_id: ticket_id,
          exists_orderedtickets: data.exists_orderedtickets,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 227) {
        // INNE CENY CENY
        dispatch({
          type: TICKET_ORDER_ACTION_NOTVALID_SUCCESS,
          error: data.detail,

          order_id: order_id,
          new_price: data.new_price,
          refresh_price: true,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 228) {
        // INNE CENY CENY
        dispatch({
          type: TICKET_ORDER_ACTION_NOTVALID_SUCCESS,
          error: data.detail,
          order_too_fast: true,

          timestamp: timestamp,
          code: data.code,
        });
      } else if (res.status === 200) {
        if (action_type == "cancel") {
          dispatch({
            type: TICKET_ORDER_CANCEL_SUCCESS,
            success: data.success,

            order_id: order_id,
            ticket_id: ticket_id,
            orderedticket_ids: orderedticket_ids,
            timestamp: timestamp,

            code: data.code,
          });
        } else {
          dispatch({
            type: TICKET_ORDER_REPAY_SUCCESS,
            success: data.success,

            url_payment: data.url,
            timestamp: timestamp,

            code: data.code,
          });
        }
      } else {
        dispatch({
          type: TICKET_ORDER_ACTION_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: TICKET_ORDER_ACTION_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const tickets_calendar = (page, year, month) => async (dispatch) => {
  let url;
  if (page == false) {
    url = `${ips_config.BACKEND}/api/tickets_calendar?year=${year}&month=${month}&limit=6`;
  } else {
    url = page;
  }

  try {
    const res = await fetch(url, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.status === 403) {
      dispatch(refresh(tickets_calendar, page, year, month));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: TICKET_CALENDAR_SUCCESS,
        success: data.success,
        code: data.code,
        data: data.data,
        meta: data.meta,
        status_first: page == false ? true : false,
      });
    } else {
      dispatch({
        type: TICKET_CALENDAR_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: TICKET_CALENDAR_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const payment_confirmation_pdf = (id) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/payment_confirmation/${id}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status === 200) {
      let filename = res.headers
        .get("content-disposition")
        .match(/filename="(.+)"/)[1];
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      dispatch({
        type: PAYMENT_CONFIRMATION_PDF_SUCCESS,
        success: "Sukces",
        code: "2131",
      });
    } else {
      const data = await res.json();

      if (res.status === 403) {
        dispatch(refresh(payment_confirmation_pdf, id));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else {
        dispatch({
          type: PAYMENT_CONFIRMATION_PDF_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: PAYMENT_CONFIRMATION_PDF_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const data_reset = () => async (dispatch) => {
  dispatch({
    type: DATA_RESET,
  });
};
