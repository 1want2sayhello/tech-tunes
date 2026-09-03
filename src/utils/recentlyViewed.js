const RECENTLY_VIEWED_KEY = "RecentlyViewedtechTunes";

const MAX_RECENTLY_VIEWED_ITEMS = 6;

export const getRecentlyViewed = () => {
  const storedItems = localStorage.getItem(RECENTLY_VIEWED_KEY);

  if (!storedItems) return [];

  try {
    return JSON.parse(storedItems);
  } catch (error) {
    console.error("Failed to parse recently viewed items.", error);
    return [];
  }
};

export const saveRecentlyViewed = (items) => {
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(items));
};

export const addRecentlyViewedItem = (item) => {
  const currentItems = getRecentlyViewed();

  const filteredItems = currentItems.filter(
    (currentItem) =>
      !(currentItem.id === item.id && currentItem.category === item.category),
  );

  const updatedItems = [item, ...filteredItems].slice(
    0,
    MAX_RECENTLY_VIEWED_ITEMS,
  );

  saveRecentlyViewed(updatedItems);

  return updatedItems;
};
