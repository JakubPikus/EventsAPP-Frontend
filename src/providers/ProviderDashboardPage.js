import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_CITIES } from "../actions/types";
import { admin_logs, admin_logs_refresh, admin_data } from "../actions/admin";
import {
  getCities,
  getXCSRFToken,
  getAdminLogs,
  getUser,
  getAdminSettings,
} from "../selectors";

function ProviderDashboardPage({ children }) {
  const dispatch = useDispatch();
  const cities = useSelector(getCities);

  const xcsrftoken = useSelector(getXCSRFToken);
  const logs = useSelector(getAdminLogs);
  const settings = useSelector(getAdminSettings);
  const user = useSelector(getUser);

  const [cursorId, setCursorId] = useState();
  const [excludedIdsLogs, setExcludedIdsLogs] = useState([]);

  const [endProvider, setEndProvider] = useState(false);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }

    dispatch(admin_logs(xcsrftoken));
  }, []);

  useEffect(() => {
    if (logs !== null && logs !== undefined && endProvider == false) {
      if (logs?.data[0]?.id !== undefined) {
        setCursorId(logs.data[0].id);
      } else {
        setCursorId(0);
      }

      dispatch(admin_data("", "reports", xcsrftoken));
    }
  }, [logs]);

  useEffect(() => {
    if (cursorId !== undefined) {
      const interval = setInterval(() => {
        dispatch(
          admin_logs_refresh(
            cursorId,
            excludedIdsLogs,
            user.username,
            xcsrftoken
          )
        );
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [cursorId]);

  useEffect(() => {
    if (
      settings.data?.reports !== undefined &&
      logs !== null &&
      logs !== undefined
    ) {
      setEndProvider(true);
    }
  }, [settings.data?.reports]);

  return cloneElement(children, {
    logs: logs,
    settings: settings,
    cursorId: cursorId,
    setCursorId: setCursorId,
    excludedIdsLogs: excludedIdsLogs,
    setExcludedIdsLogs: setExcludedIdsLogs,
    endProvider: endProvider,
  });
}
export default ProviderDashboardPage;
