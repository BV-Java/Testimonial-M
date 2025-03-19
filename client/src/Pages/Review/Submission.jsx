import React, { useEffect } from "react";
import { Hero, Form } from "../../components/Submission/index.js";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Submission = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { searchParams } = new URL(document.location);
  const pass = searchParams.get("pass") || "";
  const navigate = useNavigate();

  console.log(pass);

  const {
    data: projectReviewData,
    isLoading,
    isFetching,
    err,
  } = useQuery({
    queryKey: ["submission", pass],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          "/api/projects/v1/projects-review/" + pass
        );
        console.log(data.project);
        return data.project;
      } catch (error) {
        navigate("/no-access");
        throw new Error(error?.response?.data?.error);
      }
    },
  });

  return (
    <div className="px-2">
      <Hero
        projectReviewData={projectReviewData}
        isLoading={isLoading}
        isFetching={isFetching}
      />
      {projectReviewData && <Form id={projectReviewData._id} />}
    </div>
  );
};

export default Submission;
