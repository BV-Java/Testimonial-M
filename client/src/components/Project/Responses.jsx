import React, { useState, useEffect } from "react";
import { Testimonial } from "../../components/Project/index.js";
import { ChangePage } from "../Project/index.js";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ActionSpinner } from "../../Skeleton/index.js";

const Responses = ({ projectData, id, isProjectLoading, isFetching }) => {
  const [dropDown, setDropDown] = useState("All");
  const [state, setState] = useState(projectData?.response);
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();

  const { mutate, isPending: changePending } = useMutation({
    mutationFn: async (newState) => {
      try {
        const { data } = await axios.post(`/api/reviews/v1/regulate/${id}`, {
          state: newState,
        });
        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
    },
  });

  const onStateChange = () => {
    const newState = !state;
    setState(newState);
    mutate(newState);
  };

  const {
    data: testData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["testimonials", id, currentPage, dropDown], // ✅ Include dropDown
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/api/reviews/v1/get-reviews/${id}?page=${currentPage}&filter=${dropDown}` // ✅ Pass dropDown
        );
        console.log(data);

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    keepPreviousData: true,
  });

  // 🔥 Force refetch when `dropDown` changes
  useEffect(() => {
    refetch();
  }, [dropDown, refetch]);

  // 🔥 Reset page to 1 when dropdown changes
  useEffect(() => {
    setCurrentPage(1);
  }, [dropDown]);

  return (
    <section className="mt-20 p-2">
      <div className="flex gap-4">
        <h1 className="font-poppins text-2xl text-error font-medium">
          Responses
        </h1>
        <button
          onClick={() => onStateChange()}
          className={`px-4 py-1 ${
            projectData?.response ? "bg-error" : "bg-success"
          }
            font-outfit font-light text-[15px] text-base-300 rounded-md select-none flex items-center justify-center`}
        >
          {`${projectData?.response ? "Stop" : "Start"}`}
          {(changePending || isProjectLoading || isFetching) && (
            <ActionSpinner />
          )}
        </button>
      </div>

      <>
        <div className="w-full border-stroke mt-10 select-none p-10">
          <div className="w-full">
            <select
              className="appearance-none font-poppins font-light text-4xl w-full max-w-96 outline-none cursor-pointer"
              value={dropDown}
              onChange={(e) => setDropDown(e.target.value)}
            >
              <option
                className="bg-gray-200 text-center cursor-pointer text-sm"
                value="All"
              >
                All
              </option>
              <option
                className="bg-gray-200 text-center cursor-pointer text-sm"
                value="Reported"
              >
                Reported
              </option>
              <option
                className="bg-gray-200 text-center cursor-pointer text-sm"
                value="Sus"
              >
                Sus
              </option>
            </select>

            <div className="mt-20 w-full flex flex-col justify-items-center">
              {isLoading ? (
                <p>Loading Testimonials...</p>
              ) : (
                testData?.reviews?.map((testimonial) => (
                  <Testimonial
                    key={testimonial._id}
                    testimonialData={testimonial}
                  />
                ))
              )}
            </div>

            <ChangePage
              currentPage={currentPage}
              totalPages={testData?.totalPages || 1}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      </>
    </section>
  );
};

export default Responses;
