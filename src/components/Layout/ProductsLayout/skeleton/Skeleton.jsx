import styles from "./Skeleton.module.scss";

const Skeleton = ({ title }) => {
  return (
    <div className={styles.skeletonSection}>
      <div className={styles.skeletonHeader}>
        <h2>{title}</h2>
        <div className={styles.skeletonSort} />
      </div>

      <div className={styles.skeletonGrid}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div className={styles.skeletonCard} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Skeleton;
