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
import { useRouter } from "next/navigation";

// Định nghĩa schema để xác thực dữ liệu form
const formSchema = z.object({
  name: z.string().min(2, { message: "Tên sản phẩm phải có ít nhất 2 ký tự." }),
  description: z.string().min(10, { message: "Mô tả phải có ít nhất 10 ký tự." }),
  price: z.coerce.number().min(0, { message: "Giá không được âm." }),
  stock: z.coerce.number().int().min(0, { message: "Số lượng tồn kho không được âm." }),
  category: z.string().min(1, { message: "Vui lòng chọn danh mục." }),
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
    defaultValues: initialData ? {
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        stock: initialData.stock,
        category: initialData.category,
    } : {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
    },
  });

  const onSubmit = async (values: ProductFormValues) => {
    // --- LOGIC GỌI API THÊM/SỬA SẢN PHẨM SẼ Ở ĐÂY ---
    console.log("Form submitted with values:", values);

    if (isEditMode) {
      // Gọi API cập nhật sản phẩm
      // await api.put(`/products/${initialData.id}`, values);
      alert("Cập nhật sản phẩm thành công!");
    } else {
      // Gọi API tạo sản phẩm mới
      // await api.post('/products', values);
      alert("Thêm sản phẩm mới thành công!");
    }
    router.push('/admin/products'); // Quay lại trang danh sách sản phẩm
    router.refresh(); // Làm mới dữ liệu trang
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 bg-white p-8 rounded-lg shadow-md">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên sản phẩm</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: Áo thun cao cấp" {...field} />
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
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Giá (VND)</FormLabel>
                <FormControl>
                    <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="stock"
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
        </div>
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Danh mục</FormLabel>
              <FormControl>
                <Input placeholder="Ví dụ: Thời trang nam" {...field} />
              </FormControl>
               <FormDescription>
                Trong thực tế, đây nên là một dropdown chọn từ danh sách danh mục có sẵn.
              </FormDescription>
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