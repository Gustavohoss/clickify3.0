
'use client';

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
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
  Image as ImageIconLucide,
  GanttChart,
  AtSign,
  Braces,
  Video,
  Plus,
  ChevronsUpDown,
  Globe,
  X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { Funnel, CanvasBlock, CanvasConnection } from './types.tsx';
import ReactPlayer from 'react-player';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar.tsx';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion.tsx';
import { Badge } from '../ui/badge.tsx';
import { Textarea } from '../ui/textarea.tsx';

const ButtonsBlockSettings = ({
  block,
  onUpdate,
  position,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
}) => {
  const props = block.props || {};
  const buttons = props.buttons || [];

  const handleChange = (key: string, value: any) => {
    onUpdate(block.id, { ...props, [key]: value });
  };

  const handleButtonChange = (index: number, newText: string) => {
    const newButtons = [...buttons];
    newButtons[index].text = newText;
    handleChange('buttons', newButtons);
  };

  const addButton = () => {
    const newButtons = [...buttons, { text: 'New Button' }];
    handleChange('buttons', newButtons);
  };

  const removeButton = (index: number) => {
    const newButtons = buttons.filter((_: any, i: number) => i !== index);
    handleChange('buttons', newButtons);
  };

  return (
    <div
      className="absolute w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
      style={{
        left: `${position.x + 300}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
        <div>
            <Label className="text-xs text-white/50">Conteúdo</Label>
            <Textarea
                value={props.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                placeholder="Digite sua pergunta aqui..."
                className="bg-[#181818] border-[#3f3f46] text-white mt-1"
            />
        </div>
      <div>
        <Label className="text-xs text-white/50">Item</Label>
        <div className="space-y-2 mt-1">
          {buttons.map((button: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={button.text}
                onChange={(e) => handleButtonChange(index, e.target.value)}
                className="bg-[#181818] border-[#3f3f46] text-white"
              />
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white/50 hover:bg-[#3f3f46]" onClick={() => removeButton(index)}>
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-2 border-[#3f3f46] hover:bg-[#3f3f46]" onClick={addButton}>
          Adicionar opção
        </Button>
      </div>

      <div className="flex items-center justify-between rounded-lg bg-[#181818] p-3">
        <Label htmlFor="multiple-choice" className="text-sm">Habilitar múltipla escolha</Label>
        <Switch id="multiple-choice" checked={props.multipleChoice} onCheckedChange={(c) => handleChange('multipleChoice', c)} />
      </div>

    </div>
  );
};


const ImageBlockSettings = ({
  block,
  onUpdate,
  position,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
}) => {
  const [imageUrl, setImageUrl] = useState(block.props?.imageUrl || '');
  const [onClickLink, setOnClickLink] = useState(block.props?.onClickLink || false);

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(e.target.value);
    onUpdate(block.id, { ...block.props, imageUrl: e.target.value });
  };

  const handleOnClickLinkChange = (checked: boolean) => {
    setOnClickLink(checked);
    onUpdate(block.id, { ...block.props, onClickLink: checked });
  };

  return (
    <div
      className="absolute w-72 rounded-lg bg-[#262626] p-3 shadow-lg"
      style={{
        left: `${position.x + 300}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Tabs defaultValue="link" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-transparent p-0 h-auto">
          <TabsTrigger value="link" className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md">
            Link
          </TabsTrigger>
          <TabsTrigger value="upload" className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md">
            Enviar
          </TabsTrigger>
          <TabsTrigger value="giphy" className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md">
            Giphy
          </TabsTrigger>
          <TabsTrigger value="unsplash" className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md">
            Unsplash
          </TabsTrigger>
          <TabsTrigger value="icon" className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md">
            Ícone
          </TabsTrigger>
        </TabsList>
        <TabsContent value="link" className="mt-4">
          <div className="space-y-4">
            <Input
              placeholder="Cole o link da imagem..."
              value={imageUrl}
              onChange={handleImageUrlChange}
              className="bg-[#181818] border-[#3f3f46] text-white"
            />
            <div className="flex items-center space-x-2">
              <Switch id="on-click-link" checked={onClickLink} onCheckedChange={handleOnClickLinkChange} />
              <Label htmlFor="on-click-link" className="text-sm">
                Abrir link ao clicar
              </Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const VideoBlockSettings = ({
  block,
  onUpdate,
  position,
}: {
  block: CanvasBlock;
  onUpdate: (id: number, props: any) => void;
  position: { x: number; y: number };
}) => {
  const [videoUrl, setVideoUrl] = useState(block.props?.videoUrl || '');

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(e.target.value);
    onUpdate(block.id, { ...block.props, videoUrl: e.target.value });
  };

  return (
    <div
      className="absolute w-72 rounded-lg bg-[#262626] p-3 shadow-lg"
      style={{
        left: `${position.x + 300}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <Tabs defaultValue="link" className="w-full">
        <TabsList className="grid w-full grid-cols-1 bg-transparent p-0 h-auto">
          <TabsTrigger value="link" className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md">
            Link
          </TabsTrigger>
        </TabsList>
        <TabsContent value="link" className="mt-4">
          <div className="space-y-4">
            <Input
              placeholder="Cole o link do vídeo..."
              value={videoUrl}
              onChange={handleVideoUrlChange}
              className="bg-[#181818] border-[#3f3f46] text-white"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const AudioBlockSettings = ({
    block,
    onUpdate,
    position,
  }: {
    block: CanvasBlock;
    onUpdate: (id: number, props: any) => void;
    position: { x: number; y: number };
  }) => {
    const [audioUrl, setAudioUrl] = useState(block.props?.audioUrl || '');
    const [autoplay, setAutoplay] = useState(block.props?.autoplay || false);
  
    const handleAudioUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAudioUrl(e.target.value);
      onUpdate(block.id, { ...block.props, audioUrl: e.target.value });
    };

    const handleAutoplayChange = (checked: boolean) => {
        setAutoplay(checked);
        onUpdate(block.id, { ...block.props, autoplay: checked });
    };
  
    return (
      <div
        className="absolute w-72 rounded-lg bg-[#262626] p-3 shadow-lg"
        style={{
          left: `${position.x + 300}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <Tabs defaultValue="link" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto">
            <TabsTrigger value="upload" className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md">
              Enviar
            </TabsTrigger>
            <TabsTrigger value="link" className="text-xs data-[state=active]:bg-[#3f3f46] data-[state=active]:text-white rounded-md">
              Incorporar link
            </TabsTrigger>
          </TabsList>
          <TabsContent value="link" className="mt-4">
            <div className="space-y-4">
              <Input
                placeholder="Cole o link do arquivo de áudio..."
                value={audioUrl}
                onChange={handleAudioUrlChange}
                className="bg-[#181818] border-[#3f3f46] text-white"
              />
               <p className="text-xs text-center text-white/50">Funciona com .MP3 e .WAV</p>
              <div className="flex items-center space-x-2">
                <Switch id="autoplay" checked={autoplay} onCheckedChange={handleAutoplayChange} />
                <Label htmlFor="autoplay" className="text-sm">
                  Habilitar autoplay
                </Label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  const EmailBlockSettings = ({
    block,
    onUpdate,
    position,
    variables,
    onAddVariable,
  }: {
    block: CanvasBlock;
    onUpdate: (id: number, props: any) => void;
    position: { x: number; y: number };
    variables: string[];
    onAddVariable: (name: string) => void;
  }) => {
    const props = block.props || {};
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (key: string, value: any) => {
      onUpdate(block.id, { ...props, [key]: value });
    };

    const handleVariableSelect = (value: string) => {
        handleChange('variable', value);
        setOpen(false);
    }

    const handleCreateVariable = () => {
        if (searchTerm && !variables.includes(searchTerm)) {
            onAddVariable(searchTerm);
            handleVariableSelect(searchTerm);
        }
    }
  
    const filteredVariables = variables.filter((v) => v.toLowerCase().includes(searchTerm.toLowerCase()));
    const showCreateOption = searchTerm && !filteredVariables.some(v => v.toLowerCase() === searchTerm.toLowerCase());

    return (
      <div
        className="absolute w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
        style={{
          left: `${position.x + 300}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div>
          <Label className="text-xs text-white/50">Texto de exemplo</Label>
          <div className="relative mt-1">
            <Input
              placeholder="Digite seu email..."
              value={props.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className="bg-[#181818] border-[#3f3f46] text-white pr-8"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <Braces size={16} />
            </button>
          </div>
        </div>
  
        <div>
          <Label className="text-xs text-white/50">Rótulo do botão</Label>
          <div className="relative mt-1">
            <Input
              placeholder="Enviar"
              value={props.buttonLabel || ''}
              onChange={(e) => handleChange('buttonLabel', e.target.value)}
              className="bg-[#181818] border-[#3f3f46] text-white pr-8"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <Braces size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between rounded-lg bg-[#181818] p-3">
          <Label htmlFor="retry-message" className="text-sm">Habilitar mensagem de nova tentativa</Label>
          <Switch id="retry-message" checked={props.retryMessage} onCheckedChange={(c) => handleChange('retryMessage', c)} />
        </div>
  
        <div>
          <Label className="text-xs text-white/50">Salvar a resposta em uma variável</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-[#181818] border-[#3f3f46] hover:bg-[#181818] hover:text-white text-white mt-1"
                >
                {props.variable || "Selecione uma variável..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-[#262626] border-[#3f3f46] text-white">
                <Command>
                    <CommandInput 
                        placeholder="Pesquisar ou criar..." 
                        className="h-9 text-white" 
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        <CommandEmpty>Nenhuma variável encontrada.</CommandEmpty>
                        <CommandGroup>
                            {filteredVariables.map((variable) => (
                                <CommandItem
                                key={variable}
                                value={variable}
                                onSelect={() => handleVariableSelect(variable)}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    props.variable === variable ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {variable}
                                </CommandItem>
                            ))}
                             {showCreateOption && (
                                <CommandItem
                                    onSelect={handleCreateVariable}
                                    className="text-blue-400"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Criar <span className="font-bold mx-1">{searchTerm}</span>
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  };

  const DateBlockSettings = ({
    block,
    onUpdate,
    position,
    variables,
    onAddVariable,
  }: {
    block: CanvasBlock;
    onUpdate: (id: number, props: any) => void;
    position: { x: number; y: number };
    variables: string[];
    onAddVariable: (name: string) => void;
  }) => {
    const props = block.props || {};
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (key: string, value: any) => {
      onUpdate(block.id, { ...props, [key]: value });
    };

    const handleVariableSelect = (value: string) => {
        handleChange('variable', value);
        setOpen(false);
    }

    const handleCreateVariable = () => {
        if (searchTerm && !variables.includes(searchTerm)) {
            onAddVariable(searchTerm);
            handleVariableSelect(searchTerm);
        }
    }
  
    const filteredVariables = variables.filter((v) => v.toLowerCase().includes(searchTerm.toLowerCase()));
    const showCreateOption = searchTerm && !filteredVariables.some(v => v.toLowerCase() === searchTerm.toLowerCase());

    return (
      <div
        className="absolute w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
        style={{
          left: `${position.x + 300}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <Label htmlFor="is-range" className="text-sm">É um intervalo</Label>
          <Switch id="is-range" checked={props.isRange} onCheckedChange={(c) => handleChange('isRange', c)} />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="with-time" className="text-sm">Com hora</Label>
          <Switch id="with-time" checked={props.withTime} onCheckedChange={(c) => handleChange('withTime', c)} />
        </div>
  
        <div>
          <Label className="text-xs text-white/50">Rótulo do botão</Label>
          <div className="relative mt-1">
            <Input
              placeholder="Enviar"
              value={props.buttonLabel || ''}
              onChange={(e) => handleChange('buttonLabel', e.target.value)}
              className="bg-[#181818] border-[#3f3f46] text-white pr-8"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <Braces size={16} />
            </button>
          </div>
        </div>

        <div>
          <Label className="text-xs text-white/50">Min</Label>
          <div className="relative mt-1">
            <Input
              placeholder="YYYY-MM-DD"
              value={props.minDate || ''}
              onChange={(e) => handleChange('minDate', e.target.value)}
              className="bg-[#181818] border-[#3f3f46] text-white pr-8"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <Braces size={16} />
            </button>
          </div>
        </div>

        <div>
          <Label className="text-xs text-white/50">Max</Label>
          <div className="relative mt-1">
            <Input
              placeholder="YYYY-MM-DD"
              value={props.maxDate || ''}
              onChange={(e) => handleChange('maxDate', e.target.value)}
              className="bg-[#181818] border-[#3f3f46] text-white pr-8"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <Braces size={16} />
            </button>
          </div>
        </div>

        <div>
          <Label className="text-xs text-white/50">Formato</Label>
          <div className="relative mt-1">
            <Input
              placeholder="dd/MM/yyyy"
              value={props.format || ''}
              onChange={(e) => handleChange('format', e.target.value)}
              className="bg-[#181818] border-[#3f3f46] text-white pr-8"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <Braces size={16} />
            </button>
          </div>
        </div>
  
        <div>
          <Label className="text-xs text-white/50">Salvar a resposta em uma variável</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-[#181818] border-[#3f3f46] hover:bg-[#181818] hover:text-white text-white mt-1"
                >
                {props.variable || "Selecione uma variável..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-[#262626] border-[#3f3f46] text-white">
                <Command>
                    <CommandInput 
                        placeholder="Pesquisar ou criar..." 
                        className="h-9 text-white" 
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        <CommandEmpty>Nenhuma variável encontrada.</CommandEmpty>
                        <CommandGroup>
                            {filteredVariables.map((variable) => (
                                <CommandItem
                                key={variable}
                                value={variable}
                                onSelect={() => handleVariableSelect(variable)}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    props.variable === variable ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {variable}
                                </CommandItem>
                            ))}
                             {showCreateOption && (
                                <CommandItem
                                    onSelect={handleCreateVariable}
                                    className="text-blue-400"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Criar <span className="font-bold mx-1">{searchTerm}</span>
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  };

  const TextBlockSettings = ({
    block,
    onUpdate,
    position,
    variables,
    onAddVariable,
  }: {
    block: CanvasBlock;
    onUpdate: (id: number, props: any) => void;
    position: { x: number; y: number };
    variables: string[];
    onAddVariable: (name: string) => void;
  }) => {
    const props = block.props || {};
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleChange = (key: string, value: any) => {
      onUpdate(block.id, { ...props, [key]: value });
    };

    const handleVariableSelect = (value: string) => {
        handleChange('variable', value);
        setOpen(false);
    }

    const handleCreateVariable = () => {
        if (searchTerm && !variables.includes(searchTerm)) {
            onAddVariable(searchTerm);
            handleVariableSelect(searchTerm);
        }
    }
  
    const filteredVariables = variables.filter((v) => v.toLowerCase().includes(searchTerm.toLowerCase()));
    const showCreateOption = searchTerm && !filteredVariables.some(v => v.toLowerCase() === searchTerm.toLowerCase());

    return (
      <div
        className="absolute w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
        style={{
          left: `${position.x + 300}px`,
          top: `${position.y}px`,
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <Label htmlFor="long-text" className="text-sm">Texto longo</Label>
          <Switch id="long-text" checked={props.longText} onCheckedChange={(c) => handleChange('longText', c)} />
        </div>
        
        <div>
          <Label className="text-xs text-white/50">Texto de exemplo</Label>
          <div className="relative mt-1">
            <Input
              placeholder="Digite sua resposta..."
              value={props.placeholder || ''}
              onChange={(e) => handleChange('placeholder', e.target.value)}
              className="bg-[#181818] border-[#3f3f46] text-white pr-8"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <Braces size={16} />
            </button>
          </div>
        </div>
  
        <div>
          <Label className="text-xs text-white/50">Rótulo do botão</Label>
          <div className="relative mt-1">
            <Input
              placeholder="Enviar"
              value={props.buttonLabel || ''}
              onChange={(e) => handleChange('buttonLabel', e.target.value)}
              className="bg-[#181818] border-[#3f3f46] text-white pr-8"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
              <Braces size={16} />
            </button>
          </div>
        </div>
        
        <div>
          <Label className="text-xs text-white/50">Modo de entrada</Label>
          <Select value={props.inputMode || 'text'} onValueChange={(v) => handleChange('inputMode', v)}>
            <SelectTrigger className="mt-1 bg-[#181818] border-[#3f3f46]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#262626] border-[#3f3f46] text-white">
              <SelectItem value="text">Texto</SelectItem>
              <SelectItem value="number">Número</SelectItem>
              <SelectItem value="email">Email</SelectItem>
            </SelectContent>
          </Select>
        </div>
  
        <div className="flex items-center justify-between rounded-lg bg-[#181818] p-3">
          <Label htmlFor="allow-audio-clip" className="text-sm">Permitir clipe de áudio</Label>
          <Switch id="allow-audio-clip" checked={props.allowAudioClip} onCheckedChange={(c) => handleChange('allowAudioClip', c)} />
        </div>
  
        <div className="flex items-center justify-between rounded-lg bg-[#181818] p-3">
          <Label htmlFor="allow-attachments" className="text-sm">Permitir anexos</Label>
          <Switch id="allow-attachments" checked={props.allowAttachments} onCheckedChange={(c) => handleChange('allowAttachments', c)} />
        </div>
  
        <div>
          <Label className="text-xs text-white/50">Salvar a resposta em uma variável</Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between bg-[#181818] border-[#3f3f46] hover:bg-[#181818] hover:text-white text-white mt-1"
                >
                {props.variable || "Selecione uma variável..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0 bg-[#262626] border-[#3f3f46] text-white">
                <Command>
                    <CommandInput 
                        placeholder="Pesquisar ou criar..." 
                        className="h-9 text-white" 
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        <CommandEmpty>Nenhuma variável encontrada.</CommandEmpty>
                        <CommandGroup>
                            {filteredVariables.map((variable) => (
                                <CommandItem
                                key={variable}
                                value={variable}
                                onSelect={() => handleVariableSelect(variable)}
                                >
                                <Check
                                    className={cn(
                                    "mr-2 h-4 w-4",
                                    props.variable === variable ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {variable}
                                </CommandItem>
                            ))}
                             {showCreateOption && (
                                <CommandItem
                                    onSelect={handleCreateVariable}
                                    className="text-blue-400"
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Criar <span className="font-bold mx-1">{searchTerm}</span>
                                </CommandItem>
                            )}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    );
  };

const WaitBlockSettings = ({
    block,
    onUpdate,
    position,
  }: {
    block: CanvasBlock;
    onUpdate: (id: number, props: any) => void;
    position: { x: number; y: number };
}) => {
    const props = block.props || {};

    const handleChange = (key: string, value: any) => {
        onUpdate(block.id, { ...props, [key]: value });
    };

    return (
        <div
            className="absolute w-72 rounded-lg bg-[#262626] p-4 shadow-lg space-y-4 text-white"
            style={{
                left: `${position.x + 300}px`,
                top: `${position.y}px`,
            }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div>
                <Label className="text-sm">Seconds to wait for:</Label>
                <div className="relative mt-1">
                    <Input
                        type="number"
                        placeholder="2"
                        value={props.duration || ''}
                        onChange={(e) => handleChange('duration', e.target.value ? Number(e.target.value) : '')}
                        className="bg-[#181818] border-[#3f3f46] text-white pr-8 focus:border-orange-500 focus-visible:ring-orange-500"
                    />
                    <button className="absolute right-2 top-1/2 -translate-y-1/2 text-white/50 hover:text-white">
                        <Braces size={16} />
                    </button>
                </div>
            </div>
            <Accordion type="single" collapsible>
                <AccordionItem value="advanced" className="border-none">
                    <AccordionTrigger className="text-sm p-2 hover:no-underline hover:bg-[#3f3f46] rounded-md">
                        Advanced
                    </AccordionTrigger>
                    <AccordionContent className="p-2 space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="show-timer" className="text-sm">
                                Show timer
                            </Label>
                            <Switch
                                id="show-timer"
                                checked={props.showTimer}
                                onCheckedChange={(c) => handleChange('showTimer', c)}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

const EditableTextBlock = memo(
  ({ initialContent, onSave, onVariableInsert, variables, isSelected }) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
    useEffect(() => {
      const editor = editorRef.current;
      if (editor && editor.innerHTML !== initialContent) {
        editor.innerHTML = initialContent || '';
      }
    }, [initialContent]);
    
    const handleBlur = () => {
      if (editorRef.current) {
        onSave(editorRef.current.innerHTML);
      }
    };
    
    const handleVariableInsert = (variable: string) => {
      const editor = editorRef.current;
      if (!editor) return;
    
      editor.focus();
    
      document.execCommand('insertHTML', false, `<span style="color: #a78bfa;" contenteditable="false">{{${variable}}}</span>&nbsp;`);
      
      onSave(editor.innerHTML);
      setIsPopoverOpen(false);
    };

    return (
      <div className="relative w-full">
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          onBlur={handleBlur}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          onInput={(e) => {
            if (editorRef.current) {
              onSave(editorRef.current.innerHTML);
            }
          }}
          dangerouslySetInnerHTML={{ __html: initialContent || '' }}
          data-placeholder="Digite sua mensagem..."
          className="w-full bg-transparent text-sm text-white outline-none resize-none p-0 pr-8 min-h-[20px] [&[data-placeholder]]:before:content-[attr(data-placeholder)] [&[data-placeholder]]:before:text-white/40 [&:not(:empty)]:before:hidden"
        />
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <button
              className="absolute right-1 top-1 h-6 w-6 rounded bg-[#3f3f46] flex items-center justify-center hover:bg-[#4a4a52]"
            >
              <Braces size={14} />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-48 p-0 bg-[#262626] border-[#3f3f46] text-white">
            <Command>
              <CommandInput placeholder="Procurar variável..." className="h-9 text-white" />
              <CommandList>
                <CommandEmpty>Nenhuma variável encontrada.</CommandEmpty>
                <CommandGroup>
                  {variables.map((variable) => (
                    <CommandItem
                      key={variable}
                      value={variable}
                      onSelect={() => handleVariableInsert(variable)}
                    >
                      {variable}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);


const CanvasTextBlock = ({
  block,
  onBlockMouseDown,
  onContextMenu,
  isSelected,
  setSelectedBlockId,
  isChild = false,
  updateBlockProps,
  variables,
}: {
  block: CanvasBlock;
  onBlockMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
  onContextMenu: (e: React.MouseEvent, block: CanvasBlock) => void;
  isSelected: boolean;
  setSelectedBlockId: (id: number | null) => void;
  isChild?: boolean;
  updateBlockProps: (id: number, props: any) => void;
  variables: string[];
}) => {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const renderInputBlock = (icon: React.ReactNode, placeholder: string) => (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-2 text-sm text-white/80 w-full">
        {icon}
        <span className="truncate">{placeholder}</span>
      </div>
      {block.props?.variable && (
        <div className="flex items-center gap-1.5 text-xs">
           <span className='text-white/60'>Set</span>
          <Badge className="bg-indigo-500 text-white hover:bg-indigo-600 px-2 py-0.5">{block.props.variable}</Badge>
        </div>
      )}
    </div>
  );

  const getBlockContent = () => {
    switch (block.type) {
      case 'image':
        if (block.props?.imageUrl) {
          return <img src={block.props.imageUrl} alt="Conteúdo fornecido pelo usuário" className="max-w-full h-auto object-contain rounded-md" />;
        }
        return (
          <div className="flex items-center gap-2">
            <ImageIconLucide size={16} className="text-sky-400" />
            <span className="text-sm text-white/60">Clique para editar...</span>
          </div>
        );
      case 'audio':
        if (block.props?.audioUrl) {
          return (
            <div className="w-full">
              {hasMounted && <ReactPlayer url={block.props.audioUrl} width="100%" height="50px" controls playing={block.props.autoplay} />}
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2">
            <AudioWaveform size={16} className="text-sky-400" />
            <span className="text-sm text-white/60">Clique para editar...</span>
          </div>
        );
      case 'video':
        if (block.props?.videoUrl) {
          return (
            <div className="w-full aspect-video">
              {hasMounted && <ReactPlayer url={block.props.videoUrl} width="100%" height="100%" controls />}
            </div>
          );
        }
        return (
          <div className="flex items-center gap-2">
            <Video size={16} className="text-sky-400" />
            <span className="text-sm text-white/60">Clique para editar...</span>
          </div>
        );
      case 'input-text':
        return renderInputBlock(
          <TextCursorInput size={16} className="text-orange-400 flex-shrink-0" />,
          block.props?.placeholder || 'Digite sua resposta...'
        );
      case 'input-email':
        return renderInputBlock(
          <AtSign size={16} className="text-orange-400 flex-shrink-0" />,
          block.props?.placeholder || 'Digite seu email...'
        );
      case 'input-date':
        return renderInputBlock(
          <Calendar size={16} className="text-orange-400 flex-shrink-0" />,
          block.props?.placeholder || 'Escolha uma data...'
        );
      case 'logic-wait':
        return (
          <div className="flex items-center gap-2 text-sm text-white/80 w-full">
            <Clock10 size={16} className="text-indigo-400 flex-shrink-0" />
            <span className="truncate">Aguarde por {block.props.duration || 0} segundo(s)</span>
          </div>
        );
      case 'text':
        return (
            <EditableTextBlock 
              initialContent={block.props?.content}
              onSave={(newContent) => updateBlockProps(block.id, { content: newContent })}
              variables={variables}
              onVariableInsert={(variable) => {
                const currentContent = block.props?.content || '';
                const newContent = `${currentContent}{{${variable}}}`;
                updateBlockProps(block.id, { content: newContent });
              }}
              isSelected={isSelected}
            />
          );
      case 'input-buttons':
        return (
          <div className="flex flex-col gap-2 w-full text-sm text-white/80">
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 flex items-center justify-center rounded border-2 border-orange-400">
                    <Check size={12} className="text-orange-400" />
                </div>
                <EditableTextBlock
                  initialContent={block.props?.content || 'Click to edit'}
                  onSave={(newContent) => updateBlockProps(block.id, { ...block.props, content: newContent })}
                  variables={variables}
                  onVariableInsert={(variable) => {
                     const currentContent = block.props?.content || '';
                     const newContent = `${currentContent}{{${variable}}}`;
                     updateBlockProps(block.id, { content: newContent });
                  }}
                  isSelected={isSelected}
                />
              </div>

              {(block.props?.buttons || []).map((button: any, index: number) => (
                <Button key={index} variant='outline' className='w-full justify-center bg-[#2a2a2a] border-[#3f3f46] text-white h-8'>
                    {button.text}
                </Button>
              ))}

              <Button
                variant='outline'
                className='w-full justify-center bg-[#2a2a2a] border-[#3f3f46] text-white h-8 mt-2'
                onClick={(e) => {
                  e.stopPropagation();
                  const newButtons = [...(block.props?.buttons || []), { text: 'New Button' }];
                  updateBlockProps(block.id, { ...block.props, buttons: newButtons });
                }}
              >
                Add Button
              </Button>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2">
            <MessageCircle size={16} className="text-sky-400" />
            <span className="text-sm text-white/60">...</span>
          </div>
        );
    }
  };

  return (
    <div
      id={`block-${block.id}`}
      className={cn('group w-full cursor-grab select-none', !isChild && 'absolute w-72')}
      style={!isChild ? { transform: `translate(${block.position.x}px, ${block.position.y}px)` } : {}}
      onMouseDown={(e) => {
        if (e.button !== 0) return;
        onBlockMouseDown(e, block);
      }}
      onContextMenu={(e) => onContextMenu(e, block)}
    >
      <div className={cn('w-full rounded-lg', !isChild && 'bg-[#262626] p-3', isChild && 'relative')}>
        <div
          className={cn(
            'flex flex-col items-start justify-between rounded-md bg-[#181818] p-2 min-h-[40px] gap-2',
            isSelected && (block.type.startsWith('input-') || block.type.startsWith('logic-') ? 'ring-2 ring-orange-500' : 'ring-2 ring-blue-500')
          )}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedBlockId(block.id);
          }}
        >
          {getBlockContent()}
        </div>
      </div>
    </div>
  );
};

type DropIndicator = {
  groupId: number;
  index: number;
} | null;

const ConnectionHandle = ({
  onMouseDown,
  isInput = false,
}: {
  onMouseDown: (e: React.MouseEvent) => void;
  isInput?: boolean;
}) => (
  <div
    className={cn(
      'absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border-2 border-orange-400 bg-[#111111] cursor-pointer z-10',
      isInput ? '-left-[5px]' : '-right-[5px]'
    )}
    onMouseDown={onMouseDown}
  />
);

const getSmoothStepPath = (x1: number, y1: number, x2: number, y2: number) => {
  const dx = x2 - x1;
  const halfDx = dx / 2;

  return `M ${x1},${y1} C ${x1 + halfDx},${y1} ${x1 + halfDx},${y2} ${x2},${y2}`;
};

const CanvasGroupBlock = ({
  block,
  groupIndex,
  onBlockMouseDown,
  onDuplicate,
  onDelete,
  onContextMenu,
  isSelected,
  setSelectedBlockId,
  dropIndicator,
  allBlocks,
  deleteBlock,
  selectedBlockId,
  updateBlockProps,
  variables,
  onConnectionStart,
}: {
  block: CanvasBlock;
  groupIndex: number;
  onBlockMouseDown: (e: React.MouseEvent, block: CanvasBlock) => void;
  onDuplicate: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
  onContextMenu: (e: React.MouseEvent, block: CanvasBlock) => void;
  isSelected: boolean;
  setSelectedBlockId: (id: number | null) => void;
  dropIndicator: DropIndicator;
  allBlocks: CanvasBlock[];
  deleteBlock: (id: number) => void;
  selectedBlockId: number | null;
  updateBlockProps: (id: number, props: any) => void;
  variables: string[];
  onConnectionStart: (e: React.MouseEvent, fromBlockId: number, fromHandle: 'output') => void;
}) => (
  <div
    id={`block-${block.id}`}
    className="group absolute w-72 cursor-grab select-none"
    style={{
      transform: `translate(${block.position.x}px, ${block.position.y}px)`,
    }}
    onMouseDown={(e) => {
      if (e.button !== 0) return;
      onBlockMouseDown(e, block);
    }}
    onContextMenu={(e) => onContextMenu(e, block)}
  >
    <ConnectionHandle
      onMouseDown={(e) => {
        e.stopPropagation();
        onConnectionStart(e, block.id, 'output');
      }}
    />
    <ConnectionHandle isInput onMouseDown={(e) => e.stopPropagation()} />

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

    <div className={cn('w-72 rounded-lg bg-[#262626] p-3 space-y-2', isSelected && 'ring-2 ring-blue-500')}>
      <div className="text-sm font-medium">Grupo #{groupIndex + 1}</div>
      <div data-children-container className="min-h-[50px] rounded-md border border-dashed border-white/20 p-2 space-y-2">
        {(block.children || []).map((child, index) => (
          <React.Fragment key={child.id}>
            {dropIndicator?.groupId === block.id && dropIndicator.index === index && <DropPlaceholder />}
            <CanvasTextBlock
              block={child}
              onBlockMouseDown={(e, b) => onBlockMouseDown(e, b)}
              onContextMenu={(e, block) => onContextMenu(e, block)}
              isSelected={selectedBlockId === child.id}
              setSelectedBlockId={setSelectedBlockId}
              isChild={true}
              updateBlockProps={updateBlockProps}
              variables={variables}
            />
          </React.Fragment>
        ))}
        {dropIndicator?.groupId === block.id && dropIndicator.index === (block.children?.length || 0) && <DropPlaceholder />}
      </div>
    </div>
  </div>
);

const DropPlaceholder = () => <div data-testid="drop-placeholder" className="h-10 w-full rounded-md border-2 border-dashed border-orange-500 bg-orange-500/10" />;

const ContextMenu = ({
  x,
  y,
  onDuplicate,
  onDelete,
}: {
  x: number;
  y: number;
  onDuplicate: () => void;
  onDelete: () => void;
}) => {
  return (
    <div
      className="absolute z-50 w-40 rounded-lg bg-[#262626] p-2 shadow-lg"
      style={{ top: y, left: x }}
    >
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm font-normal text-white/80 hover:bg-[#3f3f46] hover:text-white"
        onClick={onDuplicate}
      >
        <Copy size={14} /> Duplicar
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2 text-sm font-normal text-red-500 hover:bg-red-500/10 hover:text-red-500"
        onClick={onDelete}
      >
        <Trash2 size={14} /> Excluir
      </Button>
    </div>
  );
};

type PreviewMessage = {
    id: number;
    sender: 'bot' | 'user';
    content: React.ReactNode;
}


export function TypebotEditor({
  funnel,
  setFunnel,
  debouncedUpdateFunnel,
}: {
  funnel: Funnel;
  setFunnel: (updater: (prev: Funnel | null) => Funnel | null) => void;
  debouncedUpdateFunnel: any;
}) {
  const [activeTab, setActiveTab] = useState('Fluxo');
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
  const [currentPreviewBlockId, setCurrentPreviewBlockId] = useState<number | 'start' | null>(null);
  const [userInput, setUserInput] = useState('');
  
  const [waitingForInput, setWaitingForInput] = useState<CanvasBlock | null>(null);
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

  const previewVariablesRef = useRef<{[key:string]: any}>({});
  
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
                const newChildren = parent.children.filter((child) => child.id !== blockId);
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
          return { ...block, props: { ...block.props, ...props } };
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
    const x = (e.clientX - canvasRect.left);
    const y = (e.clientY - canvasRect.top);
    
    setContextMenu({
      visible: true,
      x: x,
      y: y,
      blockId: block.id,
    });
  };

  const handleDuplicateFromMenu = () => {
    if (contextMenu.blockId) {
      duplicateBlock(contextMenu.blockId);
    }
    setContextMenu({ visible: false, x: 0, y: 0, blockId: null });
  };

  const handleDeleteFromMenu = () => {
    if (contextMenu.blockId) {
      deleteBlock(contextMenu.blockId);
    }
    setContextMenu({ visible: false, x: 0, y: 0, blockId: null });
  };

  const blocks = {
    "Bolhas": [
        { name: 'Texto', icon: <MessageCircle size={16} />, type: 'text', color: 'text-sky-400' },
        { name: 'Imagem', icon: <ImageIconLucide size={16} />, type: 'image', color: 'text-sky-400' },
        { name: 'Vídeo', icon: <Video size={16} />, type: 'video', color: 'text-sky-400' },
        { name: 'Embutir', icon: <Code2 size={16} />, type: 'embed', color: 'text-sky-400' },
        { name: 'Áudio', icon: <AudioWaveform size={16} />, type: 'audio', color: 'text-sky-400' },
    ],
    "Entradas": [
        { name: 'Texto', icon: <TextCursorInput size={16} />, type: 'input-text', color: 'text-orange-400' },
        { name: 'Número', icon: <span className="font-bold">7</span>, type: 'input-number', color: 'text-orange-400' },
        { name: 'Email', icon: <AtSign size={16} />, type: 'input-email', color: 'text-orange-400' },
        { name: 'Website', icon: <Link2 size={16} />, type: 'input-website', color: 'text-orange-400' },
        { name: 'Data', icon: <Calendar size={16} />, type: 'input-date', color: 'text-orange-400' },
        { name: 'Hora', icon: <Clock size={16} />, type: 'input-time', color: 'text-orange-400' },
        { name: 'Telefone', icon: <Phone size={16} />, type: 'input-phone', color: 'text-orange-400' },
        { name: 'Botões', icon: <CheckSquare2 size={16} />, type: 'input-buttons', color: 'text-orange-400' },
        { name: 'Escolha de Imagem', icon: <PictureInPicture size={16} />, type: 'input-pic', color: 'text-orange-400' },
        { name: 'Pagamento', icon: <CreditCard size={16} />, type: 'input-payment', color: 'text-orange-400' },
        { name: 'Avaliação', icon: <StarHalf size={16} />, type: 'input-rating', color: 'text-orange-400' },
        { name: 'Arquivo', icon: <UploadCloud size={16} />, type: 'input-file', color: 'text-orange-400' },
        { name: 'Cartões', icon: <GanttChart size={16} />, type: 'input-cards', color: 'text-orange-400' },
    ],
    "Lógica": [
        { name: 'Definir variável', icon: <Variable size={16} />, type: 'logic-variable', color: 'text-indigo-400' },
        { name: 'Condição', icon: <GitBranch size={16} />, type: 'logic-condition', color: 'text-indigo-400' },
        { name: 'Redirecionar', icon: <ArrowRightLeft size={16} />, type: 'logic-redirect', color: 'text-indigo-400' },
        { name: 'Script', icon: <FileCode size={16} />, type: 'logic-script', color: 'text-indigo-400' },
        { name: 'Typebot', icon: <Bot size={16} />, type: 'logic-typebot', color: 'text-indigo-400' },
        { name: 'Aguardar', icon: <Clock10 size={16} />, type: 'logic-wait', color: 'text-indigo-400' },
        { name: 'Teste A/B', icon: <GitCompareArrows size={16} />, type: 'logic-abtest', color: 'text-indigo-400' },
        { name: 'Webhook', icon: <Webhook size={16} />, type: 'logic-webhook', color: 'text-indigo-400' },
        { name: 'Pular para', icon: <GitCommit size={16} />, type: 'logic-jump', color: 'text-indigo-400' },
        { name: 'Retornar', icon: <GitPullRequest size={16} />, type: 'logic-return', color: 'text-indigo-400' },
    ],
    "Grupos": [{ name: 'Grupo', icon: <Combine size={16} />, type: 'group', color: 'text-gray-400' }],
  };

  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      if (e.button === 0) { // Left click to pan
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
        const targetElement = e.target as HTMLElement;
        const targetBlockId = targetElement.closest('[id^="block-"]')?.id.split('-')[1];
  
        if (targetBlockId) {
          const toBlockId = parseInt(targetBlockId, 10);
          const fromBlockId = drawingConnection.fromBlockId;
          
          if(fromBlockId !== toBlockId) {
            setConnections((prev) => [
              ...prev.filter((c) => c.from !== fromBlockId),
              { from: fromBlockId, to: toBlockId },
            ]);
          }
        }
        setDrawingConnection(null);
    }
    
    if (draggingState.isDragging && draggingState.blockId !== null && draggingState.originalBlock) {
      const draggedBlock = findBlock(draggingState.blockId);
      if (!draggedBlock) return;
  
      let isDroppedOnTarget = false;
      let updatedBlocks = [...canvasBlocks];
  
      if (dropIndicator) {
        isDroppedOnTarget = true;
        const targetGroupIndex = updatedBlocks.findIndex((b) => b.id === dropIndicator.groupId);
  
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
            props: draggedBlock.props
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
    } else if (!draggingState.isDragging && draggingState.blockId && e.button === 0) {
      setSelectedBlockId(draggingState.blockId);
    }
  
    setIsPanning(false);
    setDrawingConnection(null);
    setDraggingState({ blockId: null, isDragging: false, dragStartMouse: { x: 0, y: 0 }, dragStartOffset: { x: 0, y: 0 }, originalBlock: null, isReadyToDrag: false });
    setDropIndicator(null);
    if (canvasRef.current) {
      canvasRef.current.style.cursor = 'default';
    }
  };
  
  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    const currentState = draggingState;
    if (isPanning || currentState.isDragging) {
      setIsPanning(false);

      if (currentState.isDragging && currentState.originalBlock && currentState.blockId) {
        const currentDraggedBlock = findBlock(currentState.blockId);
        
        if (!currentDraggedBlock) {
             setCanvasBlocks(prevBlocks => {
                let restoredBlocks = [...prevBlocks];
                
                restoredBlocks = restoredBlocks.filter(b => b.id !== currentState.blockId);

                const parentIndex = restoredBlocks.findIndex(p => p.id === currentState.originalBlock!.parentId);
                if (parentIndex > -1) {
                    const parent = { ...restoredBlocks[parentIndex] };
                    const children = [...(parent.children || [])];
                    const childExists = children.some(c => c.id === currentState.originalBlock!.id);
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

      setDraggingState({ blockId: null, isDragging: false, dragStartMouse: { x: 0, y: 0 }, dragStartOffset: { x: 0, y: 0 }, originalBlock: null, isReadyToDrag: false });
      setDropIndicator(null);
      if (canvasRef.current) {
        canvasRef.current.style.cursor = 'default';
      }
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const mousePos = {
        x: (e.clientX - canvasRect.left),
        y: (e.clientY - canvasRect.top),
    };

    if (drawingConnection) {
        setDrawingConnection((prev: any) => ({ ...prev, to: { x: (mousePos.x - panOffset.x) / zoom, y: (mousePos.y - panOffset.y) / zoom } }));
        return;
    }
    
    if (isPanning) {
      const dx = e.clientX - startPanPosition.current.x;
      const dy = e.clientY - startPanPosition.current.y;
      setPanOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      startPanPosition.current = { x: e.clientX, y: e.clientY };
      return;
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
            const parentGroup = canvasBlocks.find((p) => p.id === draggingState.originalBlock!.parentId);
            if (!parentGroup) return;

            const newBlockId = Date.now();

            const detachedBlock: CanvasBlock = {
                ...draggingState.originalBlock,
                id: newBlockId,
                parentId: undefined,
                position: {
                  x: parentGroup.position.x + draggingState.dragStartOffset.x,
                  y: parentGroup.position.y + draggingState.dragStartOffset.y,
                },
                props: draggingState.originalBlock.props,
            };

            const groupIsNowEmpty = parentGroup.children?.length === 1;
            
            setCanvasBlocks((prevBlocks) => [
                ...prevBlocks
                    .map((p) =>
                        p.id === draggingState.originalBlock!.parentId
                            ? { ...p, children: p.children?.filter((c) => c.id !== draggingState.originalBlock!.id) }
                            : p
                    )
                    .filter((p) => !(p.id === draggingState.originalBlock!.parentId && groupIsNowEmpty)),
                detachedBlock,
            ]);

            setDraggingState((prev) => ({
                ...prev,
                blockId: newBlockId,
                dragStartOffset: {
                    x: (e.clientX - canvasRect.left - panOffset.x) / zoom - detachedBlock.position.x,
                    y: (e.clientY - canvasRect.top - panOffset.y) / zoom - detachedBlock.position.y,
                },
            }));
        }
      }
    }

    if (draggingState.isDragging && draggingState.blockId && canvasRef.current) {
        if (isPanning) return;
        const newX = (e.clientX - canvasRect.left - panOffset.x) / zoom - draggingState.dragStartOffset.x;
        const newY = (e.clientY - canvasRect.top - panOffset.y) / zoom - draggingState.dragStartOffset.y;

        setCanvasBlocks((prevBlocks) => prevBlocks.map((block) => (block.id === draggingState.blockId ? { ...block, position: { x: newX, y: newY } } : block)));

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

            if (dropX >= groupLeft && dropX <= groupLeft + groupWidth && dropY >= groupTop && dropY <= groupTop + groupHeight) {
                foundTarget = true;
                let newIndex = block.children?.length || 0;
                const childrenContainer = groupEl.querySelector('[data-children-container]');

                if (childrenContainer) {
                const childElements = Array.from(childrenContainer.children) as HTMLElement[];
                for (let i = 0; i < childElements.length; i++) {
                    const childEl = childElements[i];
                    if (childEl.dataset.testid === 'drop-placeholder') continue;
                    const childRect = childEl.getBoundingClientRect();
                    const childTopInCanvas = (childRect.top - canvasRect.top) / zoom;
                    const dropZoneMidpoint = childTopInCanvas + childRect.height / zoom / 2;

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

    const blockToDrag = findBlock(block.id);
    if (!blockToDrag) return;

    let dragStartOffset;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    
    if (blockToDrag.parentId) {
        const blockElement = document.getElementById(`block-${blockToDrag.id}`);
        if(blockElement) {
          const blockRect = blockElement.getBoundingClientRect();
          dragStartOffset = {
            x: (e.clientX - blockRect.left) / zoom,
            y: (e.clientY - blockRect.top) / zoom,
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
      originalBlock: JSON.parse(JSON.stringify(blockToDrag)),
    });
  };

  const handleConnectionStart = (
    e: React.MouseEvent,
    fromBlockId: number | 'start',
    fromHandle: 'output'
  ) => {
    e.stopPropagation();
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();

    let startPos;
    if (fromBlockId === 'start') {
        const startNode = document.getElementById('start-node');
        if (startNode) {
            const rect = startNode.getBoundingClientRect();
            startPos = {
                x: (rect.right - canvasRect.left - panOffset.x) / zoom,
                y: (rect.top + rect.height / 2 - canvasRect.top - panOffset.y) / zoom,
            };
        }
    } else {
        const fromBlock = findBlock(fromBlockId as number);
        if (fromBlock && fromBlock.type === 'group') {
            const blockEl = document.getElementById(`block-${fromBlockId}`);
            if (blockEl) {
                const rect = blockEl.getBoundingClientRect();
                 startPos = {
                    x: (rect.right - canvasRect.left - panOffset.x) / zoom,
                    y: (rect.top + rect.height / 2 - canvasRect.top - panOffset.y) / zoom,
                };
            }
        }
    }

    if(startPos) {
        setDrawingConnection({
            fromBlockId,
            fromHandle,
            from: startPos,
            to: { x: startPos.x, y: startPos.y },
        });
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLElement>) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    const newZoom = e.deltaY > 0 ? zoom / zoomFactor : zoom * zoomFactor;

    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const mousePointX = (mouseX - panOffset.x) / zoom;
    const mousePointY = (mouseY - panOffset.y) / zoom;

    const newPanX = mouseX - mousePointX * newZoom;
    const newPanY = mouseY - mousePointY * newZoom;

    setZoom(newZoom);
    setPanOffset({ x: newPanX, y: newPanY });
  };


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

    const blockElement = document.getElementById(`block-${id}`);
    if (!blockElement) return { x: 0, y: 0 };

    const block = findBlock(id);
    if (block?.parentId) {
      const parent = findBlock(block.parentId);
      if (parent) {
        return {
          x: parent.position.x,
          y: parent.position.y,
        };
      }
    }
    if(block) return block.position

    return {x:0, y:0};
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

  const processFlow = useCallback((blockId: number | 'start' | null, startIndex = 0) => {
    if (blockId === null) {
        setWaitingForInput(null);
        return;
    }

    const findBlockInState = (id: number) => {
        for (const block of canvasBlocksRef.current) {
            if (block.id === id) return block;
        }
        return undefined;
    };

    const currentBlockId = blockId === 'start'
        ? connectionsRef.current.find((c) => c.from === 'start')?.to
        : blockId;

    if (!currentBlockId) {
        setWaitingForInput(null);
        return;
    }

    const currentBlock = findBlockInState(currentBlockId);
    if (!currentBlock || !currentBlock.children) {
        setWaitingForInput(null);
        return;
    }

    setCurrentPreviewBlockId(currentBlockId);

    let isWaiting = false;

    const childrenToProcess = currentBlock.children.slice(startIndex);

    for (let i = 0; i < childrenToProcess.length; i++) {
        const child = childrenToProcess[i];
        
        if (child.type === 'logic-wait') {
            const duration = child.props.duration || 0;
            if (duration > 0) {
                 setTimeout(() => {
                    processFlow(currentBlockId, startIndex + i + 1);
                }, duration * 1000);
                isWaiting = true;
                break;
            }
            continue;
        }
        
        if (child.type.startsWith('input-')) {
            setWaitingForInput(child);
            isWaiting = true;
            break; 
        }
        
        const interpolatedContent = interpolateVariables(
            child.props.content,
        );
        
        setPreviewMessages((prev) => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            sender: 'bot',
            content: <div dangerouslySetInnerHTML={{ __html: interpolatedContent }} />,
          },
        ]);
    }

    if (!isWaiting) {
        const nextGroupId = connectionsRef.current.find((c) => c.from === currentBlockId)?.to;
        if (nextGroupId) {
            setTimeout(() => processFlow(nextGroupId, 0), 500);
        } else {
            setWaitingForInput(null);
        }
    }
  }, [interpolateVariables]);

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

  const handleUserInput = () => {
    if (!userInput.trim() || !waitingForInput) return;
  
    setPreviewMessages(prev => [...prev, { id: Date.now(), sender: 'user', content: userInput }]);
  
    if (waitingForInput.props.variable) {
        previewVariablesRef.current[waitingForInput.props.variable] = userInput;
    }
    
    const lastBlockId = currentPreviewBlockId;
    const lastInputBlock = waitingForInput;
    setUserInput('');
    setWaitingForInput(null);
  
    if (lastBlockId && typeof lastBlockId === 'number' && lastInputBlock.parentId === lastBlockId) {
      const parentBlock = canvasBlocksRef.current.find(b => b.id === lastBlockId);
      if (parentBlock && parentBlock.children) {
        const lastInputIndex = parentBlock.children.findIndex(c => c.id === lastInputBlock.id);
        if (lastInputIndex !== -1) {
            processFlow(lastBlockId, lastInputIndex + 1);
            return;
        }
      }
    }
  
    const nextGroupId = connectionsRef.current.find(c => c.from === lastBlockId)?.to;
    if (nextGroupId) {
      processFlow(nextGroupId, 0);
    }
  };

  const renderPreviewMessage = (message: PreviewMessage) => {
    if (message.sender === 'bot') {
        return (
            <div key={message.id} className='flex items-start gap-3'>
                <Avatar className='h-8 w-8'>
                    <AvatarImage src='' alt='Bot' />
                    <AvatarFallback>B</AvatarFallback>
                </Avatar>
                <div className='bg-gray-100 rounded-lg rounded-tl-none p-3 max-w-[80%] text-black'>
                   {message.content}
                </div>
            </div>
        )
    }
    return (
        <div key={message.id} className='flex justify-end'>
            <div className='bg-blue-600 text-white rounded-lg rounded-br-none p-3 max-w-[80%]'>
                <p className='text-sm'>{message.content as string}</p>
            </div>
        </div>
    )
  }

  const selectedBlock = findBlock(selectedBlockId);
  const selectedBlockPosition = getBlockPosition(selectedBlockId);

  return (
    <div className="flex h-screen w-full flex-col bg-[#111111] text-white">
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
            <Share2 size={16} /> Compartilhar
          </Button>
          <Button 
            variant="ghost" 
            className="h-9 gap-2 text-sm font-medium text-white/80 hover:bg-[#262626] hover:text-white"
            onClick={() => setIsPreviewOpen(true)}
            >
            <TestTube2 size={16} /> Testar
          </Button>
          <Button className="h-9 bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700">Publicar</Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 shrink-0 border-r border-[#262626] bg-[#181818]">
          <ScrollArea className="h-full">
            <div className="space-y-4 p-3">
              {Object.entries(blocks).map(([category, items]) => (
                <div key={category}>
                  <h3 className="mb-2 px-1 text-xs font-semibold uppercase text-white/40">{category}</h3>
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

        <main
          ref={canvasRef}
          className="relative flex-1 overflow-hidden"
           style={{
             background: '#1d1d1d',
             backgroundImage: 'radial-gradient(circle at center, rgba(128,128,128,0.3) 1px, transparent 1px)',
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
            className="absolute left-1/2 top-4 z-10 -translate-x-1/2"
          >
            <div className="flex items-center gap-1 rounded-md bg-[#181818] p-1">
              {['Fluxo', 'Tema', 'Configurações', 'Compartilhar'].map((tab) => (
                <Button
                  key={tab}
                  variant={activeTab === tab ? 'secondary' : 'ghost'}
                  size="sm"
                  onClick={() => setActiveTab(tab)}
                  className={cn('h-7 px-3 text-xs', activeTab === tab ? 'bg-[#262626] text-white' : 'text-white/60 hover:bg-[#262626] hover:text-white')}
                >
                  {tab}
                </Button>
              ))}
            </div>
          </div>
          <div
            className="relative h-full w-full"
            style={{ transform: `scale(${zoom})`, transformOrigin: '0 0' }}
          >
            <div style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)` }}>
                <svg
                    className="absolute w-full h-full pointer-events-none"
                    style={{
                        width: `calc(100vw * 10)`, 
                        height: `calc(100vh * 10)`,
                        transform: `translate(-50%, -50%)`, 
                    }}
                    >
                    <defs>
                        <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
                        </marker>
                    </defs>
                    {connections.map((conn, index) => {
                        let startPos: {x:number, y:number} | undefined;
                        let endPos: {x:number, y:number} | undefined;

                        const toBlock = findBlock(conn.to);

                        if (conn.from === 'start') {
                            const startNode = document.getElementById('start-node');
                            if (startNode) {
                                const rect = startNode.getBoundingClientRect();
                                startPos = {
                                    x: (rect.right - rect.left/2 + 35),
                                    y: (rect.top - rect.top/2 + 25),
                                };
                            }
                        } else {
                        const fromBlock = findBlock(conn.from as number);
                            if (fromBlock && fromBlock.type === 'group') {
                                startPos = {
                                    x: fromBlock.position.x + 288, // width of group block
                                    y: fromBlock.position.y + 50, // approx middle
                                };
                            }
                        }

                        if (toBlock && toBlock.type === 'group') {
                            endPos = {
                                x: toBlock.position.x,
                                y: toBlock.position.y + 50, // approx middle
                            };
                        }

                        if (startPos && endPos) {
                        return (
                            <path
                            key={index}
                            d={getSmoothStepPath(startPos.x, startPos.y, endPos.x, endPos.y)}
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
                </svg>
                <div
                    id="start-node"
                    className="absolute flex items-center gap-2 rounded-lg bg-[#262626] px-3 py-2 w-52"
                    style={{
                        transform: `translate(50px, 50px)`,
                    }}
                    >
                    <PlaySquare size={16} className="text-white/60" />
                    <span className="text-sm font-medium">Início</span>
                    <div className="flex-grow" />
                    <ConnectionHandle onMouseDown={(e) => handleConnectionStart(e, 'start', 'output')} />
                </div>
                {canvasBlocks
                    .filter((b) => !b.parentId)
                    .map((block, index) => {
                        const BlockComponent = block.type === 'group' ? CanvasGroupBlock : CanvasTextBlock;
                        const groupIndex = canvasBlocks.filter((b) => b.type === 'group' && !b.parentId).findIndex((g) => g.id === block.id);
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
                            allBlocks={canvasBlocks}
                            deleteBlock={deleteBlock}
                            selectedBlockId={selectedBlockId}
                            updateBlockProps={updateBlockProps}
                            variables={variables}
                            onConnectionStart={handleConnectionStart}
                        />
                        );
                })}
            </div>
            {contextMenu.visible && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                onDuplicate={handleDuplicateFromMenu}
                onDelete={handleDeleteFromMenu}
              />
            )}
            {selectedBlock && selectedBlock.type === 'image' && <ImageBlockSettings block={selectedBlock} onUpdate={updateBlockProps} position={selectedBlockPosition} />}
            {selectedBlock && selectedBlock.type === 'video' && <VideoBlockSettings block={selectedBlock} onUpdate={updateBlockProps} position={selectedBlockPosition} />}
            {selectedBlock && selectedBlock.type === 'audio' && <AudioBlockSettings block={selectedBlock} onUpdate={updateBlockProps} position={selectedBlockPosition} />}
            {selectedBlock && selectedBlock.type === 'logic-wait' && <WaitBlockSettings block={selectedBlock} onUpdate={updateBlockProps} position={selectedBlockPosition} />}
            {selectedBlock && selectedBlock.type === 'input-buttons' && <ButtonsBlockSettings block={selectedBlock} onUpdate={updateBlockProps} position={selectedBlockPosition} />}
            {selectedBlock && selectedBlock.type === 'input-text' && (
                <TextBlockSettings
                    block={selectedBlock}
                    onUpdate={updateBlockProps}
                    position={selectedBlockPosition}
                    variables={variables}
                    onAddVariable={(newVar) => setVariables((prev) => [...prev, newVar])}
                />
            )}
             {selectedBlock && selectedBlock.type === 'input-email' && (
                <EmailBlockSettings
                    block={selectedBlock}
                    onUpdate={updateBlockProps}
                    position={selectedBlockPosition}
                    variables={variables}
                    onAddVariable={(newVar) => setVariables((prev) => [...prev, newVar])}
                />
            )}
            {selectedBlock && selectedBlock.type === 'input-date' && (
                <DateBlockSettings
                    block={selectedBlock}
                    onUpdate={updateBlockProps}
                    position={selectedBlockPosition}
                    variables={variables}
                    onAddVariable={(newVar) => setVariables((prev) => [...prev, newVar])}
                />
            )}
          </div>
        </main>
        {isPreviewOpen && (
          <aside className="w-96 shrink-0 border-l border-[#262626] bg-white flex flex-col">
            <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
               <div className='flex items-center gap-2'>
                <Button variant="outline" size="sm" className='text-black border-gray-300'>
                    <Globe size={14} className='mr-2' />
                    Web
                </Button>
                <Button variant="ghost" size="sm" className='text-gray-600' onClick={startPreview}>
                    <RefreshCw size={14} className='mr-2' />
                    Reiniciar
                </Button>
               </div>
               <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500" onClick={() => setIsPreviewOpen(false)}>
                    <X size={16} />
                </Button>
            </div>
            <ScrollArea className='flex-1 p-4'>
                <div className='space-y-4'>
                    {previewMessages.map(renderPreviewMessage)}
                </div>
            </ScrollArea>
            <div className='border-t border-gray-200 p-4'>
                <form onSubmit={(e) => { e.preventDefault(); handleUserInput(); }} className='relative'>
                    <Input 
                        placeholder='Digite sua resposta...' 
                        className='bg-white text-black border-gray-300 pr-12'
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        disabled={!waitingForInput}
                    />
                    <Button 
                        type="submit" 
                        size='icon' 
                        className='absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-orange-500 hover:bg-orange-600'
                        disabled={!waitingForInput}
                    >
                        <ArrowRight size={16} className='text-white' />
                    </Button>
                </form>
                <div className='text-center mt-3'>
                    <Button variant='link' size='sm' className='text-gray-400'>
                        Feito com Typebot
                    </Button>
                </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
