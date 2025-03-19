import React from "react";
import { Hero, Work } from "../../components/Home/index.js";
import { Navbar } from "../../components/Layout/index.js";

const AuthHome = ({ userData }) => {
  return (
    <div>
      {/* nav */}
      <Navbar userData={userData} />

      {/* Hero */}
      <Hero userData={userData} />

      {/* Projects */}
      <Work />
    </div>
  );
};

export default AuthHome;
