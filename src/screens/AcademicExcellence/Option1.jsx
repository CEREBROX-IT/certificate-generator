import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { TbFileImport } from "react-icons/tb";
import { MdAdd, MdRemove, MdEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";
import { students } from "../../mockData";
import Navbar from "../../components/Navbar";
import AddOption1Awardee from "../../components/AcademicExcellence/AddOption1Awardee";
import Tooltip from "@mui/material/Tooltip";
import { getUserDatafromToken } from "../../utils/extractJWT";
import { useDispatch, useSelector } from "react-redux";
import { deleteSession } from "../../redux/slice/session/resetSession";
import { Button } from "@mui/material";

const Option1 = () => {
  const dispatch = useDispatch();
  const userData = getUserDatafromToken();
  const userID = userData ? userData.decodedToken.userId : 0;
  const DeleteStatus = useSelector((state) => state.deleteSession?.status);
  const [addAwardeeModal, setAddAwardeeModal] = useState(false);

  const openAwardeeModalHandler = () => {
    setAddAwardeeModal(true);
  };

  const closeAwardeeModalHandler = () => {
    setAddAwardeeModal(false);
  };

  const ResetSessionHandler = () => {
    dispatch(deleteSession(userID));
  };

  useEffect(() => {
    if (DeleteStatus === "succeeded") {
      window.location.href = "/";
    }
  }, [DeleteStatus]);

  //-----for the Table------
  const column = [
    {
      field: "id",
      headerName: "BATCH ID",
      flex: 0.5,
      minWidth: 150,
    },
    {
      field: "awardee_name",
      headerName: "AWARDEE NAME",
      flex: 1,
      minWidth: 270,
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
      minWidth: 160,
      flex: 0.2,

      renderCell: (params) => (
        <>
          <button
            className="bg-[#F13434] p-1 rounded-sm cursor-pointer mr-1.5"
            onClick={() => {
              //   DeleteModalHandler(params.row.id);
            }}
          >
            <MdRemove className="text-[20px] text-white" />
          </button>
          <button
            className="bg-[#923DFF] p-1 rounded-sm cursor-pointer mr-1.5"
            onClick={() => {
              //   DeleteModalHandler(params.row.id);
            }}
          >
            <MdEdit className="text-[20px] text-white" />
          </button>
          <button
            className="bg-[#5AC648] p-1 rounded-sm cursor-pointer mr-1.5"
            onClick={() => {
              //   DeleteModalHandler(params.row.id);
            }}
          >
            <FiPrinter className="text-[20px] text-white" />
          </button>
        </>
      ),
    },
  ];

  return (
    <>
      {addAwardeeModal && (
        <AddOption1Awardee
          openModal={addAwardeeModal}
          closeModal={closeAwardeeModalHandler}
        />
      )}

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
              <button className="flex flex-row  gap-1 px-2 items-center bg-[#F5D45E] py-[6px] text-white text-[14px] p-[4px] rounded-lg">
                <TbFileImport className="text-[20px]" />
                <p className="font-bold">IMPORT EXCEL</p>
              </button>

              <button
                className="flex flex-row  gap-1 px-2 items-center bg-[#47A2FF] py-[6px] text-white text-[14px] p-[4px] rounded-lg"
                onClick={openAwardeeModalHandler}
              >
                <MdAdd className="text-[20px]" />
                <p className="font-bold">ADD AWARDEE</p>
              </button>
              <button className="flex flex-row  gap-1 px-2 items-center bg-[#5AC648] py-[6px] text-white text-[14px] p-[4px] rounded-lg">
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
      <div className="absolute md:right-7 md:bottom-7 right-4 bottom-4">
        <Tooltip
          title="Reset current session to create new session."
          placement="left"
        >
          <Button
            onClick={ResetSessionHandler}
            sx={{
              backgroundColor: "#FF1000",
              color: "white",
              borderRadius: "50%",
              minHeight: "60px",
              minWidth: " 60px",
              boxShadow: 2,
              "&:hover": {
                backgroundColor: "#CD0D00",
              },
            }}
          >
            <IoTrashBin className="text-[32px]" />
          </Button>
        </Tooltip>
      </div>
    </>
  );
};

export default Option1;
