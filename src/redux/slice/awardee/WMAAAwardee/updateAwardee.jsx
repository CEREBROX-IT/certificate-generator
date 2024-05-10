import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/baseURL";
import { getAwardee } from "../getAwardee";

export const updateAwardeeWmaa = createAsyncThunk(
  "update/Awardee/Wmaa",
  async (data) => {
    const temData = {
      userId: data.userId,
      postedByName: data.postedByName,
      awardeeName: data.awardeeName,
      avg: data.avg,
    };

    try {
      const response = await axios.put(
        `awardee/wmaa/edit-awardee/${data.id}`,
        temData
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

const updateAwardeeSlice = createSlice({
  name: "updateAwardee/Wmaa",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateAwardeeWmaa.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAwardeeWmaa.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateAwardeeWmaa.rejected, (state) => {
        state.status = "failed";
        state.error = "Average below 85, cannot add awardee";
      });
  },
});

const updateAwardeeWmaaReducer = updateAwardeeSlice.reducer;
export default updateAwardeeWmaaReducer;

export const UpdateAwardeeRefreshWmaa = (data, userId) => async (dispatch) => {
  try {
    await dispatch(updateAwardeeWmaa(data));
    await dispatch(getAwardee(userId));
  } catch (error) {
    // console.error("Error upading awardee", error.message);
  }
};
