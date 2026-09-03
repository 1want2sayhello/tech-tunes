import { useEffect, useMemo, useState } from "react";

const useCarousel = (items = [], itemsPerView = 3, step = 1) => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    //reset pagination when collection or responsive size changes
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStartIndex(0);
  }, [items, itemsPerView]);

  const maxStartIndex =
    items.length <= itemsPerView
      ? 0
      : Math.min(
          Math.ceil((items.length - itemsPerView) / step) * step,
          items.length - 1,
        );

  const visibleItems = useMemo(() => {
    return items.slice(startIndex, startIndex + itemsPerView);
  }, [items, startIndex, itemsPerView]);

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex < maxStartIndex;

  const goPrev = () => {
    setStartIndex((prev) => Math.max(prev - step, 0));
  };

  const goNext = () => {
    setStartIndex((prev) => Math.min(prev + step, maxStartIndex));
  };

  const goToStart = () => {
    setStartIndex(0);
  };

  const goToEnd = () => {
    setStartIndex(maxStartIndex);
  };

  return {
    startIndex,
    visibleItems,
    canGoNext,
    canGoPrev,
    goNext,
    goPrev,
    goToStart,
    goToEnd,
  };
};

export default useCarousel;
