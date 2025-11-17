

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
  Info,
  Link,
  Folder,
  X,
  ImageIcon,
  GripVertical,
  MoreVertical,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useParams } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState }from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


type Module = {
  id: string;
  name: string;
  coverImageUrl?: string;
  lessons: any[];
};

type MemberArea = {
  name: string;
  headerImageUrl?: string;
  modules?: Module[];
};

export default function MemberAreaEditorPage() {
  const router = useRouter();
  const { areaId } = useParams() as { areaId: string };
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [headerUrl, setHeaderUrl] = useState('');
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleCoverUrl, setNewModuleCoverUrl] = useState('');

  const [editingModule, setEditingModule] = useState<Module | null>(null);


  const areaRef = useMemoFirebase(
    () => (firestore && areaId ? doc(firestore, 'memberAreas', areaId) : null),
    [firestore, areaId]
  );

  const { data: areaData, isLoading } = useDoc<MemberArea>(areaRef);

  const handleSaveHeaderImage = async () => {
    if (areaRef && headerUrl) {
      try {
        await updateDoc(areaRef, { headerImageUrl: headerUrl });
        toast({ title: 'Sucesso!', description: 'Imagem do header salva.' });
      } catch (error) {
        toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível salvar a imagem.'})
      }
    }
  };
  
  const handleAddModule = async () => {
    if (!areaRef || !newModuleName.trim()) {
       toast({ variant: 'destructive', title: 'Erro', description: 'O nome do módulo é obrigatório.'})
      return;
    }

    const newModule: Module = {
      id: new Date().toISOString(),
      name: newModuleName,
      coverImageUrl: newModuleCoverUrl,
      lessons: [],
    };

    try {
      await updateDoc(areaRef, {
        modules: arrayUnion(newModule),
      });
      toast({ title: 'Sucesso!', description: 'Módulo adicionado.' });
      setNewModuleName('');
      setNewModuleCoverUrl('');
      setIsAddModuleOpen(false);
    } catch (error) {
       toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível adicionar o módulo.'})
    }
  };

  const handleOpenEditDialog = (module: Module) => {
    setEditingModule(module);
    setNewModuleName(module.name);
    setNewModuleCoverUrl(module.coverImageUrl || '');
    setIsAddModuleOpen(true);
  };

  const handleUpdateModule = async () => {
    if (!areaRef || !editingModule || !newModuleName.trim()) {
      toast({ variant: 'destructive', title: 'Erro', description: 'O nome do módulo é obrigatório.' });
      return;
    }

    const updatedModules = areaData?.modules?.map(m => 
      m.id === editingModule.id 
        ? { ...m, name: newModuleName, coverImageUrl: newModuleCoverUrl }
        : m
    );

    try {
      await updateDoc(areaRef, { modules: updatedModules });
      toast({ title: 'Sucesso!', description: 'Módulo atualizado.' });
      closeAndResetDialog();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível atualizar o módulo.' });
    }
  };

  const closeAndResetDialog = () => {
    setIsAddModuleOpen(false);
    setEditingModule(null);
    setNewModuleName('');
    setNewModuleCoverUrl('');
  };

  const handleDialogSave = () => {
    if (editingModule) {
      handleUpdateModule();
    } else {
      handleAddModule();
    }
  };


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
              <div className="relative flex min-h-[200px] items-center justify-center overflow-hidden rounded-lg border border-gray-700 bg-gray-800/50">
                {areaData?.headerImageUrl ? (
                    <Image src={areaData.headerImageUrl} layout="fill" objectFit="cover" alt="Header da área de membros" />
                ) : (
                    <div className="text-center text-gray-500">
                        <ImageIcon size={48} />
                        <p>Nenhum header definido</p>
                    </div>
                )}
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="absolute gap-2 border-gray-600 bg-gray-800/50 text-gray-300 hover:bg-gray-700 backdrop-blur-sm">
                      <Pencil size={16} />
                      Editar Header
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 bg-gray-800 border-gray-700 text-white" side="bottom">
                    <div className="space-y-4">
                        <div className="space-y-1">
                            <h4 className="font-semibold">Editar Header</h4>
                            <p className="text-sm text-gray-400">Escolha uma imagem para o cabeçalho da sua área de membros.</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="header-url">URL da imagem</Label>
                            <div className="flex items-center gap-2">
                                <Link size={16} className="text-gray-500" />
                                <Input 
                                    id="header-url"
                                    placeholder="https://sua-imagem.com/header.jpg"
                                    className="border-gray-600 bg-gray-900"
                                    value={headerUrl}
                                    onChange={(e) => setHeaderUrl(e.target.value)}
                                />
                            </div>
                        </div>
                        <Alert className="bg-blue-900/50 border-blue-800">
                          <Info className="h-4 w-4 text-blue-400" />
                          <AlertDescription className="text-blue-300">
                            Tamanho recomendado: 1920x1080
                          </AlertDescription>
                        </Alert>
                         <Button onClick={handleSaveHeaderImage} className="w-full bg-green-600 hover:bg-green-700">
                            Salvar Imagem
                        </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label htmlFor="area-name" className="text-sm font-medium text-gray-400">
                  Nome da área de membros
                </label>
                <Input
                  id="area-name"
                  value={areaData?.name || ''}
                  readOnly
                  className="mt-2 w-full max-w-md border-gray-700 bg-gray-800 text-lg text-white"
                />
              </div>

              <div className="space-y-4">
                {areaData?.modules && areaData.modules.length > 0 ? (
                    <Accordion type="multiple" className="w-full space-y-2">
                        {areaData.modules.map((module) => (
                        <AccordionItem key={module.id} value={`module-${module.id}`} className="rounded-lg bg-gray-800/50 border border-gray-700 overflow-hidden">
                            <div className="relative">
                                <div className="p-4">
                                    <div className="flex items-center gap-4">
                                        <GripVertical className="cursor-grab text-gray-500" />
                                        <span className="font-semibold flex-1">{module.name}</span>
                                        <Badge className="bg-blue-900/50 text-blue-300 border-blue-800">{module.lessons?.length || 0} Conteúdo</Badge>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                                    <MoreVertical size={16} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="bg-gray-700 border-gray-600 text-white">
                                                <DropdownMenuItem className="focus:bg-gray-600" onClick={() => handleOpenEditDialog(module)}>Editar</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-400 focus:bg-red-900/50 focus:text-red-300">Excluir</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>
                                <div className="border-t border-gray-700 py-6 relative">
                                     <button className="absolute left-4 top-0 -translate-y-1/2 flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white hover:bg-green-700 z-10">
                                        <PlusCircle size={16} />
                                    </button>
                                    <AccordionTrigger className="w-full flex justify-center hover:no-underline p-0 [&>svg]:text-gray-400">
                                    </AccordionTrigger>
                                </div>
                            </div>
                            <AccordionContent className="p-4 pt-0">
                                <div className="ml-10 border-l-2 border-dashed border-gray-700 pl-8 py-4 space-y-4">
                                    <p className="text-gray-500">Nenhum conteúdo adicionado ainda.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        ))}
                    </Accordion>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-700 py-16">
                     <p className="text-gray-400">Você ainda não adicionou nenhum módulo.</p>
                  </div>
                )}
                 
                 <div className="flex items-center justify-center gap-4">
                    <Button variant="outline" className="gap-2 border-gray-600 bg-gray-800 text-gray-300 hover:bg-gray-700">
                        <Expand size={16} />
                        Expandir
                    </Button>
                    <Dialog open={isAddModuleOpen} onOpenChange={closeAndResetDialog}>
                        <DialogTrigger asChild>
                             <Button className="gap-2 bg-green-600 text-white hover:bg-green-700" onClick={() => setIsAddModuleOpen(true)}>
                                <PlusCircle size={16} />
                                Adicionar Módulo
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#2D3748] border-gray-700 text-white max-w-3xl p-0">
                            <DialogHeader className="p-6">
                                <div className="flex items-start gap-4">
                                <div className="p-2 rounded-lg bg-gray-600/50">
                                    <Folder size={20} />
                                </div>
                                <div>
                                    <DialogTitle className="text-xl">{editingModule ? 'Editar Módulo' : 'Adicionar Módulo'}</DialogTitle>
                                    <DialogDescription className="text-gray-400">
                                        Preencha os campos abaixo
                                    </DialogDescription>
                                </div>
                                </div>
                                <DialogClose asChild>
                                    <button className="absolute right-6 top-6 text-gray-400 hover:text-white" onClick={closeAndResetDialog}>
                                        <X size={20} />
                                    </button>
                                </DialogClose>
                            </DialogHeader>
                            <Tabs defaultValue="general" className="w-full">
                                <div className="px-6 border-b border-gray-700">
                                    <TabsList className="bg-transparent p-0">
                                        <TabsTrigger value="general" className="pb-3 text-gray-300 data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-2px_0_hsl(var(--primary))] rounded-none">Geral</TabsTrigger>
                                        <TabsTrigger value="cover" className="pb-3 text-gray-300 data-[state=active]:text-white data-[state=active]:shadow-[inset_0_-2px_0_hsl(var(--primary))] rounded-none">Cover</TabsTrigger>
                                    </TabsList>
                                </div>
                                <div className="p-6">
                                <TabsContent value="general">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="module-name">Nome do Módulo</Label>
                                                <Input id="module-name" placeholder="Ex: Módulo 1" className="bg-gray-800 border-gray-600" value={newModuleName} onChange={(e) => setNewModuleName(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="relative aspect-[9/12] w-full overflow-hidden rounded-lg bg-gray-800">
                                                {newModuleCoverUrl ? (
                                                    <Image src={newModuleCoverUrl} layout="fill" objectFit="cover" alt="Capa do módulo" />
                                                ) : (
                                                    <div className="flex flex-col h-full items-center justify-center text-gray-500">
                                                        Apareça aqui tambem
                                                    </div>
                                                )}
                                                <Badge className="absolute top-2 right-2 bg-green-600 text-white">0 Aulas</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                <TabsContent value="cover">
                                    <div className="grid grid-cols-3 gap-6">
                                        <div className="col-span-2 space-y-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="cover-url">URL da imagem de capa</Label>
                                                <div className="flex items-center gap-2">
                                                    <Link size={16} className="text-gray-500" />
                                                    <Input 
                                                        id="cover-url"
                                                        placeholder="https://sua-imagem.com/capa.jpg"
                                                        className="border-gray-600 bg-gray-800"
                                                        value={newModuleCoverUrl}
                                                        onChange={(e) => setNewModuleCoverUrl(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                            <Alert className="bg-blue-900/50 border-blue-800">
                                            <Info className="h-4 w-4 text-blue-400" />
                                            <AlertDescription className="text-blue-300">
                                                Tamanho recomendado: 200x300 pixels
                                            </AlertDescription>
                                            </Alert>
                                        </div>
                                        <div className="col-span-1">
                                            <div className="relative aspect-[9/12] w-full overflow-hidden rounded-lg bg-gray-800">
                                                {newModuleCoverUrl ? (
                                                    <Image src={newModuleCoverUrl} layout="fill" objectFit="cover" alt="Capa do módulo" />
                                                ) : (
                                                    <div className="flex flex-col h-full items-center justify-center text-gray-500">
                                                        A imagem do link aparecera aqui
                                                    </div>
                                                )}
                                                <Badge className="absolute top-2 right-2 bg-green-600 text-white">0 Aulas</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </TabsContent>
                                </div>
                            </Tabs>
                            <DialogFooter className="px-6 py-4 bg-gray-800/50 border-t border-gray-700">
                                <Button variant="ghost" onClick={closeAndResetDialog}>Cancelar</Button>
                                <Button className="bg-green-600 hover:bg-green-700" onClick={handleDialogSave}>Salvar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
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
