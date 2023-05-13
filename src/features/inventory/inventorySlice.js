import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  products: [],
  error: undefined,
};

export const inventorySlice = createSlice({
  //slice name
  name: "inventory",
  //initial state value
  initialState,
  //an object of reducer functions
  reducers: {
    setProduct: (state, action) => {
      state.products = action.payload;
    },
    addProduct: (state, action) => {
      const stateProducts = [...state.products];
      stateProducts.unshift(action.payload);
      state.products = stateProducts;
    },
    editProducts: (state, action) => {
      state.products = action.payload;
    },
    deleteProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProduct, addProduct, editProducts, deleteProducts } =
  inventorySlice.actions;

export default inventorySlice.reducer;
