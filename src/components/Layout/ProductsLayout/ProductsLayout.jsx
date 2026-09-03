import { Link } from "react-router-dom";

import ProductCardSkeleton from "../../Cards/Products/skeleton/Skeleton";
import ProductCard from "../../Cards/Products/ProductCard";
import styles from "./ProductsLayout.module.scss";

const ProductsLayout = ({
  title,
  categoryLabel,
  products = [],
  isLoading = false,
  sort,
  setSort,
  baseRoute,
  showBadge = true,
  showSort = true,
  action = "view",
  headerActions,
  footerActions,
}) => {
  const getProductRoute = (product) => {
    if (product.route) return product.route;
    if (baseRoute && product.slug) return `${baseRoute}/${product.slug}`;
    if (product.category && product.slug) {
      return `/${product.category}/${product.slug}`;
    }
    console.warn("missing route data for product:", product);
    return "/";
  };

  const sortLabels = {
    "-dateAdded": "New Arrivals",
    "-salesCount": "Best Sellers",
    "-price": "Price: High to Low",
    price: "Price: Low to High",
    rating: "Rating: Low to High",
    "-rating": "Rating: High to Low",
  };

  const displayedTitle =
    showSort && sort && categoryLabel ? (sortLabels[sort] ?? title) : title;

  return (
    <section className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h3>
            {displayedTitle}
            {sort && categoryLabel && <> | {categoryLabel} </>}
          </h3>
        </div>
        <div className={styles.headerContent}>
          {showSort && setSort && (
            <select
              className={styles.sortBox}
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
            >
              <option value="">Sort By</option>
              <option value="-dateAdded"> New Arrivals </option>
              <option value="-salesCount"> Best Sellers </option>
              <option value="price"> Price: Low to High </option>
              <option value="-price"> Price: High to Low </option>
              <option value="rating"> Rating: Low to High </option>
              <option value="-rating"> Rating: High to Low </option>
            </select>
          )}

          {headerActions}
        </div>
      </div>
      <div className={styles.productGrid}>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : products.map((product) => {
              const productRoute = getProductRoute(product);
              return (
                <Link
                  key={product.slug || `${product.category}-${product.id}`}
                  to={productRoute}
                  className="card-link"
                >
                  <ProductCard
                    product={product}
                    showBadge={showBadge}
                    action={action}
                  />
                </Link>
              );
            })}
      </div>

      <div className={styles.footerActions}>{footerActions}</div>
    </section>
  );
};

export default ProductsLayout;
