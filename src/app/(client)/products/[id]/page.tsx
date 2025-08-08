// src/app/(client)/products/[id]/page.tsx

import { getProductById, getProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import AddToCartButton from './_components/AddToCartButton';

// Metadata động cho SEO
export async function generateMetadata({ params }: { params: { id: string } }) {
  const product: Product | null = await getProductById(params.id);
  if (!product) {
    return { title: 'Không tìm thấy sản phẩm' };
  }
  return {
    title: product.productName,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
  // API thật sẽ được gọi ở đây khi nó sẵn sàng
  // const product: Product | null = await getProductById(params.id);

  // --- DÙNG TẠM DỮ LIỆU MOCK ĐỂ TEST GIAO DIỆN ---
  // Khi API thật hoạt động, bạn hãy xóa phần này và bỏ comment phần trên
  const { products } = await getProducts();
  const product = products.find((p: Product) => p.productId === params.id);
  // --- KẾT THÚC PHẦN DÙNG TẠM ---
  
  if (!product) {
    notFound();
  }

  const mainImage = product.image && product.image.length > 0 ? product.image[0] : '/placeholder.svg';

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <div className="aspect-square relative w-full rounded-lg overflow-hidden shadow-lg">
            <Image
            src={mainImage}
            alt={product.productName}
            fill
            className="object-cover"
            />
        </div>
        {/* Gallery ảnh nhỏ có thể thêm ở đây nếu product.image có nhiều ảnh */}
      </div>
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.productName}</h1>
        <p className="text-lg text-muted-foreground mb-4">Hãng sản xuất: {product.manufacturer}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold text-primary">{formatCurrency(product.retailPrice)}</span>
          <span className={`ml-4 text-sm font-semibold ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stockQuantity > 0 ? `Còn hàng (${product.stockQuantity})` : 'Hết hàng'}
          </span>
        </div>
        <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
        
        {/* Truyền vào product đã được ánh xạ để phù hợp với CartContext */}
        <AddToCartButton product={product} />

      </div>
    </div>
  );
}