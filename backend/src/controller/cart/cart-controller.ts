// cartController.ts
import { Request, Response } from "express";
import CartItem from "../../model/cart/cart-item";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { product, quantity, price } = req.body;
    const newCartItem = new CartItem({ product, quantity, price });
    await newCartItem.save();
    console.log("Item added to cart:", newCartItem);

    res.json({ success: true, message: "Item added to cart successfully" });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
