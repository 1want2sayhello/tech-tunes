import { describe, it, expect } from "vitest";
import mapToCart from "./CartMapper";

describe("mapToCart", () => {
  it("returns null when given a falsy product", () => {
    const results = mapToCart(null);
    expect(results).toBe(null);
  });

  it("maps a vinyl product's artist to meta type", () => {
    const vinyl = {
      id: 1,
      slug: "blurryface",
      price: 24.99,
      title: "blurryface",
      artist: "twenty one pilots",
    };
    const result = mapToCart(vinyl);
    expect(result.meta).toBe("twenty one pilots");
  });

  it("maps a full vinyl correctly ", () => {
    const vinyl = {
      id: 1,
      slug: "blurryface",
      price: 24.99,
      title: "blurryface",
      image: undefined,
      selectedSize: null,
      description: "iconic mid-2010's alt album",
      artist: "twenty one pilots",
    };
    const result = mapToCart(vinyl);

    expect(result).toEqual({
      id: 1,
      slug: "blurryface",
      price: 24.99,
      title: "blurryface",
      image: undefined,
      selectedSize: null,
      description: "iconic mid-2010's alt album",
      meta: "twenty one pilots",
    });
  });

  it("maps a full merch item correctly ", () => {
    const merchItem = {
      id: 1,
      slug: "jacket",
      price: 24.99,
      name: "jacket",
      image: undefined,
      selectedSize: "M",
      description: "tech tunes style jacket",
      type: "jacket/hoodie",
    };

    const result = mapToCart(merchItem);

    expect(result).toEqual({
      id: 1,
      slug: "jacket",
      price: 24.99,
      title: "jacket",
      image: undefined,
      selectedSize: "M",
      description: "tech tunes style jacket",
      meta: "jacket/hoodie",
    });
  });

  it("maps a full tech item correctly ", () => {
    const techItem = {
      id: 1,
      slug: "ipod",
      price: 14.99,
      name: "ipod",
      image: undefined,
      selectedSize: null,
      description: "revolutionary handheld music device",
      type: "electronic",
    };

    const result = mapToCart(techItem);

    expect(result).toEqual({
      id: 1,
      slug: "ipod",
      price: 14.99,
      title: "ipod",
      image: undefined,
      selectedSize: null,
      description: "revolutionary handheld music device",
      meta: "electronic",
    });
  });
});
