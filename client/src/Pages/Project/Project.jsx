import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Navbar } from "../../components/Layout/index.js";
import { Hero, Passcode, Responses } from "../../components/Project/index.js";

const Project = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const userData = queryClient.getQueryData(["auth"]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    data: projectData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/projects/v1/projects/" + id);
        return data.project;
      } catch (error) {
        navigate("/no-access");
        throw new Error(error.response.data.error);
      }
    },
  });

  return (
    <div>
      <Navbar userData={userData} />
      <Hero
        id={id}
        isLoading={isLoading}
        projectData={projectData}
        isFetching={isFetching}
      />
      <hr className="h-[1px] border-none w-full bg-black/40" />
      <Passcode id={id} />
      {projectData && (
        <>
          <hr className="h-[1px] border-none w-full bg-black/40" />
          <Responses
            projectData={projectData}
            id={id}
            isProjectLoading={isLoading}
            isFetching={isFetching}
          />
        </>
      )}
    </div>
  );
};

export default Project;
