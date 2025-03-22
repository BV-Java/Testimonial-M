import React from "react";
import { HeroNotAuth, Goto } from "../../components/Home/index.js";
import { Navbar } from "../../components/Layout/index.js";
import Footer from "../../components/Layout/Footer.jsx";

const NotAuthHome = () => {
  return (
    <div>
      {/* nav */}
      <Navbar />
      <HeroNotAuth />
      <hr className="border-none h-[1px] w-full bg-black/40 mt-10 mb-10" />
      <Goto />
      <Footer />
    </div>
  );
};

export default NotAuthHome;
