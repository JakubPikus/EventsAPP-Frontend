import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../selectors";
import {
  LocationMarkerIcon,
  UserGroupIcon,
  XIcon,
} from "@heroicons/react/solid";
import * as d3 from "d3";
import { events_county_map } from "../actions/data";
import { getEventsMap } from "../selectors";
import { Link } from "react-router-dom";
import ips_config from "../ips_config";

import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function useMapPage() {
  const dispatch = useDispatch();
  let events_map = useSelector(getEventsMap);
  let user = useSelector(getUser);

  const [visibleBackButton, setVisibleBackButton] = useState(false);
  const [targetCursor, setTargetCursor] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState({
    id: null,
    name: null,
  });
  const [openCountyInfo, setOpenCountyInfo] = useState({
    status: false,
    county: null,
  });

  // WYGENERUJ WOJEWODZTWA
  function renderProvinces(svg, geojsonProvinces) {
    if (svg.empty()) {
      svg = d3
        .select("#map")
        .append("svg")
        .attr("viewBox", `0 0 500 200`)
        .style("width", "100%")
        .style("height", "100%");
    }
    const projection = d3.geoMercator().fitSize([500, 200], geojsonProvinces);
    const pathGenerator = d3.geoPath().projection(projection);

    svg.selectAll("path").remove();
    svg.selectAll("foreignObject").remove();

    svg
      .selectAll(".country")
      .data(geojsonProvinces.features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", pathGenerator)
      .attr("fill", (d) => {
        let province = events_map.province.find(
          (obj) => obj.id == d.properties.id
        );
        if (0 < province.count && province.count <= 20) {
          return "green";
        } else if (20 < province.count && province.count <= 100) {
          return "yellow";
        } else if (100 < province.count) {
          return "red";
        } else {
          return "transparent";
        }
      })
      .attr("stroke", "#60a5fa")
      .attr("stroke-width", 0.5)
      .classed("cursor-pointer", true)
      .on("mouseenter", function (event) {
        setTargetCursor(
          "Województwo " + event.srcElement.__data__.properties.nazwa
        );
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
          let province = events_map.province.find(
            (obj) => obj.id == d.properties.id
          );
          if (0 < province.count && province.count <= 20) {
            return "green";
          } else if (20 < province.count && province.count <= 100) {
            return "yellow";
          } else if (100 < province.count) {
            return "red";
          } else {
            return "transparent";
          }
        });
      })
      .on("click", provinceClicked);
  }
  // PO WCISNIECIU NA WOJEWODZTWO, POBIERZ DANE NA TEMAT PROWIATÓW
  function provinceClicked(e) {
    setSelectedProvince({
      id: e.srcElement.__data__.properties.id,
      name: e.srcElement.__data__.properties.nazwa,
    });
    dispatch(events_county_map(e.srcElement.__data__.properties.id));
  }

  // PO WCISNIĘCIU NA POWIAT, POKAŻ MODAL NA TEMAT WYDARZEŃ
  function countyClicked(e) {
    let data = events_map.county.find(
      (obj) => obj.id == e.srcElement.__data__.properties.id
    );
    setOpenCountyInfo({
      status: true,
      county: data,
    });
  }

  function modalCountyInfo(county) {
    let name_county =
      county.name.charAt(0).toUpperCase() + county.name.slice(1);

    return (
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="fixed inset-0 bg-gray-900 opacity-80"></div>

        <div className="z-30 flex w-[450px] flex-col items-center justify-center gap-5 rounded-2xl bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 pb-7 shadow-blue-500/30 drop-shadow-xl sm:w-[500px] md:w-[550px] xs:w-3/4">
          <div className="flex h-auto w-full items-center justify-between rounded-t-2xl bg-gradient-to-r from-gray-800 to-slate-700 py-1 px-3">
            <span className="text-sm text-white sm:text-base md:text-xl">
              {name_county}
            </span>
            <XIcon
              className="h-6 w-6 cursor-pointer text-red-400"
              onClick={() =>
                setOpenCountyInfo({
                  status: false,
                  county: null,
                })
              }
            />
          </div>
          <div className="flex">
            {county.count > 0 ? (
              <span className=" text-center font-mukta text-sm text-white md:text-base">
                Najpopularniejsze wydarzenia w przeciągu 3 miesięcy:
              </span>
            ) : (
              <span className=" text-center font-mukta text-sm text-white md:text-base">
                Brak wydarzeń w tym powiecie.
              </span>
            )}
          </div>
          {county.count > 0 && (
            <div className=" flex h-full max-h-[450px] w-3/4 flex-col space-y-3 divide-y-2 divide-gray-400 overflow-y-auto pr-2">
              {county.county_events.map((event) => eventRender(event))}
            </div>
          )}
        </div>
      </div>
    );
  }

  function eventRender(event) {
    return (
      <div
        className={`group flex h-32 w-full flex-row items-center  px-1 pt-2`}
        key={event.id}
      >
        <div className="flex w-full flex-row space-x-6">
          <div className="flex items-center">
            <div className="flex flex-col">
              <Link to={`/event/${event.slug}-${event.uuid}`}>
                <img
                  src={`${ips_config.BACKEND}/media/${event.image}`}
                  className="h-10 w-10 rounded-lg object-cover transition ease-in-out group-hover:scale-110"
                ></img>
              </Link>
              <span className="h-auto pt-3 font-mukta text-sm text-gray-400">
                {moment(event.event_date).format("DD.MM.YY")}
              </span>
            </div>
          </div>

          <div className="flex w-[230px] flex-col justify-start sm:w-[260px] md:w-[290px] xs:w-2/3">
            {event.user == user.username && (
              <span className="break-anywhere text-md  h-auto font-mukta text-[10px] text-gray-300">
                Twoje wydarzenie
              </span>
            )}
            <div className="flex w-full flex-col">
              <Link to={`/event/${event.slug}-${event.uuid}`}>
                <p className="break-anywhere cursor-pointer truncate font-mukta text-white hover:bg-slate-400 hover:text-black">
                  {event.title}
                </p>
              </Link>
            </div>
            <div className="flex">
              <span className="break-anywhere text-md  h-auto font-mukta text-[10px] text-gray-300">
                {event.category}
              </span>
            </div>
            <div className="flex flex-row justify-between space-x-2">
              <div className={`flex flex-row space-x-1 pt-3`}>
                <LocationMarkerIcon className="mt-1 h-4 w-4 text-gray-300 sm:h-6 sm:w-6" />
                <div className=" flex flex-col">
                  <span className="h-auto font-mukta text-xs text-gray-200 sm:text-sm">
                    {event.city}
                  </span>
                  <span className="h-auto font-mukta text-[9px] text-gray-400 sm:text-[11px]">
                    {event.province}
                  </span>
                </div>
              </div>

              <div className="flex flex-row items-center justify-end space-x-1">
                <UserGroupIcon className="h-4 w-4 text-gray-300 sm:h-6 sm:w-6" />
                <span className="h-auto font-mukta text-xs text-gray-200 sm:text-sm">
                  {event.num_reputation}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return [
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
  ];
}
export default useMapPage;
