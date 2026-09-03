const mapToCart = (product) => {
  if (!product) return null;

  return {
    id: product.id,
    slug: product.slug,
    title: product.title || product.name,
    description: product.description,
    price: product.price,
    image: product.image,
    selectedSize: product.selectedSize || null,
    meta: product.artist || product.type,
  };
};

export default mapToCart;
