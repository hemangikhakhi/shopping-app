import { Box, Button, Stack } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "./../utilities/formatCurrency";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <>
      <Stack direction="row" spacing={2}>
        <img
          src={item.imgUrl}
          style={{ width: "125px", height: "75px", objectFit: "cover" }}
        />
        <Box>
          <div>
            {item.name}{" "}
            {quantity > 1 && (
              <span style={{ fontSize: ".65rem" }}>x{quantity}</span>
            )}
          </div>
          <div style={{ fontSize: ".75rem" }}>{formatCurrency(item.price)}</div>
        </Box>
        <div>
          {formatCurrency(item.price * quantity)}
          <Button
            variant="outlined"
            size="small"
            onClick={() => removeFromCart(item.id)}
          >
            &times;
          </Button>
        </div>
      </Stack>
    </>
  );
}
