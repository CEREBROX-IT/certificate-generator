import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/baseURL";
import { getAwardee } from "../getAwardee";

export const addAwardeeSpitic = createAsyncThunk(
  "add/Awardee/Spitic",
  async (data) => {
    try {
      const response = await axios.post(`awardee/spitic/add-awardee/`, data);
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
  name: "addAwardee/Spitic",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addAwardeeSpitic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAwardeeSpitic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(addAwardeeSpitic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const addAwardeeSpiticReducer = addAwardeeSlice.reducer;
export default addAwardeeSpiticReducer;

export const AwardeeRefreshSpitic = (data, userId) => async (dispatch) => {
  try {
    await dispatch(addAwardeeSpitic(data));
    await dispatch(getAwardee(userId));
  } catch (error) {
    console.error("Error adding awardee", error.message);
  }
};
