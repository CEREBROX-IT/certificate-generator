import React from "react";
import BridgetteLogo from "./../assets/bridgette-logo.webp"
import { useNavigate } from "react-router-dom";

const Navbar = () => {

    const navigate = useNavigate();
    
    return (
        <>
        <div className="fixed flex flex-row justify-start p-4 bg-[#F5D45E] w-full h-[55px] items-center pl-6"
        onClick={()=>{
            navigate("/")
        }}
        >
        <img src={BridgetteLogo} className="h-[45px] w-[45px]"/> 
            <p className="font_sansita font-bold text-[26px] ml-2">BRIDGETTE</p>
        </div>
        </>
    )
}


export default Navbar;