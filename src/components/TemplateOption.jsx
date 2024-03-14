import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const TemplateOption = ({ openModal, closeModal }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");
  useEffect(() => {
    setModalHandler(openModal);
  }, [openModal]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  return (
    <>
      <div className={`modal-wrapper ${modalHandler ? "show" : ""}`}>
        {modalHandler && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-40">
            <div className="absolute inset-0" />
            <div
              className="md:w-[520px] w-[90%] h-[60vh] md:h-[500px] bg-white flex flex-col mx-auto rounded-[15px]
                          shadow-md modal-container p-7 border-t-[5px] border-[#F5D45E]"
            >
              <div className="flex flex-row items-center mb-4">
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
              <div className="relative w-full h-[120px] bg-red-200 rounded-md cursor-pointer"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateOption;
