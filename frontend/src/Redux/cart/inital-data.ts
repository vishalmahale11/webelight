export interface singlecartData {
  product: string;
  price: number;
  quanitity: number;
}

export interface cartSliceInitialData {
  cartData: singlecartData[];
}

export const initialCartData: cartSliceInitialData = {
  cartData: [],
};
