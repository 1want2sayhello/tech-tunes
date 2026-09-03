export const initialCartState = {
  cartItems: [],
};

const isSameCartItem = (item, target) =>
  item.slug === target.slug && item.selectedSize === target.selectedSize;

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const itemToAdd = action.payload;
      const incomingQty = itemToAdd.quantity ?? 1;

      const existingItem = state.cartItems.find((item) =>
        isSameCartItem(item, itemToAdd),
      );

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.slug === itemToAdd.slug &&
            item.selectedSize === itemToAdd.selectedSize
              ? { ...item, quantity: item.quantity + incomingQty }
              : item,
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { ...itemToAdd, quantity: incomingQty },
        ],
      };
    }

    case "REMOVE_ITEM": {
      const itemToRemove = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => !isSameCartItem(item, itemToRemove),
        ),
      };
    }

    case "INCREASE_QTY": {
      const itemToIncrease = action.payload;

      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          isSameCartItem(item, itemToIncrease)
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      };
    }

    case "DECREASE_QTY": {
      const itemToDecrease = action.payload;

      const updatedItems = state.cartItems
        .map((item) =>
          isSameCartItem(item, itemToDecrease)
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0);

      return {
        ...state,
        cartItems: updatedItems,
      };
    }

    case "CLEAR_CART":
      return {
        ...state,
        cartItems: [],
      };

    default:
      return state;
  }
};
