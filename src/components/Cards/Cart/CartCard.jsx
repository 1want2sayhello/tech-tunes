import React from "react";
import trashIcon from "../../../assets/graphics/trash-icon.png";
import QtyBtn from "../../Buttons/Qty/QtyBtn";
import { useCart } from "../../../context/useCart";
import styles from "./CartCard.module.scss";

const CartCard = ({ item, readOnly = false, onIncrease, onDecrease }) => {
  const { removeItem, increaseQty, decreaseQty } = useCart();

  return (
    <article key={item.slug} className={styles.CartCard}>
      {!readOnly && (
        <button
          type="button"
          className={styles.removeItem}
          onClick={() => removeItem(item.slug, item.selectedSize)}
        >
          <img src={trashIcon} alt="delete item" />
        </button>
      )}
      <div className={styles.cardImg}>
        <img src={item.image} alt="" />
      </div>
      <div className={styles.cardContent}>
        <div className={styles.cardTitle}>
          <h2> {item.title} </h2>
          <span>{item.meta}</span>
        </div>

        <div className={styles.cardInfo}>
          {item.selectedSize && <span> Size: {item.selectedSize} </span>}
          <span>
            <strong> Price: ${item.price} </strong>
          </span>
        </div>

        <QtyBtn
          mode="cart"
          item={item}
          onIncrease={
            onIncrease ?? (() => increaseQty(item.slug, item.selectedSize))
          }
          onDecrease={
            onDecrease ?? (() => decreaseQty(item.slug, item.selectedSize))
          }
        />
      </div>
    </article>
  );
};

export default CartCard;
