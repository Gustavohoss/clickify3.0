
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { PlusCircle, BookUser, MoreVertical, Trash2, Play, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useCollection, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, deleteDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function AreaDeMembrosPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [areaToDelete, setAreaToDelete] = useState<string | null>(null);

  const areasQuery = useMemoFirebase(
    () =>
      user && firestore
        ? query(collection(firestore, 'memberAreas'), where('userId', '==', user.uid))
        : null,
    [firestore, user]
  );

  const { data: memberAreas, isLoading } = useCollection(areasQuery);

  const openDeleteDialog = (areaId: string) => {
    setAreaToDelete(areaId);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!areaToDelete || !firestore) return;

    try {
      const areaRef = doc(firestore, 'memberAreas', areaToDelete);
      await deleteDoc(areaRef);
      toast({
        title: 'Área de membros excluída!',
        description: 'Sua área de membros foi removida com sucesso.',
      });
    } catch (error) {
      console.error("Error deleting member area: ", error);
      toast({
        variant: 'destructive',
        title: 'Erro ao excluir',
        description: 'Não foi possível excluir a área de membros. Tente novamente.',
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setAreaToDelete(null);
    }
  };


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Minhas Áreas de Membros 🚀
          </h1>
          <p className="mt-2 text-muted-foreground">
            Crie e gerencie o conteúdo exclusivo para seus clientes.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/dashboard/area-de-membros/novo">
            <PlusCircle className="mr-2 h-5 w-5" />
            Criar Nova Área
          </Link>
        </Button>
      </div>

      {isLoading && <p>Carregando...</p>}

      {!isLoading && memberAreas && memberAreas.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {memberAreas.map((area) => (
             <Card key={area.id} className="group relative flex flex-col transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 z-10 bg-black/20 hover:bg-black/50">
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => router.push(`/dashboard/area-de-membros/editor/${area.id}`)}>
                            Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                            className="text-destructive"
                            onClick={(e) => {
                                e.stopPropagation();
                                openDeleteDialog(area.id);
                            }}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative aspect-video w-full">
                  {area.headerImageUrl ? (
                    <Image src={area.headerImageUrl} alt={area.name} layout="fill" objectFit="cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-muted">
                      <Image src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/vq3dlad75ysvpgjpvjtqwuxl?v=1764147033314" alt="Imagem Padrão" layout="fill" objectFit="cover" />
                    </div>
                  )}
                </div>

                <CardContent className="flex-grow p-4">
                   <h3 className="font-semibold text-lg">{area.name}</h3>
                </CardContent>
                
                <CardFooter className="p-4 pt-0 grid grid-cols-2 gap-2">
                    <Button asChild variant="outline">
                        <Link href={`/dashboard/area-de-membros/editor/${area.id}`}>
                            Editar
                        </Link>
                    </Button>
                    <Button asChild>
                        <Link href={`/membros/${area.slug}`} target="_blank">
                            Acessar
                            <ExternalLink className="ml-2 h-4 w-4" />
                        </Link>
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
                <BookUser className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Nenhuma área de membros por aqui ainda</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                Comece a construir seu espaço exclusivo. Crie sua primeira área e veja a mágica acontecer.
                </p>
                <Button asChild>
                <Link href="/dashboard/area-de-membros/novo">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Criar Primeira Área
                </Link>
                </Button>
            </div>
            </Card>
        )
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. Isso excluirá permanentemente sua área de membros e todos os dados associados a ela.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continuar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
