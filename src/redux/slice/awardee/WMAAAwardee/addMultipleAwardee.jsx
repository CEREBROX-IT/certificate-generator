import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/baseURL";
import { getAwardee } from "../getAwardee";

export const addMultipleAwardeeWmaa = createAsyncThunk(
  "add/multiple-awardees/Wmaa",
  async (data) => {
    try {
      const response = await axios.post(
        `awardee/wmaa/add-multiple-awardees/`,
        data
      );
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

const addMultipleAwardeeSlice = createSlice({
  name: "addMultipleAwardee/Wmaa",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addMultipleAwardeeWmaa.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMultipleAwardeeWmaa.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addMultipleAwardeeWmaa.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const addMultipleAwardeeWmaaReducer = addMultipleAwardeeSlice.reducer;
export default addMultipleAwardeeWmaaReducer;

export const MultipleAwardeeRefreshWmaa =
  (excelData, userId) => async (dispatch) => {
    try {
      await dispatch(addMultipleAwardeeWmaa(excelData));
      await dispatch(getAwardee(userId));
    } catch (error) {
      // console.error("Error adding awardee", error.message);
    }
  };
