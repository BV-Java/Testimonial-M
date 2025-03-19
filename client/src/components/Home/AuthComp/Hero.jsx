import React, { useEffect, useRef } from "react";
import { assets } from "../../../assets/assets";
import { ImageLoader } from "../../../Skeleton/index.js";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { ActionSpinner } from "../../../Skeleton/index.js";

const Hero = ({ userData }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);
  const imgRef = useRef();

  const [form, setForm] = useState({
    projectName: "",
    description: "",
    organization: "",
    category: "Business",
  });

  const handleImageSelect = () => {
    imgRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Image Selected");
    }
    setImg(file);
    setPreview(URL.createObjectURL(file));
  };

  const onChangeData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const queryclient = useQueryClient();

  const { mutate, isPending, err } = useMutation({
    mutationFn: async (form) => {
      try {
        const { data } = await axios.post("/api/projects/v1/create", form);
        return data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.error || "An unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      form.projectName = "";
      form.description = "";
      form.organization = "";
      form.category = "Business";
      setImg(null);
      setPreview(null);
      document.getElementById("my_modal_5").close();
      queryclient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => {
      toast.error(err.message || "Something went wrong");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("projectName", form.projectName);
    formData.append("description", form.description);
    formData.append("organization", form.organization);
    formData.append("category", form.category);
    formData.append("logo", img);
    console.log(formData);
    mutate(formData);
  };

  return (
    <section className="mt-20 px-2">
      <div className="flex justify-center items-center flex-col gap-2  mx-auto">
        {/* Layer 1 Grid */}
        <div className="grid lg:grid-cols-2 grid-cols-1 justify-center items-center gap-20 w-full">
          <div className="flex items-center justify-start pr-2">
            <div className="flex flex-col gap-2">
              {/* Welcome Section */}
              <div className="flex justify-start items-end mb-3 gap-1">
                {/* Bar */}
                <div className="bg-[#209CEE] w-2 h-16"></div>

                {/* Welcome Message */}
                <h1 className="font-outfit font-extralight text-5xl">
                  Welcome {userData?.user?.name}👋
                </h1>
              </div>

              {/* SubHeading */}
              <h2 className="font-outfit text-2xl font-extralight">
                Manage And Collect{" "}
                <span className="font-normal text-primary">Testimonials</span>
              </h2>

              {/* Tips Header */}
              <h1 className="font-poppins text-5xl font-normal mt-7">
                Quick Tips
              </h1>
            </div>
          </div>

          <div className="lg:flex items-center justify-center hidden">
            <div className="h-48 w-[417px] overflow-hidden rounded-2xl relative">
              {!imageLoaded && <ImageLoader />}

              <img
                className={`object-cover w-full h-full scale-125 transition-opacity duration-500 ${
                  imageLoaded ? "opacity-100" : "opacity-0"
                }`}
                src={assets.heroImg}
                alt="Project-Logo"
                onLoad={() => setImageLoaded(true)}
                onError={() => console.error("Image failed to load")}
              />
            </div>
          </div>
        </div>
        {/* Layer 2 Tips and Button */}
        <div className="flex flex-col justify-start item-start w-full">
          <p className="font-poppins text-[16px] text-gray-600">
            "Want to display testimonials on your site? Install our{" "}
            <span className="font-bold">NPM</span> package and integrate it
            easily!"
          </p>
          <div
            onClick={() => document.getElementById("my_modal_5").showModal()}
            className="flex justify-center items-center w-60 gap-2 bg-accent active:bg-accent/80 px-3 py-2 rounded-md cursor-pointer mt-10 select-none"
          >
            <button className="text-xl outline-none">Create Project</button>
            <img className="w-6 h-6" src={assets.create} alt="" />
          </div>
        </div>
      </div>

      {/* Modal */}

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
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
                src={img ? preview : assets.project}
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
            </div>
            <div className="px-3 py-2 bg-neutral text-neutral-content rounded-lg active:bg-neutral/65 flex items-center justify-center">
              <button className="" type="submit">
                Create
              </button>
              {isPending && <ActionSpinner />}
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
