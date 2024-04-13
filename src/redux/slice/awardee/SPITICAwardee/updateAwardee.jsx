import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../../utils/baseURL";
import { getAwardee } from "../getAwardee";

export const updateAwardee = createAsyncThunk(
  "update/Awardee",
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
  name: "updateAwardee",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(updateAwardee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateAwardee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(updateAwardee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const updateAwardeeReducer = updateAwardeeSlice.reducer;
export default updateAwardeeReducer;

export const UpdateAwardeeRefresh = (data, userId) => async (dispatch) => {
  try {
    await dispatch(updateAwardee(data));
    await dispatch(getAwardee(userId));
  } catch (error) {
    console.error("Error upading awardee", error.message);
  }
};
