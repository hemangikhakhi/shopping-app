import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocaleStorage } from "../hooks/useLocalStorage";
import inventory from "../data/inventory.json";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  category: string;
  id: number;
  quantity: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number, category: string) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useLocaleStorage<CartItem[]>(
    "shopping-cart",
    []
  );

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  // Get the item by the id in the cart.
  function getItemQuantity(id: number) {
    return cartItems.find((item: any) => item.id === id)?.quantity || 0;
  }
  // Increase the item by the id in the cart.
  function increaseCartQuantity(id: number, category: string) {
    setCartItems((currItems: any) => {
      const inventoryItem = inventory.filter((item) => item.name === category);

      if (currItems.find((item: any) => item.id === id) == null) {
        return [...currItems, { id, category, quantity: 1 }];
      } else {
        return currItems.map((item: any) => {
          if (
            inventoryItem[0].name === item.category &&
            inventoryItem[0].stock === item.quantity
          ) {
            alert("Only 1 item left");
            return item;
          } else if (
            inventoryItem[0].name === item.category &&
            inventoryItem[0].maxPurchase &&
            inventoryItem[0].maxPurchase === item.quantity
          ) {
            alert(`You can not purchase more than ${item.quantity} items`);
            return item;
          } else {
            if (item.id === id) {
              return { ...item, quantity: item.quantity + 1 };
            } else {
              return item;
            }
          }
        });
      }
    });
  }
  // decrease the item by the id in the cart.
  function decreaseCartQuantity(id: number) {
    setCartItems((currItems: any) => {
      if (currItems.find((item: any) => item.id === id)?.quantity === 1) {
        return currItems.filter((item: any) => item.id !== id);
      } else {
        return currItems.map((item: any) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  // remove the item by the id in the cart.
  function removeFromCart(id: number) {
    setCartItems((currItems: any) => {
      return currItems.filter((item: any) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
