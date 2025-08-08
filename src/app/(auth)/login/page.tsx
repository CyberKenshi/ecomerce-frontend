// src/app/(auth)/login/page.tsx

"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { User } from '@/lib/types'; // Import User type

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });

      if (response.data && response.data.success) {
        // ✅ THAY ĐỔI LOGIC Ở ĐÂY
        // Lấy dữ liệu từ `result` theo cấu trúc mới
        const { token, ...userData } = response.data.result;

        // ---- XỬ LÝ VIỆC THIẾU ROLE ----
        // Vì API không trả về `role`, chúng ta cần tự suy ra nó.
        // Đây là một giải pháp tạm thời. Lý tưởng nhất là backend nên trả về role.
        let userRole: 'admin' | 'customer' = 'customer'; // Mặc định là khách hàng
        if (userData.email === 'admin@gmail.com') { // Ví dụ: nếu email là admin@gmail.com thì là admin
             userRole = 'admin';
        }
        
        // Tạo đối tượng user hoàn chỉnh để lưu vào context
        const userToStore: User = {
            _id: userData._id,
            fullName: userData.fullName,
            email: userData.email,
            role: userRole,
        };

        // Gọi hàm login từ context với dữ liệu đã được xử lý
        auth.login(token, userToStore);
        
        // Chuyển hướng dựa trên vai trò đã suy ra
        if (userToStore.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }

      } else {
        setError(response.data.message || 'Email hoặc mật khẩu không đúng.');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // ... nội dung JSX của form giữ nguyên
    <Card className="w-full max-w-sm">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập email của bạn dưới đây để đăng nhập vào tài khoản của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <Input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập'}
          </Button>
          <div className="mt-4 text-center text-sm">
            Chưa có tài khoản?{" "}
            <Link href="/register" className="underline">
              Đăng ký
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}