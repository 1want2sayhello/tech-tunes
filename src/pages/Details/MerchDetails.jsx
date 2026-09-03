import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { merchService } from "../../services/createProductService";
import mapMerch from "../../utils/mappers/products/MerchMapper";
import Skeleton from "../../components/Layout/DetailsLayout/ProductDetails/skeleton/Skeleton";
import ProductDetailsLayout from "../../components/Layout/DetailsLayout/ProductDetails/ProductDetailsLayout";

const MerchDetails = () => {
  const { slug } = useParams();

  const {
    data: merch,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["merch", slug],
    queryFn: () => merchService.findBy("slug", slug),
    enabled: !!slug,
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <p> {error.message}</p>;
  if (!merch) {
    return <p> Something's wrong. Merchandise not found. </p>;
  }

  const details = mapMerch(merch);

  return (
    <ProductDetailsLayout
      {...details}
      item={merch}
      recentItem={{ ...merch, category: "merch" }}
    />
  );
};

export default MerchDetails;
