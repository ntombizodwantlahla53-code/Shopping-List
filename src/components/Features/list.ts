import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Home {
  name: string;
  catergory: string;
  note: string;
  quantity: string;
}
interface ListProps{
list: Home[];
}
const initialState: ListProps = {
  list:[],
};

export const homeSlice = createSlice({
  name: "listts",
  initialState,
  reducers: {
    lists: (state, action: PayloadAction<ListProps>) => {
      state.list = action.payload.list;
      
    },
  },
});
export const { lists} = homeSlice.actions
export default homeSlice.reducer