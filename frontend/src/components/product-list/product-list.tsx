import React, { useEffect, useState } from "react";
import {
  addToCart,
  getFilteredProduct,
  getProductData,
  pricerangeFilter,
} from "../../api/api-service";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ProductCard from "./product-card";
import { singleCardData } from "../../Redux/product-list/intial-data";
import styles from "./product-list.module.scss";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/store";
import { setCartDataReducer } from "../../Redux/cart/cart-slice";

const ProductList: React.FC = () => {
  const [data, setData] = useState<singleCardData[]>([]);
  const [showqtyBtn, setshowqtyBtn] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {}, []);

  const getAllData = async () => {
    let response = await getProductData();
    if (response) {
      setData(response.data);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    if (event.target.name === "category") {
      getFilterData(event.target.value);
    } else {
      getpriceRange(event.target.value);
    }
  };

  const getFilterData = async (key: string) => {
    let response = await getFilteredProduct(key);
    setData(response?.data);
  };

  const getpriceRange = async (range: string) => {
    let response = await pricerangeFilter(range);
    setData(response?.data);
  };

  const addProductToCart = async (product: string, price: number) => {
    const response = await addToCart(product, price, 1);
    if (response) {
      dispatch(setCartDataReducer(response));
    }
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <div>
          <FormControl variant="filled" sx={{ m: 2, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Filter By Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={handleChange}
              name="category"
            >
              <MenuItem value="Storage">Storage</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Audio">Audio</MenuItem>
              <MenuItem value="Wearable">Wearable</MenuItem>
              <MenuItem value="Smart Home">Smart Home</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl variant="filled" sx={{ m: 2, minWidth: 300 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Sort By Price
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              onChange={handleChange}
              name="pricerange"
            >
              <MenuItem value="hightolow">High To Low</MenuItem>
              <MenuItem value="lowtohigh">Low To High</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {data &&
          Array.isArray(data) &&
          data?.map((product) => {
            return (
              <ProductCard
                key={product._id}
                cardItem={product}
                addProductToCart={() =>
                  addProductToCart(product._id, product.price)
                }
                showqtyBtn={showqtyBtn}
              />
            );
          })}
      </div>
    </>
  );
};

export default ProductList;
