
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Copy, Gift, Info } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';

type Product = {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
  commission: string;
  affiliateLink: string;
};

const staticProducts: Product[] = [
  {
    id: 'static-1',
    name: 'Dieta das Celebridades',
    description: 'Descubra os segredos das celebridades para manter a forma com este guia completo. Inclui planos de refeições, rotinas de exercícios e dicas exclusivas.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/m7r3o42acz47md2cn2iqc4bh?v=1763451610688',
    price: 29.90,
    commission: 'de R$ 20,93 à R$ 104,30',
    affiliateLink: 'https://seulinkdeafiliado.com/dieta'
  }
];

export default function ProdutosPage() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const productsQuery = useMemoFirebase(
    () => (firestore ? collection(firestore, 'affiliateProducts') : null),
    [firestore]
  );

  const { data: dynamicProducts, isLoading } = useCollection<Product>(productsQuery);

  const [allProducts, setAllProducts] = useState<Product[]>(staticProducts);

  useEffect(() => {
    if (dynamicProducts) {
      // Combine static and dynamic products, ensuring no duplicates if IDs ever match
      const combined = [...staticProducts];
      const staticIds = new Set(staticProducts.map(p => p.id));
      dynamicProducts.forEach(dp => {
        if (!staticIds.has(dp.id)) {
          combined.push(dp);
        }
      });
      setAllProducts(combined);
    }
  }, [dynamicProducts]);

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

      {!isLoading && allProducts && allProducts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {allProducts.map((product) => (
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
                 {product.description && (
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                 )}
                <p className="text-sm text-muted-foreground">
                  Preço: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                </p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full" variant="outline">
                      <Info className="mr-2 h-4 w-4" />
                      Veja mais
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>{product.name}</DialogTitle>
                      <DialogDescription>
                        {product.description}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="relative aspect-video w-full rounded-md overflow-hidden">
                        <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="cover" />
                      </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Preço do Produto</span>
                          <span className="font-semibold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Sua Comissão</span>
                          <span className="font-semibold text-green-500">{product.commission}</span>
                       </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="ghost">Fechar</Button>
                      </DialogClose>
                      <Button onClick={() => handleCopyLink(product.affiliateLink)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copiar Link de Afiliado
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
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
