import React, { useEffect, useState } from "react";
import { ButtonArrow, ButtonBlack } from "../../components/Buttons/index.js";
import { assets } from "../../assets/assets.js";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import StarRating from "../Layout/StarRating.jsx";

const Form = ({ id }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isReviewed, setIsReviewed] = useState(false);
  const [review, setReview] = useState(null);
  const [isVerified, setIsVerified] = useState(false);

  const [newReview, setNewReview] = useState({
    name: "",
    review: "",
    rating: 0,
    email: email,
  });

  useEffect(() => {
    setNewReview((prev) => ({ ...prev, email }));
  }, [email]);

  const { mutate: emailMutate } = useMutation({
    mutationFn: async (email) => {
      try {
        const { data } = await axios.post(`/api/reviews/v1/verify/${email}`, {
          id,
        });
        console.log(data);
        setReview(data.review);
        return data;
      } catch (error) {
        throw new Error(error?.response?.data?.error);
      }
    },
    onSuccess: (data) => {
      if (!data.success) {
        document.getElementById("otp_modal").showModal();
      } else {
        setIsVerified(true);
      }
      data.isReviewed ? setIsReviewed(true) : setIsReviewed(false);
    },
  });

  const { mutate: otpMutate, isPending: otpPending } = useMutation({
    mutationFn: async ({ otp, email }) => {
      try {
        const { data } = await axios.post(`/api/reviews/v1/verify-otp/${otp}`, {
          email,
          id,
        });

        console.log(data);

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    onSuccess: (data) => {
      if (data.success) {
        setIsVerified(true);
      }
      data.isReviewed ? setIsReviewed(true) : setIsReviewed(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email);
    emailMutate(email);
  };

  const onChangeHandler = (e) => {
    setNewReview((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onOtpHandler = (e) => {
    e.preventDefault();
    document.getElementById("otp_modal").close();

    otpMutate({ otp, email });
  };

  const onChangeEmail = (e) => {
    e.preventDefault();
    setEmail("");
    setOtp("");
    setIsVerified(false);
  };

  const { mutate: reviewMutate, isPending: reviewPending } = useMutation({
    mutationFn: async () => {
      try {
        console.log(newReview);

        const { data } = await axios.post(
          `/api/reviews/v1/add-review/${id}`,
          newReview
        );
        console.log(data);
        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setReview(newReview);
      setIsReviewed(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onReviewSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newReview.name);
    formData.append("review", newReview.review);
    formData.append("rating", newReview.rating);
    formData.append("email", email);

    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    reviewMutate();
  };

  return (
    <section className="mt-20 min-h-[88vh]">
      <div className="flex flex-col gap-5">
        <h1 className="font-nunito text-3xl font-light">
          Submit Your <span className="text-error font-semibold">Review</span>
        </h1>
        <form
          onSubmit={onSubmitHandler}
          className="flex gap-3 justify-start items-center"
        >
          {!isVerified && (
            <input
              required
              type="text"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Email"
              className="bg-neutral-content/75 text-base-content placeholder:text-base-content max-w-[450px] px-1 py-2 rounded-md outline-none w-full"
              value={email}
            />
          )}

          {isVerified && (
            <div className="flex justify-center items-center">
              <p className="px-1 py-2">{email}</p>
              <img src={assets.verify} className="w-6 h-6" alt="" />
            </div>
          )}

          {isVerified ? (
            <div onClick={(e) => onChangeEmail(e)}>
              <ButtonArrow text={"Change"} />
            </div>
          ) : (
            <ButtonArrow text={"Submit"} />
          )}
        </form>
      </div>

      {isVerified && (
        <>
          <hr className="border-none h-[1px] w-full bg-black/40 mt-10 mb-10" />

          <h1 className="font-nunito text-3xl font-light mb-10">Your Review</h1>

          {isReviewed && review && (
            <>
              <div className="w-full border-stroke p-2 flex flex-col gap-3 cursor-pointer select-none rounded-md">
                <div className="flex gap-2">
                  <div className="w-[6px] h-8 bg-success"></div>
                  <div className="w-8 h-8 overflow-hidden flex justify-center items-center rounded-full bg-base-300">
                    <img className="w-5" src={assets.profile} alt="" />
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <p className="pl-1 font-outfit font-light h-4">
                      {review?.name}
                    </p>
                    <p className="h-4">{"⭐".repeat(review?.rating)}</p>
                  </div>
                </div>
                <div>
                  <p className="font-outfit text-xs text-gray-500">
                    {review?.review}
                  </p>
                </div>
              </div>
            </>
          )}
          {!isReviewed && (
            <>
              <div className="max-w-[700px] w-full mx-auto bg-base-200 py-10">
                <form
                  onSubmit={onReviewSubmit}
                  className="flex flex-col gap-5 w-full justify-center items-center"
                >
                  <input
                    required
                    type="text"
                    onChange={onChangeHandler}
                    placeholder="Enter Your Name"
                    className="bg-neutral-content/75 text-base-content placeholder:text-base-content/80 max-w-[450px] px-1 py-2 rounded-md outline-none w-full placeholder:font-outfit text-outfit"
                    value={newReview.name}
                    name="name"
                  />

                  <input
                    required
                    type="text"
                    onChange={onChangeHandler}
                    placeholder="What do you think?"
                    className="bg-neutral-content/75 text-base-content placeholder:text-base-content/80 max-w-[450px] px-1 py-2 rounded-md outline-none w-full placeholder:font-outfit text-outfit"
                    value={newReview.review}
                    maxLength={100}
                    name="review"
                  />

                  <StarRating
                    borderStar={assets.black}
                    goldStar={assets.gold}
                    setNewReview={setNewReview}
                  />

                  <ButtonBlack text={"Submit"} />
                </form>
              </div>
            </>
          )}
        </>
      )}

      {/* Otp Modal */}

      <dialog
        id="otp_modal"
        className="modal modal-bottom sm:modal-middle"
        onClose={() => setOtp("")}
      >
        <form className="modal-box flex flex-col gap-2">
          <h3 className="font-bold text-lg">Enter OTP</h3>
          <p className="py-4">
            Enter the OTP which is sent to your email address
          </p>
          <input
            className="bg-base-200 w-full px-1 py-2 outline-none"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            type="submit"
            onClick={(e) => onOtpHandler(e)}
            className="btn bg-primary text-primary-content hover:text-black"
          >
            Submit
          </button>
        </form>
      </dialog>
    </section>
  );
};

export default Form;
