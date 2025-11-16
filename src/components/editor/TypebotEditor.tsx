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


export const TypebotEditor = ({ funnel }: { funnel: Funnel, setFunnel: (updater: (prev: Funnel) => Funnel) => void, debouncedUpdateFunnel: any }) => {
    const [activeTab, setActiveTab] = useState('Flow');
    const [isPanning, setIsPanning] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const startPanPosition = useRef({ x: 0, y: 0 });
    const [canvasBlocks, setCanvasBlocks] = useState<CanvasBlock[]>([]);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [selectedBlockId, setSelectedBlockId] = useState<number | null>(null);
    
    const [draggingBlockId, setDraggingBlockId] = useState<number | null>(null);
    const dragStartOffset = useRef({ x: 0, y: 0 });
  
  
    const addBlock = (type: string) => {
      if (!canvasRef.current) return;
      const canvasRect = canvasRef.current.getBoundingClientRect();
  
      const newBlock: CanvasBlock = {
        id: Date.now(),
        type,
        position: {
          x: (canvasRect.width / 2) / zoom - panOffset.x - 150, // center horizontally
          y: (canvasRect.height / 2) / zoom - panOffset.y - 50, // center vertically
        },
        children: type === 'group' ? [] : undefined,
      };
      setCanvasBlocks((prev) => [...prev, newBlock]);
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
      };
      setCanvasBlocks(prev => [...prev, newBlock]);
    };
  
    const deleteBlock = (blockId: number) => {
      setCanvasBlocks(prev => prev.filter(block => block.id !== blockId));
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
    };
  
    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
      // Only pan if clicking on the canvas background
      if (e.target === e.currentTarget) {
        setIsPanning(true);
        startPanPosition.current = { x: e.clientX, y: e.clientY };
        e.currentTarget.style.cursor = 'grabbing';
        setSelectedBlockId(null);
      }
    };
    
    const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
      setIsPanning(false);
      setDraggingBlockId(null);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'default';
      }
    };
    
    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      // We only stop panning/dragging if the mouse button is not pressed
      if (e.buttons === 0) {
        setIsPanning(false);
        setDraggingBlockId(null);
        if (canvasRef.current) {
          canvasRef.current.style.cursor = 'default';
        }
      }
    };
    
    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
      if (isPanning) {
        const dx = (e.clientX - startPanPosition.current.x) / zoom;
        const dy = (e.clientY - startPanPosition.current.y) / zoom;
        setPanOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
        startPanPosition.current = { x: e.clientX, y: e.clientY };
      } else if (draggingBlockId !== null) {
        const newX = (e.clientX / zoom) - panOffset.x - dragStartOffset.current.x;
        const newY = (e.clientY / zoom) - panOffset.y - dragStartOffset.current.y;
    
        setCanvasBlocks(prevBlocks =>
          prevBlocks.map(block =>
            block.id === draggingBlockId ? { ...block, position: { x: newX, y: newY } } : block
          )
        );
      }
    };
    
    const handleBlockMouseDown = (e: React.MouseEvent, block: CanvasBlock) => {
      e.stopPropagation();
      setDraggingBlockId(block.id);
      setSelectedBlockId(block.id);
      // Calculate the offset from the block's top-left corner to the mouse position
      const startX = (e.clientX / zoom) - panOffset.x;
      const startY = (e.clientY / zoom) - panOffset.y;
      dragStartOffset.current = {
        x: startX - block.position.x,
        y: startY - block.position.y
      };
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'grabbing';
      }
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
    
    const CanvasTextBlock = ({
      block,
      onMouseDown,
      onDuplicate,
      onDelete,
      isSelected,
    }: {
      block: CanvasBlock;
      onMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
      onDuplicate: (e: React.MouseEvent) => void;
      onDelete: (e: React.MouseEvent) => void;
      isSelected: boolean;
    }) => (
        <div
            className="group absolute w-72 cursor-grab select-none"
            style={{
                transform: `translate(${block.position.x}px, ${block.position.y}px)`,
            }}
            onMouseDown={(e) => onMouseDown(e, block)}
        >
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

            <div className="w-72 rounded-lg bg-[#262626] p-3">
                <div className="text-sm font-medium">Group #{block.id.toString().slice(-2)}</div>
                {isSelected ? (
                    <div className="mt-2 rounded-md border-2 border-orange-500">
                        <div className="flex items-center justify-between border-b border-orange-500/50 p-2">
                            <span className="text-xs text-white/70">Texto</span>
                            <button className="rounded bg-black/30 p-1 hover:bg-black/50">
                                <Code size={14} className="text-white/70" />
                            </button>
                        </div>
                        <div className="p-2">
                            <input
                                type="text"
                                className="w-full bg-transparent text-sm text-white outline-none"
                                placeholder="Digite aqui..."
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="mt-2 flex items-center justify-between rounded-md bg-[#181818] p-2">
                        <div className="flex items-center gap-2">
                            <MessageCircle size={16} className="text-white/60" />
                            <span className="text-sm text-white/60">...</span>
                        </div>
                        <div className="h-3 w-3 rounded-full border-2 border-orange-400 bg-transparent" />
                    </div>
                )}
            </div>
        </div>
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
            }}
            onMouseDown={handleMouseDown}
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
                  transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoom})`,
                  transformOrigin: '0 0',
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
              {canvasBlocks.map((block) => {
                const BlockComponent = block.type === 'group' ? CanvasGroupBlock : CanvasTextBlock;
                
                return (
                  <BlockComponent
                    key={block.id}
                    block={block}
                    onMouseDown={handleBlockMouseDown}
                    onDuplicate={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      duplicateBlock(block.id);
                    }}
                    onDelete={(e: React.MouseEvent) => {
                      e.stopPropagation();
                      deleteBlock(block.id);
                    }}
                    isSelected={selectedBlockId === block.id}
                  />
                );
              })}
  
            </div>
          </main>
        </div>
      </div>
    );
  };
  
  const CanvasGroupBlock = ({
    block,
    onMouseDown,
    onDuplicate,
    onDelete,
    isSelected,
  }: {
    block: CanvasBlock;
    onMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
    onDuplicate: (e: React.MouseEvent) => void;
    onDelete: (e: React.MouseEvent) => void;
    isSelected: boolean;
  }) => (
    <div
      className="group absolute w-72 cursor-grab select-none"
      style={{
        transform: `translate(${block.position.x}px, ${block.position.y}px)`,
      }}
      onMouseDown={(e) => onMouseDown(e, block)}
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
  
      <div className="w-72 rounded-lg bg-[#262626] p-3 space-y-2">
        <div className="text-sm font-medium">Group #{block.id.toString().slice(-2)}</div>
        <div className="min-h-[50px] rounded-md border border-dashed border-white/20 p-2">
            {block.children?.map(child => (
                 <div key={child.id} className="rounded-md bg-zinc-700 p-2 text-sm">
                    {child.type}
                 </div>
            ))}
        </div>
      </div>
    </div>
  );
  
