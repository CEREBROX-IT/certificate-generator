import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";
import { getAwardee } from "./getAwardee";

export const addAwardee = createAsyncThunk("add/Awardee", async (data) => {
  try {
    const response = await axios.post(`awardee/add-awardee/`, data);
    return response.data;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
});

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const addAwardeeSlice = createSlice({
  name: "addAwardee",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addAwardee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAwardee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addAwardee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const addAwardeeReducer = addAwardeeSlice.reducer;
export default addAwardeeReducer;

export const AwardeeRefresh = (data, userId) => async (dispatch) => {
  try {
    await dispatch(addAwardee(data));
    await dispatch(getAwardee(userId));
  } catch (error) {
    console.error("Error adding awardee", error.message);
  }
};
