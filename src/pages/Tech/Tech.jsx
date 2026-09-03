import React from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { techService } from "../../services/createProductService";
import ProductsLayout from "../../components/Layout/ProductsLayout/ProductsLayout";
import { defineBestSellers, defineNewArrivals } from "../../utils/productUtils";

import Hand from "../../assets/graphics/tech/spray-bottle.webp";
import Mist from "../../assets/graphics/tech/mist.webp";
import styles from "./Tech.module.scss";

import ErrorMessage from "../../components/UI/Error/ErrorMessage";

const Tech = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";

  const handleSortChange = (value) => {
    setSearchParams(value ? { sort: value } : {});
  };

  const {
    data: tech = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["tech", sort],
    queryFn: () => techService.fetchAll(sort),
    placeholderData: (prev) => prev,
    retry: 1,
  });

  if (isError) {
    return (
      <ErrorMessage resource="tech items" onRetry={refetch} error={error} />
    );
  }

  const bestSellers = defineBestSellers(tech, 4);
  const includeNewArrivals = defineNewArrivals(bestSellers, 1);

  return (
    <section className={styles.Tech}>
      <section className={styles.techHero}>
        <div className={styles.sprayContent}>
          <div className={styles.sprayHeaders}>
            <h1>
              Ditch the Dust. <br />
              Keep the Groove.
            </h1>

            <h3>
              Cleaner grooves for a smoother spin. <br />
              Now included in our signature cleaning kit.
            </h3>
          </div>
          <Link to="/tech/tech-tunes-vinyl-care-kit">
            <div className={styles.sprayCTA}>View Cleaning Kit</div>
          </Link>
        </div>
        <div className={styles.spray}>
          <div className={styles.hand}>
            <img src={Hand} alt="hand spraying vinyl cleaner" />
          </div>
          <div className={styles.mist}>
            <img src={Mist} alt="mist cloud" />
          </div>
        </div>
      </section>

      <ProductsLayout
        title="Studio Tech"
        categoryLabel="Tech"
        products={includeNewArrivals}
        isLoading={isLoading}
        baseRoute="/tech"
        sort={sort}
        showBadge={true}
        setSort={handleSortChange}
      />
    </section>
  );
};

export default Tech;
