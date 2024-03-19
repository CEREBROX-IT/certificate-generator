import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { VscEye } from "react-icons/vsc";
import { PiEyeClosedLight } from "react-icons/pi";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/slice/auth/registerSlice";

const RegisterForm = () => {
  const dispatch = useDispatch();
  //---show/hide password option---
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    const registerData = {
      first_name: values.first_name,
      last_name: values.last_name,
      username: values.register_username,
      password: values.register_password,
    };

    dispatch(userRegister(registerData));
  };

  return (
    <>
      <form className="h-full z-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
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
                message: "Username must be at least 6 characters long.",
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
                message: "Password must be at least 8 characters long.",
              },
            })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VscEye /> : <PiEyeClosedLight />}
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
                    {showPassword ? <VscEye /> : <PiEyeClosedLight />}
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
              background: "#f1c320", // Same color when hovered
            },
          }}
        >
          REGISTER
        </Button>
      </form>
    </>
  );
};

export default RegisterForm;
