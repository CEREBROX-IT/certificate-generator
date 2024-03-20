import React, { useState, useEffect } from "react";
import BridgetteLogo from "./../assets/bridgette-logo.webp";
import { GoDownload } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TemplateOption from "./TemplateOption";
import AuthenticationModal from "./Auth/Auth";
import { PiUserCircleFill } from "react-icons/pi";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const navigate = useNavigate();
  const [templateModal, setTemplateModal] = useState(false);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [AuthModal, setAuthModal] = useState(false);
  const [menuHandler, setMenuHandler] = useState(false);

  const cookieString = document.cookie;

  // Split the cookie string into individual cookies
  const cookies = cookieString.split(";").map((cookie) => cookie.trim());

  // Find the cookie with the name "bridgette"
  const tokenCookie = cookies.find((cookie) => cookie.startsWith("bridgette="));

  useEffect(() => {
    const checkTokenValidity = () => {
      if (tokenCookie) {
        try {
          const decodedToken = jwtDecode(tokenCookie);
          const isTokenExpired = decodedToken.exp < Date.now() / 1000;

          setIsTokenValid(!isTokenExpired);
        } catch (error) {
          setIsTokenValid(false);
        }
      } else {
        setIsTokenValid(false);
      }
    };

    const intervalId = setInterval(checkTokenValidity, 1200);

    return () => clearInterval(intervalId);
  }, [tokenCookie]);

  const openTemplateModal = () => {
    setTemplateModal(true);
  };

  const closeTemplateModal = () => {
    setTemplateModal(false);
  };

  const openAuthModal = () => {
    setAuthModal(true);
  };

  const closeAuthModal = () => {
    setAuthModal(false);
  };

  const handleLogout = () => {
    // Remove the "bridgette" cookie
    document.cookie =
      "bridgette=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <>
      {templateModal && (
        <TemplateOption
          openModal={templateModal}
          closeModal={closeTemplateModal}
        />
      )}
      {AuthModal && (
        <AuthenticationModal
          openModal={AuthModal}
          closeModal={closeAuthModal}
        />
      )}

      <div className="fixed flex flex-row justify-between p-4 bg-[#F5D45E] w-full h-[55px] items-center z-10">
        <section
          className="flex flex-row items-center  md:ml-6"
          onClick={() => {
            navigate("/");
          }}
        >
          <img
            src={BridgetteLogo}
            className="h-[40px] w-[40px] md:h-[45px] md:w-[45px]"
          />
          <p className="font_sansita font-bold text-[21px] md:text-[26px] ml-2">
            BRIDGETTE
          </p>
        </section>
        <section className="flex flex-row items-center gap-2 md:mr-6">
          <button
            className="flex flex-row items-center border-[2px] border-black text-black hover:text-white hover:bg-black px-4 py-1 rounded-[10px]"
            onClick={openTemplateModal}
          >
            <GoDownload className="text-[26px] mr-1" />
            <p className="text-[14px] font-bold">Template</p>
          </button>
          {isTokenValid ? (
            <>
              <PiUserCircleFill
                className="text-[40px] cursor-pointer"
                onClick={() => {
                  setMenuHandler(!menuHandler);
                }}
              />
              <div
                className={`menu-wrapper ${menuHandler ? "show" : ""}`}
                onClick={() => {
                  setMenuHandler(false);
                }}
              >
                {menuHandler && (
                  <div className="fixed inset-0 flex items-center justify-center z-40 gap-1">
                    <ul className="absolute bg-white rounded-md flex menu-container flex-col right-7 top-[51px]">
                      <li className="w-full py-2 px-5 hover:bg-slate-100 cursor-pointer rounded-t-md">
                        <p className="text-center">Update User</p>
                      </li>
                      <li className="w-full py-2 px-4 hover:bg-slate-100 cursor-pointer rounded-b-md">
                        <button
                          className="text-center w-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <button
                className="flex flex-row items-center border-[2px] border-black text-black hover:text-white hover:bg-black px-5 py-[7px] rounded-[10px]"
                onClick={openAuthModal}
              >
                <p className="text-[14px] font-bold ">LOGIN</p>
              </button>
            </>
          )}
        </section>
      </div>
    </>
  );
};

export default Navbar;
