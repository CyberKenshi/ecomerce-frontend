import { getProducts } from '@/lib/api';
import { Product } from '@/lib/types';
import ProductCard from '@/components/client/ProductCard';

export default async function HomePage() {
  const { data: products }: { data: Product[] } = await getProducts();

  return (
    <div className="space-y-8">
      <section className="text-center">
        <h1 className="text-4xl font-bold">Chào mừng đến với Cửa hàng</h1>
        <p className="text-muted-foreground mt-2">Nơi mua sắm tốt nhất cho bạn.</p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Sản phẩm mới</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}