
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, ChevronDown, ChevronUp, Star } from 'lucide-react';
import ReactPlayer from 'react-player/lazy';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


type Lesson = {
  id: string;
  title: string;
  videoUrl?: string;
};

type Module = {
  id: string;
  name: string;
  lessons?: Lesson[];
};

type MemberArea = {
  id: string;
  name: string;
  slug: string;
  modules?: Module[];
};

export default function LessonPage() {
  const { slug, lessonId } = useParams() as { slug: string; lessonId: string };
  const firestore = useFirestore();
  const router = useRouter();
  const { user } = useUser();

  const [area, setArea] = useState<MemberArea | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [currentModule, setCurrentModule] = useState<Module | null>(null);
  
  const areasQuery = useMemoFirebase(
    () => (firestore && slug ? query(collection(firestore, 'memberAreas'), where('slug', '==', slug), limit(1)) : null),
    [firestore, slug]
  );
  
  const { data: memberAreas, isLoading } = useCollection<MemberArea>(areasQuery);

  useEffect(() => {
    if (memberAreas && memberAreas.length > 0) {
      const currentArea = memberAreas[0];
      setArea(currentArea);

      if (currentArea.modules) {
        for (const module of currentArea.modules) {
          const lesson = module.lessons?.find(l => l.id === lessonId);
          if (lesson) {
            setCurrentLesson(lesson);
            setCurrentModule(module);
            break;
          }
        }
      }
    }
  }, [memberAreas, lessonId]);

  if (isLoading || !area) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Carregando...</div>;
  }
  
  if (!currentLesson) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Aula não encontrada.</div>;
  }

  return (
    <div className="flex h-screen bg-[#1A202C] text-white">
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 relative">
            {currentLesson.videoUrl ? (
                <ReactPlayer
                    url={currentLesson.videoUrl}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    key={lessonId}
                />
            ) : (
                <div className="w-full h-full flex items-center justify-center bg-black">
                    <p>Vídeo não disponível.</p>
                </div>
            )}
        </div>
        <footer className="bg-[#2D3748] p-4 flex justify-between items-center border-t border-gray-700">
            <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={user?.photoURL || ''} />
                    <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-xs text-gray-400">Modulo {currentModule?.name}</p>
                    <h3 className="font-semibold">{currentLesson.title}</h3>
                </div>
            </div>
            <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-gray-500 fill-current" />
                ))}
            </div>
        </footer>
      </main>
      <aside className="w-80 bg-[#2D3748] border-l border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user?.photoURL || ''} />
                      <AvatarFallback>{user?.email?.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.email}</span>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
            <div className="mt-4">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>0%</span>
                    <span>100%</span>
                </div>
                <Progress value={0} className="h-1 bg-gray-700 [&>div]:bg-green-500" />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto">
            <Accordion type="multiple" defaultValue={area.modules?.map(m => m.id)} className="w-full">
                {area.modules?.map(module => (
                    <AccordionItem key={module.id} value={module.id} className="border-b-0">
                        <AccordionTrigger className="px-4 py-3 text-sm font-semibold hover:bg-gray-700/50 hover:no-underline [&[data-state=open]>svg]:text-purple-400">
                            <div className="flex items-center gap-3">
                                <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center", module.id === currentModule?.id ? "border-purple-400" : "border-gray-500")}>
                                     {module.id === currentModule?.id && <div className="h-2 w-2 rounded-full bg-purple-400" />}
                                </div>
                                <span>{module.name}</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 pr-4 pb-2">
                            <ul className="space-y-1 border-l-2 border-gray-700 pl-4">
                                {module.lessons?.map(lesson => (
                                    <li key={lesson.id}>
                                        <button onClick={() => router.push(`/membros/${slug}/${lesson.id}`)} className={cn("w-full text-left flex items-center gap-3 p-2 rounded-md transition-colors text-sm", 
                                            lesson.id === lessonId ? 'bg-purple-500/20 text-purple-300' : 'text-gray-400 hover:bg-gray-700/50'
                                        )}>
                                            <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center flex-shrink-0", lesson.id === lessonId ? "border-purple-400" : "border-gray-500")}>
                                                 {lesson.id === lessonId && <CheckCircle className="h-4 w-4 text-purple-400" />}
                                            </div>
                                            <span className="flex-1">{lesson.title}</span>
                                        </button>
                                    </li>
                                ))}
                                 <li >
                                    <div className="flex items-center gap-3 p-2 text-sm text-gray-500">
                                       <div className="h-5 w-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
                                       <span className="flex-1">Conclusão</span>
                                    </div>
                                </li>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
      </aside>
    </div>
  );
}
