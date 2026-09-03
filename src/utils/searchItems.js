import { createFuse } from "./fuseSearch";

const normalizeText = (value) => {
  return String(value || "").toLowerCase();
};

export const searchItems = (items, query) => {
  const normalizedQuery = normalizeText(query).trim();

  if (!normalizedQuery) return [];

  const exactMatches = items.filter((item) => {
    const exactSearchText = [
      item.title,
      item.subtitle,
      item.brand,
      item.genre,
      item.type,
      ...(item.tags || []),
    ]
      .map(normalizeText)
      .join(" ");

    return exactSearchText.includes(normalizedQuery);
  });

  const exactMatchCategories = [
    ...new Set(exactMatches.map((item) => item.category)),
  ];

  const searchPool =
    exactMatchCategories.length === 1
      ? items.filter((item) => item.category === exactMatchCategories[0])
      : items;

  const fuse = createFuse(searchPool);

  const fuseResults = fuse.search(normalizedQuery);
  const primaryFields = ["title"];

  const primaryMatches = fuseResults.filter((result) =>
    result.matches?.some((match) => primaryFields.includes(match.key)),
  );

  const candidateMatches =
    primaryMatches.length > 0 ? primaryMatches : fuseResults;

  const rankedMatches = candidateMatches.filter(
    (result) => result.score <= 0.75,
  );

  const fuzzyMatches = rankedMatches.map((result) => result.item);

  const relevantMatches = rankedMatches
    .filter((result) => result.item.category === "vinyl")
    .filter((result) => result.item.subtitle)
    .filter((result) =>
      result.matches?.some((match) => match.key === "subtitle"),
    )
    .map((result) => result.item.subtitle);

  const matchedArtists = [...new Set(relevantMatches)];

  const completeArtistCatalog = items.filter(
    (item) =>
      item.category === "vinyl" && matchedArtists.includes(item.subtitle),
  );

  const searchResults = [
    ...exactMatches,
    ...fuzzyMatches,
    ...completeArtistCatalog,
  ];

  return searchResults.filter(
    (item, index, arr) =>
      index ===
      arr.findIndex(
        (other) => other.id === item.id && other.category === item.category,
      ),
  );
};
