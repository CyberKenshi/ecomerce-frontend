// src/lib/types.ts

// Định nghĩa cho một sản phẩm
export interface Product {
  productId: string;
  productName: string;
  barcode: string;
  categoryId: string;
  importPrice: number;
  retailPrice: number;
  manufacturer: string;
  description: string;
  image: string[]; 
  stockQuantity: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Định nghĩa cho một item trong giỏ hàng (ánh xạ từ Product)
export interface CartItem {
  id: string;         
  name: string;       
  price: number;      
  imageUrl: string;   
  quantity: number;
  stock: number;      
}


// Định nghĩa cho người dùng
export interface User {
  _id: string;       
  fullName: string; 
  email: string;
  role?: 'admin' | 'customer';
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