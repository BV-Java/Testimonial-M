import React, { useState } from "react";
import { ButtonBlack } from "../../components/Buttons/index.js";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { ActionSpinner } from "../../Skeleton/index.js";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const queryclient = useQueryClient();

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async (formData) => {
      try {
        const { data } = await axios.post("/api/users/v1/sign-in", formData);
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "An unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      queryclient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/");
      toast.success("Logged in Successfully");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  return (
    <div className="min-h-[88vh] flex items-center justify-center mx-2 overflow-hidden">
      <div className="border-stroke w-full px-10 py-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <div className="flex justify-center items-center flex-col gap-5">
          <h1 className="flex font-poppins font-medium md:text-4xl text-2xl gap-1">
            Testimonial <span className="text-error">Manager</span>
          </h1>
          <img className="w-32 sm:block hidden" src={assets.logo} alt="" />
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-col w-full max-w-[360px] gap-9"
        >
          <h1 className="text-center text-xl sm:text-3xl font-montserrat font-medium flex items-center justify-center gap-4">
            <img className="w-7 block sm:hidden" src={assets.logo} alt="" />
            Welcome Back
          </h1>

          <input
            type="email"
            placeholder="Enter You Email"
            className="bg-base-300 font-outfit sm:text-xl p-3 outline-none rounded-sm"
            name="email"
            onChange={onChangeHandler}
          />
          <input
            type="password"
            placeholder="Enter Your Password"
            className="bg-base-300 font-outfit sm:text-xl p-3 outline-none rounded-sm"
            name="password"
            onChange={onChangeHandler}
          />

          <div className="flex justify-between text-sm font-outfit">
            <Link to={"/register"} className="cursor-pointer hover:underline">
              Don't have an account?
            </Link>
            <span
              onClick={(e) => toast.error("Upcoming Feature")}
              className="cursor-pointer hover:underline"
            >
              Forgot Password?
            </span>
          </div>

          <div className="flex justify-center items-center">
            <ButtonBlack text={"Login"} isPending={isPending} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
