export const getXCSRFToken = (state) => state.auth.xcsrftoken;
export const getIsAuthenticated = (state) => state.auth.is.authenticated;
export const getIsLogout = (state) => state.auth.is.logout;
export const getHandlerAuth = (state) => state.auth.handler;
export const getHandlerData = (state) => state.data.handler;
export const getHandlerAdmin = (state) => state.admin.handler;
export const getHandlerWebsockets = (state) => state.websockets.handler;

export const getUser = (state) => state.auth.user;
export const getIsRegistered = (state) => state.auth.is.registered;
export const getIsNotValid = (state) => state.auth.is.notValid;
export const getIsPasswordReset = (state) => state.auth.is.passwordreset;
export const getIsPasswordResetForm = (state) =>
  state.auth.is.passwordresetform;
export const getProvinces = (state) => state.auth.data.provinces;
export const getCities = (state) => state.auth.data.cities;

export const getCategorys = (state) => state.data.categorys;
export const getEventsHomescreen = (state) => state.data.events_homescreen;
export const getEventsList = (state) => state.data.events_list;

export const getCheckLocalization = (state) => state.data.check_localization;
export const getMenuStatus = (state) => state.auth.is.menuStatus;

export const getEvent = (state) => state.data.event.data;
export const getCommentEvent = (state) => state.data.event.comments;
export const getEventIsDeleted = (state) => state.data.event.is_deleted;

export const getEventIsNotVerificated = (state) =>
  state.data.event.is_not_verificated;

export const getUserData = (state) => state.data.user;
export const getUserEvents = (state) => state.data.user.events;

export const getEventParticipants = (state) => state.data.event.participants;

export const getSeries = (state) => state.data.series;

export const getEventRejected = (state) => state.data.event.is_rejected;

export const getNewEvent = (state) => state.data.new_event;

export const getEventsViaSeries = (state) => state.data.events_via_series;
export const getEventsWithSeries = (state) =>
  state.data.events_via_series.events_with_series;
export const getEventsAlphabet = (state) =>
  state.data.events_via_series.alphabet_list;

export const getEventsViaCalendar = (state) => state.data.events_via_calendar;
export const getEventsRandom = (state) => state.data.events_random;
export const getEventsMap = (state) => state.data.events_map;
export const getFindFriends = (state) => state.data.find_friends;
export const getEventsViaBadges = (state) => state.data.events_via_badges;

export const getUserBadges = (state) => state.data.user_badges;

export const getSettings = (state) => state.data.settings;

export const getUserRequestBlocked = (state) =>
  state.data.user.not_valid_request_action;

export const getAdminLogs = (state) => state.admin.logs;
export const getAdminReports = (state) => state.admin.reports;
export const getAdminSettings = (state) => state.admin;

export const getContactStatus = (state) => state.websockets.wrapper_status;
export const getContactWebsockets = (state) => state.websockets;
export const getChatSettings = (state) => state.websockets.chat_settings;
export const getEventTickets = (state) => state.data.event_tickets;
export const getEventsViaTickets = (state) => state.data.events_via_tickets;
