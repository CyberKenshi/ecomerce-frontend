// src/components/client/Footer.tsx

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-foreground mb-4">E-Store</h3>
            <p className="text-sm">Nền tảng mua sắm trực tuyến hàng đầu Việt Nam.</p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Về chúng tôi</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary">Giới thiệu</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Liên hệ</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Điều khoản dịch vụ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/faq" className="hover:text-primary">Câu hỏi thường gặp</Link></li>
              <li><Link href="/shipping" className="hover:text-primary">Chính sách vận chuyển</Link></li>
              <li><Link href="/returns" className="hover:text-primary">Chính sách đổi trả</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-4">Kết nối với chúng tôi</h3>
            {/* Thêm icon mạng xã hội ở đây */}
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center text-sm">
          <p>© {new Date().getFullYear()} E-Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}