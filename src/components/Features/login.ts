import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Login {
  email: string;
  password: string;
}
interface LoginProps{
lss: Login[];
}
const initialState: LoginProps = {
  lss:[],
};

export const loginSlice = createSlice({
  name: "logins",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginProps>) => {
      state.lss = action.payload.lss;
      
    },
  },
});
export const {login} = loginSlice.actions
export default loginSlice.reducer