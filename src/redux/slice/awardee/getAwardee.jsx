import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";

export const getAwardee = createAsyncThunk("get/Awardee", async (data) => {
  try {
    const response = await axios.get(`awardee/get-awardee/${data}`);
    return response.data;
  } catch (error) {
    // console.error(error.message);
    throw error;
  }
});

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const getAwardeeSlice = createSlice({
  name: "getAwardee",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getAwardee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAwardee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAwardee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const getAwardeeReducer = getAwardeeSlice.reducer;
export default getAwardeeReducer;
