import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";

export const userRegister = createAsyncThunk("user/register", async (data) => {
  try {
    const response = await axios.post("auth/register", data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

export const resetRegisterStatus = createAction("user/resetStatus");

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const userRegisterSLice = createSlice({
  name: "userRegister",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(resetRegisterStatus, (state) => {
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { reducer: userRegisterReducer } = userRegisterSLice;
