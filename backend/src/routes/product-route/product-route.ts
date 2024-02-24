import express, { Request, Response, Router } from "express";
import {
  getAllProducts,
  getCategoryData,
  getPriceRange,
} from "../../controller/product/product-controller";
export const productRoute: Router = express.Router();

productRoute.get("/", (req: Request, res: Response) => {
  res.end("Product Route");
});

productRoute.get("/api", getAllProducts);
productRoute.get("/category/:category", getCategoryData);
productRoute.get("/pricerange/:pricerange", getPriceRange);
