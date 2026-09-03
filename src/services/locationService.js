import { fetchData } from "./dataService";

export const fetchLocations = async () => {
  const locations = await fetchData("locations");
  return locations;
};

export const fetchLocationBySlug = async (slug) => {
  const locations = await fetchData("locations");
  return locations.find((item) => item.slug === slug) ?? null;
};
