import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";

const AddOption1Awardee = ({ openModal, closeModal }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [gradeLevel, setGradeLevel] = useState(false);
  const onSubmit = (values) => console.log(values);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setModalHandler(openModal);
  }, [openModal]);

  const gradeLevelList = [
    "Kinder 1",
    "Kinder 2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];

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
                  <div className="mb-5 w-full">
                    <TextField
                      label="Awardee Name"
                      variant="outlined"
                      name="awardee_name"
                      className="w-full"
                      error={errors.awardee_name ? true : false}
                      inputProps={{
                        style: {
                          height: "14px",
                        },
                      }}
                      {...register("awardee_name", {
                        required: "This is required.",
                        pattern: {
                          value: /^[a-z ,.'-]+$/i,
                          message: "Invalid characters in name.",
                        },
                      })}
                    />
                    {errors.awardee_name && (
                      <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                        {errors.awardee_name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row w-full md:gap-4">
                    <FormControl
                      sx={{
                        marginBottom: 3,
                        width: "100%",
                      }}
                    >
                      <TextField
                        select
                        label="Grade Level"
                        variant="outlined"
                        name="grade_level"
                        error={
                          gradeLevel
                            ? true
                            : watch("grade_level") === ""
                            ? true
                            : false
                        }
                        {...register("grade_level", {
                          required: "This is required.",
                        })}
                        SelectProps={{
                          MenuProps: { disableScrollLock: true },
                          style: {
                            height: "47px",
                          },
                        }}
                      >
                        <MenuItem value="">
                          <p
                            className="text-slate-500 text-[12px]"
                            onClick={() => {
                              setGradeLevel(true);
                            }}
                          >
                            Select one
                          </p>
                        </MenuItem>
                        {gradeLevelList.map((grade, index) => (
                          <MenuItem key={index} value={grade}>
                            {grade}
                          </MenuItem>
                        ))}
                      </TextField>
                      {errors.grade_level && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-1.5rem]">
                          {errors.grade_level.message}
                        </p>
                      )}
                    </FormControl>

                    <div className="mb-5 w-full">
                      <TextField
                        label="Section"
                        variant="outlined"
                        name="section"
                        className="w-full"
                        error={errors.section ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("section", {
                          required: "This is required.",
                        })}
                      />
                      {errors.section && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.section.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row w-full md:gap-4">
                    <div className="mb-5 w-full">
                      <TextField
                        label="Average"
                        variant="outlined"
                        name="average"
                        className="w-full"
                        error={errors.average ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("average", {
                          required: "This is required.",
                          pattern: {
                            value: /^[0-9]+(\.[0-9]+)?$/,
                            message: "Invalid average value.",
                          },
                        })}
                      />
                      {errors.average && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.average.message}
                        </p>
                      )}
                    </div>

                    <div className="relative mb-5 w-full flex flex-col">
                      <p className="absolute text-[###323232] text-[12px] mt-[-0.6rem] ml-2 bg-white z-10 px-[4px]">
                        Date to present
                      </p>
                      <TextField
                        variant="outlined"
                        name="date_to_present"
                        type="date"
                        className="w-full"
                        error={errors.date_to_present ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("date_to_present", {
                          required: "This is required.",
                        })}
                      />
                      {errors.awardee_name && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.date_to_present.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="mb-3 w-full">
                    <TextField
                      label="School Name"
                      variant="outlined"
                      name="school_name"
                      className="w-full"
                      error={errors.school_name ? true : false}
                      inputProps={{
                        style: {
                          height: "14px",
                        },
                      }}
                      {...register("school_name", {
                        required: "This is required.",
                        pattern: {
                          value: /^[a-z ,.'-]+$/i,
                          message: "Invalid characters in name.",
                        },
                      })}
                    />
                    {errors.school_name && (
                      <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                        {errors.school_name.message}
                      </p>
                    )}
                  </div>

                  {/* ========SIGNATORY ONE========== */}
                  <p className="font-bold text-[14px] mb-1">Signatory 1</p>
                  <div className="w-full border-t-[2px] border-[#C4C4C4]">
                    <div className="mb-5  mt-4 w-full">
                      <p className="font-bold text-[14px] mb-1">
                        Signature Attachment (png only)
                      </p>
                      <TextField
                        name="signatory_attachment1"
                        className="border-[1.5px] rounded-[5px] border-[#C4C4C4] h-[48px] p-[8px] w-full hover:border-black"
                        type="file"
                        error={errors.signatory_attachment1 ? true : false}
                        accept=".png"
                        InputProps={{
                          style: {
                            height: "47px",
                            display: "flex",
                            alignItems: "center",
                          },
                          inputProps: {
                            accept: "image/png",
                          },
                        }}
                        {...register("signatory_attachment1", {
                          required: "This is required.",
                        })}
                      />
                      {errors.signatory_attachment1 && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.signatory_attachment1.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5 w-full">
                      <TextField
                        label="Signatory Name"
                        variant="outlined"
                        name="signatory_name1"
                        className="w-full"
                        error={errors.signatory_name1 ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("signatory_name1", {
                          required: "This is required.",
                          pattern: {
                            value: /^[a-z ,.'-]+$/i,
                            message: "Invalid characters in name.",
                          },
                        })}
                      />
                      {errors.signatory_name1 && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.signatory_name1.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5 w-full">
                      <TextField
                        label="Signatory Position"
                        variant="outlined"
                        name="signatory_position1"
                        className="w-full"
                        error={errors.signatory_position1 ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("signatory_position1", {
                          required: "This is required.",
                        })}
                      />
                      {errors.signatory_position1 && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.signatory_position1.message}
                        </p>
                      )}
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
