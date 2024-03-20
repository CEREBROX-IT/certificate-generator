import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BridgetteLogo from "./../assets/bridgette-logo.webp";
import GetStarted from "../components/GetStarted";
import AuthenticationModal from "../components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import { getUserDatafromToken } from "../utils/extractJWT";

const Landing = () => {
  const navigate = useNavigate();
  const userData = getUserDatafromToken();
  const userStatus = userData ? userData.decodedToken.status : false;
  const [AuthModal, setAuthModal] = useState(false);
  const [openTemplateOption, setTemeplateOption] = useState(false);

  const OpenModalHandler = () => {
    if (userStatus === true) {
      setTemeplateOption(true);
    } else {
      setAuthModal(true);
    }
  };

  const CloseModalHandler = () => {
    setTemeplateOption(false);
    setAuthModal(false);
  };

  return (
    <>
      {openTemplateOption && (
        <GetStarted
          openModal={openTemplateOption}
          closeModal={CloseModalHandler}
        />
      )}
      {AuthModal && (
        <AuthenticationModal
          openModal={AuthModal}
          closeModal={CloseModalHandler}
        />
      )}

      <Navbar />
      <div className="font-oxygen h-full w-full flex flex-col items-center">
        <section className="flex flex-col mt-[90px] px-4 w-full md:w-[800px]">
          <img src={BridgetteLogo} className="h-[95px] w-[95px] mx-auto" />
          <p className="font_sansita text-center font-bold text-[25px] md:text-[34px]">
            BRIDGETTE
          </p>
          <h1 className="text-[#ED6559] font_sansita font-bold text-[30px] md:text-[70px] mt-[-0.4rem] md:mt-[-1.4rem] text-center">
            CERTIFICATE GENERATOR
          </h1>
          <p className="text-[14px] md:text-[24px] text-center">
            Generate input effortlessly and receive instant rewards.
          </p>
        </section>
        <button
          onClick={OpenModalHandler}
          className="text-[#F5D45E] text-[20px] font-bold mt-[55px] border-[#F5D45E] border-[3px] p-2 rounded-[10px] w-[220px] hover:bg-[#F5D45E] hover:text-white"
        >
          Get Started
        </button>

        {/* -----User Manual on how to use----- */}
        <div className="relative bg-[#323232] w-full h-full mt-[60px]">
          <div className="flex flex-col w-[900px] bg-red-300 mx-auto">
            <p>user manual</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Landing;
