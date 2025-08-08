// src/app/(client)/products/[id]/_components/AddToCartButton.tsx

"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { Product, CartItem } from '@/lib/types'; // Import cả Product và CartItem
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    if (product.stockQuantity < 1) {
      alert("Sản phẩm đã hết hàng!");
      return;
    }

    // Ánh xạ từ Product (API) sang CartItem (Context)
    const itemToAdd: CartItem = {
      id: product.productId,
      name: product.productName,
      price: product.retailPrice,
      imageUrl: product.image && product.image.length > 0 ? product.image[0] : '/placeholder.svg',
      stock: product.stockQuantity,
      quantity: quantity,
    };

    dispatch({
      type: 'ADD_ITEM',
      payload: itemToAdd,
    });
    // Có thể thêm thông báo toast ở đây
    alert(`${quantity} ${product.name} đã được thêm vào giỏ hàng!`);
  };

  const increaseQuantity = () => {
    if (quantity < product.stockQuantity) {
      setQuantity(q => q + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center border rounded-md">
        <Button variant="ghost" size="icon" onClick={decreaseQuantity}>
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          value={quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value) || 1;
            setQuantity(Math.min(Math.max(1, val), product.stockQuantity));
          }}
          className="w-16 text-center border-0 focus-visible:ring-0"
          disabled={product.stockQuantity < 1}
        />
        <Button variant="ghost" size="icon" onClick={increaseQuantity}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button onClick={handleAddToCart} size="lg" disabled={product.stockQuantity < 1}>
        <ShoppingCart className="h-5 w-5 mr-2" />
        {product.stockQuantity > 0 ? 'Thêm vào giỏ' : 'Hết hàng'}
      </Button>
    </div>
  );
}