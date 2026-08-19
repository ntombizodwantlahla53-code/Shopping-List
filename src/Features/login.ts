import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoginProps {
  email: string;
  password: string;
}
const initialState: LoginProps = {
  email: "ncumoluhlentlahla03@gmail.com",
  password: "",
};

export const loginSlice = createSlice({
  name: "logins",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginProps>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});
export const {login} = loginSlice.actions
export default loginSlice.reducer