import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Main {
  id? : string;
    catergory: string;

}

interface  Mainee{
   details :{
    catergory: string;
   },
   links:Main[];
  loading: boolean;
  error: string | null;
};
const initialState: Mainee = {
  details: {
    catergory: "",
  },
  links:[],
  loading: false,
  error: null,
};

export const fetchList = createAsyncThunk('list/fetchList', async(main:Main, thunkAPI)=>{
try {
  const response = await fetch(`http://localhost:3000/main`, {
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
export const deleteItem = createAsyncThunk('list/deleteItem', async(id:string | number, thunkAPI)=>{
try {
  const response = await fetch(`http://localhost:3000/main/${id}`, {
    method: "DELETE",

  });
  if (!response.ok) {
    throw new Error("Failed todELETE");
  }
  return id;
} catch (error) {
  return thunkAPI.rejectWithValue(
    error instanceof Error ? error.message : "Something went wrong"
  );
}
}
);
export const editItem = createAsyncThunk('list/editItem', async(id:string | number, thunkAPI)=>{
try {
  const response = await fetch(`http://localhost:3000/main`, {
    method: "UPDATE",

  });
  if (!response.ok) {
    throw new Error("Failed to edit");
  }
  return id;
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
     deletelist: (state, action: PayloadAction<string | number>) => {
          state.links= state.links.filter((item) =>item.id!==action.payload);
        },
    editlist: (state, action: PayloadAction<string | number>) => {
          state.links= state.links.filter((item) =>item.id!==action.payload);
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
    state.links.push(action.payload);
})
  .addCase(fetchList.rejected, (state, action) =>{
    state.loading= false
    state.error = action.payload as string;
})
builder.addCase(deleteItem.pending, (state) =>{
    state.loading = true
    state.error = null;
  })
  .addCase(deleteItem.fulfilled, (state, action) =>{
    state.loading= false
    state.links= state.links.filter((item) =>item.id!==action.payload);
})
  .addCase(deleteItem.rejected, (state, action) =>{
    state.loading= false
    state.error = action.payload as string;
})
builder.addCase(editItem.pending, (state) =>{
    state.loading = true
    state.error = null;
  })
  .addCase(editItem.fulfilled, (state, action) =>{
    state.loading= false
    state.links= state.links.filter((item) =>item.id!==action.payload);
})
  .addCase(editItem.rejected, (state, action) =>{
    state.loading= false
    state.error = action.payload as string;
})
},
});
export const { lists, deletelist, editlist } = mainSlice.actions
export default mainSlice.reducer