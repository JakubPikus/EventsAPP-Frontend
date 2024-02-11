import React from "react";
import { RotatingLines } from "react-loader-spinner";
import {
  LocationMarkerIcon,
  CalendarIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import ips_config from "../ips_config";
import useEventsRandomPage from "../hooks/useEventsRandomPage";
import moment from "moment";
import "moment/locale/pl";
moment.locale("pl");

function Event({ props, role }) {
  const [eventDetails] = useEventsRandomPage();

  function modelEvent(role) {
    if (props === undefined) {
      return (
        <div className="flex h-full w-full items-center justify-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      );
    } else if (role === "Main") {
      return (
        <div
          className="flex h-full w-full  flex-col lg:flex-row xl:flex-col 2xl:flex-row "
          key={props.id}
        >
          <div className="flex h-2/5  items-center justify-center px-6 py-2 lg:h-full xl:h-2/3 2xl:h-full">
            <div
              className={` h-[140px] w-[110px] rounded-[27px] border-2 border-gray-500 bg-cover    bg-center bg-no-repeat duration-300 lg:h-[230px] lg:w-[176px] xl:h-[230px] xl:w-[176px]   2xl:h-[320px] 2xl:w-[250px]`}
              style={{
                backgroundImage: `url(${ips_config.BACKEND}/media/${props?.image})`,
              }}
            ></div>
          </div>
          <div className="flex h-3/5 grow  lg:h-full xl:h-2/3 2xl:h-full 2xl:h-full ">
            {eventDetails(props)}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={`${
            role === "Helper" ? "cursor-pointer bg-zinc-900 " : "bg-zinc-700 "
          } flex h-32 w-full flex-row space-x-2 px-2 md:space-x-4`}
          key={props.id}
        >
          <div className="flex h-full w-1/3 items-center justify-center xl:justify-end">
            <div
              className={` h-[95px] w-[75px] rounded-[15px] border border-gray-500 bg-cover    bg-center bg-no-repeat `}
              style={{
                backgroundImage: `url(${ips_config.BACKEND}/media/${props?.image})`,
              }}
            ></div>
          </div>
          <div className="flex h-full w-2/3 flex-col py-3 px-1 md:px-1">
            <div className="flex grow flex-col">
              <span
                className={`break-anywhere text-md h-auto font-mukta text-[10px] italic  ${
                  role === "Helper" ? "text-gray-600" : "text-gray-400"
                } `}
              >
                {props?.category}
              </span>
              <span className="break-anywhere h-[40px] w-auto truncate text-start font-mukta text-lg text-gray-100">
                {props?.title}
              </span>
              <div className="flex h-full w-full flex-row items-center justify-between space-x-2 pt-2 pr-4 sm:pt-1  lg:pr-8 xl:pr-4">
                <div className="flex h-full flex-col items-center space-y-1 pt-2 sm:pt-0">
                  <CalendarIcon className="h-4 w-4 shrink-0 text-gray-100 md:h-5 md:w-5 " />
                  <div className="flex h-auto w-auto flex-col items-center">
                    <span className="text-center font-mukta text-[8px] text-gray-200 sm:text-[11px] ">
                      {moment(props?.event_date).format("DD.MM.YY")}
                    </span>
                    <span className="hidden text-center font-mukta text-[7px] text-gray-400 sm:block sm:text-[9px] ">
                      {moment(props?.event_date).fromNow()}
                    </span>
                  </div>
                </div>

                <div className="flex h-full flex-col items-center space-y-1 pt-2 sm:pt-0">
                  <LocationMarkerIcon className="h-4 w-4 shrink-0 text-gray-100 md:h-5 md:w-5 " />
                  <div className="flex h-auto w-auto flex-col items-center">
                    <span className="text-center font-mukta text-[8px] text-gray-200 sm:text-[11px] ">
                      {props?.city}
                    </span>
                    <span className="text-center font-mukta text-[7px] text-gray-400 sm:text-[9px] ">
                      {props?.province}
                    </span>
                  </div>
                </div>

                <div className="flex h-full flex-col items-center space-y-1 pt-2 sm:pt-0">
                  <UserGroupIcon className="h-4 w-4 shrink-0 text-gray-100 md:h-5 md:w-5 " />
                  <span className="text-center font-mukta text-[8px] text-gray-200 sm:text-[11px] ">
                    {`${props?.num_reputation} osób`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return modelEvent(role);
}

export default Event;
