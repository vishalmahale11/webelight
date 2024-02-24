import express, { Router } from "express";
import { addToCart } from "../../controller/cart/cart-controller";

export const CartItemroute: Router = express.Router();

CartItemroute.post("/add-to-cart", addToCart);
