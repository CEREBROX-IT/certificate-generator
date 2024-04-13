import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "./../../../utils/baseURL";

// Function to set a cookie - <<<For development>>>
// const setJwtCookie = (token) => {
//   document.cookie = `bridgette=${token}; max-age=${
//     24 * 60 * 60
//   }; path=/; domain=localhost; samesite=lax`;
// };

// Function to set a cookie - <<<For Production>>>
const setJwtCookie = (token) => {
  document.cookie = `bridgette=${token}; max-age=${
    1 * 24 * 60 * 60
  }; path=/; domain=certificate-generator.cerebrox.online; samesite=lax`;
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

export const resetStatus = createAction("user/resetStatus");

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
      })
      .addCase(resetStatus, (state) => {
        state.status = "idle";
        state.error = null;
      });
  },
});

export const { reducer: userLoginReducer } = userLoginSlice;
