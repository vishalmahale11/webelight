import express, { Router } from "express";
import { paymentMethod } from "../../controller/payment-gateway/payment-gateway";
export const paymentRouter: Router = express.Router();

paymentRouter.post("/process-payment", paymentMethod);

