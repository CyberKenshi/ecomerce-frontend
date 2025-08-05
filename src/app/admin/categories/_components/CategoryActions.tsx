// src/app/admin/categories/_components/CategoryActions.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, PlusCircle, Trash2 } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho danh mục, có thể import từ lib/types.ts
interface Category {
  id: string;
  name: string;
  productCount: number;
}

interface CategoryActionsProps {
  category?: Category; // Prop này là optional
}

export function CategoryActions({ category }: CategoryActionsProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category?.name || "");

  // Kiểm tra xem đây là chế độ sửa hay thêm mới
  const isEditMode = !!category;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // --- LOGIC GỌI API THÊM/SỬA SẼ Ở ĐÂY ---
    if (isEditMode) {
      // Logic gọi API để cập nhật danh mục
      console.log(`Editing category ${category.id} with new name: ${name}`);
      alert(`Đã cập nhật danh mục: ${name}`);
    } else {
      // Logic gọi API để tạo danh mục mới
      console.log(`Adding new category: ${name}`);
      alert(`Đã thêm danh mục mới: ${name}`);
    }
    setOpen(false); // Đóng dialog sau khi submit
    // Bạn nên gọi router.refresh() ở đây để làm mới dữ liệu trên trang
  };

  const handleDelete = () => {
    if (confirm(`Bạn có chắc muốn xóa danh mục "${category?.name}"? Hành động này không thể hoàn tác.`)) {
        // --- LOGIC GỌI API XÓA SẼ Ở ĐÂY ---
        console.log(`Deleting category ${category?.id}`);
        alert(`Đã xóa danh mục: ${category?.name}`);
        // Bạn nên gọi router.refresh() ở đây để làm mới dữ liệu
    }
  };


  // Nếu là chế độ Sửa/Xóa (prop `category` tồn tại)
  if (isEditMode) {
    return (
      <div className="flex items-center gap-2 justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Chỉnh sửa danh mục</DialogTitle>
                <DialogDescription>
                  Thay đổi tên của danh mục. Nhấn Lưu thay đổi khi bạn hoàn tất.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Tên</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" required />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Lưu thay đổi</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  // Nếu là chế độ Thêm mới (không có prop `category`)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Thêm danh mục mới
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Thêm danh mục mới</DialogTitle>
            <DialogDescription>
              Điền tên cho danh mục mới và nhấn Lưu để tạo.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name-new" className="text-right">Tên</Label>
              <Input id="name-new" value={name} onChange={(e) => setName(e.target.value)} className="col-span-3" placeholder="Ví dụ: Đồ gia dụng" required />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Lưu</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}