import React, { useState, useEffect } from "react";
import BridgetteLogo from "./../assets/bridgette-logo.webp";
import { FaUserPen } from "react-icons/fa6";
import { GoSignOut } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import EditProfileModal from "./EditProfileModal";
import AuthenticationModal from "./Auth/Auth";
import { PiUserCircleFill } from "react-icons/pi";
import { getUserDatafromToken } from "../utils/extractJWT";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo } from "../redux/slice/auth/getUserInfo";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const Status = useSelector((state) => state.getUserInfo?.status);
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [AuthModal, setAuthModal] = useState(false);
  const [menuHandler, setMenuHandler] = useState(false);
  const userData = getUserDatafromToken();
  const userId = userData ? userData.decodedToken.userId : 0;
  const first_name = userData ? userData.decodedToken.first_name : 0;
  const userStatus = userData ? userData.decodedToken.status : false;

  const openEditProfile = () => {
    setEditProfileModal(true);
  };

  const closeEditProfile = () => {
    setEditProfileModal(false);
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
    window.location.href = "/";
  };

  useEffect(() => {
    dispatch(getUserInfo(userId));
  }, [dispatch]);

  return (
    <>
      {editProfileModal && (
        <EditProfileModal
          openModal={editProfileModal}
          closeModal={closeEditProfile}
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
          className="flex flex-row items-center  md:ml-6 cursor-pointer"
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
          {Status === "succeeded" && (
            <p className="md:flex hidden">Hello! {first_name}</p>
          )}
          {userStatus ? (
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
                    <div className="absolute bg-white rounded-md flex menu-container flex-col md:right-10 right-4 top-[51px] w-[170px]">
                      <button
                        className="flex flex-row items-center w-full py-3 hover:bg-slate-100 cursor-pointer rounded-t-md px-6 gap-2"
                        onClick={openEditProfile}
                      >
                        <FaUserPen className="text-[20px]" />
                        <p>Edit Profile</p>
                      </button>
                      <button
                        className="flex flex-row items-center w-full py-3 hover:bg-slate-100 cursor-pointer rounded-b-md px-6 gap-2"
                        onClick={handleLogout}
                      >
                        <GoSignOut className="text-[20px]" />
                        <p>Logout</p>
                      </button>
                    </div>
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
