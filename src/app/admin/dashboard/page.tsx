import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Users, ShoppingBag, BarChart } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Tổng quan</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng doanh thu</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234,567,000đ</div>
            <p className="text-xs text-muted-foreground">+20.1% so với tháng trước</p>
          </CardContent>
        </Card>
        {/* Thêm các card khác cho Đơn hàng, Người dùng... */}
      </div>
      <div className="mt-8">
        {/* Khu vực cho biểu đồ */}
        <Card>
          <CardHeader>
            <CardTitle>Biểu đồ doanh thu</CardTitle>
          </CardHeader>
          <CardContent>
             {/* Bạn có thể tích hợp thư viện biểu đồ như Recharts hoặc Chart.js ở đây */}
             <div className="h-96 bg-gray-300 rounded-md flex items-center justify-center">
                <BarChart className="h-16 w-16 text-gray-500" />
                <span className="ml-2 text-gray-500">Biểu đồ sẽ hiển thị ở đây</span>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}