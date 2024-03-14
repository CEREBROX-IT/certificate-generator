import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import TemplateOne from "./../assets/certificate-sample/two_signature.webp";
import TemplateTwo from "./../assets/certificate-sample/three_signature.webp";
import TemplateThree from "./../assets/certificate-sample/four_signature.webp";

const TemplateOption = ({ openModal, closeModal }) => {
  const [modalHandler, setModalHandler] = useState(false);

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
              className="md:w-[520px] w-[90%] md:h-[470px] bg-white flex flex-col mx-auto rounded-[15px]
                          shadow-md modal-container p-7 border-t-[5px] border-[#F5D45E]"
            >
              <div className="flex flex-row items-center mb-2">
                <p className="text-center w-full font-bold text-[24px] ml-4">
                  DOWNLOAD TEMPLATE
                </p>
                <button
                  className="r-btn cursor-pointer rounded-[50%] hover:bg-slate-200 z-10 mt-[-2rem] mr-[-0.5rem]"
                  onClick={closeModal}
                >
                  <IoCloseOutline className="text-[35px]" />
                </button>
              </div>
              <div className="relative flex w-full h-[120px] border-[3px] border-white hover:border-[#47A2FF] hover:shadow-sm shadow-[#47A2FF] rounded-md cursor-pointer mb-[4px]">
                <div
                  className="absolute h-full w-full"
                  style={{ backgroundColor: "rgba(71, 162, 255, 0.1)" }}
                />
                <img
                  src={TemplateOne}
                  className=" object-cover w-full rounded-md"
                  style={{ objectPosition: "right 0px bottom -1rem" }}
                />
                <p className="absolute bottom-1 left-2 font_sansita font-bold text-[16px] md:text-[21px] text-[#47A2FF] shadow-text">
                  TWO SIGNATURE
                </p>
              </div>
              <div className="relative flex w-full h-[120px] border-[3px] border-white hover:border-[#47A2FF] hover:shadow-sm shadow-[#47A2FF] rounded-md cursor-pointer  mb-[4px]">
                <div
                  className="absolute h-full w-full"
                  style={{ backgroundColor: "rgba(71, 162, 255, 0.1)" }}
                />
                <img
                  src={TemplateTwo}
                  className=" object-cover w-full rounded-md"
                  style={{ objectPosition: "right 0px bottom -1rem" }}
                />
                 <p className="absolute bottom-1 left-2 font_sansita font-bold text-[16px] md:text-[21px] text-[#47A2FF] shadow-text">
                  THREE SIGNATURE
                </p>
              </div>
              <div className="relative flex w-full h-[120px] border-[3px] border-white hover:border-[#47A2FF] hover:shadow-sm shadow-[#47A2FF] rounded-md cursor-pointer  mb-[4px]">
                <div
                  className="absolute h-full w-full"
                  style={{ backgroundColor: "rgba(71, 162, 255, 0.1)" }}
                />
                <img
                  src={TemplateThree}
                  className=" object-cover w-full rounded-md"
                  style={{ objectPosition: "right 0px bottom -1rem" }}
                />
                  <p className="absolute bottom-1 left-2 font_sansita font-bold text-[16px] md:text-[21px] text-[#47A2FF] shadow-text">
                  FOUR SIGNATURE
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateOption;
