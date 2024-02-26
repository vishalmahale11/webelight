import React, { useEffect, useState } from "react";
import {
  allcartData,
  paymentProcess,
  placingOrderService,
} from "../../api/api-service";
import { singleCardData } from "../../Redux/product-list/intial-data";
import styles from "./cart.module.scss";
import CartCard from "./cart-card";
import { Button, Radio } from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";

const Cart: React.FC = () => {
  const [cart, setCart] = useState<
    { dataofCart: singleCardData; quantity: number }[]
  >([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>("payOnDelivery");
  const [paymentState, setpaymentState] = useState<string>("");
  const [orderMessage, setOrderMessage] = useState<string>("");
  const [orderFlag, setOrderFlag] = useState<boolean>(false);
  const [paymentPage, setpaymentPage] = useState<boolean>(false);
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");

  useEffect(() => {
    getCartData();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [cart]);

  const getCartData = async () => {
    let response = await allcartData();
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      response?.data.forEach((item: any) => {
        const existingItemIndex = updatedCart.findIndex(
          (cartItem) => cartItem.dataofCart._id === item._id
        );
        if (existingItemIndex !== -1) {
          updatedCart[existingItemIndex].quantity += 1;
        } else {
          updatedCart.push({ dataofCart: item, quantity: 1 });
        }
      });
      return updatedCart;
    });
  };

  const handleCount = (_id: string, action: "increment" | "decrement") => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.dataofCart._id === _id) {
          return {
            ...item,
            quantity:
              action === "increment"
                ? item.quantity + 1
                : Math.max(item.quantity - 1, 0),
          };
        }
        return item;
      })
    );
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce(
      (acc, item) => acc + item.dataofCart.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value === "payOnline") {
      setpaymentPage(true);
    }
    setPaymentMethod(event.target.value);
  };

  const handleOrderPlace = async () => {
    if (paymentMethod === "payOnline") {
      let response = await paymentProcess();
      setpaymentState(response?.data?.message);
    }
    let dataofCart = cart.map((item) => {
      return {
        product: item.dataofCart._id,
        quantity: item.quantity,
      };
    });
    let requestBody = { products: dataofCart, paymentStatus: paymentMethod };
    let response = await placingOrderService(requestBody);
    setOrderFlag(true);
    setpaymentPage(false);
    setOrderMessage(response?.data?.message);
  };

  const handleBackToPaymentMethod = () => {
    setpaymentPage(false);
    setOrderFlag(false);
    setOrderMessage("");
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartItemContainer}>
        {cart.map((cartItem, index) => (
          <CartCard
            key={index}
            dataofCart={cartItem.dataofCart}
            handleCount={handleCount}
            quantity={cartItem.quantity}
          />
        ))}
      </div>
      <div className={styles.orderPlacingContainer}>
        {paymentPage ? (
          <div style={{ width: "70%" }}>
            <p
              style={{ cursor: "pointer" }}
              onClick={handleBackToPaymentMethod}
            >
              <IoMdArrowRoundBack /> Back
            </p>
            <div className={styles.formGroup}>
              <label>Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Enter your card number"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>Expiration Date</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>CVV</label>
              <input
                type="text"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                placeholder="Enter CVV"
                required
              />
            </div>
            <Button onClick={handleOrderPlace} className={styles.buttonValue}>
              Pay Now ₹ {totalPrice}
            </Button>
          </div>
        ) : (
          <>
            {orderFlag && (
              <div>
                <img
                  className={styles.gifImage}
                  src={require("../images/check.gif")}
                  alt="GIF"
                />
                {paymentMethod === "payOnline" ? <p>{paymentState}</p> : null}
                <p className={styles.successMessage}>{orderMessage}</p>
              </div>
            )}
            {!orderFlag && (
              <>
                <div>
                  <Radio
                    checked={paymentMethod === "payOnDelivery"}
                    onChange={handlePaymentMethodChange}
                    value="payOnDelivery"
                    name="paymentMethod"
                  />
                  Pay on Delivery
                  <Radio
                    checked={paymentMethod === "payOnline"}
                    onChange={handlePaymentMethodChange}
                    value="payOnline"
                    name="paymentMethod"
                  />
                  Pay Online
                </div>
                <div>
                  <p className={styles.heading}>Bill Details</p>
                </div>
                <div className={styles.salesContainer}>
                  <div className={styles.salesDetails}>
                    <p>Gross Sale Value</p>
                    <p>Product Discount (-)</p>
                    <p>Delivery Fee (+)</p>
                  </div>
                  <div className={styles.salesDetails1}>
                    <p>₹ {totalPrice}</p>
                    <p>₹ {0}</p>
                    <p>₹ {0}</p>
                  </div>
                </div>
                <div className={styles.totalPriceContainer}>
                  <p>Net Payable</p>
                  <p style={{ marginRight: "1rem" }}>₹ {totalPrice}</p>
                </div>
                <Button
                  onClick={handleOrderPlace}
                  className={styles.buttonValue}
                >
                  Amount Payable ₹ {totalPrice}
                </Button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
