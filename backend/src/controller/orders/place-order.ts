// orderController.ts
import { Request, Response } from "express";
import CartItem from "../../model/cart/cart-item";
import Order from "../../model/orders/orders-create";

export const placeOrder = async (req: Request, res: Response) => {
  try {
    let { paymentStatus } = req.body;
    const cartItems = await CartItem.find();
    let totalPrice = 0;
    cartItems.forEach((item) => {
      totalPrice += item?.quantity * item?.price;
    });
    const newOrder = new Order({
      products: cartItems.map((item) => ({
        product: item.product,
        quantity: item.quantity,
      })),
      totalPrice,
      paymentStatus: paymentStatus,
    });
    await newOrder.save();
    await CartItem.deleteMany();
    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const orderHistory = async (req: Request, res: Response) => {
  try {
    const orderedItems = await Order.find();
    res.json(orderedItems);
  } catch (error) {
    console.error("Fetching failed to get Order History:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
