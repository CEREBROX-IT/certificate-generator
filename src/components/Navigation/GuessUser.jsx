import React from "react";
import { Route, Routes } from "react-router";
import Landing from "../../screens/Landing";
import NotFound from "../../screens/NotFound";
const GuessUser = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default GuessUser;
