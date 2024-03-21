import React from "react";
import Error404 from "./../assets/error404.webp";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row h-[100vh] w-full md:justify-between">
        <section className="md:w-[50%] flex flex-col justify-center ">
          <img
            src={Error404}
            className=" object-contain bg-no-repeat md:h-[350px] h-[200px] md:my-auto mt-[100px]"
          />
        </section>
        <section className="w-full md:w-[50%] flex flex-col justify-center md:pr-10 lg:pr-20 md:mt-[-5rem]  items-center md:items-start px-10 md:px-0">
          <h1 className="font_sansita font-bold lg:text-[140px] text-[80px]">
            404
          </h1>
          <h2 className=" font-bold lg:text-[50px] text-[30px] md:mt-[-2rem] mt-[-1rem] ">
            Page Not Found
          </h2>
          <p className="lg:text-[20px] text-[15px] text-center md:text-left">
            We're sorry, the page you requested could not be found. Please go
            back to the homepage!
          </p>
          <button
            className="text-[24px] bg-[#47A2FF] mt-10 w-[300px] p-2 font-bold rounded-md text-white"
            onClick={() => {
              navigate("/");
            }}
          >
            Go Back
          </button>
        </section>
      </div>
    </>
  );
};

export default NotFound;
