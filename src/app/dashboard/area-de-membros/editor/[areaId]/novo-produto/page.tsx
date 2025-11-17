
'use client';

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, ShoppingBag, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';

export default function NewProductPage() {
  const router = useRouter();
  const { areaId } = useParams() as { areaId: string };
  const searchParams = useSearchParams();
  const moduleId = searchParams.get('moduleId');
  const firestore = useFirestore();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const areaRef = useMemoFirebase(
    () => (firestore && areaId ? doc(firestore, 'memberAreas', areaId) : null),
    [firestore, areaId]
  );

  const { data: areaData } = useDoc(areaRef);

  const handleSaveProduct = async () => {
    if (!title || !productUrl || !moduleId) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Título e URL do produto são obrigatórios.',
      });
      return;
    }
    
    if(!areaData) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Área de membros não encontrada.' });
        return;
    }

    setIsSaving(true);
    
    try {
      const newProduct = {
        id: new Date().toISOString(),
        title,
        url: productUrl,
      };

      const updatedModules = areaData.modules.map((module: any) => 
          module.id === moduleId 
          ? { ...module, products: [...(module.products || []), newProduct]}
          : module
      );

      await updateDoc(areaRef, {
        modules: updatedModules,
      });
      
      toast({ title: 'Sucesso!', description: 'Produto adicionado.' });
      router.push(`/dashboard/area-de-membros/editor/${areaId}`);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível adicionar o produto.' });
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-900 text-gray-200">
      <header className="flex h-20 items-center justify-between border-b border-gray-700 px-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" className="gap-2 text-gray-300 hover:text-white" onClick={() => router.back()}>
            <ArrowLeft size={16} />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <ShoppingBag size={16} />
            <h1 className="text-lg font-semibold">Novo Produto</h1>
          </div>
        </div>
        <Button onClick={handleSaveProduct} disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </header>

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Detalhes do Produto</h2>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="product-title">Título do produto</Label>
                <Input
                  id="product-title"
                  placeholder="Nome do seu produto"
                  className="mt-2 border-gray-700 bg-gray-800"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="product-url">Link do produto</Label>
                <div className="flex items-center gap-2 mt-2">
                    <LinkIcon size={16} className="text-gray-500" />
                    <Input
                        id="product-url"
                        placeholder="Cole a URL do seu produto aqui (ex: Google Drive)"
                        className="border-gray-600 bg-gray-900"
                        value={productUrl}
                        onChange={(e) => setProductUrl(e.target.value)}
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
