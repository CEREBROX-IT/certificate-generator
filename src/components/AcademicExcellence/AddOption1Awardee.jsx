import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const AddOption1Awardee = ({ openModal, closeModal }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const onSubmit = (values) => console.log(values);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
              className="md:w-[520px] w-[90%] h-[80vh] md:h-[680px] bg-white flex flex-col mx-auto rounded-[15px]
                 shadow-md modal-container p-7 border-t-[5px] border-[#F5D45E]"
            >
              <div className="flex flex-row items-center">
                <p className="text-center w-full font-bold text-[24px]">
                  INPUT DETAILS
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
              <form className="h-full z-10 " onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mt-4 h-[85%] overflow-y-auto px-1 pt-2">
                  <div className="mb-3 w-full">
                    <TextField
                      label="Awardee Name"
                      variant="outlined"
                      name="awardee_name"
                      className="w-full"
                      inputProps={{
                        style: {
                          height: "14px",
                        },
                      }}
                    />
                    <p className="ml-1 mt-1 text-[13px] text-red-500">
                      This is required.
                    </p>
                  </div>
                  <div className="flex flex-col md:flex-row w-full md:gap-4">
                    <div className="mb-3 w-full">
                      <TextField
                        label="Grade Level"
                        variant="outlined"
                        name="grade_level"
                        className="w-full"
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                    <div className="mb-3 w-full">
                      <TextField
                        label="Section"
                        variant="outlined"
                        name="section"
                        className="w-full"
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full md:gap-4">
                    <div className="mb-3 w-full">
                      <TextField
                        label="Average"
                        variant="outlined"
                        name="average"
                        className="w-full"
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                    <div className="mb-3 w-full">
                      <TextField
                        variant="outlined"
                        name="date_to_present"
                        type="date"
                        className="w-full"
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                  </div>
                  <div className="mb-3 w-full">
                    <TextField
                      label="School Name"
                      variant="outlined"
                      name="school_name"
                      className="w-full"
                      inputProps={{
                        style: {
                          height: "14px",
                        },
                      }}
                    />
                    <p className="ml-1 mt-1 text-[13px] text-red-500">
                      This is required.
                    </p>
                  </div>

                  {/* ========SIGNATORY ONE ========== */}
                  <p className="font-bold text-[14px] mb-1">Signatory 1</p>
                  <div className="w-full border-t-[2px] border-[#C4C4C4]">
                    <div className="mb-3  mt-4 w-full">
                      <p className="font-bold text-[14px] mb-1">
                        Signature Attachment
                      </p>
                      <input
                        className="border-[1.5px] rounded-[5px] border-[#C4C4C4] h-[48px] p-[8px] w-full hover:border-black"
                        type="file"
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                    <div className="mb-3 w-full">
                      <TextField
                        label="Signatory Name"
                        variant="outlined"
                        name="signatory"
                        className="w-full"
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                    <div className="mb-3 w-full">
                      <TextField
                        label="Signatory Position"
                        variant="outlined"
                        name="signatory"
                        className="w-full"
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                  </div>

                  {/* ========SIGNATORY ONE ========== */}
                  <p className="font-bold text-[14px] mb-1">Signatory 2</p>
                  <div className="w-full border-t-[2px] border-[#C4C4C4]">
                    <div className="mb-3  mt-4 w-full">
                      <p className="font-bold text-[14px] mb-1">
                        Signature Attachment
                      </p>
                      <input
                        className="border-[1.5px] rounded-[5px] border-[#C4C4C4] h-[48px] p-[8px] w-full hover:border-black"
                        type="file"
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                    <div className="mb-3 w-full">
                      <TextField
                        label="Signatory Name"
                        variant="outlined"
                        name="signatory"
                        className="w-full"
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                    <div className="mb-3 w-full">
                      <TextField
                        label="Signatory Position"
                        variant="outlined"
                        name="signatory"
                        className="w-full"
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                      />
                      <p className="ml-1 mt-1 text-[13px] text-red-500">
                        This is required.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-row justify-end py-2 mt-2">
                  <button
                    className="py-2 bg-[#F5D45E] w-[150px] text-white font-bold rounded-md"
                    type="submit"
                    onClick={() => {
                      console.log("click");
                    }}
                  >
                    SUBMIT
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

export default AddOption1Awardee;
