import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { VscEye } from "react-icons/vsc";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { PiEyeClosedLight } from "react-icons/pi";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../../redux/slice/auth/updatePassword";

const ChangePasswordForm = ({ userId, closeModal }) => {
  const dispatch = useDispatch();
  const Status = useSelector((state) => state.changePassword?.status);
  const [complete, setComplete] = useState("idle");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmit = (values) => {
    const data = {
      userId: userId,
      currentPassword: values.current_password,
      newPassword: values.register_password,
    };

    dispatch(changePassword(data));
  };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

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

  useEffect(() => {
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
  }, [, Status, setComplete, complete, closeModal]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {complete === "failed" && (
          <div className="w-full mx-auto p-3 bg-red-100 border-[1px] border-red-700 mb-5 mt-[-0.5rem]">
            <p className="text-center text-red-700 text-[14px]">
              Current password is incorrect
            </p>
          </div>
        )}
        <div className="mb-5 w-full">
          <TextField
            label="Current Password"
            variant="outlined"
            name="current_password"
            className="w-full"
            type={showPassword ? "text" : "password"}
            error={errors.current_password ? true : false}
            inputProps={{
              style: {
                height: "14px",
              },
            }}
            {...register("current_password", {
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
          {errors.current_password && (
            <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
              {errors.current_password.message}
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
            >
              UPDATE
            </Button>
          </>
        )}
      </form>
    </>
  );
};

export default ChangePasswordForm;
