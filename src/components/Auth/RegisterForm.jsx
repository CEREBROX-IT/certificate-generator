import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { VscEye } from "react-icons/vsc";
import { PiEyeClosedLight } from "react-icons/pi";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/slice/auth/registerSlice";

const RegisterForm = ({ handleModeChange }) => {
  const dispatch = useDispatch();
  const registerStatus = useSelector((state) => state.userRegister?.status);
  const [complete, setComplete] = useState("idle");
  //---show/hide password option---
  const [showPassword, setShowPassword] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(false);
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
      school_belong: values.selected_school,
      username: values.register_username,
      password: values.register_password,
    };

    dispatch(userRegister(registerData));
  };

  // Custom validation function to check if passwords match
  const passwordMatch = (value) => {
    const newPassword = watch("register_password"); // Get the value of "New password" field
    return newPassword === value || "Password do not match";
  };

  // Register the "Re-enter new password" field with the custom validation
  register("confirm_password", {
    required: "This is required.",
    validate: passwordMatch,
  });

  const SchoolNameList = [
    "Western Mindanao Adventist Academy",
    "Paul’s Institute of Technology of Iligan City, Inc",
  ];

  useEffect(() => {
    if (registerStatus === "loading") {
      setComplete("loading");
    } else if (registerStatus === "succeeded" && complete === "loading") {
      setComplete("idle");
      handleModeChange("login");
    } else if (registerStatus === "failed" && complete === "loading") {
      setComplete("failed");
    }
  }, [registerStatus, complete, setComplete, handleModeChange]);

  return (
    <>
      <form className="h-full z-10 md:px-10" onSubmit={handleSubmit(onSubmit)}>
        {complete === "failed" && (
          <div className="w-full mt-4 mx-auto p-3 bg-red-100 border-[1px] border-red-700">
            <p className="text-center text-red-700 text-[14px]">
              Username already exist
            </p>
          </div>
        )}
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
        <FormControl
          sx={{
            marginBottom: 3,
            width: "100%",
          }}
        >
          <TextField
            select
            label="What School"
            variant="outlined"
            name="selected_school"
            error={selectedSchool ? true : false}
            {...register("selected_school", {
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
                  setSelectedSchool(true);
                }}
              >
                Select one
              </p>
            </MenuItem>
            {SchoolNameList.map((school, index) => (
              <MenuItem
                key={index}
                value={school}
                onClick={() => {
                  setSelectedSchool(false);
                }}
              >
                {school}
              </MenuItem>
            ))}
          </TextField>
          {errors.selected_school && (
            <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
              {selectedSchool && errors.selected_school.message}
            </p>
          )}
        </FormControl>
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
                value: 5,
                message: "Username must be at least 5 characters long.",
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
                  background: "#f1c320", // Same color when hovered
                },
              }}
            >
              <CircularProgress size={28} sx={{ color: "white" }} />
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
                  background: "#f1c320", // Same color when hovered
                },
              }}
              onClick={() => {
                watch("selected_school") === "" ||
                watch("selected_school") === undefined
                  ? setSelectedSchool(true)
                  : setSelectedSchool(false);
              }}
            >
              REGISTER
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default RegisterForm;
