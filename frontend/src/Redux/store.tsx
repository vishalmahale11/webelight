import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import productListSlice from "./product-list/product-list-slice";
import cartSlice from "./cart/cart-slice";

const appStore = configureStore({
  reducer: {
    productListSlice,
    cartSlice,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default appStore;
