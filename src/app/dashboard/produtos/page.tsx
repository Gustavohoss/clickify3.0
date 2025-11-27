
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
import Link from 'next/link';

type Product = {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number | string;
  commission: string;
  affiliateLink: string;
};

const staticProducts: Product[] = [
  {
    id: 'static-1',
    name: 'Dieta das Celebridades',
    description: 'Descubra os segredos das celebridades para manter a forma com este guia completo. Inclui planos de refeições, rotinas de exercícios e dicas exclusivas.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/m7r3o42acz47md2cn2iqc4bh?v=1763451610688',
    price: 'de R$ 19,90 a R$ 59,90',
    commission: 'de R$ 13,93 à R$ 41,93',
    affiliateLink: 'https://app.cakto.com.br/affiliate/invite/e588af5d-cccd-40f8-9b01-42111409ebc8'
  },
  {
    id: 'static-2',
    name: 'Aprenda Tudo Sobre Criptomoedas',
    description: 'Um curso completo para você dominar o mercado de criptomoedas, do básico ao avançado. Perfeito para iniciantes!',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/djtlfvgpii2rpwwlodj3bqn9?v=1763468291681',
    price: 'de R$ 19,90 a R$ 99,90',
    commission: 'de R$ 13,93 à R$ 69,93',
    affiliateLink: 'https://app.cakto.com.br/affiliate/invite/530e985b-9cef-4fc0-98e8-b8270db222fe'
  },
  {
    id: 'static-3',
    name: 'EnemUp',
    description: 'Prepare-se para o ENEM com a melhor plataforma de estudos. Aulas, simulados e acompanhamento personalizado para garantir sua aprovação.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/x6dsg8g9f5lvz77xobhk9p73?v=1763469556980',
    price: 'de R$ 19,90 a R$ 99,90',
    commission: 'de R$ 13,93 à R$ 69,93',
    affiliateLink: '#'
  },
  {
    id: 'static-4',
    name: 'Elixir Anti-Barriga',
    description: 'Elimine a gordura localizada e conquiste a barriga dos seus sonhos com este método inovador.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/gd325kcyp1gf6pou81oowpji?v=1763949891132',
    price: 'de R$ 19,90 a R$ 37,00',
    commission: 'Até R$ 27,00',
    affiliateLink: 'https://app.pepper.com.br/invite/affiliate/n1mdilesdw'
  },
  {
    id: 'static-5',
    name: 'Psicologia sombria',
    description: 'Aprenda as técnicas de psicologia sombria e como se proteger.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cmgf6qe8j0003l104pr1kqgiz/typebots/cmih14zxp0001lk0470hkp0xq/blocks/kl961lf5wmc5j2jrpyp5fxr3?v=1764223537020',
    price: 'de R$ 19,90 a R$ 47,90',
    commission: 'Até 70%',
    affiliateLink: 'https://app.pepper.com.br/invite/affiliate/fi2lbigx5s'
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
    if (link === '#') {
      toast({
        variant: 'destructive',
        title: 'Link de Afiliado Indisponível',
        description: 'Este produto ainda não possui um link de afiliado configurado.',
      });
      return;
    }
    navigator.clipboard.writeText(link).then(() => {
      toast({
        title: 'Link de afiliado copiado',
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
  
  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') {
        return price;
    }
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);
  }

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
              <div className="relative w-full h-48">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="p-4"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{product.name}</CardTitle>
                <div className="flex flex-col items-start gap-2 mt-2">
                   <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20 w-fit">
                    Ganhos de até {product.name === 'Dieta das Celebridades' ? 'R$ 41,93' : product.name === 'Elixir Anti-Barriga' ? 'R$ 27,00' : 'R$ 69,93'}
                  </Badge>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 w-fit">
                      Comissão: {product.commission}
                    </Badge>
                    <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 w-fit">
                      70% de comissão
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                 {product.description && (
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
                 )}
                <p className="text-sm text-muted-foreground">
                  Preço: {formatPrice(product.price)}
                </p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-bold">
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
                      <div className="relative w-full h-48 rounded-md overflow-hidden">
                        <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="contain" />
                      </div>
                       <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Preço do Produto</span>
                          <span className="font-semibold">{formatPrice(product.price)}</span>
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
                      <Button asChild>
                          <Link href={product.affiliateLink} target="_blank">
                              Afiliar-se Agora
                          </Link>
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
