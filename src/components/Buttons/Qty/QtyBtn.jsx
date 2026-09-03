import { useCart } from "../../../context/useCart";
import styles from "./QtyBtn.module.scss";

const QtyBtn = ({
  mode = "details",
  item = null,
  quantity = 1,
  onIncrease = null,
  onDecrease = null,
}) => {
  const { increaseQty, decreaseQty } = useCart();

  const handleIncrease = () => {
    if (onIncrease) {
      onIncrease();
      return;
    }

    if (mode === "cart") {
      if (!item?.slug) return;
      increaseQty(item.slug, item.selectedSize);
    }
  };

  const handleDecrease = () => {
    if (onDecrease) {
      onDecrease();
      return;
    }

    if (mode === "cart") {
      if (!item?.slug) return;
      decreaseQty(item.slug, item.selectedSize);
    }
  };

  const displayQty = mode === "cart" ? (item?.quantity ?? 1) : quantity;

  return (
    <div className={styles.qty}>
      <button
        type="button"
        aria-label="decrease quantity"
        onClick={handleDecrease}
      >
        -
      </button>
      <span aria-live="polite"> {displayQty} </span>
      <button
        type="button"
        aria-label="increase quantity"
        onClick={handleIncrease}
      >
        +
      </button>
    </div>
  );
};

export default QtyBtn;
