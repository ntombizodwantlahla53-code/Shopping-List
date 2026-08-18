import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface LoginProps {
  name: string;
  password: string;
}
const initialState: LoginProps = {
  name: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "logins",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginProps>) => {
      state.name = action.payload.name;
      state.password = action.payload.password;
    },
  },
});
export const {login} = loginSlice.actions
export default loginSlice.reducer