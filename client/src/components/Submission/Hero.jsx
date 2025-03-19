import React from "react";

const Hero = ({ projectReviewData, isLoading, isFetching }) => {
  if (isLoading || isFetching) {
    return (
      <section className="">
        <div className="w-full mt-20 flex flex-col gap-5">
          <h1 className="font-outfit font-extralight text-6xl"></h1>
          <h2 className="font-poppins font-light text-xl">
            <span className="text-primary font-medium"></span>
          </h2>
          <div className="flex gap-5 flex-col sm:flex-row">
            {/* Left - Image Skeleton */}
            <div className="min-w-44 min-h-44 w-44 h-44 flex justify-center items-center relative rounded-md overflow-hidden select-none bg-gray-300 animate-pulse">
              <div className="w-full h-full absolute bg-gray-300"></div>
            </div>

            {/* Right - Text Skeleton */}
            <div className="flex flex-col justify-between w-full gap-3">
              <div className="w-40 h-8 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="w-full mt-20 flex flex-col gap-5">
        <h1 className="font-outfit font-extralight text-6xl">Hi</h1>
        <h2 className="font-poppins font-light text-xl">
          Please take a moment to provide feedback for{" "}
          <span className="text-primary font-medium">
            {projectReviewData?.projectName}
          </span>
          . It only takes a few seconds!
        </h2>
        <div className="flex gap-5 flex-col sm:flex-row">
          <div className="min-w-44 min-h-44 w-44 h-44 flex justify-center items-center relative rounded-md overflow-hidden select-none">
            <div className="w-full bg-[#252859]/20 h-full absolute"></div>
            <img className="w-1/2" src={projectReviewData?.logo} alt="" />
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-poppins text-5xl">
              {projectReviewData?.projectName}
            </h1>
            <h2 className="font-poppins font-light text-xl text-[#0037FF]">
              {projectReviewData?.organization}
            </h2>
            <span className="text-[13px] text-gray-700 font-nunito">
              {projectReviewData?.description}
            </span>
            <span className="text-error font-poppins font-light text-[15px]">
              {projectReviewData?.category}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
