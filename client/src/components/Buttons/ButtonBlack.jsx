import React from "react";
import { ActionSpinner } from "../../Skeleton/index.js";

const ButtonBlack = ({ text, isPending }) => {
  return (
    <button className="font-poppins text-xl bg-black text-white px-[6px] py-[6px] rounded-md select-none active:bg-gray-700 transition-all duration-100 flex items-center justify-center gap-2">
      {text}
      {isPending && <ActionSpinner />}
    </button>
  );
};

export default ButtonBlack;
