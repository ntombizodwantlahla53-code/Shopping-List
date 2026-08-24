import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Main {
    catergory: string;
  quantity: string;

}

interface  Mainee{
   details :{
    catergory: string;
  quantity: string;
   },
   links:Main[]
  loading: boolean;
  error: string | null;
 
};
const initialState: Mainee = {
  details: {
    catergory: "",
  quantity: "",
  },
  links:[],
  loading: false,
  error: null,
};

export const fetchList = createAsyncThunk('list/fetchList', async(main:Main, thunkAPI)=>{
try {
  const response = await fetch("http://localhost:3000/main", {
    method: "POST",
    headers: {"Content-Type": "application/json",},
    body: JSON.stringify(main),
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
export const mainSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    lists: (state, action: PayloadAction<Partial<Main>>) => {
          state.details={...state.details, ...action.payload,};
        },
    },
 
extraReducers: (builder) =>{
  builder.addCase(fetchList.pending, (state) =>{
    state.loading = true
    state.error = null;
  })
  .addCase(fetchList.fulfilled, (state, action) =>{
    state.loading= false
    state.details = action.payload;
})
  .addCase(fetchList.rejected, (state, action) =>{
    state.loading= false
    state.error = action.payload as string;
})
},
});
export const { lists } = mainSlice.actions
export default mainSlice.reducer