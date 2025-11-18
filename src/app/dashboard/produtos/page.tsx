
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Gift } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

type Product = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  commission: string;
  affiliateLink: string;
};

export default function ProdutosPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'affiliateProducts') : null),
    [firestore]
  );

  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: 'Link de afiliado copiado!',
        description: 'Agora você pode começar a divulgar.',
      });
    }).catch(err => {
      toast({
        variant: 'destructive',
        title: 'Erro ao copiar',
        description: 'Não foi possível copiar o link.',
      });
      console.error('Failed to copy link: ', err);
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Produtos para se Afiliar
          </h1>
          <p className="mt-2 text-muted-foreground">
            Escolha um produto, copie seu link de afiliado e comece a vender.
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="w-full h-48 bg-muted rounded-t-lg" />
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-1/3 mt-2" />
              </CardContent>
              <CardFooter>
                 <div className="h-10 bg-muted rounded w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {!isLoading && products && products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="group flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
              <div className="relative aspect-video w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  Comissão: {product.commission}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">
                  Preço: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => handleCopyLink(product.affiliateLink)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copiar Link de Afiliado
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        !isLoading && (
            <Card className="flex flex-col items-center justify-center py-20 border-dashed">
                <div className="text-center">
                    <div className="flex justify-center mb-4">
                        <Gift className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold">Nenhum produto na vitrine</h3>
                    <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                        Volte em breve! Novos produtos para afiliação são adicionados regularmente.
                    </p>
                </div>
            </Card>
        )
      )}
    </div>
  );
}
