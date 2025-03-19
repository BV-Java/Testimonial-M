import React from "react";
import { assets } from "../../assets/assets.js";

const ButtonArrow = ({ text }) => {
  return (
    <button
      type="submit"
      className="flex items-center justify-center cursor-pointer border border-black px-2 rounded-md select-none group w-[114px]"
    >
      <div className="flex group-active:scale-95 duration-300 transition-all justify-center items-center gap-1">
        <span className="font-outfit ">{text}</span>
        <img className="sm:w-7 sm:h-7 h-5 w-5" src={assets.arrow} alt="" />
      </div>
    </button>
  );
};

export default ButtonArrow;
