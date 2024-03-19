import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { VscEye } from "react-icons/vsc";
import { PiEyeClosedLight } from "react-icons/pi";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/slice/auth/loginSlice";

const LoginForm = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    const loginData = {
      username: values.username,
      password: values.password,
    };

    dispatch(userLogin(loginData));
  };

  //---show/hide password option---
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <>
      <form className="h-full z-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
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
                    {showPassword ? <VscEye /> : <PiEyeClosedLight />}
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
          LOGIN
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
