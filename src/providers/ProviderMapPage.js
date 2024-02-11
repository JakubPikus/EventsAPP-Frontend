import React from "react";
import { useState, useEffect, cloneElement } from "react";
import { useDispatch, useSelector } from "react-redux";

import { events_province_map } from "../actions/data";
import { CLEAR_CITIES } from "../actions/types";
import { getCities, getEventsMap } from "../selectors";
import provinces from "../files/wojewodztwa.geojson";
import countys from "../files/powiaty.geojson";

function ProviderCalendar({ children }) {
  const dispatch = useDispatch();
  const cities = useSelector(getCities);
  const events_map = useSelector(getEventsMap);
  const [geojsonProvinces, setGeojsonProvinces] = useState(null);
  const [geojsonCountys, setGeojsonCountys] = useState(null);
  const [endProvider, setEndProvider] = useState(false);

  useEffect(() => {
    if (cities !== null) {
      dispatch({ type: CLEAR_CITIES });
    }
    dispatch(events_province_map());
    fetch(provinces)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => setGeojsonProvinces(data))
      .catch((error) => console.error("Error:", error));

    // ZAŁADOWANIE PLIKU Z POWIATAMI I POSEGREGOWANIE ICH WZGLEDEM ID WOJEWÓDZTWA
    fetch(countys)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        const countiesByProvince = {};

        data.features.forEach((county) => {
          const provinceId = county.properties.province_id;
          if (!countiesByProvince[provinceId]) {
            countiesByProvince[provinceId] = [];
          }
          countiesByProvince[provinceId].push(county);
        });
        setGeojsonCountys(countiesByProvince);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    if (geojsonProvinces !== null && geojsonCountys !== null) {
      setEndProvider(true);
    }
  }, [geojsonProvinces, geojsonCountys]);

  return cloneElement(children, {
    endProvider: endProvider,
    geojsonProvinces: geojsonProvinces,
    geojsonCountys: geojsonCountys,
  });
}
export default ProviderCalendar;
