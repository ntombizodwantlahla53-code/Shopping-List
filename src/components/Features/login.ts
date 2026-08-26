import {createSlice,createAsyncThunk,} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Register } from "./register";

interface LoginState {
  info: {
    email: string;
    password: string;
    };
    user: Register | null;
    loading: boolean;
    error: string | null;
    editing: boolean;
    authChecked: boolean;
}
const initialState: LoginState = {
  info: {
    email: "",
    password: "",
  },
  user: null,
  loading: false,
  error: null,
  editing: false,
  authChecked: false,
};
export const fetchLogins = createAsyncThunk("logins/fetchLogins",async (login: {email: string;password: string;},thunkAPI) => {
    try{
      const response = await fetch(`http://localhost:3000/users?email=${login.email}`);
      const data = await response.json();
      if (data.length === 0) {
        throw new Error("Invalid email, Try again");
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
export const restoreSession = createAsyncThunk("logins/restoreSession",async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      return null;
    }
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    if (!response.ok) {
      localStorage.removeItem("userId");
      return null;
    }
    return await response.json();
  }
);
export const updateUser = createAsyncThunk("logins/updateUser",async (user: Register,thunkAPI) => {
    try{
      const response = await fetch(`http://localhost:3000/users/${user.id}`,{
          method: "PATCH",
          headers: {"Content-Type": "application/json",},
          body: JSON.stringify(user),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to update profile"
      );
    }
  }
);
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    updateLogin: (state,action: PayloadAction<Partial<{email: string;password: string;}>>) => {
      state.info = {...state.info,...action.payload,};
    },
    clearLogin: (state) => {state.info = {email:"",password:"",};
    },
    setEditing: (state,action: PayloadAction<boolean>) => {
      state.editing = action.payload;},
    updateProfile: (state,action: PayloadAction<Partial<Register>>) => {
      if (state.user) {state.user = {...state.user,...action.payload,};}
    },
    logout: (state) => {state.user = null;
      state.info = {email:"",password:"",};
      state.editing = false;
      state.authChecked = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogins.fulfilled,(state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.authChecked = true;
        })
      .addCase(fetchLogins.rejected,(state, action) => {
          state.loading =false;
          state.error =action.payload as string;
        })
      .addCase(restoreSession.pending,(state) => {
          state.loading = true;
        })
      .addCase(restoreSession.fulfilled,(state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.authChecked = true;
        })
      .addCase(restoreSession.rejected,(state) => {
          state.loading = false;
          state.user = null;
          state.authChecked = true;
        })
      .addCase(updateUser.pending,(state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(updateUser.fulfilled,(state, action) => {
          state.loading = false;
          state.user = action.payload;
          state.editing = false;
        })
      .addCase(updateUser.rejected,(state, action) => {
          state.loading = false;
          state.error =action.payload as string;
        });
  },
});
export const {updateLogin,clearLogin,setEditing,updateProfile,logout,} = loginSlice.actions;
export default loginSlice.reducer;