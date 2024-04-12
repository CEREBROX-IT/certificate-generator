import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/baseURL";

export const createSession = createAsyncThunk(
  "create/Session",
  async (data) => {
    const formData = new FormData();

    // Append data to FormData
    formData.append("userId", data.userId);
    formData.append("category", data.category);
    formData.append("format", data.format);
    formData.append("gradeLevel", data.gradeLevel);
    formData.append("section", data.section);
    formData.append("quarter", data.quarter);
    formData.append("dateToPresent", data.dateToPresent);
    formData.append("designationPlace", data.designationPlace);
    formData.append("signatoryName1", data.signatoryName1);
    formData.append("signatoryPosition1", data.signatoryPosition1);
    formData.append("signatoryName2", data.signatoryName2);
    formData.append("signatoryPosition2", data.signatoryPosition2);
    formData.append("signatoryName3", data.signatoryName3);
    formData.append("signatoryPosition3", data.signatoryPosition3);
    formData.append("signatoryName4", data.signatoryName4);
    formData.append("signatoryPosition4", data.signatoryPosition4);
    formData.append("certificateTemplate", data.certificateTemplate);
    formData.append("signatorySignature1", data.signatorySignature1);
    formData.append("signatorySignature2", data.signatorySignature2);
    formData.append("signatorySignature3", data.signatorySignature3);
    formData.append("signatorySignature4", data.signatorySignature4);

    try {
      // Make a POST request with the FormData object
      const response = await axios.post("session/add-session", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
