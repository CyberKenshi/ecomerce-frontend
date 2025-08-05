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
    <Card className="flex flex-col">
      <CardHeader>
        <Link href={`/products/${product.slug}`}>
          <Image
            src={product.imageUrl || '/placeholder.svg'}
            alt={product.name}
            width={300}
            height={300}
            className="w-full h-48 object-cover rounded-t-lg"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardTitle className="text-lg font-semibold hover:text-primary">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </CardTitle>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="text-xl font-bold text-primary">{formatCurrency(product.price)}</p>
        <Button>Thêm vào giỏ</Button>
      </CardFooter>
    </Card>
  );
}