import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
    catergory: string;

}

interface  Mainee{
   inputs :{
    catergory: string;
   },
   links:Item[];
  loading: boolean;
  error: string | null;
};
const initialState: Mainee = {
  inputs: {
    catergory: "",
  },
  links:[],
  loading: false,
  error: null,
};

export const fetchItem = createAsyncThunk('list/fetchList', async(item:Item, thunkAPI)=>{
try {
  const response = await fetch("http://localhost:3000/main", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(item),
  });
  if (!response.ok) {
    throw new Error("Failed to add items");
  }
  return await response.json();
} catch (error) {
  return thunkAPI.rejectWithValue(
    error instanceof Error ? error.message : "Something went wrong"
  );
}
}
);
export const itemSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    lists: (state, action: PayloadAction<Partial<Main>>) => {
          state.inputs={...state.inputs, ...action.payload,};
        },
    },
 
extraReducers: (builder) =>{
  builder.addCase(fetchItem.pending, (state) =>{
    state.loading = true
    state.error = null;
  })
  .addCase(fetchItem.fulfilled, (state, action) =>{
    state.loading= false
    state.inputs = action.payload;
    state.links.push(action.payload);
})
  .addCase(fetchItem.rejected, (state, action) =>{
    state.loading= false
    state.error = action.payload as string;
})
},
});
export const { lists } = itemSlice.actions
export default itemSlice.reducer