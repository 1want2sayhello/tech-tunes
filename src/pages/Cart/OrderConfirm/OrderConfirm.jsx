import { Link } from "react-router-dom";
import styles from "./OrderConfirm.module.scss";

const OrderConfirm = () => {
  return (
    <section className={styles.confirmation}>
      <div className={styles.content}>
        <h1> Order Confirmation </h1>
        <h2> Thank you for completing your order! </h2>
        <Link to={"/"}>
          <div className={styles.button}>
            <h4>Return Home</h4>
          </div>
        </Link>
      </div>
    </section>
  );
};

export default OrderConfirm;
