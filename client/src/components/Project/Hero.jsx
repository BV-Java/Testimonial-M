import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { ButtonBlack } from "../Buttons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ActionSpinner, ImageLoader } from "../../Skeleton/index.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Hero = ({ id, isLoading, isFetching }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const projectData = queryClient.getQueryData(["project", id]);

  // Image
  const [img, setImg] = useState();

  // Image preview
  const [preview, setPreview] = useState(null);

  const imgRef = useRef(null);
  const [form, setForm] = useState({
    projectName: projectData?.projectName,
    description: projectData?.description,
    organization: projectData?.organization,
    category: projectData?.category,
    status: projectData?.status,
  });

  useEffect(() => {
    setForm({
      ...form,
      projectName: projectData?.projectName || "",
      description: projectData?.description || "",
      organization: projectData?.organization || "",
      category: projectData?.category || "",
      status: projectData?.status || "",
    });

    // image becomes the logo
    setImg(projectData?.logo);
  }, [isLoading, isFetching]);

  const {
    mutate: del,
    isPending: pendingDelete,
    isError,
    err,
  } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await axios.delete("/api/projects/v1/delete/" + id);
        return data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "An unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      navigate("/");
    },
  });

  const {
    mutate: edit,
    isPending: pendingEdit,
    isError: isEditError,
    err: editError,
  } = useMutation({
    mutationFn: async (formData) => {
      try {
        const { data } = await axios.patch(
          "/api/projects/v1/edit/" + id,
          formData
        );
      } catch (error) {
        throw new Error(error?.response?.data?.error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      queryClient.invalidateQueries({ queryKey: ["pass", id] });
      document.getElementById("edit_modal").close();
    },
    onError: (editError) => {
      toast.error(editError.message || "Something went wrong");
    },
  });

  const onDeleteHandler = async () => {
    del();
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("projectName", form.projectName);
    formData.append("description", form.description);
    formData.append("organization", form.organization);
    formData.append("category", form.category);
    formData.append("status", form.status);
    console.log("Existing Img", img);

    if (img instanceof File) {
      formData.append("logo", img);
    } else {
      console.warn("Invalid image file selected");
    }
    console.log(img);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    edit(formData);
  };

  const handleImageSelect = () => {
    imgRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImg(file); // Ensure it's a File
      setPreview(URL.createObjectURL(file)); // Use preview only for display
    }
  };

  useEffect(() => {
    if (img) {
      console.log("Changed Image ", img);
    }
  }, [img]);

  const onChangeData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetData = () => {
    setForm({
      ...form,
      projectName: projectData?.projectName || "",
      description: projectData?.description || "",
      organization: projectData?.organization || "",
      category: projectData?.category || "",
    });
    setImg(projectData?.logo);
    setPreview(null);
  };

  if (isLoading || isFetching) {
    return (
      <section className="mt-20 px-2 mb-20">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left - Image Skeleton */}
          <div className="w-44 h-44 flex justify-center items-center relative rounded-md overflow-hidden select-none bg-gray-300 animate-pulse">
            <div className="w-full h-full absolute bg-gray-300"></div>
          </div>

          {/* Right - Text Skeleton */}
          <div className="flex flex-col gap-3 w-full">
            {/* Title Skeleton */}
            <div className="w-40 h-8 bg-gray-300 rounded animate-pulse"></div>

            <div className="flex flex-col sm:flex-row gap-5 w-full">
              {/* Left - Organization & Rating Skeleton */}
              <div className="flex flex-col justify-start gap-3 w-60">
                <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>

                <div className="w-full flex justify-between">
                  <div className="w-10 h-6 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-1 h-6 bg-gray-300"></div>
                  <div className="w-20 h-6 bg-gray-300 rounded animate-pulse"></div>
                </div>

                <div className="w-24 h-5 bg-gray-300 rounded animate-pulse"></div>
              </div>

              {/* Right - Status & Description Skeleton */}
              <div className="flex gap-2 w-full">
                <div className="w-1 h-[105px] bg-gray-300"></div>

                <div className="max-w-[450px] w-full flex flex-col justify-center items-start gap-2">
                  <div className="w-16 h-5 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-16 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>

                  <div className="mt-2 flex justify-center gap-4">
                    <div className="w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-24 h-10 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-20 px-2 mb-20">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-44 h-44 flex justify-center items-center relative rounded-md overflow-hidden select-none">
          <div className="w-full bg-[#252859]/20 h-full absolute"></div>
          {!imageLoaded && <ImageLoader />}
          <img
            onLoad={() => setImageLoaded(true)}
            className="w-1/2"
            src={projectData?.logo}
            alt=""
          />
        </div>
        <div>
          <h1 className="font-poppins font-medium text-5xl mb-2 text-black">
            {projectData?.projectName}
          </h1>
          <div className="flex flex-col sm:flex-row gap-5">
            {/* Left */}
            <div className="flex flex-col justify-start gap-3">
              <h2 className="font-poppins text-xl text-[#0037FF] font-light">
                {projectData?.organization}
              </h2>
              <div className="w-60 flex justify-between text-black">
                <span className="font-poppins text-xl font-light">
                  {projectData?.review}⭐
                </span>
                <div className="w-1 h-6 bg-base-200"></div>
                <span className="font-poppins text-xl font-light">
                  {projectData?.reviewsCount}+ Reviews
                </span>
              </div>
              <h2 className="font-poppins text-[15px] font-light text-error">
                {projectData?.category}
              </h2>
            </div>

            <div className="flex gap-2">
              <div className="w-1 h-[105px] bg-base-200"></div>

              {/* Right */}
              <div className="max-w-[450px] w-full flex flex-col justify-center items-start">
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[14px] text-gray-500 font-nunito">
                    {projectData?.status}
                  </span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      projectData?.status === "Inactive"
                        ? "bg-error"
                        : "bg-success"
                    }`}
                  ></div>
                </div>
                <p className="text-justify text-[13px] font-nunito text-gray-600">
                  {projectData?.description}
                </p>
                <p className="text-xs text-gray-500 font-nunito">
                  {new Date(projectData?.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </p>
                <div className="mt-2 flex justify-center gap-4 select-none">
                  <button
                    onClick={() =>
                      document.getElementById("delete_modal").showModal()
                    }
                    className="font-poppins text-xl flex text-error border border-error px-3 py-1 rounded-sm active:bg-red-900 active:text-white outline-none"
                  >
                    Delete
                    <img
                      className="w-[24px] h-[24px]"
                      src={assets.deleteBtn}
                      alt=""
                    />
                  </button>
                  <div
                    onClick={() =>
                      document.getElementById("edit_modal").showModal()
                    }
                  >
                    <ButtonBlack text={"Edit"} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Model */}
      <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Are you sure want to Delete?</h3>
          <div className="modal-action font-nunito font-extralight">
            <div
              onClick={onDeleteHandler}
              className="btn btn-success text-white flex items-center justify-center"
            >
              <p>Yes</p>
              {pendingDelete && <ActionSpinner />}
            </div>
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-error text-white">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Edit Modal */}
      <dialog
        onClose={resetData}
        id="edit_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <form
            onSubmit={onSubmitHandler}
            className="flex justify-center flex-col items-center gap-4"
          >
            <div
              className="w-16 h-16 p-4 rounded-full flex justify-center items-center select-none overflow-hidden relative cursor-pointer"
              onClick={handleImageSelect}
            >
              <div className="w-full bg-[#252859]/20 h-full absolute"></div>
              <img
                src={preview ? preview : img}
                className="w-full object-cover"
                alt=""
              />
            </div>
            <input
              onChange={handleImageChange}
              type="file"
              hidden
              ref={imgRef}
              name="logo"
            />
            <input
              type="text"
              placeholder="Enter Project Name"
              required
              className="bg-base-200 p-2 w-full outline-none font-poppins rounded-md"
              name="projectName"
              onChange={onChangeData}
              value={form.projectName}
            />
            <input
              type="text"
              placeholder="Enter Description"
              required
              className="bg-base-200 p-2 w-full outline-none font-poppins rounded-md"
              name="description"
              onChange={onChangeData}
              value={form.description}
            />
            <input
              type="text"
              placeholder="Enter Organization Name"
              required
              className="bg-base-200 p-2 w-full outline-none font-poppins rounded-md"
              name="organization"
              onChange={onChangeData}
              value={form.organization}
            />
            <div>
              <select
                name="category"
                onChange={onChangeData}
                value={form.category}
                className="outline-none font-outfit px-10"
              >
                <option className="bg-slate-500 text-white" value="Business">
                  Business
                </option>
                <option className=" bg-slate-500 text-white" value="Personal">
                  Personal
                </option>
              </select>

              <select
                name="status"
                onChange={onChangeData}
                value={form.status}
                className="outline-none font-outfit px-10"
              >
                <option className="bg-slate-500 text-white" value="Active">
                  Active
                </option>
                <option className=" bg-slate-500 text-white" value="Inactive">
                  Inactive
                </option>
              </select>
            </div>
            <div className="px-3 py-2 bg-neutral text-neutral-content rounded-lg active:bg-neutral/65 flex items-center justify-center">
              <button className="" type="submit">
                Update
              </button>
              {pendingEdit && <ActionSpinner />}
            </div>
          </form>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default Hero;
