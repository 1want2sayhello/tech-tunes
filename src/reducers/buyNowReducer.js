export const initialBuyNowState = {
  buyNowItem: null,
};

export const buyNowReducer = (state, action) => {
  switch (action.type) {
    case "SET_ITEM": {
      const itemToSet = action.payload;
      return {
        ...state,
        buyNowItem: itemToSet
          ? { ...itemToSet, quantity: itemToSet.quantity ?? 1 }
          : null,
      };
    }

    case "INCREASE_QTY": {
      if (!state.buyNowItem) return state;

      return {
        ...state,
        buyNowItem: {
          ...state.buyNowItem,
          quantity: state.buyNowItem.quantity + 1,
        },
      };
    }

    case "DECREASE_QTY": {
      if (!state.buyNowItem) return state;

      return {
        ...state,
        buyNowItem: {
          ...state.buyNowItem,
          quantity: Math.max(1, state.buyNowItem.quantity - 1),
        },
      };
    }
    case "CLEAR_ITEM":
      return {
        ...state,
        buyNowItem: null,
      };

    default:
      return state;
  }
};
