"use client";

import { useEffect, useMemo, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "@/lib/api";
import type { Customer } from "@/lib/types";

export default function AdminUsersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Customer | null>(null);
  const [form, setForm] = useState({ customerName: "", phoneNumber: "", address: "", email: "" });

  const load = async () => {
    setLoading(true);
    try {
      const data = await getCustomers();
      setCustomers(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return customers.filter((c) =>
      [c.customerName, c.phoneNumber, c.email, c.address].some((v) => v?.toLowerCase().includes(q))
    );
  }, [customers, search]);

  const openCreate = () => {
    setEditing(null);
    setForm({ customerName: "", phoneNumber: "", address: "", email: "" });
    setOpen(true);
  };
  const openEdit = (c: Customer) => {
    setEditing(c);
    setForm({ customerName: c.customerName, phoneNumber: c.phoneNumber, address: c.address, email: c.email });
    setOpen(true);
  };
  const onDelete = async (c: Customer) => {
    if (!confirm(`Xóa khách hàng ${c.customerName}?`)) return;
    await deleteCustomer(c.customerId);
    await load();
  };
  const onSubmit = async () => {
    if (!form.customerName || !form.phoneNumber || !form.address || !form.email) {
      alert("Vui lòng điền đầy đủ thông tin");
      return;
    }
    if (editing) {
      await updateCustomer(editing.customerId, form);
    } else {
      await createCustomer(form);
    }
    setOpen(false);
    await load();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Quản lý Khách hàng</h1>
        <Button onClick={openCreate}>Thêm khách hàng</Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle>Danh sách khách hàng</CardTitle>
          <Input placeholder="Tìm theo tên, SĐT, email, địa chỉ" value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm" />
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Đang tải...</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>SĐT</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Địa chỉ</TableHead>
                  <TableHead className="text-right">Hành động</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.customerId}>
                    <TableCell className="font-medium">{c.customerName}</TableCell>
                    <TableCell>{c.phoneNumber}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.address}</TableCell>
                    <TableCell className="text-right space-x-2">
                      <Button variant="outline" size="sm" onClick={() => openEdit(c)}>Sửa</Button>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(c)}>Xóa</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Cập nhật khách hàng' : 'Thêm khách hàng'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Tên khách hàng</label>
              <Input value={form.customerName} onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Số điện thoại</label>
              <Input value={form.phoneNumber} onChange={(e) => setForm((f) => ({ ...f, phoneNumber: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Địa chỉ</label>
              <Input value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))} />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)}>Hủy</Button>
              <Button onClick={onSubmit}>{editing ? 'Lưu' : 'Tạo'}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}