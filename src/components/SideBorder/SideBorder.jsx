import React from "react";
import styles from "./SideBorder.module.scss";

const SideBorder = () => {
  return (
    <div className={styles.sideBorder}>
      <div className={styles.stripe}></div>
      <div className={styles.stripe}></div>
      <div className={styles.stripe}></div>
      <div className={styles.stripe}></div>
    </div>
  );
};

export default SideBorder;
