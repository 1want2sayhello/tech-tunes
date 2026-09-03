import { useReducer, useEffect } from "react";
import { CartContext } from "./CartContext";
import { cartReducer, initialCartState } from "../reducers/cartReducer";

const CART_STORAGE_KEY = "tech-tunes-cart";

const getInitialCartState = (defaultState) => {
  try {
    const savedItems = localStorage.getItem(CART_STORAGE_KEY);

    return savedItems
      ? { ...defaultState, cartItems: JSON.parse(savedItems) }
      : defaultState;
  } catch {
    return defaultState;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCartState,
    getInitialCartState,
  );

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addItem = (item) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (slug, selectedSize) => {
    dispatch({ type: "REMOVE_ITEM", payload: { slug, selectedSize } });
  };

  const increaseQty = (slug, selectedSize) => {
    dispatch({ type: "INCREASE_QTY", payload: { slug, selectedSize } });
  };

  const decreaseQty = (slug, selectedSize) => {
    dispatch({ type: "DECREASE_QTY", payload: { slug, selectedSize } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const value = {
    cartItems: state.cartItems,
    addItem,
    removeItem,
    increaseQty,
    decreaseQty,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
