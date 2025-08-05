import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Dữ liệu giả, sau này sẽ được thay thế bằng API call
const products = [
  { id: 1, name: "Sản phẩm A", price: 500000, stock: 100, category: "Danh mục 1" },
  { id: 2, name: "Sản phẩm B", price: 750000, stock: 50, category: "Danh mục 2" },
];

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Quản lý Sản phẩm</h1>
        <Button asChild>
          <Link href="/admin/products/new">Thêm sản phẩm mới</Link>
        </Button>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tên sản phẩm</TableHead>
              <TableHead>Giá</TableHead>
              <TableHead>Tồn kho</TableHead>
              <TableHead>Danh mục</TableHead>
              <TableHead>Hành động</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price.toLocaleString('vi-VN')}đ</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">Sửa</Button>
                  <Button variant="destructive" size="sm">Xóa</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}