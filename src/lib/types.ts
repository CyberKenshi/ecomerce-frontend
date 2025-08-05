// src/lib/types.ts

// Định nghĩa cho một sản phẩm
export interface Product {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  images?: string[]; // Danh sách ảnh chi tiết
  stock: number;
  category: string; // Hoặc có thể là một interface Category
  ratings?: {
    average: number;
    count: number;
  };
}

// Định nghĩa cho một item trong giỏ hàng
export interface CartItem extends Product {
  quantity: number;
}

// Định nghĩa cho người dùng
export interface User {
  id: string | number;
  name: string;
  email: string;
  address?: {
    street: string;
    city: string;
    zipCode: string;
  };
}

// Định nghĩa cho đơn hàng
export interface Order {
  id: string | number;
  user: User;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
}