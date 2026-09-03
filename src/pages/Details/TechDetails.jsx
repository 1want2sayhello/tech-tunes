import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { techService } from "../../services/createProductService";
import mapTech from "../../utils/mappers/products/TechMapper";
import Skeleton from "../../components/Layout/DetailsLayout/ProductDetails/skeleton/Skeleton";
import ProductDetailsLayout from "../../components/Layout/DetailsLayout/ProductDetails/ProductDetailsLayout";

const TechDetails = () => {
  const { slug } = useParams();

  const {
    data: tech,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tech", slug],
    queryFn: () => techService.findBy("slug", slug),
    enabled: !!slug,
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <p> {error.message}</p>;
  if (!tech) {
    return <p> Something's wrong. Tech / Equipment not found. </p>;
  }

  const details = mapTech(tech);

  return (
    <ProductDetailsLayout
      {...details}
      item={tech}
      recentItem={{ ...tech, category: "tech" }}
    />
  );
};

export default TechDetails;
