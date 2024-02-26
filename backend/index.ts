import express from "express";
import { productRoute } from "./src/routes/product-route/product-route";
import { CartItemroute } from "./src/routes/cart-route/cart-route";
import { orderRoute } from "./src/routes/orders-route/order-route";
import { paymentRouter } from "./src/routes/payment-gateway-route/payment-gateway";
const cors = require("cors");
const databseConnect = require("./config/database");
require("dotenv").config();

// CONFIGURATION //
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

// ALL ROUTES //
app.use("/products", productRoute);
app.use("/cart", CartItemroute);
app.use("/order", orderRoute);
app.use("/payment", paymentRouter);

// MONGODB MAIN CONNECTION //
app.listen(PORT, async () => {
  try {
    await databseConnect();
    console.log(`Server is running at http://localhost:${PORT}`);
  } catch (error) {
    console.error(error);
  }
});
