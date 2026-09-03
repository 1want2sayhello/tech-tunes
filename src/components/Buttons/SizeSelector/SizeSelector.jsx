import { useEffect } from "react";
import styles from "./SizeSelector.module.scss";

const SizeSelector = ({ sizes = [], selectedSize, onSelect }) => {
  useEffect(() => {
    if (sizes.length === 1 && !selectedSize) {
      onSelect(sizes[0]);
    }
  }, [sizes, selectedSize, onSelect]);

  return (
    <div className={styles.sizeContainer}>
      <div className={styles.buttons} role="group" aria-label="Select a size">
        {sizes.map((size) => (
          <button
            type="button"
            aria-pressed={selectedSize === size}
            key={size}
            className={`${styles.sizeSelectors}
         ${selectedSize === size ? styles.active : ""}`}
            onClick={(e) => {
              e.preventDefault();
              onSelect(size);
            }}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
export default SizeSelector;
