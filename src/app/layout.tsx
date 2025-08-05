// src/app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cửa hàng E-commerce",
  description: "Xây dựng bởi Gemini và bạn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}