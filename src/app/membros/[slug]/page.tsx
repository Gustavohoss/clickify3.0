
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Play, PlayCircle, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, ShoppingBag, DollarSign } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import ReactPlayer from 'react-player/lazy';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

type Lesson = {
  id: string;
  title: string;
  videoUrl?: string;
};

type Product = {
    id: string;
    title: string;
    url: string;
}

type Upsell = {
  id: string;
  name: string;
  description: string;
  price: string;
  compareAtPrice?: string;
  imageUrl?: string;
  url: string;
  showPrice?: boolean;
};

type Module = {
  id: string;
  name: string;
  coverImageUrl?: string;
  lessons?: Lesson[];
  products?: Product[];
};

type MemberArea = {
  id: string;
  name: string;
  slug: string;
  headerImageUrl?: string;
  modules?: Module[];
  upsellsTitle?: string;
  upsells?: Upsell[];
};

export default function MemberAreaPublicPage() {
  const { slug } = useParams() as { slug: string };
  const firestore = useFirestore();

  const [area, setArea] = useState<MemberArea | null>(null);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const areasQuery = useMemoFirebase(
    () => (firestore && slug ? query(collection(firestore, 'memberAreas'), where('slug', '==', slug), limit(1)) : null),
    [firestore, slug]
  );

  const { data: memberAreas, isLoading } = useCollection<MemberArea>(areasQuery);

  useEffect(() => {
    if (memberAreas && memberAreas.length > 0) {
      setArea(memberAreas[0]);
    }
  }, [memberAreas]);

  const handleModuleClick = (module: Module) => {
    // Only open modal if there are lessons or products
    if ((module.lessons && module.lessons.length > 0) || (module.products && module.products.length > 0)) {
        setSelectedModule(module);
        // Set the first lesson as active if it exists
        if (module.lessons && module.lessons.length > 0) {
            setActiveLesson(module.lessons[0]);
        } else {
            setActiveLesson(null); // No lessons, so no active lesson
        }
    }
  };

  const handleLessonSelect = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };
  
  const handleNavigation = (direction: 'next' | 'prev') => {
    if (!selectedModule || !activeLesson || !selectedModule.lessons) return;
    const currentIndex = selectedModule.lessons.findIndex(l => l.id === activeLesson.id);
    const newIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;

    if (newIndex >= 0 && newIndex < selectedModule.lessons.length) {
      setActiveLesson(selectedModule.lessons[newIndex]);
    }
  };


  const isModalOpen = !!selectedModule;
  const closeModal = () => {
    setSelectedModule(null);
    setActiveLesson(null);
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Carregando área de membros...</div>;
  }

  if (!area) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Área de membros não encontrada.</div>;
  }
  
  const totalModules = area.modules?.length || 0;

  return (
    <div className="w-full h-screen bg-[#1A202C] text-white overflow-y-auto">
      <div className="relative h-60 w-full">
        {area.headerImageUrl ? (
          <Image
            src={area.headerImageUrl}
            alt="Header"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
        ) : (
          <div className="bg-gray-800 h-full w-full" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C] to-transparent" />
      </div>

      <div className="p-8 -mt-20 relative z-10">
        <h1 className="text-3xl font-bold">{area.name}</h1>
        <p className="text-gray-400 mt-1">{totalModules} Módulo{totalModules !== 1 ? 's' : ''}</p>

        <div className="mt-4 flex items-center gap-4">
          <Progress value={0} className="w-32 bg-gray-700 [&>div]:bg-green-500" />
          <span className="text-gray-400 text-sm">0%</span>
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">Meus cursos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
            {area.modules?.map(module => (
              <div key={module.id} className="group cursor-pointer" onClick={() => handleModuleClick(module)}>
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-800 transition-transform group-hover:scale-105">
                  {module.coverImageUrl ? (
                    <Image
                      src={module.coverImageUrl}
                      alt={`Capa do ${module.name}`}
                      layout="fill"
                      objectFit="cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-gray-500 text-center p-4">
                      <span>{module.name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                    {(module.lessons?.length || 0) + (module.products?.length || 0)} Conteúdo(s)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {area.upsells && area.upsells.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold mb-4">{area.upsellsTitle || 'Ofertas Especiais'}</h2>
             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
              {area.upsells.map(upsell => (
                 <a key={upsell.id} href={upsell.url} target="_blank" rel="noopener noreferrer" className="group cursor-pointer">
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-800 transition-transform group-hover:scale-105">
                      {upsell.imageUrl ? (
                        <Image src={upsell.imageUrl} alt={upsell.name} layout="fill" objectFit="cover" />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-500 p-4 text-center">
                          <span>{upsell.name}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end">
                        <h3 className="font-bold text-lg">{upsell.name}</h3>
                        <p className="text-sm text-gray-300">{upsell.description}</p>
                        {upsell.showPrice && (
                          <div className="mt-2 flex items-baseline gap-2">
                             {upsell.compareAtPrice && <s className="text-gray-400 text-md">{upsell.compareAtPrice}</s>}
                             <p className="text-lg font-bold text-green-400">{upsell.price}</p>
                          </div>
                        )}
                      </div>
                    </div>
                 </a>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <Dialog open={isModalOpen} onOpenChange={(isOpen) => !isOpen && closeModal()}>
        <DialogContent className="max-w-6xl w-full p-0 bg-[#171923] border-gray-700 shadow-2xl text-white flex flex-col h-[90vh] overflow-hidden">
           {selectedModule && (
            <>
              <DialogHeader className='p-4 border-b border-gray-700 shrink-0'>
                <DialogTitle>{selectedModule.name}</DialogTitle>
                <DialogClose className="text-white/50" />
              </DialogHeader>
              <div className="flex-1 flex overflow-hidden">
                <div className="flex-[3] flex flex-col">
                  <div className="flex-1 relative bg-black">
                    {activeLesson && activeLesson.videoUrl ? (
                      <ReactPlayer
                        url={activeLesson.videoUrl}
                        width="100%"
                        height="100%"
                        controls
                        playing
                        key={activeLesson.id}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/50">
                        <p>Selecione uma aula para começar.</p>
                      </div>
                    )}
                  </div>
                   {activeLesson && (
                    <footer className="bg-[#2D3748] p-4 flex justify-between items-center border-t border-gray-700 shrink-0">
                          <div>
                              <h3 className="font-semibold">{activeLesson.title}</h3>
                              <p className="text-xs text-gray-400">
                                  Aula {selectedModule.lessons!.findIndex(l => l.id === activeLesson.id) + 1} de {selectedModule.lessons!.length}
                              </p>
                          </div>
                          <div className="flex items-center gap-2">
                               <Button variant="outline" className="text-white border-gray-500 hover:bg-gray-600 gap-2">
                                  <CheckCircle size={16} /> Marcar como concluída
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleNavigation('prev')}>
                                  <ChevronLeft />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleNavigation('next')}>
                                  <ChevronRight />
                              </Button>
                          </div>
                    </footer>
                   )}
                </div>
                <aside className='flex-[1] border-l border-gray-700 bg-[#1A202C]'>
                    <ScrollArea className="h-full">
                        <div className="p-4 space-y-4">
                             {selectedModule.lessons && selectedModule.lessons.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-semibold text-gray-400 px-3">Vídeo Aulas</h4>
                                    {selectedModule.lessons.map((lesson, index) => (
                                        <button key={lesson.id} onClick={() => handleLessonSelect(lesson)} className={cn(
                                            "w-full text-left p-3 rounded-md flex items-center gap-3 transition-colors",
                                            activeLesson?.id === lesson.id ? "bg-white/10" : "hover:bg-white/5"
                                        )}>
                                            <PlayCircle className={cn("h-5 w-5", activeLesson?.id === lesson.id ? "text-green-400" : "text-gray-500")} />
                                            <div className='flex-1'>
                                                <p className="text-sm font-medium">{lesson.title}</p>
                                                <p className="text-xs text-gray-400">Aula {index + 1}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            )}

                            {selectedModule.products && selectedModule.products.length > 0 && (
                                <div className="space-y-2">
                                     <h4 className="text-sm font-semibold text-gray-400 px-3 pt-4">Produtos</h4>
                                    {selectedModule.products.map((product) => (
                                        <a key={product.id} href={product.url} target="_blank" rel="noopener noreferrer" className="w-full text-left p-3 rounded-md flex items-center gap-3 transition-colors hover:bg-white/5">
                                            <ShoppingBag className="h-5 w-5 text-gray-500" />
                                            <div className='flex-1'>
                                                <p className="text-sm font-medium">{product.title}</p>
                                                <p className="text-xs text-gray-400">Produto</p>
                                            </div>
                                            <ExternalLink className="h-4 w-4 text-gray-500" />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </aside>
              </div>
            </>
           )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
