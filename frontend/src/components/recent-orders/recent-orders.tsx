import React, { useEffect, useState } from "react";
import { orderHistoryService } from "../../api/api-service";
import styles from "./recent-order.module.scss";

const RecentOrders: React.FC = () => {
  const [historyData, setHistoryData] = useState<any>([]);
  const [totalBusiness, setTotalBusiness] = useState<number>(0);

  useEffect(() => {
    getAllOrderedData();
  }, []);

  const getAllOrderedData = async () => {
    try {
      const response = await orderHistoryService();
      setHistoryData(response?.data || []);
    } catch (error) {
      console.error("Error fetching order history:", error);
    }
  };

  useEffect(() => {
    // Calculate total business when historyData changes
    const total = historyData.reduce((acc: number, order: any) => {
      return acc + order.totalPrice;
    }, 0);
    setTotalBusiness(total);
  }, [historyData]);

  return (
    <div>
      <h2>Recent Orders</h2>
      <h3>Total Price: ₹{totalBusiness}</h3>
      <div className={styles["order-list"]}>
        {historyData.map((order: any) => (
          <div key={order._id} className={styles["order-card"]}>
            <h3>Order ID: {order._id}</h3>
            <h4>Total Price: ₹{order.totalPrice}</h4>
            <div className={styles["product-list"]}>
              {order.products.map((product: any) => (
                <div
                  key={product.details._id}
                  className={styles["product-card"]}
                >
                  <img
                    src={product.details.image_url}
                    alt={product.details.product_name}
                  />
                  <div>
                    <h4>{product.details.product_name}</h4>
                    <p>Price: ₹{product.details.price}</p>
                    <p>Quantity: {product.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
