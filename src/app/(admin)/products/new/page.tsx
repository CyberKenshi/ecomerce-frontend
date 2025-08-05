// src/app/admin/products/new/page.tsx

import { ProductForm } from "../_components/ProductForm";

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Thêm sản phẩm mới</h1>
      <ProductForm initialData={null} />
    </div>
  );
}