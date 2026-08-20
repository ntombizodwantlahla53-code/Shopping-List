import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"


export interface Register {
    name: string;
    surname: string;
  email: string;
  password: string;
}
interface  Registerr{
   info :Register[];
  loading: boolean;
  error: string | null;
 

};
const initialState: Registerr = {
  info: [],
  loading: false,
  error: null,
};

export const fetchRegs = createAsyncThunk('regs/fetchRegs', async(register:Register, thunkAPI)=>{
try {
  const response = await fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(register),
  });
  if (!response.ok) {
    throw new Error("Failed to create account");
  }
  return await response.json();
} catch (error) {
  return thunkAPI.rejectWithValue(
    error instanceof Error ? error.message : "Something went wrong"
  );
}
}
);
export const registerSlice = createSlice({
  name: "regs",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<Registerr>) => {
        state.info = action.payload.info;
    
    },
  },
extraReducers: (builder) =>{
  builder.addCase(fetchRegs.pending, (state) =>{
    state.loading = true
    state.error = null;
  })
  .addCase(fetchRegs.fulfilled, (state, action) =>{
    state.loading= false
    state.info = action.payload;
})
  .addCase(fetchRegs.rejected, (state, action) =>{
    state.loading= false
    state.error = action.payload as string;
})
},
});
export const { register} = registerSlice.actions
export default registerSlice.reducer