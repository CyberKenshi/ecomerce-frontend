import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Mock API functions (để phát triển UI mà không cần backend)
// Sau này sẽ thay thế bằng các lệnh gọi API thật
export const getProducts = async () => {
  // return await api.get('/products');
  console.log('Fetching products...');
  return { data: mockProducts }; // Trả về dữ liệu giả
};

export const getProductBySlug = async (slug: string) => {
  // return await api.get(`/products/${slug}`);
  console.log(`Fetching product with slug: ${slug}`);
  return { data: mockProducts.find(p => p.slug === slug) };
};


// --- Thêm mock data và hàm mới ---
const mockProducts = [
  { id: '1', name: 'Áo thun Cotton 100%', slug: 'ao-thun-cotton-100', description: 'Áo thun làm từ cotton tự nhiên, thoáng mát và mềm mại.', price: 250000, stock: 150, category: 'Thời trang nam', imageUrl: '/placeholder.svg' },
  { id: '2', name: 'Quần Jeans Slim-fit', slug: 'quan-jeans-slim-fit', description: 'Quần jeans co giãn, form dáng slim-fit tôn dáng người mặc.', price: 550000, stock: 80, category: 'Thời trang nam', imageUrl: '/placeholder.svg' },
  // ...
];

const mockOrders = [
  { id: 'ORD001', user: { id: 1, name: 'Nguyễn Văn A' }, total: 800000, status: 'delivered', createdAt: new Date('2025-07-20') },
  { id: 'ORD002', user: { id: 2, name: 'Trần Thị B' }, total: 550000, status: 'shipped', createdAt: new Date('2025-07-22') },
  { id: 'ORD003', user: { id: 3, name: 'Lê Văn C' }, total: 250000, status: 'pending', createdAt: new Date('2025-07-24') },
  { id: 'ORD004', user: { id: 1, name: 'Nguyễn Văn A' }, total: 1100000, status: 'cancelled', createdAt: new Date('2025-07-15') },
];


export const getProductById = async (id: string) => {
  // return await api.get(`/products/details/${id}`);
  console.log(`Fetching product with id: ${id}`);
  return mockProducts.find(p => p.id === id);
};

export const getOrders = async () => {
  // return await api.get('/orders');
  console.log('Fetching all orders...');
  return { data: mockOrders };
};

export const getOrderById = async (id: string) => {
  // return await api.get(`/orders/${id}`);
  const order = mockOrders.find(o => o.id === id);
  if (!order) return null;
  // Giả lập chi tiết đơn hàng
  return {
    ...order,
    customerInfo: { name: order.user.name, email: 'customer@example.com', phone: '0987654321', address: '123 Đường ABC, Quận 1, TP.HCM' },
    items: [mockProducts[0], mockProducts[1]].map(p => ({...p, quantity: 1})),
  };
};

const mockCategories = [
  { id: 'cat1', name: 'Thời trang nam', productCount: 25 },
  { id: 'cat2', name: 'Thời trang nữ', productCount: 42 },
  { id: 'cat3', name: 'Thiết bị điện tử', productCount: 18 },
  { id: 'cat4', name: 'Đồ gia dụng', productCount: 33 },
];

const mockUsers = [
  { id: 'user1', name: 'Nguyễn Văn A', email: 'vana@example.com', role: 'customer', joinedAt: new Date('2024-01-15') },
  { id: 'user2', name: 'Trần Thị B', email: 'thib@example.com', role: 'customer', joinedAt: new Date('2024-03-22') },
  { id: 'user3', name: 'Admin E-Store', email: 'admin@example.com', role: 'admin', joinedAt: new Date('2024-01-01') },
];

const mockPromotions = [
  { id: 'promo1', code: 'SUMMER20', discount: 20, type: 'percentage', isActive: true, usageCount: 150 },
  { id: 'promo2', code: 'FREESHIP', discount: 100, type: 'shipping', isActive: true, usageCount: 450 },
  { id: 'promo3', code: 'WELCOME50K', discount: 50000, type: 'fixed', isActive: false, usageCount: 200 },
];

const mockCmsContent = {
  about: '<h1>Về Chúng Tôi</h1><p>E-Store là nền tảng thương mại điện tử hàng đầu, mang đến trải nghiệm mua sắm tuyệt vời...</p>',
  contact: '<h2>Thông tin liên hệ</h2><p>Địa chỉ: 123 Đường ABC, Quận 1, TP.HCM</p><p>Email: support@estore.com</p>',
};


// --- Thêm các hàm API mới ---

export const getCategories = async () => {
  console.log('Fetching all categories...');
  return { data: mockCategories };
};

export const getUsers = async () => {
  console.log('Fetching all users...');
  return { data: mockUsers };
};

export const getPromotions = async () => {
  console.log('Fetching all promotions...');
  return { data: mockPromotions };
};

export const getCmsContent = async () => {
  console.log('Fetching CMS content...');
  return { data: mockCmsContent };
};
export default api;