import React from "react";

const Steps = ({ Step }) => {
  return (
    <div className="w-full max-w-[550px] flex flex-col gap-5">
      <div className="flex items-end gap-2">
        <div className="w-[5px] h-[50px] bg-primary"></div>
        <h1 className="text-4xl font-montserrat">{Step.question}</h1>
      </div>
      <div className="flex flex-col gap-3 ml-20 text-xl font-montserrat">
        <h3 className="">{Step.step1}</h3>
        <h3 className="">{Step.step2}</h3>
      </div>
    </div>
  );
};

export default Steps;
