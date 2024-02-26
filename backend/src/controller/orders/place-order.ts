// orderController.ts
import { Request, Response } from "express";
import CartItem from "../../model/cart/cart-item";
import Order from "../../model/orders/orders-create";
import ProductDatabase from "../../model/product/product-schema";

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
    let uniqueIds = new Set();
    orderedItems?.forEach((item) => {
      item.products.forEach((product) => {
        uniqueIds.add(product.product.toString());
      });
    });

    let productData = await ProductDatabase.find({
      _id: { $in: Array.from(uniqueIds) },
    });

    const productDataMap = new Map();
    productData.forEach((product) => {
      productDataMap.set(product._id.toString(), product);
    });

    const combinedData = orderedItems.map((item) => {
      const productsWithDetails = item.products.map((product) => ({
        product: product.product,
        quantity: product.quantity,
        details: productDataMap.get(product.product.toString()),
      }));
      return {
        _id: item._id,
        products: productsWithDetails,
        totalPrice: item.totalPrice,
        __v: item.__v,
      };
    });

    res.json(combinedData);
  } catch (error) {
    console.error("Fetching failed to get Order History:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
