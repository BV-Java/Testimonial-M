import React from "react";
import { Steps } from "../index.js";
import { Step1, Step2 } from "../../../Data/userData.js";

const Goto = () => {
  return (
    <section className="flex flex-col gap-20 px-1 mb-20">
      <div className="flex justify-between flex-col lg:flex-row items-center">
        <div>
          <Steps Step={Step1} />
        </div>

        <div className="w-full max-w-[430px]  bg-gray-300"></div>
      </div>

      <div className="flex justify-between flex-col lg:flex-row items-center">
        <div className="w-full max-w-[430px]  bg-gray-300"></div>

        <div>
          <Steps Step={Step2} />
        </div>
      </div>
    </section>
  );
};

export default Goto;
