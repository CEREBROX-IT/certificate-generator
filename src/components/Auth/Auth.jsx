import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { VscEye } from "react-icons/vsc";
import { PiEyeClosedLight } from "react-icons/pi";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

const AuthenticationModal = ({ openModal, closeModal }) => {
  const [modalHandler, setModalHandler] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const onLoginSubmit = (values) => console.log(values);
  const onSignupSubmit = (values) => console.log(values);

  //---show/hide password option---
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    watch,
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
                  <form
                    className="h-full z-10 md:px-10"
                    onSubmit={handleSubmit(onLoginSubmit)}
                  >
                    <p className="mt-4 mb-6 text-center ">
                      Login your account to get started
                    </p>
                    <div className="mb-5 w-full">
                      <TextField
                        label="Username"
                        variant="outlined"
                        name="username"
                        className="w-full"
                        error={errors.username ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("username", {
                          required: "This is required.",
                        })}
                      />
                      {errors.username && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.username.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5 w-full">
                      <TextField
                        label="Password"
                        variant="outlined"
                        name="password"
                        className="w-full"
                        type={showPassword ? "text" : "password"}
                        error={errors.password ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("password", {
                          required: "This is required.",
                        })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? (
                                  <VscEye />
                                ) : (
                                  <PiEyeClosedLight />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.password && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <button className="bg-[#F5D45E] p-2 py-3 w-full rounded-md font-bold text-white mt-2">
                      LOGIN
                    </button>

                    <p className="text-[14px] text-center mt-10">
                      Don't have an acount?{" "}
                      <span
                        className="text-[#47A2FF] cursor-pointer hover:underline"
                        onClick={() => {
                          setCurrentPage("register");
                        }}
                      >
                        click here
                      </span>
                    </p>
                  </form>
                </>
              ) : (
                <>
                  <form
                    className="h-full z-10 md:px-10"
                    onSubmit={handleSubmit(onSignupSubmit)}
                  >
                    <p className="mt-4 mb-6 text-center ">
                      Singup your account to get started
                    </p>
                    <div className="mb-5 w-full">
                      <TextField
                        label="First Name"
                        variant="outlined"
                        name="first_name"
                        className="w-full"
                        error={errors.first_name ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("first_name", {
                          required: "This is required.",
                          pattern: {
                            value: /^[a-z ,.'-]+$/i,
                            message: "Invalid characters in name.",
                          },
                        })}
                      />
                      {errors.first_name && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.first_name.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5 w-full">
                      <TextField
                        label="Last Name"
                        variant="outlined"
                        name="last_name"
                        className="w-full"
                        error={errors.last_name ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("last_name", {
                          required: "This is required.",
                          pattern: {
                            value: /^[a-z ,.'-]+$/i,
                            message: "Invalid characters in name.",
                          },
                        })}
                      />
                      {errors.last_name && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.last_name.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5 w-full">
                      <TextField
                        label="Username"
                        variant="outlined"
                        name="register_username"
                        className="w-full"
                        error={errors.register_username ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("register_username", {
                          required: "This is required.",
                          minLength: {
                            value: 6,
                            message:
                              "Username must be at least 6 characters long.",
                          },
                        })}
                      />
                      {errors.register_username && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.register_username.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5 w-full">
                      <TextField
                        label="Password"
                        variant="outlined"
                        name="register_password"
                        className="w-full"
                        type={showPassword ? "text" : "password"}
                        error={errors.register_password ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("register_password", {
                          required: "This is required.",
                          minLength: {
                            value: 8,
                            message:
                              "Password must be at least 8 characters long.",
                          },
                        })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? (
                                  <VscEye />
                                ) : (
                                  <PiEyeClosedLight />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.register_password && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.register_password.message}
                        </p>
                      )}
                    </div>
                    <div className="mb-5 w-full">
                      <TextField
                        label="Re-enter Password"
                        variant="outlined"
                        name="confirm_password"
                        className="w-full"
                        type={showPassword ? "text" : "password"}
                        error={errors.confirm_password ? true : false}
                        inputProps={{
                          style: {
                            height: "14px",
                          },
                        }}
                        {...register("confirm_password", {
                          required: "This is required.",
                        })}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword}>
                                {showPassword ? (
                                  <VscEye />
                                ) : (
                                  <PiEyeClosedLight />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                      {errors.confirm_password && (
                        <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                          {errors.confirm_password.message}
                        </p>
                      )}
                    </div>

                    <button className="bg-[#F5D45E] p-2 py-3 w-full rounded-md font-bold text-white mt-2">
                      REGISTER
                    </button>

                    <p className="text-[14px] text-center mt-5">
                      Already have an acount?{" "}
                      <span
                        className="text-[#47A2FF] cursor-pointer hover:underline"
                        onClick={() => {
                          setCurrentPage("login");
                        }}
                      >
                        click here
                      </span>
                    </p>
                  </form>
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
