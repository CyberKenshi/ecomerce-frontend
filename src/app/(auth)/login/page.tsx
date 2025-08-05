// src/app/(auth)/login/page.tsx

"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // --- LOGIC GỌI API ĐĂNG NHẬP SẼ Ở ĐÂY ---
    // Ví dụ:
    // try {
    //   const response = await api.post('/auth/login', { email, password });
    //   const { user, token } = response.data;
    //   // Lưu token, thông tin user vào context/localStorage
    //   if (user.role === 'admin') {
    //     router.push('/admin/dashboard');
    //   } else {
    //     router.push('/account');
    //   }
    // } catch (err) {
    //   setError('Email hoặc mật khẩu không đúng.');
    // }

    // Logic giả để demo
    if (email === "admin@example.com" && password === "admin") {
        router.push('/admin/dashboard');
    } else if (email === "user@example.com" && password === "user") {
        router.push('/');
    } else {
        setError('Email hoặc mật khẩu không đúng.');
    }
  };

  return (
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
          <Button type="submit" className="w-full">Đăng nhập</Button>
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