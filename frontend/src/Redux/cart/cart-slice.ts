import { createSlice } from "@reduxjs/toolkit";
import { initialCartData } from "./inital-data";
import setCartData from "./cartData";

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initialCartData,
  reducers: {
    setCartDataReducer: setCartData,
  },
});

export const { setCartDataReducer } = cartSlice.actions;

export default cartSlice.reducer;
