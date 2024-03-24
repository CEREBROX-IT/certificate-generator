import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { TbFileImport } from "react-icons/tb";
import { MdAdd, MdRemove, MdEdit } from "react-icons/md";
import { IoTrashBin } from "react-icons/io5";
import { FiPrinter } from "react-icons/fi";
import Navbar from "../../components/Navbar";
import AddOption1Awardee from "../../components/AcademicExcellence/AddOption1Awardee";
import UpdateOption1Awardee from "../../components/AcademicExcellence/UpdateOption1Awardee";
import Tooltip from "@mui/material/Tooltip";
import { getUserDatafromToken } from "../../utils/extractJWT";
import { useDispatch, useSelector } from "react-redux";
import { deleteSession } from "../../redux/slice/session/resetSession";
import { Button } from "@mui/material";
import { MultipleAwardeeRefresh } from "../../redux/slice/awardee/addMultipleAwardee";
import { getAwardee } from "../../redux/slice/awardee/getAwardee";
import { getSession } from "../../redux/slice/session/getSession";
import * as XLSX from "xlsx";

const Option1 = () => {
  const dispatch = useDispatch();
  const userData = getUserDatafromToken();
  const awardeeList = useSelector((state) => state.getAwardee?.data?.awardees);
  const [tableData, setTableData] = useState([]);
  const userID = userData ? userData.decodedToken.userId : 0;
  const DeleteStatus = useSelector((state) => state.deleteSession?.status);
  const [addAwardeeModal, setAddAwardeeModal] = useState(false);
  const [updateAwardeeModal, setUpdateAwardeeModal] = useState(false);
  const [rowData, setRowData] = useState("");
  const [excelData, setExcelData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const openAwardeeModalHandler = () => {
    setAddAwardeeModal(true);
  };

  const closeAwardeeModalHandler = () => {
    setAddAwardeeModal(false);
  };

  const openUpdateAwardeeModalHandler = (data) => {
    setRowData(data);
    setUpdateAwardeeModal(true);
  };

  const closeUpdateAwardeeModalHandler = () => {
    setUpdateAwardeeModal(false);
  };

  const ResetSessionHandler = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset the session?"
    );

    if (confirmReset) {
      dispatch(deleteSession(userID));
    }
  };

  useEffect(() => {
    if (excelData.length > 0) {
      dispatch(MultipleAwardeeRefresh(excelData, userID));
    }
  }, [dispatch, excelData, userID]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Add additional data to each object
      const enrichedData = jsonData.map((row) => ({
        ...row,
        userId: userID,
        postedByName:
          userData.decodedToken.first_name +
          " " +
          userData.decodedToken.last_name,
      }));

      // Remove __rowNum__ property from each object
      const sanitizedData = enrichedData.map(({ __rowNum__, ...rest }) => rest);

      setExcelData(sanitizedData);
    };

    reader.readAsArrayBuffer(file);
  };

  useEffect(() => {
    dispatch(getAwardee(userID));
    dispatch(getSession(userID));

    if (DeleteStatus === "succeeded") {
      window.location.href = "/";
    }
  }, [DeleteStatus, dispatch]);

  useEffect(() => {
    if (awardeeList) {
      setTableData(awardeeList);
    }
  }, [awardeeList]);

  useEffect(() => {
    applyFilters();
  }, [searchQuery]);

  const applyFilters = () => {
    if (searchQuery === "") {
      // If search query is empty, display all data
      setTableData(awardeeList);
    } else {
      // Apply search filter
      const filteredData = awardeeList.filter((data) =>
        data.awardeeName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setTableData(filteredData);
    }
  };

  const column = [
    {
      field: "id",
      headerName: "AWARDEE ID",
      flex: 0.5,
      minWidth: 150,
    },

    {
      field: "awardeeName",
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
      minWidth: 200,
      flex: 0.2,

      renderCell: (params) => (
        <>
          <button
            className="bg-[#F13434] p-1 rounded-sm cursor-pointer mr-1.5"
            onClick={() => {
              // DeleteModalHandler(params.row.id);
              console.log("deleted::", params.row.id);
            }}
          >
            <MdRemove className="text-[20px] text-white" />
          </button>
          <button
            className="bg-[#923DFF] p-1 rounded-sm cursor-pointer mr-1.5"
            onClick={() => {
              console.log(params.row);
              openUpdateAwardeeModalHandler(params.row);
            }}
          >
            <MdEdit className="text-[20px] text-white" />
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

      {updateAwardeeModal && (
        <UpdateOption1Awardee
          openModal={updateAwardeeModal}
          closeModal={closeUpdateAwardeeModalHandler}
          rowData={rowData}
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex flex-wrap-reverse flex-row gap-2">
              <label
                htmlFor="file-upload"
                className="flex flex-row gap-1 px-2 items-center bg-[#F5D45E] hover:bg-[#e6c757] py-[6px] text-white text-[14px] p-[4px] rounded-lg cursor-pointer"
              >
                <TbFileImport className="text-[20px]" />
                <p className="font-bold">IMPORT</p>
              </label>
              <input
                type="file"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <button
                className="flex flex-row  gap-1 px-2 items-center bg-[#F13434] hover:bg-[#d04040] py-[6px] text-white text-[14px] p-[4px] rounded-lg"
                onClick={openAwardeeModalHandler}
              >
                <MdRemove className="text-[20px]" />
                <p className="font-bold">REMOVE ALL</p>
              </button>
              <button
                className="flex flex-row  gap-1 px-2 items-center bg-[#47A2FF] hover:bg-[#478ed5] py-[6px] text-white text-[14px] p-[4px] rounded-lg"
                onClick={openAwardeeModalHandler}
              >
                <MdAdd className="text-[20px]" />
                <p className="font-bold">ADD AWARDEE</p>
              </button>

              <button
                className="flex flex-row  gap-1 px-2 items-center bg-[#5AC648] hover:bg-[#50b73d] py-[6px] text-white text-[14px] p-[4px] rounded-lg"
                onClick={() => {
                  window.open("/generate-certificate/acadmic-excellence/");
                }}
              >
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
                rows={tableData || []}
                columns={column}
                components={{ Toolbar: GridToolbar }}
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
