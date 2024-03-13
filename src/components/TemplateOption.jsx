import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ImageIcon from "./../assets/image_icon.webp"

const TemplateOtion = ({ openModal, closeModal }) => {
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
              className="md:w-[520px] w-[90%] h-[60vh] bg-white flex flex-col mx-auto rounded-[15px]
                          shadow-md modal-container p-7 border-t-[5px] border-[#F5D45E]">
              <div className="flex flex-row items-center">
                <p className="text-center w-full font-bold text-[24px]">
                    ATTACH FORMAT
                </p>
                <button
                  className="r-btn cursor-pointer rounded-[50%] hover:bg-slate-200 z-10 mt-[-2rem] mr-[-0.5rem]"
                  onClick={() => {
                    closeModal();
                  }}
                >
                  <IoCloseOutline className="text-[35px]" />
                </button>
              </div>


              <form className="bg-red-200 h-full mt-3">
                <div className="flex flex-col border-black border-[2px] border-dashed h-[90%] rounded-[20px] items-center justify-center">
                   <img src={ImageIcon} className="h-[100px]"/>
                   <button className="bg-green-200 p-2 mt-2" > Choose File</button>
                   <p>hello</p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default TemplateOtion;
