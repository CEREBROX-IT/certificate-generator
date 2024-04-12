import { configureStore } from "@reduxjs/toolkit";
import {
  userRegisterReducer,
  resetRegisterStatus,
} from "../slice/auth/registerSlice";
import { userLoginReducer, resetStatus } from "../slice/auth/loginSlice";
import createSessionReducer from "../slice/session/createSession";
import getSessionReducer from "../slice/session/getSession";
import deleteSessionReducer from "../slice/session/resetSession";
import addAwardeeReducer from "../slice/awardee/addAwardee";
import getAwardeeReducer from "../slice/awardee/getAwardee";
import addMultipleAwardeeReducer from "../slice/awardee/addMultipleAwardee";
import updateAwardeeReducer from "../slice/awardee/updateAwardee";
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
    addAwardee: addAwardeeReducer,
    addMultipleAwardee: addMultipleAwardeeReducer,
    getAwardee: getAwardeeReducer,
    updateAwardee: updateAwardeeReducer,
    deleteAwardee: deleteAwardeeReducer,
    deleteAllAwardee: deleteAllAwardeeReducer,
  },
});

export default store;
