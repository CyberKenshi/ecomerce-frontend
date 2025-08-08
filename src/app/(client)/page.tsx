// src/app/(client)/page.tsx

import { getProducts_server } from '@/lib/server-api'; // ✅ THAY ĐỔI IMPORT
import { Product } from '@/lib/types';
import ProductCard from '@/components/client/ProductCard';

export default async function HomePage() {
  const { products }: { products: Product[] } = await getProducts_server();

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Chào mừng đến với E-Store</h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          Nơi mua sắm các sản phẩm công nghệ hiện đại và chất lượng.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Sản phẩm nổi bật</h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-10">Không tìm thấy sản phẩm nào.</p>
        )}
      </section>
    </div>
  );
}