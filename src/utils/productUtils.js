export function defineBestSellers(products, top = 10) {
  const topSellers = [...products]
    .sort((a, b) => b.salesCount - a.salesCount)
    .slice(0, top)
    .map((product) => product.id);

  return products.map((product) => ({
    ...product,
    bestSeller: topSellers.includes(product.id),
  }));
}

export function defineNewArrivals(products, months = 2) {
  const today = new Date();
  const cutoffDate = new Date(today);
  cutoffDate.setMonth(cutoffDate.getMonth() - months);

  return products.map((product) => {
    const addedDate = new Date(product.dateAdded);
    const isValidDate = !Number.isNaN(addedDate.getTime());

    return {
      ...product,
      isNewArrival: isValidDate && addedDate >= cutoffDate,
    };
  });
}

export const sortProducts = (items, sort) => {
  const sortedItems = [...items];

  switch (sort) {
    case "price":
      return sortedItems.sort((a, b) => a.price - b.price);
    case "-price":
      return sortedItems.sort((a, b) => b.price - a.price);
    case "rating":
      return sortedItems.sort((a, b) => a.rating - b.rating);
    case "-rating":
      return sortedItems.sort((a, b) => b.rating - a.rating);
    case "-salesCount":
      return sortedItems.sort(
        (a, b) => (b.salesCount ?? 0) - (a.salesCount ?? 0),
      );
    case "-dateAdded":
      return sortedItems.sort(
        (a, b) =>
          new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime(),
      );

    default:
      return sortedItems;
  }
};
