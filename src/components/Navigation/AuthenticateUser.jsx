import React from "react";
import { Route, Routes } from "react-router";
import Landing from "../../screens/Landing";
import Option1 from "../../screens/AcademicExcellence/Option1";
import AcademicExcellence from "../../templates/AcademicExcellence";
import NotFound from "../../screens/NotFound";
const AuthenticateUser = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/academic-excellence/" element={<Option1 />} />
        <Route path="*" element={<NotFound />} />
        <Route
          path="/generate-certificate/acadmic-excellence/"
          element={<AcademicExcellence />}
        />
      </Routes>
    </>
  );
};

export default AuthenticateUser;
