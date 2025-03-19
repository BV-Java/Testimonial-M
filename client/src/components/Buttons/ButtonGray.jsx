import React from "react";

const ButtonGray = ({ text }) => {
  return (
    <button className="px-3 py-3 rounded-md text-sm font-nunito font-light bg-base-300 active:bg-base-200 text-black">
      {text}
    </button>
  );
};

export default ButtonGray;
