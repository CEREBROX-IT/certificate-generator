import { configureStore } from "@reduxjs/toolkit";
import userRegisterReducer from "../slice/auth/registerSlice";
import userLoginReducer from "../slice/auth/loginSlice";

const store = configureStore({
  reducer: {
    userRegister: userRegisterReducer,
    userLogin: userLoginReducer,
  },
});

export default store;
