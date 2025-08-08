// src/components/client/Header.tsx

"use client";

import Link from 'next/link';
import { ShoppingCart, User, Search, LogOut } from 'lucide-react'; // Thêm icon LogOut
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext'; // 1. Import hook useAuth
import { useRouter } from 'next/navigation'; // Import useRouter để điều hướng

export default function Header() {
  const { totalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  // 3. Tạo hàm xử lý đăng xuất
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <ShoppingCart className="h-6 w-6" />
            <span className="font-bold">E-Store</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/#">Sản phẩm</Link>
            <Link href="/#">Giới thiệu</Link>
            <Link href="/#">Liên hệ</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4"> {/* Tăng khoảng cách một chút */}
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>

          {/* 4. Render giao diện có điều kiện */}
          {isAuthenticated ? (
            // Nếu đã đăng nhập
            <>
              <Button variant="ghost" asChild>
                <Link href="/account">Chào, {user?.fullName}</Link>
              </Button>
              <Button variant="ghost" size="icon" onClick={handleLogout} title="Đăng xuất">
                <LogOut className="h-5 w-5" />
              </Button>
            </>
          ) : (
            // Nếu chưa đăng nhập
            <Button variant="ghost" size="icon" asChild title="Đăng nhập">
              <Link href="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}