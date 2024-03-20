import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";

export const getSession = createAsyncThunk("get/Session", async (data) => {
  try {
    const response = await axios.get(`session/get-session/${data}`);
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

const getSessionSlice = createSlice({
  name: "userRegister",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getSession.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSession.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSession.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const getSessionReducer = getSessionSlice.reducer;
export default getSessionReducer;
