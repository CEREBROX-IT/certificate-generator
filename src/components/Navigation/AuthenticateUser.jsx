import React from "react";
import { Route, Routes } from "react-router";
import Landing from "../../screens/Landing";
import Option1 from "../../screens/AcademicExcellence/Option1";
import SPITICTemplate from "../../templates/AcademicExcellence/SPITICTemplate";
import WMAATemplate from "../../templates/AcademicExcellence/WMAATemplate";
import NotFound from "../../screens/NotFound";
import { getUserDatafromToken } from "../../utils/extractJWT";

const AuthenticateUser = () => {
  const schoolBelong = getUserDatafromToken()
    ? getUserDatafromToken().decodedToken.school_belong
    : "";

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/academic-excellence/" element={<Option1 />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/generate-certificate/acadmic-excellence/"
          element={
            <>
              {schoolBelong ===
              "Paul’s Institute of Technology of Iligan City, Inc" ? (
                <SPITICTemplate />
              ) : schoolBelong === "Western Mindanao Adventist Academy" ? (
                <WMAATemplate />
              ) : undefined}
            </>
          }
        />
      </Routes>
    </>
  );
};

export default AuthenticateUser;
