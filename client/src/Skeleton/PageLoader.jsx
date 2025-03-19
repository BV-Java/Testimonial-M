import React from "react";

const PageLoader = ({ size }) => {
  return <span className={`loading loading-bars loading-${size}`}></span>;
};

export default PageLoader;
