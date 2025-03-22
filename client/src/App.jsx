import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AuthHome, HomePage, NotAuthHome } from "./Pages/Home/index.js";
import { Project } from "./Pages/Project/index.js";
import { Register, Login } from "./Pages/Auth/index.js";
import { Submission } from "./Pages/Review/index.js";
import { LostWay, Naughty } from "./Pages/Other/index.js";
import { PageLoader } from "./Skeleton/index.js";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import TestimonialNPMPackageDocs from "./Pages/Other/TestimonialNPMPackageDocs.jsx";
import Footer from "./components/Layout/Footer.jsx";

const App = () => {
  const location = useLocation();

  const {
    data: userData,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const { data } = await axios.get("/api/users/v1/me");

        return data;
      } catch (error) {
        throw new Error(error.response.data.error);
      }
    },
    retry: false,
  });

  if (isLoading || isFetching)
    return (
      <div className="min-h-[88vh] flex items-center justify-center">
        <PageLoader size="lg" />
      </div>
    );

  return (
    <div className="relative">
      <div
        className={`max-w-[1120px] mx-auto py-3 min-h-screen ${
          location.pathname.startsWith("/project/") ||
          location.pathname === "/register" ||
          location.pathname === "/login"
            ? "bg-white"
            : "bg-abstract  bg-top bg-[length:150%] bg-no-repeat"
        }`}
      >
        <Routes>
          <Route
            path="/"
            element={
              userData ? (
                <AuthHome userData={userData} />
              ) : (
                <NotAuthHome userData={userData} />
              )
            }
          />
          <Route
            path="/project/:id"
            element={userData ? <Project /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/register"
            element={!userData ? <Register /> : <Navigate to={"/"} />}
          />
          <Route
            path="/login"
            element={!userData ? <Login /> : <Navigate to={"/"} />}
          />
          <Route path="/submission" element={<Submission />} />
          <Route path="/docs" element={<TestimonialNPMPackageDocs />} />
          <Route path="/*" element={<LostWay />} />
          <Route path="/no-access" element={<Naughty />} />
        </Routes>
      </div>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
