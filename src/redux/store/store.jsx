import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../slice/auth/registerSlice";
import userLoginReducer from "../slice/auth/loginSlice";
import createSessionReducer from "../slice/session/createSession";
import getSessionReducer from "../slice/session/getSession";

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
    createSession: createSessionReducer,
    getSession: getSessionReducer,
  },
});

export default store;
