import axios from "axios";

const AXIOS = axios.create({
  baseURL: "http://localhost:8000" as string,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface apiResponse {
  statusCode: number;
  message: string;
  status: boolean;
  data?: any;
}

export const getProductData = async () => {
  try {
    let response: apiResponse = await AXIOS.get("/products/api");
    if (!response) {
      throw response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const getFilteredProduct = async (key: string) => {
  try {
    let response: apiResponse = await AXIOS.get(`/products/category/${key}`);
    if (!response) {
      throw response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const pricerangeFilter = async (range: string) => {
  try {
    let response: apiResponse = await AXIOS.get(
      `/products/pricerange/${range}`
    );
    if (!response) {
      throw response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const addToCart = async (
  product: string,
  price: number,
  quantity: number
) => {
  let requestBody = {
    product: product,
    price: price,
    quantity: quantity,
  };
  try {
    let response: apiResponse = await AXIOS.post(
      `/cart/add-to-cart`,
      requestBody
    );
    if (!response) {
      throw response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const allcartData = async () => {
  try {
    let response: apiResponse = await AXIOS.get(`/cart/get-cart-data`);
    if (!response) {
      throw response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

interface ProductData {
  product: string;
  quantity: number;
}

interface PlaceOrderRequestBody {
  products: ProductData[];
  paymentStatus: string;
}

export const placingOrderService = async (
  requestBody: PlaceOrderRequestBody
) => {
  try {
    let response: apiResponse = await AXIOS.post(
      `/order/place-order`,
      requestBody
    );
    if (!response) {
      throw response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const paymentProcess = async () => {
  try {
    let response: apiResponse = await AXIOS.post(`/payment/process-payment`);
    if (!response) {
      throw response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};

export const orderHistoryService = async () => {
  try {
    let response: apiResponse = await AXIOS.get(`/order/order-history`);
    if (!response) {
      throw response;
    } else {
      return response;
    }
  } catch (error) {
    console.error(error);
  }
};
