import { useEffect, useMemo, useState } from "react";
import { getRecentlyViewed } from "../../../utils/recentlyViewed";
import useCarousel from "../../../hooks/useCarousel";
import PaginationBtn from "../../Buttons/Pagination/PaginationBtn";
import ProductsLayout from "../../Layout/ProductsLayout/ProductsLayout";

const MOBILE_QUERY = "(max-width: 780px)";

const RecentlyViewed = ({ currentItem }) => {
  const currentItemId = currentItem?.id;
  const currentItemCategory = currentItem?.category;

  const items = useMemo(() => {
    const storedItems = getRecentlyViewed();

    return storedItems.filter(
      (item) =>
        !(item.id === currentItemId && item.category === currentItemCategory),
    );
  }, [currentItemId, currentItemCategory]);

  const [itemsPerView, setItemsPerView] = useState(() =>
    window.matchMedia(MOBILE_QUERY).matches ? 2 : 4,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_QUERY);

    const updateItemsPerView = (event) => {
      setItemsPerView(event.matches ? 2 : 4);
    };

    mediaQuery.addEventListener("change", updateItemsPerView);

    return () => {
      mediaQuery.removeEventListener("change", updateItemsPerView);
    };
  }, []);

  const { visibleItems, canGoPrev, canGoNext, goPrev, goNext } = useCarousel(
    items,
    itemsPerView,
    itemsPerView,
  );

  const pagination =
    items.length > itemsPerView ? (
      <PaginationBtn
        canGoPrev={canGoPrev}
        canGoNext={canGoNext}
        goNext={goNext}
        goPrev={goPrev}
      />
    ) : null;

  if (items.length === 0) return null;

  return (
    <div>
      <ProductsLayout
        title="Recently Viewed"
        products={visibleItems}
        showSort={false}
        showBadge={false}
        headerActions={pagination}
      />
    </div>
  );
};

export default RecentlyViewed;
