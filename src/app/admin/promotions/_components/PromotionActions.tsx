// src/app/admin/promotions/_components/PromotionActions.tsx
// File này có cấu trúc tương tự CategoryActions.tsx, bạn có thể tự tạo form chi tiết hơn.
// Dưới đây là một phiên bản đơn giản.

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Edit, PlusCircle, Trash2 } from "lucide-react";

// Định nghĩa kiểu dữ liệu (bạn có thể import từ lib/types.ts)
interface Promotion {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed' | 'shipping';
  isActive: boolean;
}

interface PromotionActionsProps {
  promotion?: Promotion;
}

export function PromotionActions({ promotion }: PromotionActionsProps) {
  const [open, setOpen] = useState(false);
  const isEditMode = !!promotion;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Lưu thông tin khuyến mãi thành công!");
    setOpen(false);
  };

  const handleDelete = () => {
    if (confirm(`Bạn có chắc muốn xóa mã "${promotion?.code}"?`)) {
        alert(`Đã xóa mã: ${promotion?.code}`);
    }
  };

  if (isEditMode) {
    return (
        <div className="flex items-center gap-2">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader><DialogTitle>Sửa mã khuyến mãi</DialogTitle></DialogHeader>
                    {/* Form chỉnh sửa chi tiết có thể được thêm vào đây */}
                    <p>Form chỉnh sửa cho mã <strong>{promotion.code}</strong>.</p>
                </DialogContent>
            </Dialog>
             <Button variant="ghost" size="icon" className="text-red-500" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button><PlusCircle className="mr-2 h-4 w-4" /> Tạo mã mới</Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader><DialogTitle>Tạo mã khuyến mãi mới</DialogTitle></DialogHeader>
            {/* Form tạo mới chi tiết có thể được thêm vào đây */}
            <p>Form để tạo mã khuyến mãi mới.</p>
        </DialogContent>
    </Dialog>
  )
}