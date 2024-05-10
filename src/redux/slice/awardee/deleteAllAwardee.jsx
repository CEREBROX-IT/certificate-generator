import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";
import { getAwardee } from "./getAwardee";

export const deleteAllAwardee = createAsyncThunk(
  "deleteAll/Awardee",
  async (data) => {
    try {
      const response = await axios.delete(`awardee/deleteAll-awardee/${data}`);
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

const deleteAllAwardeeSlice = createSlice({
  name: "deleteAllAwardee",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllAwardee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAllAwardee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteAllAwardee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const deleteAllAwardeeReducer = deleteAllAwardeeSlice.reducer;
export default deleteAllAwardeeReducer;

export const deleteAllAwardeeRefresh = (userId) => async (dispatch) => {
  try {
    await dispatch(deleteAllAwardee(userId));
    await dispatch(getAwardee(userId));
  } catch (error) {
    // console.error("Error deleting all awardee", error.message);
  }
};
