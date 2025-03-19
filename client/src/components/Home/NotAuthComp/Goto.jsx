import React from "react";
import { Steps } from "../index.js";
import { Step1, Step2 } from "../../../Data/userData.js";

const Goto = () => {
  return (
    <section className="flex flex-col gap-20">
      <div className="flex justify-between">
        <div>
          <Steps Step={Step1} />
        </div>

        <div className="w-[430px] h-96 bg-gray-300"></div>
      </div>

      <div className="flex justify-between">
        <div className="w-[430px] h-96 bg-gray-300"></div>

        <div>
          <Steps Step={Step2} />
        </div>
      </div>
    </section>
  );
};

export default Goto;
