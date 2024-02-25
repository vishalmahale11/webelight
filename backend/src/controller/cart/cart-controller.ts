import { Request, Response } from "express";
import CartItem from "../../model/cart/cart-item";
import ProductDatabase from "../../model/product/product-schema";
import { Types } from "mongoose";

export const addToCart = async (req: Request, res: Response) => {
  try {
    const { product, quantity, price } = req.body;
    const newCartItem = new CartItem({ product, quantity, price });
    const singleData = await ProductDatabase.findById(
      Types.ObjectId.createFromHexString(product)
    );
    const cartItems = await CartItem.find({});
    await newCartItem.save();
    res.json({
      success: true,
      message: "Item added to cart successfully",
      singleData: singleData,
      cartItems: cartItems,
    });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllCartData = async (req: Request, res: Response) => {
  try {
    const cartItems = await CartItem.find({});

    const fullDataPromises = cartItems.map(async (item) => {
      const productId = item.product._id.toString();

      const product = await ProductDatabase.findById(productId);
      return product;
    });

    const fullData = await Promise.all(fullDataPromises);

    res.json(fullData);
  } catch (error) {
    console.error("Error retrieving cart data:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
