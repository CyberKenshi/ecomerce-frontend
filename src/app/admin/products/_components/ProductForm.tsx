// src/app/admin/products/_components/ProductForm.tsx

"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/lib/types";
import { createProduct } from "@/lib/api";
import { useRouter } from "next/navigation";

// Định nghĩa schema để xác thực dữ liệu form
const formSchema = z.object({
  productName: z.string().min(2, { message: "Product name must have at least 2 characters." }),
  description: z.string().min(10, { message: "Description must have at least 10 characters." }).optional().or(z.literal('').transform(() => '')),
  retailPrice: z.coerce.number().min(0, { message: "Retail price cannot be negative." }),
  importPrice: z.coerce.number().min(0, { message: "Import price cannot be negative." }).optional(),
  stockQuantity: z.coerce.number().int().min(0, { message: "Stock quantity cannot be negative." }),
  categoryId: z.string().min(1, { message: "Please enter category." }),
  manufacturer: z.string().min(1, { message: "Please enter manufacturer." }),
  images: z
    .any()
    .refine((files) => files && files.length > 0, { message: 'Please upload at least 1 image.' }),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData?: Product | null; // Dữ liệu ban đầu cho form chỉnh sửa
}

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          productName: initialData.productName,
          description: initialData.description || '',
          retailPrice: initialData.retailPrice,
          importPrice: initialData.importPrice,
          stockQuantity: initialData.stockQuantity,
          categoryId: initialData.categoryId,
          manufacturer: initialData.manufacturer,
          images: undefined as unknown as FileList,
        }
      : {
          productName: '',
          description: '',
          retailPrice: 0,
          importPrice: undefined,
          stockQuantity: 0,
          categoryId: '',
          manufacturer: '',
          images: undefined as unknown as FileList,
        },
  });

  const onSubmit = async (values: ProductFormValues) => {
    try {
      if (isEditMode && initialData) {
        // TODO: implement update flow (PATCH /api/products/:productId)
        alert('Chức năng cập nhật sẽ được bổ sung sau.');
      } else {
        const created = await createProduct({
          productName: values.productName,
          retailPrice: values.retailPrice,
          importPrice: values.importPrice,
          categoryId: values.categoryId,
          manufacturer: values.manufacturer,
          description: values.description || '',
          stockQuantity: values.stockQuantity,
          images: values.images as unknown as FileList,
        });
        if (created) {
          alert('Thêm sản phẩm mới thành công!');
        }
      }
      router.push('/admin/products');
      router.refresh();
    } catch (err: any) {
      alert(err?.message || 'Có lỗi xảy ra khi lưu sản phẩm');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="productName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: iPhone 15" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả sản phẩm</FormLabel>
              <FormControl>
                <Textarea placeholder="Mô tả chi tiết về sản phẩm..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="retailPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá bán (VND)</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="importPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Giá nhập (VND) - tùy chọn</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="stockQuantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Số lượng tồn kho</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mã danh mục</FormLabel>
                <FormControl>
                  <Input placeholder="vd: smartphone-1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="manufacturer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hãng sản xuất</FormLabel>
              <FormControl>
                <Input placeholder="vd: Apple, Samsung" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hình ảnh sản phẩm (tối đa 5)</FormLabel>
              <FormControl>
                <Input type="file" accept="image/*" multiple onChange={(e) => field.onChange(e.target.files)} />
              </FormControl>
              <FormDescription>Chọn từ 1 đến 5 ảnh để tải lên.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {isEditMode ? "Lưu thay đổi" : "Tạo sản phẩm"}
        </Button>
      </form>
    </Form>
  );
}