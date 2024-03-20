import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";

export const createSession = createAsyncThunk(
  "create/Session",
  async (data) => {
    try {
      const response = await axios.post("session/add-session", data);
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

const createSessionSlice = createSlice({
  name: "createSession",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const createSessionReducer = createSessionSlice.reducer;
export default createSessionReducer;
