import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dashboard from "../../components/Dashboard";
import { RotatingLines } from "react-loader-spinner";
import * as d3 from "d3";
import { ChevronLeftIcon } from "@heroicons/react/solid";
import { getEventsMap } from "../../selectors";
import moment from "moment";
import "moment/locale/pl";
import useMapPage from "../../hooks/useMapPage";
moment.locale("pl");

function MapPage({ endProvider, geojsonProvinces, geojsonCountys }) {
  const dispatch = useDispatch();
  let events_map = useSelector(getEventsMap);
  const [
    renderProvinces,
    visibleBackButton,
    setVisibleBackButton,
    selectedProvince,
    setSelectedProvince,
    targetCursor,
    setTargetCursor,
    countyClicked,
    openCountyInfo,
    modalCountyInfo,
  ] = useMapPage();

  let svg = d3.select("#map").select("svg");

  // PO ZAŁADOWANIU DANYCH WYGENERUJ WOJEWÓDZTWA
  useEffect(() => {
    if (geojsonProvinces !== null) {
      renderProvinces(svg, geojsonProvinces);
    }
  }, [events_map.province]);

  useEffect(() => {
    if (events_map.county !== null) {
      setVisibleBackButton(true);
      const provinceData = geojsonCountys[selectedProvince.id];
      // const provinceData = geojsonCountys[e.srcElement.__data__.properties.id];
      const projection = d3.geoMercator().fitSize([500, 200], {
        type: "FeatureCollection",
        features: provinceData,
      });
      const pathGenerator = d3.geoPath().projection(projection);

      const svg = d3.select("#map").select("svg");
      svg.selectAll(".country").remove();

      const counties = svg.selectAll(".county").data(provinceData).enter();

      counties
        .append("path")
        .attr("class", "county")
        .attr("d", pathGenerator)
        .attr("fill", (d) => {
          let county = events_map.county.find(
            (obj) => obj.id == d.properties.id
          );
          if (0 < county.count && county.count <= 20) {
            return "green";
          } else if (20 < county.count && county.count <= 100) {
            return "yellow";
          } else if (100 < county.count) {
            return "red";
          } else {
            return "transparent";
          }
        })
        .attr("stroke", "#60a5fa")
        .attr("stroke-width", 0.5)
        .classed("cursor-pointer", true)
        .on("mouseenter", function (event) {
          let province_name =
            event.srcElement.__data__.properties.nazwa.charAt(0).toUpperCase() +
            event.srcElement.__data__.properties.nazwa.slice(1);

          setTargetCursor(province_name);
          const currentColor = d3.select(this).attr("fill");
          if (currentColor == "transparent") {
            d3.select(this).attr("fill", "#374151");
          } else {
            d3.select(this).attr("fill", d3.color(currentColor).darker(0.5));
          }
        })
        .on("mouseleave", function (event) {
          setTargetCursor(null);
          d3.select(this).attr("fill", (d) => {
            let county = events_map.county.find(
              (obj) => obj.id == d.properties.id
            );
            if (0 < county.count && county.count <= 20) {
              return "green";
            } else if (20 < county.count && county.count <= 100) {
              return "yellow";
            } else if (100 < county.count) {
              return "red";
            } else {
              return "transparent";
            }
          });
        })
        .on("click", countyClicked);
    }
  }, [events_map.county]);

  return (
    <Dashboard>
      <div
        className={`flex w-full grow flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-slate-600`}
      >
        {endProvider ? (
          <div className="flex h-full w-full flex-col items-center">
            <div className="flex w-4/5 pt-8 sm:pt-12">
              <div className="flex w-full flex-row justify-between space-x-4">
                <div className="flex shrink-0 flex-col items-start space-y-3">
                  <div className="flex flex-row items-start space-x-4">
                    <span className="h-auto  font-mukta text-sm text-gray-100 sm:text-base lg:text-2xl ">
                      Szukaj wydarzeń na mapie
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <div className="flex w-fit flex-row items-center  space-x-2">
                      <div className="flex h-5 w-5 rounded-full border-2 border-blue-400 bg-transparent"></div>
                      <span className="h-auto  font-mukta text-[14px] text-gray-300">
                        brak wydarzeń
                      </span>
                    </div>
                    <div className="flex w-fit flex-row items-center  space-x-2">
                      <div className="flex h-5 w-5 rounded-full border-2 border-blue-400 bg-gradient-to-br from-green-400 via-green-500 to-green-600"></div>
                      <span className="h-auto  font-mukta text-[14px] text-gray-300">
                        {`0 < ilość <= 20`}
                      </span>
                    </div>
                    <div className="flex w-fit flex-row items-center  space-x-2">
                      <div className="flex h-5 w-5 rounded-full border-2 border-blue-400 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600"></div>
                      <span className="h-auto  font-mukta text-[14px] text-gray-300">
                        {`20 < ilość <= 100`}
                      </span>
                    </div>
                    <div className="flex w-fit flex-row items-center  space-x-2">
                      <div className="flex h-5 w-5 rounded-full border-2 border-blue-400 bg-gradient-to-br from-red-400 via-red-500 to-red-600"></div>
                      <span className="h-auto  font-mukta text-[14px] text-gray-300">
                        {`100 < ilość`}
                      </span>
                    </div>
                  </div>
                </div>

                {visibleBackButton ? (
                  <div className="flex flex-col items-center justify-start space-y-2  md:flex-row md:items-start md:space-y-0 md:space-x-7">
                    <div
                      className="flex cursor-pointer flex-row items-center rounded-lg bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 py-1 md:mt-0"
                      onClick={() => {
                        setVisibleBackButton(false);
                        setSelectedProvince({
                          id: null,
                          name: null,
                        });
                        renderProvinces(svg, geojsonProvinces);
                      }}
                    >
                      <ChevronLeftIcon className="h-5 w-5 text-gray-300" />
                      <span className="h-auto pr-2 text-center font-mukta text-sm text-gray-100 lg:text-[15px]">
                        Wróć do mapy kraju
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <span className="h-auto  text-center font-mukta text-base text-gray-100 lg:text-2xl">
                        {`Województwo ${selectedProvince.name}`}
                      </span>
                      {openCountyInfo.county !== null && (
                        <span className="h-auto  text-center font-mukta text-base text-gray-100 lg:text-xl">
                          {openCountyInfo.county.name.charAt(0).toUpperCase() +
                            openCountyInfo.county.name.slice(1)}
                        </span>
                      )}

                      {targetCursor !== null &&
                        targetCursor !==
                          `Województwo ${selectedProvince.name}` &&
                        openCountyInfo.county == null && (
                          <span className="h-auto text-center  font-mukta text-[16px] text-gray-500">
                            {targetCursor}
                          </span>
                        )}
                    </div>
                  </div>
                ) : (
                  targetCursor !== null && (
                    <span className="h-auto text-center  font-mukta text-xs text-gray-500 md:text-base lg:text-[18px]">
                      {targetCursor}
                    </span>
                  )
                )}
              </div>
            </div>

            <div
              id="map"
              className="flex grow items-start justify-start pb-24 sm:-mt-20 md:-mt-12 lg:mt-3"
            />
            {openCountyInfo.status && modalCountyInfo(openCountyInfo.county)}
          </div>
        ) : (
          <div className="flex w-full grow items-center justify-center">
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </div>
        )}
      </div>
    </Dashboard>
  );
}

export default MapPage;
