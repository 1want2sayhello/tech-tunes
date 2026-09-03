import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { addRecentlyViewedItem } from "../../../../utils/recentlyViewed";
import RecentlyViewed from "../../../Sections/RecentlyViewed/RecentlyViewed";
import SizeSelector from "../../../Buttons/SizeSelector/SizeSelector";
import styles from "./ProductDetailsLayout.module.scss";
import { useCart } from "../../../../context/useCart";
import mapToCart from "../../../../utils/mappers/CartMapper";

import QtyBtn from "../../../Buttons/Qty/QtyBtn";
import AddCartBtn from "../../../Buttons/AddCart/AddCartBtn";

const ProductDetailsLayout = ({
  recentItem,
  heading,
  subheading,
  image,
  description,
  rating,
  meta = [],
  item,
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const { addItem } = useCart();

  const navigate = useNavigate();

  const hasSizeOptions = item?.sizes?.length > 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasSizeOptions && !selectedSize) {
      setSizeError(true);
      return;
    }

    addItem(cartProduct);
    setSizeError(false);

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  useEffect(() => {
    if (!recentItem) return;
    addRecentlyViewedItem(recentItem);
  }, [recentItem]);

  const cartProduct = item
    ? {
        ...mapToCart(item),
        selectedSize,
        quantity,
      }
    : null;

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (hasSizeOptions && !selectedSize) {
      setSizeError(true);
      return;
    }

    setSizeError(false);
    navigate("/buy-now", {
      state: { buyNowItem: cartProduct },
    });
  };

  return (
    <section className={styles.detailsContainer}>
      <section className={styles.details}>
        <div className={styles.detailsImg}>
          <img
            src={image}
            alt={`${heading} image`}
            onError={(e) => {
              e.target.src = "/graphics/cover-error.png";
            }}
          />
        </div>
        <div className={styles.detailsContent}>
          <h2> {heading} </h2>
          <h3> {subheading} </h3>
          <p className={styles.description}> {description} </p>

          {hasSizeOptions && (
            <SizeSelector
              selectedSize={selectedSize}
              onSelect={(size) => {
                setSelectedSize(size);
                setSizeError(false);
              }}
              sizes={item.sizes}
            />
          )}

          <p
            role="alert"
            className={`${styles.errorMessage} ${sizeError && hasSizeOptions ? styles.visible : ""}`}
          >
            {sizeError && hasSizeOptions ? "Please Select A Size." : ""}
          </p>

          <p className={styles.rating}> Rating: {rating} </p>
          {meta.length > 0 && (
            <div className={styles.meta}>
              {meta.map((metaItem) => (
                <div key={metaItem.label} className={styles.meta}>
                  <span className={styles.label}>{metaItem.label}: </span>
                  <span className={styles.value}>{metaItem.value}</span>
                </div>
              ))}
            </div>
          )}
          <QtyBtn
            mode="details"
            quantity={quantity}
            onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
            onIncrease={() => setQuantity((prev) => prev + 1)}
          />

          {cartProduct && (
            <div className={styles.actions}>
              <AddCartBtn
                className={styles.buyNow}
                onClick={handleBuyNow}
                isAdded={false}
                label="Buy Now"
              />

              <AddCartBtn
                className={styles.addToCart}
                onClick={handleAdd}
                isAdded={isAdded}
                disabled={isAdded}
                label={isAdded ? "Added!" : "Add to Cart"}
              />
            </div>
          )}
        </div>
      </section>
      <div></div>
      <RecentlyViewed currentItem={recentItem} />
    </section>
  );
};

export default ProductDetailsLayout;
