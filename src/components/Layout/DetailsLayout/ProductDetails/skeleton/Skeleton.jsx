import styles from "./Skeleton.module.scss";

const Skeleton = () => {
  return (
    <div>
      <div
        className={styles.skeleton}
        aria-busy="true"
        aria-label="loading product details"
      >
        <div className={styles.image}></div>
        <div className={styles.content}>
          <div className={styles.title}></div>
          <div className={styles.subtitle}></div>
          <div className={styles.description}></div>
          <div className={styles.price}></div>
          <div className={styles.button}></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
