import AddCartBtn from "../../Buttons/AddCart/AddCartBtn";
import RatingStar from "../../../assets/graphics/rating-icon.png";
import styles from "./ProductCard.module.scss";

const ProductCard = ({ product, showBadge = true }) => {
  if (!product) return null;

  console.log(product.name, {
    bestSeller: product.bestSeller,
    isNewArrival: product.isNewArrival,
  });

  const heading = product.title || product.name;
  const subheading =
    product.artist || product.brand || product.type || product.subtitle || "";

  let badge = null;

  if (product.isNewArrival) {
    badge = "New Arrival";
  } else if (product.bestSeller) {
    badge = "Top Seller";
  }

  let metaType;

  if (product.variant) {
    metaType = (
      <span>
        <strong> Variant:</strong> {product.variant}
      </span>
    );
  } else if (product.type) {
    metaType = product.type;
  } else {
    metaType = null;
  }

  return (
    <div className={styles.productCard}>
      {showBadge && badge && <div className={styles.badge}>{badge}</div>}
      <div className={styles.productImg}>
        <img
          src={product.image}
          alt={heading}
          onError={(e) => {
            e.target.src = "/graphics/cover-error.png";
          }}
          loading="lazy"
          decoding="async"
          width="260"
          height="160"
        />
      </div>
      <div className={styles.productContent}>
        <div className={styles.header}>
          <h3 className={styles.subheading}>{subheading} </h3>
          <h2 className={styles.heading}>{heading}</h2>
        </div>
        <div className={styles.productDetails}>
          <div className={styles.middle}>
            <span className={styles.variant}> {metaType}</span>
            <span className={styles.rating}>
              <img src={RatingStar} alt="rating star icon" />
              <span> {product.rating} </span>
            </span>
          </div>

          <div className={styles.price}>
            <span> Price: ${product.price} </span>
          </div>
        </div>
        <div className={styles.viewProduct}> View More </div>
      </div>
    </div>
  );
};

export default ProductCard;
