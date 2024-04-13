import { configureStore } from "@reduxjs/toolkit";
import {
  userRegisterReducer,
  resetRegisterStatus,
} from "../slice/auth/registerSlice";
import { userLoginReducer, resetStatus } from "../slice/auth/loginSlice";
import createSessionReducer from "../slice/session/createSession";
import getSessionReducer from "../slice/session/getSession";
import deleteSessionReducer from "../slice/session/resetSession";
import getAwardeeReducer from "../slice/awardee/getAwardee";
import addAwardeeSpiticReducer from "../slice/awardee/SPITICAwardee/addAwardee";
import addAwardeeWmaaReducer from "../slice/awardee/WMAAAwardee/addAwardee";
import addMultipleAwardeeSpiticReducer from "../slice/awardee/SPITICAwardee/addMultipleAwardee";
import addMultipleAwardeeWmaaReducer from "../slice/awardee/WMAAAwardee/addMultipleAwardee";
import updateAwardeeSpiticReducer from "../slice/awardee/SPITICAwardee/updateAwardee";
import updateAwardeeWmaaReducer from "../slice/awardee/WMAAAwardee/updateAwardee";
import deleteAwardeeReducer from "../slice/awardee/deleteAwardee";
import deleteAllAwardeeReducer from "../slice/awardee/deleteAllAwardee";
import updateInfoReducer from "../slice/auth/updateInfo";
import changePasswordReducer from "../slice/auth/updatePassword";
import getUserInfoRducer from "../slice/auth/getUserInfo";

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    resetRigsterStatus: resetRegisterStatus,
    userLogin: userLoginReducer,
    resetLoginStatus: resetStatus,
    updateInfo: updateInfoReducer,
    changePassword: changePasswordReducer,
    getUserInfo: getUserInfoRducer,
    createSession: createSessionReducer,
    getSession: getSessionReducer,
    deleteSession: deleteSessionReducer,
    addAwardeeSpitic: addAwardeeSpiticReducer,
    addAwardeeWmaa: addAwardeeWmaaReducer,
    addMultipleAwardeeSpitic: addMultipleAwardeeSpiticReducer,
    addMultipleAwardeeWmaa: addMultipleAwardeeWmaaReducer,
    updateAwardeeSpitic: updateAwardeeSpiticReducer,
    updateAwardeeWmaa: updateAwardeeWmaaReducer,
    getAwardee: getAwardeeReducer,
    deleteAwardee: deleteAwardeeReducer,
    deleteAllAwardee: deleteAllAwardeeReducer,
  },
});

export default store;
