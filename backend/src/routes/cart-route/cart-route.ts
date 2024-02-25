import express, { Router } from "express";
import {
  addToCart,
  getAllCartData,
} from "../../controller/cart/cart-controller";

export const CartItemroute: Router = express.Router();

CartItemroute.post("/add-to-cart", addToCart);
CartItemroute.get("/get-cart-data", getAllCartData);
