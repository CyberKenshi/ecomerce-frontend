// src/app/(client)/page.tsx
import ProductSection from './products/_components/ProductSection';

export default async function HomePage() {
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
        <ProductSection />
      </section>
    </div>
  );
}