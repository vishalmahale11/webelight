import { PayloadAction } from "@reduxjs/toolkit";
import { cartSliceInitialData } from "./inital-data";
import { apiResponse } from "../../api/api-service";

const setCartData = (
  state: cartSliceInitialData,
  action: PayloadAction<apiResponse>
) => {
  return {
    ...state,
    cartData: action.payload.data,
  };
};

export default setCartData;
