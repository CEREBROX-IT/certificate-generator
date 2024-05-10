import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { TbAward } from "react-icons/tb";
import { GrCertificate } from "react-icons/gr";
import { GiTiedScroll } from "react-icons/gi";
import { GiGraduateCap } from "react-icons/gi";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import ImageIcon from "./../../assets/image_icon.webp";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { createSession } from "../../redux/slice/session/createSession";
import { getUserDatafromToken } from "../../utils/extractJWT";

const WMAAFormat = ({ openModal, closeModal }) => {
  const dispatch = useDispatch();
  const SessionStatus = useSelector((state) => state.createSession?.status);
  const [complete, setComplete] = useState("idle");
  const userData = getUserDatafromToken();
  const userID = userData ? userData.decodedToken.userId : "";
  const [modalHandler, setModalHandler] = useState(false);
  const [modalName, setModalName] = useState("SELECT CATEGORY");
  const [currentPath, setCurrentPath] = useState("path1");
  const [signature1, setSignature1] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [gradeLevel, setGradeLevel] = useState(false);
  const [quarter, setQuarter] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [categorySelected, setCategorySelected] = useState(
    "Academic Excellence"
  );

  const onSubmit = (values) => {
    const data = {
      userId: userID,
      category: categorySelected,
      format: "1 Signature",
      gradeLevel: values.grade_level,
      section: "N/a",
      quarter: values.quarter,
      dateToPresent: values.date_to_present,
      designationPlace: values.designation_place,
      signatoryName1:
        watch("signatory_name1") === "" ||
        watch("signatory_name1") === undefined
          ? "N/a"
          : values.signatory_name1,
      signatoryPosition1:
        watch("signatory_position1") === "" ||
        watch("signatory_position1") === undefined
          ? "N/a"
          : values.signatory_position1,
      signatoryName2: "N/a",
      signatoryPosition2: "N/a",
      signatoryName3: "N/a",
      signatoryPosition3: "N/a",
      signatoryName4: "N/a",
      signatoryPosition4: "N/a",
      certificateTemplate: selectedFile,
      signatorySignature1: signature1,
      signatorySignature2: "",
      signatorySignature3: "",
      signatorySignature4: "",
    };
    dispatch(createSession(data));
  };

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }

    setMinDate(`${year}-${month}-${day}`);
  }, []);

  const CommingSoon = () => {
    alert("This Feature is currently not Available.");
  };

  useEffect(() => {
    if (SessionStatus === "loading") {
      setComplete("loading");
    } else if (SessionStatus === "succeeded" && complete === "loading") {
      setComplete("idle");
      window.location.href = "/";
    }
  }, [SessionStatus, setComplete, closeModal, complete]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const pathHandler = (data) => {
    setCurrentPath(data);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const Signature1Attachment = (event) => {
    const file = event.target.files[0];
    setSignature1(file);
  };

  useEffect(() => {
    setModalHandler(openModal);
  }, [openModal]);

  const gradeLevelList = [
    "Kinder 1",
    "Kinder 2",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
  ];

  const quarterList = [
    // "1st Quarter",
    // "2nd Quarter",
    // "3rd Quarter",
    // "4th Quarter",
    // "1st Semester",
    // "2nd Semester",
    "1st Grading",
    "2nd Grading",
  ];

  return (
    <>
      <div className={`modal-wrapper ${modalHandler ? "show" : ""}`}>
        {modalHandler && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-40">
            <div className="absolute inset-0" />
            <div
              className="md:w-[520px] w-[90%] bg-white flex flex-col mx-auto rounded-[15px]
                        shadow-md modal-container p-7 border-t-[5px] border-[#F5D45E]"
            >
              <div className="flex flex-row items-center mb-4">
                <p className="text-center w-full font-bold text-[24px] ml-4">
                  {modalName}
                </p>
                <button
                  className="cursor-pointer rounded-[50%] hover:bg-slate-200 z-10 mt-[-2rem] mr-[-0.5rem]"
                  onClick={() => {
                    pathHandler("path1");
                    closeModal();
                  }}
                >
                  <IoCloseOutline className="text-[35px]" />
                </button>
              </div>
              {currentPath === "path1" ? (
                <>
                  <div className="flex flex-col w-full">
                    <section className="flex flex-wrap gap-2 w-full h-full justify-center">
                      <button
                        className="relative bg-[#ED6559] w-[48%] h-[170px] flex flex-col justify-end cursor-pointer rounded-[10px] p-2 button-9"
                        onClick={() => {
                          pathHandler("path2");
                          setModalName("TEMPLATE FORMAT");
                          setCategorySelected("Academic Excellence");
                        }}
                      >
                        <GiGraduateCap className="absolute text-[80px] top-2 right-2 text-[#a23a31] mt-[-0.9rem]" />
                        <p className="text-[18px] font-bold text-white">
                          Academic Excellence
                        </p>
                      </button>
                      <button
                        className="relative bg-[#5AC648] w-[48%] h-[170px] flex flex-col justify-end cursor-pointer rounded-[10px] p-2 button-9"
                        // onClick={() => {
                        //   // pathHandler("path2");
                        //   // setModalName("TEMPLATE FORMAT");
                        // }}
                        onClick={CommingSoon}
                      >
                        <GrCertificate className="absolute text-[70px] top-2 right-2 text-[#3d8b2f]" />
                        <p className="text-[18px] font-bold text-white">
                          Completion
                        </p>
                      </button>
                      <button
                        className="relative bg-[#a057ff] w-[48%] h-[170px] flex flex-col justify-end cursor-pointer rounded-[10px] p-2 button-9"
                        // onClick={() => {
                        //   // pathHandler("path2");
                        //   // setModalName("TEMPLATE FORMAT");
                        // }}
                        onClick={CommingSoon}
                      >
                        <TbAward className="absolute text-[70px] top-2 right-2 text-[#6929bdeb]" />
                        <p className="text-[18px] font-bold text-white">
                          Best in Subject
                        </p>
                      </button>
                      <button
                        className="relative bg-[#F5D45E] w-[48%] h-[170px] flex flex-col justify-end cursor-pointer rounded-[10px] p-2 button-9"
                        // onClick={() => {
                        //   // pathHandler("path2");
                        //   // setModalName("TEMPLATE FORMAT");
                        // }}
                        onClick={CommingSoon}
                      >
                        <GiTiedScroll className="absolute text-[70px] top-2 right-2 text-[#c4a843]" />
                        <p className="text-[18px] font-bold text-white">
                          Deploma
                        </p>
                      </button>
                    </section>
                  </div>
                  <div className="flex flex-row justify-end mt-4 mr-2"></div>
                </>
              ) : currentPath === "path2" ? (
                <>
                  <div className="z-10 h-[350px]">
                    <div
                      className={`flex flex-col border-black border-[2px] ${
                        selectedFile
                          ? "border-solid"
                          : "border-dashed justify-center"
                      } rounded-[20px] h-[87%] items-center`}
                    >
                      {selectedFile ? (
                        <>
                          <div className="flex flex-row w-full mt-3 items-center pr-2">
                            <input
                              className="w-full mt-2 px-5 bg-transparent border-none outline-none"
                              readOnly
                              value={selectedFile.name}
                              onFocus={(e) => e.target.blur()}
                            />
                            <span
                              className="mt-[6px] cursor-pointer"
                              onClick={() => {
                                setSelectedFile("");
                              }}
                            >
                              <IoCloseOutline className="text-[25px] bg-transparent" />
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={ImageIcon}
                            className="h-[90px]"
                            alt="Image Icon"
                          />
                          <label
                            htmlFor="file-upload"
                            className="hover:bg-[#47A2FF] font-bold hover:text-white text-[#47A2FF] border-[2px] border-[#47A2FF] p-2 px-6 cursor-pointer rounded-md mt-5"
                          >
                            Choose File
                          </label>
                          <input
                            id="file-upload"
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <p className="mt-2 text-[14px] font-bold text-center">
                            Attach Certificate file here
                          </p>
                          <p className="mt-[1px] text-[13px]">
                            (JPG, JPEG, PNG only)
                          </p>
                        </>
                      )}
                    </div>
                    <div className="flex flex-row justify-end py-2 mt-2 gap-2">
                      <button
                        className="py-2 border-[#F5D45E] w-[150px] text-[#F5D45E] border-[2px] font-bold rounded-md"
                        type="submit"
                        onClick={() => {
                          pathHandler("path1");
                          setModalName("ATTACH TEMPLATE");
                        }}
                      >
                        BACK
                      </button>
                      <button
                        disabled={selectedFile === "" ? true : false}
                        className={`py-2 ${
                          selectedFile === ""
                            ? "bg-slate-200 z-[-10]"
                            : "bg-[#F5D45E]"
                        } w-[150px] text-white font-bold rounded-md`}
                        type="submit"
                        onClick={() => {
                          pathHandler("path3");
                          setModalName("DETAILS");
                        }}
                      >
                        NEXT
                      </button>
                    </div>
                  </div>
                </>
              ) : currentPath === "path3" ? (
                <>
                  <form
                    className="h-[500px]  z-10 "
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="w-full h-[90%] overflow-y-auto px-1 pt-2">
                      <div className="flex flex-col md:flex-row w-full md:gap-4">
                        <FormControl
                          sx={{
                            marginBottom: 3,
                            width: "100%",
                          }}
                        >
                          <TextField
                            select
                            label="Grade Level"
                            variant="outlined"
                            name="grade_level"
                            error={gradeLevel ? true : false}
                            {...register("grade_level", {
                              required: "This is required.",
                            })}
                            SelectProps={{
                              MenuProps: { disableScrollLock: true },
                              style: {
                                height: "47px",
                              },
                            }}
                          >
                            <MenuItem value="">
                              <p
                                className="text-slate-500 text-[12px]"
                                onClick={() => {
                                  setGradeLevel(true);
                                }}
                              >
                                Select one
                              </p>
                            </MenuItem>
                            {gradeLevelList.map((grade, index) => (
                              <MenuItem
                                key={index}
                                value={grade}
                                onClick={() => {
                                  setGradeLevel(false);
                                }}
                              >
                                {grade}
                              </MenuItem>
                            ))}
                          </TextField>
                          {errors.grade_level && (
                            <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-1.5rem]">
                              {gradeLevel && errors.grade_level.message}
                            </p>
                          )}
                        </FormControl>
                      </div>
                      <div className="flex flex-col md:flex-row w-full md:gap-4">
                        <FormControl
                          sx={{
                            marginBottom: quarter ? 5 : 3,
                            width: "100%",
                          }}
                        >
                          <TextField
                            select
                            label="Quarter"
                            variant="outlined"
                            name="quarter"
                            error={quarter ? true : false}
                            {...register("quarter", {
                              required: "This is required.",
                            })}
                            SelectProps={{
                              MenuProps: { disableScrollLock: true },
                              style: {
                                height: "47px",
                              },
                            }}
                          >
                            <MenuItem value="">
                              <p
                                className="text-slate-500 text-[12px]"
                                onClick={() => {
                                  setQuarter(true);
                                }}
                              >
                                Select one
                              </p>
                            </MenuItem>

                            {quarterList.map((quarter, index) => (
                              <MenuItem
                                key={index}
                                value={quarter}
                                onClick={() => {
                                  setQuarter(false);
                                }}
                              >
                                {quarter}
                              </MenuItem>
                            ))}
                          </TextField>
                          {errors.quarter && (
                            <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-1.5rem]">
                              {quarter && errors.quarter.message}
                            </p>
                          )}
                        </FormControl>

                        <div className="relative mb-5 w-full flex flex-col">
                          <p className="absolute text-[###323232] text-[12px] mt-[-0.6rem] ml-2 bg-white z-10 px-[4px]">
                            Date to present
                          </p>
                          <TextField
                            variant="outlined"
                            name="date_to_present"
                            type="date"
                            className="w-full"
                            error={errors.date_to_present ? true : false}
                            inputProps={{
                              style: {
                                height: "14px",
                              },
                              min: minDate, // Set the min attribute to disable past dates
                            }}
                            {...register("date_to_present", {
                              required: "This is required.",
                            })}
                          />
                          {errors.awardee_name && (
                            <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                              {errors.date_to_present.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="mb-3 w-full">
                        <TextField
                          label="Designating place for the award ceremony"
                          variant="outlined"
                          name="designation_place"
                          className="w-full"
                          error={errors.designation_place ? true : false}
                          inputProps={{
                            style: {
                              height: "14px",
                            },
                          }}
                          {...register("designation_place", {
                            required: "This is required.",
                          })}
                        />
                        {errors.designation_place && (
                          <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                            {errors.designation_place.message}
                          </p>
                        )}
                      </div>
                      {/* ========SIGNATORY ONE========== */}
                      <p className="font-bold text-[14px] mb-1">Signatory 1</p>
                      <div className="w-full border-t-[2px] border-[#C4C4C4]">
                        <div className="mb-5  mt-4 w-full">
                          <p className="font-bold text-[14px] mb-1">
                            Signature Attachment (png only)
                          </p>
                          <TextField
                            name="signatory_attachment1"
                            className="border-[1.5px] rounded-[5px] border-[#C4C4C4] h-[48px] p-[8px] w-full hover:border-black"
                            type="file"
                            error={errors.signatory_attachment1 ? true : false}
                            accept=".png"
                            InputProps={{
                              style: {
                                height: "47px",
                                display: "flex",
                                alignItems: "center",
                              },
                              inputProps: {
                                accept: "image/png",
                              },
                            }}
                            {...register("signatory_attachment1", {
                              required: "This is required.",
                            })}
                            onChange={Signature1Attachment}
                          />
                          {errors.signatory_attachment1 && (
                            <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                              {errors.signatory_attachment1.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-5 w-full">
                          <TextField
                            label="Signatory Name"
                            variant="outlined"
                            name="signatory_name1"
                            className="w-full"
                            error={errors.signatory_name1 ? true : false}
                            inputProps={{
                              style: {
                                height: "14px",
                              },
                            }}
                            {...register("signatory_name1", {
                              required: "This is required.",
                              pattern: {
                                value: /^[a-z ,.'-]+$/i,
                                message: "Invalid characters in name.",
                              },
                            })}
                          />
                          {errors.signatory_name1 && (
                            <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                              {errors.signatory_name1.message}
                            </p>
                          )}
                        </div>
                        <div className="mb-5 w-full">
                          <TextField
                            label="Signatory Position"
                            variant="outlined"
                            name="signatory_position1"
                            className="w-full"
                            error={errors.signatory_position1 ? true : false}
                            inputProps={{
                              style: {
                                height: "14px",
                              },
                            }}
                            {...register("signatory_position1", {
                              required: "This is required.",
                            })}
                          />
                          {errors.signatory_position1 && (
                            <p className="ml-1 mt-1 text-[13px] text-red-500 mb-[-0.2rem]">
                              {errors.signatory_position1.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-row justify-end mt-4 gap-2">
                      <button
                        className="py-2 border-[#F5D45E] border-[2px] w-[150px] text-[#F5D45E] font-bold rounded-md"
                        onClick={() => {
                          pathHandler("path2");
                          setModalName("TEMPLATE FORMAT");
                        }}
                      >
                        BACK
                      </button>

                      {complete === "loading" ? (
                        <>
                          <button className="py-2 bg-[#F5D45E] w-[150px] text-white font-bold rounded-md z-[-10]">
                            <CircularProgress
                              size={20}
                              sx={{ color: "white", marginTop: "4px" }}
                            />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            className="py-2 bg-[#F5D45E] w-[150px] text-white font-bold rounded-md"
                            type="submit"
                            onClick={() => {
                              {
                                watch("quarter") === "" ||
                                watch("quarter") === undefined
                                  ? setQuarter(true)
                                  : setQuarter(false);
                              }
                              {
                                watch("grade_level") === "" ||
                                watch("grade_level") === undefined
                                  ? setGradeLevel(true)
                                  : setGradeLevel(false);
                              }
                            }}
                          >
                            SUBMIT
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </>
              ) : undefined}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default WMAAFormat;
