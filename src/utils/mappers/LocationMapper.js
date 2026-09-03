const formatAddress = (address) => {
  if (!address) return "";
  return `${address.street}, ${address.city}, ${address.state} ${address.zip}`;
};

const mapLocationDetails = (location) => {
  return {
    heading: location.name,
    subheading: formatAddress(location.address),
    image: location.images?.thumbnail || "",
    description: location.description,
    contact: location.contact,
    hours: location.hours,
    coordinates: location.coordinates,
  };
};

export default mapLocationDetails;
