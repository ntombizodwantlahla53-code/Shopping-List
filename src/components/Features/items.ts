import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id?: number;
  catergory: string;
  category: string;
  notes: string;
  name: string;
  quantity: string;
  image? :string;
}

interface ItemsState {
  items: Item[];
  inputCatergory: string;
  inputNotes: string;
  inputName: string;
  inputQuantity: string;
inputImage:string;
  addIndex: string | null;
  newName: string;
  newNotes: string;
  newQty: string;
  openIndex: string | null;
  loading: boolean;
  error: string | null;

}

const initialState: ItemsState = {
  items: [],
  inputCatergory: "",
  inputName: "",
  inputNotes: "",
  inputQuantity:"",
  inputImage: "",
  addIndex: null,
  newName: "",
  newNotes: "",
  newQty: "",
  openIndex: null,
  loading: false,
  error: null,
};
export const fetchItem = createAsyncThunk("items/fetchItem", async (item: Item) => 
  {
  const response = await fetch(`http://localhost:3000/items`, {
    method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Failed to add item");
  return await response.json();
});
export const fetchItems = createAsyncThunk("items/fetchItems", async () => 
  {
  const response = await fetch(`http://localhost:3000/items`);
  if (!response.ok) throw new Error("Failed to get items");
  return await response.json();
});
export const deleteItemThunk = createAsyncThunk("items/deleteItem", async (id: number) => 
  {
  const response = await fetch(`http://localhost:3000/items/${id}`, { method: "DELETE" });
  if (!response.ok) throw new Error("Failed to delete");
  return id;
});
export const editItemThunk = createAsyncThunk("items/editItem", async (item: Item) => 
  {
  const response = await fetch(`http://localhost:3000/items/${item.id}`, {
    method: "PATCH", headers: { "Content-Type": "application/json" },
    body: JSON.stringify(item),
  });
  if (!response.ok) throw new Error("Failed to edit");
  return await response.json();
});
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
    setItemQuantity: (state, action: PayloadAction<string>) => { 
      state.inputQuantity = action.payload; 
    },
    toggleDropdown: (state, action: PayloadAction<string | null>) => { 
      state.openIndex = action.payload; 
    },
    setAddIndex: (state, action: PayloadAction<string | null>) => { 
      state.addIndex = action.payload; 
    },
    setNewName: (state, action: PayloadAction<string>) => { 
      state.newName = action.payload; 
    },
    setNewNotes: (state, action: PayloadAction<string>) => { 
      state.newNotes = action.payload; 
    },
    setItemImage: (state, action: PayloadAction<string>) => { 
      state.inputImage = action.payload; 
    },
    setNewQty: (state, action: PayloadAction<string>) => { 
      state.newQty = action.payload; 
    },
    clearAddForm: (state) => { 
      state.newName = ""; 
      state.newNotes = ""; 
      state.newQty = ""; 
      state.addIndex = null; 
      state.inputImage="";
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.inputCatergory = ""; state.inputNotes = ""; state.inputName = ""; state.inputQuantity = "";
      })
    .addCase(fetchItems.fulfilled, (state, action) => { state.items = action.payload; })
    .addCase(deleteItemThunk.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id!== action.payload);
      })
    .addCase(editItemThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(i => i.id === action.payload.id);
        if (index!== -1) state.items[index] = action.payload;
      });
  },
});

export const { setItemCatergory, setItemNotes, setItemName, setItemQuantity, toggleDropdown, setAddIndex, setNewName, setNewNotes,setItemImage, setNewQty, clearAddForm } = itemsSlice.actions;
export default itemsSlice.reducer;