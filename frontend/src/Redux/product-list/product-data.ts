import { PayloadAction } from "@reduxjs/toolkit";
import { initialDataofProduct } from "./intial-data";
import { apiResponse } from "../../api/api-service";

const getAllData = (
  state: initialDataofProduct,
  action: PayloadAction<apiResponse>
): initialDataofProduct => {
  return {
    ...state,
    products: action.payload.data,
  };
};

export default getAllData;
