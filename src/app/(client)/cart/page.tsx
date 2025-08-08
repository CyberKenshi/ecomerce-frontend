// src/app/(client)/cart/page.tsx

"use client";

import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2 } from 'lucide-react';

export default function CartPage() {
  const { items, dispatch, totalItems, totalPrice } = useCart();

  const updateQuantity = (id: string | number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string | number) => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Button asChild>
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your cart ({totalItems} items)</h1>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <Image src={item.imageUrl} alt={item.name} width={100} height={100} className="rounded-md" />
              <div className="flex-grow">
                <h2 className="font-semibold">{item.name}</h2>
                <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
              </div>
              <div className="flex items-center gap-2 border rounded-md p-1">
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                  <Minus className="h-4 w-4" />
                </Button>
                <Input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                  className="w-12 text-center border-0 focus-visible:ring-0"
                />
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="font-semibold w-24 text-right">{formatCurrency(item.price * item.quantity)}</p>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                <Trash2 className="h-5 w-5 text-red-500" />
              </Button>
            </div>
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="p-6 bg-muted rounded-lg space-y-4">
            <h2 className="text-xl font-semibold">Order summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t my-2"></div>
            <div className="flex justify-between font-bold text-lg">
              <span>Tổng cộng</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout">Proceed to checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}