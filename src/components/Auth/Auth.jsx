import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
const AuthenticationModal = ({ openModal, closeModal }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleModeChange = (mode) => {
    setCurrentPage(mode);
  };

  useEffect(() => {
    setModalHandler(openModal);
  }, [openModal]);

  return (
    <>
      <div className={`modal-wrapper ${modalHandler ? "show" : ""}`}>
        {modalHandler && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-40">
            <div className="absolute inset-0" />
            <div
              className="md:w-[520px] w-[90%] bg-white flex flex-col mx-auto rounded-[15px]
                          shadow-md modal-container p-7 border-t-[5px] border-[#F5D45E]"
            >
              <div className="flex flex-row items-center mb-2">
                <p className="text-center w-full font-bold text-[24px] ml-4">
                  {currentPage === "login" ? " LOGIN" : "SIGN UP"}
                </p>
                <button
                  className="r-btn cursor-pointer rounded-[50%] hover:bg-slate-200 z-10 mt-[-2rem] mr-[-0.5rem]"
                  onClick={closeModal}
                >
                  <IoCloseOutline className="text-[35px]" />
                </button>
              </div>

              {/* =========Input fields here======= */}

              {currentPage === "login" ? (
                <>
                  <LoginForm />
                  <p className="text-[14px] text-center mt-10 z-10">
                    Don't have an acount?{" "}
                    <span
                      className="text-[#47A2FF] cursor-pointer hover:underline"
                      onClick={() => {
                        handleModeChange("register");
                      }}
                    >
                      click here
                    </span>
                  </p>
                </>
              ) : (
                <>
                  <RegisterForm />
                  <p className="text-[14px] text-center mt-5 z-10">
                    Already have an acount?{" "}
                    <span
                      className="text-[#47A2FF] cursor-pointer hover:underline"
                      onClick={() => {
                        handleModeChange("login");
                      }}
                    >
                      click here
                    </span>
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AuthenticationModal;
