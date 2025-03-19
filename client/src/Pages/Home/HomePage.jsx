import React, { useEffect } from "react";
import { AuthHome, NotAuthHome } from "../Home/index.js";

const HomePage = ({ userData }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return userData ? (
    <AuthHome userData={userData} />
  ) : (
    <NotAuthHome userData={userData} />
  );
};

export default HomePage;
