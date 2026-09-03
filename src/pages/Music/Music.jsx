import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import useCarousel from "../../hooks/useCarousel";
import PaginationBtn from "../../components/Buttons/Pagination/PaginationBtn";

import firstImgTile from "../../assets/images/musicHero/music-listener-1.webp";
import thirdImgTile from "../../assets/images/musicHero/music-listener-2.webp";
import fourthImgTile from "../../assets/images/musicHero/display.webp";
import fifthImgTile from "../../assets/images/musicHero/music-listener-3.webp";
import sixthImgTile from "../../assets/images/musicHero/display-2.webp";
import TileLayout from "../../components/Layout/TileLayout/TileLayout";
import ErrorMessage from "../../components/UI/Error/ErrorMessage";
import { defineBestSellers, defineNewArrivals } from "../../utils/productUtils";
import { useQuery } from "@tanstack/react-query";

import { vinylService } from "../../services/createProductService";

import ProductsLayout from "../../components/Layout/ProductsLayout/ProductsLayout";
import styles from "./Music.module.scss";

const Music = () => {
  const heroTiles = [
    { id: 1, type: "text", content: "New Arrivals", variant: "feature" },
    { id: 2, type: "image", src: sixthImgTile, variant: "textColor" },
    { id: 3, type: "text", content: "Vinyl Variants", variant: "secondary" },
    { id: 4, type: "image", src: firstImgTile, variant: "textColor" },
    { id: 5, type: "image", src: thirdImgTile, variant: "shadow" },
    { id: 6, type: "text", content: "Tech Tunes", variant: "primary" },
    { id: 7, type: "image", src: fourthImgTile, variant: "shadow" },
    { id: 8, type: "image", src: fifthImgTile, variant: "shadow" },
    { id: 9, type: "text", content: "Exclusives", variant: "primary" },
  ];

  const [searchParams, setSearchParams] = useSearchParams();
  const sort = searchParams.get("sort") || "";

  const handleSortChange = (value) => {
    setSearchParams(value ? { sort: value } : {});
  };

  const {
    data: vinyl = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["vinyl", sort],
    queryFn: () => vinylService.fetchAll(sort),
    placeholderData: (prev) => prev,
  });

  const includeNewArrivals = useMemo(() => {
    const bestSellers = defineBestSellers(vinyl, 10);
    return defineNewArrivals(bestSellers, 2);
  }, [vinyl]);

  const PAGE_SIZE = 8;

  const { visibleItems, canGoPrev, canGoNext, goPrev, goNext } = useCarousel(
    includeNewArrivals,
    PAGE_SIZE,
    PAGE_SIZE,
  );

  const pagination =
    !isLoading && includeNewArrivals.length > PAGE_SIZE ? (
      <PaginationBtn
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        goPrev={goPrev}
        goNext={goNext}
      />
    ) : null;

  if (isError)
    return (
      <ErrorMessage resource="vinyl records" onRetry={refetch} error={error} />
    );

  return (
    <section className={styles.music}>
      <div className={styles.musicHero}>
        <TileLayout
          tiles={heroTiles}
          className={styles.musicTiles}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      <ProductsLayout
        title="All Vinyl"
        categoryLabel="Vinyl"
        products={visibleItems}
        isLoading={isLoading}
        baseRoute="/vinyl"
        sort={sort}
        setSort={handleSortChange}
        headerActions={pagination}
        footerActions={pagination}
      />
    </section>
  );
};

export default Music;
