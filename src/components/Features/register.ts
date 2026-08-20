import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";

export interface Register {
    name: string;
    surname: string;
  email: string;
  password: string;
}
interface  Registerr{
   info :Register[];

};
const initialState: Registerr = {
info: [],
};
export const fetchRegs=createAsyncThunk('regs/fetchRegs', async()=>{
const response= await axios.get('');
return response.data;
})
export const registerSlice = createSlice({
  name: "regs",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<Registerr>) => {
        state.info = action.payload.info;
    
    },
  },
});
export const { register} = registerSlice.actions
export default registerSlice.reducer