import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductList from "../product-list/product-list";
import Cart from "../cart/cart";
import OrderHistory from "../recent-orders/recent-orders";
import Navbar from "../navbar/navbar";

const AllRoutes: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Route path="/" Component={ProductList} />
      <Route path="/cart" Component={Cart} />
      <Route path="/order-history" Component={OrderHistory} />
    </Router>
  );
};

export default AllRoutes;
