export interface singleCardData {
  _id: string;
  product_name: string;
  category: string;
  price: number;
  specs: {
    [key: string]: string;
  };
  image_url: string;
}

export interface initialDataofProduct {
  products: singleCardData[];
}

export const initialState: initialDataofProduct = {
  products: [],
};
