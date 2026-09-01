import {createSlice,createAsyncThunk,} from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Main {
  id?:number; //id for list
  catergory:string; //cater yelist
  userId:number; //id for user who owns the list
  createdAt: number; //date of creation for the list

}
interface Mainee {
  details:{
    catergory: string;
    userId: number;
  };
  links: Main[]; //all fetched list are here
  loading: boolean;
  error: string | null;
  searchTerm: string;
  sortBy: "az"| "za"| "newest" | "oldest";
}
const initialState: Mainee = {
  details:{
    catergory: "",
    userId: 0,
  },
  links: [],
  loading: false,
  error: null,
  searchTerm: "",
  sortBy: "newest",
};
export const fetchList = createAsyncThunk("list/fetchList",async (main: Main,thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/main`,{
          method: "POST",
          headers: {"Content-Type":"application/json",},
          body: JSON.stringify(main),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add list");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message: "Something went wrong"
      );
    }
  }
);
export const fetchLists = createAsyncThunk("list/fetchLists", async (userId: number,thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/main?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to get lists");
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message: "Failed to get lists"
      );
    }
  }
);
export const deleteItem = createAsyncThunk("list/deleteItem",async (id: number,thunkAPI) => {
    try {
      const response = await fetch(`http://localhost:3000/main/${id}`,{
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(
          "Failed to delete list"
        );
      }
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message: "Something went wrong"
      );
    }
  }
);
export const editItem = createAsyncThunk("list/editItem",async (main: Main,thunkAPI) => {
    try{
      const response = await fetch(`http://localhost:3000/main/${main.id}`,{
          method: "PATCH",
          headers: {"Content-Type":"application/json",},
          body: JSON.stringify({catergory: main.catergory,}),
        }
      );
      if (!response.ok) {
        throw new Error(
          "Failed to edit list"
        );
      }
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error
          ? error.message: "Something went wrong"
      );
    }
  }
);
export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    lists: (state,action: PayloadAction<Partial<{catergory: string;}>>) => {
      state.details = {...state.details,...action.payload,};
    },
    deletelist: (state,action: PayloadAction<number>) => {
      state.links =state.links.filter((item) =>item.id !== action.payload);
    },
    clearLists: (state) => {
      state.links = [];
      state.details = {catergory: "",userId: 0,};
    },
    setSearchTerm:(state,action: PayloadAction<string>) => {
      state.searchTerm=action.payload;
    },
    setSortBy:(state,action: PayloadAction<"az"| "za"| "newest" | "oldest">) => {
      state.sortBy=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchList.pending,(state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(fetchList.fulfilled,(state, action) => {
          state.loading = false;
          state.links.push(action.payload);
          state.details.catergory = "";
        })
      .addCase(fetchList.rejected,(state, action) => {
          state.loading = false;
          state.error =action.payload as string;
        })
      .addCase(fetchLists.pending,(state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(fetchLists.fulfilled,(state, action) => {
          state.loading = false;
          state.links =action.payload;
        })
      .addCase(fetchLists.rejected,(state, action) => {
          state.loading = false;
          state.error =action.payload as string;
        })
      .addCase(deleteItem.pending,(state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(deleteItem.fulfilled,(state, action) => {
          state.loading = false;
          state.links =state.links.filter((item) =>item.id !== action.payload);
        })
      .addCase(deleteItem.rejected,(state, action) => {
          state.loading = false;
          state.error =action.payload as string;
        })
      .addCase(editItem.fulfilled,(state, action) => {
          state.loading = false;
          const index =state.links.findIndex((item) =>item.id === action.payload.id);
          if (index !== -1) {state.links[index] =action.payload;}
        })
      .addCase(editItem.pending,(state) => {
          state.loading = true;
          state.error = null;
        })
      .addCase(editItem.rejected,(state, action) => {
          state.loading = false;
          state.error =action.payload as string;
        });
      },
});
export const {lists,deletelist,clearLists,setSearchTerm, setSortBy} = mainSlice.actions;
export default mainSlice.reducer;