import express, { Request, Response, Router } from "express";
import { orderHistory, placeOrder } from "../../controller/orders/place-order";
export const orderRoute: Router = express.Router();

orderRoute.get("/", (req: Request, res: Response) => {
  res.end("Order Creation");
});

orderRoute.post("/place-order", placeOrder);
orderRoute.get("/order-history", orderHistory);
