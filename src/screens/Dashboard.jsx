import React from "react";
import Navbar from "../components/Navbar";
import BridgetteLogo from "./../assets/bridgette-logo.webp"

const Dashboard = () => {

    return (
        <>
        <Navbar/>
        <div className="font-oxygen h-[100vh] w-full p-4 flex flex-col items-center">
            <section className="flex flex-col mt-[90px] px-4 w-full md:w-[800px]">
                <img src={BridgetteLogo} className="h-[95px] w-[95px] mx-auto"/>
                <p className="font_sansita text-center font-bold text-[25px] md:text-[34px]">BRIDGETTE</p>
                <h1 className="text-[#ED6559] font_sansita font-bold text-[30px] md:text-[70px] mt-[-0.4rem] md:mt-[-1.4rem] text-center">CERTIFICATE GENERATOR</h1>
                <p className="text-[14px] md:text-[24px] text-center">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam elementum massa quis vehicula efficitur.</p>
            </section>
            <button className="text-[#F5D45E] text-[20px] font-bold mt-[55px] border-[#F5D45E] border-[3px] p-2 rounded-[10px] w-[220px] hover:bg-[#F5D45E] hover:text-white">
                Get Started
            </button>
        </div>
        </>
    )
}


export default Dashboard;