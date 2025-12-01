
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogFooter } from '@/components/ui/alert-dialog';
import { PlusCircle, MoreVertical, Trash2, Edit, UploadCloud, Hourglass, CheckCircle, XCircle } from 'lucide-react';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, deleteDoc, addDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

type Product = {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  price: number;
  commission: string;
  affiliateLink: string;
  quizId?: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
};

const statusInfo = {
  pending: { text: "Em Verificação", icon: Hourglass, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  approved: { text: "Aprovado", icon: CheckCircle, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  rejected: { text: "Rejeitado", icon: XCircle, color: "bg-red-500/20 text-red-400 border-red-500/30" },
};


export default function MeusProdutosPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Product>>({ price: 0 });
  const [isSaving, setIsSaving] = useState(false);

  const productsQuery = useMemoFirebase(
    () => user && firestore ? query(collection(firestore, 'affiliateProducts'), where('userId', '==', user.uid)) : null,
    [firestore, user]
  );
  const { data: products, isLoading } = useCollection<Product>(productsQuery);

  const openFormDialog = (product: Product | null = null) => {
    if (product) {
      setProductToEdit(product);
      setFormData({ ...product });
    } else {
      setProductToEdit(null);
      setFormData({ price: 0, commission: '', name: '', description: '', imageUrl: '', affiliateLink: '', quizId: '' });
    }
    setIsFormOpen(true);
  };

  const closeFormDialog = () => {
    setIsFormOpen(false);
    setProductToEdit(null);
    setFormData({});
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };

  const handleSaveProduct = async () => {
    if (!user || !firestore || !formData.name || !formData.imageUrl || !formData.affiliateLink) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Por favor, preencha todos os campos obrigatórios.' });
      return;
    }

    setIsSaving(true);
    try {
      if (productToEdit) {
        // Update existing product
        const productRef = doc(firestore, 'affiliateProducts', productToEdit.id);
        await updateDoc(productRef, {
          ...formData,
          status: 'pending', // Reset status on edit
        });
        toast({ title: 'Sucesso!', description: 'Produto atualizado e enviado para verificação.' });
      } else {
        // Create new product
        await addDoc(collection(firestore, 'affiliateProducts'), {
          ...formData,
          userId: user.uid,
          status: 'pending',
          createdAt: serverTimestamp(),
        });
        toast({ title: 'Sucesso!', description: 'Produto enviado para verificação.' });
      }
      closeFormDialog();
    } catch (error) {
      console.error("Error saving product: ", error);
      toast({ variant: 'destructive', title: 'Erro ao salvar', description: 'Não foi possível salvar o produto.' });
    } finally {
      setIsSaving(false);
    }
  };
  
  const openDeleteDialog = (id: string) => {
    setProductToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteProduct = async () => {
    if (!productToDelete || !firestore) return;
    try {
      await deleteDoc(doc(firestore, 'affiliateProducts', productToDelete));
      toast({ title: 'Sucesso', description: 'Produto excluído.' });
    } catch(e) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível excluir o produto.' });
    } finally {
      setIsDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Meus Produtos
          </h1>
          <p className="mt-2 text-muted-foreground">
            Adicione e gerencie seus produtos para a vitrine de afiliação.
          </p>
        </div>
        <Button size="lg" onClick={() => openFormDialog()}>
          <PlusCircle className="mr-2 h-5 w-5" />
          Adicionar Novo Produto
        </Button>
      </div>

      {isLoading ? (
        <p>Carregando seus produtos...</p>
      ) : products && products.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => {
            const StatusIcon = statusInfo[product.status].icon;
            return (
              <Card key={product.id} className="group relative flex flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="relative w-full h-40 mb-4 rounded-md overflow-hidden bg-muted">
                    <Image src={product.imageUrl} alt={product.name} layout="fill" objectFit="contain" className="p-2"/>
                  </div>
                  <CardTitle className="flex justify-between items-start">
                    <span>{product.name}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1 -mr-2">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => openFormDialog(product)}>
                          <Edit className="mr-2 h-4 w-4" /> Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => openDeleteDialog(product.id)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardTitle>
                  <CardDescription>
                    <Badge className={statusInfo[product.status].color}>
                      <StatusIcon className="mr-1 h-3 w-3" />
                      {statusInfo[product.status].text}
                    </Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-sm">
                  <span>Comissão: <span className="font-bold">{product.commission}</span></span>
                  <span>Preço: <span className="font-bold">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</span></span>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-20 border-dashed">
          <div className="text-center">
            <UploadCloud className="mx-auto h-16 w-16 text-muted-foreground" />
            <h3 className="mt-4 text-xl font-semibold">Nenhum produto cadastrado</h3>
            <p className="mt-2 text-muted-foreground">Adicione seu primeiro produto para que ele apareça na vitrine.</p>
            <Button className="mt-6" onClick={() => openFormDialog()}>
              <PlusCircle className="mr-2 h-5 w-5" /> Adicionar Produto
            </Button>
          </div>
        </Card>
      )}

      {/* Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={closeFormDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{productToEdit ? 'Editar Produto' : 'Adicionar Novo Produto'}</DialogTitle>
            <DialogDescription>
              Preencha as informações abaixo. Seu produto passará por uma verificação antes de ser publicado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-6">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nome</Label>
              <Input id="name" name="name" value={formData.name || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descrição</Label>
              <Textarea id="description" name="description" value={formData.description || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageUrl" className="text-right">URL da Imagem</Label>
              <Input id="imageUrl" name="imageUrl" value={formData.imageUrl || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Preço (R$)</Label>
              <Input id="price" name="price" type="number" value={formData.price || 0} onChange={handleFormChange} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="commission" className="text-right">Comissão</Label>
              <Input id="commission" name="commission" value={formData.commission || ''} onChange={handleFormChange} placeholder="Ex: 50% ou R$25,00" className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="affiliateLink" className="text-right">Link de Afiliação</Label>
              <Input id="affiliateLink" name="affiliateLink" value={formData.affiliateLink || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quizId" className="text-right">Cód. do Quiz (Opcional)</Label>
              <Input id="quizId" name="quizId" value={formData.quizId || ''} onChange={handleFormChange} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={closeFormDialog}>Cancelar</Button>
            <Button onClick={handleSaveProduct} disabled={isSaving}>
              {isSaving ? 'Salvando...' : 'Salvar Produto'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita e excluirá permanentemente o produto.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteProduct}>Excluir</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
