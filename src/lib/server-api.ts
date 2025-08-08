// src/lib/server-api.ts

import axios from 'axios';
import { cookies } from 'next/headers'; // Import cookies từ next/headers
import { AxiosError } from 'axios';

export const getProducts_server = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;

    const headers: { [key: string]: string } = {
      'Content-Type': 'application/json',
    };

    // Nếu có token, thêm vào header Authorization
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
      { headers }
    );

    if (response.data && response.data.success) {
      return response.data.result;
    }

    return { products: [], pagination: {} };

  } catch (error: unknown) {
    // Xử lý lỗi từ Axios
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      console.error(
        'API Error on server:',
        axiosError.response?.status,
        axiosError.response?.data?.message
      );
    } else {
      console.error('Failed to fetch products on server:', error);
    }

    return { products: [], pagination: {} };
  }
};

