

'use client';

import {
  ArrowLeft,
  BookOpen,
  Users,
  Pencil,
  Video,
  PlusCircle,
  Eye,
  Info,
  Link as LinkIcon,
  Folder,
  X,
  ImageIcon,
  GripVertical,
  MoreVertical,
  ShoppingBag,
  ExternalLink,
  Trash2,
  Share2,
  DollarSign,
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
import { MemberAreaPreview } from '@/components/dashboard/area-de-membros/MemberAreaPreview';
import { Textarea } from '@/components/ui/textarea';


type Lesson = {
    id: string;
    title: string;
    // add other lesson properties here
};

type Product = {
    id: string;
    title: string;
    url: string;
}

type Module = {
  id: string;
  name: string;
  coverImageUrl?: string;
  lessons: Lesson[];
  products?: Product[];
};

type Upsell = {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl?: string;
  url: string;
};


type MemberArea = {
  name: string;
  slug: string;
  headerImageUrl?: string;
  modules?: Module[];
  upsells?: Upsell[];
};

export default function MemberAreaEditorPage() {
  const router = useRouter();
  const { areaId } = useParams() as { areaId: string };
  const firestore = useFirestore();
  const { toast } = useToast();
  
  const [headerUrl, setHeaderUrl] = useState('');
  const [isAddModuleOpen, setIsAddModuleOpen] = useState(false);
  const [isAddUpsellOpen, setIsAddUpsellOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const [newModuleName, setNewModuleName] = useState('');
  const [newModuleCoverUrl, setNewModuleCoverUrl] = useState('');

  const [editingModule, setEditingModule] = useState<Module | null>(null);

  const [newUpsell, setNewUpsell] = useState<Partial<Upsell>>({});
  const [editingUpsell, setEditingUpsell] = useState<Upsell | null>(null);


  const areaRef = useMemoFirebase(
    () => (firestore && areaId ? doc(firestore, 'memberAreas', areaId) : null),
    [firestore, areaId]
  );

  const { data: areaData, isLoading } = useDoc<MemberArea>(areaRef);

  const handleShare = () => {
    if (!areaData) return;
    const shareUrl = `${window.location.origin}/membros/${areaData.slug}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
        toast({
            title: "Link copiado!",
            description: "O link da sua área de membros foi copiado para a área de transferência.",
        });
    }).catch(err => {
        toast({
            variant: "destructive",
            title: "Erro ao copiar",
            description: "Não foi possível copiar o link.",
        });
        console.error('Failed to copy: ', err);
    });
  };

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
    if (!areaRef || !newModuleName.trim() || !areaData) {
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: !newModuleName.trim() ? 'O nome do módulo é obrigatório.' : 'Dados da área não carregados.',
      });
      return;
    }
  
    const newModule: Module = {
      id: new Date().toISOString(),
      name: newModuleName,
      coverImageUrl: newModuleCoverUrl,
      lessons: [],
      products: [],
    };
  
    try {
      const updatedModules = areaData.modules ? arrayUnion(newModule) : [newModule];
      
      await updateDoc(areaRef, {
        modules: updatedModules,
      });
      
      toast({ title: 'Sucesso!', description: 'Módulo adicionado.' });
      closeAndResetModuleDialog();
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Erro',
        description: 'Não foi possível adicionar o módulo.',
      });
    }
  };

  const handleOpenEditModuleDialog = (module: Module) => {
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
      closeAndResetModuleDialog();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível atualizar o módulo.' });
    }
  };

  const closeAndResetModuleDialog = () => {
    setIsAddModuleOpen(false);
    setEditingModule(null);
    setNewModuleName('');
    setNewModuleCoverUrl('');
  };

  const handleModuleDialogSave = () => {
    if (editingModule) {
      handleUpdateModule();
    } else {
      handleAddModule();
    }
  };

  const handleDeleteLesson = async (moduleId: string, lessonId: string) => {
    if (!areaRef || !areaData) return;

    const updatedModules = areaData.modules?.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          lessons: m.lessons.filter(l => l.id !== lessonId),
        };
      }
      return m;
    });

    try {
      await updateDoc(areaRef, { modules: updatedModules });
      toast({ title: 'Sucesso!', description: 'Aula excluída.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível excluir a aula.' });
    }
  };

  const handleDeleteProduct = async (moduleId: string, productId: string) => {
    if (!areaRef || !areaData) return;

    const updatedModules = areaData.modules?.map(m => {
      if (m.id === moduleId) {
        return {
          ...m,
          products: m.products?.filter(p => p.id !== productId),
        };
      }
      return m;
    });

    try {
      await updateDoc(areaRef, { modules: updatedModules });
      toast({ title: 'Sucesso!', description: 'Produto excluído.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível excluir o produto.' });
    }
  };

  const handleAddUpsell = async () => {
    if (!areaRef || !newUpsell.name || !newUpsell.url || !newUpsell.price || !areaData) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Todos os campos do upsell são obrigatórios.' });
      return;
    }
    const upsellToAdd: Upsell = {
      id: new Date().toISOString(),
      name: newUpsell.name,
      description: newUpsell.description || '',
      price: newUpsell.price,
      url: newUpsell.url,
      imageUrl: newUpsell.imageUrl,
    };

    try {
      const updatedUpsells = areaData.upsells ? arrayUnion(upsellToAdd) : [upsellToAdd];
      await updateDoc(areaRef, { upsells: updatedUpsells });
      toast({ title: 'Sucesso!', description: 'Upsell adicionado.' });
      closeAndResetUpsellDialog();
    } catch (error) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível adicionar o upsell.' });
    }
  };

  const handleUpdateUpsell = async () => {
    if (!areaRef || !editingUpsell || !newUpsell.name || !newUpsell.url || !newUpsell.price || !areaData) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Todos os campos do upsell são obrigatórios.' });
      return;
    }

    const updatedUpsells = areaData.upsells?.map(u => 
      u.id === editingUpsell.id ? { ...u, ...newUpsell } : u
    );

    try {
      await updateDoc(areaRef, { upsells: updatedUpsells });
      toast({ title: 'Sucesso!', description: 'Upsell atualizado.' });
      closeAndResetUpsellDialog();
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível atualizar o upsell.' });
    }
  };

  const handleDeleteUpsell = async (upsellId: string) => {
    if (!areaRef || !areaData) return;
    const updatedUpsells = areaData.upsells?.filter(u => u.id !== upsellId);
    try {
      await updateDoc(areaRef, { upsells: updatedUpsells });
      toast({ title: 'Sucesso!', description: 'Upsell excluído.' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Erro', description: 'Não foi possível excluir o upsell.' });
    }
  };

  const handleUpsellDialogSave = () => {
    if (editingUpsell) {
      handleUpdateUpsell();
    } else {
      handleAddUpsell();
    }
  };

  const closeAndResetUpsellDialog = () => {
    setIsAddUpsellOpen(false);
    setEditingUpsell(null);
    setNewUpsell({});
  };

  const handleOpenEditUpsellDialog = (upsell: Upsell) => {
    setEditingUpsell(upsell);
    setNewUpsell(upsell);
    setIsAddUpsellOpen(true);
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
           <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white">
                    <Eye size={16} />
                    Pré-Visualizar Curso
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl w-full p-0 bg-transparent border-none shadow-none">
               <DialogHeader className="sr-only">
                <DialogTitle>Pré-visualização da Área de Membros</DialogTitle>
                <DialogDescription>
                  Esta é uma pré-visualização de como sua área de membros aparecerá para seus alunos.
                </DialogDescription>
              </DialogHeader>
              {areaData && <MemberAreaPreview area={areaData} />}
            </DialogContent>
          </Dialog>
           <Button variant="outline" className="gap-2 border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white" onClick={handleShare}>
                <Share2 size={16} />
                Compartilhar
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
                                <LinkIcon size={16} className="text-gray-500" />
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
                  <div className="w-full space-y-4">
                    <h3 className="text-lg font-semibold">Módulos</h3>
                    {areaData.modules.map((module) => (
                      <div key={module.id} className="rounded-lg bg-gray-800/50 border border-gray-700 overflow-hidden">
                        <div className="flex justify-between items-center p-4">
                            <div className="flex items-center gap-4 flex-1">
                                <GripVertical className="cursor-grab text-gray-500" />
                                <span className="font-semibold">{module.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Badge className="bg-blue-900/50 text-blue-300 border-blue-800">{(module.lessons?.length || 0) + (module.products?.length || 0)} Conteúdo</Badge>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-gray-700 border-gray-600 text-white">
                                        <DropdownMenuItem className="focus:bg-gray-600" onClick={() => handleOpenEditModuleDialog(module)}>Editar</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-400 focus:bg-red-900/50 focus:text-red-300">Excluir</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 px-4 pt-4 pb-2">
                            <div className="ml-10 border-l-2 border-dashed border-gray-700 pl-8 pb-4 space-y-4 relative">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <button className="absolute -left-4 -top-4 flex items-center justify-center h-8 w-8 rounded-full bg-green-600 text-white hover:bg-green-700 z-10">
                                            <PlusCircle size={16} />
                                        </button>
                                    </PopoverTrigger>
                                    <PopoverContent side="bottom" align="start" className="bg-[#2D3748] border-gray-700 text-white w-auto p-2">
                                        <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push(`/dashboard/area-de-membros/editor/${areaId}/novo-conteudo?moduleId=${module.id}`)}>
                                            <Video size={16}/>
                                            Video Aula
                                        </Button>
                                        <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => router.push(`/dashboard/area-de-membros/editor/${areaId}/novo-produto?moduleId=${module.id}`)}>
                                            <ShoppingBag size={16}/>
                                            Produto
                                        </Button>
                                    </PopoverContent>
                                </Popover>
                                
                               {(!module.lessons || module.lessons.length === 0) && (!module.products || module.products.length === 0) ? (
                                    <p className="text-gray-500">Nenhum conteúdo adicionado ainda.</p>
                                ) : (
                                  <>
                                    {module.lessons?.map(lesson => (
                                        <div key={lesson.id} className="flex items-center gap-4 bg-gray-800/50 p-3 rounded-md">
                                            <GripVertical className="cursor-grab text-gray-500" />
                                            <Video size={16} className="text-gray-400" />
                                            <span className="flex-1 text-sm font-medium">{lesson.title}</span>
                                            <Badge className="bg-green-900/50 text-green-300 border-green-800 text-xs">Publicado</Badge>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                                <ExternalLink size={16} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => router.push(`/dashboard/area-de-membros/editor/${areaId}/novo-conteudo?moduleId=${module.id}&lessonId=${lesson.id}`)}>
                                                <Pencil size={16} />
                                            </Button>
                                            <Dialog>
                                              <DialogTrigger asChild>
                                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/80 hover:text-red-400">
                                                      <Trash2 size={16} />
                                                  </Button>
                                              </DialogTrigger>
                                              <DialogContent className="bg-[#2D3748] border-gray-700 text-white">
                                                <DialogHeader>
                                                  <DialogTitle>Confirmar exclusão</DialogTitle>
                                                  <DialogDescription className="text-gray-400">
                                                    Tem certeza que deseja excluir a aula "{lesson.title}"? Essa ação não pode ser desfeita.
                                                  </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                  <DialogClose asChild>
                                                    <Button variant="ghost">Cancelar</Button>
                                                  </DialogClose>
                                                  <Button variant="destructive" onClick={() => handleDeleteLesson(module.id, lesson.id)}>Excluir</Button>
                                                </DialogFooter>
                                              </DialogContent>
                                            </Dialog>
                                        </div>
                                    ))}
                                    {module.products?.map(product => (
                                        <div key={product.id} className="flex items-center gap-4 bg-gray-800/50 p-3 rounded-md">
                                            <GripVertical className="cursor-grab text-gray-500" />
                                            <ShoppingBag size={16} className="text-gray-400" />
                                            <span className="flex-1 text-sm font-medium">{product.title}</span>
                                            <Badge className="bg-green-900/50 text-green-300 border-green-800 text-xs">Publicado</Badge>
                                            <a href={product.url} target="_blank" rel="noopener noreferrer">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                                                    <ExternalLink size={16} />
                                                </Button>
                                            </a>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => { /* TODO: edit product */ }}>
                                                <Pencil size={16} />
                                            </Button>
                                            <Dialog>
                                              <DialogTrigger asChild>
                                                  <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500/80 hover:text-red-400">
                                                      <Trash2 size={16} />
                                                  </Button>
                                              </DialogTrigger>
                                              <DialogContent className="bg-[#2D3748] border-gray-700 text-white">
                                                <DialogHeader>
                                                  <DialogTitle>Confirmar exclusão</DialogTitle>
                                                  <DialogDescription className="text-gray-400">
                                                    Tem certeza que deseja excluir o produto "{product.title}"? Essa ação não pode ser desfeita.
                                                  </DialogDescription>
                                                </DialogHeader>
                                                <DialogFooter>
                                                  <DialogClose asChild>
                                                    <Button variant="ghost">Cancelar</Button>
                                                  </DialogClose>
                                                  <Button variant="destructive" onClick={() => handleDeleteProduct(module.id, product.id)}>Excluir</Button>
                                                </DialogFooter>
                                              </DialogContent>
                                            </Dialog>
                                        </div>
                                    ))}
                                  </>
                                )}
                            </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-700 py-16">
                     <p className="text-gray-400">Você ainda não adicionou nenhum módulo.</p>
                  </div>
                )}
                
                {areaData?.upsells && areaData.upsells.length > 0 && (
                  <div className="w-full space-y-4">
                     <h3 className="text-lg font-semibold">Upsells</h3>
                     {areaData.upsells.map(upsell => (
                        <div key={upsell.id} className="rounded-lg bg-gray-800/50 border border-gray-700 p-4 flex justify-between items-center">
                           <div className="flex items-center gap-4">
                              <DollarSign className="text-green-500"/>
                              <div>
                                 <p className="font-semibold">{upsell.name}</p>
                                 <p className="text-sm text-gray-400">{upsell.description}</p>
                              </div>
                           </div>
                           <div className="flex items-center gap-2">
                               <Badge className="bg-yellow-900/50 text-yellow-300 border-yellow-800">{upsell.price}</Badge>
                               <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-gray-700 border-gray-600 text-white">
                                        <DropdownMenuItem className="focus:bg-gray-600" onClick={() => handleOpenEditUpsellDialog(upsell)}>Editar</DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-400 focus:bg-red-900/50 focus:text-red-300" onClick={() => handleDeleteUpsell(upsell.id)}>Excluir</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                           </div>
                        </div>
                     ))}
                  </div>
                )}

                 <div className="flex items-center justify-center gap-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button className="gap-2 bg-green-600 text-white hover:bg-green-700">
                          <PlusCircle size={16} />
                          Adicionar Conteúdo
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-700 border-gray-600 text-white">
                        <DropdownMenuItem className="focus:bg-gray-600 gap-2" onClick={() => setIsAddModuleOpen(true)}>
                          <Folder size={16} />
                          Módulo
                        </DropdownMenuItem>
                        <DropdownMenuItem className="focus:bg-gray-600 gap-2" onClick={() => setIsAddUpsellOpen(true)}>
                          <DollarSign size={16} />
                          Upsell
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <Dialog open={isAddModuleOpen} onOpenChange={(open) => { if (!open) closeAndResetModuleDialog(); else setIsAddModuleOpen(true);}}>
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
                                                    <div className="flex flex-col h-full items-center justify-center text-gray-500 text-center">
                                                        Foto, Banner modulo
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
                                                    <LinkIcon size={16} className="text-gray-500" />
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
                                                    <div className="flex flex-col h-full items-center justify-center text-gray-500 text-center">
                                                        Foto, Banner modulo
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
                                <Button variant="ghost" onClick={closeAndResetModuleDialog}>Cancelar</Button>
                                <Button className="bg-green-600 hover:bg-green-700" onClick={handleModuleDialogSave}>Salvar</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isAddUpsellOpen} onOpenChange={(open) => { if (!open) closeAndResetUpsellDialog(); else setIsAddUpsellOpen(true);}}>
                        <DialogContent className="bg-[#2D3748] border-gray-700 text-white max-w-lg">
                            <DialogHeader>
                                <DialogTitle>{editingUpsell ? 'Editar Upsell' : 'Adicionar Upsell'}</DialogTitle>
                                <DialogDescription>Crie uma oferta especial para seus membros.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="upsell-name">Nome da Oferta</Label>
                                    <Input id="upsell-name" value={newUpsell.name || ''} onChange={(e) => setNewUpsell({...newUpsell, name: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="upsell-desc">Descrição</Label>
                                    <Textarea id="upsell-desc" value={newUpsell.description || ''} onChange={(e) => setNewUpsell({...newUpsell, description: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="upsell-price">Preço</Label>
                                    <Input id="upsell-price" placeholder="Ex: R$ 97,00" value={newUpsell.price || ''} onChange={(e) => setNewUpsell({...newUpsell, price: e.target.value})} />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="upsell-image-url">URL da Imagem (Opcional)</Label>
                                    <Input id="upsell-image-url" placeholder="https://..." value={newUpsell.imageUrl || ''} onChange={(e) => setNewUpsell({...newUpsell, imageUrl: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="upsell-url">URL de Destino</Label>
                                    <Input id="upsell-url" placeholder="https://seu-checkout.com" value={newUpsell.url || ''} onChange={(e) => setNewUpsell({...newUpsell, url: e.target.value})} />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button variant="ghost" onClick={closeAndResetUpsellDialog}>Cancelar</Button>
                                <Button className="bg-green-600 hover:bg-green-700" onClick={handleUpsellDialogSave}>Salvar</Button>
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
