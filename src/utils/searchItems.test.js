import { describe, it, expect } from "vitest";
import { searchItems } from "./searchItems";

const products = [
  {
    id: 1,
    title: "blurryface",
    subtitle: "twenty one pilots",
    category: "vinyl",
    genre: "alt",
    tags: ["alt", "rock", "pop"],
  },

  {
    id: 2,
    title: "Breach",
    subtitle: "twenty one pilots",
    category: "vinyl",
    genre: "alt",
    tags: ["alt", "rock"],
  },

  {
    id: 3,
    title: "AT-LP60X",
    subtitle: "belt-drive turntable",
    category: "tech",
    brand: "Audio Technica",
    type: "turntable",
    tags: ["record player"],
  },
];

describe("searchItems", () => {
  it("returns a product when its title is slightly misspelled - missing letter", () => {
    const results = searchItems(products, "bluryface");

    expect(results.map((product) => product.title)).toContain("blurryface");
  });

  it("returns a product when its title is slightly misspelled - swapped letter, missing letter", () => {
    const results = searchItems(products, "bluryfase");

    expect(results.map((product) => product.title)).toContain("blurryface");
  });

  it("returns an artist's catalog based on fuzzy artist match", () => {
    const results = searchItems(products, "twenty oe pilotes");

    expect(results.map((product) => product.title)).toEqual(
      expect.arrayContaining(["blurryface", "Breach"]),
    );
  });

  it("Does not return whole artist catalog on searching for a fuzzy single album search", () => {
    const results = searchItems(products, "bluryface");

    expect(results.map((product) => product.title)).toEqual(["blurryface"]);
  });

  it("Returns a tech product for a fuzzy brand match", () => {
    const results = searchItems(products, "audio technica");

    expect(results.map((product) => product.title)).toContain("AT-LP60X");
  });
});
