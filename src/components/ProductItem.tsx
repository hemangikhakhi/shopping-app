import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";

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

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 300 }} image={imgUrl} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {formatCurrency(price)}
        </Typography>
      </CardContent>
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
  );
}
