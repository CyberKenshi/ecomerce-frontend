// src/components/client/AddToCartButton.tsx

"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/lib/types";
import { ShoppingCart } from "lucide-react";

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { dispatch } = useCart();

  return (
    <Button size="lg" onClick={() => dispatch({ type: 'ADD_ITEM', payload: { ...product, quantity: 1 } })} disabled={product.stock <= 0}>
      <ShoppingCart className="mr-2 h-5 w-5" />
      {product.stock > 0 ? "Thêm vào giỏ hàng" : "Hết hàng"}
    </Button>
  );
}