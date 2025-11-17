
'use client';

import { useEffect, useState, useMemo } from 'react';
import { useCollection, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CheckCircle, ChevronDown, ShoppingBag, Video } from 'lucide-react';
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

type Product = {
    id: string;
    title: string;
    url: string;
};

type Module = {
  id: string;
  name: string;
  lessons?: Lesson[];
  products?: Product[];
};

type MemberArea = {
  id: string;
  name: string;
  slug: string;
  modules?: Module[];
};

function MemberAreaSidebar() {
    const { slug, lessonId } = useParams() as { slug: string; lessonId?: string };
    const firestore = useFirestore();
    const router = useRouter();
    const { user } = useUser();

    const [area, setArea] = useState<MemberArea | null>(null);
    const [currentModuleId, setCurrentModuleId] = useState<string | null>(null);

    const areasQuery = useMemoFirebase(
        () => (firestore && slug ? query(collection(firestore, 'memberAreas'), where('slug', '==', slug), limit(1)) : null),
        [firestore, slug]
    );
    
    const { data: memberAreas, isLoading } = useCollection<MemberArea>(areasQuery);

    useEffect(() => {
        if (memberAreas && memberAreas.length > 0) {
        const currentArea = memberAreas[0];
        setArea(currentArea);

        if (lessonId && currentArea.modules) {
            for (const module of currentArea.modules) {
            const lesson = module.lessons?.find(l => l.id === lessonId);
            if (lesson) {
                setCurrentModuleId(module.id);
                break;
            }
            }
        }
        }
    }, [memberAreas, lessonId]);
    
    if (isLoading || !area) {
        return (
             <aside className="w-80 bg-[#2D3748] border-l border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-700">
                    <div className="animate-pulse flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-gray-600"></div>
                        <div className="h-4 w-24 rounded bg-gray-600"></div>
                    </div>
                </div>
                 <div className="flex-1 p-4 space-y-4">
                    <div className="h-8 rounded bg-gray-700"></div>
                    <div className="h-8 rounded bg-gray-700"></div>
                    <div className="h-8 rounded bg-gray-700"></div>
                </div>
             </aside>
        )
    }

    return (
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
                                    <div className={cn("h-5 w-5 rounded-full border-2 flex items-center justify-center", module.id === currentModuleId ? "border-purple-400" : "border-gray-500")}>
                                        {module.id === currentModuleId && <div className="h-2 w-2 rounded-full bg-purple-400" />}
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
                                                <div className="h-5 w-5 flex items-center justify-center flex-shrink-0 text-gray-400">
                                                    <Video size={16} />
                                                </div>
                                                <span className="flex-1">{lesson.title}</span>
                                            </button>
                                        </li>
                                    ))}
                                    {module.products?.map(product => (
                                        <li key={product.id}>
                                            <a href={product.url} target="_blank" rel="noopener noreferrer" className="w-full text-left flex items-center gap-3 p-2 rounded-md transition-colors text-sm text-gray-400 hover:bg-gray-700/50">
                                                <div className="h-5 w-5 flex items-center justify-center flex-shrink-0 text-gray-400">
                                                    <ShoppingBag size={16} />
                                                </div>
                                                <span className="flex-1">{product.title}</span>
                                            </a>
                                        </li>
                                    ))}
                                    {(!module.lessons || module.lessons.length === 0) && (!module.products || module.products.length === 0) && (
                                        <li >
                                            <div className="flex items-center gap-3 p-2 text-sm text-gray-500">
                                            <div className="h-5 w-5 rounded-full border-2 border-gray-600 flex-shrink-0" />
                                            <span className="flex-1">Nenhum conteúdo</span>
                                            </div>
                                        </li>
                                    )}
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </aside>
    );
}

export default function MemberAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[#1A202C] text-white">
      <main className="flex-1 flex flex-col overflow-hidden">
        {children}
      </main>
      <MemberAreaSidebar />
    </div>
  );
}
