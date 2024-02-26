import React from "react";
import { singleCardData } from "../../Redux/product-list/intial-data";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from "./cart-card.module.scss";
import { Button } from "@mui/material";

interface cartProps {
  dataofCart: singleCardData;
  handleCount: (_id: string, action: "increment" | "decrement") => void;
  quantity: number;
}

const CartCard: React.FC<cartProps> = ({
  dataofCart,
  handleCount,
  quantity,
}) => {
  return (
    <div className={styles.cartContainer}>
      <Card sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={dataofCart.image_url}
          alt="Live from space album cover"
        />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h5">
              {dataofCart.product_name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
            >
              {dataofCart.price}
            </Typography>
          </CardContent>
        </Box>
        <Box
          sx={{
            marginTop: "1rem",
            marginLeft: "auto",
            display: "flex",
            flexDirection: "row",
            height: "2rem",
            marginRight: "1rem",
            gap: "0.5rem",
          }}
        >
          <Button
            onClick={() => handleCount(dataofCart._id, "decrement")}
            variant="outlined"
          >
            -
          </Button>
          <Typography>{quantity ? quantity : 1}</Typography>
          <Button
            onClick={() => handleCount(dataofCart._id, "increment")}
            variant="outlined"
          >
            +
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default CartCard;
