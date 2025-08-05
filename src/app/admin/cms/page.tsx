// src/app/admin/cms/page.tsx

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { getCmsContent } from "@/lib/api"; // Lấy từ API đã mock

export default function AdminCmsPage() {
  const [aboutContent, setAboutContent] = useState('');
  const [contactContent, setContactContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data } = await getCmsContent();
      setAboutContent(data.about);
      setContactContent(data.contact);
      setIsLoading(false);
    };
    fetchContent();
  }, []);

  const handleSave = () => {
    // --- LOGIC API LƯU NỘI DUNG CMS SẼ Ở ĐÂY ---
    console.log({ aboutContent, contactContent });
    alert("Đã lưu nội dung thành công!");
  };

  if (isLoading) {
    return <div>Đang tải nội dung...</div>;
  }
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Quản lý nội dung (CMS)</h1>
        <p className="text-muted-foreground">Chỉnh sửa nội dung cho các trang tĩnh.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Trang Giới thiệu</CardTitle>
          <CardDescription>
            Nội dung sẽ hiển thị trên trang `/about`. Bạn có thể dùng thẻ HTML.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea 
            value={aboutContent}
            onChange={(e) => setAboutContent(e.target.value)}
            rows={10}
            placeholder="Nhập nội dung trang Giới thiệu..."
          />
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Trang Liên hệ</CardTitle>
          <CardDescription>
            Nội dung sẽ hiển thị trên trang `/contact`.
          </CardDescription>
        </CardHeader>
        <CardContent>
           <Textarea 
            value={contactContent}
            onChange={(e) => setContactContent(e.target.value)}
            rows={6}
            placeholder="Nhập nội dung trang Liên hệ..."
          />
        </CardContent>
      </Card>

      <Button onClick={handleSave}>Lưu tất cả thay đổi</Button>
    </div>
  );
}