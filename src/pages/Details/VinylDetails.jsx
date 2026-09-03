import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { vinylService } from "../../services/createProductService";
import mapVinyl from "../../utils/mappers/products/VinylMapper";

import Skeleton from "../../components/Layout/DetailsLayout/ProductDetails/skeleton/Skeleton";
import ProductDetailsLayout from "../../components/Layout/DetailsLayout/ProductDetails/ProductDetailsLayout";

const VinylDetails = () => {
  const { slug } = useParams();

  const {
    data: vinyl,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vinyl", "slug", slug],
    queryFn: () => vinylService.findBy("slug", slug),
    enabled: !!slug,
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <p> {error.message}</p>;
  if (!vinyl) {
    return <p> Something's wrong. Vinyl not found. </p>;
  }

  const details = mapVinyl(vinyl);

  return (
    <ProductDetailsLayout
      {...details}
      item={vinyl}
      recentItem={{ ...vinyl, category: "vinyl" }}
    />
  );
};

export default VinylDetails;
