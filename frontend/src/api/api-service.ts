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
