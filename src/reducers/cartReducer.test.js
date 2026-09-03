import { describe, it, expect } from "vitest";
import { cartReducer, initialCartState } from "./cartReducer";

describe("cartReducer", () => {
  it("adds merch item to an empty cart", () => {
    const action = {
      type: "ADD_ITEM",
      payload: {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        price: 24.99,
        selectedSize: "M",
      },
    };

    const newState = cartReducer(initialCartState, action);

    expect(newState.cartItems).toEqual([
      {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        price: 24.99,
        selectedSize: "M",
        quantity: 1,
      },
    ]);
  });

  it("merges quantity when same item is already stored in cart", () => {
    const action = {
      type: "ADD_ITEM",
      payload: {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        price: 24.99,
        selectedSize: "M",
        quantity: 1,
      },
    };

    const existingCart = {
      cartItems: [
        {
          id: 4,
          slug: "zip-jacket",
          name: "Zip Jacket",
          price: 24.99,
          selectedSize: "M",
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(existingCart, action);

    expect(newState.cartItems).toEqual([
      {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        price: 24.99,
        selectedSize: "M",
        quantity: 2,
      },
    ]);
  });

  it("removes item if it already exists in cart", () => {
    const action = {
      type: "REMOVE_ITEM",
      payload: {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        price: 24.99,
        selectedSize: "M",
        quantity: 1,
      },
    };

    const existingCart = {
      cartItems: [
        {
          id: 4,
          slug: "zip-jacket",
          name: "Zip Jacket",
          selectedSize: "M",
          price: 24.99,
          quantity: 1,
        },
        {
          id: 5,
          slug: "jogger-pants",
          name: "Jogger Pants",
          type: "loungewear",
          selectedSize: "L",
          price: 34.99,
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(existingCart, action);

    expect(newState.cartItems).toEqual([
      {
        id: 5,
        slug: "jogger-pants",
        name: "Jogger Pants",
        type: "loungewear",
        selectedSize: "L",
        price: 34.99,
        quantity: 1,
      },
    ]);
  });

  it("clears all items in cart", () => {
    const action = {
      type: "CLEAR_CART",
    };

    const existingCart = {
      cartItems: [
        {
          id: 4,
          slug: "zip-jacket",
          name: "Zip Jacket",
          price: 24.99,
          selectedSize: "M",
          quantity: 1,
        },
        {
          id: 5,
          slug: "jogger-pants",
          name: "Jogger Pants",
          type: "loungewear",
          selectedSize: "L",
          price: 34.99,
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(existingCart, action);

    expect(newState.cartItems).toEqual([]);
  });

  it("increases an item's qty if it already exists in cart", () => {
    const action = {
      type: "INCREASE_QTY",
      payload: {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        price: 24.99,
        selectedSize: "M",
        quantity: 1,
      },
    };

    const existingCart = {
      cartItems: [
        {
          id: 4,
          slug: "zip-jacket",
          name: "Zip Jacket",
          selectedSize: "M",
          price: 24.99,
          quantity: 1,
        },
        {
          id: 5,
          slug: "jogger-pants",
          name: "Jogger Pants",
          type: "loungewear",
          selectedSize: "L",
          price: 34.99,
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(existingCart, action);

    expect(newState.cartItems).toEqual([
      {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        selectedSize: "M",
        price: 24.99,
        quantity: 2,
      },
      {
        id: 5,
        slug: "jogger-pants",
        name: "Jogger Pants",
        type: "loungewear",
        selectedSize: "L",
        price: 34.99,
        quantity: 1,
      },
    ]);
  });

  it("decreases an item's qty if it already exists in cart", () => {
    const action = {
      type: "DECREASE_QTY",
      payload: {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        price: 24.99,
        selectedSize: "M",
        quantity: 1,
      },
    };

    const existingCart = {
      cartItems: [
        {
          id: 4,
          slug: "zip-jacket",
          name: "Zip Jacket",
          selectedSize: "M",
          price: 24.99,
          quantity: 3,
        },
        {
          id: 5,
          slug: "jogger-pants",
          name: "Jogger Pants",
          type: "loungewear",
          selectedSize: "L",
          price: 34.99,
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(existingCart, action);

    expect(newState.cartItems).toEqual([
      {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        selectedSize: "M",
        price: 24.99,
        quantity: 2,
      },
      {
        id: 5,
        slug: "jogger-pants",
        name: "Jogger Pants",
        type: "loungewear",
        selectedSize: "L",
        price: 34.99,
        quantity: 1,
      },
    ]);
  });

  it("reduces item's qty to 0 if decreased with only one item instance in cart", () => {
    const action = {
      type: "DECREASE_QTY",
      payload: {
        id: 4,
        slug: "zip-jacket",
        name: "Zip Jacket",
        price: 24.99,
        selectedSize: "M",
        quantity: 1,
      },
    };

    const existingCart = {
      cartItems: [
        {
          id: 4,
          slug: "zip-jacket",
          name: "Zip Jacket",
          selectedSize: "M",
          price: 24.99,
          quantity: 1,
        },
        {
          id: 5,
          slug: "jogger-pants",
          name: "Jogger Pants",
          type: "loungewear",
          selectedSize: "L",
          price: 34.99,
          quantity: 1,
        },
      ],
    };

    const newState = cartReducer(existingCart, action);

    expect(newState.cartItems).toEqual([
      {
        id: 5,
        slug: "jogger-pants",
        name: "Jogger Pants",
        type: "loungewear",
        selectedSize: "L",
        price: 34.99,
        quantity: 1,
      },
    ]);
  });
});
