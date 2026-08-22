import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Register } from "./register";

interface LoginState {
  user: Register | null;
  loading: boolean;
  error: string | null
}
const initialState: LoginState = {
  user: null,
  loading: false,
  error: null,
};
export const fetchLogins = createAsyncThunk("logins/fetchLogins",async (login:Pick<Register, "email" | "password">,thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/users?email=${login.email}`
      );
      const data = await response.json();

      if (data.length === 0) {throw new Error(
          "Invalid email,Try again"
        );
      }
      if (data[0].password !== login.password) {
        throw new Error("Incorrect password");
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    }
  }
);
export const loginSlice = createSlice({
  name: "logins",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogins.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchLogins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export default loginSlice.reducer;