import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import UpdateInfoForm from "./Auth/updateInfoForm";
import ChangePasswordForm from "./Auth/changePasswordForm";

const EditProfileModal = ({ openModal, closeModal, userID }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [currentPage, setCurrentPage] = useState("page1");

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
                  EDIT PROFILE
                </p>
                <button
                  className="r-btn cursor-pointer rounded-[50%] hover:bg-slate-200 z-10 mt-[-2rem] mr-[-0.5rem]"
                  onClick={closeModal}
                >
                  <IoCloseOutline className="text-[35px]" />
                </button>
              </div>

              <div className="flex flex-row w-full z-10 justify-center md:justify-start mt-2 mb-7">
                <span
                  className={` p-2 mb:px-4 ${
                    currentPage === "page1"
                      ? "border-[#47A2FF]"
                      : "border-white"
                  }  hover:border-[#47A2FF] border-b-[5px] cursor-pointer`}
                  onClick={() => {
                    setCurrentPage("page1");
                  }}
                >
                  INFORMATION
                </span>
                <span
                  className={` p-2 px-4 ${
                    currentPage === "page2"
                      ? "border-[#47A2FF]"
                      : "border-white"
                  }  hover:border-[#47A2FF] border-b-[5px] cursor-pointer`}
                  onClick={() => {
                    setCurrentPage("page2");
                  }}
                >
                  UPDATE PASSWORD
                </span>
              </div>
              <div className="h-full z-10 md:px-10">
                {currentPage === "page1" ? (
                  <>
                    <UpdateInfoForm userId={userID} />
                  </>
                ) : (
                  currentPage === "page2" && (
                    <>
                      <ChangePasswordForm userId={userID} />
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditProfileModal;
