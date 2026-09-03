import Fuse from "fuse.js";

export const createFuse = (items) => {
  return new Fuse(items, {
    includeMatches: true,
    includeScore: true,
    threshold: 0.4,
    distance: 80,
    ignoreLocation: true,
    minMatchCharLength: 3,

    keys: [
      { name: "title", weight: 0.5 },
      { name: "subtitle", weight: 0.55 },
      { name: "brand", weight: 0.25 },
      { name: "genre", weight: 0.15 },
      { name: "type", weight: 0.15 },
      { name: "tags", weight: 0.1 },
    ],
  });
};
