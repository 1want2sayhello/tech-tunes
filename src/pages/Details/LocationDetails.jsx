import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchLocationBySlug } from "../../services/locationService";
import mapLocationDetails from "../../utils/mappers/LocationMapper";
import LocationDetailsLayout from "../../components/Layout/DetailsLayout/LocationsDetails/LocationsDetailsLayout";

const LocationDetails = () => {
  const { slug } = useParams();

  const {
    data: location,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["location", "slug", slug],
    queryFn: () => fetchLocationBySlug(slug),
    enabled: !!slug,
  });

  if (isLoading) return <p> Loading locations...</p>;
  if (isError) return <p> {error.message}</p>;
  if (!location) {
    return <p> Something's wrong. Location not found. </p>;
  }

  const details = mapLocationDetails(location);

  return <LocationDetailsLayout {...details} />;
};

export default LocationDetails;
