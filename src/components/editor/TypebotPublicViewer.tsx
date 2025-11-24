
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, where, limit } from 'firebase/firestore';
import type { Funnel, CanvasBlock, ButtonItem, ImageChoice } from './types.tsx';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.tsx';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { TypingIndicator } from './typebot/ui/TypingIndicator.tsx';

type PreviewMessage = {
  id: number;
  sender: 'bot' | 'user';
  content: React.ReactNode;
  isTyping?: boolean;
};

const PreviewButtons = ({ buttons, onButtonClick, sender }: { buttons: ButtonItem[], onButtonClick: (buttonIndex: number) => void, sender: 'bot' | 'user' }) => {
    return (
        <div className={cn("flex gap-2 my-2 flex-wrap", sender === 'user' ? 'justify-end' : 'justify-start')}>
            {buttons.map((button, index) => (
                <Button
                    key={index}
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={() => onButtonClick(index)}
                >
                    {button.text}
                </Button>
            ))}
        </div>
    );
};

const PreviewImageChoices = ({ choices, onImageClick }: { choices: ImageChoice[], onImageClick: (choiceIndex: number) => void }) => {
    return (
        <div className="flex flex-col items-end gap-2 my-2">
            {choices.map((choice, index) => (
                <button
                    key={index}
                    className="w-48 rounded-lg overflow-hidden border-2 border-transparent hover:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onClick={() => onImageClick(index)}
                >
                    <div className="relative aspect-video">
                        <Image
                            src={choice.imageUrl}
                            alt={`Choice ${index + 1}`}
                            layout="fill"
                            objectFit="cover"
                        />
                         <div className="absolute bottom-0 w-full h-1/4 bg-orange-500/80 backdrop-blur-sm" />
                    </div>
                </button>
            ))}
        </div>
    );
};


const renderPreviewMessage = (message: PreviewMessage) => {
    if (message.sender === 'bot') {
      return (
        <div key={message.id} className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Bot" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div className="bg-[#2D3748] rounded-lg rounded-tl-none p-3 max-w-[80%] text-white">
            {message.isTyping ? <TypingIndicator /> : message.content}
          </div>
        </div>
      );
    }
    return (
      <div key={message.id} className="flex justify-end">
        <div className="bg-blue-600 text-white rounded-lg rounded-br-none p-3 max-w-[80%]">
          <p className="text-sm">{message.content as string}</p>
        </div>
      </div>
    );
  };

export function TypebotPublicViewer() {
    const { funnelId } = useParams() as { funnelId: string };
    const firestore = useFirestore();

    const funnelQuery = useMemoFirebase(
        () => (firestore && funnelId ? query(collection(firestore, 'funnels'), where('__name__', '==', funnelId), limit(1)) : null),
        [firestore, funnelId]
    );

    const { data: funnelData, isLoading } = useCollection<Funnel>(funnelQuery);
    
    const [funnel, setFunnel] = useState<Funnel | null>(null);

    const [previewMessages, setPreviewMessages] = useState<PreviewMessage[]>([]);
    const [waitingForInput, setWaitingForInput] = useState<CanvasBlock | null>(null);
    const [userInput, setUserInput] = useState('');
    
    const previewVariablesRef = useRef<{ [key: string]: any }>({});
    
    const canvasBlocks = (funnel?.steps as CanvasBlock[]) || [];
    const connections = (funnel as any)?.connections || [];

    useEffect(() => {
        if(funnelData && funnelData.length > 0) {
            setFunnel(funnelData[0]);
        }
    }, [funnelData])
    
    const interpolateVariables = useCallback((text: string = '') => {
        if (!text) return '';
        return text.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
            return previewVariablesRef.current[key] || `{{${key}}}`;
        });
    }, []);

    const processGroup = useCallback(async (group: CanvasBlock, startIndex: number) => {
        const childrenToProcess = group.children?.slice(startIndex) || [];
        
        for (let i = 0; i < childrenToProcess.length; i++) {
            const child = childrenToProcess[i];
        
            if (child.type.startsWith('input-')) {
                setWaitingForInput(child);
                return;
            }
        
            if (child.type === 'logic-wait') {
                const typingId = Date.now() + Math.random();
                setPreviewMessages((prev) => [...prev, { id: typingId, sender: 'bot', isTyping: true, content: '' }]);
                if (child.props?.duration) {
                  await new Promise(resolve => setTimeout(resolve, child.props.duration * 1000));
                }
                setPreviewMessages((prev) => prev.filter(m => m.id !== typingId));
                continue; 
              }
    
            if (child.type === 'text' && child.props?.content) {
                const interpolatedContent = interpolateVariables(child.props.content);
                setPreviewMessages((prev) => [
                    ...prev,
                    {
                        id: Date.now() + Math.random(),
                        sender: 'bot',
                        content: <div dangerouslySetInnerHTML={{ __html: interpolatedContent }} />,
                    },
                ]);
            }
        }
    
        const nextConnection = connections.find(
          (c: any) => c.from === group.id && c.buttonIndex === undefined
        );
    
        if (nextConnection) {
          const nextGroup = canvasBlocks.find((b) => b.id === nextConnection.to);
          if (nextGroup) {
            processGroup(nextGroup, 0);
          }
        } else {
          setWaitingForInput(null);
        }
    }, [canvasBlocks, connections, interpolateVariables]);

    const processFlow = useCallback((startId: number | "start", buttonIndex?: number) => {
        if (startId === null) {
            setWaitingForInput(null);
            return;
        }

        let nextGroupId: number | undefined;

        if (typeof startId === 'number') {
            const parentBlock = canvasBlocks.find(b => b.children?.some(c => c.id === startId));
            const startBlock = parentBlock?.children?.find(c => c.id === startId);
            
            if (parentBlock && startBlock) {
                if (buttonIndex !== undefined) {
                    nextGroupId = connections.find((c: any) => c.from === startBlock.id && c.buttonIndex === buttonIndex)?.to;
                } else {
                    const currentIndex = parentBlock.children?.findIndex(c => c.id === startId) ?? -1;
                    if (currentIndex !== -1 && currentIndex + 1 < (parentBlock.children?.length ?? 0)) {
                        processGroup(parentBlock, currentIndex + 1);
                        return;
                    } else {
                        nextGroupId = connections.find((c: any) => c.from === parentBlock.id && c.buttonIndex === undefined)?.to;
                    }
                }
            } else { 
                nextGroupId = connections.find((c: any) => c.from === startId && c.buttonIndex === buttonIndex)?.to;
            }
        } else {
            nextGroupId = connections.find((c: any) => c.from === 'start')?.to;
        }

        if (nextGroupId) {
            const nextGroup = canvasBlocks.find(b => b.id === nextGroupId);
            if (nextGroup) {
                processGroup(nextGroup, 0);
            } else {
                setWaitingForInput(null);
            }
        } else {
            setWaitingForInput(null);
        }
    }, [canvasBlocks, connections, processGroup]);

    const startPreview = useCallback(() => {
        setPreviewMessages([]);
        previewVariablesRef.current = {};
        setWaitingForInput(null);
        processFlow('start');
    }, [processFlow]);

    useEffect(() => {
        if (funnel) {
            startPreview();
        }
    }, [funnel, startPreview]);

    const handleUserButtonClick = (buttonIndex: number) => {
        if (!waitingForInput) return;
        const clickedButton = waitingForInput.props.buttons[buttonIndex];
        if (!clickedButton) return;
        setPreviewMessages((prev) => [ ...prev, { id: Date.now() + Math.random(), sender: 'user', content: clickedButton.text }, ]);
        const parentId = waitingForInput.id;
        setWaitingForInput(null);
        processFlow(parentId, buttonIndex);
    };
  
    const handleImageChoiceClick = (choiceIndex: number) => {
        if (!waitingForInput) return;
        const parentId = waitingForInput.id;
        setWaitingForInput(null);
        processFlow(parentId, choiceIndex);
    }

    const handleUserInput = () => {
        if (!userInput.trim() || !waitingForInput) return;
        setPreviewMessages((prev) => [ ...prev, { id: Date.now() + Math.random(), sender: 'user', content: userInput }, ]);
        if (waitingForInput.props.variable) {
            previewVariablesRef.current[waitingForInput.props.variable] = userInput;
        }
        const lastInputBlockId = waitingForInput.id;
        const parentGroup = canvasBlocks.find(g => g.children?.some(c => c.id === lastInputBlockId));
        setUserInput('');
        setWaitingForInput(null);
        if (parentGroup) {
            const childIndex = parentGroup.children?.findIndex(c => c.id === lastInputBlockId) ?? -1;
            if (childIndex !== -1 && childIndex + 1 < (parentGroup.children?.length ?? 0)) {
                processGroup(parentGroup, childIndex + 1);
            } else {
                const nextConnection = connections.find((c: any) => c.from === parentGroup.id);
                if (nextConnection?.to) {
                    const nextGroup = canvasBlocks.find(g => g.id === nextConnection.to);
                    if (nextGroup) {
                        processGroup(nextGroup, 0);
                    }
                }
            }
        }
    };

    if (isLoading || !funnel) {
        return <div className="flex h-screen w-screen items-center justify-center bg-[#111111] text-white">Carregando Funil...</div>;
    }

    return (
        <div className="flex h-screen w-screen flex-col bg-[#111111]">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4 max-w-2xl mx-auto w-full">{previewMessages.map(renderPreviewMessage)}</div>
            </ScrollArea>
            <div className="p-4 border-t border-[#262626] bg-[#111111]">
                <div className="max-w-2xl mx-auto w-full">
                    {waitingForInput?.type === 'input-buttons' ? (
                        <PreviewButtons buttons={waitingForInput.props.buttons || []} onButtonClick={handleUserButtonClick} sender="user" />
                    ) : waitingForInput?.type === 'input-pic' ? (
                        <PreviewImageChoices choices={waitingForInput.props.choices || []} onImageClick={handleImageChoiceClick} />
                    ) : (
                        <form onSubmit={(e) => { e.preventDefault(); handleUserInput(); }} className="flex items-center gap-2">
                            <Input placeholder="Digite sua resposta..." className="bg-[#2a3942] text-white border-[#3f3f46] focus:border-green-500 focus-visible:ring-0 placeholder:text-gray-500" value={userInput} onChange={(e) => setUserInput(e.target.value)} disabled={!waitingForInput} />
                            <Button type="submit" size="icon" className="h-10 w-10 bg-green-500 hover:bg-green-600 flex-shrink-0" disabled={!waitingForInput}>
                                <ArrowRight size={16} className="text-white" />
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
