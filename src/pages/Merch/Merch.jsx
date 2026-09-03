import React from "react";
import overlay from "../../assets/graphics/grain-texture.png";
import merchHero from "../../assets/images/merchHero/merch-hero.png";
import merchThumb from "../../assets/images/merchHero/merch-thumb.png";
import JoggersMerch from "../../assets/images/merchHero/joggers.png";
import outsideMerch from "../../assets/images/merchHero/outside-merch.png";

import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { merchService } from "../../services/createProductService";
import { defineBestSellers, defineNewArrivals } from "../../utils/productUtils";
import ProductsLayout from "../../components/Layout/ProductsLayout/ProductsLayout";
import TileLayout from "../../components/Layout/TileLayout/TileLayout";
import ErrorMessage from "../../components/UI/Error/ErrorMessage";
import styles from "./Merch.module.scss";

const Merch = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";

  const handleSortChange = (value) => {
    setSearchParams(value ? { sort: value } : {});
  };

  const {
    data: merch = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["merch", sort],
    queryFn: () => merchService.fetchAll(sort),
    placeholderData: (prev) => prev,
  });

  if (isError)
    return <ErrorMessage resource="merch" onRetry={refetch} error={error} />;

  const bestSellers = defineBestSellers(merch, 10);
  const includeNewArrivals = defineNewArrivals(bestSellers, 2);

  const recentItem = {
    id: merch.id,
    slug: merch.slug,
    title: merch.title,
    subtitle: merch.type,
    image: merch.image,
    price: merch.price,
    category: "merch",
    route: `/merch/${merch.slug}`,
  };

  const heroTiles = [
    { id: 1, type: "text", content: "New Exclusives", variant: "feature" },
    { id: 2, type: "image", src: merchThumb, variant: "secondary" },
    { id: 3, type: "image", src: JoggersMerch, variant: "secondary" },
    { id: 4, type: "text", content: "", variant: "textColor" },
    { id: 5, type: "text", content: "", variant: "textColor" },
    { id: 6, type: "image", src: outsideMerch, variant: "primary" },
    { id: 7, type: "text", content: "Loungewear", variant: "secondary" },
    { id: 8, type: "text", content: "T-Shirts", variant: "primary" },
    { id: 9, type: "image", src: merchHero, variant: "textColor" },
  ];

  return (
    <div className={styles.merch}>
      <div className={styles.hero}>
        <div className={styles.overlay}>
          <img src={overlay} alt="grainy overlay" />
        </div>
        <img
          src={merchHero}
          alt="merch collection"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width="900"
          height="400"
        />
      </div>
      <div className={styles.merchTileGrid}>
        <TileLayout tiles={heroTiles} />
      </div>
      <ProductsLayout
        title="App ● arel"
        categoryLabel="Merch"
        isLoading={isLoading}
        products={includeNewArrivals}
        baseRoute="/merch"
        sort={sort}
        recentItem={recentItem}
        setSort={handleSortChange}
      />
    </div>
  );
};

export default Merch;
