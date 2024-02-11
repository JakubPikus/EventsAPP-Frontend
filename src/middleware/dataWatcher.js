import { admin_reset } from "../actions/admin";

const dataWatcherMiddleware = (store) => (next) => (action) => {
  const currentAdminState = store.getState().admin;

  if (
    // GDY REDUCER "ADMIN" NIE JEST PUSTY, A KOLEJNA AKCJA JAKA NASTĄPI NIE MA W SOBIE "ADMIN" ANI "WEBSOCKETS" I NIE JEST "REFRESH_TOKEN" DO ODSWIEZANIA TOKENU ANI "MENU_STATE_CHANGE" DO ROZWIJANIA MENU Z LEWEJ STRONY, TO TRZEBA WYCZYSCIC REDUCER "ADMIN" PRZED KOLEJNĄ AKCJĄ
    Object.keys(currentAdminState).length > 0 &&
    action.type !== undefined &&
    action.type !== "REFRESH_SUCCESS" &&
    action.type !== "MENU_STATE_CHANGE" &&
    !action.type.includes("ADMIN") &&
    !action.type.includes("WEBSOCKETS")
  ) {
    store.dispatch(admin_reset());
    return next(action);
  } else {
    return next(action);
  }
};

export default dataWatcherMiddleware;
