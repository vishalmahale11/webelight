import mongoose, { Document, Schema } from "mongoose";
import { products } from "../product/product-schema";

export interface OrderCreation extends Document {
  products: { product: products; quantity: number }[];
  totalPrice: number;
  paymentStatus: string;
}

const orderSchema = new Schema<OrderCreation>({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
});

const Order = mongoose.model<OrderCreation>("Order", orderSchema);

export default Order;
