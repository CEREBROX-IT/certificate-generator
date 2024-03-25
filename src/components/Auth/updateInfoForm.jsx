import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getUserDatafromToken } from "../../utils/extractJWT";
const UpdateInfoForm = ({ userId }) => {
  const onSubmit = (values) => console.log(values);
  const userData = getUserDatafromToken();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 w-full">
          <TextField
            label="First Name"
            variant="outlined"
            name="first_name"
            className="w-full"
            defaultValue={userData.decodedToken.first_name}
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
            defaultValue={userData.decodedToken.last_name}
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
        {false ? (
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
              <CircularProgress sx={{ color: "white" }} />
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

export default UpdateInfoForm;
