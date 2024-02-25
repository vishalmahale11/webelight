import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./intial-data";
import getAllData from "./product-data";

const productListSlice = createSlice({
  name: "productListSlice",
  initialState: initialState,
  reducers: {
    productDataReducer: getAllData,
  },
});

export const { productDataReducer } = productListSlice.actions;

export default productListSlice.reducer;
