import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/types';
import { formatCurrency } from '@/lib/utils'; // Hàm tiện ích format tiền tệ

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="p-0">
        <Link href={`/products/${product.productId}`}>
          <div className="aspect-square relative w-full">
            <Image
              src={mainImage}
              alt={product.productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="text-lg font-semibold leading-snug h-12 hover:text-primary">
          <Link href={`/products/${product.productId}`}>{product.productName}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground mt-2">{product.manufacturer}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-xl font-bold text-primary">{formatCurrency(product.price)}</p>
        <Button>Thêm vào giỏ</Button>
      </CardFooter>
    </Card>
  );
}