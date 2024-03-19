import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../../utils/baseURL";

export const userLogin = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post("auth/login", data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.token;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const userLoginReducer = userLoginSlice.reducer;
export default userLoginReducer;
