import { useShoppingCart } from "./../context/ShoppingCartContext";
import { CartItem } from "./CartItems";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";
import { Drawer, Stack } from "@mui/material";
import { Typography } from "@mui/material";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useShoppingCart();

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closeCart}
      style={{ padding: "20px" }}
    >
      <Typography variant="h6">Cart</Typography>

      <Stack gap={3}>
        {cartItems.length ? (
          <>
            {cartItems.map((item) => (
              <CartItem key={item.id} {...item} />
            ))}
            <div style={{ textAlign: "end" }}>
              Total{" "}
              {formatCurrency(
                cartItems.reduce((total, cartItem) => {
                  const item = storeItems.find((i) => i.id === cartItem.id);
                  return total + (item?.price || 0) * cartItem.quantity;
                }, 0)
              )}
            </div>
          </>
        ) : (
          <Typography variant="body2"> Oops! Your cart is empty</Typography>
        )}
      </Stack>
    </Drawer>
  );
}
