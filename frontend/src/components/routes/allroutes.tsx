import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProductList from "../product-list/product-list";
import Cart from "../cart/cart";
import OrderHistory from "../recent-orders/recent-orders";

const AllRoutes: React.FC = () => {
  return (
    <Router>
      <Route path="/" Component={ProductList} />
      <Route path="/cart" Component={Cart} />
      <Route path="/order-history" Component={OrderHistory} />
    </Router>
  );
};

export default AllRoutes;
