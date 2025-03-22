import React from "react";
import { Project } from "../index.js";
import { projectsData } from "../../../Data/userData.js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Work = () => {
  const {
    data: projectsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/projects/v1/projects");
        console.log(data);
        return data.projects;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
  });

  if (projectsData?.length === 0 || isLoading) {
    return <div></div>;
  }

  return (
    <section className=" mt-20 border-stroke rounded-lg mx-2 mb-56">
      <div className="px-10 py-4">
        <p className="text-[40px] font-montserrat">
          Lets <span className="font-bold text-error">Work</span>
        </p>
        <p className="text-2xl text-primary font-medium font-montserrat">
          Project
        </p>
      </div>
      <hr className="h-[1px] border-none w-full bg-black/40" />

      <div className="flex justify-center items-center">
        <div className="w-[930px] grid grid-cols-1 lg:grid-cols-2 place-items-center p-5">
          {projectsData?.map((project) => (
            <Project key={project._id} projectData={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
