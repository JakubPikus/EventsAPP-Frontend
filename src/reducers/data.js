import { event_delete } from "../actions/data";
import {
  DATA_HOMESCREEN_SUCCESS,
  DATA_HOMESCREEN_FAIL,
  DATA_HOMESCREEN_NEXT_SUCCESS,
  DATA_HOMESCREEN_NEXT_FAIL,
  CATEGORY_HOMESCREEN_SUCCESS,
  CATEGORY_HOMESCREEN_FAIL,
  CHECK_LOCALIZATION_SUCCESS,
  CHECK_LOCALIZATION_FAIL,
  EVENT_LIST_SUCCESS,
  EVENT_LIST_FAIL,
  EVENT_SUCCESS,
  EVENT_FAIL,
  COMMENT_EVENT_SUCCESS,
  COMMENT_EVENT_FAIL,
  COMMENT_EVENT_REACTION_SUCCESS,
  COMMENT_EVENT_REACTION_FAIL,
  COMMENT_EVENT_REPORT_SUCCESS,
  COMMENT_EVENT_REPORT_FAIL,
  COMMENT_EVENT_POST_SUCCESS,
  COMMENT_EVENT_POST_FAIL,
  COMMENT_EVENT_DELETE_SUCCESS,
  COMMENT_EVENT_DELETE_FAIL,
  COMMENT_EVENT_NOTVALID,
  CLEAR_EVENT,
  USER_SUCCESS,
  USER_FAIL,
  EVENT_USER_SUCCESS,
  EVENT_USER_FAIL,
  EVENT_USER_PARTICIPATE_SUCCESS,
  EVENT_USER_PARTICIPATE_FAIL,
  EVENT_PARTICIPANTS_SUCCESS,
  EVENT_PARTICIPANTS_FAIL,
  FRIEND_REQUEST_SUCCESS,
  FRIEND_REQUEST_NOTVALID_SUCCESS,
  FRIEND_REQUEST_FAIL,
  WEBSOCKETS_FRIEND_REQUEST_REACTION_SUCCESS,
  FRIEND_REQUEST_REACTION_NOTVALID_SUCCESS,
  FRIEND_REQUEST_REACTION_FAIL,
  FRIEND_REMOVE_SUCCESS,
  FRIEND_REMOVE_NOTVALID_SUCCESS,
  FRIEND_REMOVE_FAIL,
  EVENT_CREATE_SUCCESS,
  EVENT_CREATE_FAIL,
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
  DATA_RESET,
  WEBSOCKETS_FRIEND_CHANGE_STATUS_SUCCESS,
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
  WEBSOCKETS_TICKET_CHANGE_STATUS_SUCCESS,
  WEBSOCKETS_ORDER_REFUND_SUCCESS,
  WEBSOCKETS_PAYCHECK_RECEIVE_SUCCESS,
  WEBSOCKETS_REFUND_NOT_PINNED_BANK_SUCCESS,
} from "../actions/types";

const initialState = {
  handler: {
    error: "",
    success: "",
    type: "",
    code: "",
  },
  events_homescreen: {
    data: null,
    meta: null,
  },
  events_list: {
    data: null,
    meta: null,
    value_not_found: null,
  },
  events_via_badges: {
    events: null,
    alphabet_list: null,
    badge_codes_locked: {
      locked: null,
      used: null,
      append: null,
    },
    badge_codes_deleted: {
      list_ids: null,
      deleted: null,
      used: null,
    },
    is: null,
  },
  events_via_tickets: null,
  events_via_series: {
    events_no_series: null,
    events_with_series: null,
    alphabet_list: null,
  },
  events_map: {
    province: null,
    county: null,
  },
  user_badges: {
    created_badges: null,
    activated_badges: null,
    new_badge: null,
    not_valid_code_badge: {
      badge: null,
      modal_option_frontend: null,
    },
    used_codes: null,
  },
  events_random: null,
  find_friends: null,
  events_via_calendar: null,
  event: {
    data: null,
    comments: {
      data: null,
      meta: null,
    },
    participants: null,
    is_rejected: null,
  },
  event_tickets: null,
  user: {
    data: null,
    events: {
      data: null,
      meta: null,
      value_not_found: null,
    },
    not_valid_request_action: null,
  },
  new_event: {
    slug: null,
    uuid: null,
  },
  categorys: null,
  series: null,
  check_localization: null,
  settings: null,
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_HOMESCREEN_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "data_homescreen",
          code: action.code,
        },
        events_homescreen: {
          data: action.data,
          meta: action.meta,
        },
        events_list: {
          data: null,
          meta: null,
        },
        find_friends: null,
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        events_random: null,
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        events_via_calendar: null,
        settings: null,
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        event_tickets: null,
        series: null,
        events_map: {
          province: null,
          county: null,
        },
      };
    case DATA_HOMESCREEN_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "data_homescreen",
          code: action.code,
        },
      };
    case DATA_HOMESCREEN_NEXT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "data_homescreen_next",
          code: action.code,
        },
        events_homescreen: {
          data: action.data,
          meta: action.meta,
        },
      };
    case DATA_HOMESCREEN_NEXT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "data_homescreen_next",
          code: action.code,
        },
      };

    case CATEGORY_HOMESCREEN_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "category_homescreen",
          code: action.code,
        },
        categorys: action.categorys,
      };

    case CATEGORY_HOMESCREEN_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "category_homescreen",
          code: action.code,
        },
      };

    case CHECK_LOCALIZATION_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "check_localization",
          code: action.code,
        },
        check_localization: action.check_localization,
      };

    case CHECK_LOCALIZATION_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "check_localization",
          code: action.code,
        },
      };

    case EVENT_LIST_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_list",
          code: action.code,
        },
        events_list: {
          data: action.data,
          meta: action.meta,
          value_not_found: action.value_not_found,
        },
        events_homescreen: {
          data: null,
          meta: null,
        },
        find_friends: null,
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        settings: null,
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        events_via_calendar: null,
        events_random: null,
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
      };
    case EVENT_LIST_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_list",
          code: action.code,
        },
      };

    case EVENT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event",
          code: action.code,
        },
        event: {
          data: action.data,
        },
        events_list: {
          data: null,
          meta: null,
          value_not_found: null,
        },
        events_random: null,
        find_friends: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        new_event: {
          slug: null,
          uuid: null,
        },
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        settings: null,
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        events_via_calendar: null,
      };
    case EVENT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event",
          code: action.code,
        },
      };

    case COMMENT_EVENT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_comment",
          code: action.code,
        },
        event: {
          ...state.event,
          comments: {
            data: action.data,
            meta: action.meta,
          },
        },
      };

    case COMMENT_EVENT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_comment",
          code: action.code,
        },
      };

    case COMMENT_EVENT_POST_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_comment_post",
          code: action.code,
        },
        event: {
          ...state.event,
          comments: {
            data: action.data,
            meta: action.meta,
          },
        },
      };

    case COMMENT_EVENT_NOTVALID:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_comment_notvalid",
          code: action.code,
        },
        event: {
          ...state.event,
          comments: {
            data: action.data,
            meta: action.meta,
          },
        },
      };

    case COMMENT_EVENT_POST_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_comment_post",
          code: action.code,
        },
      };

    case COMMENT_EVENT_DELETE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_comment_delete",
          code: action.code,
        },
        event: {
          ...state.event,
          comments: {
            data: action.data,
            meta: action.meta,
          },
        },
      };

    case COMMENT_EVENT_DELETE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_comment_delete",
          code: action.code,
        },
      };

    case COMMENT_EVENT_REACTION_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_comment_reaction",
          code: action.code,
        },
      };

    case COMMENT_EVENT_REACTION_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_comment_reaction",
          code: action.code,
        },
      };
    case COMMENT_EVENT_REPORT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_comment_report",
          code: action.code,
        },
      };

    case COMMENT_EVENT_REPORT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_comment_report",
          code: action.code,
        },
      };
    case CLEAR_EVENT:
      return {
        ...state,
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
      };

    case USER_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "user",
          code: action.code,
        },
        user: {
          events: state.user.events,
          data: action.data,
          not_valid_request_action: null,
        },
      };

    case USER_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "user",
          code: action.code,
        },
      };

    case EVENT_USER_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_user",
          code: action.code,
        },
        user: {
          ...state.user,
          events: {
            data: action.data,
            meta: action.meta,
            value_not_found: action.value_not_found,
          },
        },
        events_homescreen: {
          data: null,
          meta: null,
        },
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        settings: null,
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        find_friends: null,
        events_via_calendar: null,
        events_random: null,
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        series: null,
      };

    case EVENT_USER_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "events_user",
          code: action.code,
        },
      };

    case EVENT_USER_PARTICIPATE_SUCCESS:
      if (state.event.data.series_events !== null) {
        let updatedList = state.event.data.series_events;

        let seriesEventParticipate = updatedList.find(
          (series) => series.id == action.id_event
        );

        if (seriesEventParticipate) {
          if (seriesEventParticipate.participant_self) {
            seriesEventParticipate.num_reputation -= 1;
          } else {
            seriesEventParticipate.num_reputation += 1;
          }

          seriesEventParticipate.participant_self =
            !seriesEventParticipate.participant_self;
        }

        if (state.event.data.id == action.id_event) {
          let diffrence_num_reputation = null;
          if (!state.event.data.participant_self) {
            diffrence_num_reputation = 1;
          } else {
            diffrence_num_reputation = -1;
          }

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "event_user_participate",
              code: action.code,
            },
            event: {
              ...state.event,
              data: {
                ...state.event.data,
                series_events: updatedList,
                participant_self: !state.event.data.participant_self,
                num_reputation:
                  parseInt(state.event.data.num_reputation) +
                  diffrence_num_reputation,
              },
            },
          };
        } else {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "event_user_participate",
              code: action.code,
            },
            event: {
              ...state.event,
              data: {
                ...state.event.data,
                series_events: updatedList,
              },
            },
          };
        }
      } else {
        let diffrence_num_reputation = null;
        if (!state.event.data.participant_self) {
          diffrence_num_reputation = 1;
        } else {
          diffrence_num_reputation = -1;
        }

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "event_user_participate",
            code: action.code,
          },
          event: {
            ...state.event,
            data: {
              ...state.event.data,
              participant_self: !state.event.data.participant_self,
              num_reputation:
                parseInt(state.event.data.num_reputation) +
                diffrence_num_reputation,
            },
          },
        };
      }

    case EVENT_USER_PARTICIPATE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_user_participate",
          code: action.code,
        },
      };

    case EVENT_PARTICIPANTS_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_participants",
          code: action.code,
        },
        event: {
          ...state.event,
          participants: action.participants,
        },
      };

    case EVENT_PARTICIPANTS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_participants",
          code: action.code,
        },
      };

    ///

    case FRIEND_REQUEST_SUCCESS:
      let change_state_request = null;
      if (state.user.data !== null) {
        if (state.user.data.is_friend === "d) False") {
          change_state_request = "b) Send_request";
        } else if (state.user.data.is_friend === "b) Send_request") {
          change_state_request = "d) False";
        }
        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "friend_request",
            code: action.code,
          },
          user: {
            ...state.user,
            data: {
              ...state.user.data,
              is_friend: change_state_request,
            },
          },
        };
      } else {
        let filtered_find_friends_request = state.find_friends.data;

        let friendFindFriendsRequest = filtered_find_friends_request.find(
          (friend) => friend.id == action.id_target
        );

        if (friendFindFriendsRequest) {
          if (friendFindFriendsRequest.is_friend === "d) False") {
            change_state_request = "b) Send_request";
          } else if (friendFindFriendsRequest.is_friend === "b) Send_request") {
            change_state_request = "d) False";
          }
          friendFindFriendsRequest.is_friend = change_state_request;
        }

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "friend_request",
            code: action.code,
          },
          find_friends: {
            ...state.find_friends,
            data: filtered_find_friends_request,
          },
        };
      }

    case WEBSOCKETS_FRIEND_CHANGE_STATUS_SUCCESS:
      if (state.user.data !== null) {
        if (action.status == "a) True") {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_change_status",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: action.status,
                friends_count: state.user.data.friends_count + 1,
                friendslist_strange: [
                  ...state.user.data.friendslist_strange,
                  action.user,
                ],
              },
            },
          };
        } else {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_change_status",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: action.status,
              },
            },
          };
        }
      } else if (state.find_friends !== null) {
        let filtered_find_friends_get_request = state.find_friends.data;

        let friendFindFriendsGetRequest =
          filtered_find_friends_get_request.find(
            (friend) => friend.id == action.id_target
          );

        if (friendFindFriendsGetRequest) {
          friendFindFriendsGetRequest.is_friend = action.status;
          if (action.status == "a) True") {
            friendFindFriendsGetRequest.friends_count += 1;
          }
        }

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "friend_change_status",
            code: action.code,
          },
          find_friends: {
            ...state.find_friends,
            data: filtered_find_friends_get_request,
          },
        };
      }

    case FRIEND_REQUEST_NOTVALID_SUCCESS:
      if (state.user.data !== null) {
        if (action.react_target_user === "Declined") {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "d) False",
              },
            },
          };
        } else if (action.react_target_user === "Invited_you_first") {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "c) Get_request",
              },
            },
          };
        } else if (action.react_target_user === "Someone_invited_firstly") {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "b) Send_request",
              },
            },
          };
        } else if (action.react_target_user === "Accepted") {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "a) True",
                friends_count: state.user.data.friends_count + 1,
                friendslist_strange: [
                  action.user,
                  ...state.user.data.friendslist_strange,
                ],
              },
            },
          };
        } else if (action.react_target_user === "Blocked_by_you") {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "Blocked",
              },
            },
          };
        } else {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "a) Get_block",
              },
              not_valid_request_action: {
                mode: "request",
                is_admin: action.is_admin,
                user_is_blocked: true,
              },
            },
          };
        }
      } else if (state.find_friends?.data !== undefined) {
        let filtered_find_friends_notvalid = state.find_friends.data;
        if (action.react_target_user === "Declined") {
          let friendFindFriendsDeclined = filtered_find_friends_notvalid.find(
            (friend) => friend.id == action.target_user.id
          );

          friendFindFriendsDeclined.is_friend = "d) False";

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_notvalid,
            },
          };
        } else if (action.react_target_user === "Invited_you_first") {
          let friendFindFriendsInvitedFirst =
            filtered_find_friends_notvalid.find(
              (friend) => friend.id == action.target_user.id
            );

          friendFindFriendsInvitedFirst.is_friend = "c) Get_request";

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_notvalid,
            },
          };
        } else if (action.react_target_user === "Someone_invited_firstly") {
          let friendFindFriendsInvitedFirst =
            filtered_find_friends_notvalid.find(
              (friend) => friend.id == action.target_user.id
            );

          friendFindFriendsInvitedFirst.is_friend = "b) Send_request";

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_notvalid,
            },
          };
        } else if (action.react_target_user === "Accepted") {
          let friendFindFriendsAccepted = filtered_find_friends_notvalid.find(
            (friend) => friend.id == action.target_user.id
          );

          friendFindFriendsAccepted.is_friend = "a) True";
          friendFindFriendsAccepted.friends_count += 1;

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_notvalid,
            },
          };
        } else if (action.react_target_user === "Blocked_by_you") {
          filtered_find_friends_notvalid =
            filtered_find_friends_notvalid.filter(
              (user) => user.id !== action.target_user.id
            );

          let blocked_count = state.find_friends.count;
          blocked_count -= 1;

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_notvalid,
              not_valid: {
                mode: "request",
                username: action.target_user.username,
                user_is_blocked: true,
              },
              count: blocked_count,
            },
          };
        } else {
          let friendFindFriendsDeclined = filtered_find_friends_notvalid.find(
            (friend) => friend.id == action.target_user.id
          );

          friendFindFriendsDeclined.is_friend = "a) Get_block";

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_notvalid,
            },
          };
        }
      }

    case FRIEND_REQUEST_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "friend_request",
          code: action.code,
        },
      };

    case WEBSOCKETS_FRIEND_REQUEST_REACTION_SUCCESS:
      if (state.user.data !== null) {
        if (action.type_reaction === "accept") {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "a) True",
                friends_count: state.user.data.friends_count + 1,
                friendslist_strange: [
                  ...state.user.data.friendslist_strange,
                  action.user,
                ],
              },
            },
          };
        } else if (action.type_reaction === "reject") {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "d) False",
              },
            },
          };
        }
      } else if (state.find_friends !== null) {
        let filtered_find_friends_request_reaction = state.find_friends.data;

        let friendFindFriendsRequestReaction =
          filtered_find_friends_request_reaction.find(
            (friend) => friend.id == action.id_target
          );

        if (friendFindFriendsRequestReaction) {
          if (action.type_reaction === "accept") {
            friendFindFriendsRequestReaction.is_friend = "a) True";
            friendFindFriendsRequestReaction.friends_count += 1;
          } else if (action.type_reaction === "reject") {
            friendFindFriendsRequestReaction.is_friend = "d) False";
          }
        }

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "friend_request_reaction",
            code: action.code,
          },
          find_friends: {
            ...state.find_friends,
            data: filtered_find_friends_request_reaction,
          },
        };
      } else {
        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "friend_request_reaction",
            code: action.code,
          },
        };
      }

    case FRIEND_REQUEST_REACTION_NOTVALID_SUCCESS:
      if (state.user.data !== null) {
        if (action.user_is_blocked == true) {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "a) Get_block",
              },
              not_valid_request_action: {
                mode: "reaction",
                is_admin: action.is_admin,
                user_is_blocked: true,
              },
            },
          };
        } else if (action.target_blocked_by_us == true) {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "Blocked",
              },
            },
          };
        } else if (action.user_is_friend == true) {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "a) True",
                friends_count: state.user.data.friends_count + 1,
                friendslist_strange: [
                  ...state.user.data.friendslist_strange,
                  action.user,
                ],
              },
            },
          };
        } else {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "d) False",
              },
            },
          };
        }
      } else if (state.find_friends !== null) {
        let filtered_find_friends_reaction_notvalid = state.find_friends.data;

        if (action.user_is_blocked == true) {
          let friendFindFriendsReaction =
            filtered_find_friends_reaction_notvalid.find(
              (friend) => friend.id == action.target_user.id
            );

          friendFindFriendsReaction.is_friend = "a) Get_block";

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_reaction_notvalid,
            },
          };
        } else if (action.target_blocked_by_us == true) {
          filtered_find_friends_reaction_notvalid =
            filtered_find_friends_reaction_notvalid.filter(
              (user) => user.id !== action.target_user.id
            );

          let blocked_count = state.find_friends.count;
          blocked_count -= 1;

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_reaction_notvalid,
              count: blocked_count,
            },
          };
        } else if (action.user_is_friend == true) {
          let friendFindFriendsRequestReaction =
            filtered_find_friends_reaction_notvalid.find(
              (friend) => friend.id == action.target_user.id
            );

          friendFindFriendsRequestReaction.is_friend = "a) True";
          friendFindFriendsRequestReaction.friends_count += 1;

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_reaction_notvalid,
            },
          };
        } else {
          let friendFindFriendsReaction =
            filtered_find_friends_reaction_notvalid.find(
              (friend) => friend.id == action.target_user.id
            );

          friendFindFriendsReaction.is_friend = "d) False";

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_reaction_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_reaction_notvalid,
            },
          };
        }
      } else {
        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "friend_request_reaction_notvalid",
            code: action.code,
          },
        };
      }

    case FRIEND_REQUEST_REACTION_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "friend_request_reaction",
          code: action.code,
        },
      };

    case FRIEND_REMOVE_SUCCESS:
      if (state.user.data !== null) {
        let updatedFriends = state.user.data.friendslist_strange;

        updatedFriends = updatedFriends.filter(
          (user) => user.id != action.user
        );

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "friend_remove",
            code: action.code,
          },
          user: {
            ...state.user,
            data: {
              ...state.user.data,
              is_friend: "d) False",
              friends_count: state.user.data.friends_count - 1,
              friendslist_strange: updatedFriends,
            },
          },
        };
      } else {
        let filtered_find_friends_remove = state.find_friends.data;

        let friendFindFriendsRemove = filtered_find_friends_remove.find(
          (friend) => friend.id == action.remove_user.id
        );

        if (friendFindFriendsRemove) {
          friendFindFriendsRemove.is_friend = "d) False";
          friendFindFriendsRemove.friends_count -= 1;
        }

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "friend_remove",
            code: action.code,
          },
          find_friends: {
            ...state.find_friends,
            data: filtered_find_friends_remove,
          },
        };
      }

    case FRIEND_REMOVE_NOTVALID_SUCCESS:
      if (state.user.data !== null) {
        let friendslist_filtered_notblocked =
          state.user.data.friendslist_strange;

        friendslist_filtered_notblocked =
          friendslist_filtered_notblocked.filter(
            (user) => user.id !== action.user
          );

        if (action.user_is_blocked === false) {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_remove_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "d) False",
                friends_count: state.user.data.friends_count - 1,
                friendslist_strange: friendslist_filtered_notblocked,
              },
            },
          };
        } else {
          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_remove_notvalid",
              code: action.code,
            },
            user: {
              ...state.user,
              data: {
                ...state.user.data,
                is_friend: "a) Get_block",
                friends_count: state.user.data.friends_count - 1,
                friendslist_strange: friendslist_filtered_notblocked,
              },
              not_valid_request_action: {
                mode: "remove",
                is_admin: action.is_admin,
                user_is_blocked: true,
              },
            },
          };
        }
      } else {
        let filtered_find_friends_remove_notvalid = state.find_friends.data;
        if (action.user_is_blocked == false) {
          let friendFindFriendsRemove =
            filtered_find_friends_remove_notvalid.find(
              (friend) => friend.id == action.remove_user.id
            );

          friendFindFriendsRemove.is_friend = "d) False";
          friendFindFriendsRemove.friends_count -= 1;

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_remove",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_remove_notvalid,
            },
          };
        } else {
          filtered_find_friends_remove_notvalid =
            filtered_find_friends_remove_notvalid.filter(
              (user) => user.id !== action.remove_user.id
            );

          let blocked_count = state.find_friends.count;
          blocked_count -= 1;

          return {
            ...state,
            handler: {
              success: action.success,
              error: "",
              type: "friend_request_notvalid",
              code: action.code,
            },
            find_friends: {
              ...state.find_friends,
              data: filtered_find_friends_remove_notvalid,
              not_valid: {
                mode: "remove",
                username: action.remove_user.username,
                user_is_blocked: true,
              },
              count: blocked_count,
            },
          };
        }
      }

    case FRIEND_REMOVE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "friend_remove",
          code: action.code,
        },
      };

    case EVENT_CREATE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_create",
          code: action.code,
        },
        new_event: {
          slug: action.slug,
          uuid: action.uuid,
        },
      };

    case EVENT_CREATE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_create",
          code: action.code,
        },
      };
    ///

    case SERIES_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "series",
          code: action.code,
        },
        series: action.data,
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        find_friends: null,
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        events_random: null,
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        settings: null,
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        events_via_calendar: null,
      };

    case SERIES_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "series",
          code: action.code,
        },
      };

    case EVENT_REPORT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_report",
          code: action.code,
        },
        event: {
          ...state.event,
          data: {
            ...state.event.data,
            my_report: action.my_report,
          },
        },
      };

    case EVENT_REPORT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_report",
          code: action.code,
        },
      };

    case EVENT_DELETE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_delete",
          code: action.code,
        },
      };

    case EVENT_DELETE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_delete",
          code: action.code,
        },
      };

    case EVENT_EDIT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_edit",
          code: action.code,
        },
        new_event: {
          slug: action.slug,
          uuid: action.uuid,
        },
      };

    case EVENT_EDIT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_edit",
          code: action.code,
        },
      };

    case EVENT_VIA_SERIES_SUCCESS:
      const alphabet = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        A: [],
        Ą: [],
        B: [],
        C: [],
        Ć: [],
        D: [],
        E: [],
        Ę: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        Ł: [],
        M: [],
        N: [],
        Ń: [],
        O: [],
        Ó: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        Ś: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: [],
        Ź: [],
        Ż: [],
      };

      for (let i = 0; i < action.events_with_series.length; i++) {
        let first = action.events_with_series[i].name.charAt(0).toUpperCase();

        let index_alphabet = alphabet[first].findIndex(
          (obj) =>
            obj.name.toUpperCase() >
            action.events_with_series[i].name.toUpperCase()
        );

        if (index_alphabet === -1) {
          index_alphabet = alphabet[first].length;
        }

        alphabet[first].splice(index_alphabet, 0, {
          name: action.events_with_series[i].name,
          past:
            action.events_with_series[i].current ||
            action.events_with_series[i].data.length == 0
              ? false
              : true,
          empty: action.events_with_series[i].data.length > 0 ? false : true,
        });
      }
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_via_series",
          code: action.code,
        },
        events_via_series: {
          events_no_series: action.events_no_series,
          events_with_series: action.events_with_series,
          alphabet_list: alphabet,
        },
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        settings: null,
        events_via_tickets: null,
        events_list: {
          data: null,
          meta: null,
          value_not_found: null,
        },
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        events_random: null,
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        find_friends: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
        events_via_calendar: null,
        new_event: {
          slug: null,
          uuid: null,
        },
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
      };

    case EVENT_VIA_SERIES_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "events_via_series",
          code: action.code,
        },
      };

    case EVENT_ADD_SERIES_SUCCESS: //TUTEJ    -   GITEGO
      let event_object_add = state.events_via_series.events_no_series.find(
        (obj) => obj.id == action.id
      );
      let filtered_events_with_series_add =
        state.events_via_series.events_with_series;
      let alphabet_event_add = state.events_via_series.alphabet_list;
      let first_event_add = action.series.charAt(0).toUpperCase();

      // USUWANIE PRZYPISOWANEGO WYDARZENIA Z LISTY WYDARZEN BEZ SERII
      let filtered_events_no_series_add =
        state.events_via_series.events_no_series.filter(
          (obj) => obj !== event_object_add
        );
      event_object_add.series = action.series;

      // NAMIERZENIE SERII DO KTOREJ DODAJEMY
      let seriesEventSeriesAdd = filtered_events_with_series_add.find(
        (series) => series.name == action.series
      );

      if (seriesEventSeriesAdd) {
        // ZNALEZIENIE ODPOWIEDNIEGO INDEXU WZGLEDEM DATY, DO WSTAWIENIA W MIEJSCE PRZYPISYWANEGO WYDARZENIA
        let index_event_add = seriesEventSeriesAdd.data.findIndex(
          (obj) => obj.event_date > action.event_date
        );
        if (index_event_add === -1) {
          index_event_add = seriesEventSeriesAdd.data.length;
        }

        // ZMIANA WARTOSCI "CURRENT" JESLI WYDARZENIE JEST AKTUALNE/NIE JEST
        if (
          seriesEventSeriesAdd.current == false &&
          event_object_add.current == true
        ) {
          seriesEventSeriesAdd.current = true;
        } else if (
          seriesEventSeriesAdd.current == true &&
          seriesEventSeriesAdd.data.length == 0 &&
          event_object_add.current == false
        ) {
          seriesEventSeriesAdd.current = false;
        }

        seriesEventSeriesAdd.data.splice(index_event_add, 0, event_object_add);
      }

      // USTAWIENIE LITERKI DO SZYBKIEGO DOSTEPU DO SERII
      let alphabetEventSeriesAdd = alphabet_event_add[first_event_add].find(
        (letter) => letter.name == action.series
      );

      if (alphabetEventSeriesAdd) {
        if (
          alphabetEventSeriesAdd.past == true &&
          event_object_add.current == true
        ) {
          alphabetEventSeriesAdd.past = false;
        } else if (
          alphabetEventSeriesAdd.past == false &&
          event_object_add.current == false &&
          alphabetEventSeriesAdd.empty == true
        ) {
          alphabetEventSeriesAdd.past = true;
        }
        alphabetEventSeriesAdd.empty = false;
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_add_series",
          code: action.code,
        },
        events_via_series: {
          events_no_series: filtered_events_no_series_add,
          events_with_series: filtered_events_with_series_add,
          alphabet_list: alphabet_event_add,
        },
      };

    case EVENT_ADD_SERIES_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_add_series",
          code: action.code,
        },
      };

    case EVENT_DELETE_SERIES_SUCCESS:
      let filtered_events_no_series_delete =
        state.events_via_series.events_no_series;
      let filtered_events_with_series_delete =
        state.events_via_series.events_with_series;
      let alphabet_event_delete = state.events_via_series.alphabet_list;
      let first_event_delete = action.series.charAt(0).toUpperCase();
      let event_object_delete;

      let seriesEventSeriesDelete = filtered_events_with_series_delete.find(
        (series) => series.name == action.series
      );

      if (seriesEventSeriesDelete) {
        // ZNALEZIENIE USUWANEGO WYDARZENIA W REDUCERZE

        event_object_delete = seriesEventSeriesDelete.data.find(
          (obj) => obj.id == action.id
        );

        // ODFILTROWANIE LISTY WYDARZEN W SERII
        seriesEventSeriesDelete.data = seriesEventSeriesDelete.data.filter(
          (obj) => obj !== event_object_delete
        );

        // STATUS DLA SERII CZY PO USUNIECIU ZOSTAL JAKIES AKTUALNE WYDARZENIE
        let series_status = seriesEventSeriesDelete.data.some(
          (event) => event.current == true
        );

        seriesEventSeriesDelete.current = series_status;

        // ZNALEZIENIE LITERKI I USTAWIENIE ODPOWIEDNICH WARTOSCI DLA SKRÓTU SERII
        let alphabetEventSeriesDelete = alphabet_event_delete[
          first_event_delete
        ].find((letter) => letter.name == action.series);

        if (alphabetEventSeriesDelete) {
          if (seriesEventSeriesDelete.data.length == 0) {
            alphabetEventSeriesDelete.empty = true;
            alphabetEventSeriesDelete.past = false;
          } else if (
            seriesEventSeriesDelete.data.length > 0 &&
            alphabetEventSeriesDelete.past == false
          ) {
            alphabetEventSeriesDelete.past = !series_status;
          }
        }
      }

      let index_event_delete = filtered_events_no_series_delete.findIndex(
        (obj) => obj.event_date > action.event_date
      );

      if (index_event_delete === -1) {
        index_event_delete = filtered_events_no_series_delete.length;
      }
      event_object_delete.series = null;

      filtered_events_no_series_delete.splice(
        index_event_delete,
        0,
        event_object_delete
      );

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_delete_series",
          code: action.code,
        },
        events_via_series: {
          events_no_series: filtered_events_no_series_delete,
          events_with_series: filtered_events_with_series_delete,
          alphabet_list: alphabet_event_delete,
        },
      };

    case EVENT_DELETE_SERIES_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_delete_series",
          code: action.code,
        },
      };

    case SERIES_CREATE_SUCCESS: //TUTEJ ALE TYLKO KONSTRUKCJA   -  GITEGO
      let filtered_with_series_add = state.events_via_series.events_with_series;
      let alphabet_create = state.events_via_series.alphabet_list;

      filtered_with_series_add.splice(0, 0, {
        name: action.name,
        description: action.description,
        current: false,
        data: [],
      });
      let first_create = action.name.charAt(0).toUpperCase();

      let index_alphabet_create = alphabet_create[first_create].findIndex(
        (obj) => obj.name.toUpperCase() > action.name.toUpperCase()
      );

      if (index_alphabet_create === -1) {
        index_alphabet_create = alphabet_create[first_create].length;
      }
      alphabet_create[first_create].splice(index_alphabet_create, 0, {
        name: action.name,
        past: false,
        empty: true,
      });

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "series_create",
          code: action.code,
        },
        events_via_series: {
          ...state.events_via_series,
          events_with_series: filtered_with_series_add,
          alphabet_list: alphabet_create,
        },
      };

    case SERIES_CREATE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "series_create",
          code: action.code,
        },
      };

    case SERIES_DELETE_SUCCESS: // TUTEJ ALE TYLKO KONSTRUKCJA -   GITEGO
      let filtered_no_series_delete = state.events_via_series.events_no_series;
      let filtered_series_delete =
        state.events_via_series.events_with_series.filter(
          (obj) => obj.name !== action.name
        );
      let alphabet_delete = state.events_via_series.alphabet_list;

      let filtered_events = state.events_via_series.events_with_series.find(
        (series) => series.name === action.name
      ).data;

      for (let i = 0; i < filtered_events.length; i++) {
        filtered_events[i].series = null;

        let index_series_delete = filtered_no_series_delete.findIndex(
          (obj) => obj.event_date > filtered_events[i].event_date
        );

        if (index_series_delete === -1) {
          index_series_delete = filtered_no_series_delete.length;
        }
        filtered_no_series_delete.splice(
          index_series_delete,
          0,
          filtered_events[i]
        );
      }

      let first_delete = action.name.charAt(0).toUpperCase();

      alphabet_delete[first_delete] = alphabet_delete[first_delete].filter(
        (obj) => obj.name !== action.name
      );

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "series_delete",
          code: action.code,
        },
        events_via_series: {
          events_no_series: filtered_no_series_delete,
          events_with_series: filtered_series_delete,
          alphabet_list: alphabet_delete,
        },
      };

    case SERIES_DELETE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "series_delete",
          code: action.code,
        },
      };

    case SERIES_EDIT_SUCCESS:
      let filtered_series_edit = state.events_via_series.events_with_series;
      let alphabet_edit = state.events_via_series.alphabet_list;

      let editedSeries = filtered_series_edit.find(
        (series) => series.name == action.series
      );
      if (editedSeries) {
        editedSeries.name = action.name;
        editedSeries.description = action.description;
      }

      let first_edit_delete = action.series.charAt(0).toUpperCase();
      let index_alphabet_edit_delete = alphabet_edit[first_edit_delete].indexOf(
        (obj) => obj.name == action.series
      );

      let old_object = alphabet_edit[first_edit_delete].filter(
        (obj) => obj.name == action.series
      )[0];

      alphabet_edit[first_edit_delete].splice(index_alphabet_edit_delete, 1);

      let first_edit_create = action.name.charAt(0).toUpperCase();
      let index_alphabet_edit_create = alphabet_edit[
        first_edit_create
      ].findIndex((obj) => obj.name.toUpperCase() > action.name.toUpperCase());

      if (index_alphabet_edit_create === -1) {
        index_alphabet_edit_create = alphabet_edit[first_edit_create].length;
      }

      alphabet_edit[first_edit_create].splice(index_alphabet_edit_create, 0, {
        name: action.name,
        past: old_object.past,
        empty: old_object.empty,
      });

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "series_edit",
          code: action.code,
        },
        events_via_series: {
          ...state.events_via_series,
          events_with_series: filtered_series_edit,
          alphabet_list: alphabet_edit,
        },
      };

    case SERIES_EDIT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "series_edit",
          code: action.code,
        },
      };

    case EVENT_VIA_CALENDAR_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_via_calendar",
          code: action.code,
        },
        events_via_calendar: action.data,
        events_homescreen: {
          data: null,
          meta: null,
        },
        events_list: {
          data: null,
          meta: null,
        },
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        find_friends: null,
        settings: null,
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        events_random: null,
        events_via_tickets: null,
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
      };

    case EVENT_VIA_CALENDAR_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "events_via_calendar",
          code: action.code,
        },
      };

    case EVENT_RANDOM_SUCCESS:
      let filtred_events_random;
      let code;

      if (state.events_random == null) {
        // PIERWSZE POBRANIE
        filtred_events_random = action.data;

        // GDY ZA PIERWSZYM JUZ RAZEM BEDZIE MNIEJ NIZ 10 EVENTOW, TO ZNACZY ZE TO SĄ WSZYSTKIE
        if (action.data.length < 10) {
          code = "660";
        } else {
          code = action.code;
        }
      } else {
        // KOLEJNE POBRANIE GDY W REDUCERZE POZOSTAJĄ 2 OSTATNIE EVENTY I POBIERAMY NOWE

        let new_data = action.data.filter(
          (obj) =>
            obj.id !== state.events_random[0].id &&
            obj.id !== state.events_random[1].id
        );
        filtred_events_random = [...state.events_random, ...new_data];
        if (new_data.length < 8) {
          // GDY PO ODFILTROWANIU OKAŻE SIĘ ŻE JEST MNIEJ NIŻ 10-2=8 EVENTÓW, CZYLI WSZYSTKIE Z BAZY
          // LUB
          // (10% SZANS) GDY AKURAT POBIERZEMY OSTATNIE 8 EVENTÓW + 2 POWTARZAJĄCE SIĘ, TO NASTĄPI 1 DODATKOWY FETCH I ZNÓW WEJDZIE W (new_data.length < 8)
          code = "660";
        } else {
          code = action.code;
        }

        // PRZEKAZAĆ INFO DO PAGE ŻE new_data DŁUGOŚĆ TO 0 I NIE ZAPĘTLAĆ DISPATCHA
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_random",
          code: code,
        },
        events_random: filtred_events_random,
        events_via_calendar: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        events_list: {
          data: null,
          meta: null,
        },
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        settings: null,
        find_friends: null,
        events_via_tickets: null,
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },

        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
      };

    case EVENT_RANDOM_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "events_random",
          code: action.code,
        },
      };

    case EVENT_RANDOM_REACTION_SUCCESS:
      let temp_filtred_events_random_reaction = state.events_random.filter(
        (obj) => obj.id !== action.id
      );
      let filtred_events_random_reaction;
      // GDY DAJEMY OSTATNIE VOTE POBRANEMU EVENTOWI TO USTAW NA "EMPTY" DLA ODPOWIEDNIEGO TEMPLATE
      if (temp_filtred_events_random_reaction.length == 0) {
        filtred_events_random_reaction = "empty";
      } else {
        filtred_events_random_reaction = temp_filtred_events_random_reaction;
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_random_reaction",
          code: action.code,
        },
        events_random: filtred_events_random_reaction,
      };

    case EVENT_RANDOM_REACTION_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "events_random_reaction",
          code: action.code,
        },
      };

    // KAŻDA ZMIANA LOKALIZACJI/DYSTANSU WYMAGA WYZEROWANIA DANYCH Z REDUCERA
    case CLEAR_EVENT_RANDOM:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_random_reaction",
          code: action.code,
        },
        events_random: null,
      };

    case EVENT_PROVINCE_MAP_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_province_map",
          code: action.code,
        },
        events_map: {
          province: action.data,
          county: null,
        },
        events_random: null,
        events_via_calendar: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        event_tickets: null,
        find_friends: null,
        settings: null,
        events_list: {
          data: null,
          meta: null,
        },

        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
      };

    case EVENT_PROVINCE_MAP_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "events_province_map",
          code: action.code,
        },
      };

    case EVENT_COUNTY_MAP_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_county_map",
          code: action.code,
        },
        events_map: {
          ...state.events_map,
          county: action.data,
        },
      };

    case EVENT_COUNTY_MAP_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "events_county_map",
          code: action.code,
        },
      };

    case FIND_FRIENDS_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "find_friends",
          code: action.code,
        },
        find_friends: {
          ...state.find_friends,
          data: action.data,
          count: action.count,
        },
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        events_random: null,
        events_via_calendar: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        events_list: {
          data: null,
          meta: null,
        },

        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        settings: null,
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
      };

    case FIND_FRIENDS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "find_friends",
          code: action.code,
        },
      };

    case FIND_FRIENDS_NEXT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "find_friends_next",
          code: action.code,
        },
        find_friends: {
          ...state.find_friends,
          data: [...state.find_friends.data, ...action.data],
          count: action.count,
        },
      };
    case FIND_FRIENDS_NEXT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "find_friends_next",
          code: action.code,
        },
      };

    case EVENT_VIA_BAGDES_SUCCESS:
      const alphabet_badges = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
        A: [],
        Ą: [],
        B: [],
        C: [],
        Ć: [],
        D: [],
        E: [],
        Ę: [],
        F: [],
        G: [],
        H: [],
        I: [],
        J: [],
        K: [],
        L: [],
        Ł: [],
        M: [],
        N: [],
        Ń: [],
        O: [],
        Ó: [],
        P: [],
        Q: [],
        R: [],
        S: [],
        Ś: [],
        T: [],
        U: [],
        V: [],
        W: [],
        X: [],
        Y: [],
        Z: [],
        Ź: [],
        Ż: [],
      };

      for (let i = 0; i < action.events.length; i++) {
        let first = action.events[i].title.charAt(0).toUpperCase();

        let index_alphabet_badges = alphabet_badges[first].findIndex(
          (obj) =>
            obj.title.toUpperCase() > action.events[i].title.toUpperCase()
        );

        if (index_alphabet_badges === -1) {
          index_alphabet_badges = alphabet_badges[first].length;
        }

        alphabet_badges[first].splice(index_alphabet_badges, 0, {
          title: action.events[i].title,
        });
      }
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "events_via_badges",
          code: action.code,
        },

        events_via_badges: {
          ...state.events_via_badges,
          events: action.events,
          alphabet_list: alphabet_badges,
        },

        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        events_list: {
          data: null,
          meta: null,
          value_not_found: null,
        },
        events_via_tickets: null,
        events_random: null,
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        find_friends: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
        events_via_calendar: null,
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },
        settings: null,
        new_event: {
          slug: null,
          uuid: null,
        },
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
      };

    case EVENT_VIA_BAGDES_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "events_via_badges",
          code: action.code,
        },
      };

    case BADGECODES_LOCKED_SUCCESS:
      let filtered_badges_codes = state.events_via_badges.events;

      let eventBadgeCodeToLock = filtered_badges_codes.find(
        (event) => event.id == action.event_id
      );

      if (eventBadgeCodeToLock) {
        let badgeBadgeCodeToLock = eventBadgeCodeToLock.badges.find(
          (badge) => badge.id == action.badge_id
        );

        if (badgeBadgeCodeToLock) {
          badgeBadgeCodeToLock.codes.forEach((code) => {
            // GDY ZOSTAŁY ZABLOKOWANE
            if (action.locked_old_codes_id_list.includes(code.id)) {
              badgeBadgeCodeToLock.locked_codes_count += 1;
              badgeBadgeCodeToLock.to_use_codes_count -= 1;
              code.status = "b) locked";
            }
            // GDY ZOSTAŁY ZNALEZIONE JAKO UŻYTE
            else if (
              action.used_old_codes_id_list !== null &&
              action.used_old_codes_id_list.includes(code.id)
            ) {
              badgeBadgeCodeToLock.used_codes_count += 1;
              badgeBadgeCodeToLock.to_use_codes_count -= 1;
              code.status = "c) used";

              // ZNAJDŹ PRZEZ KOGO ZOSTAŁ UŻYTY I PODSTAW USERA
              let badgeCodeToLockUsed = action.used_codes.find(
                (obj) => obj.id == code.id
              );
              if (badgeCodeToLockUsed) {
                code.activated_by = badgeCodeToLockUsed.activated_by;
              }
            }
          });
          // JAK ZOSTAŁY ZNALEZIONE JAKO ZUŻYTE TO DOPISZ DO REDUCERA NOWO STWORZONE
          // BO JAK USER CHCE 100 A 5 OKAZAŁO SIĘ UŻYTYCH, TO EKSPORTUJE 95 STARYCH + 5 NOWYCH
          if (action.append_codes !== null && action.append_codes.length > 0) {
            badgeBadgeCodeToLock.locked_codes_count +=
              action.append_codes.length;

            badgeBadgeCodeToLock.codes = [
              ...action.append_codes,
              ...badgeBadgeCodeToLock.codes,
            ];
          }
        }
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_codes_lock",
          code: action.code,
        },
        events_via_badges: {
          ...state.events_via_badges,
          events: filtered_badges_codes,
          badge_codes_locked: {
            locked: action.locked_codes,
            used: action.used_codes,
            append: action.append_codes,
          },
        },
      };
    case BADGECODES_LOCKED_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_codes_lock",
          code: action.code,
        },
      };

    case BADGECODES_CREATE_SUCCESS:
      let filtered_badges_codes_create = state.events_via_badges.events;

      let eventBadgeCodeCreate = filtered_badges_codes_create.find(
        (event) => event.id == action.event_id
      );

      if (eventBadgeCodeCreate) {
        let badgeBadgeCodeCreate = eventBadgeCodeCreate.badges.find(
          (badge) => badge.id == action.badge_id
        );

        if (badgeBadgeCodeCreate) {
          badgeBadgeCodeCreate.to_use_codes_count += action.data.length;
          badgeBadgeCodeCreate.codes = [
            ...action.data,
            ...badgeBadgeCodeCreate.codes,
          ];
        }
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_codes_create",
          code: action.code,
        },
        events_via_badges: {
          ...state.events_via_badges,
          events: filtered_badges_codes_create,
        },
      };
    case BADGECODES_CREATE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_codes_create",
          code: action.code,
        },
      };

    //

    case BADGECODES_DELETE_SUCCESS:
      let filtered_badges_codes_delete = state.events_via_badges.events;

      let eventBadgeCodeToDelete = filtered_badges_codes_delete.find(
        (event) => event.id == action.event_id
      );

      if (eventBadgeCodeToDelete) {
        let badgeBadgeCodeToDelete = eventBadgeCodeToDelete.badges.find(
          (badge) => badge.id == action.badge_id
        );

        if (badgeBadgeCodeToDelete) {
          badgeBadgeCodeToDelete.to_use_codes_count -=
            action.deleted_old_codes_id_list.length;
          badgeBadgeCodeToDelete.codes = badgeBadgeCodeToDelete.codes.filter(
            (code) => !action.deleted_old_codes_id_list.includes(code.id)
          );

          if (action.used_old_codes_id_list !== null) {
            badgeBadgeCodeToDelete.codes.forEach((code) => {
              if (action.used_old_codes_id_list.includes(code.id)) {
                badgeBadgeCodeToDelete.used_codes_count++;
                badgeBadgeCodeToDelete.to_use_codes_count--;
                code.status = "c) used";

                let badgeCodeToDeleteUsed = action.used_codes.find(
                  (obj) => obj.id == code.id
                );
                if (badgeCodeToDeleteUsed) {
                  code.activated_by = badgeCodeToDeleteUsed.activated_by;
                }
              }
            });
          }
        }
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_codes_delete",
          code: action.code,
        },
        events_via_badges: {
          ...state.events_via_badges,
          events: filtered_badges_codes_delete,
          badge_codes_deleted: {
            list_ids: action.deleted_old_codes_id_list,
            deleted: action.deleted_codes,
            used: action.used_codes,
          },
        },
      };
    case BADGECODES_DELETE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_codes_delete",
          code: action.code,
        },
      };

    case BADGE_EDIT_SUCCESS:
      let filtered_badge_edit = state.events_via_badges.events;

      let eventBadgeToEdit = filtered_badge_edit.find(
        (event) => event.id == action.event_id
      );

      if (eventBadgeToEdit) {
        let badgeToEdit = eventBadgeToEdit.badges.find(
          (badge) => badge.id == action.badge_id
        );

        if (badgeToEdit) {
          badgeToEdit.name = action.name;
          badgeToEdit.image = action.image;
          badgeToEdit.verificated = action.status;
        }
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_edit",
          code: action.code,
        },
        events_via_badges: {
          ...state.events_via_badges,
          events: filtered_badge_edit,
        },
      };
    case BADGE_EDIT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_edit",
          code: action.code,
        },
      };

    case BADGE_CREATE_SUCCESS:
      let filtered_badge_create = state.events_via_badges.events;

      let eventToCreate = filtered_badge_create.find(
        (event) => event.id == action.event_id
      );

      if (eventToCreate) {
        action.badge.image = action.badge.image.replace("/media/", "");

        eventToCreate.badges = [
          ...eventToCreate.badges,
          {
            ...action.badge,
            verificated_details: null,
            codes: [],
            used_codes_count: 0,
            locked_codes_count: 0,
            to_use_codes_count: 0,
          },
        ];
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_create",
          code: action.code,
        },
        events_via_badges: {
          ...state.events_via_badges,
          events: filtered_badge_create,
        },
      };
    case BADGE_CREATE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_create",
          code: action.code,
        },
      };

    case BADGE_DELETE_SUCCESS:
      let filtered_badge_delete = state.events_via_badges.events;

      let badgeToDelete = filtered_badge_delete.find(
        (event) => event.id == action.event_id
      );

      if (badgeToDelete) {
        badgeToDelete.badges = badgeToDelete.badges.filter(
          (badge) => badge.id !== action.badge_id
        );
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_delete",
          code: action.code,
        },
        events_via_badges: {
          ...state.events_via_badges,
          events: filtered_badge_delete,
        },
      };
    case BADGE_DELETE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_delete",
          code: action.code,
        },
      };

    case BADGE_OWNER_IS_DELETED:
      let filtered_badge_owner_is_delete = state.events_via_badges.events;

      let badgeOwnerToDelete = filtered_badge_owner_is_delete.find(
        (event) => event.id == action.event_id
      );

      if (badgeOwnerToDelete) {
        badgeOwnerToDelete.badges = badgeOwnerToDelete.badges.filter(
          (badge) => badge.id !== action.badge_id
        );
      }

      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_owner_is_delete",
          code: action.code,
        },
        events_via_badges: {
          ...state.events_via_badges,
          events: filtered_badge_owner_is_delete,
          is: {
            ...state.events_via_badges.is,
            deleted: action.badge_id,
          },
        },
      };

    case BADGE_OWNER_IS_NOT_VERIFICATED:
      let filtered_owner_notverificated = state.events_via_badges.events;

      let eventBadgeToChangeStatus = filtered_owner_notverificated.find(
        (event) => event.id == action.event_id
      );

      if (eventBadgeToChangeStatus) {
        let badgeToChangeStatus = eventBadgeToChangeStatus.badges.find(
          (badge) => badge.id == action.badge_id
        );

        if (badgeToChangeStatus) {
          badgeToChangeStatus.verificated = action.status.verificated;
          badgeToChangeStatus.verificated_details = action.status.details;
        }
      }

      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_owner_notverificated",
          code: action.code,
        },
        events_via_badges: {
          ...state.events_via_badges,
          events: filtered_owner_notverificated,
          is: {
            ...state.events_via_badges.is,
            not_verificated: action.badge_id,
          },
        },
      };

    case USER_BADGES_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "user_badges",
          code: action.code,
        },
        user_badges: {
          ...state.user_badges,
          created_badges: action.created_badges,
          activated_badges: action.activated_badges,
          used_codes: [],
        },

        find_friends: null,
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        events_random: null,
        events_via_calendar: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        events_list: {
          data: null,
          meta: null,
        },

        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        settings: null,
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },

        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
      };
    case USER_BADGES_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "user_badges",
          code: action.code,
        },
      };

    case BADGE_ACTIVATE_SUCCESS:
      let filtered_badge_activate = [
        action.data,
        ...state.user_badges.activated_badges,
      ];

      let response_badge_activate = {
        ...action.data,
        code: action.code_activation,
        set_main_badge: action.set_main_badge,
      }; // NOWA ODZNAKA

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_activate",
          code: action.code,
        },
        user_badges: {
          ...state.user_badges,
          activated_badges: filtered_badge_activate,
          new_badge: response_badge_activate,
          used_codes: [...state.user_badges.used_codes, action.code_activation],
        },
      };

    case BADGE_ACTIVATE_NOTVALID_CODE_SUCCESS:
      let filtered_badge_activate_notvalid = [
        ...state.user_badges.activated_badges,
      ];
      let modal_option_frontend;
      let response_badge = { ...action.data, code: action.code_activation }; // NOWA ODZNAKA

      let old_badge_reference = filtered_badge_activate_notvalid.find(
        (obj) => obj.id == action.data.id
      );

      let old_badge;

      if (old_badge_reference == undefined) {
        old_badge = undefined;
      } else {
        old_badge = { ...old_badge_reference };
      }

      //
      //
      //
      if (action.data.verificated == "verificated") {
        // GDY ACTION.BADGE.VERIFICATION == VERIFICATION               USER_NOT_REDUCER                 - STAREJ ODZNAKI "NIE MA" W REDUCERZE                 , KTÓRA PODCZAS PRZEGLADANIA ZOSTALA "ZWERYFIKOWANA" -> TRZEBA DODAC     -> NOWA ODZNAKA
        //                                                             ADMIN_IN_REDUCER                 - STARA ODZNAKA  "JEST"   W REDUCERZE Z INNYM STATUSEM, KTÓRA PODCZAS PRZEGLADANIA ZOSTALA "ZWERYFIKOWANA" -> TRZEBA ZMIENIC   -> STARA ODZNAKA I NOWA ODZNAKA  (DO POKAZANIA ROZNIC)
        //                                                             NORMAL_IN_REDUCER                - STARA ODZNAKA  "JEST"   W REDUCERZE ZWERYFIKOWANA I PRZYSZLA ZWERYFIKOWANA                               -> NORMALNY MODAL   -> NOWA ODZNAKA
        if (old_badge == undefined) {
          //                                             USER_NOT_REDUCER
          modal_option_frontend = {
            mode: "user_not_reducer",
            was_activated: action.was_activated,
          };

          filtered_badge_activate_notvalid = [
            action.data,
            ...filtered_badge_activate_notvalid,
          ];
        } else if (old_badge.verificated !== "verificated") {
          //                                            ADMIN_IN_REDUCER
          modal_option_frontend = {
            mode: "admin_in_reducer",
            old_badge: old_badge,
          };

          old_badge_reference.verificated = action.data.verificated;
          old_badge_reference.verificated_details =
            action.data.verificated_details;
          old_badge_reference.name = action.data.name;
          old_badge_reference.image = action.data.image;
        } else {
          //                                            NORMAL_IN_REDUCER
          if (
            old_badge.name == action.data.name &&
            old_badge.image == action.data.image
          ) {
            modal_option_frontend = {
              mode: "normal_in_reducer",
              detected_change: false,
              old_badge: null,
            };
          } else {
            modal_option_frontend = {
              mode: "normal_in_reducer",
              detected_change: true,
              old_badge: old_badge,
            };

            old_badge_reference.name = action.data.name;
            old_badge_reference.image = action.data.image;
          }
        }
      } else {
        // GDY ACTION.BADGE.VERIFICATION == REJECTED                // USER_IN_REDUCER                         -   STARA ODZNAKA "JEST" W REDUCERZE            , KTÓRA PODCZAS PRZEGLĄDANIA ZOSTAŁA "USUNIĘTA"                                                                             -> TRZEBA USUNĄĆ     -> STARA ODZNAKA

        //                                                          // USER_NOT_REDUCER + was_activated == true              -   STAREJ ODZNAKI "NIE MA" W REDUCERZE,  ALE BYŁA WCZEŚNIEJ AKTYWOWANA, BYŁA "USUNIĘTA"/"WERYFIKOWANA" I JEST USUNIĘTA                                                     -> NORMAL MODAL      -> SAM TYTUŁ  "JUŻ PRÓBOWAŁEŚ AKTYWOWAC TA ODZNAKE, LECZ NA CHWILE OBECNA JEST ZAZNACZONA JAKO USUNIETA"
        //                                                          // USER_NOT_REDUCER + was_activated == false             -   STAREJ ODZNAKI "NIE MA" W RECUDERZE,  NIE BYŁA WCZEŚNIEJ AKTYWOWANA, I JEST "USUNIĘTA"                                                                                  -> NORMAL MODAL      -> SAM TYTUŁ  "PRÓBUJESZ AKTYWOWAC ODZNAKE, KTÓRA NA CHWILE OBECNA JEST USUNIETA"
        //
        //
        //                                                          // ADMIN_NOT_REDUCER                        -   STAREJ ODZNAKI "NIE MA" W REDUCERZE                                                                                                                                     -> TRZEBA DODAĆ      -> NOWA ODZNAKA
        //                                                          // ADMIN_IN_REDUCER                         -   STARA ODZNAKA   "JEST"  W REDUCERZE  "WERYFIKOWANA"/"ZWERYFIKOWANA"     , KTÓRA PODCZAS PRZEGLĄDANIA ZOSTAŁA "USUNIĘTA"                                                 -> TRZEBA ZMIENIC    -> STARA ODZNAKA I NOWA ODZNAKA  (DO POKAZANIA ROZNIC *** BRAC POD UWAGE STARY STATUS PRZY TYTULE "STARA ODZNAKA KTÓRA BYŁA....")
        //                                                          // NORMAL_IN_REDUCER                        -   STARA ODZNAKA   "JEST"  W REDUCERZE  "USUNIETA"  I JEST "USUNIETA"                                                                                                      -> NORMAL MODAL      -> NOWA ODZNAKA
        //_______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________
        // GDY ACTION.BADGE.VERIFICATION == NEED_IMPROVMENT/AWAITING
        //                                                          // USER_IN_REDUCER                                 -   STARA ODZNAKA "JEST" W REDUCERZE            , KTÓRA PODCZAS PRZEGLĄDANIA ZOSTAŁA ZMIENIONA NA "NEED_IMPROVMENT"                                                        -> TRZEBA USUNĄĆ     -> STARA ODZNAKA    "JUZ AKTYWOWALES TĄ ODZNAKĘ I WŁAŚNIE KTOŚ WPROWADZIŁ DO NIEJ ZMIANY, PRZEZ CO PRZECHODZI PONOWNIE PRZEZ STAN WERYFIKACJI. DO TEGO CZASU ZOSTANIE CI ONA ODEBRANA."
        //
        //
        //                                                          // USER_NOT_REDUCER + was_activated == true              -   STAREJ ODZNAKI "NIE MA" W REDUCERZE,  ALE BYŁA WCZEŚNIEJ AKTYWOWANA, I JEST "NEED_IMPROVMENT"/"AWAITING"                                                               -> NORMAL MODAL      -> SAM TYTUŁ  "JUŻ PRÓBOWAŁEŚ AKTYWOWAC TA ODZNAKE, LECZ NA CHWILE OBECNA PRZECHODZI WERYFIKACJE."
        //                                                          // USER_NOT_REDUCER + was_activated == false             -   STAREJ ODZNAKI "NIE MA" W RECUDERZE,  NIE BYŁA WCZEŚNIEJ AKTYWOWANA, I JEST "NEED_IMPROVMENT"/"AWAITING"                                                               -> NORMAL MODAL      -> SAM TYTUŁ  "PRÓBUJESZ AKTYWOWAC ODZNAKE, KTÓRA NA CHWILE OBECNA PRZECHODZI PRZEZ WERYFIKACJE"
        //
        //
        //                                                          // ADMIN_NOT_REDUCER                         -   STAREJ ODZNAKI "NIE MA" W REDUCERZE                                                                                                                                    -> TRZEBA DODAĆ      -> NOWA ODZNAKA
        //                                                          // ADMIN_IN_REDUCER                          -   STARA ODZNAKA   "JEST"  W REDUCERZE  "NEED_IMPROVMENT"/"AWAITING"/"ZWERYFIKOWANA", KTÓRA PODCZAS PRZEGLĄDANIA ZOSTAŁA ZMIENIONA NA "NEED_IMPROVMENT"/"AWAITING"        -> TRZEBA ZMIENIC    -> STARA ODZNAKA I NOWA ODZNAKA  (DO POKAZANIA ROZNIC *** BRAC POD UWAGE STARY STATUS PRZY TYTULE "STARA ODZNAKA KTÓRA BYŁA....")
        //                                                          // NORMAL_IN_REDUCER                         -   STARA ODZNAKA   "JEST"  W REDUCERZE  "NEED_IMPROVMENT"  I JEST "NEED_IMPROVMENT"  LUB   "AWAITING" I JEST "AWAITING"                                                   -> NORMAL MODAL      -> NOWA ODZNAKA

        if (action.data?.name == undefined) {
          //                                            TRYB DLA USERA BO DOSTAJE TYLKO "id", "verificated" i "title_event"
          if (old_badge !== undefined) {
            //                                          USER_IN_REDUCER
            modal_option_frontend = {
              mode: "user_in_reducer",
              old_badge: old_badge,
            };

            filtered_badge_activate_notvalid =
              filtered_badge_activate_notvalid.filter(
                (obj) => obj.id !== action.data.id
              );
          } else {
            //                                         USER_NOT_REDUCER
            modal_option_frontend = {
              mode: "user_not_reducer",
              was_activated: action.was_activated,
            };
          }
        } else {
          if (old_badge == undefined) {
            //                                         ADMIN_NOT_REDUCER

            modal_option_frontend = { mode: "admin_not_reducer" };

            filtered_badge_activate_notvalid = [
              action.data,
              ...filtered_badge_activate_notvalid,
            ];
          } else if (old_badge.verificated !== action.data.verificated) {
            //                                        ADMIN_IN_REDUCER

            modal_option_frontend = {
              mode: "admin_in_reducer",
              old_badge: old_badge,
            };
            old_badge_reference.verificated = action.data.verificated;
            old_badge_reference.verificated_details =
              action.data.verificated_details;
            old_badge_reference.name = action.data.name;
            old_badge_reference.image = action.data.image;
          } else {
            //                                        NORMAL_IN_REDUCER

            if (
              old_badge.name == action.data.name &&
              old_badge.image == action.data.image
            ) {
              modal_option_frontend = {
                mode: "normal_in_reducer",
                detected_change: false,
                old_badge: null,
              };
            } else {
              modal_option_frontend = {
                mode: "normal_in_reducer",
                detected_change: true,
                old_badge: old_badge,
              };

              old_badge_reference.name = action.data.name;
              old_badge_reference.image = action.data.image;
            }
          }
        }
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_activate",
          code: action.code,
        },
        user_badges: {
          ...state.user_badges,
          activated_badges: filtered_badge_activate_notvalid,
          not_valid_code_badge: {
            badge: response_badge,
            modal_option_frontend: modal_option_frontend,
          },
          used_codes: [...state.user_badges.used_codes, action.code_activation],
        },
      };
    case BADGE_ACTIVATE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_activate",
          code: action.code,
        },
        user_badges: {
          ...state.user_badges,
          used_codes: [...state.user_badges.used_codes, action.code_activation],
        },
      };

    case BADGE_REPORT_SUCCESS:
      let badge_new_report = state.user_badges.activated_badges.find(
        (obj) => obj.id == action.id_badge
      );
      badge_new_report.my_report = action.my_report;
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_report",
          code: action.code,
        },
      };
    case BADGE_REPORT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_report",
          code: action.code,
        },
      };

    case BADGE_IS_NOT_VERIFICATED:
      if (action.is_admin) {
        let badge_changed_verification =
          state.user_badges.activated_badges.find(
            (obj) => obj.id == action.id_badge
          );

        badge_changed_verification.verificated = action.status.status;
        badge_changed_verification.verificated_details = action.status.details;

        return {
          ...state,
          handler: {
            success: "Inny stan wydarzenia",
            error: "",
            type: "badge_is_not_verificated",
            code: "1398",
          },
        };
      } else {
        let filtered_badge_changed_delete = state.user_badges.activated_badges;

        filtered_badge_changed_delete = filtered_badge_changed_delete.filter(
          (badge) => badge.id !== action.id_badge
        );

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "badge_is_not_verificated",
            code: action.code,
          },
          user_badges: {
            ...state.user_badges,
            activated_badges: filtered_badge_changed_delete,
            catch_another_verification: action.id_badge,
          },
        };
      }

    case BADGE_IS_DELETED:
      let filtered_badge_is_deleted = state.user_badges.activated_badges;

      filtered_badge_is_deleted = filtered_badge_is_deleted.filter(
        (badge) => badge.id !== action.id_badge
      );

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_is_deleted",
          code: action.code,
        },
        user_badges: {
          ...state.user_badges,
          activated_badges: filtered_badge_is_deleted,
          catch_badge_deleted: action.id_badge,
        },
      };

    case USER_VALIDATORS_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "user_validators",
          code: action.code,
        },
        settings: {
          ...state.settings,
          ip_validators: action.ip_validators,
        },
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },

        find_friends: null,
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        events_random: null,
        events_via_calendar: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        events_list: {
          data: null,
          meta: null,
        },

        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },
        events_via_tickets: null,

        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
      };

    case USER_VALIDATORS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "user_validators",
          code: action.code,
        },
      };

    case USER_BLOCKED_USERS_SUCCESS:
      let blocked_users_status = action.blocked_users.map((user) => ({
        ...user,
        status: "blocked",
      }));

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "user_blocked_users",
          code: action.code,
        },
        settings: {
          ...state.settings,
          blocked_users: blocked_users_status,
        },
      };

    case USER_BLOCKED_USERS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "user_blocked_users",
          code: action.code,
        },
      };

    case LOGOUT_FROM_DEVICES_SUCCESS:
      let filtered_devices = state.settings.ip_validators;

      filtered_devices.other = filtered_devices.other.filter(
        (device) => !action.devices_id_list.includes(device.id)
      );

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "logout_from_devices",
          code: action.code,
        },
        settings: {
          ...state.settings,
          ip_validators: filtered_devices,
        },
      };

    case LOGOUT_FROM_DEVICES_NOTVALID_SUCCESS:
      let filtered_devices_notvalid = state.settings.ip_validators;

      filtered_devices_notvalid.other = filtered_devices_notvalid.other.filter(
        (device) => !action.missing_ids.includes(device.id)
      );

      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "logout_from_devices_notvalid",
          code: action.code,
        },
        settings: {
          ...state.settings,
          ip_validators: filtered_devices_notvalid,
        },
      };

    case LOGOUT_FROM_DEVICES_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "logout_from_devices",
          code: action.code,
        },
      };

    case BLOCK_USER_SUCCESS:
      let friends_count = state.user.data.friends_count;

      let friendslist_strange = state.user.data.friendslist_strange;
      if (state.user.data.is_friend == "a) True") {
        friends_count -= 1;
        friendslist_strange = friendslist_strange.filter(
          (user) => user.id !== action.request_user_id
        );
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "block_user",
          code: action.code,
        },
        user: {
          ...state.user,
          data: {
            ...state.user.data,
            is_friend: "Blocked",
            friends_count: friends_count,
            friendslist_strange: friendslist_strange,
          },
        },
      };

    case BLOCK_USER_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "block_user",
          code: action.code,
        },
      };

    case UNBLOCK_USER_SUCCESS:
      if (state.user.data !== null) {
        let new_status;
        if (action.target_blocked_user == true) {
          new_status = "a) Get_block";
        } else {
          new_status = "d) False";
        }

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "unblock_user",
            code: action.code,
          },
          user: {
            ...state.user,
            data: {
              ...state.user.data,
              is_friend: new_status,
            },
          },
        };
      } else {
        let filtered_unblock_user = state.settings.blocked_users;

        if (action.target_blocked_user == true) {
          // TUTAJ TRZEBA ZMIENIC BO JAK JAKO ADMIN ZMIENIAM TO POWINNO ZOSTAC Z INFORMACJA ZE TO ON MNIE ZABLOKOWAL
          if (action.is_admin == false) {
            filtered_unblock_user = filtered_unblock_user.filter(
              (user) => user.id !== action.id_target
            );
          } else {
            let unblockedUserBlockedUs = filtered_unblock_user.find(
              (user) => user.id == action.id_target
            );

            unblockedUserBlockedUs.status = "get_block";
          }
        } else {
          let userToUnblock = filtered_unblock_user.find(
            (user) => user.id == action.id_target
          );

          userToUnblock.status = "unblocked";
        }

        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "unblock_user",
            code: action.code,
          },
          settings: {
            ...state.settings,
            blocked_users: filtered_unblock_user,
          },
        };
      }

    case UNBLOCK_USER_NOTVALID_SUCCESS:
      if (state.settings !== null) {
        let filtered_unblock_user_notvalid = state.settings.blocked_users;

        filtered_unblock_user_notvalid = filtered_unblock_user_notvalid.filter(
          (user) => user.id !== action.id_target
        );

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "unblock_user_notvalid",
            code: action.code,
          },
          settings: {
            ...state.settings,
            blocked_users: filtered_unblock_user_notvalid,
          },
        };
      } else if (state.user.data !== null) {
        // TRZEBA ZWROCIC INFO CZY JESTESMY ZNAJOMYMI A JESLI TAK, TO SPRAWDZIC CZY ISTNIEJE U NIEGO NA LISCIE BO JESLI NIE TO TRZEBA WPROWADZIC LOGIKE DODAWANIA MOJEGO PROFILU

        let change_state_is_friend = state.user;

        change_state_is_friend.data.is_friend = action.is_friend.status;

        if (action.is_friend.status == "a) True") {
          change_state_is_friend.data.friends_count += 1;

          if (change_state_is_friend.data.friendslist_strange.length == 0) {
            change_state_is_friend.data.friendslist_strange = [
              { ...action.is_friend.self_user },
            ];
          } else {
            change_state_is_friend.data.friendslist_strange = [
              { ...action.is_friend.self_user },
              ...change_state_is_friend.data.friendslist_strange,
            ];
          }
        }

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "unblock_user_notvalid",
            code: action.code,
          },
          user: change_state_is_friend,
        };
      }

    case UNBLOCK_USER_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "unblock_user",
          code: action.code,
        },
      };

    case PASSWORD_CHANGE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "password_change",
          code: action.code,
        },
        settings: {
          ...state.settings,
          is: {
            ...state.settings.is,
            password_match: true,
          },
        },
      };

    case PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "password_change",
          code: action.code,
        },
      };

    case PASSWORD_CHANGE_CONFIRM_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "password_change_confirm",
          code: action.code,
        },
        settings: {
          ...state.settings,
          is: {
            ...state.settings.is,
            password_match: false,
          },
        },
      };

    case PASSWORD_CHANGE_CONFIRM_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "password_change_confirm",
          code: action.code,
        },
      };

    case EMAIL_CHANGE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "email_change",
          code: action.code,
        },
        settings: {
          ...state.settings,
          is: {
            ...state.settings.is,
            new_email: true,
          },
        },
      };

    case EMAIL_CHANGE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "email_change",
          code: action.code,
        },
      };

    case EMAIL_CHANGE_CONFIRM_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "email_change_confirm",
          code: action.code,
        },
        settings: {
          ...state.settings,
          is: {
            ...state.settings.is,
            new_email: false,
          },
        },
      };

    case EMAIL_CHANGE_CONFIRM_NOTVALID_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "email_change_confirm_notvalid",
          code: action.code,
        },
        settings: {
          ...state.settings,
          is: {
            ...state.settings.is,
            new_email: false,
          },
        },
      };

    case EMAIL_CHANGE_CONFIRM_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "email_change_confirm",
          code: action.code,
        },
      };

    case GENERATE_NEWCODE_EMAIL_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "generate_newcode_email",
          code: action.code,
        },
      };

    case GENERATE_NEWCODE_EMAIL_NOTVALID_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "generate_newcode_email_notvalid",
          code: action.code,
        },
        settings: {
          ...state.settings,
          is: {
            ...state.settings.is,
            new_email: false,
          },
        },
      };

    case GENERATE_NEWCODE_EMAIL_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "generate_newcode_email",
          code: action.code,
        },
      };

    case BADGE_SETTINGS_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_settings",
          code: action.code,
        },
        settings: {
          ...state.settings,
          badges: action.badges,
        },
      };

    case BADGE_SETTINGS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_settings",
          code: action.code,
        },
      };

    case BADGE_SET_MAIN_SUCCESS:
      let filtered_badges_set_main = state.settings.badges;

      let badgesMainToFalse = filtered_badges_set_main.find(
        (badge) => badge.main == true
      );

      if (badgesMainToFalse) {
        badgesMainToFalse.main = false;
      }

      let badgesMainToTrue = filtered_badges_set_main.find(
        (badge) => badge.id == action.badge_id
      );

      badgesMainToTrue.main = true;

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_set_main",
          code: action.code,
        },
        settings: {
          ...state.settings,
          badges: filtered_badges_set_main,
        },
      };

    case BADGE_SET_MAIN_NOTVALID_SUCCESS:
      // PRZYPADEK GDY CHCEMY USTAWIĆ GŁÓWNĄ ODZNAKĘ, KTÓRA WŁAŚNIE ZOSTAŁA USUNIĘTA LUB JEJ STAN ZOSTAŁ ZMIENIONY NA "NIEZWERYFIKOWANA"

      let filtered_badges_notvalid = state.settings.badges;

      filtered_badges_notvalid = filtered_badges_notvalid.filter(
        (badge) => badge.id !== action.badge_id
      );

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "badge_set_main_notvalid",
          code: action.code,
        },
        settings: {
          ...state.settings,
          badges: filtered_badges_notvalid,
        },
      };

    case BADGE_SET_MAIN_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "badge_set_main",
          code: action.code,
        },
      };

    case EVENT_IS_DELETED:
      if (state.event.data !== null) {
        return {
          ...state,
          handler: {
            success: action.error,
            error: "",
            type: "event_is_deleted",
            code: action.code,
          },
          event: {
            ...state.event,
            is_deleted: true,
          },
        };
      } else {
        let temp_filtred_events_random_reaction_deleted =
          state.events_random.filter((obj) => obj.id !== action.id);
        let filtred_events_random_reaction_deleted;
        // GDY DAJEMY OSTATNIE VOTE POBRANEMU EVENTOWI TO USTAW NA "EMPTY" DLA ODPOWIEDNIEGO TEMPLATE
        if (temp_filtred_events_random_reaction_deleted.length == 0) {
          filtred_events_random_reaction_deleted = "empty";
        } else {
          filtred_events_random_reaction_deleted =
            temp_filtred_events_random_reaction_deleted;
        }

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "events_random_reaction_deleted",
            code: action.code,
          },
          events_random: filtred_events_random_reaction_deleted,
        };
      }

    case EVENT_IS_REJECTED:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_edit_rejected",
          code: action.code,
        },
        event: {
          ...state.event,
          is_rejected: {
            slug: action.slug,
            uuid: action.uuid,
          },
        },
      };

    case EVENT_IS_NOT_VERIFICATED:
      if (state.event.data !== null) {
        if (action.is_admin == true || action.is_admin == "organizator") {
          let response_code;
          if (action.is_admin == true) {
            response_code = "1399";
          } else {
            response_code = "1397";
          }
          return {
            ...state,
            handler: {
              success: "Inny stan wydarzenia",
              error: "",
              type: "event_is_not_verificated",
              code: response_code,
            },
            event: {
              ...state.event,
              data: {
                ...state.event.data,
                verificated: action.status.status,
                verificated_details: action.status.details,
              },
            },
          };
        } else {
          return {
            ...state,
            handler: {
              success: "",
              error: action.error,
              type: "event_is_not_verificated",
              code: action.code,
            },
            event: {
              ...state.event,
              is_not_verificated: true,
            },
          };
        }
      } else {
        let temp_filtred_events_random_reaction_not_verificated =
          state.events_random.filter((obj) => obj.id !== action.id);
        let filtred_events_random_reaction_not_verificated;
        // GDY DAJEMY OSTATNIE VOTE POBRANEMU EVENTOWI TO USTAW NA "EMPTY" DLA ODPOWIEDNIEGO TEMPLATE
        if (temp_filtred_events_random_reaction_not_verificated.length == 0) {
          filtred_events_random_reaction_not_verificated = "empty";
        } else {
          filtred_events_random_reaction_not_verificated =
            temp_filtred_events_random_reaction_not_verificated;
        }

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "events_random_reaction_not_verificated",
            code: action.code,
          },
          events_random: filtred_events_random_reaction_not_verificated,
        };
      }

    case DATA_RESET:
      return {
        ...state,
        settings: null,
        user_badges: {
          created_badges: null,
          activated_badges: null,
          new_badge: null,
          not_valid_code_badge: {
            badge: null,
            modal_option_frontend: null,
          },
          used_codes: null,
        },

        find_friends: null,
        events_map: {
          province: null,
          county: null,
        },
        event_tickets: null,
        events_random: null,
        events_via_calendar: null,
        events_homescreen: {
          data: null,
          meta: null,
        },
        events_list: {
          data: null,
          meta: null,
        },

        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        events_via_badges: {
          events: null,
          alphabet_list: null,
          badge_codes_locked: {
            locked: null,
            used: null,
            append: null,
          },
          badge_codes_deleted: {
            list_ids: null,
            deleted: null,
            used: null,
          },
          is: null,
        },
        events_via_tickets: null,
        events_via_series: {
          events_no_series: null,
          events_with_series: null,
          alphabet_list: null,
        },

        user: {
          data: null,
          events: {
            data: null,
            meta: null,
            value_not_found: null,
          },
          not_valid_request_action: null,
        },
        series: null,
      };

    case EVENT_TICKETS_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "event_tickets",
          code: action.code,
        },
        event_tickets: action.data,
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
      };

    case EVENT_TICKETS_NOTVALID_SUCCESS:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_tickets",
          code: action.code,
        },
        event: {
          data: null,
          comments: {
            data: null,
            meta: null,
          },
          participants: null,
          is_rejected: null,
        },
        event_tickets: {
          is: {
            redirect: action.redirect,
          },
        },
      };

    case EVENT_TICKETS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_tickets",
          code: action.code,
        },
      };

    case BANK_NUMBER_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "bank_number",
          code: action.code,
        },
        settings: {
          ...state.settings,
          ...action.data,
        },
      };

    case BANK_NUMBER_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "bank_number",
          code: action.code,
        },
      };

    case BANK_NUMBER_CHANGE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "bank_number_change",
          code: action.code,
        },
        settings: {
          ...state.settings,
          is: {
            ...state.settings.is,
            bank_number_password_match: true,
          },
        },
      };

    case BANK_NUMBER_CHANGE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "bank_number_change",
          code: action.code,
        },
      };

    case EMAIL_CHANGE_CONFIRM_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "email_change_confirm",
          code: action.code,
        },
        settings: {
          ...state.settings,
          is: {
            ...state.settings.is,
            new_email: false,
          },
        },
      };

    case BANK_NUMBER_CHANGE_CONFIRM_SUCCESS:
      let new_bank;
      if (action.status_connect) {
        new_bank = action.bank_number;
      } else {
        new_bank = "";
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "bank_number_change_confirm",
          code: action.code,
        },
        settings: {
          ...state.settings,
          bank_number: new_bank,
          is: {
            ...state.settings.is,
            bank_number_password_match: false,
          },
        },
      };

    case BANK_NUMBER_CHANGE_CONFIRM_NOTVALID_SUCCESS:
      if (action.mode == "change") {
        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "bank_number_change_confirm_notvalid",
            code: action.code,
          },
          settings: {
            ...state.settings,
            blocked_change_bank_account: true,
          },
        };
      } else {
        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "bank_number_change_confirm_notvalid",
            code: action.code,
          },
          settings: {
            ...state.settings,
            blocked_remove_bank_account: action.blocked_remove_bank_account,
          },
        };
      }

    case BANK_NUMBER_CHANGE_CONFIRM_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "bank_number_change_confirm",
          code: action.code,
        },
      };

    case EVENT_VIA_TICKETS_SUCCESS:
      if (action.mode == "start") {
        return {
          ...state,
          handler: {
            success: action.success,
            error: "",
            type: "event_via_tickets",
            code: action.code,
          },
          events_via_tickets: {
            created:
              action.data?.created == undefined
                ? {
                    data: [],
                    meta: {},
                  }
                : {
                    data: action.data.created.data,
                    meta: {
                      links: {
                        ...action.data.created.meta.links,
                        first: action.data.created.meta.links.next,
                      },
                    },
                  },
            bought: {
              data: action.data.bought.data,
              meta: {
                links: {
                  ...action.data.bought.meta.links,
                  first: action.data.bought.meta.links.next,
                },
              },
            },
          },
          user: {
            data: null,
            events: {
              data: null,
              meta: null,
              value_not_found: null,
            },
            not_valid_request_action: null,
          },
          events_homescreen: {
            data: null,
            meta: null,
          },
          events_via_badges: {
            events: null,
            alphabet_list: null,
            badge_codes_locked: {
              locked: null,
              used: null,
              append: null,
            },
            badge_codes_deleted: {
              list_ids: null,
              deleted: null,
              used: null,
            },
            is: null,
          },
          events_via_series: {
            events_no_series: null,
            events_with_series: null,
            alphabet_list: null,
          },
          settings: null,
          user_badges: {
            created_badges: null,
            activated_badges: null,
            new_badge: null,
            not_valid_code_badge: {
              badge: null,
              modal_option_frontend: null,
            },
            used_codes: null,
          },
          events_map: {
            province: null,
            county: null,
          },
          event_tickets: null,
          find_friends: null,
          events_via_calendar: null,
          events_random: null,
          event: {
            data: null,
            comments: {
              data: null,
              meta: null,
            },
            participants: null,
            is_rejected: null,
          },
          series: null,
        };
      } else {
        let temp_calendar = state.events_via_tickets.calendar;
        let another_category;

        if (action.mode == "bought") {
          another_category = "created";
          if (temp_calendar.data.length > 6) {
            temp_calendar.data = temp_calendar.data.slice(0, 6);
            temp_calendar.meta.links.next = temp_calendar.meta.links.first;
          }
        } else {
          another_category = "bought";
        }

        let state_another_category = state.events_via_tickets[another_category];

        if (state_another_category.data.length > 6) {
          state_another_category.data = state_another_category.data.slice(0, 6);
          state_another_category.meta.links.next =
            state_another_category.meta.links.first;
        }

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "event_via_tickets_next",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            [action.mode]: {
              data: [
                ...state.events_via_tickets[action.mode].data,
                ...action.data[action.mode].data,
              ],
              meta: {
                links: {
                  ...state.events_via_tickets[action.mode].meta.links,
                  ...action.data[action.mode].meta.links,
                },
              },
            },
            [another_category]: state_another_category,
            calendar: temp_calendar,
          },
        };
      }

    case EVENT_VIA_TICKETS_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "event_via_tickets",
          code: action.code,
        },
      };

    case TICKET_CREATE_SUCCESS:
      const { new_price, ticket_type, ticket_details, quantity } = action.input;
      let created_ticket = state.events_via_tickets.created.data;
      let flt_price = parseFloat(new_price);

      /////////////////////////////////////////////
      // ZMIANA STANU STAREJ NAJNOWSZEGO AKTUALIZACJI BILETU

      for (let i = 0; i < created_ticket.length; i++) {
        let old_new_ticket = created_ticket[i].tickets.find(
          (ticket) => ticket.new == true
        );
        if (old_new_ticket) {
          old_new_ticket.new = false;
          break;
        }
      }

      /////////////////////////////////////////////
      // ZNALEZIENIE INTERESUJACEGO EVENTU

      let event_new_ticket = created_ticket.find(
        (event) => event.id == action.event_id
      );

      // ZNALEZIENIE INDEXU

      let index_new_ticket = event_new_ticket.tickets.findIndex(
        (obj) => obj.price < flt_price
      );

      if (index_new_ticket === -1) {
        index_new_ticket = event_new_ticket.tickets.length;
      }

      /////////////////////////////////////////////////
      // DODANIE NOWEGO BILETU DO EVENTU
      event_new_ticket.tickets.splice(index_new_ticket, 0, {
        id: action.ticket_id,
        price: flt_price,
        default_price: flt_price,
        new_price: flt_price,
        was_allowed: false,
        quantity: parseInt(quantity),
        reserved_tickets: 0,
        stripe_id: "",
        ticket_type: ticket_type,
        verificated: "awaiting",
        ticket_details: ticket_details,
        verificated_details: "",
        edit_time: action.edit_time + "+01:00",
        new: true,
      });

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_create",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          created: {
            ...state.events_via_tickets.created,
            data: created_ticket,
          },
          is: {
            type: "new_ticket",
            event_id: action.event_id,
            timestamp: action.timestamp,
          },
        },
      };

    case TICKET_CREATE_NOTVALID_SUCCESS:
      if (action.bank_problem) {
        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_create",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: null,
          },
        };
      } else if (action.event_problem) {
        let created_ticket_notvalid = state.events_via_tickets.created.data;

        created_ticket_notvalid = created_ticket_notvalid.filter(
          (event) => event.id !== action.event_id
        );

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_create",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_notvalid,
            },
          },
        };
      } else if (action.event_late) {
        let created_ticket_event_late = state.events_via_tickets.created.data;

        let event_late_ticket = created_ticket_event_late.find(
          (event) => event.id == action.event_id
        );

        event_late_ticket.current = false;

        event_late_ticket.tickets = event_late_ticket.tickets.filter(
          (ticket) => ticket.verificated == "verificated"
        );

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_create",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_event_late,
            },
          },
        };
      }

    case TICKET_CREATE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_create",
          code: action.code,
        },
      };

    case WEBSOCKETS_TICKET_CHANGE_STATUS_SUCCESS:
      let websocket_ticket_change = state.events_via_tickets?.created.data;

      if (websocket_ticket_change !== undefined) {
        let live_change_status_ticket_event = websocket_ticket_change.find(
          (event) => event.id == action.event_id
        );

        if (live_change_status_ticket_event) {
          let live_change_status_ticket =
            live_change_status_ticket_event.tickets.find(
              (ticket) => ticket.id == action.ticket_id
            );

          if (live_change_status_ticket) {
            live_change_status_ticket.verificated = action.verificated;
            live_change_status_ticket.verificated_details =
              action.verificated_details;
            live_change_status_ticket.was_allowed = action.was_allowed;
            live_change_status_ticket.default_price = parseFloat(
              action.default_price
            );
            live_change_status_ticket.price = parseFloat(action.price);
            live_change_status_ticket.new_price = parseFloat(action.new_price);

            const now = new Date();
            const timestamp = Math.floor(now.getTime() / 1000);

            return {
              ...state,
              handler: {
                success: "Twój bilet właśnie został oceniony",
                error: "",
                type: "websocket_ticket_change_status",
                code: "2160",
              },
              events_via_tickets: {
                ...state.events_via_tickets,
                created: {
                  ...state.events_via_tickets.created,
                  data: websocket_ticket_change,
                },
                is: {
                  type: "edit_ticket",
                  timestamp: timestamp,
                },
              },
            };
          }
        }
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "websocket_ticket_change_status",
          code: action.code,
        },
      };

    case TICKET_EDIT_SUCCESS:
      let created_ticket_edit = state.events_via_tickets.created.data;
      let flt_price_edit = parseFloat(action.input.new_price);

      for (let i = 0; i < created_ticket_edit.length; i++) {
        let old_new_ticket_edit = created_ticket_edit[i].tickets.find(
          (ticket) => ticket.new == true
        );
        if (old_new_ticket_edit) {
          old_new_ticket_edit.new = false;
          break;
        }
      }

      let event_ticket_edit = created_ticket_edit.find(
        (event) => event.id == action.event_id
      );

      let old_ticket = event_ticket_edit.tickets.find(
        (ticket) => ticket.id == action.ticket_id
      );

      let filtered_tickets_list = event_ticket_edit.tickets.filter(
        (ticket) => ticket.id !== action.ticket_id
      );

      let index_ticket_edit = filtered_tickets_list.findIndex(
        (obj) => obj.price < flt_price_edit
      );

      if (index_ticket_edit === -1) {
        index_ticket_edit = filtered_tickets_list.length;
      }

      let new_status_ticket;

      if (old_ticket.was_allowed && old_ticket.price == flt_price_edit) {
        new_status_ticket = "verificated";
      } else {
        new_status_ticket = "awaiting";
      }

      filtered_tickets_list.splice(index_ticket_edit, 0, {
        id: action.ticket_id,
        default_price: old_ticket.was_allowed
          ? old_ticket.default_price
          : flt_price_edit,
        price: old_ticket.was_allowed ? old_ticket.price : flt_price_edit,
        new_price: flt_price_edit,
        was_allowed: old_ticket.was_allowed,
        quantity: parseInt(action.input.quantity),
        reserved_tickets: old_ticket.reserved_tickets,
        stripe_id: old_ticket.stripe_id,
        ticket_type: action.input.ticket_type,
        verificated: new_status_ticket,
        ticket_details: action.input.ticket_details,
        verificated_details: old_ticket.verificated_details,
        edit_time: action.edit_time + "+01:00",
        new: true,
      });

      event_ticket_edit.tickets = filtered_tickets_list;

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_edit",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          created: {
            ...state.events_via_tickets.created,
            data: created_ticket_edit,
          },
          is: {
            type: "edit_ticket",
            timestamp: action.timestamp,
          },
        },
      };

    case TICKET_EDIT_NOTVALID_SUCCESS:
      if (action.bank_problem) {
        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_edit",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: null,
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      } else if (action.event_problem) {
        let created_ticket_edit_event_notvalid =
          state.events_via_tickets.created.data;

        created_ticket_edit_event_notvalid =
          created_ticket_edit_event_notvalid.filter(
            (event) => event.id !== action.event_id
          );

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_edit",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_edit_event_notvalid,
            },
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      } else if (action.ticket_problem) {
        let created_ticket_edit_ticket_notvalid =
          state.events_via_tickets.created.data;

        let found_error_ticket_in_event =
          created_ticket_edit_ticket_notvalid.find(
            (event) => event.id == action.event_id
          );

        found_error_ticket_in_event.tickets =
          found_error_ticket_in_event.tickets.filter(
            (ticket) => ticket.id !== action.ticket_id
          );

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_edit",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_edit_ticket_notvalid,
            },
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      } else if (action.verification_problem) {
        let created_ticket_edit_verificated_notvalid =
          state.events_via_tickets.created.data;

        for (
          let i = 0;
          i < created_ticket_edit_verificated_notvalid.length;
          i++
        ) {
          let old_new_ticket_validation =
            created_ticket_edit_verificated_notvalid[i].tickets.find(
              (ticket) => ticket.new == true
            );
          if (old_new_ticket_validation) {
            old_new_ticket_validation.new = false;
            break;
          }
        }

        let found_error_verificated_in_ticket =
          created_ticket_edit_verificated_notvalid.find(
            (event) => event.id == action.event_id
          );

        let ticket_verificated = found_error_verificated_in_ticket.tickets.find(
          (ticket) => ticket.id == action.ticket_id
        );

        if (action.data.was_allowed == true) {
          ticket_verificated.was_allowed = true;
        }

        ticket_verificated.verificated = action.data.verificated;
        ticket_verificated.verificated_details =
          action.data.verificated_details;
        ticket_verificated.stripe_id = action.data.stripe_id;
        ticket_verificated.ticket_type = action.data.ticket_type;
        ticket_verificated.ticket_details = action.data.ticket_details;
        ticket_verificated.default_price = parseFloat(
          action.data.default_price
        );
        ticket_verificated.price = parseFloat(action.data.price);
        ticket_verificated.new_price = parseFloat(action.data.new_price);
        ticket_verificated.quantity = parseInt(action.data.quantity);
        ticket_verificated.edit_time = action.data.edit_time + "+01:00";
        ticket_verificated.new = true;

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_edit",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_edit_verificated_notvalid,
            },
            is: {
              type: "verification_ticket",
              timestamp: action.timestamp,
              verificated: action.data.verificated,
              verificated_details: action.data.verificated_details,
              stripe_id: action.data.stripe_id,
              was_allowed: action.data.was_allowed,
              ticket_type: action.data.ticket_type,
              ticket_details: action.data.ticket_details,
              default_price: action.data.default_price,
              price: action.data.price,
              new_price: action.data.new_price,
              quantity: action.data.quantity,
              edit_time: action.data.edit_time + "+01:00",
            },
          },
        };
      } else if (action.event_late) {
        let created_ticket_event_late_notvalid =
          state.events_via_tickets.created.data;

        let event_late_ticket_notvalid =
          created_ticket_event_late_notvalid.find(
            (event) => event.id == action.event_id
          );

        event_late_ticket_notvalid.current = false;

        event_late_ticket_notvalid.tickets =
          event_late_ticket_notvalid.tickets.filter(
            (ticket) => ticket.reserved_tickets > 0
          );

        if (event_late_ticket_notvalid.tickets.length == 0) {
          event_late_ticket_notvalid = event_late_ticket_notvalid.filter(
            (event) => event.id !== action.event_id
          );
        }

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_edit",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_event_late_notvalid,
            },
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      } else if (action.too_much_tickets) {
        let created_ticket_event_too_much_notvalid =
          state.events_via_tickets.created.data;

        for (
          let i = 0;
          i < created_ticket_event_too_much_notvalid.length;
          i++
        ) {
          let old_new_ticket_validation_too_much =
            created_ticket_event_too_much_notvalid[i].tickets.find(
              (ticket) => ticket.new == true
            );
          if (old_new_ticket_validation_too_much) {
            old_new_ticket_validation_too_much.new = false;
            break;
          }
        }

        let found_error_too_much_in_ticket =
          created_ticket_event_too_much_notvalid.find(
            (event) => event.id == action.event_id
          );

        let ticket_too_much = found_error_too_much_in_ticket.tickets.find(
          (ticket) => ticket.id == action.ticket_id
        );

        ticket_too_much.reserverd_tickets = action.reserverd_tickets;
        ticket_too_much.new = true;

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_edit",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_event_too_much_notvalid,
            },
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      }

    case TICKET_EDIT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_edit",
          code: action.code,
        },
      };

    case TICKET_DELETE_SUCCESS:
      let deleted_ticket = state.events_via_tickets.created.data;

      let event_delete_ticket = deleted_ticket.find(
        (event) => event.id == action.event_id
      );

      event_delete_ticket.tickets = event_delete_ticket.tickets.filter(
        (ticket) => ticket.id !== action.ticket_id
      );

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_delete",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          created: {
            ...state.events_via_tickets.created,
            data: deleted_ticket,
          },
          is: {
            type: "edit_ticket",
            timestamp: action.timestamp,
          },
        },
      };

    case TICKET_DELETE_NOTVALID_SUCCESS:
      if (action.bank_problem) {
        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_delete",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: null,
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      } else if (action.event_problem) {
        let created_ticket_delete_event_notvalid =
          state.events_via_tickets.created.data;

        created_ticket_delete_event_notvalid =
          created_ticket_delete_event_notvalid.filter(
            (event) => event.id !== action.event_id
          );

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_delete",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_delete_event_notvalid,
            },
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      } else if (action.ticket_problem) {
        let created_ticket_delete_ticket_notvalid =
          state.events_via_tickets.created.data;

        let found_error_delete_ticket_in_event =
          created_ticket_delete_ticket_notvalid.find(
            (event) => event.id == action.event_id
          );

        found_error_delete_ticket_in_event.tickets =
          found_error_delete_ticket_in_event.tickets.filter(
            (ticket) => ticket.id !== action.ticket_id
          );

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_delete",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_delete_ticket_notvalid,
            },
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      } else if (action.verification_problem) {
        let created_ticket_delete_verificated_notvalid =
          state.events_via_tickets.created.data;

        for (
          let i = 0;
          i < created_ticket_delete_verificated_notvalid.length;
          i++
        ) {
          let old_new_ticket_validation_delete =
            created_ticket_delete_verificated_notvalid[i].tickets.find(
              (ticket) => ticket.new == true
            );
          if (old_new_ticket_validation_delete) {
            old_new_ticket_validation_delete.new = false;
            break;
          }
        }

        let found_error_verificated_in_ticket_delete =
          created_ticket_delete_verificated_notvalid.find(
            (event) => event.id == action.event_id
          );

        let ticket_verificated =
          found_error_verificated_in_ticket_delete.tickets.find(
            (ticket) => ticket.id == action.ticket_id
          );

        ticket_verificated.verificated = action.data.verificated;
        ticket_verificated.verificated_details =
          action.data.verificated_details;
        ticket_verificated.stripe_id = action.data.stripe_id;
        ticket_verificated.ticket_type = action.data.ticket_type;
        ticket_verificated.ticket_details = action.data.ticket_details;
        ticket_verificated.default_price = parseFloat(
          action.data.default_price
        );
        ticket_verificated.price = parseFloat(action.data.price);
        ticket_verificated.new_price = parseFloat(action.data.new_price);
        ticket_verificated.quantity = parseInt(action.data.quantity);
        ticket_verificated.edit_time = action.data.edit_time + "+01:00";
        ticket_verificated.was_allowed = true;
        ticket_verificated.new = true;

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_delete",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_delete_verificated_notvalid,
            },
            is: {
              type: "verification_ticket",
              timestamp: action.timestamp,

              verificated: action.data.verificated,
              verificated_details: action.data.verificated_details,
              stripe_id: action.data.stripe_id,
              was_allowed: action.data.was_allowed,
              ticket_type: action.data.ticket_type,
              ticket_details: action.data.ticket_details,
              default_price: action.data.default_price,
              price: action.data.price,
              new_price: action.data.new_price,
              quantity: action.data.quantity,
              edit_time: action.data.edit_time + "+01:00",
            },
          },
        };
      } else if (action.event_late) {
        let created_ticket_event_late_notvalid_delete =
          state.events_via_tickets.created.data;

        let event_late_ticket_notvalid_delete =
          created_ticket_event_late_notvalid_delete.find(
            (event) => event.id == action.event_id
          );

        event_late_ticket_notvalid_delete.current = false;

        event_late_ticket_notvalid_delete.tickets =
          event_late_ticket_notvalid_delete.tickets.filter(
            (ticket) => ticket.reserved_tickets > 0
          );

        if (event_late_ticket_notvalid_delete.tickets.length == 0) {
          event_late_ticket_notvalid_delete =
            event_late_ticket_notvalid_delete.filter(
              (event) => event.id !== action.event_id
            );
        }

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_delete",
            code: action.code,
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            created: {
              ...state.events_via_tickets.created,
              data: created_ticket_event_late_notvalid_delete,
            },
            is: {
              type: "edit_ticket",
              timestamp: action.timestamp,
            },
          },
        };
      }

    case TICKET_DELETE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_delete",
          code: action.code,
        },
      };

    case TICKET_PAY_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_pay",
          code: action.code,
        },
        event_tickets: {
          ...state.event_tickets,
          url_payment: action.url_payment,
        },
      };

    case TICKET_PAY_NOTVALID_SUCCESS:
      let missing_tickets_pay = state.event_tickets.tickets;
      if (action?.correct_tickets !== undefined) {
        missing_tickets_pay = missing_tickets_pay.filter((ticket) =>
          Object.keys(action.correct_tickets).includes(ticket.id.toString())
        );

        missing_tickets_pay.forEach((ticket_change_stripe) => {
          ticket_change_stripe.stripe_id =
            action.correct_tickets[ticket_change_stripe.id];
        });

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_pay",
            code: action.code,
          },
          event_tickets: {
            ...state.event_tickets,
            tickets: missing_tickets_pay,
            is: {
              correct_tickets: action.correct_tickets,
            },
          },
        };
      } else if (action?.error_tickets !== undefined) {
        let errors_array = action.error_tickets;

        Object.keys(errors_array).forEach((stripe_id) => {
          let ticket_change = missing_tickets_pay.find(
            (ticket) => ticket.stripe_id == stripe_id
          );

          if (errors_array[stripe_id].hasOwnProperty("new_price")) {
            ticket_change.price = errors_array[stripe_id].new_price.toString();
            ticket_change.update_price = true;
          }
          if (errors_array[stripe_id].hasOwnProperty("quantity")) {
            ticket_change.quantity = errors_array[stripe_id].quantity.quantity;
            ticket_change.reserved_tickets =
              errors_array[stripe_id].quantity.reserved_tickets;
          }
        });

        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_pay",
            code: action.code,
          },
          event_tickets: {
            ...state.event_tickets,
            tickets: missing_tickets_pay,
            is: {
              missing_data: errors_array,
            },
          },
        };
      } else {
        return {
          ...state,
          handler: {
            success: "",
            error: action.error,
            type: "ticket_pay",
            code: action.code,
          },
          event_tickets: {
            ...state.event_tickets,
            is: {
              redirect: action.redirect,
            },
          },
        };
      }

    case TICKET_PAY_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_pay",
          code: action.code,
        },
      };

    case TICKET_GENERATE_PDF_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_pay",
          code: action.code,
        },
      };

    case TICKET_GENERATE_PDF_NOTVALID_SUCCESS:
      let ticket_generate_pdf_error = state.events_via_tickets.bought.data;

      let find_order = ticket_generate_pdf_error.find(
        (order) => order.id == action.order_id
      );

      if (find_order) {
        let find_ticket_group = find_order.tickets.find(
          (ticket_group) => ticket_group.id == action.ticket_id
        );

        if (find_ticket_group) {
          if (action.ticket_missing) {
            find_ticket_group.details = find_ticket_group.details.filter(
              (ticket) => ticket.id !== action.orderedticket_id
            );

            if (find_ticket_group.details.length == 0) {
              find_order.tickets = find_order.tickets.filter(
                (ticket_type_remove) =>
                  ticket_type_remove.id !== action.ticket_id
              );

              if (find_order.tickets.length == 0) {
                ticket_generate_pdf_error = ticket_generate_pdf_error.filter(
                  (order_remove) => order_remove.id !== action.order_id
                );
              }
            }
          } else {
            let find_error_ordered_ticket = find_ticket_group.details.find(
              (ticket) => ticket.id == action.orderedticket_id
            );

            if (find_error_ordered_ticket) {
              find_error_ordered_ticket.refunded = true;
              find_error_ordered_ticket.paid_out = action.payed;
            }
          }
        }
      }

      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_pay",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          bought: {
            ...state.events_via_tickets.bought,
            data: ticket_generate_pdf_error,
          },
        },
      };

    case TICKET_GENERATE_PDF_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_pay",
          code: action.code,
        },
      };

    case TICKET_REFUND_SUCCESS:
      let ticket_refund = state.events_via_tickets.bought.data;

      let find_refund_ticket = ticket_refund.find(
        (order) => order.id == action.order_id
      );

      if (find_refund_ticket) {
        let find_refund_ticket_type = find_refund_ticket.tickets.find(
          (type) => type.id == action.ticket_id
        );

        if (find_refund_ticket_type) {
          let find_refund_orderticket = find_refund_ticket_type.details.find(
            (ordered_ticket) => ordered_ticket.id == action.orderedticket_id
          );

          if (find_refund_orderticket) {
            find_refund_orderticket.refunded = true;
            find_refund_orderticket.paid_out = false;
          }
        }
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_refund",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          bought: {
            ...state.events_via_tickets.bought,
            data: ticket_refund,
          },
          is: {
            type: "refund_ticket",
            timestamp: action.timestamp,
          },
        },
      };

    case TICKET_REFUND_NOTVALID_SUCCESS:
      let ticket_refund_error = state.events_via_tickets.bought.data;

      if (action.event_problem) {
        ticket_refund_error = ticket_refund_error.filter(
          (order) => order.event.id !== action.event_id
        );
      } else if (action.expired_refund) {
        ticket_refund_error.forEach((order) => {
          if (order.event.id == action.event_id) {
            order.expired_refund = true;
          }
        });
      } else {
        let find_missing_ticket_order = ticket_refund_error.find(
          (order) => order.id == action.order_id
        );

        if (find_missing_ticket_order) {
          let find_missing_ticket_type = find_missing_ticket_order.tickets.find(
            (type) => type.id == action.ticket_id
          );

          if (find_missing_ticket_type) {
            if (action.orderedticket_problem) {
              find_missing_ticket_type.details =
                find_missing_ticket_type.details.filter(
                  (ordered_ticket) =>
                    ordered_ticket.id !== action.orderedticket_id
                );

              if (find_missing_ticket_type.details.length == 0) {
                find_missing_ticket_order.tickets =
                  find_missing_ticket_order.tickets.filter(
                    (ticket_type_remove) =>
                      ticket_type_remove.id !== action.ticket_id
                  );

                if (find_missing_ticket_order.tickets.length == 0) {
                  ticket_refund_error = ticket_refund_error.filter(
                    (order_remove) => order_remove.id !== action.order_id
                  );
                }
              }
            } else {
              let find_expired_ticket = find_missing_ticket_type.details.find(
                (ordered_ticket) => ordered_ticket.id == action.orderedticket_id
              );

              if (find_expired_ticket) {
                if (action.refund_problem) {
                  find_expired_ticket.refunded = true;
                  find_expired_ticket.paid_out = action.payed;
                } else if (action.used_ticket) {
                  find_expired_ticket.used = true;
                  find_expired_ticket.used_time = action.used_time;
                }
              }
            }
          }
        }
      }

      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_pay",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          bought: {
            ...state.events_via_tickets.bought,
            data: ticket_refund_error,
          },
          is: {
            type: "refund_ticket",
            timestamp: action.timestamp,
          },
        },
      };

    case TICKET_REFUND_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_refund",
          code: action.code,
        },
      };

    case TICKET_ORDER_CANCEL_SUCCESS:
      let ticket_order_cancel = state.events_via_tickets.bought.data;

      if (action.ticket_id !== null) {
        let cancel_ticket_find_order = ticket_order_cancel.find(
          (order) => order.id == action.order_id
        );

        if (cancel_ticket_find_order) {
          let cancel_ticket_find_ticket_group =
            cancel_ticket_find_order.tickets.find(
              (ticket_type) => ticket_type.id == action.ticket_id
            );

          if (cancel_ticket_find_ticket_group) {
            cancel_ticket_find_ticket_group.details =
              cancel_ticket_find_ticket_group.details.filter(
                (ticket) => !action.orderedticket_ids.includes(ticket.id)
              );

            if (cancel_ticket_find_ticket_group.details.length == 0) {
              cancel_ticket_find_order.tickets =
                cancel_ticket_find_order.tickets.filter(
                  (ticket_type_delete) =>
                    ticket_type_delete.id !== action.ticket_id
                );

              if (cancel_ticket_find_order.tickets.length == 0) {
                ticket_order_cancel = ticket_order_cancel.filter(
                  (order_remove) => order_remove.id !== action.order_id
                );
              }
            }
          }
        }
      } else {
        ticket_order_cancel = ticket_order_cancel.filter(
          (order_remove) => order_remove.id !== action.order_id
        );
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_order_cancel",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          bought: {
            ...state.events_via_tickets.bought,
            data: ticket_order_cancel,
          },
          is: {
            type: "ordered_ticket_action",
            timestamp: action.timestamp,
          },
        },
      };

    case TICKET_ORDER_REPAY_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_order_repay",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          is: {
            type: "ordered_ticket_repay",
            url_payment: action.url_payment,
            timestamp: action.timestamp,
          },
        },
      };

    case TICKET_ORDER_ACTION_NOTVALID_SUCCESS:
      let ticket_order_cancel_notvalid = state.events_via_tickets.bought.data;

      if (action.event_delete) {
        //222
        ticket_order_cancel_notvalid = ticket_order_cancel_notvalid.filter(
          (order) => order.event.id !== action.event_id
        );
      } else if (action.order_delete) {
        /// 223 224
        ticket_order_cancel_notvalid = ticket_order_cancel_notvalid.filter(
          (order) => order.id !== action.order_id
        );
      } else if (action?.order_too_fast == undefined) {
        let order_cancel_notvalid = ticket_order_cancel_notvalid.find(
          (order) => order.id == action.order_id
        );

        if (order_cancel_notvalid) {
          if (action.refresh_price) {
            let refreshed_id_price = {};
            order_cancel_notvalid.tickets.forEach((ticket_type) => {
              if (
                Object.keys(action.new_price).includes(
                  ticket_type.id.toString()
                )
              ) {
                ticket_type.new_price = true;
                ticket_type.details.forEach((detailed_ticket) => {
                  detailed_ticket.purchase_price =
                    action.new_price[ticket_type.id];
                  refreshed_id_price[detailed_ticket.id] =
                    action.new_price[ticket_type.id];
                });
              }
            });

            return {
              ...state,
              handler: {
                success: "",
                error: action.error,
                type: "ticket_order_action",
                code: action.code,
              },
              events_via_tickets: {
                ...state.events_via_tickets,
                bought: {
                  ...state.events_via_tickets.bought,
                  data: ticket_order_cancel_notvalid,
                },
                is: {
                  type: "refresh_cart_price",
                  refreshed_id_price: refreshed_id_price,
                  timestamp: action.timestamp,
                },
              },
            };
          } else {
            if (action.order_paid) {
              order_cancel_notvalid.is_paid = true;
              order_cancel_notvalid.paid_time = action.paid_time;

              let event_datetime_parts =
                order_cancel_notvalid.event.event_date.split("-");

              let event_datetime_obj = new Date(
                parseInt(event_datetime_parts[0]),
                parseInt(event_datetime_parts[1]),
                parseInt(event_datetime_parts[2])
              );

              if (event_datetime_obj.getTime() <= Date.now()) {
                order_cancel_notvalid.expired_refund = true;
              }
            }

            //////////////// GDY KUPUJEMY LUB USUWAMY CAŁE ZAMÓWIENIE

            if (action.ticket_id == null) {
              order_cancel_notvalid.tickets.forEach((ticket_type) => {
                ticket_type.details = ticket_type.details.filter(
                  (detail_type) =>
                    action.exists_orderedtickets.includes(detail_type.id)
                );
              });
            }

            ////////////   GDY USUWAMY KONKRETNY BILET
            else {
              let order_cancel_notvalid_ticket =
                order_cancel_notvalid.tickets.find(
                  (missing_type) => missing_type.id == action.ticket_id
                );

              if (order_cancel_notvalid_ticket) {
                order_cancel_notvalid_ticket.details =
                  order_cancel_notvalid_ticket.details.filter(
                    (missing_ticket) =>
                      action.exists_orderedtickets.includes(missing_ticket.id)
                  );
              }
            }

            //////////////// OCZYSZCZANIE BILETOW GDY KTORAS LISTA BEDZIE MIALA DLUGOSC  = 0

            ticket_order_cancel_notvalid = ticket_order_cancel_notvalid.filter(
              (order_clear) => {
                order_clear.tickets = order_clear.tickets.filter(
                  (tickets_clear) => {
                    if (tickets_clear.details.length > 0) {
                      return true;
                    } else {
                      return false;
                    }
                  }
                );
                if (order_clear.tickets.length > 0) {
                  return true;
                } else {
                  return false;
                }
              }
            );
          }
        }
      }

      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_order_action",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          bought: {
            ...state.events_via_tickets.bought,
            data: ticket_order_cancel_notvalid,
          },
          is: {
            type: "ordered_ticket_action",
            timestamp: action.timestamp,
          },
        },
      };

    case TICKET_ORDER_ACTION_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_order_action",
          code: action.code,
        },
      };

    case TICKET_CALENDAR_SUCCESS:
      let clear_bought = state.events_via_tickets.bought;

      if (clear_bought.data.length > 6) {
        clear_bought.data = clear_bought.data.splice(0, 6);
        clear_bought.meta.links.next = clear_bought.meta.links.first;
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "ticket_order_repay",
          code: action.code,
        },
        events_via_tickets: {
          ...state.events_via_tickets,
          bought: clear_bought,
          calendar: {
            data: action.status_first
              ? action.data
              : [...state.events_via_tickets.calendar.data, ...action.data],
            meta: {
              links: {
                ...action.meta.links,
                first: action.status_first
                  ? action.meta.links.next
                  : state.events_via_tickets.calendar.meta.links.first,
              },
            },
          },
        },
      };

    case TICKET_CALENDAR_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ticket_calendar",
          code: action.code,
        },
      };

    case WEBSOCKETS_ORDER_REFUND_SUCCESS:
      let websocket_order_refund = state.events_via_tickets?.bought.data;

      if (websocket_order_refund !== undefined) {
        /// ZWYKLY FOREACH PO WSZYSTKIECH ORDERACH OD EVENTU, A JESLI KTORYS JEST NIEOPLACONY I NIE MA GO W "ŻADNEJ LIŚCIE TO ZNACZY ZE JEST DO WYWALENIA", A JAK JEST TO ORDER NA PAID TRZEBA ZMIENIC

        websocket_order_refund = websocket_order_refund.filter((order) => {
          if (order.event.id == action.event_id) {
            order.tickets = order.tickets.filter((ticket) => {
              ticket.details = ticket.details.filter((detail_ticket) => {
                if (action.ids.used.includes(detail_ticket.id)) {
                  detail_ticket.used = true;
                } else if (
                  action.ids.refunded_paid.includes(detail_ticket.id)
                ) {
                  detail_ticket.refunded = true;
                  detail_ticket.paid_out = true;
                } else if (
                  action.ids.refunded_not_paid.includes(detail_ticket.id)
                ) {
                  detail_ticket.refunded = true;
                  detail_ticket.paid_out = false;
                } else {
                  return false;
                }
                if (order.is_paid == false) {
                  order.is_paid = true;
                }
                return true;
              });
              if (ticket.details.length > 0) {
                return true;
              } else {
                return false;
              }
            });

            if (order.tickets.length > 0) {
              let cancel_time = action.order_refund_information.find(
                (canceled_order) => canceled_order.id == order.id
              );

              if (cancel_time) {
                order.stripe_refund_order = cancel_time.stripe_refund_order;
              }

              return true;
            } else {
              return false;
            }
          } else {
            return true;
          }
        });

        const now = new Date();
        const timestamp = Math.floor(now.getTime() / 1000);

        return {
          ...state,
          handler: {
            success:
              "Jedno z wydarzeń na które zamówiłeś bilety zostało odrzucone.",
            error: "",
            type: "websocket_ticket_change_status",
            code: "2161",
          },
          events_via_tickets: {
            ...state.events_via_tickets,
            bought: {
              ...state.events_via_tickets.bought,
              data: websocket_order_refund,
            },
            is: {
              type: "websocket",
              timestamp: timestamp,
            },
          },
        };
      }

      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "websocket",
          code: action.code,
        },
      };

    case WEBSOCKETS_PAYCHECK_RECEIVE_SUCCESS:
      let websocket_paycheck_receive = { ...state.events_via_tickets };

      let status_refresh_modals = false;
      let success_paycheck = "";
      let code_paycheck = "";

      if (
        !(websocket_paycheck_receive?.bought?.data == undefined) &&
        action.tickets_ids.length > 0
      ) {
        websocket_paycheck_receive.bought.data.forEach((order) => {
          order.tickets.forEach((ticket) => {
            ticket.details.forEach((ticket_details) => {
              if (action.tickets_ids.includes(ticket_details.id)) {
                ticket_details.refunded = true;
                ticket_details.paid_out = true;
                status_refresh_modals = true;
              }
            });
          });

          let find_save_confirmation_refund = action.paycheck_attachments.find(
            (confirmation) => confirmation.order_id == order.id
          );

          if (find_save_confirmation_refund) {
            order.paycheck_attachments = [
              ...order.paycheck_attachments,
              find_save_confirmation_refund,
            ];
          }
        });

        success_paycheck = "Właśnie został wykonany przelew za zwrot biletów.";

        code_paycheck = "2168";
      } else if (
        (!(websocket_paycheck_receive?.created?.data == undefined) ||
          !(websocket_paycheck_receive?.calendar?.data == undefined)) &&
        action.event_id !== null
      ) {
        websocket_paycheck_receive.created.data =
          websocket_paycheck_receive.created.data.filter(
            (event) => event.id !== action.event_id
          );

        let event_calendar_change_state =
          websocket_paycheck_receive.calendar.data.find(
            (event) => event.id == action.event_id
          );

        if (event_calendar_change_state) {
          event_calendar_change_state.paid_out = true;
          event_calendar_change_state.paycheck_attachments =
            action.paycheck_attachments;
        }

        success_paycheck =
          "Właśnie został wykonany przelew za zorganizowanie wydarzenia.";

        code_paycheck = "2168";
      }

      if (status_refresh_modals) {
        const now = new Date();
        const timestamp = Math.floor(now.getTime() / 1000);

        websocket_paycheck_receive.is = {
          type: "websocket",
          timestamp: timestamp,
        };
      }

      return {
        ...state,
        handler: {
          success: success_paycheck,
          error: "",
          type: "websocket_ticket_change_status",
          code: code_paycheck,
        },
        events_via_tickets: websocket_paycheck_receive,
      };

    case WEBSOCKETS_REFUND_NOT_PINNED_BANK_SUCCESS:
      let success_paycheck_bank = "";
      let code_paycheck_bank = "";

      if (!(state.events_via_tickets?.bought?.data == undefined)) {
        let websocket_not_pinned_bought = { ...state.events_via_tickets };
        let status_refresh_modals_bank = false;

        let arrays_order = {};

        action.orders_refund_amount.forEach(
          (order) => (arrays_order[order.order_id] = order.amount_total)
        );

        websocket_not_pinned_bought.bought.data.forEach((order) => {
          let str_order_id = order.id.toString();

          if (Object.keys(arrays_order).includes(str_order_id)) {
            order.awaitings_refund_amount = arrays_order[str_order_id];

            order.tickets.forEach((ticket) => {
              ticket.details.forEach((ticket_detail) => {
                if (
                  !ticket_detail.used &&
                  !ticket_detail.paid_out &&
                  !ticket_detail.refunded
                ) {
                  ticket_detail.refunded = true;
                  status_refresh_modals_bank = true;
                }
              });
            });
          }
        });

        if (status_refresh_modals_bank) {
          const now = new Date();
          const timestamp = Math.floor(now.getTime() / 1000);

          websocket_not_pinned_bought.is = {
            type: "websocket",
            timestamp: timestamp,
          };
        }

        success_paycheck_bank =
          "Otrzymałeś zwrot, ale nie masz podpiętego konta bankowego.";

        code_paycheck_bank = "2168";

        return {
          ...state,
          handler: {
            success: success_paycheck_bank,
            error: "",
            type: "websocket_refund_not_pinned_bank",
            code: code_paycheck_bank,
          },
          events_via_tickets: websocket_not_pinned_bought,
        };
      }

      return {
        ...state,
        handler: {
          success: success_paycheck_bank,
          error: "",
          type: "websocket_refund_not_pinned_bank",
          code: code_paycheck_bank,
        },
      };

    default:
      return state;
  }
};

export default dataReducer;
