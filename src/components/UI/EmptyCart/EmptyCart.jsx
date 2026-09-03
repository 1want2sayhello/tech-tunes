import { Link } from "react-router-dom";
import EmptyCartIcon from "../../../assets/graphics/empty-cart.png";
import styles from "./EmptyCart.module.scss";

const EmptyCart = ({ heading, message }) => {
  return (
    <section className={styles.emptyCart}>
      <div className={styles.logo}>
        <img src={EmptyCartIcon} alt="empty cart icon" />
      </div>
      <div className={styles.content}>
        <h1> {heading ?? "Uh Oh! Your Cart's Empty."}</h1>

        {message ? (
          <p> {message} </p>
        ) : (
          <p>
            Let's fix that! Browse our
            <span>
              <Link to="/music"> Vinyl, </Link>
            </span>
            <span>
              <Link to="/tech"> Tech, </Link>
            </span>
            &
            <span>
              <Link to="/merch"> Merch </Link>
            </span>
            today!
          </p>
        )}
      </div>
    </section>
  );
};

export default EmptyCart;
