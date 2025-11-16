'use client';

import {
  ArrowLeft,
  BookOpen,
  Users,
  Pencil,
  Video,
  Expand,
  PlusCircle,
  Eye,
  BookCopy,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';

type MemberArea = {
  name: string;
};

export default function MemberAreaEditorPage() {
  const router = useRouter();
  const { areaId } = useParams() as { areaId: string };
  const firestore = useFirestore();

  const areaRef = useMemoFirebase(
    () => (firestore && areaId ? doc(firestore, 'memberAreas', areaId) : null),
    [firestore, areaId]
  );

  const { data: areaData, isLoading } = useDoc<MemberArea>(areaRef);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-900 text-gray-200">
      <header className="flex h-20 items-center justify-between border-b border-gray-700 px-8">
        <Button
          variant="ghost"
          className="gap-2 text-gray-300 hover:text-white"
          onClick={() => router.back()}
        >
          <ArrowLeft size={16} />
          Voltar
        </Button>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="border-green-500 bg-green-500/10 text-green-400 hover:bg-green-500/20 hover:text-green-300">
            Cakto Members <Badge className="ml-2 bg-yellow-500 text-black">Beta</Badge>
          </Button>
          <Button variant="outline" className="gap-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">
            <Eye size={16} />
            Pré-Visualizar Curso
          </Button>
        </div>
      </header>

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-5xl">
          <Tabs defaultValue="content">
            <TabsList className="mb-6 bg-gray-800 p-1">
              <TabsTrigger value="content" className="gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                <BookOpen size={16} />
                Conteúdo
              </TabsTrigger>
              <TabsTrigger value="students" className="gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                <Users size={16} />
                Alunos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-6">
              <div className="relative flex min-h-[200px] items-center justify-center rounded-lg border border-gray-700 bg-gray-800/50">
                <Button variant="outline" className="gap-2 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700">
                  <Pencil size={16} />
                  Editar Header
                </Button>
              </div>

              <div>
                <label htmlFor="area-name" className="text-sm font-medium text-gray-400">
                  Nome da área de membros
                </label>
                <Input
                  id="area-name"
                  value={areaData?.name || ''}
                  onChange={() => {}}
                  className="mt-2 w-full max-w-md border-gray-700 bg-gray-800 text-lg text-white"
                />
              </div>

              <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-700 py-16">
                 <p className="text-gray-400">Você ainda não adicionou nenhum módulo.</p>
                 <div className="flex items-center gap-4">
                    <Button variant="outline" className="gap-2 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700">
                        <Video size={16} />
                        Biblioteca De Vídeos
                    </Button>
                     <Button variant="outline" className="gap-2 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700">
                        <Expand size={16} />
                        Expandir
                    </Button>
                    <Button className="gap-2 bg-green-600 text-white hover:bg-green-700">
                        <PlusCircle size={16} />
                        Adicionar
                    </Button>
                 </div>
              </div>
            </TabsContent>
            <TabsContent value="students">
                <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-700 py-20">
                    <Users size={48} className="text-gray-600" />
                    <h3 className="text-xl font-bold">Sem alunos ainda</h3>
                    <p className="text-gray-400">Quando os alunos se inscreverem, você os verá aqui.</p>
                </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
