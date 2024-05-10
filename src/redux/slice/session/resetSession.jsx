import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";

export const deleteSession = createAsyncThunk(
  "delete/Session",
  async (data) => {
    try {
      const response = await axios.delete(`session/delete-session/${data}`);
      return response.data;
    } catch (error) {
      // console.error(error.message);
      throw error;
    }
  }
);

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const deleteSessionSlice = createSlice({
  name: "userRegister",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const deleteSessionReducer = deleteSessionSlice.reducer;
export default deleteSessionReducer;
