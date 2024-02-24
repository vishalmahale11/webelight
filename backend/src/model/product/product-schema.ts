import mongoose, { Schema, Document } from "mongoose";

export interface products extends Document {
  product_name: string;
  category: string;
  price: number;
  specs: Record<string, string>;
  image_url: string;
}

const productSchema: Schema<products> = new Schema({
  product_name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  specs: { type: Schema.Types.Mixed },
  image_url: { type: String, required: true },
});

const ProductDatabase = mongoose.model<products>("products", productSchema);

export default ProductDatabase;
