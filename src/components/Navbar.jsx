import React,{useState} from "react";
import BridgetteLogo from "./../assets/bridgette-logo.webp";
import { GoDownload } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import TemplateOtion from "./TemplateOption";

const Navbar = () => {
  const navigate = useNavigate(); 
  const [templateModal, setTemplateModal] = useState(false);


  const openTemplateModal = () => {
    setTemplateModal(true)
  }

  const closeTemplateModal = () => {
    setTemplateModal(false)
  }



  

  return (
    <>
      {templateModal && (
        <TemplateOtion openModal={templateModal} closeModal={closeTemplateModal} />
      )}

      <div className="fixed flex flex-row justify-between p-4 bg-[#F5D45E] w-full h-[55px] items-center cursor-pointer z-10">
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
        <button className="flex flex-row items-center border-[2px] border-black text-black hover:text-white hover:bg-black px-4 py-1 rounded-[10px] md:mr-6"
        onClick={openTemplateModal}
        >
          <GoDownload className="text-[26px] mr-1" />
          <p className="text-[14px] font-bold">Template</p>
        </button>
      </div>
    </>
  );
};

export default Navbar;
