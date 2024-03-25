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
import { deleteSession } from "../redux/slice/session/resetSession";
import sample from "./../assets/certificate-sample/two_signature.webp";
import { Button } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "../components/Footer";

AOS.init({
  duration: 1000,
  easing: "ease",
});

const Landing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionStatus = useSelector((state) => state.getSession?.data?.message);
  const DeleteStatus = useSelector((state) => state.deleteSession?.status);
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

  const ResetSessionHandler = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the session?"
    );

    if (confirmReset) {
      dispatch(deleteSession(userID));
    }
  };

  useEffect(() => {
    if (DeleteStatus === "succeeded") {
      window.location.href = "/";
    }
  }, [DeleteStatus]);

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
      <div className="font-oxygen h-[100%] w-full flex flex-col items-center">
        <section className="flex flex-col mt-[90px] px-4 w-full md:w-[800px]">
          <div className="w-full" data-aos="zoom-in">
            <img src={BridgetteLogo} className="h-[95px] w-[95px] mx-auto" />
            <p className="font_sansita text-center font-bold text-[25px] md:text-[34px]">
              BRIDGETTE
            </p>
          </div>

          <div className="w-full" data-aos="zoom-in">
            <h1 className="text-[#ED6559] font_sansita font-bold text-[30px] md:text-[70px] mt-[-0.4rem] md:mt-[-1.4rem] text-center">
              CERTIFICATE GENERATOR
            </h1>
            <p className="text-[14px] md:text-[24px] text-center">
              Generate effortlessly and receive instant outputs.
            </p>
          </div>
        </section>
        <section className="h-[170px]">
          {SessionStatus === "Session found" ? (
            <button
              onClick={() => {
                navigate("/academic-excellence/");
              }}
              className="text-[#F5D45E] text-[20px] font-bold mt-[55px] border-[#F5D45E] border-[3px] p-2 rounded-[10px] w-[220px] hover:bg-[#F5D45E] hover:text-white"
            >
              Continue
            </button>
          ) : SessionStatus === "Session not found" ? (
            <button
              onClick={OpenModalHandler}
              className="text-[#F5D45E] text-[20px] font-bold mt-[55px] border-[#F5D45E] border-[3px] p-2 rounded-[10px] w-[220px] hover:bg-[#F5D45E] hover:text-white"
            >
              Get Started
            </button>
          ) : (
            <button
              disabled
              className="text-[#F5D45E] text-[20px] font-bold mt-[55px] border-[#F5D45E] border-[3px] p-2 rounded-[10px] w-[220px] hover:bg-[#F5D45E] hover:text-white"
            >
              Loading
            </button>
          )}
        </section>
        {/* -----User Manual on how to use----- */}
        <div className="relative bg-[#323232] min-w-full h-full mt-[60px] overflow-hidden pb-10">
          <div className="flex flex-col lg:w-[900px] w-full h-full mx-auto px-4 lg:px-0">
            <h1
              className="font-bold font_sansita text-[45px] text-[#F5D45E]"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              How to Use?
            </h1>
            <p
              className="text-white mb-32 md:w-[80%] md:text-start text-justify"
              data-aos="fade-right"
              data-aos-offset="300"
              data-aos-easing="ease-in-sine"
            >
              Here are the comprehensive steps detailing how to effectively
              utilize the system for creating and generating certificates for
              students, ensuring a streamlined process from initial setup to
              final certificate issuance.
            </p>
            {/* -------Step 1-------- */}
            <div
              className="flex md:flex-row flex-col w-full justify-end gap-4 mb-20"
              data-aos="fade-up-left"
              data-aos-anchor-placement="center-bottom"
            >
              <div className="flex flex-col md:w-[420px] md:mr-2 ">
                <p className="font-bold font_sansita text-[34px] text-[#F5D45E] md:text-end">
                  Step 1
                </p>

                <p className="lg:text-end text-justify text-white text-[15px]">
                  <span className="font-bold text-[#F5D45E]">
                    Prepare Template{" "}
                  </span>
                  - Design a landscape-oriented certificate template on a
                  letter-size (8.5 x 11) background. Ensure the template meets
                  your design preferences. You can download the sample template
                  file from{" "}
                  <span className="text-[#47A2FF] hover:underline z-10 cursor-pointer">
                    Link
                  </span>{" "}
                </p>
              </div>
              <img
                src={sample}
                className="h-[250px] w-[360px] transform md:rotate-[7deg] lg:mr-[-7rem] bg-slate-400"
              />
            </div>
            {/* -------Step 1 end-------- */}
            {/* -------Step 2-------- */}
            <div
              className="flex md:flex-row flex-col-reverse w-full justify-start gap-4 mb-20"
              data-aos="fade-up-right"
              data-aos-anchor-placement="center-bottom"
            >
              <img
                src={sample}
                className="h-[250px] w-[360px] transform md:rotate-[-7deg] lg:ml-[-7rem] bg-slate-400"
              />
              <div className="flex flex-col md:w-[420px] md:ml-2">
                <p className="font-bold font_sansita text-[34px] text-[#F5D45E] text-start">
                  Step 2
                </p>
                <p className="lg:text-start text-justify text-white text-[15px]">
                  <span className="font-bold text-[#F5D45E]">
                    Organize Student Data{" "}
                  </span>
                  - Compile a list of students per section with their grades in
                  an Excel file. Columns should be labeled "awardeeName" and
                  "avg" to maintain consistency and prevent errors. Download a
                  sample Excel file from{" "}
                  <span className="text-[#47A2FF] hover:underline z-10 cursor-pointer">
                    Link
                  </span>{" "}
                  for reference.
                </p>
              </div>
            </div>
            {/* -------Step 2 end-------- */}
            {/* -------Step 3-------- */}
            <div
              className="flex md:flex-row flex-col w-full justify-end gap-4 mb-20"
              data-aos="fade-up-left"
              data-aos-anchor-placement="center-bottom"
            >
              <div className="flex flex-col md:w-[420px] md:mr-2 ">
                <p className="font-bold font_sansita text-[34px] text-[#F5D45E] md:text-end">
                  Step 3
                </p>
                <p className="lg:text-end text-justify text-white text-[15px]">
                  <span className="font-bold text-[#F5D45E]">
                    Create Account{" "}
                  </span>
                  - If new to the system, sign up by clicking the login button
                  and then the get started button.
                </p>
              </div>
              <img
                src={sample}
                className="h-[250px] w-[360px] transform md:rotate-[7deg] lg:mr-[-7rem] bg-slate-400"
              />
            </div>
            {/* -------Step 3 end-------- */}
            {/* -------Step 4-------- */}
            <div
              className="flex md:flex-row flex-col-reverse w-full justify-start gap-4 mb-20"
              data-aos="fade-up-right"
              data-aos-anchor-placement="center-bottom"
            >
              <img
                src={sample}
                className="h-[250px] w-[360px] transform md:rotate-[-7deg] lg:ml-[-7rem] bg-slate-400"
              />
              <div className="flex flex-col md:w-[420px] md:ml-2">
                <p className="font-bold font_sansita text-[34px] text-[#F5D45E] text-start">
                  Step 4
                </p>
                <p className="lg:text-start text-justify text-white text-[15px]">
                  <span className="font-bold text-[#F5D45E]">
                    Set Up Session{" "}
                  </span>
                  - Configure the session by selecting certificate categories,
                  total signatures, and attaching the certificate background
                  prepared in Step 1. Fill in remaining details such as grade
                  level, school name, section, and attach signatory signatures.
                </p>
              </div>
            </div>
            {/* -------Step 4 end-------- */}
            {/* -------Step 5-------- */}
            <div
              className="flex md:flex-row flex-col w-full justify-end gap-4 mb-20"
              data-aos="fade-up-left"
              data-aos-anchor-placement="center-bottom"
            >
              <div className="flex flex-col md:w-[420px] md:mr-2 ">
                <p className="font-bold font_sansita text-[34px] text-[#F5D45E] md:text-end">
                  Step 5
                </p>
                <p className="lg:text-end text-justify text-white text-[15px]">
                  <span className="font-bold text-[#F5D45E]">
                    Generate Certificate{" "}
                  </span>
                  - Proceed to the dashboard after setting up the session.
                  Import the Excel file prepared in Step 2 or manually input
                  awardee names. The system automatically ranks students and
                  excludes those not meeting criteria. Generate certificates by
                  clicking the "Print All" button.
                </p>
              </div>
              <img
                src={sample}
                className="h-[250px] w-[360px] transform md:rotate-[7deg] lg:mr-[-7rem] bg-slate-400"
              />
            </div>
            {/* -------Step 5 end-------- */}
            {/* -------Step 6-------- */}
            <div
              className="flex md:flex-row flex-col-reverse w-full justify-start gap-4 mb-20"
              data-aos="fade-up-right"
              data-aos-anchor-placement="center-bottom"
            >
              <img
                src={sample}
                className="h-[250px] w-[360px] transform md:rotate-[-7deg] lg:ml-[-7rem] bg-slate-400"
              />
              <div className="flex flex-col md:w-[420px] md:ml-2">
                <p className="font-bold font_sansita text-[34px] text-[#F5D45E] text-start">
                  Step 6
                </p>
                <p className="lg:text-start text-justify text-white text-[15px]">
                  <span className="font-bold text-[#F5D45E]">
                    Manage Batches{" "}
                  </span>
                  - To handle different certificate formats for another batch of
                  awardees, reset the current session by clicking the trash
                  button. Repeat Step 4 to configure the new session and proceed
                  accordingly.
                </p>
              </div>
            </div>
            {/* -------Step 6 end-------- */}
            {/* -------Step 7-------- */}
            <div
              className="flex md:flex-row flex-col w-full justify-end gap-4 mb-20"
              data-aos="fade-up-left"
              data-aos-anchor-placement="center-bottom"
            >
              <div className="flex flex-col md:w-[320px] md:mr-2 ">
                <p className="font-bold font_sansita text-[34px] text-[#F5D45E] md:text-end">
                  Step 7
                </p>
                <p className="lg:text-end text-justify text-white text-[15px]">
                  <span className="font-bold text-[#F5D45E]">
                    Update Profile{" "}
                  </span>
                  - Access the user icon on the menu and click "Edit Profile" to
                  update personal details such as first name and last name.
                  Change the password through the same menu option under "Edit
                  Profile".
                </p>
              </div>
              <img
                src={sample}
                className="h-[250px] w-[360px] transform md:rotate-[7deg] lg:mr-[-7rem] bg-slate-400"
              />
            </div>
            {/* -------Step 7 end-------- */}
          </div>
        </div>
        <Footer />
      </div>

      {SessionStatus === "Session found" && (
        <>
          <div className="fixed md:right-7 md:bottom-7 right-4 bottom-4">
            <Tooltip
              title="Reset current session to create new session."
              placement="left"
            >
              <Button
                onClick={ResetSessionHandler}
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
      )}
    </>
  );
};

export default Landing;
