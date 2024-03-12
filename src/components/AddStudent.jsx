import React, { useState, useEffect } from "react";

const AddStudent = (openModal, closeModal) => {
  const [modalHandler, setModalHandler] = useState(false);

  useEffect(() => {
    setModalHandler(openModal);
  });

  return (
    <>
      <div className={`modal-wrapper ${modalHandler ? "show" : ""}`}>
        {openModal && (
          <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-40">
            <div className="absolute inset-0" />

            <div
              className="tablet:w-[520px] w-[90%] bg-white flex flex-col mx-auto rounded-[15px]
                 shadow-md modal-container p-7"
            ></div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddStudent;
