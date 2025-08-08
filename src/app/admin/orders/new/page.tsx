"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts, getProductItems, createOrder, addProductToOrder, checkoutOrder, getCustomers } from "@/lib/api";
import type { Product, Customer } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

export default function AdminCreateOrderPage() {
  const [order, setOrder] = useState<any>(null);
  const [orderProducts, setOrderProducts] = useState<Array<{ productId: string; productName: string; quantity: number; unitPrice: number; totalPrice: number }>>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productItems, setProductItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [addQuantity, setAddQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    getProducts().then(({ products }) => setProducts(products));
    getCustomers().then((list) => setCustomers(list));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!search) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) => p.productName.toLowerCase().includes(q) || p.manufacturer.toLowerCase().includes(q)
    );
  }, [products, search]);

  const handleCreateOrder = async () => {
    if (!selectedCustomer) return alert("Vui lòng chọn khách hàng");
    setLoading(true);
    try {
      const created = await createOrder(selectedCustomer.phoneNumber);
      setOrder(created);
      setOrderProducts([]);
    } catch (e: any) {
      alert(e?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProduct = async (p: Product) => {
    setSelectedProduct(p);
    try {
      const items = await getProductItems(p.productId);
      setProductItems(items);
    } catch {
      setProductItems([]);
    }
  };

  const handleAddToOrder = async () => {
    if (!order?.orderId) return alert("Create an order first");
    if (!selectedProduct) return alert("Select a product");
    if (addQuantity <= 0) return alert("Quantity must be greater than 0");
    setLoading(true);
    try {
      const result = await addProductToOrder(order.orderId, { productName: selectedProduct.productName, quantity: addQuantity });
      setOrder(result.order);
      setOrderProducts(result.products);
    } catch (e: any) {
      alert(e?.message || "Failed to add product to order");
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!order?.orderId) return;
    setLoading(true);
    try {
      const checkedOut = await checkoutOrder(order.orderId);
      setOrder(checkedOut);
      alert("Order checkout initiated.");
    } catch (e: any) {
      alert(e?.message || "Failed to checkout order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tạo đơn hàng</h1>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin khách hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Input
              placeholder="Tìm khách hàng theo tên, SĐT, email, địa chỉ"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleCreateOrder} disabled={loading || !selectedCustomer}>Tạo đơn</Button>
          </div>
          {selectedCustomer ? (
            <div className="text-sm">
              Đang chọn: <span className="font-medium">{selectedCustomer.customerName}</span> - {selectedCustomer.phoneNumber}
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">Chưa chọn khách hàng</div>
          )}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tên</TableHead>
                <TableHead>SĐT</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Địa chỉ</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers
                .filter((c) => {
                  const q = customerSearch.toLowerCase();
                  if (!q) return true;
                  return [c.customerName, c.phoneNumber, c.email, c.address].some((v) => v?.toLowerCase().includes(q));
                })
                .slice(0, 10)
                .map((c) => (
                  <TableRow key={c.customerId}>
                    <TableCell className="font-medium">{c.customerName}</TableCell>
                    <TableCell>{c.phoneNumber}</TableCell>
                    <TableCell>{c.email}</TableCell>
                    <TableCell>{c.address}</TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant={selectedCustomer?.customerId === c.customerId ? 'default' : 'outline'} onClick={() => setSelectedCustomer(c)}>
                        {selectedCustomer?.customerId === c.customerId ? 'Đã chọn' : 'Chọn'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-4">
              <Input placeholder="Tìm kiếm theo tên hoặc hãng" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tên</TableHead>
                  <TableHead>Hãng</TableHead>
                  <TableHead>Giá</TableHead>
                  <TableHead>Tồn kho</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((p) => (
                  <TableRow key={p.productId}>
                    <TableCell className="font-medium">{p.productName}</TableCell>
                    <TableCell>{p.manufacturer}</TableCell>
                    <TableCell>{formatCurrency(p.retailPrice)}</TableCell>
                    <TableCell>{p.stockQuantity}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" onClick={() => handleSelectProduct(p)}>Chọn</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chi tiết sản phẩm</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedProduct ? (
              <>
                <div>
                  <div className="font-semibold">{selectedProduct.productName}</div>
                  <div className="text-sm text-muted-foreground">{selectedProduct.manufacturer}</div>
                </div>
                <div className="border rounded p-2 max-h-48 overflow-auto">
                  <div className="text-sm mb-2">Product Items ({productItems.length})</div>
                  <div className="grid grid-cols-1 gap-1 text-xs">
                    {productItems.map((it) => (
                      <div key={it._id} className="flex justify-between border-b py-1">
                        <span>#{it._id}</span>
                        <span className="capitalize">{it.status?.toLowerCase()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Input type="number" value={addQuantity} onChange={(e) => setAddQuantity(Number(e.target.value))} className="w-28" />
                  <Button onClick={handleAddToOrder} disabled={!order || loading}>Thêm vào đơn</Button>
                </div>
              </>
            ) : (
              <div className="text-sm text-muted-foreground">Chọn 1 sản phẩm để xem item và thêm vào đơn</div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Đơn hàng hiện tại</CardTitle>
        </CardHeader>
        <CardContent>
          {order ? (
            <>
              <div className="mb-4 text-sm text-muted-foreground">Mã đơn: {order.orderId}</div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên SP</TableHead>
                    <TableHead>Số lượng</TableHead>
                    <TableHead>Đơn giá</TableHead>
                    <TableHead>Thành tiền</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderProducts.map((op) => (
                    <TableRow key={op.productId}>
                      <TableCell>{op.productName}</TableCell>
                      <TableCell>{op.quantity}</TableCell>
                      <TableCell>{formatCurrency(op.unitPrice)}</TableCell>
                      <TableCell>{formatCurrency(op.totalPrice)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-between mt-4">
                <div></div>
                <div className="font-semibold">Tổng: {formatCurrency(order.total || 0)}</div>
              </div>
              <div className="mt-4 flex gap-2 justify-end">
                <Button variant="outline" disabled={loading} onClick={() => window.location.reload()}>Hủy</Button>
                <Button disabled={loading || (orderProducts?.length || 0) === 0} onClick={handleCheckout}>Thanh toán</Button>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">Chưa có đơn hàng nào. Vui lòng nhập SĐT và bấm Tạo đơn.</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}


