

'use client';

import React, { Suspense, useState, ReactNode, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Label,
} from 'recharts';
import {
  AlertTriangle,
  Plus,
  ArrowLeft,
  Settings,
  Eye,
  Save,
  Rocket,
  PanelLeft,
  MoreVertical,
  Grip,
  Pencil,
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Image from 'next/image';


type ComponentType = {
  name: string;
  icon: ReactNode;
  isNew?: boolean;
};

type AlertModel = 'success' | 'error' | 'warning' | 'info';

const modelColors: Record<AlertModel, { backgroundColor: string; textColor: string; borderColor: string }> = {
    success: { backgroundColor: '#D1FAE5', textColor: '#065F46', borderColor: '#10B981' },
    error: { backgroundColor: '#FEE2E2', textColor: '#991B1B', borderColor: '#EF4444' },
    warning: { backgroundColor: '#FEF3C7', textColor: '#92400E', borderColor: '#F59E0B' },
    info: { backgroundColor: '#DBEAFE', textColor: '#1E40AF', borderColor: '#3B82F6' },
};

const modelIcons: Record<AlertModel, ReactNode> = {
    success: <CheckCircle />,
    error: <XCircle />,
    warning: <AlertTriangle />,
    info: <Info />,
};

type ArgumentItem = {
    id: number;
    icon: string;
    title: string;
    description: string;
};

type CarouselItemData = {
    id: number;
    imageUrl: string;
    caption: string;
};

type CartesianChartDataPoint = {
    id: number;
    name: string;
    value: number;
    indicatorLabel: string;
};


type ComponentProps = {
  // Common properties for all components
  [key: string]: any; 
  // Specific properties for Alert
  title?: string;
  description?: string;
  model?: AlertModel;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  icon?: ReactNode;
  // Specific properties for Argumentos
  layout?: 'list' | '2-cols' | '3-cols' | '4-cols';
  items?: ArgumentItem[];
  // Specific properties for Audio
  audioUrl?: string;
  avatarUrl?: string;
  showAvatar?: boolean;
  autoplay?: boolean;
  progressColor?: string;
  bgColor?: string;
  iconColor?: string;
  // Specific properties for Button
  text?: string;
  action?: 'next_step' | 'open_url';
  url?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link' | 'destructive';
  // Specific properties for Carregando
  loadingText?: string;
  loadingDescription?: string;
  progressBarColor?: string;
  duration?: number;
  limit?: number;
  showTitle?: boolean;
  showProgress?: boolean;
  // Specific properties for Carrosel
  slides?: CarouselItemData[];
  loop?: boolean;
  autoplayCarousel?: boolean;
  autoplayDelay?: number;
  showPagination?: boolean;
  arrowColor?: string;
  arrowTextColor?: string;
  arrowBorderColor?: string;
  // Specific properties for Cartesiano
  chartTitle?: string;
  chartData?: CartesianChartDataPoint[];
  gradientStartColor?: string;
  gradientEndColor?: string;
  showArea?: boolean;
  showGrid?: boolean;
  // Specific properties for Comparar
  beforeImageUrl?: string;
  afterImageUrl?: string;
  sliderColor?: string;
  sliderIconColor?: string;
  sliderPosition?: number;
};

type CanvasComponentData = ComponentType & { 
  id: number;
  props: ComponentProps;
};

const components: ComponentType[] = [
  { name: 'Alerta', icon: <AlertTriangle /> },
  { name: 'Argumentos', icon: <MessageSquareText /> },
  { name: 'Audio', icon: <AudioWaveform /> },
  { name: 'Botão', icon: <MousePointerClick /> },
  { name: 'Carregando', icon: <Loader /> },
  { name: 'Carrosel', icon: <View /> },
  { name: 'Cartesiano', icon: <TrendingUp /> },
  { name: 'Comparar', icon: <GitCompareArrows />, isNew: true },
  { name: 'Confetti', icon: <Sparkles />, isNew: true },
  { name: 'Depoimentos', icon: <Quote /> },
  { name: 'Entrada', icon: <TextCursorInput /> },
  { name: 'Espaçador', icon: <Rows /> },
  { name: 'FAQ', icon: <HelpCircle />, isNew: true },
  { name: 'Gráficos', icon: <BarChart2 /> },
  { name: 'Imagem', icon: <ImageIcon /> },
  { name: 'Lista', icon: <ListIcon />, isNew: true },
  { name: 'Marquise', icon: <ChevronsRight />, isNew: true },
  { name: 'Nível', icon: <SlidersHorizontal /> },
  { name: 'Opções', icon: <CheckSquare /> },
  { name: 'Preço', icon: <DollarSign /> },
  { name: 'Script', icon: <FileCode /> },
  { name: 'Termos', icon: <FileTextIcon /> },
  { name: 'Texto', icon: <TextIcon /> },
  { name: 'Título', icon: <Heading1 /> },
  { name: 'Video', icon: <Video /> },
];

const WavingHandIcon = ({ className }: { className?: string }) => (
    <span className={cn("text-3xl", className)}>👋</span>
);


const GenericCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  return (
    <Card className="p-4 flex items-center gap-4 bg-muted/20">
      <div className='text-primary'>{component.icon}</div>
      <p className="font-semibold">{component.name}</p>
    </Card>
  );
};

const AudioCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { 
    audioUrl = '',
    avatarUrl = 'https://picsum.photos/seed/audio-avatar/40/40',
    showAvatar = true,
    autoplay = false,
    bgColor = '#005C4B',
    progressColor = '#00A884',
    iconColor = '#8696A0'
  } = component.props;
  
  const [playerRef, setPlayerRef] = useState<ReactPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (autoplay && isReady) {
      setIsPlaying(true);
    }
  }, [autoplay, isReady]);
  
  const togglePlayPause = () => {
    if (isReady) {
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (value: number[]) => {
    const seekTime = value[0];
    setPlayedSeconds(seekTime);
    playerRef?.seekTo(seekTime, 'seconds');
  };

  const formatTime = (time: number) => {
    if (isNaN(time) || time === 0) return '00:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };


  return (
    <div 
        className="w-full max-w-sm p-2 rounded-lg flex items-center gap-2"
        style={{ backgroundColor: bgColor }}
    >
        {hasMounted && (
          <ReactPlayer 
              ref={setPlayerRef}
              url={audioUrl}
              playing={isPlaying}
              onReady={() => setIsReady(true)}
              onDuration={setDuration}
              onProgress={(state) => setPlayedSeconds(state.playedSeconds)}
              onEnded={() => setIsPlaying(false)}
              width="0"
              height="0"
          />
        )}
        {showAvatar && (
            <div className="relative">
                <Avatar className="h-10 w-10">
                    <AvatarImage src={avatarUrl} alt="Avatar" />
                    <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div 
                    className="absolute bottom-[-2px] right-[-2px] rounded-full p-0.5"
                    style={{ backgroundColor: bgColor }}
                >
                    <Mic className="h-3 w-3" style={{ color: progressColor }} />
                </div>
            </div>
        )}
        <Button variant="ghost" size="icon" className="h-10 w-10 flex-shrink-0" onClick={togglePlayPause} disabled={!audioUrl || !isReady}>
            {isPlaying ? <Pause className="h-6 w-6" style={{ color: iconColor }} /> : <Play className="h-6 w-6" style={{ color: iconColor }} />}
        </Button>
        <div className="flex-grow flex flex-col justify-center">
            <Slider 
              value={[playedSeconds]} 
              max={duration || 100} 
              step={0.1} 
              onValueChange={handleSliderChange}
              disabled={!isReady}
              className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-transparent"
              style={{ '--slider-track': progressColor, '--slider-thumb': progressColor } as React.CSSProperties}
            />
             <div className="flex justify-between text-xs mt-1" style={{ color: iconColor }}>
                <span>{formatTime(playedSeconds)}</span>
                <div className="flex items-center gap-1">
                    <span>{formatTime(duration)}</span>
                    <CheckCheck className="h-4 w-4" style={{color: progressColor }} />
                </div>
            </div>
        </div>
    </div>
  );
};


const ArgumentoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const layout = component.props.layout || 'list';
  const items = component.props.items || [];

  const layoutClasses: { [key: string]: string } = {
    'list': 'grid-cols-1',
    '2-cols': 'md:grid-cols-2',
    '3-cols': 'md:grid-cols-3',
    '4-cols': 'md:grid-cols-4',
  };

  const gridClass = layoutClasses[layout] || 'grid-cols-1';

  if (items.length === 0) {
      return (
        <div className={cn('grid gap-4 grid-cols-1')}>
            <Card className="p-6 text-center border-dashed">
                <div className="flex justify-center mb-4">
                    <WavingHandIcon />
                </div>
                <h3 className="font-bold text-lg">Argumento</h3>
                <p className="text-muted-foreground mt-1">Configure seus argumentos</p>
            </Card>
        </div>
      )
  }

  return (
      <div className={cn('grid gap-4', gridClass)}>
          {items.map((item) => (
              <Card key={item.id} className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                      <span className="text-4xl">{item.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg" dangerouslySetInnerHTML={{ __html: item.title }}></h3>
                  <p className="text-muted-foreground mt-1" dangerouslySetInnerHTML={{ __html: item.description }}></p>
              </Card>
          ))}
      </div>
  );
}


const AlertCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
    const { title, description, backgroundColor, textColor, borderColor, icon } = component.props;
    const IconComponent = icon || <CheckCircle className="h-4 w-4" />;

    return (
        <Alert 
            style={{
                backgroundColor: backgroundColor,
                borderColor: borderColor
            }}
        >
            {React.cloneElement(IconComponent as React.ReactElement, { className: "h-5 w-5", style: { color: textColor } })}
            <AlertTitle style={{ color: textColor }}>{title || 'Título do Alerta'}</AlertTitle>
            <AlertDescription style={{ color: textColor }}>
                {description || 'Esta é a descrição do alerta.'}
            </AlertDescription>
        </Alert>
    )
}

const BotaoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { 
    text = 'Continuar',
    fullWidth = true,
    variant = 'default',
    backgroundColor,
    textColor,
  } = component.props;

  return (
    <Button
      variant={variant}
      className={cn(fullWidth && 'w-full')}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
      }}
    >
      {text}
    </Button>
  );
};

const CarregandoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    loadingText = 'Carregando...',
    loadingDescription = 'Lorem ipsum dollor sit amet.',
    progressBarColor,
    duration = 5,
    limit = 100,
    showTitle = true,
    showProgress = true,
  } = component.props;

  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    setAnimatedProgress(0); // Reset animation on prop change

    if (!showProgress || duration <= 0 || limit <= 0) {
      if (limit > 0) setAnimatedProgress(limit);
      return;
    }

    const intervalTime = 50; // Update every 50ms for smooth animation
    const totalSteps = (duration * 1000) / intervalTime;
    const increment = limit / totalSteps;

    const timer = setInterval(() => {
      setAnimatedProgress(prev => {
        const nextProgress = prev + increment;
        if (nextProgress >= limit) {
          clearInterval(timer);
          return limit;
        }
        return nextProgress;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [duration, limit, showProgress]);

  const displayProgress = Math.floor(animatedProgress);

  return (
    <div className="w-full space-y-2">
      {showTitle && (
        <div className="flex justify-between items-center text-sm font-medium">
          <span>{loadingText}</span>
          {showProgress && <span className="text-muted-foreground">{displayProgress}%</span>}
        </div>
      )}
      {showProgress && (
         <Progress 
            value={displayProgress} 
            className="w-full h-2 [&>div]:bg-foreground" 
            style={{ '--progress-bar-color': progressBarColor } as React.CSSProperties}
          />
      )}
      <p className="text-sm text-muted-foreground text-center pt-1">{loadingDescription}</p>
    </div>
  );
};

const CarroselCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const slides = component.props.slides || [];
  
  if (slides.length === 0) {
    return (
      <Card className="p-6 text-center border-dashed">
        <div className="flex justify-center mb-4">
          <WavingHandIcon />
        </div>
        <h3 className="font-bold text-lg">Carrossel</h3>
        <p className="text-muted-foreground mt-1">Adicione slides para começar</p>
      </Card>
    );
  }

  return (
    <Carousel className="w-full" opts={{ loop: component.props.loop }}>
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-video items-center justify-center p-6 relative bg-muted/30">
                  {slide.imageUrl ? (
                     <Image src={slide.imageUrl} alt={slide.caption || 'Slide image'} layout="fill" objectFit="contain" />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  )}
                </CardContent>
              </Card>
              {slide.caption && <p className="text-center text-sm text-muted-foreground mt-2">{slide.caption}</p>}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2" />
    </Carousel>
  );
};

const CartesianoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    chartTitle = "Cartesiano",
    chartData = [],
    gradientStartColor = 'hsl(var(--primary))',
    gradientEndColor = 'hsl(var(--primary))',
    showArea = true,
    showGrid = true,
  } = component.props;

  if (chartData.length === 0) {
    return (
      <Card className="p-6 text-center border-dashed">
        <div className="flex justify-center mb-4">
          <WavingHandIcon />
        </div>
        <h3 className="font-bold text-lg">Gráfico Cartesiano</h3>
        <p className="text-muted-foreground mt-1">Adicione pontos de dados para começar.</p>
      </Card>
    );
  }
  
  const indicators = chartData.filter(d => d.indicatorLabel);
  const uniqueId = React.useId();

  return (
    <Card className="p-4">
        <h3 className="font-bold text-lg mb-4">{chartTitle}</h3>
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart
                data={chartData}
                margin={{
                    top: 20,
                    right: 20,
                    left: -20,
                    bottom: 5,
                }}
            >
                <defs>
                    <linearGradient id={`colorGradient-${uniqueId}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="5%" stopColor={gradientStartColor} stopOpacity={0.8}/>
                        <stop offset="95%" stopColor={gradientEndColor} stopOpacity={0.8}/>
                    </linearGradient>
                </defs>
                {showGrid && <CartesianGrid strokeDasharray="3 3" vertical={false} />}
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        borderColor: 'hsl(var(--border))'
                    }}
                />
                <Area type="monotone" dataKey="value" stroke={gradientStartColor} fill={showArea ? `url(#colorGradient-${uniqueId})` : 'transparent'} strokeWidth={2} />
                
                {indicators.map((indicator, index) => (
                    <ReferenceDot key={index} x={indicator.name} y={indicator.value} r={6} fill={gradientStartColor} stroke="hsl(var(--primary-foreground))" strokeWidth={2}>
                       <Label
                            value={indicator.indicatorLabel}
                            position="top"
                            offset={-15}
                            style={{
                                fill: 'hsl(var(--foreground))',
                                backgroundColor: 'hsl(var(--card))',
                                padding: '2px 6px',
                                borderRadius: 'var(--radius)',
                                fontSize: 12,
                                border: '1px solid hsl(var(--border))'
                            }}
                        />
                    </ReferenceDot>
                ))}
            </AreaChart>
        </ResponsiveContainer>
    </Card>
  );
};

const CompararCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
    const { 
        beforeImageUrl = 'https://picsum.photos/seed/before/600/400',
        afterImageUrl = 'https://picsum.photos/seed/after/600/400',
        sliderColor = '#FFFFFF',
        sliderIconColor = '#000000',
    } = component.props;

    const [sliderPosition, setSliderPosition] = useState(component.props.sliderPosition || 50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMove = (clientX: number) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        let percentage = (x / rect.width) * 100;
        if (percentage < 0) percentage = 0;
        if (percentage > 100) percentage = 100;
        setSliderPosition(percentage);
    };

    const handleMouseDown = () => setIsDragging(true);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);
    
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) handleMove(e.clientX);
    };

    const handleTouchStart = () => setIsDragging(true);
    const handleTouchEnd = () => setIsDragging(false);
    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (isDragging) handleMove(e.touches[0].clientX);
    };

    return (
        <Card className='overflow-hidden'>
            <div
                ref={containerRef}
                className="relative w-full aspect-video select-none group"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
            >
                <div className="absolute inset-0">
                    <Image
                        src={beforeImageUrl}
                        alt="Before"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <Image
                        src={afterImageUrl}
                        alt="After"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div
                    className="absolute top-0 bottom-0 w-1 cursor-ew-resize"
                    style={{ 
                        left: `${sliderPosition}%`, 
                        transform: 'translateX(-50%)',
                        backgroundColor: sliderColor
                    }}
                >
                    <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center cursor-ew-resize"
                        style={{ backgroundColor: sliderColor }}
                    >
                        <MoreHorizontal 
                            className="w-6 h-6 rotate-90"
                            style={{ color: sliderIconColor }}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
};



const CanvasComponent = ({ component, isSelected, onClick, onDuplicate, onDelete }: { component: CanvasComponentData, isSelected: boolean, onClick: () => void, onDuplicate: () => void, onDelete: () => void }) => {
  const renderComponent = () => {
    switch (component.name) {
      case 'Alerta':
        return <AlertCanvasComponent component={component} />;
      case 'Argumentos':
        return <ArgumentoCanvasComponent component={component} />;
      case 'Audio':
        return <AudioCanvasComponent component={component} />;
      case 'Botão':
        return <BotaoCanvasComponent component={component} />;
      case 'Carregando':
        return <CarregandoCanvasComponent component={component} />;
      case 'Carrosel':
        return <CarroselCanvasComponent component={component} />;
      case 'Cartesiano':
        return <CartesianoCanvasComponent component={component} />;
      case 'Comparar':
        return <CompararCanvasComponent component={component} />;
      default:
        return <GenericCanvasComponent component={component} />;
    }
  };
    
  return (
      <div 
        className={cn(
          "p-1 rounded-lg cursor-pointer relative group", 
          isSelected && "ring-2 ring-primary ring-offset-2 ring-offset-background"
        )}
        onClick={onClick}
      >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-blue-500 rounded-md shadow-lg flex items-center gap-0.5 p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white cursor-grab">
              <Grip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white" onClick={onClick}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white" onClick={(e) => { e.stopPropagation(); onDuplicate(); }}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-white hover:bg-red-500 hover:text-white" onClick={(e) => { e.stopPropagation(); onDelete(); }}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          {renderComponent()}
      </div>
  );
};

const StepSettings = () => (
    <>
        <div>
            <h3 className="text-sm font-medium text-muted-foreground">Título da Etapa</h3>
            <Input defaultValue="Etapa 1" className="mt-2 text-base" />
        </div>
        <Separator />
        <div>
            <h3 className="text-sm font-medium text-muted-foreground">Header</h3>
            <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between">
                    <UILabel htmlFor="show-logo">Mostrar Logo</UILabel>
                    <Switch id="show-logo" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <UILabel htmlFor="show-progress">Mostrar Progresso</UILabel>
                    <Switch id="show-progress" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                    <UILabel htmlFor="allow-back">Permitir Voltar</UILabel>
                    <Switch id="allow-back" defaultChecked />
                </div>
            </div>
        </div>
    </>
);

const AlertSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {

  const handleModelChange = (model: AlertModel) => {
    const colors = modelColors[model];
    const icon = modelIcons[model];
    onUpdate({ ...component.props, model, ...colors, icon });
  };

  const handleColorReset = (colorType: 'backgroundColor' | 'textColor' | 'borderColor') => {
    const currentModel = component.props.model || 'success';
    const defaultColor = modelColors[currentModel][colorType];
    onUpdate({ ...component.props, [colorType]: defaultColor });
  };
    
  return (
    <div className='space-y-6'>
       <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Informações</h3>
        <div className="space-y-3">
            <div>
              <UILabel htmlFor="title" className='text-xs'>Título</UILabel>
              <Input
                id="title"
                value={component.props.title || ''}
                onChange={(e) => onUpdate({ ...component.props, title: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <UILabel htmlFor="description" className='text-xs'>Descrição</UILabel>
              <Textarea
                id="description"
                value={component.props.description || ''}
                onChange={(e) => onUpdate({ ...component.props, description: e.target.value })}
                className="mt-1"
              />
            </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Estilo</h3>
         <div>
            <UILabel htmlFor="model" className='text-xs'>Modelo</UILabel>
            <Select
              value={component.props.model || 'success'}
              onValueChange={(value: AlertModel) => handleModelChange(value)}
            >
              <SelectTrigger id="model" className="mt-1">
                <SelectValue placeholder="Selecione o modelo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="success">Sucesso</SelectItem>
                <SelectItem value="error">Erro</SelectItem>
                <SelectItem value="warning">Aviso</SelectItem>
                <SelectItem value="info">Informação</SelectItem>
              </SelectContent>
            </Select>
          </div>
      </Card>

      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
            <div className='space-y-1'>
                <UILabel htmlFor='color' className='text-xs'>Cor</UILabel>
                <div className="relative">
                    <Input 
                        type='color' 
                        id='color' 
                        className='p-1 h-8 w-full' 
                        value={component.props.backgroundColor || '#ffffff'}
                        onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })}
                    />
                    <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => handleColorReset('backgroundColor')}><XCircle className="h-4 w-4"/></Button>
                </div>
            </div>
            <div className='space-y-1'>
                <UILabel htmlFor='text-color' className='text-xs'>Texto</UILabel>
                 <div className="relative">
                    <Input 
                        type='color' 
                        id='text-color' 
                        className='p-1 h-8 w-full'
                        value={component.props.textColor || '#000000'}
                        onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
                    />
                    <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => handleColorReset('textColor')}><XCircle className="h-4 w-4"/></Button>
                </div>
            </div>
            <div className='space-y-1'>
                <UILabel htmlFor='border-color' className='text-xs'>Borda</UILabel>
                 <div className="relative">
                    <Input 
                        type='color' 
                        id='border-color' 
                        className='p-1 h-8 w-full'
                        value={component.props.borderColor || '#000000'}
                        onChange={(e) => onUpdate({ ...component.props, borderColor: e.target.value })}
                    />
                    <Button variant="ghost" size="icon" className="absolute right-0 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground hover:text-foreground" onClick={() => handleColorReset('borderColor')}><XCircle className="h-4 w-4"/></Button>
                </div>
            </div>
        </div>
      </Card>

    </div>
  )
}

const AudioSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {
  return (
    <div className='space-y-6'>
       <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Conteúdo</h3>
        <div className="space-y-3">
            <div>
              <UILabel htmlFor="sendTime" className='text-xs'>Horário de Envio</UILabel>
              <Input
                id="sendTime"
                type="time"
                value={component.props.sendTime || ''}
                onChange={(e) => onUpdate({ ...component.props, sendTime: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <UILabel htmlFor="audioUrl" className='text-xs'>URL do Áudio</UILabel>
              <Input
                id="audioUrl"
                value={component.props.audioUrl || ''}
                onChange={(e) => onUpdate({ ...component.props, audioUrl: e.target.value })}
                className="mt-1"
                placeholder="https://example.com/audio.mp3"
              />
            </div>
            <div>
              <UILabel htmlFor="avatarUrl" className='text-xs'>URL do Avatar</UILabel>
              <Input
                id="avatarUrl"
                value={component.props.avatarUrl || ''}
                onChange={(e) => onUpdate({ ...component.props, avatarUrl: e.target.value })}
                className="mt-1"
                placeholder="https://..."
              />
            </div>
        </div>
      </Card>
      
      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Configurações</h3>
         <div className="space-y-4">
            <div className="flex items-center justify-between">
                <UILabel htmlFor="showAvatar">Mostrar Avatar</UILabel>
                <Switch 
                    id="showAvatar"
                    checked={component.props.showAvatar}
                    onCheckedChange={(checked) => onUpdate({ ...component.props, showAvatar: checked })}
                />
            </div>
            <div className="flex items-center justify-between">
                <UILabel htmlFor="autoplay">Autoplay</UILabel>
                <Switch 
                    id="autoplay"
                    checked={component.props.autoplay}
                    onCheckedChange={(checked) => onUpdate({ ...component.props, autoplay: checked })}
                />
            </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
            <div className='space-y-1'>
                <UILabel htmlFor='bg-color' className='text-xs'>Fundo</UILabel>
                <Input type='color' id='bg-color' className='p-1 h-8 w-full' value={component.props.bgColor || '#005C4B'} onChange={(e) => onUpdate({ ...component.props, bgColor: e.target.value })} />
            </div>
            <div className='space-y-1'>
                <UILabel htmlFor='progress-color' className='text-xs'>Progresso</UILabel>
                <Input type='color' id='progress-color' className='p-1 h-8 w-full' value={component.props.progressColor || '#00A884'} onChange={(e) => onUpdate({ ...component.props, progressColor: e.target.value })} />
            </div>
            <div className='space-y-1'>
                <UILabel htmlFor='icon-color' className='text-xs'>Ícones</UILabel>
                <Input type='color' id='icon-color' className='p-1 h-8 w-full' value={component.props.iconColor || '#8696A0'} onChange={(e) => onUpdate({ ...component.props, iconColor: e.target.value })} />
            </div>
        </div>
      </Card>
    </div>
  );
};


const emojiCategories = {
    'Smileys & People': ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾', '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤏', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪', '🦾', '🦵', '🦿', '🦶', '👂', '🦻', '👃', '🧠', '🦷', '🦴', '👀', '👁️', '👅', '👄'],
    'Animals & Nature': ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐽', '🐸', '🐵', '🙈', '🙉', '🙊', '🐒', '🐔', '🐧', '🐦', '🐤', '🐣', '🐥', '🦆', '🦅', '🦉', '🦇', '🐺', '🐗', '🐴', '🦄', '🐝', '🐛', '🦋', '🐌', '🐞', '🐜', '🦟', '🦗', '🕷️', '🕸️', '🦂', '🐢', '🐍', '🦎', '🦖', '🦕', '🐙', '🦑', '🦐', '🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐅', '🐆', '🦓', '🦍', '🦧', '🐘', '🦛', '🦏', '🐪', '🐫', '🦒', '🦘', '🐃', '🐂', '🐄', '🐎', '🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🦮', '🐕‍', '🐈', '🐓', '🦃', '🦚', '🦜', '🦢', '🦩', '🕊️', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿️', '🦔', '🐾', '🐉', '🐲', '🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄', '🐚', '🌾', '💐', '🌷', '🌹', '🥀', '🌺', '🌸', '🌼', '🌻', '🌞', '🌝', '🌛', '🌜', '🌚', '🌕', '🌖', '🌗', '🌘', '🌑', '🌒', '🌓', '🌔', '🌙', '🌎', '🌍', '🌏', '💫', '⭐️', '🌟', '✨', '⚡️', '☄️', '💥', '🔥', '🌪️', '🌈', '☀️', '🌤️', '⛅️', '🌥️', '☁️', '🌦️', '🌧️', '⛈️', '🌩️', '🌨️', '❄️', '☃️', '⛄️', '🌬️', '💨', '💧', '💦', '☔️', '☂️', '🌊', '🌫️'],
    'Food & Drink': ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🍒', '🍑', '🥭', '🍍', '🥥', '🥝', '🍅', '🍆', '🥑', '🥦', '🥬', '🥒', '🌶️', '🌽', '🥕', '🧄', '🧅', '🥔', '🍠', '🥐', '🥯', '🍞', '🥖', '🥨', '🧀', '🥚', '🍳', '🧈', '🥞', '🧇', '🥓', '🥩', '🍗', '🍖', '🦴', '핫도그', '🍔', '🍟', '🍕', '🥪', '🥙', '🧆', '🌮', '🌯', '🥗', '🥘', '🥫', '🍝', '🍜', '🍲', '🍛', '🍣', '🍱', '🥟', '🍤', '🍙', '🍚', '🍘', '🍥', '🥠', '🥮', '🍢', '🍡', '🍧', '🍨', '🍦', '🥧', '🧁', '🍰', '🎂', '🍮', '🍭', '🍬', '🍫', '🍿', '🍩', '🍪', '🌰', '🥜', '🍯', '🥛', '🍼', '☕️', '🍵', '🧃', '🥤', '🍶', '🍺', '🍻', '🥂', '🍷', '🥃', '🍸', '🍹', '🧉', '🍾', '🧊', '🥄', '🍴', '🍽️', '🥣', '🥡', '🥢', '🧂'],
    'Activities': ['⚽️', '🏀', '🏈', '⚾️', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '𪀀', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🥅', '⛳️', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🛹', '🛷', '⛸️', '🥌', '🎿', '⛷️', '🏂', '🪂', '🏋️‍♀️', '🏋️‍♂️', '𤼼‍♀️', '𤼼‍♂️', '🤸‍♀️', '🤸‍♂️', '🤺', '𤾾‍♀️', '𤾾‍♂️', '🏌️‍♀️', '🏌️‍♂️', '🏇', '🧘‍♀️', '🧘‍♂️', '🏄‍♀️', '🏄‍♂️', '🏊‍♀️', '🏊‍♂️', '🤽‍♀️', '🤽‍♂️', '🚣‍♀️', '🚣‍♂️', '🧗‍♀️', '🧗‍♂️', '🚵‍♀️', '🚵‍♂️', '🚴‍♀️', '🚴‍♂️', '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🏵️', '🎗️', '🎫', '🎟️', '🎪', '🤹‍♀️', '🤹‍♂️', '🎭', '🩰', '🎨', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎷', '🎺', '🎸', '𪕕', '🎻', '🎲', '♟️', '🎯', '🎳', '🎮', '🎰', '🧩'],
    'Travel & Places': ['🚗', '🚕', '🚙', '🚌', '𚎎', '🏎️', '🚓', '🚑', '🚒', '🚐', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍️', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '🚡', '🚠', '🚟', '🚃', '🚋', '🚞', '𚝝', '🚄', '🚅', '🚈', '🚂', '🚆', '🚇', '🚊', '🚉', '✈️', '🛫', '🛬', '💺', '🚀', '🛸', '🚁', '🛶', '⛵️', '🚤', '🛥️', '🛳️', '⛴️', '🚢', '⚓️', '⛽️', '🚧', '🚦', '🚥', '🗺️', '🗿', '🗽', '🗼', '🏰', '🏯', '🏟️', '🎡', '🎢', '🎠', '⛲️', '⛱️', '🏖️', '🏝️', '🏜️', '🌋', '⛰️', '🏔️', '🗻', '🏕️', '⛺️', '🏠', '🏡', '🏘️', '🏚️', '🏗️', '🏭', '🏢', '🏬', '🏤', '🏥', '🏦', '🏨', '🏪', '🏫', '🏩', '💒', '🏛️', '⛪️', '🕌', '🕍', '🛕', '🕋', '⛩️', '🛤️', '🛣️', '🗾', '🎑', '🏞️', '🌅', '🌄', '🌠', '🎇', '🎆', '🌉', '🌁', '🏙️', '🌃', '🌌'],
    'Objects': ['⌚️', '📱', '📲', '💻', '⌨️', '🖥️', '🖨️', '🖱️', '🖲️', '🕹️', '𗜜️', '💽', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '🎞️', '📞', '☎️', '📟', '📠', '📺', '📻', '🎙️', '🎚️', '🎛️', '🧭', '⏱️', '⏲️', '⏰', '🕰️', '⌛️', '⏳', '📡', '🔋', '🔌', '💡', '🔦', '🕯️', '🪔', '🧯', '🗑️', '🛢️', '💸', '💵', '💴', '💶', '💷', '💰', '💳', '🧾', '💎', '⚖️', '🦯', '🔧', '🔨', '⚒️', '🛠️', '⛏️', '🔩', '⚙️', '🧱', '⛓️', '🧲', '🔫', '💣', '🧨', '𪓓', '🔪', '🗡️', '⚔️', '🛡️', '🚬', '⚰️', '⚱️', '🏺', '🔮', '📿', '🧿', '💈', '⚗️', '🔭', '🔬', '🕳️', '💊', '💉', '🩸', '🧬', '🦠', '🧫', '🧪', '🌡️', '🧹', '🧺', '🧻', '🚽', '🚰', '🚿', '🛁', '🛀', '🧼', '🪒', '🧽', '🧴', '🛎️', '🔑', '🗝️', '🚪', '🪑', '🛋️', '🛏️', '🛌', '🧸', '🖼️', '🛍️', '🛒', '🎁', '🎈', '🎏', '🎀', '🎊', '🎉', '🎎', '🏮', '🎐', '🧧', '✉️', '📩', '📨', '📧', '💌', '📮', '📪', '📫', '📬', '📭', '📦', '𪧧', '📄', '📃', '📜', '📑', '📊', '📈', '📉', '🗒️', '🗓️', '📆', '📅', '📇', '🗃️', '🗳️', '🗄️', '📋', '📁', '📂', '🗂️', '🗞️', '📰', '📓', '📔', '📒', '📕', '📗', '📘', '📙', '📚', '📖', '🔖', '🧷', '🔗', '📎', '🖇️', '📐', '📏', '🧮', '📌', '📍', '✂️', '🖊️', '🖋️', '✒️', '🖌️', '🖍️', '📝', '✏️', '🔎', '🔍', '🔏', '🔐', '🔒', '🔓'],
    'Symbols': ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '☮️', '✝️', '☪️', '🕉️', '☸️', '✡️', '🔯', '🕎', '☯️', '☦️', '🛐', '⛎', '♈️', '♉️', '♊️', '♋️', '♌️', '♍️', '♎️', '♏️', '♐️', '♑️', '♒️', '♓️', '🆔', '⚛️', '🉑', '☢️', '☣️', '📴', '📳', '🈶', '🈚️', '🈸', '🈺', '🈷️', '✴️', '🆚', '💮', '🉐', '㊙️', '㊗️', '🈴', '🈵', '🈹', '🈲', '🅰️', '🅱️', '🆎', '🆑', '🅾️', '🆘', '❌', '⭕️', '🛑', '⛔️', '📛', '🚫', '💯', '💢', '♨️', '🚷', '🚯', '🚳', '🚱', '🔞', '📵', '🚭', '❗️', '❕', '❓', '❔', '‼️', '⁉️', '🔅', '🔆', '〽️', '⚠️', '🚸', '🔱', '⚜️', '🔰', '♻️', '✅', '🈯️', '💹', '❇️', '✳️', '❎', '🌐', '💠', 'Ⓜ️', '🌀', '💤', 'ATM', '🚾', '♿️', '🅿️', '🈳', '🈂️', '🛂', '🛃', '🛄', '🛅', '🚹', '🚺', '🚼', '🚻', '🚮', '🎦', '📶', '🈁', '🔣', 'ℹ️', '🔤', '🔡', '🔠', '🆖', '🆗', '🆙', '🆒', '🆕', '🆓', '0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟', '🔢', '#️⃣', '*️⃣', '⏏️', '▶️', '⏸️', '⏯️', '⏹️', '⏺️', '⏭️', '⏮️', '⏩', '⏪', '⏫', '⏬', '◀️', '🔼', '🔽', '➡️', '⬅️', '⬆️', '⬇️', '↗️', '↘️', '↙️', '↖️', '↕️', '↔️', '↪️', '↩️', '⤴️', '⤵️', '🔀', '🔁', '🔂', '🔄', '🔃', '🎵', '🎶', '➕', '➖', '➗', '✖️', '♾️', '💲', '💱', '™️', '©️', '®️', '👁️‍🗨️', '🔚', '🔙', '🔛', '🔝', '🔜', '✔️', '☑️', '🔘', '🔴', '🟠', '🟡', '🟢', '🔵', '🟣', '⚫️', '⚪️', '🟤', '🔺', '🔻', '🔼', '🔽', '▪️', '▫️', '◾️', '◽️', '◼️', '◻️', '🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '⬛️', '⬜️', '🟫', '🔶', '🔷', '🔸', '🔹', '𔲲', '🔳', '💭', '🗯️', '💬', '🗨️', '🀄️', '🃏', '♠️', '♣️', '♥️', '♦️', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚', '🕛', '🕜', '🕝', '𕞞', '🕟', '🕠', '🕡', '🕢', '🕣', '🕤', '🕥', '🕦', '🕧']
};

const colorPalette = [
    '#000000', '#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3',
    '#ffffff', '#ffb6c1', '#fffacd', '#f0f8ff', '#f5f5f5', '#d3d3d3', '#a9a9a9', 
    '#fa8072', '#ffdead', '#f0e68c', '#90ee90', '#dda0dd', '#c0c0c0',
    '#800000', '#a52a2a', '#b8860b', '#006400', '#00008b', '#483d8b', '#808080', '#696969',
    '#400000', '#8b0000', '#808000', '#008000', '#000080', '#2f4f4f'
];


const ArgumentosSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {
  const items = component.props.items || [];

  const handleUpdateItem = (itemId: number, newValues: Partial<ArgumentItem>) => {
    const newItems = items.map(item => 
      item.id === itemId ? { ...item, ...newValues } : item
    );
    onUpdate({ ...component.props, items: newItems });
  };

  const handleAddItem = () => {
    const newItem: ArgumentItem = {
      id: Date.now(),
      icon: '👋',
      title: 'Novo Argumento',
      description: 'Descreva seu argumento aqui.'
    };
    onUpdate({ ...component.props, items: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter(item => item.id !== itemId);
    onUpdate({ ...component.props, items: newItems });
  };
  
  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const RichTextToolbarButton = ({ icon, isActive, command, value }: { icon: ReactNode, isActive?: boolean, command: string, value?: string }) => (
    <Button 
      variant="ghost" 
      size="icon" 
      className={cn('h-7 w-7', isActive ? 'text-blue-500 bg-blue-500/10' : 'text-white/60 hover:text-white/80 hover:bg-white/10')}
      onMouseDown={(e) => {
          e.preventDefault(); // Prevent editor losing focus
          handleFormat(command, value);
      }}
    >
      {icon}
    </Button>
  );

  const ColorPickerButton = ({ icon, command }: { icon: ReactNode, command: 'foreColor' | 'hiliteColor' }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className='h-7 w-7 text-white/60 hover:text-white/80 hover:bg-white/10'
        >
          {icon}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2">
        <div className="grid grid-cols-8 gap-1">
          {colorPalette.map((color, i) => (
            <Button
              key={`${color}-${i}`}
              variant="ghost"
              size="icon"
              className="h-6 w-6 rounded-sm p-0"
              style={{ backgroundColor: color }}
              onMouseDown={(e) => {
                e.preventDefault();
                handleFormat(command, color);
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className='space-y-6'>
       <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Layout</h3>
        <div>
            <UILabel htmlFor="layout" className='text-xs'>Layout</UILabel>
            <Select
              value={component.props.layout || 'list'}
              onValueChange={(value) => onUpdate({ ...component.props, layout: value })}
            >
              <SelectTrigger id="layout" className="mt-1">
                <SelectValue placeholder="Selecione o layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="list">Em Lista</SelectItem>
                <SelectItem value="2-cols">2 Colunas</SelectItem>
                <SelectItem value="3-cols">3 Colunas</SelectItem>
                <SelectItem value="4-cols">4 Colunas</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </Card>

      <Card className="p-4 bg-muted/20 border-border/50">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Argumentos</h3>
          <ScrollArea className="h-[40rem]">
            <div className="space-y-4 pr-4">
                {items.map((item, itemIndex) => (
                    <Card key={item.id} className="p-3 bg-card space-y-3 relative overflow-hidden">
                        <div className="flex items-center justify-between">
                            <Popover>
                              <PopoverTrigger asChild>
                                  <Button variant="outline" className="w-12 h-10 text-xl text-center p-0 relative">
                                    {item.icon}
                                  </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-80 h-96">
                                <ScrollArea className="h-full w-full">
                                    {Object.entries(emojiCategories).map(([category, emojis]) => (
                                        <div key={category}>
                                            <h4 className="font-bold text-sm text-muted-foreground mb-2 sticky top-0 bg-popover py-1">{category}</h4>
                                            <div className="grid grid-cols-8 gap-1 mb-4">
                                                {emojis.map((emoji, emojiIndex) => (
                                                    <Button
                                                        key={`${emoji}-${itemIndex}-${emojiIndex}`}
                                                        variant="ghost"
                                                        size="icon"
                                                        className="text-lg"
                                                        onClick={() => handleUpdateItem(item.id, { icon: emoji })}
                                                    >
                                                        {emoji}
                                                    </Button>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </ScrollArea>
                              </PopoverContent>
                            </Popover>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleDeleteItem(item.id)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                        
                        <div className="bg-[#1E1E1E] rounded-md">
                           <div className="bg-[#2C2C2C] p-2 border-b border-[#3A3A3A] rounded-t-md flex flex-wrap items-center gap-1">
                              <Select defaultValue='normal' onValueChange={(value) => handleFormat('formatBlock', value)}>
                                <SelectTrigger className="w-[100px] h-7 text-xs bg-transparent border-none text-white/80 focus:ring-0">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="p">Normal</SelectItem>
                                  <SelectItem value="h1">Título 1</SelectItem>
                                  <SelectItem value="h2">Título 2</SelectItem>
                                  <SelectItem value="h3">Título 3</SelectItem>
                                </SelectContent>
                              </Select>
                              <Separator orientation="vertical" className="h-5 bg-white/20" />
                              <RichTextToolbarButton icon={<Bold />} command="bold" />
                              <RichTextToolbarButton icon={<Italic />} command="italic" />
                              <RichTextToolbarButton icon={<Underline />} command="underline" />
                              <RichTextToolbarButton icon={<Strikethrough />} command="strikeThrough" />
                              <Separator orientation="vertical" className="h-5 bg-white/20" />
                               <ColorPickerButton icon={<Baseline />} command="foreColor" />
                               <ColorPickerButton icon={<Highlighter />} command="hiliteColor" />
                              <Separator orientation="vertical" className="h-5 bg-white/20" />
                              <RichTextToolbarButton icon={<AlignLeft />} command="justifyLeft" />
                              <RichTextToolbarButton icon={<AlignCenter />} command="justifyCenter" />
                              <RichTextToolbarButton icon={<AlignRight />} command="justifyRight" />
                              <RichTextToolbarButton icon={<AlignJustify />} command="justifyFull" />
                               <Separator orientation="vertical" className="h-5 bg-white/20" />
                              <RichTextToolbarButton icon={<LinkIcon />} command="createLink" />
                              <RichTextToolbarButton icon={<ListIcon />} command="insertUnorderedList" />
                              <RichTextToolbarButton icon={<ListOrdered />} command="insertOrderedList" />
                               <Separator orientation="vertical" className="h-5 bg-white/20" />
                              <RichTextToolbarButton icon={<RemoveFormatting />} command="removeFormat" />
                           </div>
                           <div className="p-4">
                               <div
                                 contentEditable
                                 suppressContentEditableWarning
                                 className="text-xl font-bold text-white outline-none"
                                 dangerouslySetInnerHTML={{ __html: item.title }}
                                 onBlur={(e) => handleUpdateItem(item.id, { title: e.currentTarget.innerHTML })}
                               />
                               <div
                                 contentEditable
                                 suppressContentEditableWarning
                                 className="text-sm text-[#D1D5DB] outline-none mt-2"
                                 dangerouslySetInnerHTML={{ __html: item.description }}
                                  onBlur={(e) => handleUpdateItem(item.id, { description: e.currentTarget.innerHTML })}
                               />
                           </div>
                        </div>

                    </Card>
                ))}
            </div>
          </ScrollArea>
           <Button variant="outline" className="w-full mt-4" onClick={handleAddItem}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Argumento
            </Button>
      </Card>
    </div>
  );
};


const BotaoSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {
  return (
    <div className='space-y-6'>
       <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Conteúdo</h3>
        <div className="space-y-3">
            <div>
              <UILabel htmlFor="text" className='text-xs'>Texto do Botão</UILabel>
              <Input
                id="text"
                value={component.props.text || ''}
                onChange={(e) => onUpdate({ ...component.props, text: e.target.value })}
                className="mt-1"
              />
            </div>
            <div>
              <UILabel htmlFor="action" className='text-xs'>Ação</UILabel>
              <Select
                value={component.props.action || 'next_step'}
                onValueChange={(value: 'next_step' | 'open_url') => onUpdate({ ...component.props, action: value })}
              >
                <SelectTrigger id="action" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="next_step">Ir para próxima etapa</SelectItem>
                  <SelectItem value="open_url">Abrir URL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {component.props.action === 'open_url' && (
              <div>
                <UILabel htmlFor="url" className='text-xs'>URL</UILabel>
                <Input
                  id="url"
                  value={component.props.url || ''}
                  onChange={(e) => onUpdate({ ...component.props, url: e.target.value })}
                  className="mt-1"
                  placeholder="https://..."
                />
              </div>
            )}
        </div>
      </Card>
      
      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Estilo</h3>
         <div className="space-y-4">
            <div className="flex items-center justify-between">
                <UILabel htmlFor="fullWidth">Largura Total</UILabel>
                <Switch 
                    id="fullWidth"
                    checked={component.props.fullWidth}
                    onCheckedChange={(checked) => onUpdate({ ...component.props, fullWidth: checked })}
                />
            </div>
            <div>
              <UILabel htmlFor="variant" className='text-xs'>Modelo</UILabel>
              <Select
                value={component.props.variant || 'default'}
                onValueChange={(value: 'default' | 'destructive' | 'outline' | 'ghost' | 'link' | 'secondary') => onUpdate({ ...component.props, variant: value })}
              >
                <SelectTrigger id="variant" className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Padrão</SelectItem>
                  <SelectItem value="destructive">Destrutivo</SelectItem>
                  <SelectItem value="outline">Bordas</SelectItem>
                  <SelectItem value="secondary">Relevo</SelectItem>
                  <SelectItem value="ghost">Fantasma</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
            </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Personalização</h3>
        <div className="grid grid-cols-2 gap-4">
            <div className='space-y-1'>
                <UILabel htmlFor='bg-color' className='text-xs'>Cor do Fundo</UILabel>
                <Input 
                  type='color' 
                  id='bg-color' 
                  className='p-1 h-8 w-full' 
                  value={component.props.backgroundColor || '#000000'} 
                  onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })} 
                />
            </div>
            <div className='space-y-1'>
                <UILabel htmlFor='text-color' className='text-xs'>Cor do Texto</UILabel>
                <Input 
                  type='color' 
                  id='text-color' 
                  className='p-1 h-8 w-full' 
                  value={component.props.textColor || '#ffffff'} 
                  onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })} 
                />
            </div>
        </div>
      </Card>
    </div>
  );
};

const CarregandoSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {
  return (
    <div className='space-y-6'>
       <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Progresso</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="duration" className='text-xs'>Duração</UILabel>
            <Input
              id="duration"
              type="number"
              value={component.props.duration || 5}
              onChange={(e) => onUpdate({ ...component.props, duration: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="limit" className='text-xs'>Limite</UILabel>
            <Input
              id="limit"
              type="number"
              value={component.props.limit || 100}
              onChange={(e) => onUpdate({ ...component.props, limit: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="action" className='text-xs'>Ação</UILabel>
            <Select
              value={component.props.action || 'next_step'}
              onValueChange={(value: 'next_step' | 'open_url') => onUpdate({ ...component.props, action: value })}
            >
              <SelectTrigger id="action" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next_step">Próxima Etapa</SelectItem>
                <SelectItem value="open_url">Abrir URL</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Estilo</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="loadingText" className='text-xs'>Título</UILabel>
            <Input
              id="loadingText"
              value={component.props.loadingText || ''}
              onChange={(e) => onUpdate({ ...component.props, loadingText: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="loadingDescription" className='text-xs'>Descrição</UILabel>
            <Input
              id="loadingDescription"
              value={component.props.loadingDescription || ''}
              onChange={(e) => onUpdate({ ...component.props, loadingDescription: e.target.value })}
              className="mt-1"
            />
          </div>
          <div className="flex items-center justify-between">
              <UILabel htmlFor="showTitle">Mostrar Título</UILabel>
              <Switch 
                  id="showTitle"
                  checked={component.props.showTitle}
                  onCheckedChange={(checked) => onUpdate({ ...component.props, showTitle: checked })}
              />
          </div>
          <div className="flex items-center justify-between">
              <UILabel htmlFor="showProgress">Mostrar Progresso</UILabel>
              <Switch 
                  id="showProgress"
                  checked={component.props.showProgress}
                  onCheckedChange={(checked) => onUpdate({ ...component.props, showProgress: checked })}
              />
          </div>
        </div>
      </Card>
    </div>
  );
};

const CarroselSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {
  const slides = component.props.slides || [];

  const handleUpdateSlide = (slideId: number, newValues: Partial<CarouselItemData>) => {
    const newSlides = slides.map(slide =>
      slide.id === slideId ? { ...slide, ...newValues } : slide
    );
    onUpdate({ ...component.props, slides: newSlides });
  };

  const handleAddSlide = () => {
    const newSlide: CarouselItemData = {
      id: Date.now(),
      imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
      caption: 'Nova Legenda'
    };
    onUpdate({ ...component.props, slides: [...slides, newSlide] });
  };

  const handleDeleteSlide = (slideId: number) => {
    const newSlides = slides.filter(slide => slide.id !== slideId);
    onUpdate({ ...component.props, slides: newSlides });
  };

  return (
    <div className='space-y-6'>
      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Slides</h3>
        <ScrollArea className="h-[40rem]">
          <div className="space-y-4 pr-4">
            {slides.map(slide => (
              <Card key={slide.id} className="p-3 bg-card space-y-3 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteSlide(slide.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <div>
                    <UILabel htmlFor={`imageUrl-${slide.id}`} className='text-xs'>URL da Imagem</UILabel>
                    <Input
                      id={`imageUrl-${slide.id}`}
                      value={slide.imageUrl}
                      onChange={(e) => handleUpdateSlide(slide.id, { imageUrl: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <UILabel htmlFor={`caption-${slide.id}`} className='text-xs'>Legenda</UILabel>
                    <Input
                      id={`caption-${slide.id}`}
                      value={slide.caption}
                      onChange={(e) => handleUpdateSlide(slide.id, { caption: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="w-full mt-4" onClick={handleAddSlide}>
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Slide
        </Button>
      </Card>
      
      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Interação</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="loop">Loop</UILabel>
            <Switch
              id="loop"
              checked={component.props.loop}
              onCheckedChange={(checked) => onUpdate({ ...component.props, loop: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="autoplayCarousel">Autoplay</UILabel>
            <Switch
              id="autoplayCarousel"
              checked={component.props.autoplayCarousel}
              onCheckedChange={(checked) => onUpdate({ ...component.props, autoplayCarousel: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showPagination">Paginação</UILabel>
            <Switch
              id="showPagination"
              checked={component.props.showPagination}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showPagination: checked })}
            />
          </div>
          <div>
            <UILabel htmlFor="autoplayDelay" className='text-xs'>Delay do Autoplay</UILabel>
            <Input
              id="autoplayDelay"
              type="number"
              value={component.props.autoplayDelay || 2}
              onChange={(e) => onUpdate({ ...component.props, autoplayDelay: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4 bg-muted/20 border-border/50">
        <h3 className="text-sm font-medium text-muted-foreground mb-4">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className='space-y-1'>
            <UILabel htmlFor='arrowColor' className='text-xs'>Cor</UILabel>
            <Input type='color' id='arrowColor' className='p-1 h-8 w-full' value={component.props.arrowColor || '#000000'} onChange={(e) => onUpdate({ ...component.props, arrowColor: e.target.value })} />
          </div>
          <div className='space-y-1'>
            <UILabel htmlFor='arrowTextColor' className='text-xs'>Texto</UILabel>
            <Input type='color' id='arrowTextColor' className='p-1 h-8 w-full' value={component.props.arrowTextColor || '#ffffff'} onChange={(e) => onUpdate({ ...component.props, arrowTextColor: e.target.value })} />
          </div>
          <div className='space-y-1'>
            <UILabel htmlFor='arrowBorderColor' className='text-xs'>Borda</UILabel>
            <Input type='color' id='arrowBorderColor' className='p-1 h-8 w-full' value={component.props.arrowBorderColor || '#000000'} onChange={(e) => onUpdate({ ...component.props, arrowBorderColor: e.target.value })} />
          </div>
        </div>
      </Card>
    </div>
  );
};

const CartesianoSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {
    const data = component.props.chartData || [];

    const handleUpdateDataPoint = (id: number, key: 'name' | 'value' | 'indicatorLabel', value: string | number) => {
        const newData = data.map(item =>
          item.id === id ? { ...item, [key]: value } : item
        );
        onUpdate({ ...component.props, chartData: newData });
    };

    const handleAddDataPoint = () => {
        const newPoint = { id: Date.now(), name: `Ponto ${data.length + 1}`, value: Math.floor(Math.random() * 100), indicatorLabel: '' };
        onUpdate({ ...component.props, chartData: [...data, newPoint] });
    };

    const handleDeleteDataPoint = (id: number) => {
        const newData = data.filter((item) => item.id !== id);
        onUpdate({ ...component.props, chartData: newData });
    };
    
    return (
        <div className='space-y-6'>
             <Card className="p-4 bg-muted/20 border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Conteúdo</h3>
                <div>
                    <UILabel htmlFor="chartTitle" className='text-xs'>Título</UILabel>
                    <Input
                        id="chartTitle"
                        value={component.props.chartTitle || 'Cartesiano'}
                        onChange={(e) => onUpdate({ ...component.props, chartTitle: e.target.value })}
                        className="mt-1"
                    />
                </div>
             </Card>
             
             <Card className="p-4 bg-muted/20 border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Pontos de Dados</h3>
                <ScrollArea className="h-[25rem]">
                    <div className="space-y-3 pr-4">
                        {data.map((point) => (
                            <Card key={point.id} className="p-3 bg-card space-y-3 relative">
                                <div className="absolute top-2 left-2 flex items-center justify-center text-muted-foreground">
                                    <Grip className="h-4 w-4 cursor-grab" />
                                </div>
                                <div className="absolute top-2 right-2">
                                     <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0"
                                        onClick={() => handleDeleteDataPoint(point.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>

                                <div className="grid grid-cols-2 gap-2 pt-8">
                                    <Input
                                        value={point.name}
                                        onChange={(e) => handleUpdateDataPoint(point.id, 'name', e.target.value)}
                                        className="h-9"
                                        placeholder="Rótulo"
                                    />
                                    <Input
                                        type="number"
                                        value={point.value}
                                        onChange={(e) => handleUpdateDataPoint(point.id, 'value', Number(e.target.value))}
                                        className="h-9"
                                        placeholder="Valor"
                                    />
                                </div>
                                <div className="relative">
                                    <Star className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        value={point.indicatorLabel}
                                        onChange={(e) => handleUpdateDataPoint(point.id, 'indicatorLabel', e.target.value)}
                                        className="h-9 pl-8"
                                        placeholder="Texto do indicador..."
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                </ScrollArea>
                 <Button variant="outline" className="w-full mt-4" onClick={handleAddDataPoint}>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Item
                </Button>
            </Card>
            <Card className="p-4 bg-muted/20 border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Estilo</h3>
                <div className="space-y-4">
                    <div>
                        <UILabel htmlFor="chartColor" className='text-xs'>Cor</UILabel>
                        <Select
                            value={`${component.props.gradientStartColor || ''}-${component.props.gradientEndColor || ''}`}
                            onValueChange={(value) => {
                                const [start, end] = value.split('-');
                                onUpdate({ ...component.props, gradientStartColor: start, gradientEndColor: end });
                            }}
                        >
                            <SelectTrigger id="chartColor" className="mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hsl(var(--primary))-hsl(var(--primary))">Tema</SelectItem>
                                <SelectItem value="#16A34A-#EF4444">Verde para Vermelho</SelectItem>
                                <SelectItem value="#EF4444-#16A34A">Vermelho para Verde</SelectItem>
                                <SelectItem value="#A0AEC0-#A0AEC0">Cinza</SelectItem>
                                <SelectItem value="#EF4444-#EF4444">Perigo</SelectItem>
                                <SelectItem value="#10B981-#10B981">Sucesso</SelectItem>
                                <SelectItem value="#F59E0B-#F59E0B">Atenção</SelectItem>
                                <SelectItem value="#3B82F6-#3B82F6">Informativo</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center justify-between">
                        <UILabel htmlFor="showArea">Mostrar área?</UILabel>
                        <Switch
                            id="showArea"
                            checked={component.props.showArea}
                            onCheckedChange={(checked) => onUpdate({ ...component.props, showArea: checked })}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <UILabel htmlFor="showGrid">Mostrar grade?</UILabel>
                        <Switch
                            id="showGrid"
                            checked={component.props.showGrid}
                            onCheckedChange={(checked) => onUpdate({ ...component.props, showGrid: checked })}
                        />
                    </div>
                </div>
            </Card>
        </div>
    )
};

const CompararSettings = ({ component, onUpdate }: { component: CanvasComponentData, onUpdate: (props: ComponentProps) => void }) => {
    return (
        <div className='space-y-6'>
            <Card className="p-4 bg-muted/20 border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Conteúdo</h3>
                <div className="space-y-3">
                    <div>
                        <UILabel htmlFor="beforeImageUrl" className='text-xs'>URL da Imagem Antes</UILabel>
                        <Input
                            id="beforeImageUrl"
                            value={component.props.beforeImageUrl || ''}
                            onChange={(e) => onUpdate({ ...component.props, beforeImageUrl: e.target.value })}
                            className="mt-1"
                            placeholder="https://..."
                        />
                    </div>
                    <div>
                        <UILabel htmlFor="afterImageUrl" className='text-xs'>URL da Imagem Depois</UILabel>
                        <Input
                            id="afterImageUrl"
                            value={component.props.afterImageUrl || ''}
                            onChange={(e) => onUpdate({ ...component.props, afterImageUrl: e.target.value })}
                            className="mt-1"
                            placeholder="https://..."
                        />
                    </div>
                </div>
            </Card>
            <Card className="p-4 bg-muted/20 border-border/50">
                <h3 className="text-sm font-medium text-muted-foreground mb-4">Personalização</h3>
                <div className="space-y-4">
                    <div>
                        <UILabel htmlFor="sliderPosition" className='text-xs'>Posição Inicial do Slider (%)</UILabel>
                        <Slider
                            id="sliderPosition"
                            min={0}
                            max={100}
                            step={1}
                            value={[component.props.sliderPosition || 50]}
                            onValueChange={(value) => onUpdate({ ...component.props, sliderPosition: value[0] })}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                         <div className='space-y-1'>
                            <UILabel htmlFor='sliderColor' className='text-xs'>Cor da Barra</UILabel>
                            <Input 
                              type='color' 
                              id='sliderColor' 
                              className='p-1 h-8 w-full' 
                              value={component.props.sliderColor || '#FFFFFF'} 
                              onChange={(e) => onUpdate({ ...component.props, sliderColor: e.target.value })} 
                            />
                        </div>
                        <div className='space-y-1'>
                            <UILabel htmlFor='sliderIconColor' className='text-xs'>Cor do Ícone</UILabel>
                            <Input 
                              type='color' 
                              id='sliderIconColor' 
                              className='p-1 h-8 w-full' 
                              value={component.props.sliderIconColor || '#000000'} 
                              onChange={(e) => onUpdate({ ...component.props, sliderIconColor: e.target.value })} 
                            />
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};


const ComponentSettings = ({ component, onUpdate }: { component: CanvasComponentData | null, onUpdate: (id: number, props: ComponentProps) => void }) => {
    if (!component) return <div className="text-sm text-muted-foreground">Selecione um componente para editar.</div>;

    const handleUpdate = (props: ComponentProps) => {
      onUpdate(component.id, props);
    };

    const renderSettings = () => {
      switch (component.name) {
        case 'Alerta':
          return <AlertSettings component={component} onUpdate={handleUpdate} />;
        case 'Argumentos':
          return <ArgumentosSettings component={component} onUpdate={handleUpdate} />;
        case 'Audio':
            return <AudioSettings component={component} onUpdate={handleUpdate} />;
        case 'Botão':
            return <BotaoSettings component={component} onUpdate={handleUpdate} />;
        case 'Carregando':
            return <CarregandoSettings component={component} onUpdate={handleUpdate} />;
        case 'Carrosel':
            return <CarroselSettings component={component} onUpdate={handleUpdate} />;
        case 'Cartesiano':
            return <CartesianoSettings component={component} onUpdate={handleUpdate} />;
        case 'Comparar':
            return <CompararSettings component={component} onUpdate={handleUpdate} />;
        default:
          return <p className="text-sm text-muted-foreground">Opções de configuração para o componente {component.name} aparecerão aqui.</p>;
      }
    };

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold">Editando: {component.name}</h3>
            {renderSettings()}
        </div>
    );
};


function FunnelEditorContent() {
  const searchParams = useSearchParams();
  const funnelName = searchParams.get('name') || 'Novo Funil';
  const [canvasComponents, setCanvasComponents] = useState<CanvasComponentData[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);

  const addComponentToCanvas = (component: ComponentType) => {
    let defaultProps: ComponentProps = {};
    
    if (component.name === 'Alerta') {
      const model: AlertModel = 'success';
      defaultProps = {
        title: 'Sucesso!',
        description: 'Seu item foi salvo com sucesso.',
        model: model,
        ...modelColors[model],
        icon: modelIcons[model],
      };
    }

    if (component.name === 'Argumentos') {
      defaultProps = {
        layout: 'list',
        items: [
            { id: 1, icon: '👋', title: 'Argumento', description: 'Lorem ipsum dollor sit amet.'}
        ],
      };
    }

    if (component.name === 'Audio') {
        defaultProps = {
            audioUrl: 'https://www.youtube.com/watch?v=OtL_2dOiIMY',
            avatarUrl: 'https://picsum.photos/seed/audio-avatar/40/40',
            showAvatar: true,
            autoplay: false,
            progressColor: '#00A884',
            bgColor: '#005C4B',
            iconColor: '#8696A0'
        };
    }

    if (component.name === 'Botão') {
      defaultProps = {
        text: 'Continuar',
        action: 'next_step',
        fullWidth: true,
        variant: 'default',
        backgroundColor: '#1f2937', // dark grey
        textColor: '#ffffff', // white
      };
    }
    
    if (component.name === 'Carregando') {
      defaultProps = {
        loadingText: 'Carregando...',
        loadingDescription: 'Lorem ipsum dollor sit amet.',
        progressBarColor: '#1f2937',
        duration: 5,
        limit: 100,
        action: 'next_step',
        showTitle: true,
        showProgress: true,
      };
    }

    if (component.name === 'Carrosel') {
      defaultProps = {
        slides: [
          { id: 1, imageUrl: 'https://picsum.photos/seed/carousel1/400/300', caption: 'Legenda 1' },
          { id: 2, imageUrl: 'https://picsum.photos/seed/carousel2/400/300', caption: 'Legenda 2' }
        ],
        loop: true,
        autoplayCarousel: false,
        autoplayDelay: 2,
        showPagination: true,
        arrowColor: '#FFFFFF',
        arrowTextColor: '#000000',
        arrowBorderColor: '#DDDDDD',
      };
    }

    if (component.name === 'Cartesiano') {
      defaultProps = {
        chartTitle: 'Cartesiano',
        chartData: [
            { id: 1, name: 'A', value: 20, indicatorLabel: '' },
            { id: 2, name: 'B', value: 50, indicatorLabel: 'Você' },
            { id: 3, name: 'C', value: 80, indicatorLabel: 'Objetivo' },
        ],
        gradientStartColor: '#16A34A',
        gradientEndColor: '#EF4444',
        showArea: true,
        showGrid: true,
      };
    }

    if (component.name === 'Comparar') {
        defaultProps = {
            beforeImageUrl: 'https://picsum.photos/seed/before/600/400',
            afterImageUrl: 'https://picsum.photos/seed/after/600/400',
            sliderColor: '#FFFFFF',
            sliderIconColor: '#000000',
            sliderPosition: 50,
        };
    }


    const newComponent: CanvasComponentData = { 
        ...component, 
        id: Date.now(),
        props: defaultProps
    };
    setCanvasComponents(prev => [...prev, newComponent]);
  };

  const updateComponentProps = (id: number, props: ComponentProps) => {
    setCanvasComponents(prev =>
      prev.map(c => (c.id === id ? { ...c, props } : c))
    );
  };
  
  const duplicateComponent = (id: number) => {
    const componentToDuplicate = canvasComponents.find(c => c.id === id);
    if (!componentToDuplicate) return;

    const newComponent = {
      ...componentToDuplicate,
      id: Date.now(), // new unique id
    };

    const index = canvasComponents.findIndex(c => c.id === id);
    const newCanvasComponents = [...canvasComponents];
    newCanvasComponents.splice(index + 1, 0, newComponent);
    setCanvasComponents(newCanvasComponents);
  };

  const deleteComponent = (id: number) => {
    setCanvasComponents(prev => prev.filter(c => c.id !== id));
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };


  const selectedComponent = canvasComponents.find(c => c.id === selectedComponentId) || null;

  return (
    <div className="flex h-screen w-full flex-col bg-background text-foreground">
      {/* Header */}
      <header className="flex h-16 items-center justify-between border-b border-border px-4 md:px-6">
        <div className="flex items-center gap-4">
            <PanelLeft className="h-6 w-6 text-muted-foreground" />
            <span className="text-lg font-semibold">{funnelName}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-card p-1">
            <Button variant="secondary" size="sm">Construtor</Button>
            <Button variant="ghost" size="sm">Fluxo</Button>
            <Button variant="ghost" size="sm">Design</Button>
            <Button variant="ghost" size="sm">Leads</Button>
            <Button variant="ghost" size="sm">Configurações</Button>
        </div>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Eye className="h-5 w-5" /></Button>
            <Button variant="outline" size="sm"><Save className="mr-2 h-4 w-4" />Salvar</Button>
            <Button size="sm"><Rocket className="mr-2 h-4 w-4" />Publicar</Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <aside className="flex border-r border-border">
          {/* Steps Column */}
          <div className="w-60 flex-col border-r border-border">
            <div className="flex h-14 items-center justify-between border-b border-border px-4">
              <div className="flex items-center gap-2">
                <Grip className="h-5 w-5 text-muted-foreground" />
                <h2 className="font-semibold">Etapa 1</h2>
              </div>
              <MoreVertical className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="p-4">
              <Button variant="outline" className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Etapa
              </Button>
            </div>
          </div>
          
          {/* Components Column */}
          <div className="w-72 flex-col">
            <ScrollArea className="h-full">
              <div className="grid grid-cols-2 gap-2 p-4">
                {components.map((component) => (
                  <Card 
                    key={component.name} 
                    className="group flex cursor-pointer flex-col items-center justify-center p-3 text-center transition-colors hover:bg-primary/10 hover:text-primary"
                    onClick={() => addComponentToCanvas(component)}
                    >
                    <div className="relative text-primary">
                      {component.icon}
                      {component.isNew && <Badge className="absolute -top-2 -right-4 scale-75">Novo</Badge>}
                    </div>
                    <span className="mt-2 text-xs font-medium">{component.name}</span>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>
        </aside>

        {/* Center Canvas */}
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4" onClick={() => setSelectedComponentId(null)}>
            <div className="mx-auto w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-4 text-muted-foreground">
                    <ArrowLeft className="h-5 w-5 cursor-pointer hover:text-foreground" />
                    <Separator className="flex-1" />
                    <ImageIcon className="h-8 w-8 text-primary" />
                    <Separator className="flex-1" />
                </div>
                <div className="mt-8 flex min-h-[400px] flex-col gap-4 rounded-lg border-2 border-dashed border-border bg-card/50 p-4">
                    {canvasComponents.length === 0 ? (
                        <div className="flex-1 flex items-center justify-center text-center text-muted-foreground">
                            <div>
                                <p className="text-lg">Nada por aqui 😔</p>
                                <p className="text-sm">Clique em um componente para começar.</p>
                            </div>
                        </div>
                    ) : (
                        canvasComponents.map((comp) => (
                            <CanvasComponent 
                                key={comp.id} 
                                component={comp} 
                                isSelected={selectedComponentId === comp.id}
                                onClick={() => setSelectedComponentId(comp.id)}
                                onDuplicate={() => duplicateComponent(comp.id)}
                                onDelete={() => deleteComponent(comp.id)}
                            />
                        ))
                    )}
                </div>
            </div>
        </main>

        {/* Right Sidebar */}
        <aside className="w-80 border-l border-border p-6">
          <ScrollArea className="h-full">
            <div className="space-y-6 pr-4">
              {selectedComponent ? (
                  <ComponentSettings component={selectedComponent} onUpdate={updateComponentProps} />
              ) : (
                  <StepSettings />
              )}
            </div>
          </ScrollArea>
        </aside>
      </div>
    </div>
  );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div>Carregando...</div>}>
            <FunnelEditorContent />
        </Suspense>
    )
}

    

    













