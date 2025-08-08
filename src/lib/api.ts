
import axios from 'axios';
import type { Product, ApprovalRequest, ApprovalStatus, Customer } from './types';

// Tạo instance axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// ✅ THÊM INTERCEPTOR VÀO ĐÂY
api.interceptors.request.use(
  (config) => {
    // Guard for browser-only APIs when running in SSR
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);


export const getProducts = async (): Promise<{ products: Product[]; pagination: any }> => {
  try {
    const response = await api.get('/api/products');
    if (response.data && response.data.success) {
      return response.data.result as { products: Product[]; pagination: any };
    }
    return { products: [], pagination: {} };
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return { products: [], pagination: {} };
  }
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

// Note: The backend endpoint GET /api/products/:productId is protected.
// For public product detail pages and SSR compatibility, fetch the list and find the item.
export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const { products } = await getProducts();
    const product = products.find((p) => p.productId === id) || null;
    return product;
  } catch (error) {
    console.error('Failed to fetch product by id:', error);
    return null;
  }
};

// Create product (Admin): POST /api/products with multipart/form-data
export interface CreateProductInput {
  productName: string;
  retailPrice: number;
  categoryId: string;
  manufacturer: string;
  description?: string;
  stockQuantity: number;
  importPrice?: number; // optional for admin UI
  images: File[] | FileList;
}

export const createProduct = async (payload: CreateProductInput): Promise<Product> => {
  const formData = new FormData();
  formData.append('productName', payload.productName);
  if (typeof payload.importPrice === 'number') {
    formData.append('importPrice', String(payload.importPrice));
  }
  formData.append('retailPrice', String(payload.retailPrice));
  formData.append('categoryId', payload.categoryId);
  formData.append('manufacturer', payload.manufacturer);
  if (payload.description) formData.append('description', payload.description);
  formData.append('stockQuantity', String(payload.stockQuantity));

  const files = Array.isArray(payload.images)
    ? payload.images
    : Array.from(payload.images as FileList);
  files.forEach((file) => formData.append('images', file));

  const response = await api.post('/api/products', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  if (!response.data?.success) throw new Error('Create product failed');
  return response.data.result as Product;
};

// Approval Requests (Admin)
export const getApprovalRequests = async (): Promise<ApprovalRequest[]> => {
  const res = await api.get('/api/approval');
  return res.data as ApprovalRequest[];
};

export const updateApprovalRequest = async (
  requestId: string,
  data: { status: Exclude<ApprovalStatus, 'pending'>; adminComments?: string }
): Promise<ApprovalRequest> => {
  const res = await api.put(`/api/approval/${requestId}`, data);
  return res.data?.approvalRequest as ApprovalRequest;
};

// Orders (Admin)
export const createOrder = async (phoneNumber: string) => {
  const res = await api.post('/api/orders', { phoneNumber });
  return res.data?.result;
};

export const addProductToOrder = async (
  orderId: string,
  payload: { productName?: string; barcode?: string; quantity: number }
) => {
  const res = await api.post(`/api/orders/add-product/${orderId}`, payload);
  return res.data?.result as { order: any; products: Array<any> };
};

export const checkoutOrder = async (orderId: string) => {
  const res = await api.post(`/api/orders/checkout/${orderId}`);
  return res.data?.result;
};

export const getProductItems = async (productId: string) => {
  const res = await api.get(`/api/products/items/${productId}`);
  return res.data?.result as Array<any>;
};

export const getOrdersByPhone = async (phoneNumber: string) => {
  const res = await api.get(`/api/orders`, { params: { phoneNumber } });
  if (!res.data?.success) return [] as any[];
  return res.data.result as any[];
};

export const getAllOrders = async () => {
  const res = await api.get('/api/orders');
  return { data: res.data } as any;
};

// Customers (Admin CRUD)
export const getCustomers = async (): Promise<Customer[]> => {
  const res = await api.get('/api/customers');
  if (!res.data?.success) return [];
  return res.data.result as Customer[];
};

export const getCustomerById = async (customerId: string): Promise<Customer | null> => {
  const res = await api.get(`/api/customers/id/${customerId}`);
  if (!res.data?.success) return null;
  return res.data.result as Customer;
};

export const createCustomer = async (payload: {
  customerName: string;
  phoneNumber: string;
  address: string;
  email: string;
}): Promise<Customer> => {
  const res = await api.post('/api/customers', payload);
  if (!res.data?.success) throw new Error(res.data?.message || 'Failed to create customer');
  return res.data.result as Customer;
};

export const updateCustomer = async (
  customerId: string,
  payload: { customerName: string; phoneNumber: string; address: string; email: string }
): Promise<Customer> => {
  const res = await api.patch(`/api/customers/${customerId}`, payload);
  if (!res.data?.success) throw new Error(res.data?.message || 'Failed to update customer');
  return res.data.result as Customer;
};

export const deleteCustomer = async (customerId: string): Promise<void> => {
  const res = await api.delete(`/api/customers/${customerId}`);
  if (!res.data?.success) throw new Error(res.data?.message || 'Failed to delete customer');
};

export const getCategories = async () => {
  console.log('Fetching all categories...');
  return { data: mockCategories };
};

export const getUsers = async () => {
  console.log('Fetching all users...');
  return { data: mockUsers };
};

export const getCmsContent = async () => {
  console.log('Fetching CMS content...');
  return { data: mockCmsContent };
};
export default api;