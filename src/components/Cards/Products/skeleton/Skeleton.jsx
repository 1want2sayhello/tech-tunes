import styles from "./skeleton.module.scss";

const ProductCardSkeleton = () => {
  return (
    <div className={styles.card}>
      <div className={styles.image}></div>
      <div className={styles.line}></div>
      <div className={styles.smallLine}></div>
      <div className={styles.price}></div>
    </div>
  );
};

export default ProductCardSkeleton;
