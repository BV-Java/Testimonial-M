import React, { useEffect, useMemo, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { CiSearch } from "react-icons/ci";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = ({ userData }) => {
  const [dropDown, setDropDown] = useState(false);
  const dropDownRef = useRef(null);
  const location = useLocation();
  // let userData = false;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: logout,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.post("/api/users/v1/sign-out", {});
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "An unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      toast.success("Logged out Successfully");
      queryClient.setQueryData(["auth"], null);
    },
  });

  useEffect(() => {
    const handleMouse = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setDropDown(false);
      }
    };

    if (dropDown) {
      document.addEventListener("mousedown", handleMouse);
    }

    return () => {
      document.removeEventListener("mousedown", handleMouse);
    };
  }, [dropDown]);

  const onLogoutHandler = () => {
    logout();
  };

  return (
    <div
      className={`${
        userData ? "bg-base-200/75" : "bg-transparent"
      } bg-base-200/75 flex justify-between sm:gap-10 h-[70px] px-5 rounded-md font-outfit select-none`}
    >
      {userData && (
        <>
          {/* Left */}
          <div className="flex justify-start w-full sm:pr-5 pr-1 gap-2">
            {/* logo */}
            <Link
              to={"/"}
              className=" flex items-center justify-center sm:w-14 w-10"
            >
              <img src={assets.logo} alt="logo" className="w-10" />
            </Link>
          </div>

          {/* Right */}
          <div className="flex sm:gap-5 gap-2 justify-end">
            {/* Buttons */}
            <div className="flex justify-center items-center sm:gap-5 text-xs md:text-xl sm:text-lg">
              <Link
                to={"/"}
                className={`px-2 py-1 ${
                  location.pathname.startsWith("/project/")
                    ? "bg-transparent hover:underline"
                    : "bg-base-content text-neutral-content"
                }   rounded-lg text-center cursor-pointer`}
              >
                Projects
              </Link>
              <button className="px-2 py-1 hover:bg-neutral-content active:bg-neutral-content/80 rounded-lg cursor-pointer">
                Documentation
              </button>
            </div>

            {/* Profile */}
            <div
              className="flex items-center justify-center w-11 cursor-pointer group relative"
              ref={dropDownRef}
            >
              {/* ! Icon */}
              <div
                onClick={() => setDropDown(!dropDown)}
                className="px-4 bg-white rounded-full aspect-square flex items-center justify-center"
              >
                <p className="select-none">{userData?.user?.name[0]}</p>
              </div>

              {/* // Todo : Make the dropdown disappear, when clicking out side, useRef */}
              {/* DropDown */}
              {dropDown && (
                <div className="flex absolute z-20 flex-col w-44  text-[20px] bg-neutral top-14 -right-5 text-neutral-content items-center justify-center px-3 py-4 rounded-md select-none gap-1">
                  <p
                    onClick={(e) => onLogoutHandler(e)}
                    className="active:underline"
                  >
                    Log out
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {!userData && (
        <>
          <div className="flex justify-end items-center w-full gap-5">
            <button className="px-2 py-1 hover:underline active:bg-neutral-content/80 rounded-lg cursor-pointer">
              Documentation
            </button>

            <Link
              to={"/login"}
              className="px-2 py-1 bg-base-content text-neutral-content rounded-lg text-center cursor-pointer"
            >
              Login
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
