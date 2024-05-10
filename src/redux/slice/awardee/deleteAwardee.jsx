import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";
import { getAwardee } from "./getAwardee";

export const deleteAwardee = createAsyncThunk(
  "delete/Awardee",
  async (data) => {
    try {
      const response = await axios.delete(`awardee/delete-awardee/${data}`);
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

const deleteAwardeeSlice = createSlice({
  name: "deleteAwardee",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteAwardee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteAwardee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(deleteAwardee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const deleteAwardeeReducer = deleteAwardeeSlice.reducer;
export default deleteAwardeeReducer;

export const deleteAwardeeRefresh = (data, userId) => async (dispatch) => {
  try {
    await dispatch(deleteAwardee(data));
    await dispatch(getAwardee(userId));
  } catch (error) {
    // console.error("Error deleting awardee", error.message);
  }
};
