import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxThunk from "redux-thunk";
import authReducer from "./reducers/auth";
import dataReducer from "./reducers/data";
import adminReducer from "./reducers/admin";
import websocketsReducer from "./reducers/websockets";
import dataWatcherMiddleware from "./middleware/dataWatcher";

const store = createStore(
  combineReducers({
    auth: authReducer,
    data: dataReducer,
    admin: adminReducer,
    websockets: websocketsReducer,
  }),

  composeWithDevTools(applyMiddleware(dataWatcherMiddleware, reduxThunk))
);

export default store;
