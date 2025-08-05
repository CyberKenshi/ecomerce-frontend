// src/app/admin/orders/[id]/_components/UpdateOrderStatus.tsx

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/lib/types";

interface UpdateOrderStatusProps {
  orderId: string | number;
  currentStatus: Order['status'];
}

export function UpdateOrderStatus({ orderId, currentStatus }: UpdateOrderStatusProps) {
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = async () => {
    setIsLoading(true);
    // --- LOGIC GỌI API CẬP NHẬT TRẠNG THÁI SẼ Ở ĐÂY ---
    // await api.patch(`/orders/${orderId}/status`, { status });
    console.log(`Updating order ${orderId} status to ${status}`);
    
    // Giả lập độ trễ mạng
    await new Promise(resolve => setTimeout(resolve, 1000));

    alert(`Cập nhật trạng thái đơn hàng #${orderId} thành công!`);
    setIsLoading(false);
  };

  return (
    <div className="space-y-4">
      <Select value={status} onValueChange={(value) => setStatus(value as Order['status'])}>
        <SelectTrigger>
          <SelectValue placeholder="Chọn trạng thái" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Đang chờ xử lý</SelectItem>
          <SelectItem value="processing">Đang xử lý</SelectItem>
          <SelectItem value="shipped">Đã giao hàng</SelectItem>
          <SelectItem value="delivered">Đã nhận hàng</SelectItem>
          <SelectItem value="cancelled">Đã hủy</SelectItem>
        </SelectContent>
      </Select>
      <Button onClick={handleUpdate} disabled={isLoading || status === currentStatus} className="w-full">
        {isLoading ? "Đang cập nhật..." : "Lưu thay đổi"}
      </Button>
    </div>
  );
}