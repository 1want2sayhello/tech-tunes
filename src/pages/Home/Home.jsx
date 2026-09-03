import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { vinylService } from "../../services/createProductService";
import CloudBack from "../../assets/graphics/cloud-back-graphic.png";
import CloudFront from "../../assets/graphics/cloud-front-graphic.png";
import SlideShow from "../../components/SlideShow/SlideShow";

import { defineBestSellers, defineNewArrivals } from "../../utils/productUtils";
import { useQuery } from "@tanstack/react-query";

import Skeleton from "../../components/Layout/ProductsLayout/skeleton/Skeleton";
import ProductsLayout from "../../components/Layout/ProductsLayout/ProductsLayout";
import TechHero from "../../assets/images/home/tech-hero.webp";

import RockerHero from "../../assets/graphics/rocker-hand-hero.png";
import styles from "./Home.module.scss";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";

  const handleSortChange = (value) => {
    setSearchParams(value ? { sort: value } : {});
  };

  const {
    data: vinyl = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vinyl", sort],
    queryFn: () => vinylService.fetchAll(sort),
    placeholderData: (prev) => prev,
  });

  const displayVinyl = defineNewArrivals(defineBestSellers(vinyl, 10), 2);

  const newArrivalVinyl = displayVinyl.filter(
    (product) => product.isNewArrival,
  );

  const bestSellingVinyl = displayVinyl.filter((product) => product.bestSeller);

  return (
    <section className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.header}>
          <div className={styles.headerMainContent}>
            <div className={styles.lineOne}>
              <span className={styles.outline}>On Sale</span>
              <span className={styles.solid}>On Sale</span>
            </div>
            <div className={styles.lineTwo}>
              <span className={styles.outline}>New Arrivals</span>
              <span className={styles.solid}>New Arrivals</span>
            </div>
            <Link to={"/#NewArrivals"}>
              <span className={styles.cta}>
                <h4>Check Them Out</h4>
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.graphic}>
          <div className={styles.cloud}>
            <img
              className={styles.cloudBack}
              src={CloudBack}
              alt="cloud-back"
            />
            <div className={styles.artist}>
              <SlideShow />
            </div>
            <img
              className={styles.cloudFront}
              src={CloudFront}
              alt="cloud-front"
            />
          </div>
        </div>
      </div>

      <section className={styles.techHero}>
        <img src={TechHero} alt="recording studio tech hero" />
      </section>
      <section className={styles.rocker}>
        <div>
          <h1>Armed with Better Sound</h1>
        </div>
        <div className={styles.rockerImg}>
          <img src={RockerHero} alt="rocker hero hand" />
        </div>
        <div>
          <h1>
            Made to be Played
            <span className={styles.highlightText}> Loud </span>
          </h1>
        </div>
      </section>

      {isError ? (
        <section className={styles.status}>
          <p> {error.message} </p>
        </section>
      ) : (
        <>
          <section id="NewArrivals" className={styles.newArrivalVinyl}>
            {isLoading ? (
              <Skeleton title="New Arrivals" />
            ) : (
              <ProductsLayout
                title="New Arrivals"
                products={newArrivalVinyl}
                showSort={false}
                baseRoute="/vinyl"
                showBadge={false}
                sort={sort}
                setSort={handleSortChange}
              />
            )}
          </section>

          <section className={styles.bestSellingVinyl}>
            {isLoading ? (
              <Skeleton title="Top Sellers" />
            ) : (
              <ProductsLayout
                title="Top Sellers"
                products={bestSellingVinyl}
                showSort={false}
                baseRoute="/vinyl"
                showBadge={false}
                sort={sort}
                setSort={handleSortChange}
              />
            )}
          </section>
        </>
      )}
    </section>
  );
};

export default Home;
