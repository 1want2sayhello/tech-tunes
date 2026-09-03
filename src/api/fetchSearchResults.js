import {
  mapVinylToSearch,
  mapMerchToSearch,
  mapTechToSearch,
} from "../utils/mappers/search/mapSearchData";
import { searchItems } from "../utils/searchItems.js";
import { sortProducts } from "../utils/productUtils";

import { fetchData } from "../services/dataService.js";

export const fetchSearchResults = async (query, sort) => {
  const [vinyl, merch, tech] = await Promise.all([
    fetchData("vinyl"),
    fetchData("merch"),
    fetchData("tech"),
  ]);

  const normalized = [
    ...vinyl.map(mapVinylToSearch),
    ...merch.map(mapMerchToSearch),
    ...tech.map(mapTechToSearch),
  ];

  const filtered = searchItems(normalized, query);
  const sorted = sortProducts(filtered, sort);

  return sorted;
};
