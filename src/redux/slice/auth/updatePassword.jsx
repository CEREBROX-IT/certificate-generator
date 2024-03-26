import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";

export const changePassword = createAsyncThunk(
  "user/changePassword",
  async (data) => {
    try {
      const response = await axios.put("auth/change-password", data);
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

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const changePasswordReducer = changePasswordSlice.reducer;
export default changePasswordReducer;
