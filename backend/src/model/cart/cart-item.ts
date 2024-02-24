import mongoose, { Document, Schema, mongo } from "mongoose";
import { products } from "../product/product-schema";

export interface CartItem extends Document {
  product: products;
  quantity: number;
  price: number;
}

const cartItemSchema = new Schema<CartItem>({
  product: { type: Schema.Types.ObjectId, ref: "products", required: true },
  quantity: Number,
  price: Number,
});

const CartItem = mongoose.model<CartItem>("CartItem", cartItemSchema);

export default CartItem;
