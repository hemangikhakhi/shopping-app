import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { ProductDetailPage } from "./ProductDetailPage";

type ProductItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  category: string;
};

export function ProductItem({
  id,
  name,
  price,
  imgUrl,
  category,
}: ProductItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  const [isDialogOpen, setDialogOpen] = useState(false);

  function toggleDialog() {
    setDialogOpen(!isDialogOpen);
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea onClick={toggleDialog}>
          <CardMedia sx={{ height: 300 }} image={imgUrl} title="green iguana" />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {formatCurrency(price)}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          {quantity === 0 ? (
            <Button
              className="w-100"
              onClick={() => increaseCartQuantity(id, category)}
            >
              + Add To Cart
            </Button>
          ) : (
            <div>
              <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
              <span>{quantity} </span>
              <Button onClick={() => increaseCartQuantity(id, category)}>
                +
              </Button>
              <Button onClick={() => removeFromCart(id)}>Remove</Button>
            </div>
          )}
        </CardActions>
      </Card>
      {isDialogOpen && (
        <ProductDetailPage
          isOpen={isDialogOpen}
          handleClose={toggleDialog}
          id={id}
        />
      )}
    </>
  );
}
