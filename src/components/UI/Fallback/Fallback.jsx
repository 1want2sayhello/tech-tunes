import styles from "./Fallback.module.scss";

const Fallback = () => {
  return (
    <div
      className={styles.fallback}
      aria-label="Loading page"
      aria-busy="true"
    ></div>
  );
};

export default Fallback;
