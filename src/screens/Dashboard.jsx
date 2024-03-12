import React from "react";
import { FiSearch } from "react-icons/fi";
import { TbFileImport, TbArrowsExchange2 } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";


import Navbar from "../components/Navbar";

const Dashboard = () => {

    return(
        <>
        <Navbar/>
        <div className="relative flex flex-row justify-center items-center w-full h-[100vh] pt-[105px] p-10 bg-[#F7F9F9]">
            <div className="bg-white relative w-full h-full rounded-[10px] shadow-lg border-t-4 p-5 border-[#F5D45E]">
                <div className="flex flex-row justify-between items-center bg-green-100">
                    <div className="relative flex flec-row">
                        <FiSearch className="absolute right-3 top-[7px] text-[20px]"/>
                        <input
                        placeholder="search"
                        className="p-[3px] pr-[35px] pl-2 border-[#dfdfdf] border-[2px] rounded-[20px] w-[320px]"
                        />
                    </div>
                    <div className="flex flex-row gap-2">
                        <button className="flex flex-row  gap-1 px-2 items-center bg-[#F5D45E] py-[6px] text-white text-[14px] p-[4px] rounded-lg">
                            <TbFileImport className="text-[20px]"/>
                            <p className="font-bold">IMPORT EXCEL</p>
                        </button>
                        <button className="flex flex-row  gap-1 px-2 items-center bg-[#ED6559] text-white text-[14px] p-[4px] rounded-lg">
                            <TbArrowsExchange2 className="text-[20px]"/>
                            <p className="font-bold">CHANGE CERTIFICATE</p>
                        </button>
                        <button className="flex flex-row  gap-1 px-2 items-center bg-[#47A2FF] text-white text-[14px] p-[4px] rounded-lg">
                            <MdAdd className="text-[20px]"/>
                            <p className="font-bold">ADD STUDENT</p>
                        </button>
                        <button className="flex flex-row  gap-1 px-2 items-center bg-[#5AC648] text-white text-[14px] p-[4px] rounded-lg">
                            <FiPrinter className="text-[20px]"/>
                            <p className="font-bold">PRINT ALL</p>
                        </button>
                    </div>
                </div>

            </div>
        </div>
        </>
    )
}

export default Dashboard;