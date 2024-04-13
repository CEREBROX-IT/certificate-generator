import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/baseURL";
import { getAwardee } from "../getAwardee";

export const addMultipleAwardee = createAsyncThunk(
  "add/multiple-awardees",
  async (data) => {
    try {
      const response = await axios.post(
        `awardee/spitic/add-multiple-awardees/`,
        data
      );
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

const addMultipleAwardeeSlice = createSlice({
  name: "addMultipleAwardee",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addMultipleAwardee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMultipleAwardee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addMultipleAwardee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const addMultipleAwardeeReducer = addMultipleAwardeeSlice.reducer;
export default addMultipleAwardeeReducer;

export const MultipleAwardeeRefresh =
  (excelData, userId) => async (dispatch) => {
    try {
      await dispatch(addMultipleAwardee(excelData));
      await dispatch(getAwardee(userId));
    } catch (error) {
      console.error("Error adding awardee", error.message);
    }
  };
