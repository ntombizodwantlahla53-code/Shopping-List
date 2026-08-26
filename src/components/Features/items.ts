import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id?: number;
  catergory: string;
  category: string;
  notes: string;
  name: string
}

interface ItemsState {
  items: Item[];
  inputCatergory: string;
  inputNotes: string;
  inputName: string;
  openIndex: number | null;
  loading: boolean;
  error: string | null;
}

const initialState: ItemsState = {
  items: [],
  inputCatergory: "",
  inputName: "",
  inputNotes: "",
  openIndex: null,
  loading: false,
  error: null,
};
export const fetchItem = createAsyncThunk("items/fetchItem", async (item: Item, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3000/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error("Failed to add item");
      return await response.json();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  }
);
export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItemCatergory: (state, action: PayloadAction<string>) => {
      state.inputCatergory = action.payload;
    },
    setItemNotes: (state, action: PayloadAction<string>) => {
      state.inputNotes = action.payload;
    },
     setItemName: (state, action: PayloadAction<string>) => {
      state.inputName = action.payload;
    },
    toggleDropdown: (state, action: PayloadAction<number | null>) => {
      state.openIndex = action.payload;
    },
    addItemLocal: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
      state.inputCatergory = "";
      state.inputNotes = "";
      state.inputName = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItem.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
        state.inputCatergory = "";
        state.inputNotes = "";
        state.inputName = "";
      })
      .addCase(fetchItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setItemCatergory, setItemNotes, setItemName , toggleDropdown, addItemLocal } = itemsSlice.actions;
export default itemsSlice.reducer;
