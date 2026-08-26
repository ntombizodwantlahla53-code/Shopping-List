import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Register {
  id?: number;
  name: string;
  surname: string;
  cellNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface RegisterState {
  info: Register;
  loading: boolean;
  error: string | null;
}

const initialState: RegisterState = {
  info: {
    name: "",
    surname: "",
    cellNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  loading: false,
  error: null,
};

export const fetchRegs = createAsyncThunk(
  "regs/fetchRegs",
  async (register: Register, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(register),
      });

      if (!response.ok) {
        throw new Error("Failed to create account");
      }

      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    }
  }
);

export const registerSlice = createSlice({
  name: "register",
  initialState,

  reducers: {
    updateRegister: (
      state,
      action: PayloadAction<Partial<Register>>
    ) => {
      state.info = {
        ...state.info,
        ...action.payload,
      };
    },

    clearRegister: (state) => {
      state.info = {
        name: "",
        surname: "",
        cellNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRegs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchRegs.fulfilled, (state) => {
        state.loading = false;
      })

      .addCase(fetchRegs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  updateRegister,
  clearRegister,
} = registerSlice.actions;

export default registerSlice.reducer;