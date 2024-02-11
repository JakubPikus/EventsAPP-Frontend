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
  CLEAR_PASSWORD_RESET,
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
  CLEAR_CITIES,
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
  SET_PINNED_BANK,
  SET_UNPINNED_BANK,
} from "../actions/types";

const initialState = {
  data: {
    provinces: null,
    cities: null,
  },
  user: null,
  is: {
    authenticated: "checking",
    logout: false,
    registered: false,
    notValid: false,
    passwordreset: false,
    passwordresetform: false,
    menuStatus: false,
  },
  handler: {
    error: "",
    success: "",
    type: "",
    code: "",
  },
  xcsrftoken: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "register",
          code: action.code,
        },
        is: {
          registered: true,
          authenticated: false,
        },
      };
    case REGISTER_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "register",
          code: action.code,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "login",
          code: action.code,
        },
        is: {
          authenticated: true,
          logout: false,
          passwordresetform: false,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: action.user,
        xcsrftoken: action.xcsrftoken,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "login",
          code: action.code,
        },
        is: {
          authenticated: false,
        },
      };
    case USER_NOT_VERIFICATED:
      return {
        ...state,
        handler: {
          success: "action.success",
          error: "",
          type: "login",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: true,
        },
        user: action.user,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "logout",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "logout",
          code: action.code,
        },
      };
    case GETUSER_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "get_user",
          code: action.code,
        },
        is: {
          authenticated: true,
        },
        user: action.user,
        xcsrftoken: action.xcsrftoken,
      };
    case GETUSER_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "get_user",
          code: action.code,
        },
        is: {
          authenticated: false,
        },
      };

    case GETUSER_FAIL_REFRESH:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "get_user",
          code: action.code,
        },
        is: {
          authenticated: "checking",
        },
      };

    case REFRESH_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "refresh",
          code: action.code,
        },
      };
    case REFRESH_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "refresh",
          code: action.code,
        },
        is: {
          authenticated: false,
        },
      };
    case ACCOUNT_CONFIRM_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "account_confirm",
          code: action.code,
        },
        is: {
          authenticated: true,
          notValid: false,
        },
        user: action.user,
        xcsrftoken: action.xcsrftoken,
      };
    case ACCOUNT_CONFIRM_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "account_confirm",
          code: action.code,
        },
      };
    case GENERATE_NEWCODE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "generate_newcode",
          code: action.code,
        },
      };
    case GENERATE_NEWCODE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "generate_newcode",
          code: action.code,
        },
      };
    case PASSWORD_RESET_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "password_reset",
          code: action.code,
        },
        is: {
          passwordreset: true,
          authenticated: false,
        },
        user: action.user,
      };
    case PASSWORD_RESET_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "password_reset",
          code: action.code,
        },
      };

    case PASSWORD_RESET_CONFIRM_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "password_reset_confirm",
          code: action.code,
        },
        is: {
          passwordreset: false,
          passwordresetform: true,
          authenticated: false,
        },
        user: null,
      };
    case PASSWORD_RESET_CONFIRM_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "password_reset_confirm",
          code: action.code,
        },
      };

    case DATA_PROVINCE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "data_province",
          code: action.code,
        },
        data: {
          provinces: action.provinces,
        },
      };
    case DATA_PROVINCE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "data_province",
          code: action.code,
        },
      };

    case DATA_CITIES_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "data_cities",
          code: action.code,
        },
        data: {
          provinces: state.data.provinces,
          cities: action.cities,
        },
      };
    case DATA_CITIES_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "data_cities",
          code: action.code,
        },
      };

    case CHANGE_USER_LOCATION_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "change_user_location",
          code: action.code,
        },
        user: action.user,
      };

    case CHANGE_USER_LOCATION_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "change_user_location",
          code: action.code,
        },
      };

    case CHANGE_USER_DISTANCE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "change_user_distance",
          code: action.code,
        },
        user: action.user,
      };

    case CHANGE_USER_DISTANCE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "change_user_distance",
          code: action.code,
        },
      };

    case UNLINKED_GOOGLE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "unlinked_google",
          code: action.code,
        },
        user: {
          ...state.user,
          gmail: {
            social_id: null,
            first_name: null,
            last_name: null,
            image: null,
          },
        },
      };

    case UNLINKED_GOOGLE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "unlinked_google",
          code: action.code,
        },
      };

    case UNLINKED_FACEBOOK_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "unlinked_facebook",
          code: action.code,
        },
        user: {
          ...state.user,
          facebook: {
            social_id: null,
            first_name: null,
            last_name: null,
            image: null,
          },
        },
      };

    case UNLINKED_FACEBOOK_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "unlinked_facebook",
          code: action.code,
        },
      };

    case ACCOUNT_DELETE_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "acount_delete",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case ACCOUNT_DELETE_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "acount_delete",
          code: action.code,
        },
      };

    case ACCOUNT_EDIT_SUCCESS:
      return {
        ...state,
        handler: {
          success: action.success,
          error: "",
          type: "acount_edit",
          code: action.code,
        },
        user: {
          ...state.user,
          username: action.data.username,
          first_name: action.data.first_name,
          last_name: action.data.last_name,
          city: action.data.city,
          image: action.data.image,
          image_thumbnail: action.data.image_thumbnail,
        },
      };

    case ACCOUNT_EDIT_FAIL:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "acount_edit",
          code: action.code,
        },
      };

    case SET_LOGOUT_FALSE:
      return {
        ...state,
        is: {
          logout: false,
        },
      };

    case TOKENS_NOT_FOUND:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "tokens_not_found",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case TOKEN_ACCESS_NOT_VALID:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "token_access_not_valid",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case TOKEN_REFRESH_NOT_VALID:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "token_refresh_not_valid",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case TOKEN_REFRESH_IS_BLACKLISTED:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "token_refresh_is_blacklisted",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case IPADDRESS_BANNED:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ipaddress_banned",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case USER_BANNED:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "user_banned",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case USER_DELETED:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "user_deleted",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case IPADDRESS_DELETED:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "ipaddress_deleted",
          code: action.code,
        },
        is: {
          authenticated: false,
          notValid: false,
          logout: true,
        },
        data: {
          provinces: null,
          cities: null,
        },
        user: null,
        xcsrftoken: "",
      };

    case CLEAR_CITIES:
      return {
        ...state,
        data: {
          provinces: state.data.provinces,
          cities: null,
        },
      };

    case MENU_STATE_CHANGE:
      return {
        ...state,
        is: {
          ...state.is,
          menuStatus: !state.is.menuStatus,
        },
      };

    case SET_NEW_EMAIL:
      return {
        ...state,
        user: {
          ...state.user,
          email: action.email,
        },
      };

    case SET_PINNED_BANK:
      return {
        ...state,
        user: {
          ...state.user,
          pinned_bank: true,
        },
      };

    case SET_UNPINNED_BANK:
      return {
        ...state,
        user: {
          ...state.user,
          pinned_bank: false,
        },
      };

    case ADMIN_NOT_PERMISSION:
      return {
        ...state,
        handler: {
          success: "",
          error: action.error,
          type: "admin_not_permission",
          code: action.code,
        },
        user: {
          ...state.user,
          is_admin: false,
        },
      };

    case CLEAR_PASSWORD_RESET:
      return {
        ...state,
        user: null,
        is: {
          ...state.is,
          passwordreset: false,
        },
      };

    default:
      return state;
  }
};

export default authReducer;
