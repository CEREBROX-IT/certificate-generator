import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "./../../../utils/baseURL";

// Function to set a cookie
const setJwtCookie = (token) => {
  document.cookie = `bridgette=${token}; max-age=${
    24 * 60 * 60
  }; path=/; domain=localhost; samesite=lax`;
};

export const userLogin = createAsyncThunk("user/login", async (data) => {
  try {
    const response = await axios.post("auth/login", data);
    const token = response.data.token;
    setJwtCookie(token);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
});

const initialState = {
  data: null,
  status: "idle",
  error: null,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

const userLoginReducer = userLoginSlice.reducer;
export default userLoginReducer;
