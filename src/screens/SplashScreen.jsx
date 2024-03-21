import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import BridgetteLogo from "./../assets/bridgette-logo.webp";
const SplashScreen = () => {
  return (
    <div className="absolute flex flex-col h-full w-full justify-center content-center bg-white">
      <label className="flex flex-col">
        <div className="flex justify-center">
          <img
            src={BridgetteLogo}
            className="h-[50px] w-[50px] md:h-[70px] md:w-[70px] animate-bounce"
          />
        </div>
        <span className="text-black mx-auto animate-pulse">
          Loading, please wait
        </span>

        <div className="flex justify-center mt-4">
          <CircularProgress sx={{ color: "#F5D45E" }} size={35} />
        </div>
      </label>
    </div>
  );
};

export default SplashScreen;
