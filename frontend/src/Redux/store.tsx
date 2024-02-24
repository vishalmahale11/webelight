import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";

const appStore = configureStore({
  reducer: {},
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default appStore;
