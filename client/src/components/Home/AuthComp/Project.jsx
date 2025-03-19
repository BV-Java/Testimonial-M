import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageLoader } from "../../../Skeleton/index.js";

const Project = ({ projectData }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      onClick={() => navigate(`/project/${projectData._id}`)}
      className="max-w-[455px] w-full  h-[210px] grid grid-cols-2 sm:gap-10 gap-5 shadow-md shadow-gray-500/50 p-2 font-nunito overflow-hidden cursor-pointer select-none"
    >
      <div className="max-w-[230px] overflow-hidden flex justify-center items-center relative">
        <div className="w-full bg-[#252859]/20 h-full absolute"></div>
        {/* <ImageLoader /> */}
        {!imageLoaded && <ImageLoader />}
        {/* Skeleton should load when image isn't loaded */}
        <img
          onLoad={() => setImageLoaded(true)}
          className={`md:w-28 w-20 px-2 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          src={projectData.logo}
          alt="Logo"
        />
      </div>

      <div className="flex flex-col justify-start text-justify items-start px-4">
        <p className=" text-gray-500 text-[11px] line-clamp-6">
          {projectData.description}
        </p>

        <p className="text-[13px] mt-2 font-medium">
          {projectData.projectName}
        </p>

        <div className="flex items-center gap-1">
          <p className="text-[11px] text-gray-400">{projectData.status}</p>

          <div
            className={`w-2 h-2 rounded-full aspect-square ${
              projectData.status === "Active" ? "bg-success" : "bg-error"
            }`}
          ></div>
        </div>

        <p className="text-[11px] text-gray-700">{projectData.category}</p>

        <p className="text-[11px] text-gray-700">
          {projectData.reviewsCount}+ Reviews
        </p>

        <p className="text-[11px] text-gray-500">
          {new Date(projectData?.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default Project;
