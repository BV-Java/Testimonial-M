import React from "react";
import { assets } from "../../assets/assets.js";

const Testimonial = ({ testimonialData }) => {
  return (
    <div
      className={`bg-base-200 grid md:grid-cols-[300px_100px_1fr] p-2 overflow-hidden cursor-pointer ${
        testimonialData.isSus
          ? "bg-error/15"
          : testimonialData.isReported
          ? "bg-warning/25"
          : "bg-success/15"
      }`}
    >
      <div className="flex justify-start gap-2 items-start">
        <div className="w-8 h-8 overflow-hidden flex justify-center items-center rounded-full bg-base-300">
          <img className="w-5" src={assets.profile} alt="" />
        </div>
        <div className="flex flex-col justify-center items-start">
          <p className="font-outfit font-light text-[15px] line-clamp-1">
            {testimonialData.name}
          </p>
        </div>
      </div>
      <p className="text-[12px]">{"⭐".repeat(testimonialData.rating)}</p>
      <p className="font-outfit text-[11px]  text-gray-700 line-clamp-1">
        {testimonialData.review}
      </p>
    </div>
  );
};

export default Testimonial;
