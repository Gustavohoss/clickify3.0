'use client';

import React, {
    useState,
    useRef,
    useEffect,
  } from 'react';

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
  ImageIcon,
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
  Video,
  Check,
  XCircle,
  CheckCircle,
  Info,
  AudioWaveform,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Heading2,
  Heading3,
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Funnel, CanvasBlock } from './types.tsx';

type DropIndicator = {
    groupId: number;
    index: number;
  } | null;

export const TypebotEditor = ({ funnel, setFunnel, debouncedUpdateFunnel }: { funnel: Funnel, setFunnel: (updater: (prev: Funnel) => Funnel) => void, debouncedUpdateFunnel: any, deleteBlock?: (id: number) => void }) => {
    const [activeTab, setActiveTab] = useState('Flow');
    const [isPanning, setIsPanning] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const startPanPosition = useRef({ x: 0, y: 0 });
    const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([]);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
    
    const [draggingState, setDraggingState] = useState<{
        blockId: number | null;
        isDragging: boolean;
        dragStartMouse: { x: number; y: number };
        dragStartOffset: { x: number; y: number };
        originalBlock: CanvasBlock | null;
        isReadyToDrag: boolean;
    }>({
        blockId: null,
        isDragging: false,
        dragStartMouse: { x: 0, y: 0 },
        dragStartOffset: { x: 0, y: 0 },
        originalBlock: null,
        isReadyToDrag: false,
    });
    const [dropIndicator, setDropIndicator] = useState<DropIndicator>(null);
  
  
    const addBlock = (type: string) => {
        if (!canvasRef.current) return;
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const basePosition = {
          x: (canvasRect.width / 2) / zoom - panOffset.x - 150,
          y: (canvasRect.height / 2) / zoom - panOffset.y - 50,
        };
      
        if (type === 'group') {
          const newBlock: CanvasBlock = {
            id: Date.now(),
            type: 'group',
            position: basePosition,
            children: [],
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
          };
      
          const groupBlock: CanvasBlock = {
            id: groupBlockId,
            type: 'group',
            position: basePosition,
            children: [childBlock],
          };
      
          setCanvasBlocks((prev) => [...prev, groupBlock]);
        }
      };
    
    const duplicateBlock = (blockId: number) => {
      const blockToDuplicate = canvasBlocks.find(block => block.id === blockId);
      if (!blockToDuplicate) return;
  
      const newBlock: CanvasBlock = {
        ...blockToDuplicate,
        id: Date.now(),
        position: {
          x: blockToDuplicate.position.x + 20,
          y: blockToDuplicate.position.y + 20,
        },
        children: blockToDuplicate.children ? [] : undefined // Don't duplicate children for now
      };
      setCanvasBlocks(prev => [...prev, newBlock]);
    };
  
    const deleteBlock = (blockId: number) => {
      let blockToRemove: CanvasBlock | undefined;
      let parentOfBlock: CanvasBlock | undefined;

      // Search for the block to remove
      for (const block of canvasBlocks) {
          if (block.id === blockId) {
              blockToRemove = block;
              break;
          }
          if (block.children) {
              const child = block.children.find(c => c.id === blockId);
              if (child) {
                  blockToRemove = child;
                  parentOfBlock = block;
                  break;
              }
          }
      }

      if (!blockToRemove) return;

      setCanvasBlocks(prev => {
          if (parentOfBlock) {
              // It's a child block, remove it from its parent
              return prev.map(p =>
                  p.id === parentOfBlock!.id
                      ? { ...p, children: p.children?.filter(c => c.id !== blockId) }
                      : p
              );
          } else {
              // It's a root-level block
              return prev.filter(b => b.id !== blockId);
          }
      });
  };
    
  
    const blocks = {
      Bubbles: [
        { name: 'Text', icon: <MessageCircle size={16} />, type: 'text' },
        { name: 'Image', icon: <ImageIcon size={16} />, type: 'image' },
        { name: 'Video', icon: <Video size={16} />, type: 'video' },
        { name: 'Embed', icon: <Code2 size={16} />, type: 'embed' },
        { name: 'Audio', icon: <AudioWaveform size={16} />, type: 'audio' },
      ],
      Inputs: [
        { name: 'Text', icon: <TextCursorInput size={16} />, type: 'input-text' },
        { name: 'Number', icon: <span className="font-bold">7</span>, type: 'input-number' },
        { name: 'Email', icon: <MessageCircle size={16} />, type: 'input-email' },
        { name: 'Website', icon: <Link2 size={16} />, type: 'input-website' },
        { name: 'Date', icon: <Calendar size={16} />, type: 'input-date' },
        { name: 'Time', icon: <Clock size={16} />, type: 'input-time' },
        { name: 'Phone', icon: <Phone size={16} />, type: 'input-phone' },
        { name: 'Buttons', icon: <CheckSquare2 size={16} />, type: 'input-buttons' },
        { name: 'Pic choice', icon: <PictureInPicture size={16} />, type: 'input-pic' },
        { name: 'Payment', icon: <CreditCard size={16} />, type: 'input-payment' },
        { name: 'Rating', icon: <StarHalf size={16} />, type: 'input-rating' },
        { name: 'File', icon: <UploadCloud size={16} />, type: 'input-file' },
        { name: 'Cards', icon: <CreditCard size={16} />, type: 'input-cards' },
      ],
      Logic: [
          { name: 'Set variable', icon: <Variable size={16} />, type: 'logic-variable' },
          { name: 'Condition', icon: <GitBranch size={16} />, type: 'logic-condition' },
          { name: 'Redirect', icon: <ArrowRightLeft size={16} />, type: 'logic-redirect' },
          { name: 'Script', icon: <FileCode size={16} />, type: 'logic-script' },
          { name: 'Typebot', icon: <Bot size={16} />, type: 'logic-typebot' },
          { name: 'Wait', icon: <Clock10 size={16} />, type: 'logic-wait' },
          { name: 'AB Test', icon: <GitCompareArrows size={16} />, type: 'logic-abtest' },
          { name: 'Webhook', icon: <Webhook size={16} />, type: 'logic-webhook' },
          { name: 'Jump', icon: <GitCommit size={16} />, type: 'logic-jump' },
          { name: 'Return', icon: <GitPullRequest size={16} />, type: 'logic-return' },
      ],
      Groups: [
        { name: 'Group', icon: <Combine size={16} />, type: 'group' },
      ],
    };
  
    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLElement>) => {
      if (e.target === e.currentTarget) {
        setIsPanning(true);
        startPanPosition.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.style.cursor = 'grabbing';
        setSelectedBlockId(null);
      }
    };
    
    const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
        if (draggingState.isDragging && draggingState.blockId !== null && draggingState.originalBlock) {
            const draggedBlock = canvasBlocks.find(b => b.id === draggingState.blockId);
            if (!draggedBlock) return;
    
            let isDroppedOnTarget = false;
            let updatedBlocks = [...canvasBlocks];
    
            if (dropIndicator) {
                isDroppedOnTarget = true;
                const targetGroupIndex = updatedBlocks.findIndex(b => b.id === dropIndicator.groupId);
                if (targetGroupIndex > -1) {
                    const targetGroup = { ...updatedBlocks[targetGroupIndex] };
                    const blockToInsert = {
                        ...draggingState.originalBlock,
                        parentId: targetGroup.id,
                        position: { x: 0, y: 0 }
                    };
                    const newChildren = [...(targetGroup.children || [])];
                    newChildren.splice(dropIndicator.index, 0, blockToInsert);
                    targetGroup.children = newChildren;
                    updatedBlocks[targetGroupIndex] = targetGroup;
                    updatedBlocks = updatedBlocks.filter(b => b.id !== draggedBlock.id);
                }
            } else {
                if (draggedBlock.type !== 'group') {
                    isDroppedOnTarget = true;
                    const newGroupId = Date.now();
                    const blockToMove = { ...draggingState.originalBlock, parentId: newGroupId, position: { x: 0, y: 0 } };
                    const newGroup: CanvasBlock = {
                        id: newGroupId,
                        type: 'group',
                        position: draggedBlock.position,
                        children: [blockToMove],
                    };
                    updatedBlocks = updatedBlocks.filter(b => b.id !== draggedBlock.id);
                    updatedBlocks.push(newGroup);
                }
            }
    
            if (isDroppedOnTarget) {
                setCanvasBlocks(updatedBlocks);
            }
    
        } else if (!draggingState.isDragging && draggingState.blockId) {
            setSelectedBlockId(draggingState.blockId);
        }
    
        setIsPanning(false);
        setDraggingState({ blockId: null, isDragging: false, dragStartMouse: { x: 0, y: 0 }, dragStartOffset: { x: 0, y: 0 }, originalBlock: null, isReadyToDrag: false });
        setDropIndicator(null);
        if (canvasRef.current) {
            canvasRef.current.style.cursor = 'default';
        }
    };
    
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      if (isPanning || draggingState.isDragging) {
        setIsPanning(false);

        if (draggingState.isDragging && draggingState.originalBlock && draggingState.blockId) {
             setCanvasBlocks(prevBlocks => {
                const existingBlockIndex = prevBlocks.findIndex(b => b.id === draggingState.originalBlock!.id);
                if (existingBlockIndex > -1) {
                   const newBlocks = [...prevBlocks];
                   newBlocks[existingBlockIndex] = draggingState.originalBlock!;
                   return newBlocks.filter(b => b.id !== draggingState.blockId || b.id === draggingState.originalBlock!.id);
                } else {
                    const parent = prevBlocks.find(p => p.children?.some(c => c.id === draggingState.originalBlock!.id));
                    if(parent) {
                        return prevBlocks.map(p => {
                            if (p.id === parent.id) {
                                return { ...p, children: [...p.children!, draggingState.originalBlock!] };
                            }
                            return p;
                        }).filter(b => b.id !== draggingState.blockId);
                    }
                }
                return prevBlocks;
            });
        }
        setDraggingState({ blockId: null, isDragging: false, dragStartMouse: { x: 0, y: 0 }, dragStartOffset: { x: 0, y: 0 }, originalBlock: null, isReadyToDrag: false });
        setDropIndicator(null);
        if (canvasRef.current) {
          canvasRef.current.style.cursor = 'default';
        }
      }
    };
    
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (isPanning) {
            const dx = (e.clientX - startPanPosition.current.x);
            const dy = (e.clientY - startPanPosition.current.y);
            setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            startPanPosition.current = { x: e.clientX, y: e.clientY };
            return;
        } 
        
        if (draggingState.isReadyToDrag && !draggingState.isDragging) {
            const dx = Math.abs(e.clientX - draggingState.dragStartMouse.x);
            const dy = Math.abs(e.clientY - draggingState.dragStartMouse.y);
            
            if (dx > 5 || dy > 5) { 
                setDraggingState(prev => ({ ...prev, isDragging: true }));
                 if (canvasRef.current) {
                    canvasRef.current.style.cursor = 'grabbing';
                }

                if (draggingState.originalBlock?.parentId && canvasRef.current) {
                    const childElement = document.getElementById(`block-${draggingState.originalBlock.id}`);
                    if (!childElement) return;

                    const canvasRect = canvasRef.current.getBoundingClientRect();
                    
                    const newBlockId = Date.now();
                    const detachedBlock: CanvasBlock = {
                        ...draggingState.originalBlock,
                        id: newBlockId,
                        parentId: undefined, 
                        position: {
                            x: (childElement.getBoundingClientRect().left - canvasRect.left - panOffset.x) / zoom,
                            y: (childElement.getBoundingClientRect().top - canvasRect.top - panOffset.y) / zoom,
                        }
                    };

                    setCanvasBlocks(prevBlocks => [
                        ...prevBlocks.map(p =>
                            p.id === draggingState.originalBlock!.parentId
                                ? { ...p, children: p.children?.filter(c => c.id !== draggingState.originalBlock!.id) }
                                : p
                        ),
                        detachedBlock,
                    ]);

                    setDraggingState(prev => ({ 
                        ...prev, 
                        blockId: newBlockId,
                    }));
                }
            }
        }

        if (draggingState.isDragging && draggingState.blockId) {
          const newX = (e.clientX - canvasRect.current!.getBoundingClientRect().left - panOffset.x) / zoom - draggingState.dragStartOffset.x;
          const newY = (e.clientY - canvasRect.current!.getBoundingClientRect().top - panOffset.y) / zoom - draggingState.dragStartOffset.y;
  
          setCanvasBlocks(prevBlocks =>
              prevBlocks.map(block =>
                  block.id === draggingState.blockId ? { ...block, position: { x: newX, y: newY } } : block
              )
          );

            const dropX = (e.clientX - panOffset.x) / zoom;
            const dropY = (e.clientY - panOffset.y) / zoom;
            let foundTarget = false;

            for (const block of canvasBlocks) {
                if (block.type === 'group' && block.id !== draggingState.blockId) {
                    const groupEl = document.getElementById(`block-${block.id}`);
                    if (!groupEl) continue;
                    
                    const groupRect = groupEl.getBoundingClientRect();
                    const canvasRect = canvasRef.current!.getBoundingClientRect();

                    const groupLeft = (groupRect.left - canvasRect.left - panOffset.x) / zoom;
                    const groupTop = (groupRect.top - canvasRect.top - panOffset.y) / zoom;
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
                        const childrenContainer = groupEl.querySelector('[data-children-container]');

                        if (childrenContainer) {
                           const childElements = Array.from(childrenContainer.children);
                           for (let i = 0; i < childElements.length; i++) {
                               const childEl = childElements[i] as HTMLElement;
                               if(childEl.dataset.testid === 'drop-placeholder') continue;
                               const childRect = childEl.getBoundingClientRect();
                               const childTopInCanvas = (childRect.top - canvasRect.top - panOffset.y) / zoom;
                               const dropZoneMidpoint = childTopInCanvas + (childRect.height / zoom) / 2;
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
        
        let blockToDrag: CanvasBlock | undefined;
        let parentGroup: CanvasBlock | undefined;
        if(block.parentId){
            parentGroup = canvasBlocks.find(p => p.id === block.parentId);
            if(parentGroup?.children){
                blockToDrag = parentGroup.children.find(c => c.id === block.id);
            }
        } else {
            blockToDrag = canvasBlocks.find(b => b.id === block.id);
        }
        
        if (!blockToDrag || !canvasRef.current) return;
    
        const canvasRect = canvasRef.current.getBoundingClientRect();
        const startX = (e.clientX - canvasRect.left - panOffset.x) / zoom;
        const startY = (e.clientY - canvasRect.top - panOffset.y) / zoom;
    
        const blockPosition = block.parentId 
            ? { x: parentGroup!.position.x + blockToDrag.position.x, y: parentGroup!.position.y + blockToDrag.position.y }
            : blockToDrag.position;

        setDraggingState({
            blockId: blockToDrag.id,
            isDragging: false,
            isReadyToDrag: true,
            dragStartMouse: { x: e.clientX, y: e.clientY },
            dragStartOffset: {
                x: startX - blockPosition.x,
                y: startY - blockPosition.y,
            },
            originalBlock: JSON.parse(JSON.stringify(blockToDrag))
        });
    };
    
  
    const BlockButton = ({ name, icon, type }: { name: string; icon: React.ReactNode; type: string }) => (
      <Button 
        variant="ghost" 
        className="h-9 w-full justify-start gap-2 bg-[#262626] text-sm font-normal text-white/80 hover:bg-[#3f3f46] hover:text-white"
        onClick={() => addBlock(type)}
      >
        {icon}
        {name}
      </Button>
    );
    
    return (
      <div className="flex h-screen w-full flex-col bg-[#111111] text-white">
        {/* Header */}
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#262626] px-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#262626]">
              <ArrowLeft size={16} />
            </Button>
            <div className="h-6 w-px bg-[#262626]"></div>
            <h1 className="text-sm font-medium">{funnel.name}</h1>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#262626]">
                <Undo2 size={16} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#262626]">
                <Redo2 size={16} />
              </Button>
            </div>
          </div>
  
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="h-9 gap-2 text-sm font-medium text-white/80 hover:bg-[#262626] hover:text-white">
              <Share2 size={16} /> Share
            </Button>
            <Button variant="ghost" className="h-9 gap-2 text-sm font-medium text-white/80 hover:bg-[#262626] hover:text-white">
              <TestTube2 size={16} /> Test
            </Button>
            <Button className="h-9 bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">
              Publish
            </Button>
          </div>
        </header>
  
        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar */}
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
                        <BlockButton key={item.name} name={item.name} icon={item.icon} type={item.type} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </aside>
  
          {/* Canvas */}
          <main
            ref={canvasRef}
            className="relative flex-1 overflow-hidden"
            style={{
              backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              backgroundPosition: `${panOffset.x}px ${panOffset.y}px`
            }}
            onMouseDown={handleCanvasMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
              <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2">
                  <div className="flex items-center gap-1 rounded-md bg-[#181818] p-1">
                      {['Flow', 'Theme', 'Settings', 'Share'].map((tab) => (
                      <Button
                          key={tab}
                          variant={activeTab === tab ? 'secondary' : 'ghost'}
                          size="sm"
                          onClick={() => setActiveTab(tab)}
                          className={cn(
                          'h-7 px-3 text-xs',
                          activeTab === tab
                              ? 'bg-[#262626] text-white'
                              : 'text-white/60 hover:bg-[#262626] hover:text-white'
                          )}
                      >
                          {tab}
                      </Button>
                      ))}
                  </div>
              </div>
            <div 
              className="relative h-full w-full"
               style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: 'top left',
               }}
            >
             <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    transform: `translate(${panOffset.x}px, ${panOffset.y}px)`,
                    width: '100%',
                    height: '100%',
                }}
             >
              {/* Static Start Node */}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-lg bg-[#262626] px-3 py-2"
                  style={{
                      transform: `translate(-50%, -50%) translate(-200px, 0px)`
                  }}
              >
                  <PlaySquare size={16} className="text-white/60" />
                  <span className="text-sm font-medium">Start</span>
                  <div className="h-3 w-3 rounded-full border-2 border-orange-400 bg-transparent" />
              </div>
  
              {/* Dynamically Rendered Blocks */}
              {canvasBlocks.filter(b => !b.parentId).map((block) => {
                const BlockComponent = block.type === 'group' ? CanvasGroupBlock : CanvasTextBlock;
                const groupIndex = canvasBlocks.filter(b => b.type === 'group' && !b.parentId).findIndex(g => g.id === block.id)
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
                    isSelected={selectedBlockId === block.id}
                    setSelectedBlockId={setSelectedBlockId}
                    dropIndicator={dropIndicator}
                    allBlocks={canvasBlocks}
                    deleteBlock={deleteBlock}
                    selectedBlockId={selectedBlockId}
                  />
                );
              })}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };
  
  const CanvasGroupBlock = ({
    block,
    groupIndex,
    onBlockMouseDown,
    onDuplicate,
    onDelete,
    isSelected,
    setSelectedBlockId,
    dropIndicator,
    allBlocks,
    deleteBlock,
    selectedBlockId,
  }: {
    block: CanvasBlock;
    groupIndex: number;
    onBlockMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
    onDuplicate: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
    isSelected: boolean;
    setSelectedBlockId: (id: number | null) => void;
    dropIndicator: DropIndicator;
    allBlocks: CanvasBlock[];
    deleteBlock: (id: number) => void;
    selectedBlockId: number | null;
  }) => (
    <div
      id={`block-${block.id}`}
      className="group absolute w-72 cursor-grab select-none"
      style={{
        transform: `translate(${block.position.x}px, ${block.position.y}px)`,
      }}
      onMouseDown={(e) => onBlockMouseDown(e, block)}
    >
      <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-md bg-[#181818] p-1 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Play size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
          onClick={onDuplicate}
        >
          <Copy size={14} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
          onClick={onDelete}
        >
          <Trash2 size={14} />
        </Button>
      </div>
  
      <div className={cn("w-72 rounded-lg bg-[#262626] p-3 space-y-2", isSelected && "ring-2 ring-blue-500")}>
        <div className="text-sm font-medium">Group #{groupIndex + 1}</div>
        <div data-children-container className="min-h-[50px] rounded-md border border-dashed border-white/20 p-2 space-y-2">
            {(block.children || []).map((child, index) => (
                <React.Fragment key={child.id}>
                    {dropIndicator?.groupId === block.id && dropIndicator.index === index && <DropPlaceholder />}
                    <CanvasTextBlock
                        block={child}
                        onBlockMouseDown={(e, b) => onBlockMouseDown(e,b)}
                        onDuplicate={(e) => { e.stopPropagation(); /* Not implemented for children */}}
                        onDelete={(e) => {
                          e.stopPropagation();
                          deleteBlock(child.id);
                        }}
                        isSelected={selectedBlockId === child.id}
                        setSelectedBlockId={setSelectedBlockId}
                        isChild={true}
                        allBlocks={allBlocks}
                    />
                </React.Fragment>
            ))}
            {dropIndicator?.groupId === block.id && dropIndicator.index === (block.children?.length || 0) && <DropPlaceholder />}
        </div>
      </div>
    </div>
  );
  

 const CanvasTextBlock = ({
      block,
      onBlockMouseDown,
      onDuplicate,
      onDelete,
      isSelected,
      setSelectedBlockId,
      isChild = false,
      allBlocks,
      deleteBlock,
      selectedBlockId,
    }: {
      block: CanvasBlock;
      onBlockMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
      onDuplicate: (e: React.MouseEvent) => void;
      onDelete: (e: React.MouseEvent) => void;
      isSelected: boolean;
      setSelectedBlockId: (id: number | null) => void;
      isChild?: boolean;
      allBlocks: CanvasBlock[];
      dropIndicator?: DropIndicator;
      groupIndex?: number;
      deleteBlock?: (id: number) => void;
      selectedBlockId?: number | null;
    }) => (
        <div
            id={`block-${block.id}`}
            className={cn(
                'group w-full cursor-grab select-none',
                !isChild && 'absolute w-72'
            )}
            style={!isChild ? {
                transform: `translate(${block.position.x}px, ${block.position.y}px)`,
            } : {}}
            onMouseDown={(e) => onBlockMouseDown(e, block)}
        >
            {!isChild && (
                <div className="absolute -top-10 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-md bg-[#181818] p-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
                        onClick={(e) => { e.stopPropagation(); /* Logic for Play */ }}
                    >
                        <Play size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDuplicate(e);
                        }}
                    >
                        <Copy size={14} />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/70 hover:bg-[#3f3f46] hover:text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(e);
                        }}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )}

            <div className={cn("w-full rounded-lg", !isChild && "bg-[#262626] p-3", isChild && "relative")}>
                {isChild && deleteBlock && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 text-white/40 opacity-0 group-hover:opacity-100"
                        onClick={(e) => { e.stopPropagation(); if(onDelete) onDelete(e); }}
                    >
                        <Trash2 size={12} />
                    </Button>
                )}
                
                <div
                  className={cn(
                    "flex items-center justify-between rounded-md bg-[#181818] p-2",
                    isSelected && "ring-2 ring-blue-500"
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBlockId(block.id);
                  }}
                >
                    <div className="flex items-center gap-2">
                        <MessageCircle size={16} className="text-white/60" />
                        <span className="text-sm text-white/60">...</span>
                    </div>
                    <div className="h-3 w-3 rounded-full border-2 border-orange-400 bg-transparent" />
                </div>

                {isSelected && (
                    <div className="mt-2 rounded-md border border-blue-500 bg-[#181818] p-2">
                        <input
                            type="text"
                            className="w-full bg-transparent text-sm text-white outline-none"
                            placeholder="Digite aqui..."
                            onClick={(e) => e.stopPropagation()}
                            onMouseDown={(e) => e.stopPropagation()} // Prevent drag from starting on input click
                        />
                    </div>
                )}
            </div>
        </div>
    );

const DropPlaceholder = () => (
    <div data-testid="drop-placeholder" className="h-10 w-full rounded-md border-2 border-dashed border-orange-500 bg-orange-500/10" />
);
