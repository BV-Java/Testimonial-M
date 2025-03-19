import React, { useEffect, useState } from "react";
import { assets } from "../../../assets/assets";
import { useNavigate } from "react-router-dom";
import { ButtonArrow } from "../../Buttons/index.js";

const Hero = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(email);
  }, [email]);

  return (
    <section className="flex flex-col gap-10 px-3">
      <div className="flex flex-col items-start justify-center gap-1">
        <img className="w-36 h-36 mb-6" src={assets.logo} alt="" />
        <h1 className="font-poppins text-[40px] font-light">Welcome User</h1>
        <h2 className="font-outfit text-2xl font-extralight">
          Manage And Collect{" "}
          <span className="text-primary font-normal">Testimonials</span>
        </h2>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate(`/register?emailId=${email}`);
        }}
        className="flex gap-4"
      >
        <input
          required
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your Email"
          className="bg-neutral-content/75 text-base-content placeholder:text-base-content max-w-[450px] px-1 py-2 rounded-md outline-none w-full"
        />
        <ButtonArrow text={"Create"} />
      </form>
    </section>
  );
};

export default Hero;
