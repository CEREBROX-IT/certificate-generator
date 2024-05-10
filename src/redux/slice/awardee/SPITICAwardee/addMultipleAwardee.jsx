import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/baseURL";
import { getAwardee } from "../getAwardee";

export const addMultipleAwardeeSpitic = createAsyncThunk(
  "add/multiple-awardees/Spitic",
  async (data) => {
    try {
      const response = await axios.post(
        `awardee/spitic/add-multiple-awardees/`,
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
  name: "addMultipleAwardee/Spitic",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addMultipleAwardeeSpitic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMultipleAwardeeSpitic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addMultipleAwardeeSpitic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const addMultipleAwardeeSpiticReducer = addMultipleAwardeeSlice.reducer;
export default addMultipleAwardeeSpiticReducer;

export const MultipleAwardeeRefreshSpitic =
  (excelData, userId) => async (dispatch) => {
    try {
      await dispatch(addMultipleAwardeeSpitic(excelData));
      await dispatch(getAwardee(userId));
    } catch (error) {
      // console.error("Error adding awardee", error.message);
    }
  };
