"use client"
import ProductCard from "@/components/client/ProductCard";
import { FC, useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { Product } from "@/lib/types";

const ProductSection: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(({ products }) => {
      setProducts(products);
    });
  }, [])
  return products && products.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product) => (
        <ProductCard key={product.productId} product={product} />
      ))}
    </div>
  ) : (
    <p className="text-center text-muted-foreground py-10">Không tìm thấy sản phẩm nào.</p>
  )
}

export default ProductSection;
