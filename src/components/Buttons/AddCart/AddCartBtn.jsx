import React from "react";
import Checkmark from "../../../assets/graphics/checkmark-icon.png";
import styles from "./AddCartBtn.module.scss";

const AddCartBtn = ({
  onClick,
  className,
  isAdded,
  disabled = false,
  label,
}) => {
  return (
    <button
      className={`${className} ${styles.addToCart} ${isAdded ? styles.added : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span> {label} </span>
    </button>
  );
};

export default AddCartBtn;
