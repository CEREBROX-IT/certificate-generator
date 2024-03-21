import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { IoTrashBin } from "react-icons/io5";
import BridgetteLogo from "./../assets/bridgette-logo.webp";
import GetStarted from "../components/GetStarted";
import AuthenticationModal from "../components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { getUserDatafromToken } from "../utils/extractJWT";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../redux/slice/session/getSession";
import { Button } from "@mui/material";

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionStatus = useSelector((state) => state.getSession?.data?.message);
  const userData = getUserDatafromToken();
  const userStatus = userData ? userData.decodedToken.status : false;
  const userID = userData ? userData.decodedToken.userId : 0;
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

  console.log("get status:", SessionStatus);
  useEffect(() => {
    dispatch(getSession(userID));
  }, []);

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
        {SessionStatus === "Session not found" ? (
          <button
            onClick={OpenModalHandler}
            className="text-[#F5D45E] text-[20px] font-bold mt-[55px] border-[#F5D45E] border-[3px] p-2 rounded-[10px] w-[220px] hover:bg-[#F5D45E] hover:text-white"
          >
            Get Started
          </button>
        ) : (
          <button
            onClick={() => {
              navigate("/academic-excellence/");
            }}
            className="text-[#F5D45E] text-[20px] font-bold mt-[55px] border-[#F5D45E] border-[3px] p-2 rounded-[10px] w-[220px] hover:bg-[#F5D45E] hover:text-white"
          >
            Continue
          </button>
        )}

        {/* -----User Manual on how to use----- */}
        <div className="relative bg-[#323232] w-full h-full mt-[60px]">
          <div className="flex flex-col w-[900px] bg-red-300 mx-auto">
            <p>user manual</p>
          </div>
        </div>
      </div>

      <div className="absolute md:right-7 md:bottom-7 right-4 bottom-4">
        <Tooltip
          title="Reset current session to create new session."
          placement="left"
        >
          <Button
            sx={{
              backgroundColor: "#FF1000",
              color: "white",
              borderRadius: "50%",
              minHeight: "60px",
              minWidth: " 60px",
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "#CD0D00",
              },
            }}
          >
            <IoTrashBin className="text-[32px]" />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default Landing;
