// src/app/(client)/checkout/page.tsx

"use client";

import { useEffect, useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { items, totalPrice, dispatch } = useCart();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
  });

  // Chuyển hướng nếu giỏ hàng trống
  useEffect(() => {
    if (items.length === 0) {
      router.replace('/cart');
    }
  }, [items, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // --- LOGIC GỌI API TẠO ĐƠN HÀNG SẼ Ở ĐÂY ---
    const orderData = {
      customerInfo: formData,
      items: items,
      total: totalPrice,
    };
    console.log('Placing order:', orderData);

    // Logic giả để demo
    alert('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
    dispatch({ type: 'CLEAR_CART' });
    router.push('/account/orders'); // Chuyển đến trang lịch sử đơn hàng
  };
  
  if (items.length === 0) {
    return null; // Hoặc một component loading
  }

  return (
    <form onSubmit={handlePlaceOrder}>
      <h1 className="text-3xl font-bold mb-6">Thanh toán</h1>
      <div className="grid lg:grid-cols-5 gap-12">
        {/* Cột thông tin khách hàng */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin giao hàng</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Họ và tên</Label>
                <Input id="name" required value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required value={formData.email} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Số điện thoại</Label>
                  <Input id="phone" required value={formData.phone} onChange={handleInputChange} />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Địa chỉ</Label>
                <Input id="address" required value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="city">Thành phố</Label>
                  <Input id="city" required value={formData.city} onChange={handleInputChange} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="zipCode">Mã bưu điện</Label>
                  <Input id="zipCode" required value={formData.zipCode} onChange={handleInputChange} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cột tóm tắt đơn hàng */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Đơn hàng của bạn</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded" />
                      <div>
                        <p>{item.name}</p>
                        <p className="text-muted-foreground">x {item.quantity}</p>
                      </div>
                    </div>
                    <p>{formatCurrency(item.price * item.quantity)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <p>Tạm tính</p>
                  <p>{formatCurrency(totalPrice)}</p>
                </div>
                <div className="flex justify-between text-sm">
                  <p>Phí vận chuyển</p>
                  <p>Miễn phí</p>
                </div>
                <div className="border-t my-2"></div>
                <div className="flex justify-between font-bold text-lg">
                  <p>Tổng cộng</p>
                  <p>{formatCurrency(totalPrice)}</p>
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">Đặt hàng</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}