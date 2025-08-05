// src/app/admin/orders/page.tsx

import { getOrders } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const statusVariantMap: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  pending: "default",    // Vàng
  shipped: "secondary",  // Xanh
  delivered: "outline",  // Xanh lá
  cancelled: "destructive" // Đỏ
};

export default async function AdminOrdersPage() {
  const { data: orders } = await getOrders();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Đơn hàng</h1>
      <Card>
        <CardHeader>
          <CardTitle>Tất cả đơn hàng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã đơn hàng</TableHead>
                <TableHead>Khách hàng</TableHead>
                <TableHead>Ngày đặt</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Tổng tiền</TableHead>
                <TableHead>Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell>
                    <Badge variant={statusVariantMap[order.status] || 'default'}>{order.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{formatCurrency(order.total)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/orders/${order.id}`}>Xem chi tiết</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}