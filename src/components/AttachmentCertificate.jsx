import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ImageIcon from "./../assets/image_icon.webp";

const AttachmentCertificate = ({ openModal, closeModal }) => {
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
              <div className="flex flex-row items-center">
                <p className="text-center w-full font-bold text-[24px] ml-4">
                  CERTIFICATE TEMPLATE
                </p>
                <button
                  className="r-btn cursor-pointer rounded-[50%] hover:bg-slate-200 z-10 mt-[-2rem] mr-[-0.5rem]"
                  onClick={closeModal}
                >
                  <IoCloseOutline className="text-[35px]" />
                </button>
              </div>

              <form className="h-full mt-3 z-10">
                <div
                  className={`flex flex-col border-black border-[2px] ${
                    selectedFile
                      ? "border-solid"
                      : "border-dashed justify-center"
                  } rounded-[20px] h-[90%] items-center`}
                >
                  {selectedFile ? (
                    <>
                      <div className="flex flex-row w-full mt-3 items-center pr-2">
                        <input
                          className="w-full mt-2 px-5 bg-transparent border-none outline-none"
                          readOnly
                          value={selectedFile.name}
                          onFocus={(e) => e.target.blur()}
                        />
                        <span
                          className="mt-[6px] cursor-pointer"
                          onClick={() => {
                            setSelectedFile("");
                          }}
                        >
                          <IoCloseOutline className="text-[25px] bg-transparent" />
                        </span>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        src={ImageIcon}
                        className="h-[100px]"
                        alt="Image Icon"
                      />
                      <label
                        htmlFor="file-upload"
                        className="hover:bg-[#47A2FF] font-bold hover:text-white text-[#47A2FF] border-[2px] border-[#47A2FF] p-2 px-6 cursor-pointer rounded-md mt-5"
                      >
                        Choose File
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      <p className="mt-2 text-[14px] font-bold text-center">
                        Drag or attach a file here
                      </p>
                      <p className="mt-[1px] text-[13px]">
                        (JPG, JPEG, PNG only)
                      </p>
                    </>
                  )}
                </div>
                <div className="flex flex-row justify-end py-2 mt-1 gap-2">
                  <button
                    className="py-2 border-[#F5D45E] w-[150px] text-[#F5D45E] border-[2px] font-bold rounded-md"
                    type="submit"
                    onClick={() => {
                      console.log("click");
                    }}
                  >
                    BACK
                  </button>
                  <button
                    className="py-2 bg-[#F5D45E] w-[150px] text-white font-bold rounded-md"
                    type="submit"
                    onClick={() => {
                      console.log("click");
                    }}
                  >
                    NEXT
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AttachmentCertificate;
