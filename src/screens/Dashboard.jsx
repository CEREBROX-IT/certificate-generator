import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { TbFileImport, TbArrowsExchange2 } from "react-icons/tb";
import { MdAdd } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";
import { students } from "../mockData";
import Navbar from "../components/Navbar";
import AddStudent from "../components/AddStudent";

const Dashboard = () => {
  const [addStudentModal, setAddStudentModal] = useState(false);

  const openStudentModalHandler = () => {
    setAddStudentModal(true);
  };

  const closeStudentModalHandler = () => {
    setAddStudentModal(false);
  };

  //-----for the Table------
  const column = [
    {
      field: "id",
      headerName: "BATCH ID",
      flex: 0.5,
      minWidth: 350,
    },
    {
      field: "student_full_name",
      headerName: "STUDENT FULL NAME",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "quarter",
      headerName: "QUARTER",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "school_name",
      headerName: "SCHOOL NAME",
      flex: 1,
      minWidth: 200,
    },
    {
      field: "adviser_full_name",
      headerName: "ADVISER FULL NAME",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "principal_full_name",
      headerName: "PRINCIPAL FULL NAME",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "school_year",
      headerName: "SCHOOL YEAR",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "present_date",
      headerName: "PRESENT DA",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "avg",
      headerName: "AVERAGE",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "ranking",
      headerName: "RANKING",
      flex: 1,
      minWidth: 170,
    },
    {
      field: "actions",
      headerName: "ACTION",
      minWidth: 120,
      flex: 0.2,

      renderCell: (params) => (
        <>
          <div
            className="bg-[#F13434] p-1 rounded-sm cursor-pointer hover:bg-[#d22727] mr-1.5"
            onClick={() => {
              //   DeleteModalHandler(params.row.id);
            }}
          >
            {/* <DeleteIcon sx={{ color: "white" }} /> */}
          </div>
        </>
      ),
    },
  ];

  return (
    <>
      <>
        {addStudentModal && (
          <AddStudent
            openModal={addStudentModal}
            closeModal={closeStudentModalHandler}
          />
        )}
      </>

      <Navbar />

      <div className="relative flex flex-row justify-center items-center w-full h-[100vh] pt-[97px] p-10 bg-[#F7F9F9]">
        <div className="bg-white relative w-full h-full rounded-[10px] shadow-lg border-t-4 p-5 border-[#F5D45E] overflow-y-hidden">
          <div className="flex flex-col gap-4 lg:gap-0 lg:flex-row justify-between items-center">
            <div className="relative flex flex-row">
              <FiSearch className="absolute right-3 top-[7px] text-[20px]" />
              <input
                placeholder="search"
                className="p-[3px] pr-[35px] pl-4 border-[#dfdfdf] border-[2px] rounded-[20px] w-[100%] md:w-[420px] lg:w-[320px]"
              />
            </div>
            <div className="flex flex-wrap-reverse flex-row gap-2">
              <button className="flex flex-row  gap-1 px-2 items-center bg-[#F5D45E] hover:bg-[#f5c35e] py-[6px] text-white text-[14px] p-[4px] rounded-lg">
                <TbFileImport className="text-[20px]" />
                <p className="font-bold">IMPORT EXCEL</p>
              </button>
              <button className="flex flex-row  gap-1 px-2 items-center bg-[#ED6559] hover:bg-[#b94242] py-[6px] text-white text-[14px] p-[4px] rounded-lg">
                <TbArrowsExchange2 className="text-[20px]" />
                <p className="font-bold">CHANGE CERTIFICATE</p>
              </button>
              <button
                className="flex flex-row  gap-1 px-2 items-center bg-[#47A2FF] hover:bg-[#477eff] py-[6px] text-white text-[14px] p-[4px] rounded-lg"
                onClick={openStudentModalHandler}
              >
                <MdAdd className="text-[20px]" />
                <p className="font-bold">ADD STUDENT</p>
              </button>
              <button className="flex flex-row  gap-1 px-2 items-center bg-[#5AC648] hover:bg-[#4fac3f] py-[6px] text-white text-[14px] p-[4px] rounded-lg">
                <FiPrinter className="text-[20px]" />
                <p className="font-bold">PRINT ALL</p>
              </button>
            </div>
          </div>
          {/* -------TABLE------- */}
          <div className="bg-white rounded-b-lg mx-auto mb-5 mt-5 overflow-hidden">
            <Box
              sx={{
                flexGrow: 1,
                flexWrap: "wrap",
                overflowY: "auto",
                width: "100%",
                height: "100vh",
                "@media (min-width: 375px)": {
                  height: "calc(100vh - 365px)",
                },
                "@media (min-width: 425px)": {
                  height: "calc(100vh - 285px)",
                },
                "@media (min-width: 480px)": {
                  height: "calc(100vh - 320px)",
                },
                "@media (min-width: 525px)": {
                  height: "calc(100vh - 320px)",
                },
                "@media (min-width: 625px)": {
                  height: "calc(100vh - 320px)",
                },
                "@media (min-width: 765px)": {
                  height: "calc(100vh - 280px)",
                },
                "@media (min-width: 810px)": {
                  height: "calc(100vh - 290px)",
                },
                "@media (min-width: 1015px)": {
                  height: "calc(100vh - 285px)",
                },
                "@media (min-width: 1024px)": {
                  height: "calc(100vh - 240px)",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: 1,
                  borderRight: 1,
                  borderColor: "#CFCFCF",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "white",
                  borderBottom: 1,
                  borderTop: 1,
                  borderRadius: 0,
                  borderColor: "#CFCFCF",
                  fontWeight: "bold",
                  color: "black",
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: "white",
                },
                "& .MuiDataGrid-footerContainer": {
                  borderTop: 1,
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "#CFCFCF",
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color: "black !important",
                },
                "& .MuiDataGrid .MuiButton-text": {
                  color: "white !important",
                },
              }}
            >
              <DataGrid
                rows={students}
                columns={column}
                components={{ Toolbar: GridToolbar }}
                checkboxSelection
              />
            </Box>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
