import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/baseURL";
import { getAwardee } from "../getAwardee";

export const addAwardeeWmaa = createAsyncThunk(
  "add/Awardee/Wmaa",
  async (data) => {
    try {
      const response = await axios.post(`awardee/wmaa/add-awardee/`, data);
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

const addAwardeeSlice = createSlice({
  name: "addAwardee/Wmaa",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addAwardeeWmaa.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAwardeeWmaa.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addAwardeeWmaa.rejected, (state) => {
        state.status = "failed";
        state.error = "Average below 85, cannot add awardee";
      });
  },
});

const addAwardeeWmaaReducer = addAwardeeSlice.reducer;
export default addAwardeeWmaaReducer;

export const AwardeeRefreshWmaa = (data, userId) => async (dispatch) => {
  try {
    await dispatch(addAwardeeWmaa(data));
    await dispatch(getAwardee(userId));
  } catch (error) {
    console.error("Error adding awardee", error.message);
  }
};
