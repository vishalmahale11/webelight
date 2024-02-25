import Cart from "./components/cart/cart";
import Navbar from "./components/navbar/navbar";
import ProductList from "./components/product-list/product-list";
import RecentOrders from "./components/recent-orders/recent-orders";
import { createHashRouter, Outlet } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProductList />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order-history",
        element: <RecentOrders />,
      },
    ],
  },
]);

export default router;
