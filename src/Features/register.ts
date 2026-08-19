import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface RegisterProps {
    name: string;
    surname: string;
  email: string;
  password: string;
}
const initialState: RegisterProps = {
    name: "",
    surname: "",
  email: "ncumoh@gmail.com",
  password: "",
};

export const registerSlice = createSlice({
  name: "regs",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<RegisterProps>) => {
        state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
  },
});
export const {register} = registerSlice.actions
export default registerSlice.reducer