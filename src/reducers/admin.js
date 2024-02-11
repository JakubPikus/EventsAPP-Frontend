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
} from "../actions/types";

const initialState = {};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOGS_SUCCESS:
      let end_pagination;
      if (action.data.length < 25) {
        end_pagination = true;
      } else {
        end_pagination = false;
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_logs",
          code: action.code,
        },
        logs: {
          data: action.data,
          end_pagination: end_pagination,
        },
      };

    case ADMIN_LOGS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_logs",
          code: action.code,
        },
      };

    case ADMIN_LOGS_NEXT_SUCCESS:
      let end_pagination_next;
      if (action.data.length < 25) {
        end_pagination_next = true;
      } else {
        end_pagination_next = false;
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_logs_next",
          code: action.code,
        },
        logs: {
          data: [...state.logs.data, ...action.data],
          end_pagination: end_pagination_next,
        },
      };

    case ADMIN_LOGS_NEXT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_logs_next",
          code: action.code,
        },
      };

    case ADMIN_LOGS_REFRESH_SUCCESS:
      let filteredAdminLogsRefresh = state.logs.data;

      // ZNAJDUJEMY ID TYCH LOGÓW, KTORE ZOSTAŁY DODANE RECZNIE PRZEZ REDUCER

      let localIds = [];
      for (let obj of filteredAdminLogsRefresh) {
        if (obj.hasOwnProperty("local") && obj.local === true) {
          localIds.push(obj.id);
        } else {
          // Przerywamy pętlę gdy napotkamy pierwszy obiekt bez zmiennej "local"
          break;
        }
      }

      // USUWAMY Z REDUCERA TE LOGI, KTORE ZOSTALY DODANE LOKALNIE

      filteredAdminLogsRefresh = filteredAdminLogsRefresh.filter(
        (obj) => !localIds.includes(obj.id)
      );

      let newRefreshLogs = action.data;

      if (
        // GDY ZOSTALY POBRANE NOWE LOGI I PRZYNAJMNIEJ JEDEN Z NICH NIE JEST OD NAS, TO STARE LOGI ZMIEN NA "NEW=FALSE" ORAZ TE NOWE OD NAS
        newRefreshLogs.length > 0 &&
        newRefreshLogs.some((log) => log.user !== action.user)
      ) {
        filteredAdminLogsRefresh.forEach((log) => (log.new = false));
        newRefreshLogs.forEach((log) => {
          if (log.user == action.user) {
            log.new = false;
          }
        });
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_logs_refresh",
          code: action.code,
        },
        logs: {
          ...state.logs,
          data: [...newRefreshLogs, ...filteredAdminLogsRefresh],
        },
      };

    case ADMIN_LOGS_REFRESH_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_logs_refresh",
          code: action.code,
        },
      };

    case ADMIN_DATA_SUCCESS:
      let code;

      if (state.data?.[action.category] == undefined) {
        code = action.code;
      } else if (state.name[action.category] !== action.name) {
        code = "2001";
      } else {
        code = "2002";
      }
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_data",
          code: code,
        },
        data: { [action.category]: action.data },
        name: {
          ...state.name,
          [action.category]: action.name,
        },
      };

    case ADMIN_DATA_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_data",
          code: action.code,
        },
      };

    case ADMIN_DATA_NEXT_SUCCESS:
      let filtered_next_data = state.data;

      filtered_next_data = {
        [action.category]: {
          ...filtered_next_data[action.category],
          [action.mode]: {
            ...filtered_next_data[action.category][action.mode],
            data: [
              ...filtered_next_data[action.category][action.mode].data,
              ...action.data,
            ],
            end_pagination: action.end_pagination,
            excluded_ids: [
              ...filtered_next_data[action.category][action.mode].excluded_ids,
              ...action.excluded_ids,
            ],
          },
        },
      };

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_data_next",
          code: action.code,
        },
        data: filtered_next_data,
      };

    case ADMIN_DATA_NEXT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_data_next",
          code: action.code,
        },
      };

    ///////////////

    case ADMIN_DATA_ACTION_SUCCESS:
      let filtered_admin_action_data = state.data[action.category];

      if (action.extra1 !== "logouts") {
        filtered_admin_action_data.modal_settings = {
          type: action.objects,
          id: action.target_id,
        };

        filtered_admin_action_data[action.objects].data =
          filtered_admin_action_data[action.objects].data.filter(
            (obj) => obj.id !== action.target_id
          );
        if (action.category == "bans") {
          let second_objects;

          if (action.objects == "users") {
            second_objects = "ips";
          } else {
            second_objects = "users";
          }

          filtered_admin_action_data[second_objects].data.forEach(
            (data) =>
              (data.details = data.details.filter(
                (detail) => detail.id !== action.target_id
              ))
          );
        }
      }

      let newLogEvent = { ...action.data, local: true, new: true };

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_data_action",
          code: action.code,
        },
        data: {
          [action.category]: filtered_admin_action_data,
        },

        logs: {
          ...state.logs,
          data: [newLogEvent, ...state.logs.data],
        },
      };

    case ADMIN_DATA_ACTION_NOTVALID_SUCCESS:
      let filtered_admin_action_notvalid_data = state.data[action.category];

      filtered_admin_action_notvalid_data.modal_settings = {
        type: action.objects,
        id: action.target_id,
      };

      if (action.statistic_change == true) {
        let categories = [
          "count_active_objects",
          "count_deleted",
          "count_reports",
        ];
        let targets = ["events", "badges", "comments", "all"];

        filtered_admin_action_notvalid_data.ips.data.forEach((ip) => {
          let user_deleted = ip.details.find(
            (user) => user.id == action.target_id
          );

          if (user_deleted) {
            categories.forEach((category) =>
              targets.forEach(
                (target) =>
                  (ip[category][target] -= user_deleted[category][target])
              )
            );
          }
        });
      }

      filtered_admin_action_notvalid_data[action.objects].data =
        filtered_admin_action_notvalid_data[action.objects].data.filter(
          (obj) => obj.id !== action.target_id
        );

      if (action.category == "bans") {
        let second_objects;

        if (action.objects == "users") {
          second_objects = "ips";
        } else {
          second_objects = "users";
        }

        filtered_admin_action_notvalid_data[second_objects].data.forEach(
          (data) =>
            (data.details = data.details.filter(
              (detail) => detail.id !== action.target_id
            ))
        );
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_data_action_notvalid",
          code: action.code,
        },
        data: {
          [action.category]: filtered_admin_action_notvalid_data,
        },
      };

    case ADMIN_DATA_LOGOUT_NOTVALID_SUCCESS:
      let filtered_admin_logout_notvalid_data = state.data.bans;

      let user_target = filtered_admin_logout_notvalid_data.users.data.find(
        (user) => user.id == action.user
      );

      let ip_target = filtered_admin_logout_notvalid_data.ips.data.find(
        (ip) => ip.id == action.ip_address
      );

      let categories = [
        "count_active_objects",
        "count_deleted",
        "count_reports",
      ];
      let targets = ["events", "badges", "comments", "all"];

      categories.forEach((category) =>
        targets.forEach(
          (target) =>
            (ip_target[category][target] -= user_target[category][target])
        )
      );

      user_target.details = user_target.details.filter(
        (ip) => ip.id !== action.ip_address
      );

      ip_target.details = ip_target.details.filter(
        (user) => user.id !== action.user
      );

      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_data_logout_notvalid",
          code: action.code,
        },
        data: {
          bans: filtered_admin_logout_notvalid_data,
        },
      };

    case ADMIN_DATA_ACTION_USERCHANGED_SUCCESS:
      let filtered_admin_action_userchanged_data = [
        ...state.data[action.category][action.objects].data,
      ];

      let target_changed = filtered_admin_action_userchanged_data.find(
        (obj) => obj.id == action.target_id
      );

      if (action.category == "reports") {
        if (action.objects == "events") {
          target_changed.title = action.data.title;
          target_changed.verificated = action.data.verificated;
          target_changed.slug = action.data.slug;
          target_changed.uuid = action.data.uuid;
        } else {
          target_changed.name = action.data.name;
          target_changed.verificated = action.data.verificated;
          target_changed.image = action.data.image;
        }
      } else if (action.category == "awaitings") {
        if (action.objects == "events") {
          target_changed.title = action.data.title;
          target_changed.text = action.data.text;
          target_changed.slug = action.data.slug;
          target_changed.uuid = action.data.uuid;
          target_changed.edit_time = action.data.edit_time;
        } else if (action.objects == "badges") {
          target_changed.name = action.data.name;
          target_changed.image = action.data.image;
          target_changed.edit_time = action.data.edit_time;
        } else if (action.objects == "tickets") {
          target_changed.stripe_id = action.data.stripe_id;

          target_changed.ticket_type = action.data.ticket_type;
          target_changed.ticket_details = action.data.ticket_details;
          target_changed.default_price = action.data.default_price;
          target_changed.price = action.data.price;
          target_changed.new_price = action.data.new_price;
          target_changed.quantity = action.data.quantity;
          target_changed.was_allowed = action.data.was_allowed;
          target_changed.edit_time = action.data.edit_time;
        }
      } else if (action.category == "paychecks") {
        if (action.data !== undefined) {
          target_changed.price = action.total_price;

          target_changed.ticket_details = target_changed.ticket_details.filter(
            (ticket) => action.all_ids.includes(ticket.id)
          );
          target_changed.ticket_details = [
            ...target_changed.ticket_details,
            ...action.data,
          ];
          target_changed.all_orderedtickets_ids = action.all_ids;
          target_changed.total_tickets = target_changed.ticket_details.length;
        } else {
          target_changed.payment_information = null;
          target_changed.payment_locked_expires = null;
          target_changed.payment_locked = false;
        }
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_data_action_userchanged",
          code: action.code,
        },

        data: {
          [action.category]: {
            ...state.data[action.category],
            [action.objects]: {
              ...state.data[action.category][action.objects],
              data: filtered_admin_action_userchanged_data,
            },
          },
        },
      };

    case ADMIN_DATA_ACTION_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_data_action",
          code: action.code,
        },
      };

    case ADMIN_OPEN_GATEWAY_PAYCHECK_SUCCESS:
      let filtered_admin_open_gateway_paycheck = state.data.paychecks;

      let find_target_gateway = filtered_admin_open_gateway_paycheck[
        action.mode
      ].data.find((target) => target.id == action.target_id);

      if (find_target_gateway) {
        find_target_gateway.payment_locked_expires =
          action.payment_locked_expires;
        find_target_gateway.payment_information = {
          bank_number: action.bank_number,
          uuid_gateway: action.uuid_gateway,
        };
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_open_gateway_paycheck",
          code: action.code,
        },

        data: {
          paychecks: filtered_admin_open_gateway_paycheck,
        },
      };

    case ADMIN_OPEN_GATEWAY_PAYCHECK_ALREADY_OPENED_SUCCESS:
      let filtered_admin_already_opened_gateway_paycheck = state.data.paychecks;

      filtered_admin_already_opened_gateway_paycheck.modal_settings = {
        type: action.mode,
        id: action.target_id,
      };

      let find_already_opened_gateway =
        filtered_admin_already_opened_gateway_paycheck[action.mode].data.find(
          (target) => target.id == action.target_id
        );

      if (find_already_opened_gateway) {
        find_already_opened_gateway.payment_locked_expires =
          action.payment_locked_expires;
        find_already_opened_gateway.payment_locked = true;
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "admin_already_opened_gateway_paycheck",
          code: action.code,
        },
        data: {
          paychecks: filtered_admin_already_opened_gateway_paycheck,
        },
      };

    case ADMIN_OPEN_GATEWAY_PAYCHECK_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_open_gateway_paycheck",
          code: action.code,
        },
      };

    case ADMIN_RESET:
      return {};

    default:
      return state;
  }
};

export default adminReducer;
