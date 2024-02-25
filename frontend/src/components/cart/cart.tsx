import React from "react";
import { useAppSelector } from "../../Redux/store";

const Cart: React.FC = () => {
  const { cartData } = useAppSelector((store) => store.cartSlice);

  console.log(cartData, "cartData");
  return <div>Cart</div>;
};

export default Cart;
