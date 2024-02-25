import React from "react";
import { singleCardData } from "../../Redux/product-list/intial-data";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface ProductCardProps {
  cardItem: singleCardData;
  addProductToCart: (product: string, price: number) => void;
  showqtyBtn: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  cardItem,
  addProductToCart,
  showqtyBtn,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 300 }}
        image={cardItem?.image_url}
        title="green iguana"
      />
      <CardContent sx={{ mb: 1 }}>
        <Typography gutterBottom variant="h5" component="div">
          {cardItem?.product_name}
        </Typography>
        <Typography gutterBottom component="div">
          {`₹ ${cardItem?.price}`}
        </Typography>
        <Typography gutterBottom component="div">
          {`${cardItem?.category}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => addProductToCart(cardItem._id, cardItem.price)}
          size="small"
          variant="contained"
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
