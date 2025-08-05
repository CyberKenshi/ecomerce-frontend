// src/app/(client)/products/[slug]/page.tsx

import { getProductBySlug } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from './_components/AddToCartButton'; // Component con

// Hàm generateMetadata để tạo metadata động cho SEO
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { data: product }: { data: Product | undefined } = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Không tìm thấy sản phẩm' };
  }
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const { data: product }: { data: Product | undefined } = await getProductBySlug(params.slug);

  if (!product) {
    notFound(); // Hiển thị trang 404 nếu không tìm thấy sản phẩm
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <Image
          src={product.imageUrl || '/placeholder.svg'}
          alt={product.name}
          width={600}
          height={600}
          className="w-full rounded-lg shadow-lg"
        />
        {/* Thư viện ảnh chi tiết có thể thêm ở đây */}
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary">{formatCurrency(product.price)}</span>
          <span className="ml-4 text-sm text-muted-foreground">Còn lại: {product.stock} sản phẩm</span>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
        
        <AddToCartButton product={product} />

        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold mb-2">Thông tin thêm:</h3>
          <ul>
            <li><strong>Danh mục:</strong> {product.category}</li>
            {/* Các thông tin khác */}
          </ul>
        </div>
      </div>
    </div>
  );
}