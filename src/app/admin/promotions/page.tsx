// src/app/admin/promotions/page.tsx

import { getPromotions } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PromotionActions } from "./_components/PromotionActions"; // Component này sẽ được tạo sau

export default async function AdminPromotionsPage() {
  const { data: promotions } = await getPromotions();

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Quản lý Khuyến mãi</h1>
          <p className="text-muted-foreground">Tạo và quản lý các mã giảm giá.</p>
        </div>
        <PromotionActions />
      </div>
      <Card>
        <CardContent className="mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mã Code</TableHead>
                <TableHead>Loại</TableHead>
                <TableHead>Giá trị</TableHead>
                <TableHead>Lượt sử dụng</TableHead>
                <TableHead>Trạng thái</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotions.map((promo) => (
                <TableRow key={promo.id}>
                  <TableCell className="font-mono font-medium">{promo.code}</TableCell>
                  <TableCell>{promo.type}</TableCell>
                  <TableCell>
                    {promo.type === 'percentage' ? `${promo.discount}%` : `${promo.discount.toLocaleString('vi-VN')}đ`}
                  </TableCell>
                  <TableCell>{promo.usageCount}</TableCell>
                  <TableCell>
                    <Badge variant={promo.isActive ? 'default' : 'secondary'}>
                      {promo.isActive ? 'Đang hoạt động' : 'Không hoạt động'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <PromotionActions promotion={promo} />
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