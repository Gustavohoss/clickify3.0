

'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Settings,
  Copy,
  Trash2,
  MessageSquareText,
  MousePointerClick,
  Loader,
  View,
  TrendingUp,
  GitCompareArrows,
  Sparkles,
  Star,
  LogIn,
  Minus,
  HelpCircle,
  BarChart2,
  List as ListIcon,
  Text as TextIcon,
  CheckSquare,
  ChevronsRight,
  Quote,
  TextCursorInput,
  SlidersHorizontal,
  Rows,
  DollarSign,
  FileCode,
  FileText as FileTextIcon,
  Heading1,
  Check,
  XCircle,
  CheckCircle,
  Info,
  AudioWaveform,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Link as LinkIcon,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  RemoveFormatting,
  Baseline,
  Highlighter,
  Play,
  Pause,
  Mic,
  CheckCheck,
  MoreHorizontal,
  ArrowRight,
  Brush,
  Combine,
  Wand2,
  Users,
  Code2,
  Share2,
  TestTube2,
  Undo2,
  Redo2,
  PlaySquare,
  PictureInPicture,
  MessageCircle,
  Link2,
  Calendar,
  Clock,
  Phone,
  CheckSquare2,
  StarHalf,
  UploadCloud,
  CreditCard,
  Variable,
  GitBranch,
  ArrowRightLeft,
  Webhook,
  RefreshCw,
  GitCommit,
  GitPullRequest,
  Clock10,
  Bot,
  Code,
  Image as ImageIconLucide,
  GanttChart,
  AtSign,
  Braces,
  Video,
  Plus,
  ChevronsUpDown,
  Globe,
  X,
  Construction,
  MessageSquare,
  Palette,
  Rocket,
  ClipboardCopy,
  EyeOff,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { Funnel, CanvasBlock, CanvasConnection, DropIndicator, ButtonItem, ImageChoice } from './types.tsx';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.tsx';
import { CanvasGroupBlock } from './typebot/blocks/CanvasGroupBlock.tsx';
import { CanvasTextBlock } from './typebot/blocks/CanvasTextBlock.tsx';
import { ContextMenu } from './typebot/ui/ContextMenu.tsx';
import { ImageBlockSettings } from './typebot/settings/ImageSettings.tsx';
import { VideoBlockSettings } from './typebot/settings/VideoSettings.tsx';
import { AudioBlockSettings } from './typebot/settings/AudioSettings.tsx';
import { WaitBlockSettings } from './typebot/settings/WaitSettings.tsx';
import { ButtonsBlockSettings } from './typebot/settings/ButtonsSettings.tsx';
import { TextBlockSettings } from './typebot/settings/TextSettings.tsx';
import { EmailBlockSettings } from './typebot/settings/EmailSettings.tsx';
import { WebsiteBlockSettings } from './typebot/settings/WebsiteSettings.tsx';
import { EmbedBlockSettings } from './typebot/settings/EmbedSettings.tsx';
import { ImageChoiceSettings } from './typebot/settings/ImageChoiceSettings.tsx';
import { RedirectBlockSettings } from './typebot/settings/RedirectSettings.tsx';
import { TimeBlockSettings } from './typebot/settings/TimeSettings.tsx';
import { ABTestSettings } from './typebot/settings/ABTestSettings.tsx';
import { JumpToBlockSettings } from './typebot/settings/JumpToSettings.tsx';
import { ConnectionHandle } from '../ui/ConnectionHandle.tsx';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu.tsx';


const getSmoothStepPath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x2 - x1;
  const halfDx = dx / 2;

  return `M ${x1},${y1} C ${x1 + halfDx},${y1} ${x1 + halfDx},${y2} ${x2},${y2}`;
};

type PreviewMessage = {
  id: number;
  sender: 'bot' | 'user';
  content: React.ReactNode;
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

type EditorTab = 'Fluxo' | 'Tema' | 'Configurações' | 'Compartilhar';

const renderPreviewMessage = (message: PreviewMessage) => {
    if (message.sender === 'bot') {
      return (
        <div key={message.id} className="flex items-start gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="" alt="Bot" />
            <AvatarFallback>B</AvatarFallback>
          </Avatar>
          <div className="bg-[#2D3748] rounded-lg rounded-tl-none p-3 max-w-[80%] text-white">
            {message.content}
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
  
const TypebotPreview = memo(function TypebotPreview({
    previewMessages,
    waitingForInput,
    handleUserButtonClick,
    handleImageChoiceClick,
    userInput,
    setUserInput,
    handleUserInput
}: any) {
    return (
        <div className="w-full h-full bg-[#111111] flex flex-col">
            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">{previewMessages.map(renderPreviewMessage)}</div>
            </ScrollArea>
            <div className="p-4">
                {waitingForInput?.type === 'input-buttons' ? (
                    <PreviewButtons
                        buttons={waitingForInput.props.buttons || []}
                        onButtonClick={handleUserButtonClick}
                        sender="user"
                    />
                ) : waitingForInput?.type === 'input-pic' ? (
                    <PreviewImageChoices
                        choices={waitingForInput.props.choices || []}
                        onImageClick={handleImageChoiceClick}
                    />
                ) : (
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleUserInput();
                        }}
                        className="flex items-center gap-2"
                    >
                        <Input
                            placeholder="Digite sua resposta..."
                            className="bg-[#2a3942] text-white border-[#3f3f46] focus:border-green-500 focus-visible:ring-0 placeholder:text-gray-500"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            disabled={!waitingForInput}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="h-10 w-10 bg-green-500 hover:bg-green-600 flex-shrink-0"
                            disabled={!waitingForInput}
                        >
                            <ArrowRight size={16} className="text-white" />
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
});
TypebotPreview.displayName = "TypebotPreview";


export function TypebotEditor({
  funnel,
  setFunnel,
  debouncedUpdateFunnel,
}: {
  funnel: Funnel;
  setFunnel: (updater: (prev: Funnel | null) => Funnel | null) => void;
  debouncedUpdateFunnel: any;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<EditorTab>('Fluxo');
  const [isPanning, setIsPanning] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const startPanPosition = useRef({ x: 0, y: 0 });
  const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    blockId: number | null;
  }>({ visible: false, x: 0, y: 0, blockId: null });
  const [variables, setVariables] = useState<string[]>([]);
  const [connections, setConnections] = useState<CanvasConnection[]>([]);
  const [drawingConnection, setDrawingConnection] = useState<any>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewMessages, setPreviewMessages] = useState<PreviewMessage[]>([]);
  const [currentPreviewBlockId, setCurrentPreviewBlockId] = useState<
    number | 'start' | null
  >(null);
  const [userInput, setUserInput] = useState('');

  const [isPublished, setIsPublished] = useState(funnel.isPublished || false);

  const [waitingForInput, setWaitingForInput] = useState<CanvasBlock | null>(
    null
  );
  const [draggingState, setDraggingState] = useState<{
    blockId: number | null;
    isDragging: boolean;
    isReadyToDrag: boolean;
    dragStartMouse: { x: number; y: number };
    dragStartOffset: { x: number; y: number };
    originalBlock: CanvasBlock | null;
  }>({
    blockId: null,
    isDragging: false,
    isReadyToDrag: false,
    dragStartMouse: { x: 0, y: 0 },
    dragStartOffset: { x: 0, y: 0 },
    originalBlock: null,
  });
  const [dropIndicator, setDropIndicator] = useState<DropIndicator>(null);

  const previewVariablesRef = useRef<{ [key: string]: any }>({});
  
  useEffect(() => {
    if (funnel.steps) {
      setCanvasBlocks((funnel.steps as CanvasBlock[]).filter(b => b.type)); // Basic validation
    }
    if ((funnel as any).connections) {
      setConnections((funnel as any).connections);
    }
     if (funnel.isPublished !== isPublished) {
      setIsPublished(funnel.isPublished || false);
    }
  }, [funnel, isPublished]);
  

  const addBlock = (type: string) => {
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const basePosition = {
      x: (canvasRect.width / 2 - panOffset.x) / zoom - 150,
      y: (canvasRect.height / 2 - panOffset.y) / zoom - 50,
    };

    if (type === 'group') {
      const newBlock: CanvasBlock = {
        id: Date.now(),
        type: 'group',
        position: basePosition,
        children: [],
        props: {},
      };
      setCanvasBlocks((prev) => [...prev, newBlock]);
    } else {
      const childBlockId = Date.now();
      const groupBlockId = childBlockId + 1;

      const childBlock: CanvasBlock = {
        id: childBlockId,
        type,
        position: { x: 0, y: 0 },
        parentId: groupBlockId,
        props: {},
      };

      const groupBlock: CanvasBlock = {
        id: groupBlockId,
        type: 'group',
        position: basePosition,
        children: [childBlock],
        props: {},
      };

      setCanvasBlocks((prev) => [...prev, groupBlock]);
    }
  };

  const duplicateBlock = (blockId: number) => {
    const blockToDuplicate = canvasBlocks.find((block) => block.id === blockId);
    if (!blockToDuplicate) return;

    const newBlock: CanvasBlock = {
      ...blockToDuplicate,
      id: Date.now(),
      position: {
        x: blockToDuplicate.position.x + 20,
        y: blockToDuplicate.position.y + 20,
      },
      children: blockToDuplicate.children ? [] : undefined,
      props: {},
    };
    setCanvasBlocks((prev) => [...prev, newBlock]);
  };

  const deleteBlock = (blockId: number) => {
    setCanvasBlocks((prev) => {
      const newBlocks = prev
        .map((parent) => {
          if (!parent.children) return parent;
          const newChildren = parent.children.filter(
            (child) => child.id !== blockId
          );
          // If the group becomes empty after deleting the child, remove the group
          if (parent.children.length > 0 && newChildren.length === 0) {
            return null;
          }
          return { ...parent, children: newChildren };
        })
        .filter((b) => b !== null) as CanvasBlock[];

      // Also filter out top-level blocks
      return newBlocks.filter((b) => b.id !== blockId);
    });

    if (selectedBlockId === blockId) {
      setSelectedBlockId(null);
    }
  };

  const updateBlockProps = (blockId: number, props: any) => {
    const updateRecursively = (blocks: CanvasBlock[]): CanvasBlock[] => {
      return blocks.map((block) => {
        if (block.id === blockId) {
           const newBlock = { ...block, props: { ...block.props, ...props } };
           if (newBlock.type === 'logic-jump' && props.targetGroupId !== undefined) {
             setConnections(prev => [
               ...prev.filter(c => c.from !== blockId),
               { from: blockId, to: props.targetGroupId }
             ]);
           }
          return newBlock;
        }
        if (block.children) {
          return { ...block, children: updateRecursively(block.children) };
        }
        return block;
      });
    };
    setCanvasBlocks(updateRecursively);
  };

  const handleContextMenu = (e: React.MouseEvent, block: CanvasBlock) => {
    e.preventDefault();
    e.stopPropagation();

    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    setContextMenu({
      visible: true,
      x: x,
      y: y,
      blockId: block.id,
    });
  };

  const handleDuplicateFromMenu = () => {
    if(contextMenu.blockId) {
      duplicateBlock(contextMenu.blockId);
    }
    setContextMenu({ visible: false, x: 0, y: 0, blockId: null });
  }

  const handleDeleteFromMenu = () => {
    if (contextMenu.blockId) {
      deleteBlock(contextMenu.blockId);
    }
    setContextMenu({ visible: false, x: 0, y: 0, blockId: null });
  };

  const handlePublishToggle = (publish: boolean) => {
    setFunnel(prev => prev ? ({ ...prev, isPublished: publish }) : null);
    setIsPublished(publish);
    debouncedUpdateFunnel.flush();
    toast({
      title: publish ? 'Funil Publicado!' : 'Funil agora é um rascunho.',
      description: publish ? 'Seu funil agora está ativo.' : 'Seu funil não está mais visível publicamente.',
    });
  };
  
  const handleCopyUrl = () => {
    if (!funnel) return;
    const funnelSlug = funnel.slug || funnel.name.toLowerCase().trim().replace(/[^a-z0-9\\s-]/g, '').replace(/[\\s-]+/g, '-');
    const publicUrl = `${window.location.origin}/funil/${funnelSlug}/${funnel.id}`;
    navigator.clipboard.writeText(publicUrl);
    toast({
      title: 'URL Copiada!',
      description: `O link do funil foi copiado para a área de transferência.`,
    });
  }

  const blocks = {
    Bolhas: [
      {
        name: 'Texto',
        icon: <MessageCircle size={16} />,
        type: 'text',
        color: 'text-sky-400',
      },
      {
        name: 'Imagem',
        icon: <ImageIconLucide size={16} />,
        type: 'image',
        color: 'text-sky-400',
      },
      {
        name: 'Vídeo',
        icon: <Video size={16} />,
        type: 'video',
        color: 'text-sky-400',
      },
      {
        name: 'Embutir',
        icon: <Code2 size={16} />,
        type: 'embed',
        color: 'text-sky-400',
      },
      {
        name: 'Áudio',
        icon: <AudioWaveform size={16} />,
        type: 'audio',
        color: 'text-sky-400',
      },
    ],
    Entradas: [
      {
        name: 'Texto',
        icon: <TextCursorInput size={16} />,
        type: 'input-text',
        color: 'text-orange-400',
      },
      {
        name: 'Botões',
        icon: <CheckSquare2 size={16} />,
        type: 'input-buttons',
        color: 'text-orange-400',
      },
      {
        name: 'Escolha de Imagem',
        icon: <PictureInPicture size={16} />,
        type: 'input-pic',
        color: 'text-orange-400',
      },
    ],
    Lógica: [
      {
        name: 'Redirecionar',
        icon: <ArrowRightLeft size={16} />,
        type: 'logic-redirect',
        color: 'text-indigo-400',
      },
      {
        name: 'Aguardar',
        icon: <Clock10 size={16} />,
        type: 'logic-wait',
        color: 'text-indigo-400',
      },
      {
        name: 'Teste A/B',
        icon: <GitCompareArrows size={16} />,
        type: 'logic-abtest',
        color: 'text-indigo-400',
      },
      {
        name: 'Pular para',
        icon: <GitCommit size={16} />,
        type: 'logic-jump',
        color: 'text-indigo-400',
      },
    ],
    Grupos: [
      {
        name: 'Grupo',
        icon: <Combine size={16} />,
        type: 'group',
        color: 'text-gray-400',
      },
    ],
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      if (e.button === 0) {
        // Left click to pan
        setIsPanning(true);
        startPanPosition.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.style.cursor = 'grabbing';
      }
      setSelectedBlockId(null);
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
    if (drawingConnection) {
      let toBlockId: number | undefined;
      let target = e.target as HTMLElement;

      while (target && target !== canvasRef.current) {
        const handleId = target.dataset.handleId;
        if (handleId && handleId.startsWith('input-')) {
          toBlockId = parseInt(handleId.split('-')[1], 10);
          break;
        }
        target = target.parentElement as HTMLElement;
      }

      if (toBlockId !== undefined) {
        const fromBlockId = drawingConnection.fromBlockId;
        if (fromBlockId !== toBlockId) {
          setConnections((prev) => [
            ...prev.filter((c) => c.from !== fromBlockId || c.buttonIndex !== drawingConnection.buttonIndex),
            { from: fromBlockId, to: toBlockId, buttonIndex: drawingConnection.buttonIndex },
          ]);
        }
      }
      setDrawingConnection(null);
    }

    if (
      draggingState.isDragging &&
      draggingState.blockId !== null &&
      draggingState.originalBlock
    ) {
      const draggedBlock = findBlock(draggingState.blockId);
      if (!draggedBlock) return;

      let isDroppedOnTarget = false;
      let updatedBlocks = [...canvasBlocks];

      if (dropIndicator) {
        isDroppedOnTarget = true;
        const targetGroupIndex = updatedBlocks.findIndex(
          (b) => b.id === dropIndicator.groupId
        );

        if (targetGroupIndex > -1) {
          const targetGroup = { ...updatedBlocks[targetGroupIndex] };

          const blockToInsert: CanvasBlock = {
            ...draggingState.originalBlock,
            id: draggedBlock.id,
            parentId: targetGroup.id,
            position: { x: 0, y: 0 },
            props: draggedBlock.props,
          };

          const newChildren = [...(targetGroup.children || [])];
          newChildren.splice(dropIndicator.index, 0, blockToInsert);
          targetGroup.children = newChildren;

          updatedBlocks[targetGroupIndex] = targetGroup;
          updatedBlocks = updatedBlocks.filter((b) => b.id !== draggedBlock.id);
        }
      } else {
        if (draggedBlock.type !== 'group') {
          isDroppedOnTarget = true;
          const newGroupId = Date.now();
          const blockToMove: CanvasBlock = {
            ...draggingState.originalBlock,
            id: draggedBlock.id,
            parentId: newGroupId,
            position: { x: 0, y: 0 },
            props: draggedBlock.props,
          };
          const newGroup: CanvasBlock = {
            id: newGroupId,
            type: 'group',
            position: draggedBlock.position,
            children: [blockToMove],
            props: {},
          };
          updatedBlocks = updatedBlocks.filter((b) => b.id !== draggedBlock.id);
          updatedBlocks.push(newGroup);
        }
      }

      if (isDroppedOnTarget) {
        setCanvasBlocks(updatedBlocks);
      }
    } else if (
      !draggingState.isDragging &&
      draggingState.blockId &&
      e.button === 0
    ) {
      setSelectedBlockId(draggingState.blockId);
    }

    setIsPanning(false);
    setDrawingConnection(null);
    setDraggingState({
      blockId: null,
      isDragging: false,
      dragStartMouse: { x: 0, y: 0 },
      dragStartOffset: { x: 0, y: 0 },
      originalBlock: null,
      isReadyToDrag: false,
    });
    setDropIndicator(null);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'default';
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const currentState = draggingState;
    if (isPanning || currentState.isDragging) {
      setIsPanning(false);

      if (
        currentState.isDragging &&
        currentState.originalBlock &&
        currentState.blockId
      ) {
        const currentDraggedBlock = findBlock(currentState.blockId);

        if (!currentDraggedBlock) {
          setCanvasBlocks((prevBlocks) => {
            let restoredBlocks = [...prevBlocks];

            restoredBlocks = restoredBlocks.filter(
              (b) => b.id !== currentState.blockId
            );

            const parentIndex = restoredBlocks.findIndex(
              (p) => p.id === currentState.originalBlock!.parentId
            );
            if (parentIndex > -1) {
              const parent = { ...restoredBlocks[parentIndex] };
              const children = [...(parent.children || [])];
              const childExists = children.some(
                (c) => c.id === currentState.originalBlock!.id
              );
              if (!childExists) {
                children.push(currentState.originalBlock!);
                parent.children = children;
                restoredBlocks[parentIndex] = parent;
              }
            }
            return restoredBlocks;
          });
        }
      }

      setDraggingState({
        blockId: null,
        isDragging: false,
        dragStartMouse: { x: 0, y: 0 },
        dragStartOffset: { x: 0, y: 0 },
        originalBlock: null,
        isReadyToDrag: false,
      });
      setDropIndicator(null);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'default';
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (drawingConnection && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const mousePos = {
            x: (e.clientX - canvasRect.left - panOffset.x) / zoom,
            y: (e.clientY - canvasRect.top - panOffset.y) / zoom,
        };
        setDrawingConnection((prev: any) => ({ ...prev, to: mousePos }));
    }

    if (isPanning) {
      const dx = e.clientX - startPanPosition.current.x;
      const dy = e.clientY - startPanPosition.current.y;
      setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      startPanPosition.current = { x: e.clientX, y: e.clientY };
    }

    if (draggingState.isReadyToDrag && !draggingState.isDragging) {
      const dx = Math.abs(e.clientX - draggingState.dragStartMouse.x);
      const dy = Math.abs(e.clientY - draggingState.dragStartMouse.y);
      if (dx > 5 || dy > 5) {
        setDraggingState((prev) => ({ ...prev, isDragging: true }));
        if (canvasRef.current) {
          canvasRef.current.style.cursor = 'grabbing';
        }

        if (draggingState.originalBlock?.parentId && canvasRef.current) {
          const parentGroup = canvasBlocks.find(
            (p) => p.id === draggingState.originalBlock!.parentId
          );
          if (!parentGroup) return;

          const newBlockId = Date.now();

          const blockElement = document.getElementById(
            `block-${draggingState.originalBlock.id}`
          );
          if (!blockElement) return;

          const canvasRect = canvasRef.current.getBoundingClientRect();
          const blockRect = blockElement.getBoundingClientRect();
          const parentElement = document.getElementById(
            `block-${parentGroup.id}`
          );
          const parentRect = parentElement?.getBoundingClientRect();

          const positionInCanvas = {
            x:
              ((parentRect?.left ?? 0) +
                (blockRect?.left - (parentRect?.left ?? 0)) -
                canvasRect.left -
                panOffset.x) /
              zoom,
            y:
              ((parentRect?.top ?? 0) +
                (blockRect?.top - (parentRect?.top ?? 0)) -
                canvasRect.top -
                panOffset.y) /
              zoom,
          };

          const detachedBlock: CanvasBlock = {
            ...draggingState.originalBlock,
            id: newBlockId,
            parentId: undefined,
            position: positionInCanvas,
            props: draggingState.originalBlock.props,
          };

          const groupIsNowEmpty = parentGroup.children?.length === 1;

          setCanvasBlocks((prevBlocks) => [
            ...prevBlocks
              .map((p) =>
                p.id === draggingState.originalBlock!.parentId
                  ? {
                      ...p,
                      children: p.children?.filter(
                        (c) => c.id !== draggingState.originalBlock!.id
                      ),
                    }
                  : p
              )
              .filter(
                (p) =>
                  !(
                    p.id === draggingState.originalBlock!.parentId &&
                    groupIsNowEmpty
                  )
              ),
            detachedBlock,
          ]);

          setDraggingState((prev) => ({
            ...prev,
            blockId: newBlockId,
            dragStartOffset: {
              x:
                (e.clientX - canvasRect.left - panOffset.x) / zoom -
                detachedBlock.position.x,
              y:
                (e.clientY - canvasRect.top - panOffset.y) / zoom -
                detachedBlock.position.y,
            },
          }));
        }
      }
    }

    if (draggingState.isDragging && draggingState.blockId && canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
      const newX =
        (e.clientX - canvasRect.left - panOffset.x) / zoom -
        draggingState.dragStartOffset.x;
      const newY =
        (e.clientY - canvasRect.top - panOffset.y) / zoom -
        draggingState.dragStartOffset.y;

      setCanvasBlocks((prevBlocks) =>
        prevBlocks.map((block) =>
          block.id === draggingState.blockId
            ? { ...block, position: { x: newX, y: newY } }
            : block
        )
      );

      const dropX = (e.clientX - canvasRect.left) / zoom;
      const dropY = (e.clientY - canvasRect.top) / zoom;

      let foundTarget = false;

      for (const block of canvasBlocks) {
        if (block.type === 'group' && block.id !== draggingState.blockId) {
          const groupEl = document.getElementById(`block-${block.id}`);
          if (!groupEl) continue;

          const groupRect = groupEl.getBoundingClientRect();
          const groupLeft = (groupRect.left - canvasRect.left) / zoom;
          const groupTop = (groupRect.top - canvasRect.top) / zoom;
          const groupWidth = groupRect.width / zoom;
          const groupHeight = groupRect.height / zoom;

          if (
            dropX >= groupLeft &&
            dropX <= groupLeft + groupWidth &&
            dropY >= groupTop &&
            dropY <= groupTop + groupHeight
          ) {
            foundTarget = true;
            let newIndex = block.children?.length || 0;
            const childrenContainer = groupEl.querySelector(
              '[data-children-container]'
            );

            if (childrenContainer) {
              const childElements = Array.from(
                childrenContainer.children
              ) as HTMLElement[];
              for (let i = 0; i < childElements.length; i++) {
                const childEl = childElements[i];
                if (childEl.dataset.testid === 'drop-placeholder') continue;
                const childRect = childEl.getBoundingClientRect();
                const childTopInCanvas =
                  (childRect.top - canvasRect.top) / zoom;
                const dropZoneMidpoint =
                  childTopInCanvas + childRect.height / zoom / 2;

                if (dropY < dropZoneMidpoint) {
                  newIndex = i;
                  break;
                }
              }
            }
            setDropIndicator({ groupId: block.id, index: newIndex });
            break;
          }
        }
      }
      if (!foundTarget) {
        setDropIndicator(null);
      }
    }
  };

  const handleBlockMouseDown = (e: React.MouseEvent, block: CanvasBlock) => {
    e.stopPropagation();
    if (e.button !== 0) return;
    setContextMenu({ ...contextMenu, visible: false });
  
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const blockToDrag = findBlock(block.id);
    if (!blockToDrag) return;
  
    let dragStartOffset;
  
    const blockElement = document.getElementById(`block-${blockToDrag.id}`);
    if (!blockElement) {
        console.error("Could not find block element for dragging");
        return;
    }

    if (blockToDrag.parentId) {
      const parentElement = document.getElementById(`block-${blockToDrag.parentId}`);
      if(parentElement) {
           dragStartOffset = {
                x: (e.clientX - blockElement.getBoundingClientRect().left) / zoom,
                y: (e.clientY - blockElement.getBoundingClientRect().top) / zoom,
            };
      } else {
          dragStartOffset = { x: 0, y: 0 };
      }
    } else {
      dragStartOffset = {
        x: (e.clientX - canvasRect.left - panOffset.x) / zoom - blockToDrag.position.x,
        y: (e.clientY - canvasRect.top - panOffset.y) / zoom - blockToDrag.position.y,
      };
    }
  
    setDraggingState({
      blockId: block.id,
      isDragging: false,
      isReadyToDrag: true,
      dragStartMouse: { x: e.clientX, y: e.clientY },
      dragStartOffset: dragStartOffset,
      originalBlock: { ...blockToDrag },
    });
  };

  const getHandlePosition = (handleId: string) => {
    const handleElement = document.querySelector(
      `[data-handle-id="${handleId}"]`
    );
    if (!handleElement || !canvasRef.current) return { x: 0, y: 0 };

    const canvasRect = canvasRef.current.getBoundingClientRect();
    const handleRect = handleElement.getBoundingClientRect();

    const x =
      (handleRect.left + handleRect.width / 2 - canvasRect.left - panOffset.x) /
      zoom;
    const y =
      (handleRect.top +
        handleRect.height / 2 -
        canvasRect.top -
        panOffset.y) /
      zoom;

    return { x, y };
  };

  const onConnectionStart = (
    e: React.MouseEvent,
    fromBlockId: number | 'start',
    fromHandle: 'output',
    buttonIndex?: number,
  ) => {
    e.stopPropagation();
    const handleId =
      buttonIndex !== undefined
        ? `output-${fromBlockId}-${buttonIndex}`
        : `output-${fromBlockId}`;

    const startPos = getHandlePosition(handleId);

    setDrawingConnection({
      fromBlockId: fromBlockId,
      fromHandle,
      buttonIndex,
      from: startPos,
      to: startPos,
    });
  };


  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    if (!canvasRef.current) return;
    e.preventDefault();
    const zoomFactor = 1.1;
    const newZoom = e.deltaY > 0 ? zoom / zoomFactor : zoom * zoomFactor;

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const mousePointX = (mouseX - panOffset.x) / zoom;
    const mousePointY = (mouseY - panOffset.y) / zoom;
    
    const newPanX = mouseX - mousePointX * newZoom;
    const newPanY = mouseY - mousePointY * newZoom;

    setZoom(newZoom);
    setPanOffset({x: newPanX, y: newPanY});
  }

  const findBlock = (id: number | null): CanvasBlock | undefined => {
    if (id === null) return undefined;
    for (const block of canvasBlocks) {
      if (block.id === id) return block;
      if (block.children) {
        const child = block.children.find((c) => c.id === id);
        if (child) return child;
      }
    }
    return undefined;
  };

  const getBlockPosition = (id: number | null): { x: number; y: number } => {
    if (id === null || !canvasRef.current) return { x: 0, y: 0 };

    const block = findBlock(id);
    if (!block) return {x: 0, y: 0};
    
    if (block.parentId) {
      const parent = findBlock(block.parentId);
      if (parent) {
        const blockElement = document.getElementById(`block-${id}`);
        const parentElement = document.getElementById(`block-${block.parentId}`);
        if(blockElement && parentElement) {
            const blockRect = blockElement.getBoundingClientRect();
            const parentRect = parentElement.getBoundingClientRect();
             const canvasRect = canvasRef.current.getBoundingClientRect();
             return {
                 x: (parentRect.left - canvasRect.left - panOffset.x) / zoom,
                 y: (blockRect.top - canvasRect.top - panOffset.y) / zoom
             }
        }
        return parent.position;
      }
    }

    return block.position;
  };

  const canvasBlocksRef = useRef(canvasBlocks);
  canvasBlocksRef.current = canvasBlocks;
  const connectionsRef = useRef(connections);
  connectionsRef.current = connections;

  const interpolateVariables = useCallback((text: string = '') => {
    if (!text) return '';
    return text.replace(/{{\s*(\w+)\s*}}/g, (_, key) => {
      return previewVariablesRef.current[key] || `{{${key}}}`;
    });
  }, []);

  const processFlow = useCallback((startId: number | "start", startIndex: number = 0, buttonIndex?: number) => {
    if (startId === null) {
      setWaitingForInput(null);
      return;
    }

    let nextGroupId: number | undefined;

    if (typeof startId === 'number') {
        const parentBlock = canvasBlocksRef.current.find(b => b.children?.some(c => c.id === startId));
        const startBlock = parentBlock?.children?.find(c => c.id === startId);
        
        if (parentBlock && startBlock) {
            if (buttonIndex !== undefined) {
                // It's a button click from within a group
                nextGroupId = connectionsRef.current.find(c => c.from === startBlock.id && c.buttonIndex === buttonIndex)?.to;
            } else {
                 // Continuing inside a group
                 const currentIndex = parentBlock.children?.findIndex(c => c.id === startId) ?? -1;
                 if (currentIndex !== -1 && currentIndex + 1 < (parentBlock.children?.length ?? 0)) {
                    // There are more blocks in the current group
                    setCurrentPreviewBlockId(parentBlock.id);
                    processGroup(parentBlock, currentIndex + 1);
                    return;
                } else {
                    // End of group, find next connection from the group
                    nextGroupId = connectionsRef.current.find(c => c.from === parentBlock.id && c.buttonIndex === undefined)?.to;
                }
            }
        } else { // It's a group
           nextGroupId = connectionsRef.current.find(c => c.from === startId && c.buttonIndex === buttonIndex)?.to;
        }

    } else { // startId is 'start'
      nextGroupId = connectionsRef.current.find(c => c.from === 'start')?.to;
    }


    if (nextGroupId) {
      const nextGroup = canvasBlocksRef.current.find(b => b.id === nextGroupId);
      if (nextGroup) {
        setCurrentPreviewBlockId(nextGroup.id);
        processGroup(nextGroup, 0);
      } else {
        setWaitingForInput(null);
      }
    } else {
      setWaitingForInput(null);
    }
  }, [interpolateVariables]);


  const processGroup = async (group: CanvasBlock, startIndex: number) => {
    const childrenToProcess = group.children?.slice(startIndex) || [];
  
    for (let i = 0; i < childrenToProcess.length; i++) {
      const child = childrenToProcess[i];
  
      if (child.type.startsWith('input-')) {
        setWaitingForInput(child);
        return; // Stop processing this group and wait for input
      }
  
      if (child.type === 'logic-wait') {
        if (child.props?.duration) {
          await new Promise(resolve => setTimeout(resolve, child.props.duration * 1000));
        }
        continue;
      }
  
      const interpolatedContent = interpolateVariables(child.props?.content);
      setPreviewMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          sender: 'bot',
          content: <div dangerouslySetInnerHTML={{ __html: interpolatedContent }} />,
        },
      ]);
    }
  
    // If we've processed all children in the group without waiting for input,
    // find the next connected group and continue the flow.
    const nextConnection = connectionsRef.current.find(
      (c) => c.from === group.id && c.buttonIndex === undefined
    );
  
    if (nextConnection) {
      const nextGroup = canvasBlocksRef.current.find((b) => b.id === nextConnection.to);
      if (nextGroup) {
        processGroup(nextGroup, 0);
      }
    } else {
      // End of flow for this branch
      setWaitingForInput(null);
    }
  };
  

  const startPreview = useCallback(() => {
    setPreviewMessages([]);
    previewVariablesRef.current = {};
    setWaitingForInput(null);
    setCurrentPreviewBlockId('start');
    processFlow('start', 0);
  }, [processFlow]);

  useEffect(() => {
    if (isPreviewOpen) {
      startPreview();
    }
  }, [isPreviewOpen, startPreview]);

  useEffect(() => {
    if (activeTab === 'Tema') {
      startPreview();
    }
  }, [activeTab, startPreview]);
  
  const handleUserButtonClick = (buttonIndex: number) => {
    if (!waitingForInput) return;

    const clickedButton = waitingForInput.props.buttons[buttonIndex];
    if (!clickedButton) return;

    setPreviewMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'user', content: clickedButton.text },
    ]);
    
    const parentId = waitingForInput.id;
    setWaitingForInput(null);

    processFlow(parentId, 0, buttonIndex);
  };
  
  const handleImageChoiceClick = (choiceIndex: number) => {
    if (!waitingForInput) return;
    const parentId = waitingForInput.id;
    setWaitingForInput(null);
    processFlow(parentId, 0, choiceIndex);
  }


  const handleUserInput = () => {
    if (!userInput.trim() || !waitingForInput) return;
  
    setPreviewMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', content: userInput },
    ]);
  
    if (waitingForInput.props.variable) {
      previewVariablesRef.current[waitingForInput.props.variable] = userInput;
    }
  
    const lastInputBlockId = waitingForInput.id;
    const parentGroup = canvasBlocksRef.current.find(g => g.children?.some(c => c.id === lastInputBlockId));
    
    setUserInput('');
    setWaitingForInput(null);

    if (parentGroup) {
      const childIndex = parentGroup.children?.findIndex(c => c.id === lastInputBlockId) ?? -1;
      if (childIndex !== -1 && childIndex + 1 < (parentGroup.children?.length ?? 0)) {
         processGroup(parentGroup, childIndex + 1);
      } else {
         const nextConnection = connectionsRef.current.find(c => c.from === parentGroup.id);
         if (nextConnection?.to) {
           const nextGroup = canvasBlocksRef.current.find(g => g.id === nextConnection.to);
           if (nextGroup) {
             processGroup(nextGroup, 0);
           }
         }
      }
    }
  };

  const selectedBlock = findBlock(selectedBlockId);
  const selectedBlockPosition = getBlockPosition(selectedBlockId);

  const SettingsPanel = () => {
    if (!selectedBlock) return null;

    const props = {
      block: selectedBlock,
      onUpdate: updateBlockProps,
      position: selectedBlockPosition,
    };

    switch(selectedBlock.type) {
      case 'image':
        return <ImageBlockSettings {...props} />;
      case 'video':
        return <VideoBlockSettings {...props} />;
      case 'audio':
        return <AudioBlockSettings {...props} />;
      case 'embed':
        return <EmbedBlockSettings {...props} />;
      case 'logic-wait':
        return <WaitBlockSettings {...props} />;
      case 'logic-redirect':
        return <RedirectBlockSettings {...props} />;
      case 'logic-abtest':
        return <ABTestSettings {...props} />;
      case 'logic-jump':
        return <JumpToBlockSettings {...props} groups={canvasBlocks.filter(b => b.type === 'group')} />;
      case 'input-buttons':
        return <ButtonsBlockSettings {...props} />;
      case 'input-text':
        return <TextBlockSettings {...props} variables={variables} onAddVariable={(v) => setVariables(p => [...p, v])}/>;
      case 'input-email':
        return <EmailBlockSettings {...props} variables={variables} onAddVariable={(v) => setVariables(p => [...p, v])}/>;
      case 'input-website':
        return <WebsiteBlockSettings {...props} variables={variables} onAddVariable={(v) => setVariables(p => [...p, v])}/>;
      case 'input-pic':
        return <ImageChoiceSettings {...props} />;
      default:
        return null;
    }
  };


  return (
    <div className="flex h-screen w-full flex-col bg-[#111111] text-white">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#262626] px-4">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-[#262626]"
            onClick={() => router.back()}
          >
            <ArrowLeft size={16} />
          </Button>
          <div className="h-6 w-px bg-[#262626]"></div>
          <h1 className="text-sm font-medium">{funnel.name}</h1>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-[#262626]"
            >
              <Undo2 size={16} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-[#262626]"
            >
              <Redo2 size={16} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-lg bg-[#181818] p-1">
            {(['Fluxo', 'Tema', 'Configurações', 'Compartilhar'] as EditorTab[]).map(tab => (
                <Button 
                    key={tab}
                    variant={activeTab === tab ? 'secondary' : 'ghost'}
                    size="sm"
                    className={cn(
                        "h-8 px-4 text-xs font-medium",
                        activeTab === tab ? 'bg-[#3f3f46] text-white' : 'text-white/60 hover:bg-[#3f3f46] hover:text-white'
                    )}
                    onClick={() => setActiveTab(tab)}
                >
                    {tab}
                </Button>
            ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            className="h-9 gap-2 text-sm font-medium text-white/80 hover:bg-[#262626] hover:text-white"
            onClick={() => setIsPreviewOpen(true)}
          >
            <TestTube2 size={16} /> Testar
          </Button>
          {isPublished ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="secondary">
                  <span className="relative mr-2 flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                  </span>
                  Publicado
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleCopyUrl}>
                  <ClipboardCopy className="mr-2 h-4 w-4" />
                  Copiar Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handlePublishToggle(false)}>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Deixar Offline
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button size="sm" onClick={() => handlePublishToggle(true)}>
              <Rocket className="mr-2 h-4 w-4" />
              Publicar
            </Button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {activeTab === 'Fluxo' && (
             <aside className="w-64 shrink-0 border-r border-[#262626] bg-[#181818]">
                <ScrollArea className="h-full">
                    <div className="space-y-4 p-3">
                    {Object.entries(blocks).map(([category, items]) => (
                        <div key={category}>
                        <h3 className="mb-2 px-1 text-xs font-semibold uppercase text-white/40">
                            {category}
                        </h3>
                        <div className="grid grid-cols-2 gap-2">
                            {items.map((item) => (
                            <Button
                                key={item.name}
                                variant="ghost"
                                className="h-9 w-full justify-start gap-2 bg-[#262626] text-sm font-normal text-white/80 hover:bg-[#3f3f46] hover:text-white"
                                onClick={() => addBlock(item.type)}
                            >
                                <span className={cn(item.color)}>{item.icon}</span>
                                {item.name}
                            </Button>
                            ))}
                        </div>
                        </div>
                    ))}
                    </div>
                </ScrollArea>
            </aside>
        )}
        {activeTab === 'Tema' && (
            <aside className="w-72 shrink-0 border-r border-[#262626] bg-[#181818] p-4">
                <Accordion type="multiple" defaultValue={['global', 'chat']} className="w-full">
                    <AccordionItem value="templates">
                        <AccordionTrigger className="border-b border-[#262626] py-3 text-sm font-medium hover:no-underline"><Sparkles size={16} className="mr-2"/>Templates</AccordionTrigger>
                        <AccordionContent className="pt-4 text-white/60">
                           Em breve...
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="global">
                        <AccordionTrigger className="border-b border-[#262626] py-3 text-sm font-medium hover:no-underline"><Globe size={16} className="mr-2"/>Global</AccordionTrigger>
                        <AccordionContent className="pt-4 text-white/60">
                           Configurações de aparência global.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="chat">
                        <AccordionTrigger className="border-b border-[#262626] py-3 text-sm font-medium hover:no-underline"><MessageSquare size={16} className="mr-2"/>Chat</AccordionTrigger>
                         <AccordionContent className="pt-4 text-white/60">
                           Configurações de aparência do chat.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="css">
                        <AccordionTrigger className="py-3 text-sm font-medium hover:no-underline"><Code size={16} className="mr-2"/>Custom CSS</AccordionTrigger>
                         <AccordionContent className="pt-4 text-white/60">
                           Adicione seu próprio CSS.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </aside>
        )}

        <div className="flex-1 relative">
          <main
            ref={canvasRef}
            className={cn(
              'h-full w-full pointer-events-auto',
              activeTab !== 'Fluxo' && 'hidden'
            )}
            style={{
              background: '#1d1d1d',
              backgroundImage:
                'radial-gradient(circle at center, rgba(128, 128, 128, 0.3) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
            onMouseDown={handleCanvasMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onWheel={handleWheel}
            onContextMenu={(e) => e.preventDefault()}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                transformOrigin: '0 0',
              }}
            >
              <svg className="absolute inset-0 w-full h-full overflow-visible z-0">
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="7"
                    refX="0"
                    refY="3.5"
                    orient="auto"
                  >
                    <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
                  </marker>
                </defs>
                <g>
                  {connections.map((conn, index) => {
                    const fromHandleId =
                      conn.buttonIndex !== undefined
                        ? `output-${conn.from}-${conn.buttonIndex}`
                        : `output-${conn.from}`;
                    const fromPos = getHandlePosition(fromHandleId);
                    const toPos = getHandlePosition(`input-${conn.to}`);

                    if (fromPos && toPos) {
                      return (
                        <path
                          key={index}
                          d={getSmoothStepPath(
                            fromPos.x,
                            fromPos.y,
                            toPos.x,
                            toPos.y
                          )}
                          stroke="#f97316"
                          strokeWidth="2"
                          fill="none"
                          markerEnd="url(#arrowhead)"
                        />
                      );
                    }
                    return null;
                  })}

                  {drawingConnection && (
                    <path
                      d={getSmoothStepPath(
                        drawingConnection.from.x,
                        drawingConnection.from.y,
                        drawingConnection.to.x,
                        drawingConnection.to.y
                      )}
                      stroke="#f97316"
                      strokeWidth="2"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                    />
                  )}
                </g>
              </svg>
              <div
                id="start-node"
                className="absolute flex items-center gap-2 rounded-lg bg-[#262626] px-3 py-2 w-52 pointer-events-auto"
                style={{
                  transform: `translate(50px, 50px)`,
                }}
              >
                <PlaySquare size={16} className="text-white/60" />
                <span className="text-sm font-medium">Início</span>
                <div className="flex-grow" />
                <ConnectionHandle
                  data-handle-id="output-start"
                  onMouseDown={(e) => {
                    e.stopPropagation();
                    onConnectionStart(e, 'start', 'output');
                  }}
                />
              </div>
              {canvasBlocks
                .filter((b) => !b.parentId)
                .map((block, index) => {
                  const BlockComponent =
                    block.type === 'group' ? CanvasGroupBlock : CanvasTextBlock;
                  const groupIndex = canvasBlocks
                    .filter((b) => b.type === 'group' && !b.parentId)
                    .findIndex((g) => g.id === block.id);
                  return (
                    <BlockComponent
                      key={block.id}
                      block={block}
                      groupIndex={groupIndex}
                      onBlockMouseDown={handleBlockMouseDown}
                      onDuplicate={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        duplicateBlock(block.id);
                      }}
                      onDelete={(e: React.MouseEvent) => {
                        e.stopPropagation();
                        deleteBlock(block.id);
                      }}
                      onContextMenu={handleContextMenu}
                      isSelected={selectedBlockId === block.id}
                      setSelectedBlockId={setSelectedBlockId}
                      dropIndicator={dropIndicator}
                      updateBlockProps={updateBlockProps}
                      variables={variables}
                      onConnectionStart={onConnectionStart}
                      selectedBlockId={selectedBlockId}
                    />
                  );
                })}
            </div>
          </main>
          {activeTab === 'Tema' && (
            <div className="w-full h-full bg-[#1d1d1d] flex items-center justify-center p-4">
              <div className="w-[360px] h-[640px] rounded-2xl shadow-2xl overflow-hidden">
                 <TypebotPreview 
                    previewMessages={previewMessages}
                    waitingForInput={waitingForInput}
                    handleUserButtonClick={handleUserButtonClick}
                    handleImageChoiceClick={handleImageChoiceClick}
                    userInput={userInput}
                    setUserInput={setUserInput}
                    handleUserInput={handleUserInput}
                 />
              </div>
            </div>
          )}
        </div>

        <SettingsPanel />
        {contextMenu.visible && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            onDuplicate={handleDuplicateFromMenu}
            onDelete={handleDeleteFromMenu}
          />
        )}
      </div>
      {isPreviewOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-96 shrink-0 border-l border-[#262626] bg-[#111111] flex flex-col shadow-2xl">
          <div className="flex h-14 items-center justify-between border-b border-gray-800 px-4 shrink-0">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-white border-gray-700 bg-gray-800 hover:bg-gray-700">
                <Globe size={14} className="mr-2" />
                Web
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-white"
                onClick={startPreview}
              >
                <RefreshCw size={14} className="mr-2" />
                Reiniciar
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
              onClick={() => setIsPreviewOpen(false)}
            >
              <X size={16} />
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <TypebotPreview 
                previewMessages={previewMessages}
                waitingForInput={waitingForInput}
                handleUserButtonClick={handleUserButtonClick}
                handleImageChoiceClick={handleImageChoiceClick}
                userInput={userInput}
                setUserInput={setUserInput}
                handleUserInput={handleUserInput}
            />
          </div>
        </div>
      )}
    </div>
  );
}
