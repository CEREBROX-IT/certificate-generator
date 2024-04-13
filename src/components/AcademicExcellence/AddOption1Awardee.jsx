import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import { getUserDatafromToken } from "../../utils/extractJWT";
import { AwardeeRefresh } from "../../redux/slice/awardee/SPITICAwardee/addAwardee";

const AddOption1Awardee = ({ openModal, closeModal }) => {
  const dispatch = useDispatch();
  const Status = useSelector((state) => state.addAwardee?.status);
  const [complete, setComplete] = useState("idle");
  const userId = getUserDatafromToken().decodedToken.userId;
  const [modalHandler, setModalHandler] = useState(false);
  const onSubmit = (values) => {
    const data = {
      userId: userId,
      postedByName:
        getUserDatafromToken().decodedToken.first_name +
        " " +
        getUserDatafromToken().decodedToken.last_name,
      awardeeName: values.awardee_name,
      avg: values.average_grade,
    };

    dispatch(AwardeeRefresh(data, userId));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setModalHandler(openModal);

    if (Status === "loading") {
      setComplete("loading");
    } else if (Status === "succeeded" && complete === "loading") {
      closeModal();
      setComplete("idle");
    } else if (Status === "failed" && complete === "loading") {
      setComplete("failed");
    } else if (complete === "failed") {
      setComplete("idle");
    }
  }, [openModal, Status, setComplete, complete, closeModal]);

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

              {Status === "failed" && (
                <div className="w-full mt-4 mx-auto p-3 bg-red-100 border-[1px] border-red-700">
                  <p className="text-center text-red-700 text-[14px]">
                    Average below 80, cannot add awardee
                  </p>
                </div>
              )}
              <form className="h-full z-10 " onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full mt-4 px-1 pt-2">
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
                  <div className="mb-5 w-full">
                    <TextField
                      label="Average Grade"
                      variant="outlined"
                      name="average_grade"
                      className="w-full"
                      error={errors.average_grade ? true : false}
                      inputProps={{
                        style: {
                          height: "14px",
                        },
                      }}
                      {...register("average_grade", {
                        required: "This is required.",
                        pattern: {
                          value: /^(100(\.0+)?|\d{0,2}(\.\d{0,2})?)$/,
                          message: "Invalid grade.",
                        },
                      })}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <p className="text-[20px]">%</p>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {errors.average_grade && (
                      <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                        {errors.average_grade.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-row justify-end mt-2 mb-[-0.5rem]">
                  {complete === "loading" ? (
                    <>
                      <Button
                        type="submit"
                        color="success"
                        disabled
                        sx={{
                          background: "#F5D45E",
                          padding: "10px",
                          fontWeight: 900,
                          color: "white",
                          fontSize: "16px",
                          marginTop: "20px",
                          width: "100%",
                          "&:hover": {
                            background: "#f1c320",
                          },
                        }}
                      >
                        <CircularProgress sx={{ color: "white" }} size={28} />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        type="submit"
                        color="success"
                        sx={{
                          background: "#F5D45E",
                          padding: "10px",
                          fontWeight: 900,
                          color: "white",
                          fontSize: "16px",
                          marginTop: "20px",
                          width: "100%",
                          "&:hover": {
                            background: "#f1c320",
                          },
                        }}
                      >
                        SUBMIT
                      </Button>
                    </>
                  )}
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
