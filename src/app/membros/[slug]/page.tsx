
'use client';

import { useEffect, useState } from 'react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { Progress } from '@/components/ui/progress';

type Lesson = {
  id: string;
  title: string;
};

type Module = {
  id: string;
  name: string;
  coverImageUrl?: string;
  lessons?: Lesson[];
};

type MemberArea = {
  id: string;
  name: string;
  slug: string;
  headerImageUrl?: string;
  modules?: Module[];
};

export default function MemberAreaPublicPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const firestore = useFirestore();

  const areasQuery = useMemoFirebase(
    () =>
      firestore && slug
        ? query(collection(firestore, 'memberAreas'), where('slug', '==', slug), limit(1))
        : null,
    [firestore, slug]
  );

  const { data: memberAreas, isLoading } = useCollection<MemberArea>(areasQuery);

  const [area, setArea] = useState<MemberArea | null>(null);

  useEffect(() => {
    if (memberAreas && memberAreas.length > 0) {
      setArea(memberAreas[0]);
    }
  }, [memberAreas]);

  const handleModuleClick = (moduleId: string) => {
    if (!area) return;
    const module = area.modules?.find(m => m.id === moduleId);
    const firstLessonId = module?.lessons?.[0]?.id;
    if (firstLessonId) {
      router.push(`/membros/${area.slug}/${firstLessonId}`);
    } else {
      // Opcional: lidar com módulos sem aulas
      console.log("Este módulo não tem aulas.");
    }
  };


  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Carregando área de membros...</div>;
  }

  if (!area) {
    return <div className="flex min-h-screen items-center justify-center bg-gray-900 text-white">Área de membros não encontrada.</div>;
  }
  
  const totalModules = area.modules?.length || 0;

  return (
    <div className="w-full min-h-screen bg-[#1A202C] text-white">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {area.modules?.map(module => (
                <div key={module.id} className="group cursor-pointer" onClick={() => handleModuleClick(module.id)}>
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-gray-800 transition-transform group-hover:scale-105">
                    {module.coverImageUrl ? (
                    <Image
                        src={module.coverImageUrl}
                        alt={`Capa do ${module.name}`}
                        layout="fill"
                        objectFit="cover"
                    />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-gray-500">
                        <span>{module.name}</span>
                        </div>
                    )}
                    <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                        {module.lessons?.length || 0} Aula{module.lessons?.length !== 1 ? 's' : ''}
                    </div>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </div>
  );
}
