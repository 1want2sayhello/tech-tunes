const mapMerchDetails = (merch) => {
  return {
    heading: merch.name,
    subheading: merch.type,
    image: merch.image,
    description: merch.description,
    rating: merch.rating,
    meta: [
      { label: "Color", value: merch.color },
      { label: "Price", value: `$${merch.price}` },
    ],
  };
};

export default mapMerchDetails;
