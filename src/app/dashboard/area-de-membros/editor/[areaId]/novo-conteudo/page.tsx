
'use client';

import { useState } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { ArrowLeft, Video, Youtube, Upload, Info, Link as LinkIcon, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

export default function NewLessonPage() {
  const router = useRouter();
  const { areaId } = useParams() as { areaId: string };
  const searchParams = useSearchParams();
  const moduleId = searchParams.get('moduleId');
  const firestore = useFirestore();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [release, setRelease] = useState('immediately');
  const [videoUrl, setVideoUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const areaRef = useMemoFirebase(
    () => (firestore && areaId ? doc(firestore, 'memberAreas', areaId) : null),
    [firestore, areaId]
  );

  const { data: areaData } = useDoc(areaRef);

  const handleSaveLesson = async () => {
    if (!title || !videoUrl || !moduleId) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Título e URL do vídeo são obrigatórios.',
      });
      return;
    }
    
    if(!areaData) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Área de membros não encontrada.' });
        return;
    }

    setIsSaving(true);

    const newLesson = {
      id: new Date().toISOString(),
      title,
      release,
      videoUrl,
      thumbnailUrl,
    };
    
    const updatedModules = areaData.modules.map((module: any) => {
        if(module.id === moduleId) {
            return { ...module, lessons: arrayUnion(newLesson) }
        }
        return module;
    });

    try {
      await updateDoc(areaRef, {
        modules: areaData.modules.map((module: any) => 
            module.id === moduleId 
            ? { ...module, lessons: [...(module.lessons || []), newLesson]}
            : module
        ),
      });
      
      toast({ title: 'Sucesso!', description: 'Aula adicionada.' });
      router.push(`/dashboard/area-de-membros/editor/${areaId}`);
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível adicionar a aula.' });
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
            <Video size={16} />
            <h1 className="text-lg font-semibold">Nova Aula</h1>
          </div>
        </div>
        <Button onClick={handleSaveLesson} disabled={isSaving}>
          {isSaving ? 'Salvando...' : 'Salvar'}
        </Button>
      </header>

      <main className="flex-1 p-8">
        <div className="mx-auto max-w-2xl space-y-8">
          <div>
            <h2 className="text-xl font-semibold">Detalhes</h2>
            <div className="mt-4 space-y-4">
              <div>
                <Label htmlFor="lesson-title">Título</Label>
                <Input
                  id="lesson-title"
                  placeholder="Título da sua aula"
                  className="mt-2 border-gray-700 bg-gray-800"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="lesson-release">Liberação da aula</Label>
                <Select value={release} onValueChange={setRelease}>
                  <SelectTrigger id="lesson-release" className="mt-2 border-gray-700 bg-gray-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    <SelectItem value="immediately">Imediatamente</SelectItem>
                    <SelectItem value="days">Após X dias</SelectItem>
                    <SelectItem value="date">Data específica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Vídeo</h2>
            <div className="mt-4 rounded-lg border border-gray-700 bg-gray-800/50">
              <Tabs defaultValue="new">
                <div className="px-4 border-b border-gray-700">
                  <TabsList className="bg-transparent p-0">
                    <TabsTrigger value="new" className="pb-3 text-gray-300 data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-2px_0_hsl(var(--primary))] rounded-none">
                      Novo Vídeo
                    </TabsTrigger>
                    <TabsTrigger value="library" className="pb-3 text-gray-300 data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-2px_0_hsl(var(--primary))] rounded-none">
                      Biblioteca
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="new" className="p-4">
                   <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="video-url">URL do Vídeo</Label>
                        <div className="flex items-center gap-2">
                            <LinkIcon size={16} className="text-gray-500" />
                            <Input
                                id="video-url"
                                placeholder="Cole a URL do seu vídeo aqui"
                                className="border-gray-600 bg-gray-900"
                                value={videoUrl}
                                onChange={(e) => setVideoUrl(e.target.value)}
                            />
                        </div>
                    </div>
                     <div className="flex items-center gap-4">
                       <Button variant="outline" className="w-full gap-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700">
                          <Youtube size={16} className="text-red-500" /> Usar vídeo do YouTube
                       </Button>
                       <Button variant="outline" className="w-full gap-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-700">
                          <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 fill-white"><title>Panda</title><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2.06 4.312h4.12v15.21H9.94zm0-2.313h4.12v1.547H9.94zm7.31 9.135a3.298 3.298 0 0 1-3.297 3.298c-1.82 0-3.298-1.478-3.298-3.298s1.478-3.297 3.298-3.297a3.298 3.298 0 0 1 3.297 3.297zm-3.297-1.75a1.547 1.547 0 1 0 0 3.094 1.547 1.547 0 0 0 0-3.094zm-5.187.893c0-2.45 1.98-4.43 4.43-4.43s4.43 1.98 4.43 4.43-1.98 4.43-4.43 4.43-4.43-1.98-4.43-4.43zm4.43-2.883a2.883 2.883 0 1 1 0 5.766 2.883 2.883 0 0 1 0-5.766z"/></svg>
                          Usar vídeo do Panda
                       </Button>
                     </div>
                   </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Thumbnail</h2>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-700 p-8 text-center">
              <div className="rounded-full bg-gray-700 p-4">
                <FileImage size={24} className="text-gray-400" />
              </div>
              <p className="font-semibold">Arraste ou selecione o arquivo</p>
              <p className="text-sm text-gray-500">Solte os arquivos aqui ou clique para <button className="font-semibold text-green-400 hover:underline">buscar</button> em seu computador</p>
              <p className="text-xs text-gray-500">Formatos aceitos: JPG ou PNG. Tamanho máximo: 10MB</p>
            </div>
             <Alert className="mt-4 bg-blue-900/50 border-blue-800">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertDescription className="text-blue-300">
                    Tamanho recomendado: 800x450 pixels
                </AlertDescription>
            </Alert>
          </div>
        </div>
      </main>
    </div>
  );
}
