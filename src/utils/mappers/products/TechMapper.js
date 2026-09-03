const mapTechDetails = (tech) => {
  return {
    heading: tech.name,
    subheading: tech.brand,
    image: tech.image,
    description: tech.description,
    rating: tech.rating,
    meta: [
      { label: "type", value: tech.type },
      { label: "Price", value: `$${tech.price}` },
    ],
  };
};

export default mapTechDetails;
