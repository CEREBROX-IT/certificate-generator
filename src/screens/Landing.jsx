import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { IoTrashBin } from "react-icons/io5";
import { IoIosArrowUp } from "react-icons/io";
import BridgetteLogo from "./../assets/bridgette-logo.webp";
import SPITICFormat from "../components/FormatSession/SPITICFormat";
import AuthenticationModal from "../components/Auth/Auth";
import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { getUserDatafromToken } from "../utils/extractJWT";
import { useDispatch, useSelector } from "react-redux";
import { getSession } from "../redux/slice/session/getSession";
import { deleteSession } from "../redux/slice/session/resetSession";
import StepOne from "./../assets/user-manual/step-1.webp";
import StepTwo from "./../assets/user-manual/step-2.webp";
import StepThree from "./../assets/user-manual/step-3.webp";
import StepFour from "./../assets/user-manual/step-4.webp";
import StepFive from "./../assets/user-manual/step-5.webp";
import StepSix from "./../assets/user-manual/step-6.webp";
import StepSeven from "./../assets/user-manual/step-7.webp";
import ExcelTemplate from "./../assets/Sample-file/template-excel-file.xlsx";
import Bgtemplate from "./../assets/Sample-file/certificate_format.png";
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
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      // Adjust this value as needed to determine when the button should be shown
      const scrollThreshold = 200;
      if (scrollPosition > scrollThreshold) {
        setShowScrollToTopButton(true);
      } else {
        setShowScrollToTopButton(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs only once after initial render

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
        <SPITICFormat
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
        <section
          id="top"
          className="flex flex-col mt-[120px] px-4 w-full md:w-[800px]"
        >
          <div className="w-full" data-aos="zoom-in">
            <img src={BridgetteLogo} className="h-[95px] w-[95px] mx-auto" />
            <p className="font_sansita text-center font-bold text-[25px] md:text-[34px]">
              BRIDGETTE
            </p>
          </div>

          <div className="w-full waviy" data-aos="zoom-in">
            <div className="font_sansita text-[#e70f00ee] font_sansita font-bold text-[30px] md:text-[75px] mt-[-0.4rem] md:mt-[-1.4rem] text-center">
              <span className="--i:1">C</span>
              <span className="--i:2">E</span>
              <span className="--i:3">R</span>
              <span className="--i:4">T</span>
              <span className="--i:5">I</span>
              <span className="--i:6">F</span>
              <span className="--i:7">I</span>
              <span className="--i:8">C</span>
              <span className="--i:9">A</span>
              <span className="--i:10">T</span>
              <span className="--i:11">E </span>
              <span>&nbsp;</span>
              <span className="--i:12">G</span>
              <span className="--i:13">E</span>
              <span className="--i:14">N</span>
              <span className="--i:15">E</span>
              <span className="--i:16">R</span>
              <span className="--i:17">A</span>
              <span className="--i:18">T</span>
              <span className="--i:19">O</span>
              <span className="--i:20">R</span>
            </div>

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
              className="md:mt-[55px] mt-[40px]  w-[220px] bg-[#F5D45E] button-53"
            >
              Continue
            </button>
          ) : SessionStatus === "Session not found" ? (
            <button
              onClick={OpenModalHandler}
              className="md:mt-[55px] mt-[40px]  w-[220px] bg-[#F5D45E] button-53"
            >
              Get Started
            </button>
          ) : (
            <button
              disabled
              className="md:mt-[55px] mt-[40px]  w-[220px] bg-[#F5D45E] button-53"
            >
              Loading
            </button>
          )}
        </section>
        {/* <div className="flex flex-row w-full justify-center z-10">
          <div className="w-[1000px] h-[950px] rounded-[50%] bg-green-200 mb-[-20rem]" />
          <div className="w-[1000px] h-[950px] rounded-[50%] bg-red-200 " />
        </div> */}
        {/* -----User Manual on how to use----- */}
        <div className="relative bg-bgblack bg-slate-900 bg-no-repeat bg-cover min-w-full h-full overflow-hidden pb-10 mt-[60px]">
          <div className="flex flex-col lg:w-[900px] w-full h-full mx-auto px-4 lg:px-0">
            <div
              data-aos="fade-right"
              data-aos-offset="0"
              data-aos-easing="ease-in-sine"
            >
              <h1 className="font-bold font_sansita md:text-[45px] text-[35px] text-[#F5D45E]">
                How to Use?
              </h1>
              <p className="text-white mb-32 md:w-[80%] md:text-start text-justify">
                Here are the comprehensive steps detailing how to effectively
                utilize the system for creating and generating certificates for
                students, ensuring a streamlined process from initial setup to
                final certificate issuance.
              </p>
            </div>
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
                  <a
                    href={Bgtemplate}
                    download="Template-excel-file"
                    target="_blank"
                  >
                    <span className="text-[#47A2FF] hover:underline z-10 cursor-pointer">
                      Link
                    </span>
                  </a>{" "}
                </p>
              </div>
              <img
                src={StepOne}
                className="h-[250px] w-[360px] transform md:rotate-[7deg] lg:mr-[-7rem] border-r-[10px] border-b-[10px] border-[#F5D45E] bg-slate-400"
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
                src={StepTwo}
                className="h-[250px] w-[360px] transform md:rotate-[-7deg] lg:ml-[-7rem] border-l-[10px] border-b-[10px] border-[#F5D45E] bg-slate-400"
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
                  <a
                    href={ExcelTemplate}
                    download="Template-excel-file"
                    target="_blank"
                  >
                    <span className="text-[#47A2FF] hover:underline z-10 cursor-pointer">
                      Link
                    </span>{" "}
                  </a>
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
                src={StepThree}
                className="h-[250px] w-[360px] transform md:rotate-[7deg] border-r-[10px] border-b-[10px] border-[#F5D45E] lg:mr-[-7rem] bg-slate-400"
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
                src={StepFour}
                className="h-[250px] w-[360px] transform md:rotate-[-7deg] border-l-[10px] border-b-[10px] border-[#F5D45E] lg:ml-[-7rem] bg-slate-400"
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
                src={StepFive}
                className="h-[250px] w-[360px] transform md:rotate-[7deg] border-r-[10px] border-b-[10px] border-[#F5D45E] lg:mr-[-7rem] bg-slate-400"
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
                src={StepSix}
                className="h-[250px] w-[360px] transform md:rotate-[-7deg] border-l-[10px] border-b-[10px] border-[#F5D45E] lg:ml-[-7rem] bg-slate-400"
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
                src={StepSeven}
                className="h-[250px] w-[360px] transform md:rotate-[7deg] border-r-[10px] border-b-[10px] border-[#F5D45E] lg:mr-[-7rem] bg-slate-400"
              />
            </div>
            {/* -------Step 7 end-------- */}
          </div>
        </div>
        <Footer />
      </div>
      {showScrollToTopButton && (
        <div className="fixed left-7 md:bottom-7 right-4 bottom-4">
          <Button
            onClick={scrollToTop}
            sx={{
              backgroundColor: "#47A2FF",
              color: "white",
              borderRadius: "5px",
              minHeight: "35px",
              minWidth: "30px",
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "#478ed5",
              },
            }}
          >
            <IoIosArrowUp className="text-[20px]" />
          </Button>
        </div>
      )}

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
