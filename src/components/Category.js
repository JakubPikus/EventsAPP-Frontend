import React from "react";
import { useNavigate } from "react-router-dom";
import ips_config from "../ips_config";

function Category({ props }) {
  const { type, details, image } = props;
  const history = useNavigate();

  function handleClickCategory() {
    history(`/events_list?category=${type}`);
  }

  return (
    <div
      className="delay-50 flex h-32 w-32 cursor-pointer flex-col justify-center rounded-full bg-neutral-100 transition ease-in-out hover:scale-125"
      onClick={handleClickCategory}
    >
      <div className="flex h-2/3 w-full flex-col items-center space-y-2">
        <img src={`${ips_config.BACKEND}${image}`} className="h-14 w-14"></img>
        <p className="font-mukta text-xs font-bold">{type}</p>
      </div>
    </div>
  );
}

export default Category;
