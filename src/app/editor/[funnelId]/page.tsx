
'use client';

import React, { Suspense, useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useDoc, useFirestore, useMemoFirebase, useUser } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useDebouncedCallback } from 'use-debounce';
import { StandardFunnelEditor } from '@/components/editor/StandardFunnelEditor';
import { TypebotEditor } from '@/components/editor/TypebotEditor';
import type { Funnel, Step, CanvasBlock } from '@/components/editor/types';
import { useToast } from '@/hooks/use-toast';


function FunnelEditorContent() {
  const { funnelId } = useParams() as { funnelId: string };
  const firestore = useFirestore();
  const { user } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  const funnelRef = useMemoFirebase(
    () => (funnelId ? doc(firestore, 'funnels', funnelId) : null),
    [firestore, funnelId]
  );
  
  const { data: funnelData, isLoading } = useDoc<Omit<Funnel, 'id'>>(funnelRef);

  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [permissionChecked, setPermissionChecked] = useState(false);

  useEffect(() => {
    if (isLoading || !user) return; // Wait for data and user to be available

    if (funnelData) {
      if (funnelData.userId !== user.uid) {
        toast({
            variant: "destructive",
            title: "Acesso Negado",
            description: "Você não tem permissão para editar este funil.",
        });
        router.push('/dashboard/funis');
        return;
      }
      
      const initialFunnel: Funnel = {
        id: funnelId,
        ...funnelData,
        steps: funnelData.steps || (funnelData.type === 'typebot' ? [] : [{ id: Date.now(), name: 'Etapa 1', components: [] }]),
      };
      setFunnel(initialFunnel);
    }
    setPermissionChecked(true); // Mark permission check as complete

  }, [funnelData, funnelId, user, router, toast, isLoading]);
  
  const debouncedUpdateFunnel = useDebouncedCallback((updatedFunnel: Funnel) => {
    if (funnelRef) {
      const funnelToSave = JSON.parse(JSON.stringify(updatedFunnel));
      
      if (funnelToSave.steps) {
        if(funnelToSave.type === 'typebot') {
            (funnelToSave.steps as CanvasBlock[]).forEach((block: CanvasBlock) => {
                if(block.children) {
                    block.children.forEach((child: any) => {
                       if (child.props && child.props.icon) {
                         delete child.props.icon;
                       }
                    })
                }
            })
        } else {
             (funnelToSave.steps as Step[]).forEach((step: Step) => {
              if (step.components) {
                step.components.forEach((component: any) => {
                  if (component.props && component.props.icon) {
                    delete component.props.icon;
                  }
                });
              }
            });
        }
      }
      
      const { id, ...rest } = funnelToSave;
      updateDoc(funnelRef, rest);
    }
  }, 500);

  useEffect(() => {
    if (funnel) {
      debouncedUpdateFunnel(funnel);
    }
  }, [funnel, debouncedUpdateFunnel]);

  if (isLoading || !permissionChecked || !funnel || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando editor...
      </div>
    );
  }
  
  if (funnel.type === 'typebot') {
    return <TypebotEditor funnel={funnel} setFunnel={setFunnel} debouncedUpdateFunnel={debouncedUpdateFunnel} />;
  }

  return <StandardFunnelEditor 
    funnel={funnel}
    setFunnel={setFunnel}
    debouncedUpdateFunnel={debouncedUpdateFunnel}
  />;
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FunnelEditorContent />
    </Suspense>
  );
}
