import { fetchData } from "./dataService";
import { sortProducts } from "../utils/productUtils";

export const createProductService = (category, { sortable = true } = {}) => {
  const fetchAll = async (sort) => {
    const items = await fetchData(category);
    return sortable ? sortProducts(items, sort) : items;
  };

  const findBy = async (field, value) => {
    const items = await fetchData(category);
    return items.find((item) => item[field] === String(value)) ?? null;
  };

  return { fetchAll, findBy };
};

export const vinylService = createProductService("vinyl");
export const techService = createProductService("tech");
export const merchService = createProductService("merch");
