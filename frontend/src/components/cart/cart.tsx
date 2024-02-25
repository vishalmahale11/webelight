import React, { useEffect, useState } from "react";
import { allcartData } from "../../api/api-service";
import { singleCardData } from "../../Redux/product-list/intial-data";
import CartCard from "./cart-card";

const Cart: React.FC = () => {
  const [cart, setcart] = useState<singleCardData[]>([]);
  const [quantity, setQuantity] = useState<number>(0);

  useEffect(() => {
    getCartData();
  }, []);

  const getCartData = async () => {
    let response = await allcartData();
    setcart(response?.data);
  };

  const handleCount = (_id: string) => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      {cart &&
        Array.isArray(cart) &&
        cart.map((cartData) => {
          return (
            <CartCard
              dataofCart={cartData}
              handleCount={handleCount}
              quantity={quantity}
            />
          );
        })}
    </div>
  );
};

export default Cart;
