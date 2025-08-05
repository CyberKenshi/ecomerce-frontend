// src/app/admin/users/page.tsx

import { getUsers } from "@/lib/api";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function AdminUsersPage() {
  const { data: users } = await getUsers();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Quản lý Người dùng</h1>
      <Card>
        <CardHeader>
          <CardTitle>Danh sách người dùng</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Người dùng</TableHead>
                <TableHead>Vai trò</TableHead>
                <TableHead>Ngày tham gia</TableHead>
                <TableHead className="text-right">Hành động</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${user.id}`} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.role === 'admin' ? 'destructive' : 'outline'}>
                        {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(user.joinedAt).toLocaleDateString('vi-VN')}</TableCell>
                  <TableCell className="text-right">
                    {/* Các hành động như khóa tài khoản, đổi vai trò có thể thêm ở đây */}
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