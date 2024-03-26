import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (data) => {
    try {
      const response = await axios.get(`auth/user-information/${data}`);
      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const getUserInfoSlice = createSlice({
  name: "getUserInfo",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const getUserInfoRducer = getUserInfoSlice.reducer;
export default getUserInfoRducer;
