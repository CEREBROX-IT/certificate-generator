import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/baseURL";
import { getAwardee } from "../getAwardee";

export const updateAwardeeSpitic = createAsyncThunk(
  "update/Awardee/Spitic",
  async (data) => {
    const temData = {
      userId: data.userId,
      postedByName: data.postedByName,
      awardeeName: data.awardeeName,
      avg: data.avg,
    };

    try {
      const response = await axios.put(
        `awardee/spitic/edit-awardee/${data.id}`,
        temData
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

const updateAwardeeSlice = createSlice({
  name: "updateAwardee/Spitic",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateAwardeeSpitic.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAwardeeSpitic.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateAwardeeSpitic.rejected, (state) => {
        state.status = "failed";
        state.error = "Average below 80, cannot add awardee";
      });
  },
});

const updateAwardeeSpiticReducer = updateAwardeeSlice.reducer;
export default updateAwardeeSpiticReducer;

export const UpdateAwardeeRefreshSpitic =
  (data, userId) => async (dispatch) => {
    try {
      await dispatch(updateAwardeeSpitic(data));
      await dispatch(getAwardee(userId));
    } catch (error) {
      console.error("Error upading awardee", error.message);
    }
  };
