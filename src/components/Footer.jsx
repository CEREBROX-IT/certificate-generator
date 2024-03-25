import React from "react";
import BridgetteLogo from "./../assets/bridgette-logo.webp";
import { FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <div className="relative w-full bg-[#F5D45E]">
      <div className="flex flex-col lg:w-[900px] w-full lg:p-0 p-4 mx-auto">
        <div className="flex md:hidden flex-col mx-auto">
          <div className="flex flex-row items-center">
            <img src={BridgetteLogo} className="h-[60px] w-[65px]" />
            <p className="font-bold font_sansita text-[34px]">BRIDGETTE</p>
          </div>
        </div>
        <section className="flex md:flex-row flex-col justify-between mt-5 border-b-[1px] pb-10 border-[#323232]">
          <div className="flex flex-col">
            <p className="font_sansita font-bold text-[24px]">CONTACT US</p>
            <div className="flex flex-row items-center gap-2 mt-2">
              <FaPhone className="text-white text-[24px]" />
              <p>+6391-203-3121</p>
            </div>
            <div className="flex flex-row items-center gap-2 mt-2">
              <MdEmail className="text-white text-[26px]" />
              <p>bridgette2024@gmail.com</p>
            </div>
          </div>

          <div className="md:flex hidden flex-col">
            <div className="flex flex-row items-center">
              <img src={BridgetteLogo} className="h-[60px] w-[65px]" />
              <p className="font-bold font_sansita text-[34px]">BRIDGETTE</p>
            </div>
          </div>
        </section>
        <p className="text-center mt-5 mb-10 font-bold text-[15px]">
          © 2024 BRIDGETTE - CERTIFICATE GENERATOR{" "}
        </p>
      </div>
    </div>
  );
};

export default Footer;
