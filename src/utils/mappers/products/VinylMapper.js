const mapVinyl = (vinyl) => {
  return {
    heading: vinyl.title,
    subheading: vinyl.artist,
    image: vinyl.image,
    description: vinyl.description,
    rating: vinyl.rating,
    meta: [
      { label: "Variant", value: vinyl.variant },
      { label: "Price", value: `$${vinyl.price}` },
    ],
  };
};

export default mapVinyl;
