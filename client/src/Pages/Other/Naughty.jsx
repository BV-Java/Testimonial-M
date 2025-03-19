import React from "react";
import { assets } from "../../assets/assets.js";
import { ButtonBlack } from "../../components/Buttons/index.js";
import { Link } from "react-router-dom";

const LostWay = () => {
  return (
    <section className="min-h-[88vh] flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4">
        <img className="w-32" src={assets.logo} alt="" />
        <h1 className="font-outfit text-6xl">You Naughty Naughty🤧</h1>
        <h2 className="font-outfit font-light text-2xl">
          Trying to play with Url?
        </h2>
        <Link to={"/"}>
          <ButtonBlack text={"Home Page"} />
        </Link>
        <h2 className="font-outfit text-error text-4xl">
          4<span className="text-3xl">🤡</span>4 Not Found
        </h2>
      </div>
    </section>
  );
};

export default LostWay;
