import {
  WEBSOCKETS_CONTACT_STATE_CHANGE,
  WEBSOCKETS_CONNECT_SUCCESS,
  WEBSOCKETS_CONNECT_FAIL,
  WEBSOCKETS_DISCONNECTED,
  WEBSOCKETS_FRIENDS_LIST_SUCCESS,
  WEBSOCKETS_FRIENDS_LIST_FAIL,
  WEBSOCKETS_FRIENDS_LIST_NEXT_SUCCESS,
  WEBSOCKETS_FRIENDS_LIST_NEXT_FAIL,
  WEBSOCKETS_MESSAGES_LIST_SUCCESS,
  WEBSOCKETS_MESSAGES_LIST_FAIL,
  WEBSOCKETS_MESSAGES_LIST_NEXT_SUCCESS,
  WEBSOCKETS_MESSAGES_LIST_NEXT_FAIL,
  WEBSOCKETS_CHAT_OPEN,
  WEBSOCKETS_CHAT_CLOSE,
  WEBSOCKETS_CONVERSATION_SUCCESS,
  WEBSOCKETS_CONVERSATION_FAIL,
  WEBSOCKETS_SEND_MESSAGE_SUCCESS,
  WEBSOCKETS_SEND_MESSAGE_FAIL,
  WEBSOCKETS_SENDING_MESSAGE_SUCCESS,
  WEBSOCKETS_SENDING_MESSAGE_FAIL,
  WEBSOCKETS_RECEIVE_MESSAGE_SUCCESS,
  WEBSOCKETS_RECEIVE_MESSAGE_FAIL,
  WEBSOCKETS_MESSAGES_DELIVERED,
  WEBSOCKETS_ONLINE_FRIENDS_SUCCESS,
  WEBSOCKETS_ONLINE_FRIENDS_FAIL,
  REFRESH_SUCCESS,
  REFRESH_FAIL,
  WEBSOCKETS_CLEAR_COOKIES_SUCCESS,
  WEBSOCKETS_CLEAR_COOKIES_FAIL,
  WEBSOCKETS_CLEAR_REDUCER,
  WEBSOCKETS_CATCH_BLOCKED_STATUS,
  WEBSOCKETS_INVITATIONS_LIST_NEXT_SUCCESS,
  WEBSOCKETS_INVITATIONS_LIST_NEXT_FAIL,
  WEBSOCKETS_INVITATIONS_STATE_CHANGE,
  WEBSOCKETS_SEND_INVITE_FAIL,
  WEBSOCKETS_GET_INVITE_SUCCESS,
  WEBSOCKETS_CATCH_DELETED_USER,
  WEBSOCKETS_FRIEND_CHANGE_STATUS_SUCCESS,
  WEBSOCKETS_FIND_USER_BY_ID_SUCCESS,
  WEBSOCKETS_FIND_USER_BY_ID_FAIL,
  WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_SUCCESS,
  WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_FAIL,
  WEBSOCKETS_NOTIFICATIONS_LIST_SUCCESS,
  WEBSOCKETS_NOTIFICATIONS_LIST_FAIL,
  WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_SUCCESS,
  WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_FAIL,
  WEBSOCKETS_GET_NOTIFICATION_SUCCESS,
  WEBSOCKETS_SEEN_NOTIFICATIONS_FAIL,
  WEBSOCKETS_FILTER_ADD_FRIEND_LIST,
  WEBSOCKETS_TICKET_CHANGE_STATUS_SUCCESS,
  WEBSOCKETS_ORDER_REFUND_SUCCESS,
  WEBSOCKETS_PAYCHECK_RECEIVE_SUCCESS,
  WEBSOCKETS_REFUND_NOT_PINNED_BANK_SUCCESS,
} from "./types";
import { refresh } from "./auth";
import { handleCommonStatuses } from "./data";
import {
  token_refresh_not_valid,
  token_refresh_is_blacklisted,
  tokens_not_found,
  token_access_not_valid,
  ipaddress_banned,
  ipaddress_deleted,
  user_banned,
  user_deleted,
} from "./auth";
import ips_config from "../ips_config";

let reconnectTimeout;
let isFirstError = true;
let shouldReconnect = true;
let isReconnecting = false;
let logout_status = false;

const tryReconnect = (dispatch, id, previous_action, xcsrftoken) => {
  if (isReconnecting) {
    return;
  }

  isReconnecting = true; // Ustawiamy flagę na true na początku próby połączenia

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
  }

  return new Promise((resolve, reject) => {
    const socket = new WebSocket(`${ips_config.WEBOSCKET}/ws/${id}/`);

    socket.onopen = () => {
      isFirstError = true;
      dispatch({ type: WEBSOCKETS_CONNECT_SUCCESS, data: socket });

      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }

      isReconnecting = false; // Resetujemy flagę
      shouldReconnect = false; /// TUTAJ TEST

      if (previous_action !== null) {
        if (
          previous_action !== "first_connect" &&
          previous_action.event_type !== "online_friends"
        ) {
          socket.send(JSON.stringify(previous_action));
        }

        if (previous_action == "first_connect") {
          dispatch(messages_list(xcsrftoken));
          dispatch(friends_list(xcsrftoken));
          dispatch(notifications_list(xcsrftoken));
        }

        socket.send(
          JSON.stringify({
            event_type: "online_friends",
          })
        );
      }

      resolve(socket);
    };

    socket.onerror = (error) => {
      dispatch({ type: WEBSOCKETS_CONNECT_FAIL, payload: error.message });
      reject(error);
    };

    socket.onclose = (event) => {
      if (isFirstError) {
        dispatch({ type: WEBSOCKETS_DISCONNECTED });
        isFirstError = false; // Ustaw flagę na false po pierwszym błędzie
      }
      isReconnecting = false; // Resetujemy flagę
      shouldReconnect = true;
      scheduleReconnect(dispatch, id, xcsrftoken);
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data.event_type == "banned") {
        dispatch(clear_cookies_websocket());
        if (data.data.type == "logout") {
          dispatch(tokens_not_found(data.data));
        } else if (data.data.type == "ipaddress_banned") {
          dispatch(ipaddress_banned(data.data));
        } else if (data.data.type == "user_banned") {
          dispatch(user_banned(data.data));
        } else if (data.data.type == "user_deleted") {
          dispatch(user_deleted(data.data));
        } else if (data.data.type == "ipaddress_deleted") {
          dispatch(ipaddress_deleted(data.data));
        }
      } else if (data.event_type == "blocked") {
        dispatch({
          type: WEBSOCKETS_CATCH_BLOCKED_STATUS,
          data: data,
        });
      } else if (data.event_type == "notvalid_access_token") {
        dispatch(clear_cookies_websocket());
        dispatch(token_access_not_valid());
      } else if (data.event_type == "tokens_not_found") {
        dispatch(clear_cookies_websocket());
        dispatch(
          tokens_not_found({
            detail: "Użytkownik nie jest zalogowany",
            code: "420",
          })
        );
      } else if (data.event_type == "token_refresh") {
        dispatch(refresh_websocket(data.previous_action));
      } else if (data.event_type == "token_expired") {
        isReconnecting = false;
        tryReconnect(dispatch, id, data.previous_action, xcsrftoken);
        isReconnecting = true;
      } else if (data.event_type == "acknowledge") {
        dispatch({
          type: WEBSOCKETS_SEND_MESSAGE_SUCCESS,
          data: data,
        });
      } else if (data.event_type == "message") {
        dispatch({
          type: WEBSOCKETS_RECEIVE_MESSAGE_SUCCESS,
          data: data,
        });
      } else if (data.event_type == "delivered") {
        dispatch({
          type: WEBSOCKETS_MESSAGES_DELIVERED,
          data: data,
        });
      } else if (data.event_type == "online_friends") {
        dispatch({
          type: WEBSOCKETS_ONLINE_FRIENDS_SUCCESS,
          data: data,
        });
      } else if (data.event_type == "get_invite") {
        dispatch({
          type: WEBSOCKETS_GET_INVITE_SUCCESS,
          data: data,
        });
        dispatch({
          type: WEBSOCKETS_FRIEND_CHANGE_STATUS_SUCCESS,
          success: data.success,
          code: data.code,
          id_target: data.user.id,
          status: "c) Get_request",
        });
      } else if (data.event_type == "get_notification") {
        dispatch({
          type: WEBSOCKETS_GET_NOTIFICATION_SUCCESS,
          data: data,
        });
        if (data.notification.object_type == "MyUser") {
          dispatch({
            type: WEBSOCKETS_FRIEND_CHANGE_STATUS_SUCCESS,
            success: data.success,
            code: data.code,
            id_target: data.notification.object.id,
            user: data.notification.user,
            status: "a) True",
          });
          dispatch({
            type: WEBSOCKETS_FILTER_ADD_FRIEND_LIST,
            add_user: data.notification.object,
            stats: true,
          });
        } else if (data.notification.object_type == "Ticket") {
          dispatch({
            type: WEBSOCKETS_TICKET_CHANGE_STATUS_SUCCESS,
            event_id: data.notification.object.event_id,
            ticket_id: data.notification.object.id,
            verificated: data.notification.object.verificated,
            verificated_details: data.notification.object.verificated_details,
            was_allowed: data.notification.object.was_allowed,
            default_price: data.notification.object.default_price,
            price: data.notification.object.price,
            new_price: data.notification.object.new_price,
          });
        } else if (data.notification.object_type == "Order") {
          dispatch({
            type: WEBSOCKETS_ORDER_REFUND_SUCCESS,
            ids: data.notification.object.ids,
            event_id: data.notification.object.event_id,
            order_refund_information:
              data.notification.object.order_refund_information,
          });
        } else if (data.notification.object_type == "AwaitingsTicketsRefund") {
          dispatch({
            type: WEBSOCKETS_REFUND_NOT_PINNED_BANK_SUCCESS,
            amount: data.notification.object.amount,
            orders_refund_amount: data.notification.object.orders_refund_amount,
          });
        } else if (data.notification.object_type == "GatewayPaycheck") {
          console.log(data.notification.object);
          dispatch({
            type: WEBSOCKETS_PAYCHECK_RECEIVE_SUCCESS,
            event_id: data.notification.object.event_id,
            tickets_ids: data.notification.object.tickets_ids,
            paycheck_attachments:
              data.notification.object.paycheck_attachments.data,
          });
        }
      } else if (data.event_type == "target_user_deleted") {
        dispatch({
          type: WEBSOCKETS_CATCH_DELETED_USER,
          user: data.user_id,
        });
      }
    };
  });
};

const scheduleReconnect = (dispatch, id, xcsrftoken) => {
  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
  }

  if (logout_status) {
    isFirstError = true;
    logout_status = false;
    shouldReconnect = false;
  }

  if (shouldReconnect) {
    reconnectTimeout = setTimeout(() => {
      tryReconnect(dispatch, id, "first_connect", xcsrftoken).catch((error) => {
        console.error("Failed to reconnect:", error);
      });
    }, 10000);
  }
};

export const websockets_connect =
  (id, xcsrftoken) => async (dispatch, getState) => {
    logout_status = false;
    shouldReconnect = true;
    const state = getState();

    tryReconnect(dispatch, id, "first_connect", state.auth.xcsrftoken).catch(
      (error) => {
        console.error("Failed to connect:", error);
      }
    );
  };

export const change_state_contact = (content) => async (dispatch, getState) => {
  const state = getState();
  dispatch({
    type: WEBSOCKETS_CONTACT_STATE_CHANGE,
    content: content,
  });

  if (
    content == "notifications" &&
    state.websockets.wrapper_status.content != "notifications"
  ) {
    let socket = state.websockets.socket;

    if (!socket) {
      try {
        isReconnecting = false;
        socket = await tryReconnect(
          dispatch,
          state.auth.user.id,
          null,
          state.auth.xcsrftoken
        );
        isReconnecting = true;
      } catch (error) {
        console.log(error);
        console.error("Nie udało się połączyć.", error);
        dispatch({
          type: WEBSOCKETS_SEEN_NOTIFICATIONS_FAIL,
        });
        return;
      }
    }

    socket.send(
      JSON.stringify({
        event_type: "notifications_seen",
      })
    );
  }
};

export const change_state_invitations = () => async (dispatch) => {
  dispatch({
    type: WEBSOCKETS_INVITATIONS_STATE_CHANGE,
  });
};

export const friends_list = (XCSRFToken) => async (dispatch) => {
  let excluded_ids = [];
  const body = JSON.stringify({
    excluded_ids,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/friends`, {
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
      dispatch(refresh(friends_list, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: WEBSOCKETS_FRIENDS_LIST_SUCCESS,
        data: data.data,
        meta: data.meta,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: WEBSOCKETS_FRIENDS_LIST_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: WEBSOCKETS_FRIENDS_LIST_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const friends_list_next =
  (excluded_ids, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      excluded_ids,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/account/friends`, {
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
        dispatch(refresh(friends_list_next, excluded_ids, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: WEBSOCKETS_FRIENDS_LIST_NEXT_SUCCESS,
          data: data.data,
          meta: data.meta,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: WEBSOCKETS_FRIENDS_LIST_NEXT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: WEBSOCKETS_FRIENDS_LIST_NEXT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const messages_list = (XCSRFToken) => async (dispatch) => {
  let excluded_ids = [];
  const body = JSON.stringify({
    excluded_ids,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/last_messages`, {
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
      dispatch(refresh(messages_list, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: WEBSOCKETS_MESSAGES_LIST_SUCCESS,
        data: data.data,
        meta: data.meta,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: WEBSOCKETS_MESSAGES_LIST_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: WEBSOCKETS_MESSAGES_LIST_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const messages_list_next =
  (excluded_ids, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      excluded_ids,
    });
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/account/last_messages`,
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
        dispatch(refresh(messages_list_next, excluded_ids, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: WEBSOCKETS_MESSAGES_LIST_NEXT_SUCCESS,
          data: data.data,
          meta: data.meta,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: WEBSOCKETS_MESSAGES_LIST_NEXT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: WEBSOCKETS_MESSAGES_LIST_NEXT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const user_conversation =
  (target_user_id, cursor_id, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      target_user_id,
      cursor_id,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/account/messages`, {
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
          refresh(user_conversation, target_user_id, cursor_id, XCSRFToken)
        );
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 222) {
        dispatch({
          type: WEBSOCKETS_CONVERSATION_FAIL,
          error: data.detail,
          code: data.code,
        });

        dispatch({
          type: WEBSOCKETS_CATCH_DELETED_USER,
          user: target_user_id,
        });
      } else if (res.status === 200) {
        dispatch({
          type: WEBSOCKETS_CONVERSATION_SUCCESS,
          success: data.success,
          data: data.data,
          meta: data.meta,
          target_user_id: target_user_id,
        });
      } else {
        dispatch({
          type: WEBSOCKETS_CONVERSATION_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: WEBSOCKETS_CONVERSATION_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const send_message =
  (recipient_id, content, temp_message_id, author) =>
  async (dispatch, getState) => {
    const state = getState();
    const body = {
      event_type: "chat_message",
      recipient_id: recipient_id,
      content: content,
      temp_message_id: temp_message_id,
    };
    dispatch({
      type: WEBSOCKETS_SENDING_MESSAGE_SUCCESS,
      data: body,
      author: author,
    });

    let socket = state.websockets.socket;

    if (!socket) {
      try {
        isReconnecting = false;
        socket = await tryReconnect(
          dispatch,
          state.auth.user.id,
          null,
          state.auth.xcsrftoken
        );
        isReconnecting = true;
      } catch (error) {
        console.log(error);
        console.error("Nie udało się połączyć.", error);
        dispatch({
          type: WEBSOCKETS_SEND_MESSAGE_FAIL,
          data: body,
          author: author,
        });
        return;
      }
    }

    socket.send(JSON.stringify(body));
  };

export const online_friends = () => async (dispatch, getState) => {
  const state = getState();
  const body = {
    event_type: "online_friends",
  };

  let socket = state.websockets.socket;

  if (!socket) {
    try {
      isReconnecting = false;
      socket = await tryReconnect(
        dispatch,
        state.auth.user.id,
        null,
        state.auth.xcsrftoken
      );
      isReconnecting = true;
    } catch (error) {
      console.error("Nie udało się połączyć.", error);
      dispatch({
        type: WEBSOCKETS_ONLINE_FRIENDS_FAIL,
        data: body,
      });
      return;
    }
  }

  socket.send(JSON.stringify(body));
};

export const chat_open = (data) => async (dispatch) => {
  dispatch({
    type: WEBSOCKETS_CHAT_OPEN,
    data: data,
  });
};

export const chat_close = (id) => async (dispatch) => {
  dispatch({
    type: WEBSOCKETS_CHAT_CLOSE,
    id: id,
  });
};

export const refresh_websocket =
  (previous_action) => async (dispatch, getState) => {
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
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 440) {
        dispatch(token_refresh_is_blacklisted());
      } else if (res.status === 200) {
        dispatch({
          type: REFRESH_SUCCESS,
          success: data.success,
          code: data.code,
        });
        const state = getState();

        isReconnecting = false;
        await tryReconnect(
          dispatch,
          state.auth.user.id,
          previous_action,
          state.auth.xcsrftoken
        );

        // previous_action
        isReconnecting = true;
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

export const clear_cookies_websocket = () => async (dispatch) => {
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/clear_cookies`, {
      credentials: "include",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (res.status === 200) {
      dispatch({
        type: WEBSOCKETS_CLEAR_COOKIES_SUCCESS,
      });
    } else {
      dispatch({
        type: WEBSOCKETS_CLEAR_COOKIES_FAIL,
      });
    }
  } catch (err) {
    console.log(err);
    dispatch({
      type: WEBSOCKETS_CLEAR_COOKIES_FAIL,
    });
  }
};

export const clear_socket = () => async (dispatch, getState) => {
  const state = getState();
  let socket = state.websockets.socket;

  logout_status = true;

  if (reconnectTimeout) {
    clearTimeout(reconnectTimeout);
  }
  // if (socket !== null) {
  //   socket.close();
  //   dispatch({
  //     type: WEBSOCKETS_CLEAR_REDUCER,
  //   });
  // }
  if (socket !== null) {
    socket.close();
  }
  dispatch({
    type: WEBSOCKETS_CLEAR_REDUCER,
  });
};

export const invitations_list_next =
  (excluded_ids, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      excluded_ids,
    });
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/account/invitations`, {
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
        dispatch(refresh(invitations_list_next, excluded_ids, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: WEBSOCKETS_INVITATIONS_LIST_NEXT_SUCCESS,
          data: data.data,
          meta: data.meta,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: WEBSOCKETS_INVITATIONS_LIST_NEXT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: WEBSOCKETS_INVITATIONS_LIST_NEXT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const send_invite = (target_id) => async (dispatch, getState) => {
  const state = getState();
  const body = {
    event_type: "invite_friend",
    target_id: target_id,
  };

  let socket = state.websockets.socket;

  if (!socket) {
    try {
      isReconnecting = false;
      socket = await tryReconnect(
        dispatch,
        state.auth.user.id,
        null,
        state.auth.xcsrftoken
      );
      isReconnecting = true;
    } catch (error) {
      console.log(error);
      console.error("Nie udało się połączyć.", error);
      dispatch({
        type: WEBSOCKETS_SEND_INVITE_FAIL,
      });
      return;
    }
  }

  socket.send(JSON.stringify(body));
};

export const find_user_in_websockets =
  (username) => async (dispatch, getState) => {
    const state = getState();

    let find_invitation_user =
      state.websockets.friends.meta.invitations.data.find(
        (user) => user.username == username
      );

    if (find_invitation_user) {
      dispatch(find_user_by_id(find_invitation_user.id));
    } else {
      let find_chat_user = state.websockets.chat_settings.find(
        (user) => user.username == username
      );

      if (find_chat_user) {
        dispatch(find_user_by_id(find_chat_user.id));
      } else {
        let find_messages_user = state.websockets.messages.data.find(
          (user) => user.username == username
        );

        if (find_messages_user) {
          dispatch(find_user_by_id(find_messages_user.id));
        } else {
          let find_friends_user = state.websockets.friends.data.find(
            (user) => user.username == username
          );

          if (find_friends_user) {
            dispatch(find_user_by_id(find_friends_user.id));
          } else {
            let find_invitation_user =
              state.websockets.friends.meta.invitations.data.find(
                (user) => user.username == username
              );

            if (find_invitation_user) {
              dispatch(find_user_by_id(find_invitation_user.id));
            } else {
              dispatch(refresh_invitations_and_new_messages_ids());
            }
          }
        }
      }
    }
  };

export const find_user_by_id = (target_id) => async (dispatch) => {
  try {
    const res = await fetch(
      `${ips_config.BACKEND}/api/account/find_user_by_id?id=${target_id}`,
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
      dispatch(refresh(find_user_by_id, target_id));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 222) {
      // PRZYPADEK JAK NIE MA MOJEGO USERA Z TYM ID I MUSZE WYCZYSCIC WEBSOCKET Z NIEGO
      dispatch({
        type: WEBSOCKETS_CATCH_DELETED_USER,
        user: target_id,
      });
    } else if (res.status === 200) {
      // PRZYPADEK ZE ZNAJDE NOWE DANE I MUSZE PODMIENIC W WEBSOCKET
      dispatch({
        type: WEBSOCKETS_FIND_USER_BY_ID_SUCCESS,
        data: data.data,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: WEBSOCKETS_FIND_USER_BY_ID_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: WEBSOCKETS_FIND_USER_BY_ID_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const refresh_invitations_and_new_messages_ids =
  () => async (dispatch) => {
    try {
      const res = await fetch(`${ips_config.BACKEND}/api/account/refresh_ids`, {
        credentials: "include",
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (res.status === 403) {
        dispatch(refresh(refresh_invitations_and_new_messages_ids));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_SUCCESS,
          data: data.data,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      dispatch({
        type: WEBSOCKETS_REFRESH_INVITATIONS_AND_MESSAGES_IDS_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };

export const notifications_list = (XCSRFToken) => async (dispatch) => {
  let cursor_date = "";
  const body = JSON.stringify({
    cursor_date,
  });
  try {
    const res = await fetch(`${ips_config.BACKEND}/api/account/notifications`, {
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
      dispatch(refresh(notifications_list, XCSRFToken));
    } else if (handleCommonStatuses(res, data, dispatch)) {
    } else if (res.status === 200) {
      dispatch({
        type: WEBSOCKETS_NOTIFICATIONS_LIST_SUCCESS,
        data: data.data,
        meta: data.meta,
        success: data.success,
        code: data.code,
      });
    } else {
      dispatch({
        type: WEBSOCKETS_NOTIFICATIONS_LIST_FAIL,
        error: data.detail,
        code: data.code,
      });
    }
  } catch (err) {
    dispatch({
      type: WEBSOCKETS_NOTIFICATIONS_LIST_FAIL,
      error: "Coś poszło nie tak z próbą połączenia z backendem",
      code: "9150",
    });
  }
};

export const notifications_list_next =
  (cursor_date, XCSRFToken) => async (dispatch) => {
    const body = JSON.stringify({
      cursor_date,
    });
    try {
      const res = await fetch(
        `${ips_config.BACKEND}/api/account/notifications`,
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
        dispatch(refresh(notifications_list_next, cursor_date, XCSRFToken));
      } else if (handleCommonStatuses(res, data, dispatch)) {
      } else if (res.status === 200) {
        dispatch({
          type: WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_SUCCESS,
          data: data.data,
          meta: data.meta,
          success: data.success,
          code: data.code,
        });
      } else {
        dispatch({
          type: WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_FAIL,
          error: data.detail,
          code: data.code,
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: WEBSOCKETS_NOTIFICATIONS_LIST_NEXT_FAIL,
        error: "Coś poszło nie tak z próbą połączenia z backendem",
        code: "9150",
      });
    }
  };
