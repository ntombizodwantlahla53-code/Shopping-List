import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Login {
  email: string;
  password: string;
}
interface LoginProps{
lss: Login[];
user: Login | null;
loading: boolean;
  error: string | null;
}
const initialState: LoginProps = {
  lss:[],
  user: null,
  loading: false,
  error: null,
};

export const fetchLogins = createAsyncThunk('logins/fetchLogins',async (login: Login, thunkAPI) => {
    try {
      const response = await fetch(
        `http://localhost:3000/users?email=${login.email}`
      );
      const data = await response.json();

      if (data.length === 0) {
        throw new Error("Invalid email. Please register first.");
      }

      if (data[0].password !== login.password) {
        throw new Error("Incorrect password.");
      }
      return data[0];
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Login failed"
      );
    }
  }
);
export const loginSlice = createSlice({
  name: "logins",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginProps>) => {
      state.lss = action.payload.lss;
      
    },
  },
extraReducers: (builder) =>{
  builder.addCase(fetchLogins.pending, (state) =>{
    state.loading = true
    state.error = null;
  })
  .addCase(fetchLogins.fulfilled, (state, action) =>{
    state.loading= false
    state.user = action.payload;
     state.lss = [action.payload];
})
  .addCase(fetchLogins.rejected, (state, action) =>{
    state.loading= false
    state.error = action.payload as string;
})
},
});
export const {login} = loginSlice.actions
export default loginSlice.reducer