import React, { useReducer, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/useCart";
import CartCard from "../../components/Cards/Cart/CartCard";
import trashIcon from "../../assets/graphics/trash-icon.png";
import EmptyCart from "../../components/UI/EmptyCart/EmptyCart";
import DemoModal from "../../components/UI/DemoModal/DemoModal";
import styles from "./Cart.module.scss";

import RecentlyViewed from "../../components/Sections/RecentlyViewed/RecentlyViewed";
import {
  buyNowReducer,
  initialBuyNowState,
} from "../../reducers/buyNowReducer";

const Cart = ({ buyNowMode = false }) => {
  const BUY_NOW_STORAGE_KEY = "tech-tunes-buy-now";
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  const getStoredBuyNowItem = () => {
    try {
      const storedItem = sessionStorage.getItem(BUY_NOW_STORAGE_KEY);

      return storedItem ? JSON.parse(storedItem) : null;
    } catch {
      return null;
    }
  };

  const [buyNowState, dispatchBuyNow] = useReducer(
    buyNowReducer,
    initialBuyNowState,
    (initial) => ({
      ...initial,
      buyNowItem: location.state?.buyNowItem ?? getStoredBuyNowItem(),
    }),
  );
  const { buyNowItem } = buyNowState;
  const buyNowItems = buyNowItem ? [buyNowItem] : [];
  const displayedItems = buyNowMode ? buyNowItems : cartItems;

  useEffect(() => {
    if (!buyNowMode || !buyNowItem) return;

    sessionStorage.setItem(BUY_NOW_STORAGE_KEY, JSON.stringify(buyNowItem));
  }, [buyNowItem, buyNowMode]);

  const handleContinue = () => {
    if (buyNowMode) {
      sessionStorage.removeItem(BUY_NOW_STORAGE_KEY);
      dispatchBuyNow({ type: "CLEAR_ITEM" });
    } else {
      clearCart();
    }

    setModalOpen(false);
    navigate("/order-confirmation", { replace: true });
  };

  const increaseBuyNowQty = () => {
    dispatchBuyNow({ type: "INCREASE_QTY" });
  };

  const decreaseBuyNowQty = () => {
    dispatchBuyNow({ type: "DECREASE_QTY" });
  };

  const taxRate = 0.09;

  const subtotal = displayedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const taxAmt = subtotal * taxRate;
  const total = taxAmt + subtotal;

  if (buyNowMode && !buyNowItem) {
    return (
      <EmptyCart
        heading="No Item Selected."
        message="Select an item from a product page and select buy now to begin quick checkout."
      />
    );
  }

  if (displayedItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <section className={styles.cartWrapper}>
      <section className={styles.cart}>
        <div className={styles.cartItems}>
          {displayedItems.map((item) => (
            <CartCard
              key={`${item.slug}-${item.selectedSize ?? "default"}`}
              item={item}
              readOnly={buyNowMode}
              onIncrease={buyNowMode ? increaseBuyNowQty : undefined}
              onDecrease={buyNowMode ? decreaseBuyNowQty : undefined}
            />
          ))}
        </div>
        <div className={styles.checkout}>
          <div className={styles.checkoutContent}>
            <div className={styles.total}>
              <span> Subtotal: ${subtotal.toFixed(2)} </span>
              <span> Tax: ${taxAmt.toFixed(2)} </span>
              <hr />
              <span> Total: ${total.toFixed(2)} </span>
            </div>
          </div>
          <div className={styles.buttons}>
            {!buyNowMode && (
              <button
                type="button"
                className={styles.clearCart}
                onClick={() => clearCart()}
              >
                <img src={trashIcon} alt="" />
                Clear Cart
              </button>
            )}

            <button
              className={styles.checkoutBtn}
              onClick={() => setModalOpen(true)}
            >
              Checkout
            </button>
          </div>
        </div>
      </section>
      <RecentlyViewed />

      <DemoModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onContinue={handleContinue}
      />
    </section>
  );
};

export default Cart;
