import React from "react";

const ActionSpinner = ({ size }) => {
  return <span className={`loading loading-spinner loading-${size}`}></span>;
};

export default ActionSpinner;
