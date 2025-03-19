import React from "react";
import { ButtonBlack } from "../Buttons/index.js";
import { passData } from "../../Data/userData.js";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

const Passcode = ({ id }) => {
  const queryClient = useQueryClient();
  const { data: passData, isLoading } = useQuery({
    queryKey: ["pass", id],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/projects/v1/generated/" + id);
        console.log(data.project);
        return data.project;
      } catch (error) {
        throw new Error(error?.response?.data?.error);
      }
    },
  });

  const { mutate: passcode, isPending: passcodePending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.post("/api/projects/v1/passcode/" + id);
        return data;
      } catch (error) {
        throw new Error(error?.response?.data?.error);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["pass", id] });
    },
  });

  const { mutate: passkey, isPending: passkeyPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.post("/api/projects/v1/passkey/" + id);
        return data;
      } catch (error) {
        throw new Error(error?.response?.data?.error);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["pass", id] });
    },
  });

  const {
    mutate: url,
    err,
    isPending: urlPending,
  } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.post(
          "/api/projects/v1/generate-Url/" + id
        );
        console.log(data);

        return data;
      } catch (error) {
        console.log(error?.response?.data?.error);

        throw new Error(error?.response?.data?.error);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      queryClient.invalidateQueries({ queryKey: ["pass", id] });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <section className="mt-20 mb-20 px-2">
      <h1 className="text-[40px] font-nunito font-medium text-black mb-10">
        Generate <span className="text-error">Pass Codes</span>:
      </h1>
      <div className="flex justify-end items-end sm:justify-center px-5">
        <div className="flex flex-col md:flex-row gap-20 ">
          <div className="flex flex-col justify-center items-center gap-3">
            <p className="font-nunito font-medium text-[16px]">
              Pass code :{" "}
              {passData?.passcode
                ? passData?.passcode
                : "No Passcode Available"}
            </p>
            <div onClick={() => passcode()}>
              <ButtonBlack isPending={passcodePending} text={"Generate Pass"} />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <p className="font-nunito font-medium text-[16px]">
              Pass Key :{" "}
              {passData?.passkey ? passData?.passkey : "No Passkey Available"}
            </p>
            <div onClick={() => passkey()}>
              <ButtonBlack isPending={passkeyPending} text={"Generate Key"} />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-3">
            <p className="font-nunito font-medium text-[16px]">
              Url :{" "}
              {passData?.publicUrl ? (
                <Link
                  to={`/submission/?pass=${passData?.passcode}`}
                  className="text-blue-500 underline text-[16px]"
                >
                  Click Here
                </Link>
              ) : (
                "No Url"
              )}
            </p>
            <div onClick={() => url()}>
              <ButtonBlack isPending={urlPending} text={"Generate URL"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Passcode;
