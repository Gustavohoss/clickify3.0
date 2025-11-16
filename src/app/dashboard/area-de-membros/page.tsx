'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tv, Package, ArrowRight } from 'lucide-react';
import { useFirestore, useUser } from '@/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

type MemberAreaType = 'netflix' | 'common';

const memberAreaTypes = [
  {
    icon: <Tv className="h-8 w-8" />,
    title: 'Estilo Netflix',
    description: 'Um layout moderno e visual, perfeito para cursos em vídeo.',
    type: 'netflix' as MemberAreaType,
  },
  {
    icon: <Package className="h-8 w-8" />,
    title: 'Área de Membros Comum',
    description: 'Uma estrutura clássica e organizada para diversos tipos de conteúdo.',
    type: 'common' as MemberAreaType,
  },
];

export default function AreaDeMembrosPage() {
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();
  const [selectedType, setSelectedType] = useState<MemberAreaType | null>(null);
  const [areaName, setAreaName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const handleTypeSelect = (type: MemberAreaType) => {
    setSelectedType(type);
    setIsDialogOpen(true);
  };

  const handleCreateArea = async () => {
    if (!areaName.trim() || !selectedType || !user || !firestore) {
      // TODO: Add toast notification
      return;
    }
    setIsCreating(true);
    try {
      // Placeholder for creation logic. For now, it will just log the data.
      // In a real scenario, this would create a new document in a 'member_areas' collection.
      console.log({
        name: areaName.trim(),
        type: selectedType,
        userId: user.uid,
        createdAt: new Date(),
      });
      // Example of Firestore document creation (currently commented out)
      /*
      const memberAreasCol = collection(firestore, 'member_areas');
      const newAreaDoc = await addDoc(memberAreasCol, {
        name: areaName.trim(),
        type: selectedType,
        userId: user.uid,
        createdAt: serverTimestamp(),
        modules: [],
      });
      router.push(`/editor/membros/${newAreaDoc.id}`);
      */
      
      // For now, we just close the dialog and reset state
      closeDialog();
      // TODO: Add success toast
      
    } catch (error) {
      console.error('Error creating member area: ', error);
      // TODO: Add error toast
    } finally {
        setIsCreating(false);
    }
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedType(null);
    setAreaName('');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Qual estilo de Área de Membros você quer criar?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Escolha um modelo para organizar e entregar seu conteúdo.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {memberAreaTypes.map((area) => (
          <button
            onClick={() => handleTypeSelect(area.type)}
            key={area.title}
            className="block text-left"
          >
            <Card className="group h-full transform transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:border-primary">
              <CardHeader className="p-6">
                <div className="flex items-center justify-between">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {area.icon}
                  </div>
                  <ArrowRight className="h-6 w-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                </div>
                <CardTitle className="text-xl font-bold">{area.title}</CardTitle>
                <CardDescription className="mt-2 text-muted-foreground">
                  {area.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </button>
        ))}
      </div>

      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Dê um nome à sua área de membros</AlertDialogTitle>
            <AlertDialogDescription>
              Este nome será exibido para seus alunos.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Input
              placeholder="Ex: Curso de Marketing Digital"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreateArea()}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeDialog}>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateArea} asChild>
              <Button disabled={!areaName.trim() || isCreating}>
                {isCreating ? 'Criando...' : 'Criar Área de Membros'}
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
