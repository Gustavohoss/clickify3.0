'use client';

import React, {
  Suspense,
  useState,
  ReactNode,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import ReactPlayer from 'react-player';
import confetti from 'canvas-confetti';
import type { Options as ConfettiOptions } from 'canvas-confetti';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  Label as ChartLabel,
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label as UILabel } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useSearchParams, useParams, useRouter } from 'next/navigation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useDebouncedCallback } from 'use-debounce';

type ComponentType = {
  name: string;
  icon: ReactNode;
  isNew?: boolean;
};

type AlertModel = 'success' | 'error' | 'warning' | 'info';

const modelColors: Record<
  AlertModel,
  { backgroundColor: string; textColor: string; borderColor: string }
> = {
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

type TestimonialItem = {
  id: number;
  imageUrl: string;
  name: string;
  handle: string;
  rating: number;
  testimonial: string;
};

type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

type GraficosItem = {
  id: number;
  label: string;
  value: number;
};

type ListItem = {
  id: number;
  icon: string;
  iconBgColor: string;
  title: string;
  subtitle: string;
};

type MarquiseItem = {
  id: number;
  name: string;
  handle: string;
  avatarUrl: string;
  text: string;
};

type OpcaoItem = {
  id: number;
  icon: string;
  text: string;
};

type TermosLinkItem = {
  id: number;
  text: string;
  url: string;
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
  action?: 'next_step' | 'open_url' | 'go_to_step';
  url?: string;
  stepId?: number;
  fullWidth?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link' | 'destructive';
  // Specific properties for Carregando
  loadingText?: string;
  loadingDescription?: string;
  progressTrackColor?: string;
  duration?: number;
  limit?: number;
  showTitle?: boolean;
  showProgress?: boolean;
  titleColor?: string;
  descriptionColor?: string;
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
  // Specific properties for Confetti
  particleCount?: number;
  spread?: number;
  originX?: number;
  originY?: number;
  // Specific properties for Depoimentos
  testimonials?: TestimonialItem[];
  cardBackgroundColor?: string;
  cardTextColor?: string;
  cardBorderColor?: string;
  // Specific properties for Entrada
  label?: string;
  placeholder?: string;
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel';
  required?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: 'sm' | 'base' | 'lg';
  padding?: 'sm' | 'base' | 'lg';
  // Specific properties for Espaçador
  height?: number;
  // Specific properties for FAQ
  faqItems?: FaqItem[];
  faqBackgroundColor?: string;
  faqTextColor?: string;
  faqBorderColor?: string;
  // Specific properties for Gráficos
  graficosItems?: GraficosItem[];
  barColor?: string;
  trackColor?: string;
  graficosLayout?: '1-col' | '2-cols' | '3-cols' | '4-cols';
  disposition?: 'top' | 'side';
  // Specific properties for Imagem
  imageUrl?: string;
  altText?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  // Specific properties for Lista
  listItems?: ListItem[];
  // Specific properties for Marquise
  marquiseItems?: MarquiseItem[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  // Specific properties for Nível
  value?: number;
  tooltipText?: string;
  showTooltip?: boolean;
  nivelTrackColor?: string;
  nivelProgressColor?: string;
  nivelThumbColor?: string;
  tooltipColor?: string;
  tooltipTextColor?: string;
  // Specific properties for Opcoes
  opcoesItems?: OpcaoItem[];
  multipleChoice?: boolean;
  opcoesRequired?: boolean;
  autoAdvance?: boolean;
  borderStyle?: 'pequena' | 'media' | 'grande' | 'gigante' | 'sem-borda';
  shadowStyle?: 'nenhuma' | 'pequena' | 'media' | 'grande';
  spacingStyle?: 'pequeno' | 'medio' | 'grande';
  detailStyle?: 'nenhum' | 'seta' | 'confirmacao';
  styleType?: 'simples' | 'relevo';
  // Specific properties for Preco
  planName?: string;
  price?: string;
  priceSubtitle?: string;
  discountText?: string;
  popularText?: string;
  showPopularBanner?: boolean;
  cardBgColor?: string;
  priceBoxColor?: string;
  priceTextColor?: string;
  popularBannerColor?: string;
  popularTextColor?: string;
  // Specific properties for Termos
  mainText?: string;
  links?: TermosLinkItem[];
  termosTextColor?: string;
  termosFontSize?: 'xs' | 'sm' | 'base' | 'lg';
  termosTextAlign?: 'left' | 'center' | 'right';
  // Specific properties for Texto
  content?: string;
  // Specific properties for Video
  videoUrl?: string;
  showControls?: boolean;
  autoplayVideo?: boolean;
  loopVideo?: boolean;
};

type CanvasComponentData = ComponentType & {
  id: number;
  props: ComponentProps;
};

type Step = {
  id: number;
  name: string;
  components: CanvasComponentData[];
  width?: string;
  spacing?: string;
  borderRadius?: string;
};

type Funnel = {
  id: string;
  name: string;
  type: string;
  userId: string;
  steps: Step[];
};

type EditorView = 'construtor' | 'fluxo' | 'design' | 'leads' | 'configuracoes';

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
  { name: 'Nível', icon: <SlidersHorizontal />, isNew: true },
  { name: 'Opções', icon: <CheckSquare /> },
  { name: 'Preço', icon: <DollarSign />, isNew: true },
  { name: 'Script', icon: <FileCode /> },
  { name: 'Termos', icon: <FileTextIcon />, isNew: true },
  { name: 'Texto', icon: <TextIcon /> },
  { name: 'Título', icon: <Heading1 /> },
  { name: 'Video', icon: <Video /> },
];

const WavingHandIcon = ({ className }: { className?: string }) => (
  <span className={cn('text-3xl', className)}>👋</span>
);

const GenericCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  return (
    <Card className="flex items-center gap-4 bg-card p-4 text-card-foreground">
      <div className="text-primary">{component.icon}</div>
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
    iconColor = '#8696A0',
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
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div
      className="flex w-full max-w-sm items-center gap-2 rounded-lg p-2"
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
      <Button
        variant="ghost"
        size="icon"
        className="h-10 w-10 flex-shrink-0"
        onClick={togglePlayPause}
        disabled={!audioUrl || !isReady}
      >
        {isPlaying ? (
          <Pause className="h-6 w-6" style={{ color: iconColor }} />
        ) : (
          <Play className="h-6 w-6" style={{ color: iconColor }} />
        )}
      </Button>
      <div className="flex flex-grow flex-col justify-center">
        <Slider
          value={[playedSeconds]}
          max={duration || 100}
          step={0.1}
          onValueChange={handleSliderChange}
          disabled={!isReady}
          className="w-full [&>span:first-child]:h-1 [&>span:first-child>span]:bg-transparent"
          style={
            { '--slider-track': progressColor, '--slider-thumb': progressColor } as React.CSSProperties
          }
        />
        <div className="mt-1 flex justify-between text-xs" style={{ color: iconColor }}>
          <span>{formatTime(playedSeconds)}</span>
          <div className="flex items-center gap-1">
            <span>{formatTime(duration)}</span>
            <CheckCheck className="h-4 w-4" style={{ color: progressColor }} />
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
    list: 'grid-cols-1',
    '2-cols': 'md:grid-cols-2',
    '3-cols': 'md:grid-cols-3',
    '4-cols': 'md:grid-cols-4',
  };

  const gridClass = layoutClasses[layout] || 'grid-cols-1';

  if (items.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Argumento</h3>
        <p className="mt-1 text-gray-500">Configure seus argumentos</p>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4', gridClass)}>
      {items.map((item) => (
        <div key={item.id} className="p-6 text-center">
          <div className="mb-4 flex justify-center">
            <span className="text-4xl">{item.icon}</span>
          </div>
          <h3
            className="text-lg font-bold text-black"
            dangerouslySetInnerHTML={{ __html: item.title }}
          ></h3>
          <p
            className="mt-1 text-gray-600"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></p>
        </div>
      ))}
    </div>
  );
};

const AlertCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { title, description, backgroundColor, textColor, borderColor, icon } =
    component.props;
  const IconComponent = icon || <CheckCircle className="h-4 w-4" />;

  return (
    <Alert
      style={{
        backgroundColor: backgroundColor,
        borderColor: borderColor,
      }}
    >
      {React.cloneElement(IconComponent as React.ReactElement, {
        className: 'h-5 w-5',
        style: { color: textColor },
      })}
      <AlertTitle style={{ color: textColor }}>{title || 'Título do Alerta'}</AlertTitle>
      <AlertDescription style={{ color: textColor }}>
        {description || 'Esta é a descrição do alerta.'}
      </AlertDescription>
    </Alert>
  );
};

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
    progressColor = '#000000',
    progressTrackColor = '#E5E7EB',
    titleColor = '#000000',
    descriptionColor = '#000000',
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
      setAnimatedProgress((prev) => {
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
    <div className="w-full space-y-2 text-center">
      {showTitle && (
        <div className="flex items-center justify-between text-sm font-medium">
          <span style={{ color: titleColor }} className="text-black">
            {loadingText}
          </span>
          {showProgress && (
            <span style={{ color: progressColor }} className="text-black">
              {displayProgress}%
            </span>
          )}
        </div>
      )}
      {showProgress && (
        <Progress
          value={displayProgress}
          className="h-2 w-full"
          style={
            {
              backgroundColor: progressTrackColor,
              '--progress-indicator-color': progressColor,
            } as React.CSSProperties
          }
        />
      )}
      <p className="pt-1 text-sm" style={{ color: descriptionColor }}>
        {loadingDescription}
      </p>
    </div>
  );
};

const CarroselCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const slides = component.props.slides || [];

  if (slides.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Carrossel</h3>
        <p className="mt-1 text-gray-500">Adicione slides para começar</p>
      </div>
    );
  }

  return (
    <Carousel className="w-full" opts={{ loop: component.props.loop }}>
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.id}>
            <div className="p-1">
              <div className="border-0 bg-transparent shadow-none">
                <div className="relative flex aspect-video items-center justify-center bg-gray-100 p-0">
                  {slide.imageUrl ? (
                    <Image
                      src={slide.imageUrl}
                      alt={slide.caption || 'Slide image'}
                      layout="fill"
                      objectFit="contain"
                    />
                  ) : (
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  )}
                </div>
              </div>
              {slide.caption && (
                <p className="mt-2 text-center text-sm text-black">{slide.caption}</p>
              )}
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
    chartTitle = 'Cartesiano',
    chartData = [],
    gradientStartColor = '#000000',
    gradientEndColor = '#000000',
    showArea = true,
    showGrid = true,
  } = component.props;

  if (chartData.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Gráfico Cartesiano</h3>
        <p className="mt-1 text-gray-500">Adicione pontos de dados para começar.</p>
      </div>
    );
  }

  const indicators = chartData.filter((d) => d.indicatorLabel);
  const uniqueId = React.useId();

  return (
    <div className="p-4">
      <h3 className="mb-4 text-lg font-bold text-black">{chartTitle}</h3>
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
              <stop offset="5%" stopColor={gradientStartColor} stopOpacity={0.8} />
              <stop offset="95%" stopColor={gradientEndColor} stopOpacity={0.8} />
            </linearGradient>
          </defs>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-gray-200" />
          )}
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#000000' }} />
          <YAxis tick={{ fontSize: 12, fill: '#000000' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#e5e7eb',
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={gradientStartColor}
            fill={showArea ? `url(#colorGradient-${uniqueId})` : 'transparent'}
            strokeWidth={2}
          />

          {indicators.map((indicator, index) => (
            <ReferenceDot
              key={index}
              x={indicator.name}
              y={indicator.value}
              r={6}
              fill={gradientStartColor}
              stroke="#ffffff"
              strokeWidth={2}
            >
              <ChartLabel
                value={indicator.indicatorLabel}
                position="top"
                offset={-15}
                style={{
                  fill: '#000000',
                  backgroundColor: '#ffffff',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius)',
                  fontSize: 12,
                  border: '1px solid #e5e7eb',
                }}
              />
            </ReferenceDot>
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
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
    <Card className="overflow-hidden bg-card">
      <div
        ref={containerRef}
        className="group relative w-full select-none aspect-video"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
      >
        <div className="absolute inset-0">
          <Image src={beforeImageUrl} alt="Before" layout="fill" objectFit="cover" />
        </div>
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image src={afterImageUrl} alt="After" layout="fill" objectFit="cover" />
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 cursor-ew-resize"
          style={{
            left: `${sliderPosition}%`,
            transform: 'translateX(-50%)',
            backgroundColor: sliderColor,
          }}
        >
          <div
            className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full"
            style={{ backgroundColor: sliderColor }}
          >
            <MoreHorizontal className="h-6 w-6 rotate-90" style={{ color: sliderIconColor }} />
          </div>
        </div>
      </div>
    </Card>
  );
};

const ConfettiCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { particleCount = 200, spread = 70, originX = 0.5, originY = 0.6 } = component.props;

  const fire = useCallback(() => {
    confetti({
      particleCount,
      spread,
      origin: { x: originX, y: originY },
    });
  }, [particleCount, spread, originX, originY]);

  useEffect(() => {
    fire();
  }, [fire]);

  return (
    <div className="relative flex items-center justify-center gap-4 border-dashed bg-card p-4">
      <div className="text-primary">
        <Sparkles />
      </div>
      <p className="font-semibold">Efeito Confete</p>
      <Badge variant="outline">Invisível</Badge>
    </div>
  );
};

const DepoimentosCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const testimonials = component.props.testimonials || [];
  const { cardBackgroundColor, cardBorderColor } = component.props;

  if (testimonials.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Depoimentos</h3>
        <p className="mt-1 text-gray-500">Adicione depoimentos para começar</p>
      </div>
    );
  }

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {testimonials.map((item) => (
        <div
          key={item.id}
          className="p-4"
          style={{
            backgroundColor: cardBackgroundColor,
            borderColor: cardBorderColor,
          }}
        >
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={item.imageUrl} alt={item.name} />
              <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <StarRating rating={item.rating} />
              <div className="mt-2">
                <p className="font-bold text-black">{item.name}</p>
                <p className="text-sm text-gray-500">{item.handle}</p>
              </div>
              <p className="mt-2 text-gray-600">{item.testimonial}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const EntradaCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    label = 'Seu e-mail',
    placeholder = 'Digite aqui...',
    inputType = 'text',
    required = false,
    textAlign = 'left',
    fontSize = 'base',
    padding = 'base',
    backgroundColor,
    textColor,
    borderColor,
  } = component.props;

  const fontSizeClasses: { [key: string]: string } = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  const paddingClasses: { [key: string]: string } = {
    sm: 'h-8 px-2 py-1',
    base: 'h-10 px-3 py-2',
    lg: 'h-12 px-4 py-3',
  };

  return (
    <div className="w-full space-y-2">
      <UILabel htmlFor={`input-${component.id}`} className="text-black">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </UILabel>
      <Input
        id={`input-${component.id}`}
        type={inputType}
        placeholder={placeholder}
        className={cn(
          `text-${textAlign}`,
          'border-gray-300 bg-white text-black',
          fontSizeClasses[fontSize],
          paddingClasses[padding]
        )}
        style={{
          backgroundColor,
          color: textColor,
          borderColor,
        }}
      />
    </div>
  );
};

const EspacadorCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { height = 50 } = component.props;

  return (
    <div
      className="flex w-full items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-card/80"
      style={{ height: `${height}px` }}
    >
      <span className="text-sm text-gray-500">Espaçador ({height}px)</span>
    </div>
  );
};

const FaqCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const faqItems = component.props.faqItems || [];
  const { faqBackgroundColor, faqBorderColor, faqTextColor } = component.props;

  if (faqItems.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">FAQ</h3>
        <p className="mt-1 text-gray-500">Adicione perguntas para começar.</p>
      </div>
    );
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full rounded-lg"
      style={{
        backgroundColor: faqBackgroundColor,
        borderColor: faqBorderColor,
        borderWidth: faqBorderColor ? '1px' : '',
      }}
    >
      {faqItems.map((item, index) => (
        <AccordionItem
          value={`item-${index}`}
          key={item.id}
          className="border-b"
          style={{ borderColor: faqBorderColor }}
        >
          <AccordionTrigger className="text-black" style={{ color: faqTextColor }}>
            {item.question}
          </AccordionTrigger>
          <AccordionContent
            className="text-gray-600"
            style={{ color: faqTextColor || '#4b5563' }}
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const GraficosCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    graficosItems = [],
    barColor = '#000000',
    trackColor = '#FFFFFF',
    textColor = '#000000',
    graficosLayout = '2-cols',
    disposition = 'top',
  } = component.props;

  const layoutClasses: { [key: string]: string } = {
    '1-col': 'grid-cols-1',
    '2-cols': 'grid-cols-2',
    '3-cols': 'grid-cols-3',
    '4-cols': 'grid-cols-4',
  };

  const gridClass = layoutClasses[graficosLayout] || 'grid-cols-2';
  const dispositionClass = disposition === 'top' ? 'flex-col' : 'flex-row items-center';

  if (graficosItems.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Gráficos</h3>
        <p className="mt-1 text-gray-500">Adicione itens para começar.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid gap-4', gridClass)}>
      {graficosItems.map((item) => (
        <div
          key={item.id}
          className={cn(
            'flex gap-4 p-4',
            dispositionClass,
            disposition === 'top' && 'items-center'
          )}
        >
          <div
            className={cn(
              'relative flex justify-end overflow-hidden rounded-lg border',
              disposition === 'top' ? 'h-32 w-12 flex-col' : 'h-12 w-32 flex-row-reverse'
            )}
            style={{ backgroundColor: trackColor }}
          >
            <div
              style={{
                [disposition === 'top' ? 'height' : 'width']: `${item.value}%`,
                backgroundColor: barColor,
              }}
            />
            <div
              className={cn(
                'absolute rounded-full px-1.5 py-0.5 text-xs font-semibold',
                disposition === 'top'
                  ? 'top-2 left-1/2 -translate-x-1/2'
                  : 'left-2 top-1/2 -translate-y-1/2'
              )}
              style={{
                color: textColor,
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {item.value}%
            </div>
          </div>
          <p className="text-center text-sm text-black" style={{ color: textColor }}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

const ImagemCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { imageUrl = '', altText = 'Imagem', borderRadius = 'md' } = component.props;

  const borderRadiusClasses: Record<string, string> = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    full: 'rounded-full',
  };

  if (!imageUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md border-2 border-dashed bg-gray-100">
        <div className="text-center text-gray-500">
          <ImageIcon className="mx-auto h-12 w-12" />
          <p className="mt-2 text-sm font-semibold text-black">Adicione uma imagem</p>
          <p className="mt-1 text-xs text-gray-500">Insira uma URL nas configurações.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative aspect-video w-full overflow-hidden',
        borderRadiusClasses[borderRadius]
      )}
    >
      <Image src={imageUrl} alt={altText} layout="fill" objectFit="cover" />
    </div>
  );
};

const ListaCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const items = component.props.listItems || [];

  if (items.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Lista</h3>
        <p className="mt-1 text-gray-500">Adicione itens para começar</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-3">
      {items.map((item) => (
        <div key={item.id} className="rounded-lg border border-black bg-white p-3">
          <div className="flex items-center gap-4">
            <div
              className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg"
              style={{ backgroundColor: item.iconBgColor }}
            >
              <span className="text-xl text-white">{item.icon}</span>
            </div>
            <div>
              <p className="font-semibold text-black">{item.title}</p>
              <p className="text-sm text-gray-500">{item.subtitle}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MarquiseCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { marquiseItems = [], speed = 20, direction = 'left', pauseOnHover = true } =
    component.props;

  if (marquiseItems.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Marquise</h3>
        <p className="mt-1 text-gray-500">Adicione itens para começar</p>
      </div>
    );
  }

  const animationName = `scroll-${direction}`;
  const animationDuration = `${marquiseItems.length * (60 / speed)}s`;

  const marquiseGroup = (
    <div
      className={cn(
        'flex shrink-0 items-center justify-around [animation-play-state:running]',
        pauseOnHover && 'group-hover:[animation-play-state:paused]'
      )}
      style={{
        animation: `${animationName} ${animationDuration} linear infinite`,
      }}
    >
      {marquiseItems.map((item, index) => (
        <div key={index} className="relative w-[300px] max-w-full shrink-0 px-4">
          <div className="relative rounded-lg border border-black/10 bg-white p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border">
                <AvatarImage src={item.avatarUrl} alt={item.name} />
                <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-black">{item.name}</p>
                <p className="text-sm text-gray-500">{item.handle}</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-700">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0%); }
        }
      `}</style>
      <div className="group flex w-full overflow-hidden">
        {marquiseGroup}
        {marquiseGroup}
      </div>
    </>
  );
};

const NivelCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    title = 'Nível',
    subtitle = 'Lorem ipsum',
    value = 75,
    tooltipText = 'Você está aqui',
    showTooltip = true,
    nivelTrackColor = '#E5E7EB',
    nivelProgressColor = '#111827',
    nivelThumbColor = '#FFFFFF',
    tooltipColor = '#111827',
    tooltipTextColor = '#FFFFFF',
  } = component.props;

  const labels = ['Baixo', 'Médio', 'Alto'];
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipWidth, setTooltipWidth] = useState(0);

  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipWidth(tooltipRef.current.offsetWidth);
    }
  }, [tooltipText]);

  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="mb-1 flex items-end justify-between">
        <div>
          <h4 className="font-bold text-black">{title}</h4>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <span className="font-semibold text-gray-600">{value}%</span>
      </div>
      <div className="relative">
        <Slider
          value={[value]}
          max={100}
          step={1}
          disabled
          className="w-full"
          style={
            {
              '--slider-track': nivelProgressColor,
              '--slider-thumb': nivelThumbColor,
              '--slider-track-bg': nivelTrackColor,
            } as React.CSSProperties
          }
        />
        {showTooltip && (
          <div
            ref={tooltipRef}
            className="absolute bottom-full mb-3"
            style={{
              left: `${value}%`,
              transform: `translateX(calc(-50% + ${tooltipWidth * ((50 - value) / 100)}px))`,
            }}
          >
            <div
              className="relative rounded-md px-3 py-1 text-sm"
              style={{ backgroundColor: tooltipColor, color: tooltipTextColor }}
            >
              {tooltipText}
              <div
                className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-x-8 border-x-transparent border-t-[8px]"
                style={{ borderTopColor: tooltipColor }}
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-1 flex justify-between text-sm text-gray-500">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
    </div>
  );
};

const OpcoesCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    opcoesItems = [],
    borderStyle = 'media',
    shadowStyle = 'pequena',
    spacingStyle = 'medio',
    detailStyle = 'nenhum',
    styleType = 'simples',
  } = component.props;
  const [selected, setSelected] = useState<number | null>(null);

  const borderClasses: Record<string, string> = {
    pequena: 'rounded-md',
    media: 'rounded-lg',
    grande: 'rounded-xl',
    gigante: 'rounded-2xl',
    'sem-borda': 'rounded-none',
  };
  const shadowClasses: Record<string, string> = {
    nenhuma: 'shadow-none',
    pequena: 'shadow-sm',
    media: 'shadow-md',
    grande: 'shadow-lg',
  };
  const spacingClasses: Record<string, string> = {
    pequeno: 'space-y-1',
    medio: 'space-y-2',
    grande: 'space-y-3',
  };
  const styleClasses: Record<string, string> = {
    simples: 'bg-white border border-gray-300',
    relevo: 'bg-gray-50 border-b-4 border-gray-200 active:border-b-2',
  };

  if (opcoesItems.length === 0) {
    return (
      <div className="border-0 bg-transparent p-6 text-center shadow-none">
        <div className="mb-4 flex justify-center">
          <WavingHandIcon />
        </div>
        <h3 className="text-lg font-bold text-black">Opções</h3>
        <p className="mt-1 text-gray-500">Configure suas opções</p>
      </div>
    );
  }

  return (
    <div className={cn('w-full', spacingClasses[spacingStyle])}>
      {opcoesItems.map((item) => (
        <button
          key={item.id}
          className={cn(
            'flex w-full items-center p-4 text-left transition-all',
            borderClasses[borderStyle],
            shadowClasses[shadowStyle],
            styleClasses[styleType]
          )}
          onClick={() => setSelected(item.id)}
        >
          <span className="mr-3 text-2xl">{item.icon}</span>
          <span className="flex-grow font-medium text-black">{item.text}</span>
          {detailStyle === 'seta' && <ArrowRight className="h-5 w-5 text-gray-400" />}
          {detailStyle === 'confirmacao' && (
            <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300">
              {selected === item.id && <div className="h-3 w-3 rounded-full bg-black" />}
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

const PrecoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    planName = 'Plano Premium',
    price = 'R$ 39,90',
    priceSubtitle = 'à vista',
    discountText = '15% Off',
    popularText = 'Mais Popular',
    showPopularBanner = true,
    cardBgColor = '#FFFFFF',
    priceBoxColor = '#E5E7EB',
    priceTextColor = '#111827',
    popularBannerColor = '#1F2937',
    popularTextColor = '#FFFFFF',
  } = component.props;

  return (
    <div className="mx-auto w-full max-w-sm overflow-hidden rounded-lg shadow-md">
      {showPopularBanner && (
        <div
          className="py-2 text-center font-semibold"
          style={{ backgroundColor: popularBannerColor, color: popularTextColor }}
        >
          {popularText}
        </div>
      )}
      <div
        className="flex items-center justify-between p-6"
        style={{ backgroundColor: cardBgColor, color: '#000000' }}
      >
        <h4 className="text-2xl font-bold">{planName}</h4>
        <div
          className="rounded-lg p-3 text-center"
          style={{ backgroundColor: priceBoxColor, color: priceTextColor }}
        >
          {discountText && <p className="text-xs">{discountText}</p>}
          <p className="text-2xl font-bold">{price}</p>
          {priceSubtitle && <p className="text-xs">{priceSubtitle}</p>}
        </div>
      </div>
    </div>
  );
};

const TermosCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const {
    mainText = 'Ao clicar em alguma das opções, você concorda com os',
    links = [],
    termosTextColor = '#6B7280',
    termosFontSize = 'sm',
    termosTextAlign = 'center',
  } = component.props;

  const fontSizeClasses: { [key: string]: string } = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
  };

  return (
    <p
      className={cn('w-full', `text-${termosTextAlign}`, fontSizeClasses[termosFontSize])}
      style={{ color: termosTextColor }}
    >
      {mainText}{' '}
      {links.map((link, index) => (
        <React.Fragment key={link.id}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold underline"
          >
            {link.text}
          </a>
          {index < links.length - 2 ? ', ' : index === links.length - 2 ? ' e ' : ''}
        </React.Fragment>
      ))}
    </p>
  );
};

const TextoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { content = '' } = component.props;

  return (
    <div
      className="prose prose-sm w-full max-w-none text-black dark:prose-invert lg:prose-base"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

const VideoCanvasComponent = ({ component }: { component: CanvasComponentData }) => {
  const { videoUrl = '', showControls = true, autoplayVideo = false, loopVideo = false } =
    component.props;
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!videoUrl) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-md border-2 border-dashed bg-gray-100">
        <div className="text-center text-gray-500">
          <Video className="mx-auto h-12 w-12" />
          <p className="mt-2 text-sm font-semibold text-black">Adicione um vídeo</p>
          <p className="mt-1 text-xs text-gray-500">Insira uma URL nas configurações.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-md">
      {hasMounted && (
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls={showControls}
          playing={autoplayVideo}
          loop={loopVideo}
          className="absolute top-0 left-0"
        />
      )}
    </div>
  );
};

const CanvasComponent = ({
  component,
  isSelected,
  onClick,
  onDuplicate,
  onDelete,
}: {
  component: CanvasComponentData;
  isSelected: boolean;
  onClick: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}) => {
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
      case 'Confetti':
        return <ConfettiCanvasComponent component={component} />;
      case 'Depoimentos':
        return <DepoimentosCanvasComponent component={component} />;
      case 'Entrada':
        return <EntradaCanvasComponent component={component} />;
      case 'Espaçador':
        return <EspacadorCanvasComponent component={component} />;
      case 'FAQ':
        return <FaqCanvasComponent component={component} />;
      case 'Gráficos':
        return <GraficosCanvasComponent component={component} />;
      case 'Imagem':
        return <ImagemCanvasComponent component={component} />;
      case 'Lista':
        return <ListaCanvasComponent component={component} />;
      case 'Marquise':
        return <MarquiseCanvasComponent component={component} />;
      case 'Nível':
        return <NivelCanvasComponent component={component} />;
      case 'Opções':
        return <OpcoesCanvasComponent component={component} />;
      case 'Preço':
        return <PrecoCanvasComponent component={component} />;
      case 'Termos':
        return <TermosCanvasComponent component={component} />;
      case 'Texto':
        return <TextoCanvasComponent component={component} />;
      case 'Video':
        return <VideoCanvasComponent component={component} />;
      default:
        return <GenericCanvasComponent component={component} />;
    }
  };

  return (
    <div
      className={cn(
        'relative cursor-pointer rounded-lg p-1 group',
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background'
      )}
      onClick={onClick}
    >
      <div className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center gap-0.5 rounded-md bg-blue-500 p-0.5 shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 cursor-grab text-white hover:bg-blue-600 hover:text-white"
        >
          <Grip className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white"
          onClick={onClick}
        >
          <Pencil className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white hover:bg-blue-600 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
        >
          <Copy className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white hover:bg-red-500 hover:text-white"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      {renderComponent()}
    </div>
  );
};

const StepSettings = ({
  step,
  onUpdateStep,
}: {
  step: Step;
  onUpdateStep: (id: number, name: string) => void;
  steps: Step[];
}) => {
  const [stepName, setStepName] = useState(step.name);

  useEffect(() => {
    setStepName(step.name);
  }, [step]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStepName(e.target.value);
  };

  const handleNameBlur = () => {
    if (stepName.trim() === '') {
      setStepName(step.name); // revert if empty
    } else {
      onUpdateStep(step.id, stepName);
    }
  };

  return (
    <>
      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Título da Etapa</h3>
        <Input
          value={stepName}
          onChange={handleNameChange}
          onBlur={handleNameBlur}
          className="mt-2 text-base"
        />
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
};

const AlertSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const handleModelChange = (model: AlertModel) => {
    const colors = modelColors[model];
    const icon = modelIcons[model];
    onUpdate({ ...component.props, model, ...colors, icon });
  };

  const handleColorReset = (
    colorType: 'backgroundColor' | 'textColor' | 'borderColor'
  ) => {
    const currentModel = component.props.model || 'success';
    const defaultColor = modelColors[currentModel][colorType];
    onUpdate({ ...component.props, [colorType]: defaultColor });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Informações</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="title" className="text-xs">
              Título
            </UILabel>
            <Input
              id="title"
              value={component.props.title || ''}
              onChange={(e) => onUpdate({ ...component.props, title: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="description" className="text-xs">
              Descrição
            </UILabel>
            <Textarea
              id="description"
              value={component.props.description || ''}
              onChange={(e) => onUpdate({ ...component.props, description: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div>
          <UILabel htmlFor="model" className="text-xs">
            Modelo
          </UILabel>
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

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="color" className="text-xs">
              Cor
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="color"
                className="h-8 w-full p-1"
                value={component.props.backgroundColor || '#ffffff'}
                onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('backgroundColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="text-color" className="text-xs">
              Texto
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="text-color"
                className="h-8 w-full p-1"
                value={component.props.textColor || '#000000'}
                onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('textColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="border-color" className="text-xs">
              Borda
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="border-color"
                className="h-8 w-full p-1"
                value={component.props.borderColor || '#000000'}
                onChange={(e) => onUpdate({ ...component.props, borderColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('borderColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const AudioSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="sendTime" className="text-xs">
              Horário de Envio
            </UILabel>
            <Input
              id="sendTime"
              type="time"
              value={component.props.sendTime || ''}
              onChange={(e) => onUpdate({ ...component.props, sendTime: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="audioUrl" className="text-xs">
              URL do Áudio
            </UILabel>
            <Input
              id="audioUrl"
              value={component.props.audioUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, audioUrl: e.target.value })}
              className="mt-1"
              placeholder="https://example.com/audio.mp3"
            />
          </div>
          <div>
            <UILabel htmlFor="avatarUrl" className="text-xs">
              URL do Avatar
            </UILabel>
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

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configurações</h3>
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

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="bg-color" className="text-xs">
              Fundo
            </UILabel>
            <Input
              type="color"
              id="bg-color"
              className="h-8 w-full p-1"
              value={component.props.bgColor || '#005C4B'}
              onChange={(e) => onUpdate({ ...component.props, bgColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="progress-color" className="text-xs">
              Progresso
            </UILabel>
            <Input
              type="color"
              id="progress-color"
              className="h-8 w-full p-1"
              value={component.props.progressColor || '#00A884'}
              onChange={(e) => onUpdate({ ...component.props, progressColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="icon-color" className="text-xs">
              Ícones
            </UILabel>
            <Input
              type="color"
              id="icon-color"
              className="h-8 w-full p-1"
              value={component.props.iconColor || '#8696A0'}
              onChange={(e) => onUpdate({ ...component.props, iconColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const emojiCategories = {
  'Smileys & People': [
    '😀',
    '😃',
    '😄',
    '😁',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😇',
    '🙂',
    '🙃',
    '😉',
    '😌',
    '😍',
    '🥰',
    '😘',
    '😗',
    '😙',
    '😚',
    '😋',
    '😛',
    '😜',
    '🤪',
    '🤨',
    '🧐',
    '🤓',
    '😎',
    '🤩',
    '🥳',
    '😏',
    '😒',
    '😞',
    '😔',
    '😟',
    '😕',
    '🙁',
    '☹️',
    '😣',
    '😖',
    '😫',
    '😩',
    '🥺',
    '😢',
    '😭',
    '😤',
    '😠',
    '😡',
    '🤬',
    '🤯',
    '😳',
    '🥵',
    '🥶',
    '😱',
    '😨',
    '😰',
    '😥',
    '😓',
    '🤗',
    '🤔',
    '🤭',
    '🤫',
    '🤥',
    '😶',
    '😐',
    '😑',
    '😬',
    '🙄',
    '😯',
    '😦',
    '😧',
    '😮',
    '😲',
    '🥱',
    '😴',
    '🤤',
    '😪',
    '😵',
    '🤐',
    '🥴',
    '🤢',
    '🤮',
    '🤧',
    '😷',
    '🤒',
    '🤕',
    '🤑',
    '🤠',
    '😈',
    '👿',
    '👹',
    '👺',
    '🤡',
    '💩',
    '👻',
    '💀',
    '☠️',
    '👽',
    '👾',
    '🤖',
    '🎃',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
    '👋',
    '🤚',
    '🖐️',
    '✋',
    '🖖',
    '👌',
    '🤏',
    '✌️',
    '🤞',
    '🤟',
    '🤘',
    '🤙',
    '👈',
    '👉',
    '👆',
    '🖕',
    '👇',
    '☝️',
    '👍',
    '👎',
    '✊',
    '👊',
    '🤛',
    '🤜',
    '👏',
    '🙌',
    '👐',
    '🤲',
    '🤝',
    '🙏',
    '✍️',
    '💅',
    '🤳',
    '💪',
    '🦾',
    '🦵',
    '🦿',
    '🦶',
    '👂',
    '🦻',
    '👃',
    '🧠',
    '🦷',
    '🦴',
    '👀',
    '👁️',
    '👅',
    '👄',
  ],
  'Animals & Nature': [
    '🐶',
    '🐱',
    '🐭',
    '🐹',
    '🐰',
    '🦊',
    '🐻',
    '🐼',
    '🐨',
    '🐯',
    '🦁',
    '🐮',
    '🐷',
    '🐽',
    '🐸',
    '🐵',
    '🙈',
    '🙉',
    '🙊',
    '🐒',
    '🐔',
    '🐧',
    '🐦',
    '🐤',
    '🐣',
    '🐥',
    '🦆',
    '🦅',
    '🦉',
    '🦇',
    '🐺',
    '🐗',
    '🐴',
    '🦄',
    '🐝',
    '🐛',
    '🦋',
    '🐌',
    '🐞',
    '🐜',
    '🦟',
    '🦗',
    '🕷️',
    '🕸️',
    '🦂',
    '🐢',
    '🐍',
    '🦎',
    '🦖',
    '🦕',
    '🐙',
    '🦑',
    '🦐',
    '🦞',
    '🦀',
    '🐡',
    '🐠',
    '🐟',
    '🐬',
    '🐳',
    '🐋',
    '🦈',
    '🐊',
    '🐅',
    '🐆',
    '🦓',
    '🦍',
    '🦧',
    '🐘',
    '🦛',
    '🦏',
    '🐪',
    '🐫',
    '🦒',
    '🦘',
    '🐃',
    '🐂',
    '🐄',
    '🐎',
    '🐖',
    '🐏',
    '🐑',
    '🦙',
    '🐐',
    '🦌',
    '🐕',
    '🐩',
    '🦮',
    '🐕‍',
    '🐈',
    '🐓',
    '🦃',
    '🦜',
    '🦢',
    '🦩',
    '🕊️',
    '🐇',
    '🦝',
    '🦨',
    '🦡',
    '🦦',
    '🦥',
    '🐁',
    '🐀',
    '🐿️',
    '🦔',
    '🐾',
    '🐉',
    '🐲',
    '🌵',
    '🎄',
    '🌲',
    '🌳',
    '🌴',
    '🌱',
    '🌿',
    '☘️',
    '🍀',
    '🎍',
    '🎋',
    '🍃',
    '🍂',
    '🍁',
    '🍄',
    '🐚',
    '🌾',
    '💐',
    '🌷',
    '🌹',
    '🥀',
    '🌺',
    '🌸',
    '🌼',
    '🌻',
    '🌞',
    '🌝',
    '🌛',
    '🌜',
    '🌚',
    '🌕',
    '🌖',
    '🌗',
    '🌘',
    '🌑',
    '🌒',
    '🌓',
    '🌔',
    '🌙',
    '🌎',
    '🌍',
    '🌏',
    '💫',
    '⭐️',
    '🌟',
    '✨',
    '⚡️',
    '☄️',
    '💥',
    '🔥',
    '🌪️',
    '🌈',
    '☀️',
    '🌤️',
    '⛅️',
    '🌥️',
    '☁️',
    '🌦️',
    '🌧️',
    '⛈️',
    '🌩️',
    '🌨️',
    '❄️',
    '☃️',
    '⛄️',
    '🌬️',
    '💨',
    '💧',
    '💦',
    '☔️',
    '☂️',
    '🌊',
    '🌫️',
  ],
  'Food & Drink': [
    '🍏',
    '🍎',
    '🍐',
    '🍊',
    '🍋',
    '🍌',
    '🍉',
    '🍇',
    '🍓',
    '🍈',
    '🍒',
    '🍑',
    '🥭',
    '🍍',
    '🥥',
    '🥝',
    '🍅',
    '🍆',
    '🥑',
    '🥦',
    '🥬',
    '🥒',
    '🌶️',
    '🌽',
    '🥕',
    '🧄',
    '🧅',
    '🥔',
    '🍠',
    '🥐',
    '🥯',
    '🍞',
    '🥖',
    '🥨',
    '🧀',
    '🥚',
    '🍳',
    '🧈',
    '🥞',
    '🧇',
    '🥓',
    '🥩',
    '🍗',
    '🍖',
    '🦴',
    '핫도그',
    '🍔',
    '🍟',
    '🍕',
    '🥪',
    '🥙',
    '🧆',
    '🌮',
    'Burrito',
    '🥗',
    '🥘',
    '🥫',
    '🍝',
    '🍜',
    '🍲',
    '🍛',
    '🍣',
    '🍱',
    '🥟',
    '🍤',
    '🍙',
    '🍚',
    '🍘',
    '🍥',
    '🥠',
    '🥮',
    '🍢',
    '🍡',
    '🍧',
    '🍨',
    '🍦',
    '🥧',
    '🧁',
    '🍰',
    '🎂',
    '🍮',
    '🍭',
    '🍬',
    '🍫',
    '🍿',
    '🍩',
    '🍪',
    '🌰',
    '🥜',
    '🍯',
    '🥛',
    '🍼',
    '☕️',
    '🍵',
    '🧃',
    '🥤',
    '🍶',
    '🍺',
    '🍻',
    '🥂',
    '🍷',
    '🥃',
    '🍸',
    '🍹',
    '🧉',
    '🍾',
    '🧊',
    '🥄',
    '🍴',
    '🍽️',
    '🥣',
    '🥡',
    '🥢',
    '🧂',
  ],
  Activities: [
    '⚽️',
    '🏀',
    '🏈',
    '⚾️',
    '🥎',
    '🎾',
    '🏐',
    '🏉',
    '🥏',
    '🎱',
    '🏓',
    '🏸',
    '🏒',
    '🏑',
    '',
    '🏏',
    '🥅',
    '⛳️',
    '🪁',
    '🏹',
    '🎣',
    '🤿',
    '🥊',
    '🥋',
    '🎽',
    '🛹',
    '🛷',
    '⛸️',
    '🥌',
    '🎿',
    '⛷️',
    '🏂',
    '🪂',
    '🏋️‍♀️',
    '🏋️‍♂️',
    '🤸‍♀️',
    '🤸‍♂️',
    '🤺',
    '🏌️‍♀️',
    '🏌️‍♂️',
    '🏇',
    '🧘‍♀️',
    '🧘‍♂️',
    '🏄‍♀️',
    '🏄‍♂️',
    '🏊‍♀️',
    '🏊‍♂️',
    '🤽‍♀️',
    '🤽‍♂️',
    '🚣‍♀️',
    '🚣‍♂️',
    '🧗‍♀️',
    '🧗‍♂️',
    '🚵‍♀️',
    '🚵‍♂️',
    '🚴‍♀️',
    '🚴‍♂️',
    '🏆',
    '🥇',
    '🥈',
    '🥉',
    '🏅',
    '🎖️',
    '🏵️',
    '🎗️',
    '🎫',
    '🎟️',
    '🎪',
    '🤹‍♀️',
    '‍♂️',
    '🎭',
    '🩰',
    '🎨',
    '🎬',
    '🎤',
    '🎧',
    '🎼',
    '🎹',
    '🥁',
    '🎷',
    '🎺',
    '🎸',
    '🎻',
    '🎲',
    '♟️',
    '🎯',
    '🎳',
    '🎮',
    '🎰',
    '🧩',
  ],
  'Travel & Places': [
    '🚗',
    '🚕',
    '🚙',
    '🚌',
    '🏎️',
    '🚓',
    '🚑',
    '🚒',
    '🚐',
    '🚚',
    '🚛',
    '🚜',
    '🛴',
    '🚲',
    '🛵',
    '🏍️',
    '🛺',
    '🚨',
    '🚔',
    '🚍',
    '🚘',
    '',
    '',
    '🚠',
    '🚟',
    '🚃',
    '🚋',
    '🚞',
    '🚄',
    '🚅',
    '🚈',
    '🚂',
    '🚆',
    '🚇',
    '🚊',
    '🚉',
    '✈️',
    '🛫',
    '🛬',
    '💺',
    '🚀',
    '🛸',
    '🚁',
    '🛶',
    '⛵️',
    '🚤',
    '🛥️',
    '🛳️',
    '⛴️',
    '🚢',
    '⚓️',
    '⛽️',
    '🚧',
    '🚦',
    '🚥',
    '🗺️',
    '🗿',
    '🗽',
    '🗼',
    '🏰',
    '🏯',
    '🏟️',
    '🎡',
    '🎢',
    '🎠',
    '⛲️',
    '⛱️',
    '🏖️',
    '🏝️',
    '🏜️',
    '🌋',
    '⛰️',
    '🏔️',
    '🗻',
    '🏕️',
    '⛺️',
    '🏠',
    '🏡',
    '🏘️',
    '🏚️',
    '🏗️',
    '🏭',
    '🏢',
    '🏬',
    '🏤',
    '🏥',
    '🏦',
    '🏨',
    '🏪',
    '🏫',
    '🏩',
    '💒',
    '🏛️',
    '⛪️',
    '🕌',
    '🕍',
    '🛕',
    '🕋',
    '⛩️',
    '🛤️',
    '🛣️',
    '🗾',
    '🎑',
    '🏞️',
    '🌅',
    '🌄',
    '🌠',
    '🎇',
    '🎆',
    '🌉',
    '🌁',
    '🏙️',
    '🌃',
    '🌌',
  ],
  Objects: [
    '⌚️',
    '📱',
    '📲',
    '💻',
    '⌨️',
    '🖥️',
    '🖨️',
    '🖱️',
    '🖲️',
    'Joystick',
    '💽',
    '💾',
    '💿',
    '📀',
    'VHS',
    '📷',
    '📸',
    '📹',
    '🎥',
    'Film',
    '📞',
    '☎️',
    '📟',
    'Fax',
    '📺',
    '📻',
    '🎙️',
    '️',
    'Mixer',
    '🧭',
    '⏱️',
    'Timer',
    '⏰',
    'Clock',
    '⌛️',
    'Hourglass',
    '📡',
    '🔋',
    '🔌',
    '💡',
    '🔦',
    'Candle',
    '🪔',
    'Extinguisher',
    '🗑️',
    'Drum',
    '💸',
    '💵',
    '💴',
    '💶',
    '💷',
    '💰',
    '💳',
    'Receipt',
    '💎',
    '⚖️',
    '🦯',
    'Wrench',
    'Hammer',
    'Tools',
    'Pick',
    'Screw',
    'Gear',
    '🧱',
    '⛓️',
    '🧲',
    'Gun',
    '💣',
    '🧨',
    'Knife',
    'Sword',
    'Battle',
    'Shield',
    '🚬',
    'Coffin',
    'Urn',
    'Vase',
    '🔮',
    'Bead',
    'Amulet',
    'Barber',
    'Alembic',
    'Telescope',
    'Microscope',
    'Well',
    'Pill',
    'Injection',
    'Blood',
    'DNA',
    'Germ',
    'Plate',
    'Thermometer',
    'Broom',
    'Basket',
    'Tissue',
    'Toilet',
    'Faucet',
    'Shower',
    'Bath',
    'Soap',
    'Razor',
    'Sponge',
    'Lotion',
    'Bell',
    'Key',
    'Lock',
    'Door',
    'Chair',
    'Couch',
    'Bed',
    'Sleeping',
    'Teddy',
    'Picture',
    'Bag',
    'Cart',
    'Gift',
    'Balloon',
    'Cometa',
    'Ribbon',
    'Confetti',
    'Party',
    'Doll',
    'Lantern',
    'Wind',
    'Aviso',
    'Envelope',
    'Enviando',
    'Chegou',
    'Email',
    'Love',
    'Postbox',
    'Puxar',
    'Enfiando',
    'Mandou',
    'Pacote',
    'Listas',
    'A4',
    'Rolo',
    'Folhas',
    'Grafico',
    'Aumento',
    'Caindo',
    'Caderno',
    'Contatos',
    'Calendário',
    'Cartão',
    'Arquivo',
    'Votos',
    'Gaveta',
    'Organizado',
    'Pasta',
    'Pressionado',
    'Livro',
    'Ler',
    'Marca',
    'Alfinete',
    'Clipe',
    'Tesoura',
    'Caneta',
    'Pincel',
    'Escrever',
    'Lupa',
    'Seguro',
    'Trancado',
    'Desbloqueado',
  ],
  Symbols: [
    '❤️',
    '🧡',
    '💛',
    '💚',
    '💙',
    '💜',
    '🖤',
    '🤍',
    '🤎',
    '💔',
    '❣️',
    '💕',
    '💞',
    '💓',
    '💗',
    '💖',
    '💘',
    '💝',
    '💟',
    '☮️',
    '✝️',
    '☪️',
    '🕉️',
    '☸️',
    '✡️',
    '🔯',
    '🕎',
    '☯️',
    '☦️',
    '🛐',
    '⛎',
    '♈️',
    '♉️',
    '♊️',
    '♋️',
    '♌️',
    '♍️',
    '♎️',
    '♏️',
    '♐️',
    '♑️',
    '♒️',
    '♓️',
    '🆔',
    '⚛️',
    '🉑',
    '☢️',
    '☣️',
    '📴',
    '📳',
    '🈶',
    '🈚️',
    '🈸',
    '🈺',
    '🈷️',
    '✴️',
    '🆚',
    '💮',
    '🉐',
    '㊙️',
    '㊗️',
    '🈴',
    '🈵',
    '🈹',
    '🈲',
    '🅰️',
    '🅱️',
    '🆎',
    '🆑',
    '🅾️',
    '🆘',
    '❌',
    '⭕️',
    '🛑',
    '⛔️',
    '📛',
    '🚫',
    '💯',
    '💢',
    '♨️',
    '🚷',
    '🚯',
    '🚳',
    '🚱',
    '🔞',
    '📵',
    '🚭',
    '❗️',
    '❕',
    '❓',
    '❔',
    '‼️',
    '⁉️',
    '🔅',
    '🔆',
    '〽️',
    '⚠️',
    '🚸',
    '🔱',
    '⚜️',
    '🔰',
    '♻️',
    '✅',
    '🈯️',
    '💹',
    '❇️',
    '✳️',
    '❎',
    '🌐',
    '💠',
    'Ⓜ️',
    '🌀',
    '💤',
    'ATM',
    'ge',
    '♿️',
    '🅿️',
    '🈳',
    '🈂️',
    '🛂',
    '🛃',
    '🛄',
    '🛅',
    '🚹',
    '🚺',
    '🚼',
    '🚻',
    '🚮',
    '🎦',
    '📶',
    '🈁',
    '🔣',
    'ℹ️',
    '🔤',
    '🔡',
    '🔠',
    '🆖',
    '🆗',
    '🆙',
    '🆒',
    '🆕',
    '🆓',
    '0️⃣',
    '1️⃣',
    '2️⃣',
    '3️⃣',
    '4️⃣',
    '5️⃣',
    '6️⃣',
    '7️⃣',
    '8️⃣',
    '9️⃣',
    '🔟',
    '🔢',
    '#️⃣',
    '*️⃣',
    '⏏️',
    '▶️',
    '⏸️',
    '⏯️',
    '⏹️',
    '⏺️',
    '⏭️',
    '⏮️',
    '⏩',
    '⏪',
    '⏫',
    '⏬',
    '◀️',
    '🔼',
    '🔽',
    '➡️',
    '⬅️',
    '⬆️',
    '⬇️',
    '↗️',
    '↘️',
    '↙️',
    '↖️',
    '↕️',
    '↔️',
    '↪️',
    '↩️',
    '⤴️',
    '⤵️',
    '🔀',
    '🔁',
    '🔂',
    '🔄',
    '🔃',
    '🎵',
    '🎶',
    '➕',
    '➖',
    '➗',
    '✖️',
    '♾️',
    '💲',
    '💱',
    '™️',
    '©️',
    '®️',
    '👁️‍🗨️',
    '🔚',
    '🔙',
    '🔛',
    '🔝',
    '🔜',
    '✔️',
    '☑️',
    '🔘',
    '🔴',
    '🟠',
    '🟡',
    '🟢',
    '🔵',
    '🟣',
    '⚫️',
    '⚪️',
    '🟤',
    '🔺',
    '🔻',
    '🔼',
    '🔽',
    '▪️',
    '▫️',
    '◾️',
    '◽️',
    '◼️',
    '◻️',
    '🟥',
    '🟧',
    '🟨',
    '🟩',
    '🟦',
    '🟪',
    '⬛️',
    '⬜️',
    '🟫',
    '🔶',
    '🔷',
    '🔸',
    '🔹',
    '🔳',
    '💭',
    '🗯️',
    '💬',
    '🗨️',
    '🀄️',
    '🃏',
    '♠️',
    '♣️',
    '♥️',
    '♦️',
    '🕐',
    '🕑',
    '🕒',
    '🕓',
    '🕔',
    '🕕',
    '🕖',
    '🕗',
    '🕘',
    '🕙',
    '🕚',
    '🕛',
    '🕜',
    '🕝',
    '🕟',
    '🕠',
    '🕡',
    '🕢',
    '🕣',
    '🕤',
    '🕥',
    '🕦',
    '🕧',
  ],
};

const colorPalette = [
  '#000000',
  '#ff0000',
  '#ff7f00',
  '#ffff00',
  '#00ff00',
  '#0000ff',
  '#4b0082',
  '#9400d3',
  '#ffffff',
  '#ffb6c1',
  '#fffacd',
  '#f0f8ff',
  '#f5f5f5',
  '#d3d3d3',
  '#a9a9a9',
  '#fa8072',
  '#ffdead',
  '#f0e68c',
  '#90ee90',
  '#dda0dd',
  '#c0c0c0',
  '#800000',
  '#a52a2a',
  '#b8860b',
  '#006400',
  '#00008b',
  '#483d8b',
  '#808080',
  '#696969',
  '#400000',
  '#8b0000',
  '#808000',
  '#008000',
  '#000080',
  '#2f4f4f',
];

const RichTextToolbar = ({ onFormat }: { onFormat: (command: string, value?: string) => void }) => {
  const ToolbarButton = ({
    icon,
    command,
    value,
  }: {
    icon: ReactNode;
    command: string;
    value?: string;
  }) => (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-black/60 hover:bg-black/10 hover:text-black/80"
      onMouseDown={(e) => {
        e.preventDefault();
        onFormat(command, value);
      }}
    >
      {icon}
    </Button>
  );

  const ColorPickerButton = ({
    icon,
    command,
  }: {
    icon: ReactNode;
    command: 'foreColor' | 'hiliteColor';
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-black/60 hover:bg-black/10 hover:text-black/80"
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
                onFormat(command, color);
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );

  return (
    <div className="flex flex-wrap items-center gap-1 rounded-t-md border border-gray-200 bg-gray-50 p-1">
      <Select defaultValue="p" onValueChange={(value) => onFormat('formatBlock', value)}>
        <SelectTrigger className="h-7 w-[100px] border-none bg-transparent text-xs text-black/80 focus:ring-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="p">Normal</SelectItem>
          <SelectItem value="h1">Título 1</SelectItem>
          <SelectItem value="h2">Título 2</SelectItem>
          <SelectItem value="h3">Título 3</SelectItem>
        </SelectContent>
      </Select>
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ToolbarButton icon={<Bold />} command="bold" />
      <ToolbarButton icon={<Italic />} command="italic" />
      <ToolbarButton icon={<Underline />} command="underline" />
      <ToolbarButton icon={<Strikethrough />} command="strikeThrough" />
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ColorPickerButton icon={<Baseline />} command="foreColor" />
      <ColorPickerButton icon={<Highlighter />} command="hiliteColor" />
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ToolbarButton icon={<AlignLeft />} command="justifyLeft" />
      <ToolbarButton icon={<AlignCenter />} command="justifyCenter" />
      <ToolbarButton icon={<AlignRight />} command="justifyRight" />
      <ToolbarButton icon={<AlignJustify />} command="justifyFull" />
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ToolbarButton icon={<LinkIcon />} command="createLink" />
      <ToolbarButton icon={<ListIcon />} command="insertUnorderedList" />
      <ToolbarButton icon={<ListOrdered />} command="insertOrderedList" />
      <Separator orientation="vertical" className="h-5 bg-black/20" />
      <ToolbarButton icon={<RemoveFormatting />} command="removeFormat" />
    </div>
  );
};

const ArgumentosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const items = component.props.items || [];

  const handleUpdateItem = (itemId: number, newValues: Partial<ArgumentItem>) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item
    );
    onUpdate({ ...component.props, items: newItems });
  };

  const handleAddItem = () => {
    const newItem: ArgumentItem = {
      id: Date.now(),
      icon: '👋',
      title: 'Novo Argumento',
      description: 'Descreva seu argumento aqui.',
    };
    onUpdate({ ...component.props, items: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, items: newItems });
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  const RichTextToolbarButton = ({
    icon,
    isActive,
    command,
    value,
  }: {
    icon: ReactNode;
    isActive?: boolean;
    command: string;
    value?: string;
  }) => (
    <Button
      variant="ghost"
      size="icon"
      className={cn(
        'h-7 w-7',
        isActive ? 'bg-blue-500/10 text-blue-500' : 'text-white/60 hover:bg-white/10 hover:text-white/80'
      )}
      onMouseDown={(e) => {
        e.preventDefault(); // Prevent editor losing focus
        handleFormat(command, value);
      }}
    >
      {icon}
    </Button>
  );

  const ColorPickerButton = ({
    icon,
    command,
  }: {
    icon: ReactNode;
    command: 'foreColor' | 'hiliteColor';
  }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-white/60 hover:bg-white/10 hover:text-white/80"
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
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Layout</h3>
        <div>
          <UILabel htmlFor="layout" className="text-xs">
            Layout
          </UILabel>
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

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Argumentos</h3>
        <ScrollArea className="h-[40rem]">
          <div className="space-y-4 pr-4">
            {items.map((item, itemIndex) => (
              <Card key={item.id} className="relative overflow-hidden bg-card p-3 space-y-3">
                <div className="flex items-center justify-between">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="relative h-10 w-12 p-0 text-center text-xl">
                        {item.icon}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="h-96 w-80">
                      <ScrollArea className="h-full w-full">
                        {Object.entries(emojiCategories).map(([category, emojis]) => (
                          <div key={category}>
                            <h4 className="sticky top-0 mb-2 bg-popover py-1 text-sm font-bold text-muted-foreground">
                              {category}
                            </h4>
                            <div className="mb-4 grid grid-cols-8 gap-1">
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
                    className="h-8 w-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="rounded-md bg-[#1E1E1E]">
                  <div className="flex flex-wrap items-center gap-1 rounded-t-md border-b border-[#3A3A3A] bg-[#2C2C2C] p-2">
                    <Select
                      defaultValue="normal"
                      onValueChange={(value) => handleFormat('formatBlock', value)}
                    >
                      <SelectTrigger className="h-7 w-[100px] border-none bg-transparent text-xs text-white/80 focus:ring-0">
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
                      onBlur={(e) =>
                        handleUpdateItem(item.id, { title: e.currentTarget.innerHTML })
                      }
                    />
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      className="mt-2 text-sm text-[#D1D5DB] outline-none"
                      dangerouslySetInnerHTML={{ __html: item.description }}
                      onBlur={(e) =>
                        handleUpdateItem(item.id, { description: e.currentTarget.innerHTML })
                      }
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Argumento
        </Button>
      </Card>
    </div>
  );
};

const BotaoSettings = ({
  component,
  onUpdate,
  steps,
  activeStepId,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
  steps: Step[];
  activeStepId: number;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="text" className="text-xs">
              Texto do Botão
            </UILabel>
            <Input
              id="text"
              value={component.props.text || ''}
              onChange={(e) => onUpdate({ ...component.props, text: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="action" className="text-xs">
              Ação
            </UILabel>
            <Select
              value={component.props.action || 'next_step'}
              onValueChange={(value: 'next_step' | 'open_url' | 'go_to_step') =>
                onUpdate({ ...component.props, action: value })
              }
            >
              <SelectTrigger id="action" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="next_step">Ir para próxima etapa</SelectItem>
                <SelectItem value="open_url">Abrir URL</SelectItem>
                <SelectItem value="go_to_step">Ir para etapa específica</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {component.props.action === 'open_url' && (
            <div>
              <UILabel htmlFor="url" className="text-xs">
                URL
              </UILabel>
              <Input
                id="url"
                value={component.props.url || ''}
                onChange={(e) => onUpdate({ ...component.props, url: e.target.value })}
                className="mt-1"
                placeholder="https://..."
              />
            </div>
          )}
          {component.props.action === 'go_to_step' && (
            <div>
              <UILabel htmlFor="stepId" className="text-xs">
                Etapa de Destino
              </UILabel>
              <Select
                value={component.props.stepId?.toString()}
                onValueChange={(value) =>
                  onUpdate({ ...component.props, stepId: parseInt(value) })
                }
              >
                <SelectTrigger id="stepId" className="mt-1">
                  <SelectValue placeholder="Selecione uma etapa" />
                </SelectTrigger>
                <SelectContent>
                  {steps
                    .filter((step) => step.id !== activeStepId)
                    .map((step) => (
                      <SelectItem key={step.id} value={step.id.toString()}>
                        {step.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
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
            <UILabel htmlFor="variant" className="text-xs">
              Modelo
            </UILabel>
            <Select
              value={component.props.variant || 'default'}
              onValueChange={(
                value: 'default' | 'destructive' | 'outline' | 'ghost' | 'link' | 'secondary'
              ) => onUpdate({ ...component.props, variant: value })}
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

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="bg-color" className="text-xs">
              Cor do Fundo
            </UILabel>
            <Input
              type="color"
              id="bg-color"
              className="h-8 w-full p-1"
              value={component.props.backgroundColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="text-color" className="text-xs">
              Cor do Texto
            </UILabel>
            <Input
              type="color"
              id="text-color"
              className="h-8 w-full p-1"
              value={component.props.textColor || '#ffffff'}
              onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const CarregandoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Progresso</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="duration" className="text-xs">
              Duração
            </UILabel>
            <Input
              id="duration"
              type="number"
              value={component.props.duration || 5}
              onChange={(e) => onUpdate({ ...component.props, duration: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="limit" className="text-xs">
              Limite
            </UILabel>
            <Input
              id="limit"
              type="number"
              value={component.props.limit || 100}
              onChange={(e) => onUpdate({ ...component.props, limit: Number(e.target.value) })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="action" className="text-xs">
              Ação
            </UILabel>
            <Select
              value={component.props.action || 'next_step'}
              onValueChange={(value: 'next_step' | 'open_url') =>
                onUpdate({ ...component.props, action: value })
              }
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

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="loadingText" className="text-xs">
              Título
            </UILabel>
            <Input
              id="loadingText"
              value={component.props.loadingText || ''}
              onChange={(e) => onUpdate({ ...component.props, loadingText: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="loadingDescription" className="text-xs">
              Descrição
            </UILabel>
            <Input
              id="loadingDescription"
              value={component.props.loadingDescription || ''}
              onChange={(e) =>
                onUpdate({ ...component.props, loadingDescription: e.target.value })
              }
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

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="titleColor" className="text-xs">
              Cor do Título
            </UILabel>
            <Input
              type="color"
              id="titleColor"
              className="h-8 w-full p-1"
              value={component.props.titleColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, titleColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="descriptionColor" className="text-xs">
              Cor da Descrição
            </UILabel>
            <Input
              type="color"
              id="descriptionColor"
              className="h-8 w-full p-1"
              value={component.props.descriptionColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, descriptionColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="progress-color" className="text-xs">
              Cor do Progresso
            </UILabel>
            <Input
              type="color"
              id="progress-color"
              className="h-8 w-full p-1"
              value={component.props.progressColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, progressColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="progressTrackColor" className="text-xs">
              Fundo da Barra
            </UILabel>
            <Input
              type="color"
              id="progressTrackColor"
              className="h-8 w-full p-1"
              value={component.props.progressTrackColor || '#E5E7EB'}
              onChange={(e) => onUpdate({ ...component.props, progressTrackColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const CarroselSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const slides = component.props.slides || [];

  const handleUpdateSlide = (slideId: number, newValues: Partial<CarouselItemData>) => {
    const newSlides = slides.map((slide) =>
      slide.id === slideId ? { ...slide, ...newValues } : slide
    );
    onUpdate({ ...component.props, slides: newSlides });
  };

  const handleAddSlide = () => {
    const newSlide: CarouselItemData = {
      id: Date.now(),
      imageUrl: `https://picsum.photos/seed/${Date.now()}/400/300`,
      caption: 'Nova Legenda',
    };
    onUpdate({ ...component.props, slides: [...slides, newSlide] });
  };

  const handleDeleteSlide = (slideId: number) => {
    const newSlides = slides.filter((slide) => slide.id !== slideId);
    onUpdate({ ...component.props, slides: newSlides });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Slides</h3>
        <ScrollArea className="h-[40rem]">
          <div className="space-y-4 pr-4">
            {slides.map((slide) => (
              <Card key={slide.id} className="relative bg-card p-3 space-y-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteSlide(slide.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <div>
                    <UILabel htmlFor={`imageUrl-${slide.id}`} className="text-xs">
                      URL da Imagem
                    </UILabel>
                    <Input
                      id={`imageUrl-${slide.id}`}
                      value={slide.imageUrl}
                      onChange={(e) => handleUpdateSlide(slide.id, { imageUrl: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <UILabel htmlFor={`caption-${slide.id}`} className="text-xs">
                      Legenda
                    </UILabel>
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
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddSlide}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Slide
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Interação</h3>
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
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, autoplayCarousel: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showPagination">Paginação</UILabel>
            <Switch
              id="showPagination"
              checked={component.props.showPagination}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, showPagination: checked })
              }
            />
          </div>
          <div>
            <UILabel htmlFor="autoplayDelay" className="text-xs">
              Delay do Autoplay
            </UILabel>
            <Input
              id="autoplayDelay"
              type="number"
              value={component.props.autoplayDelay || 2}
              onChange={(e) =>
                onUpdate({ ...component.props, autoplayDelay: Number(e.target.value) })
              }
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="arrowColor" className="text-xs">
              Cor
            </UILabel>
            <Input
              type="color"
              id="arrowColor"
              className="h-8 w-full p-1"
              value={component.props.arrowColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, arrowColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="arrowTextColor" className="text-xs">
              Texto
            </UILabel>
            <Input
              type="color"
              id="arrowTextColor"
              className="h-8 w-full p-1"
              value={component.props.arrowTextColor || '#ffffff'}
              onChange={(e) => onUpdate({ ...component.props, arrowTextColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="arrowBorderColor" className="text-xs">
              Borda
            </UILabel>
            <Input
              type="color"
              id="arrowBorderColor"
              className="h-8 w-full p-1"
              value={component.props.arrowBorderColor || '#DDDDDD'}
              onChange={(e) => onUpdate({ ...component.props, arrowBorderColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const CartesianoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const data = component.props.chartData || [];

  const handleUpdateDataPoint = (
    id: number,
    key: 'name' | 'value' | 'indicatorLabel',
    value: string | number
  ) => {
    const newData = data.map((item) => (item.id === id ? { ...item, [key]: value } : item));
    onUpdate({ ...component.props, chartData: newData });
  };

  const handleAddDataPoint = () => {
    const newPoint = {
      id: Date.now(),
      name: `Ponto ${data.length + 1}`,
      value: Math.floor(Math.random() * 100),
      indicatorLabel: '',
    };
    onUpdate({ ...component.props, chartData: [...data, newPoint] });
  };

  const handleDeleteDataPoint = (id: number) => {
    const newData = data.filter((item) => item.id !== id);
    onUpdate({ ...component.props, chartData: newData });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div>
          <UILabel htmlFor="chartTitle" className="text-xs">
            Título
          </UILabel>
          <Input
            id="chartTitle"
            value={component.props.chartTitle || 'Cartesiano'}
            onChange={(e) => onUpdate({ ...component.props, chartTitle: e.target.value })}
            className="mt-1"
          />
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Pontos de Dados</h3>
        <ScrollArea className="h-[25rem]">
          <div className="space-y-3 pr-4">
            {data.map((point) => (
              <Card key={point.id} className="relative bg-card p-3 space-y-3">
                <div className="absolute top-2 left-2 flex items-center justify-center text-muted-foreground">
                  <Grip className="h-4 w-4 cursor-grab" />
                </div>
                <div className="absolute top-2 right-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 shrink-0 text-muted-foreground hover:text-destructive"
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
                  <Star className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    value={point.indicatorLabel}
                    onChange={(e) =>
                      handleUpdateDataPoint(point.id, 'indicatorLabel', e.target.value)
                    }
                    className="h-9 pl-8"
                    placeholder="Texto do indicador..."
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddDataPoint}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="chartColor" className="text-xs">
              Cor
            </UILabel>
            <Select
              value={`${component.props.gradientStartColor || ''}-${
                component.props.gradientEndColor || ''
              }`}
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
  );
};

const CompararSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="beforeImageUrl" className="text-xs">
              URL da Imagem Antes
            </UILabel>
            <Input
              id="beforeImageUrl"
              value={component.props.beforeImageUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, beforeImageUrl: e.target.value })}
              className="mt-1"
              placeholder="https://..."
            />
          </div>
          <div>
            <UILabel htmlFor="afterImageUrl" className="text-xs">
              URL da Imagem Depois
            </UILabel>
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
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="sliderPosition" className="text-xs">
              Posição Inicial do Slider (%)
            </UILabel>
            <Slider
              id="sliderPosition"
              min={0}
              max={100}
              step={1}
              value={[component.props.sliderPosition || 50]}
              onValueChange={(value) =>
                onUpdate({ ...component.props, sliderPosition: value[0] })
              }
              className="mt-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <UILabel htmlFor="sliderColor" className="text-xs">
                Cor da Barra
              </UILabel>
              <Input
                type="color"
                id="sliderColor"
                className="h-8 w-full p-1"
                value={component.props.sliderColor || '#FFFFFF'}
                onChange={(e) => onUpdate({ ...component.props, sliderColor: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <UILabel htmlFor="sliderIconColor" className="text-xs">
                Cor do Ícone
              </UILabel>
              <Input
                type="color"
                id="sliderIconColor"
                className="h-8 w-full p-1"
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

const ConfettiSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configuração do Efeito</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="particleCount" className="text-xs">
              Quantidade de Partículas
            </UILabel>
            <Slider
              id="particleCount"
              min={10}
              max={500}
              step={10}
              value={[component.props.particleCount || 200]}
              onValueChange={(value) => onUpdate({ ...component.props, particleCount: value[0] })}
              className="mt-2"
            />
          </div>
          <div>
            <UILabel htmlFor="spread" className="text-xs">
              Espalhamento (Spread)
            </UILabel>
            <Slider
              id="spread"
              min={10}
              max={360}
              step={1}
              value={[component.props.spread || 70]}
              onValueChange={(value) => onUpdate({ ...component.props, spread: value[0] })}
              className="mt-2"
            />
          </div>
          <div>
            <UILabel className="text-xs">Origem da Explosão</UILabel>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <UILabel htmlFor="originX" className="text-xs">
                  Eixo X (%)
                </UILabel>
                <Slider
                  id="originX"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[component.props.originX || 0.5]}
                  onValueChange={(value) => onUpdate({ ...component.props, originX: value[0] })}
                  className="mt-1"
                />
              </div>
              <div>
                <UILabel htmlFor="originY" className="text-xs">
                  Eixo Y (%)
                </UILabel>
                <Slider
                  id="originY"
                  min={0}
                  max={1}
                  step={0.1}
                  value={[component.props.originY || 0.6]}
                  onValueChange={(value) => onUpdate({ ...component.props, originY: value[0] })}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
          <Button
            className="w-full"
            variant="outline"
            onClick={() => {
              confetti({
                particleCount: component.props.particleCount,
                spread: component.props.spread,
                origin: { x: component.props.originX, y: component.props.originY },
              });
            }}
          >
            Testar Efeito
          </Button>
        </div>
      </Card>
    </div>
  );
};

const DepoimentosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const testimonials = component.props.testimonials || [];

  const handleUpdateItem = (itemId: number, newValues: Partial<TestimonialItem>) => {
    const newItems = testimonials.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item
    );
    onUpdate({ ...component.props, testimonials: newItems });
  };

  const handleAddItem = () => {
    const newItem: TestimonialItem = {
      id: Date.now(),
      imageUrl: `https://picsum.photos/seed/${Date.now()}/100/100`,
      name: 'Gustavo',
      handle: '@gustavo',
      rating: 5,
      testimonial: 'Este é um depoimento incrível que me ajudou muito.',
    };
    onUpdate({ ...component.props, testimonials: [...testimonials, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = testimonials.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, testimonials: newItems });
  };

  const handleColorReset = (
    colorType: 'cardBackgroundColor' | 'cardTextColor' | 'cardBorderColor'
  ) => {
    onUpdate({ ...component.props, [colorType]: undefined });
  };

  return (
    <div className="space-y-6">
      <Card className="flex h-full flex-col border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Depoimentos</h3>
        <ScrollArea className="flex-grow pr-4">
          <div className="space-y-4">
            {testimonials.map((item) => (
              <Card key={item.id} className="relative bg-card p-4 space-y-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-3">
                  <Avatar className="h-14 w-14 border">
                    <AvatarImage src={item.imageUrl} alt={item.name} />
                    <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="w-full">
                    <UILabel htmlFor={`imageUrl-${item.id}`} className="text-xs">
                      URL da Imagem
                    </UILabel>
                    <Input
                      id={`imageUrl-${item.id}`}
                      value={item.imageUrl}
                      onChange={(e) => handleUpdateItem(item.id, { imageUrl: e.target.value })}
                      className="mt-1 h-9"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <UILabel htmlFor={`name-${item.id}`} className="text-xs">
                      Nome
                    </UILabel>
                    <Input
                      id={`name-${item.id}`}
                      value={item.name}
                      onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                      className="mt-1 h-9"
                    />
                  </div>
                  <div>
                    <UILabel htmlFor={`handle-${item.id}`} className="text-xs">
                      Handle (@)
                    </UILabel>
                    <Input
                      id={`handle-${item.id}`}
                      value={item.handle}
                      onChange={(e) => handleUpdateItem(item.id, { handle: e.target.value })}
                      className="mt-1 h-9"
                    />
                  </div>
                </div>

                <div>
                  <UILabel htmlFor={`rating-${item.id}`} className="text-xs">
                    Avaliação ({item.rating})
                  </UILabel>
                  <Slider
                    id={`rating-${item.id}`}
                    min={1}
                    max={5}
                    step={1}
                    value={[item.rating]}
                    onValueChange={(value) => handleUpdateItem(item.id, { rating: value[0] })}
                    className="mt-3"
                  />
                </div>

                <div>
                  <UILabel htmlFor={`testimonial-${item.id}`} className="text-xs">
                    Texto do Depoimento
                  </UILabel>
                  <Textarea
                    id={`testimonial-${item.id}`}
                    value={item.testimonial}
                    onChange={(e) => handleUpdateItem(item.id, { testimonial: e.target.value })}
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full flex-shrink-0" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Depoimento
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="card-bg-color" className="text-xs">
              Cor
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="card-bg-color"
                className="h-8 w-full p-1"
                value={component.props.cardBackgroundColor || ''}
                onChange={(e) =>
                  onUpdate({ ...component.props, cardBackgroundColor: e.target.value })
                }
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('cardBackgroundColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="card-text-color" className="text-xs">
              Texto
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="card-text-color"
                className="h-8 w-full p-1"
                value={component.props.cardTextColor || ''}
                onChange={(e) => onUpdate({ ...component.props, cardTextColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('cardTextColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="card-border-color" className="text-xs">
              Borda
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="card-border-color"
                className="h-8 w-full p-1"
                value={component.props.cardBorderColor || ''}
                onChange={(e) => onUpdate({ ...component.props, cardBorderColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('cardBorderColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const EntradaSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const handleColorReset = (
    colorType: 'backgroundColor' | 'textColor' | 'borderColor'
  ) => {
    onUpdate({ ...component.props, [colorType]: undefined });
  };
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configurações do Campo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="label" className="text-xs">
              Rótulo
            </UILabel>
            <Input
              id="label"
              value={component.props.label || ''}
              onChange={(e) => onUpdate({ ...component.props, label: e.target.value })}
              className="mt-1"
              placeholder="Ex: Seu nome"
            />
          </div>
          <div>
            <UILabel htmlFor="placeholder" className="text-xs">
              Placeholder
            </UILabel>
            <Input
              id="placeholder"
              value={component.props.placeholder || ''}
              onChange={(e) => onUpdate({ ...component.props, placeholder: e.target.value })}
              className="mt-1"
              placeholder="Ex: Digite seu nome completo"
            />
          </div>
          <div>
            <UILabel htmlFor="inputType" className="text-xs">
              Tipo de Campo
            </UILabel>
            <Select
              value={component.props.inputType || 'text'}
              onValueChange={(value: 'text' | 'email' | 'password' | 'number' | 'tel') =>
                onUpdate({ ...component.props, inputType: value })
              }
            >
              <SelectTrigger id="inputType" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Texto</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="password">Senha</SelectItem>
                <SelectItem value="number">Número</SelectItem>
                <SelectItem value="tel">Telefone</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between pt-2">
            <UILabel htmlFor="required">Obrigatório</UILabel>
            <Switch
              id="required"
              checked={component.props.required}
              onCheckedChange={(checked) => onUpdate({ ...component.props, required: checked })}
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="textAlign" className="text-xs">
              Alinhamento
            </UILabel>
            <Select
              value={component.props.textAlign || 'left'}
              onValueChange={(value: 'left' | 'center' | 'right') =>
                onUpdate({ ...component.props, textAlign: value })
              }
            >
              <SelectTrigger id="textAlign" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <UILabel htmlFor="fontSize" className="text-xs">
              Tamanho do Texto
            </UILabel>
            <Select
              value={component.props.fontSize || 'base'}
              onValueChange={(value: 'sm' | 'base' | 'lg') =>
                onUpdate({ ...component.props, fontSize: value })
              }
            >
              <SelectTrigger id="fontSize" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Pequeno</SelectItem>
                <SelectItem value="base">Normal</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <UILabel htmlFor="padding" className="text-xs">
              Espaçamento
            </UILabel>
            <Select
              value={component.props.padding || 'base'}
              onValueChange={(value: 'sm' | 'base' | 'lg') =>
                onUpdate({ ...component.props, padding: value })
              }
            >
              <SelectTrigger id="padding" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Pequeno</SelectItem>
                <SelectItem value="base">Normal</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="color" className="text-xs">
              Cor
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="color"
                className="h-8 w-full p-1"
                value={component.props.backgroundColor || ''}
                onChange={(e) => onUpdate({ ...component.props, backgroundColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('backgroundColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="text-color" className="text-xs">
              Texto
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="text-color"
                className="h-8 w-full p-1"
                value={component.props.textColor || ''}
                onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('textColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="border-color" className="text-xs">
              Borda
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="border-color"
                className="h-8 w-full p-1"
                value={component.props.borderColor || ''}
                onChange={(e) => onUpdate({ ...component.props, borderColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('borderColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const EspacadorSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Ajustes</h3>
        <div className="space-y-2">
          <UILabel htmlFor="height" className="text-xs">
            Altura ({component.props.height || 50}px)
          </UILabel>
          <Slider
            id="height"
            min={10}
            max={300}
            step={1}
            value={[component.props.height || 50]}
            onValueChange={(value) => onUpdate({ ...component.props, height: value[0] })}
            className="mt-2"
          />
        </div>
      </Card>
    </div>
  );
};

const FaqSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const faqItems = component.props.faqItems || [];

  const handleUpdateItem = (itemId: number, newValues: Partial<FaqItem>) => {
    const newItems = faqItems.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item
    );
    onUpdate({ ...component.props, faqItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: FaqItem = {
      id: Date.now(),
      question: 'Nova Pergunta?',
      answer: 'Esta é a resposta para a nova pergunta.',
    };
    onUpdate({ ...component.props, faqItems: [...faqItems, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = faqItems.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, faqItems: newItems });
  };

  const handleColorReset = (
    colorType: 'faqBackgroundColor' | 'faqTextColor' | 'faqBorderColor'
  ) => {
    onUpdate({ ...component.props, [colorType]: undefined });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Perguntas e Respostas</h3>
        <ScrollArea className="h-[40rem]">
          <div className="space-y-4 pr-4">
            {faqItems.map((item) => (
              <Card key={item.id} className="relative bg-card p-3 space-y-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <UILabel htmlFor={`question-${item.id}`} className="text-xs">
                    Pergunta
                  </UILabel>
                  <Input
                    id={`question-${item.id}`}
                    value={item.question}
                    onChange={(e) => handleUpdateItem(item.id, { question: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <UILabel htmlFor={`answer-${item.id}`} className="text-xs">
                    Resposta
                  </UILabel>
                  <Textarea
                    id={`answer-${item.id}`}
                    value={item.answer}
                    onChange={(e) => handleUpdateItem(item.id, { answer: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Pergunta
        </Button>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="faq-bg-color" className="text-xs">
              Cor
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="faq-bg-color"
                className="h-8 w-full p-1"
                value={component.props.faqBackgroundColor || ''}
                onChange={(e) => onUpdate({ ...component.props, faqBackgroundColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('faqBackgroundColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="faq-text-color" className="text-xs">
              Texto
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="faq-text-color"
                className="h-8 w-full p-1"
                value={component.props.faqTextColor || ''}
                onChange={(e) => onUpdate({ ...component.props, faqTextColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('faqTextColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="faq-border-color" className="text-xs">
              Borda
            </UILabel>
            <div className="relative">
              <Input
                type="color"
                id="faq-border-color"
                className="h-8 w-full p-1"
                value={component.props.faqBorderColor || ''}
                onChange={(e) => onUpdate({ ...component.props, faqBorderColor: e.target.value })}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-1/2 right-0 h-6 w-6 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => handleColorReset('faqBorderColor')}
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const GraficosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const items = component.props.graficosItems || [];

  const handleUpdateItem = (itemId: number, newValues: Partial<GraficosItem>) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item
    );
    onUpdate({ ...component.props, graficosItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: GraficosItem = {
      id: Date.now(),
      label: 'Novo Item',
      value: 50,
    };
    onUpdate({ ...component.props, graficosItems: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, graficosItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Layout</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="graficosLayout" className="text-xs">
              Layout
            </UILabel>
            <Select
              value={component.props.graficosLayout || '2-cols'}
              onValueChange={(value) => onUpdate({ ...component.props, graficosLayout: value })}
            >
              <SelectTrigger id="graficosLayout" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-col">1 Coluna</SelectItem>
                <SelectItem value="2-cols">2 Colunas</SelectItem>
                <SelectItem value="3-cols">3 Colunas</SelectItem>
                <SelectItem value="4-cols">4 Colunas</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <UILabel htmlFor="disposition" className="text-xs">
              Disposição
            </UILabel>
            <Select
              value={component.props.disposition || 'top'}
              onValueChange={(value) => onUpdate({ ...component.props, disposition: value })}
            >
              <SelectTrigger id="disposition" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="top">Gráfico Acima</SelectItem>
                <SelectItem value="side">Gráfico ao Lado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens do Gráfico</h3>
        <ScrollArea className="h-[30rem]">
          <div className="space-y-4 pr-4">
            {items.map((item) => (
              <Card key={item.id} className="relative bg-card p-3 space-y-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <UILabel htmlFor={`label-${item.id}`} className="text-xs">
                    Rótulo
                  </UILabel>
                  <Input
                    id={`label-${item.id}`}
                    value={item.label}
                    onChange={(e) => handleUpdateItem(item.id, { label: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <UILabel htmlFor={`value-${item.id}`} className="text-xs">
                    Valor ({item.value}%)
                  </UILabel>
                  <Slider
                    id={`value-${item.id}`}
                    min={0}
                    max={100}
                    step={1}
                    value={[item.value]}
                    onValueChange={(value) => handleUpdateItem(item.id, { value: value[0] })}
                    className="mt-2"
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="barColor" className="text-xs">
              Cor da Barra
            </UILabel>
            <Input
              type="color"
              id="barColor"
              className="h-8 w-full p-1"
              value={component.props.barColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, barColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="trackColor" className="text-xs">
              Fundo
            </UILabel>
            <Input
              type="color"
              id="trackColor"
              className="h-8 w-full p-1"
              value={component.props.trackColor || '#FFFFFF'}
              onChange={(e) => onUpdate({ ...component.props, trackColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="graficosTextColor" className="text-xs">
              Texto
            </UILabel>
            <Input
              type="color"
              id="graficosTextColor"
              className="h-8 w-full p-1"
              value={component.props.textColor || '#000000'}
              onChange={(e) => onUpdate({ ...component.props, textColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const ImagemSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo da Imagem</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="imageUrl" className="text-xs">
              URL da Imagem
            </UILabel>
            <Input
              id="imageUrl"
              value={component.props.imageUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, imageUrl: e.target.value })}
              className="mt-1"
              placeholder="https://example.com/imagem.png"
            />
          </div>
          <div>
            <UILabel htmlFor="altText" className="text-xs">
              Texto Alternativo
            </UILabel>
            <Input
              id="altText"
              value={component.props.altText || ''}
              onChange={(e) => onUpdate({ ...component.props, altText: e.target.value })}
              className="mt-1"
              placeholder="Descrição da imagem"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo</h3>
        <div>
          <UILabel htmlFor="borderRadius" className="text-xs">
            Arredondamento da Borda
          </UILabel>
          <Select
            value={component.props.borderRadius || 'md'}
            onValueChange={(value: 'none' | 'sm' | 'md' | 'lg' | 'full') =>
              onUpdate({ ...component.props, borderRadius: value })
            }
          >
            <SelectTrigger id="borderRadius" className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Nenhum</SelectItem>
              <SelectItem value="sm">Pequeno</SelectItem>
              <SelectItem value="md">Médio</SelectItem>
              <SelectItem value="lg">Grande</SelectItem>
              <SelectItem value="full">Total (Círculo)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
};

const ListaSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const items = component.props.listItems || [];

  const handleUpdateItem = (itemId: number, newValues: Partial<ListItem>) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item
    );
    onUpdate({ ...component.props, listItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: ListItem = {
      id: Date.now(),
      icon: '✨',
      iconBgColor: '#6366F1',
      title: 'Novo Item',
      subtitle: 'Subtítulo',
    };
    onUpdate({ ...component.props, listItems: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, listItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens da Lista</h3>
        <ScrollArea className="h-[40rem]">
          <div className="space-y-4 pr-4">
            {items.map((item, itemIndex) => (
              <Card key={item.id} className="relative overflow-hidden bg-card p-3 space-y-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="relative h-10 w-12 p-0 text-center text-xl"
                          style={{ backgroundColor: item.iconBgColor }}
                        >
                          <span className="text-white">{item.icon}</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="h-96 w-80">
                        <ScrollArea className="h-full w-full">
                          {Object.entries(emojiCategories).map(([category, emojis]) => (
                            <div key={category}>
                              <h4 className="sticky top-0 mb-2 bg-popover py-1 text-sm font-bold text-muted-foreground">
                                {category}
                              </h4>
                              <div className="mb-4 grid grid-cols-8 gap-1">
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
                    <Input
                      type="color"
                      className="h-10 w-12 p-1"
                      value={item.iconBgColor}
                      onChange={(e) => handleUpdateItem(item.id, { iconBgColor: e.target.value })}
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <Input
                      value={item.title}
                      onChange={(e) => handleUpdateItem(item.id, { title: e.target.value })}
                      className="h-9"
                      placeholder="Título"
                    />
                    <Input
                      value={item.subtitle}
                      onChange={(e) => handleUpdateItem(item.id, { subtitle: e.target.value })}
                      className="h-9"
                      placeholder="Subtítulo"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </Card>
    </div>
  );
};

const MarquiseSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const items = component.props.marquiseItems || [];

  const handleUpdateItem = (itemId: number, newValues: Partial<MarquiseItem>) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item
    );
    onUpdate({ ...component.props, marquiseItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: MarquiseItem = {
      id: Date.now(),
      name: 'Novo Usuário',
      handle: '@novousuario',
      avatarUrl: `https://picsum.photos/seed/${Date.now()}/40/40`,
      text: 'Este é um novo item na marquise!',
    };
    onUpdate({ ...component.props, marquiseItems: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, marquiseItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Itens</h3>
        <ScrollArea className="h-[30rem]">
          <div className="space-y-4 pr-4">
            {items.map((item) => (
              <Card key={item.id} className="relative bg-card p-3 space-y-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="space-y-2">
                  <UILabel className="text-xs">Avatar URL</UILabel>
                  <Input
                    value={item.avatarUrl}
                    onChange={(e) => handleUpdateItem(item.id, { avatarUrl: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <UILabel className="text-xs">Nome</UILabel>
                    <Input
                      value={item.name}
                      onChange={(e) => handleUpdateItem(item.id, { name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <UILabel className="text-xs">Handle</UILabel>
                    <Input
                      value={item.handle}
                      onChange={(e) => handleUpdateItem(item.id, { handle: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <UILabel className="text-xs">Texto</UILabel>
                  <Textarea
                    value={item.text}
                    onChange={(e) => handleUpdateItem(item.id, { text: e.target.value })}
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Item
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Animação</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="speed" className="text-xs">
              Velocidade ({component.props.speed || 20})
            </UILabel>
            <Slider
              id="speed"
              min={1}
              max={100}
              step={1}
              value={[component.props.speed || 20]}
              onValueChange={(value) => onUpdate({ ...component.props, speed: value[0] })}
              className="mt-2"
            />
          </div>
          <div>
            <UILabel htmlFor="direction" className="text-xs">
              Direção
            </UILabel>
            <Select
              value={component.props.direction || 'left'}
              onValueChange={(value: 'left' | 'right') =>
                onUpdate({ ...component.props, direction: value })
              }
            >
              <SelectTrigger id="direction" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="pauseOnHover">Pausar ao passar o mouse</UILabel>
            <Switch
              id="pauseOnHover"
              checked={component.props.pauseOnHover}
              onCheckedChange={(checked) => onUpdate({ ...component.props, pauseOnHover: checked })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const NivelSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="title" className="text-xs">
              Título
            </UILabel>
            <Input
              id="title"
              value={component.props.title || ''}
              onChange={(e) => onUpdate({ ...component.props, title: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="subtitle" className="text-xs">
              Subtítulo
            </UILabel>
            <Input
              id="subtitle"
              value={component.props.subtitle || ''}
              onChange={(e) => onUpdate({ ...component.props, subtitle: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="tooltipText" className="text-xs">
              Texto do Tooltip
            </UILabel>
            <Input
              id="tooltipText"
              value={component.props.tooltipText || ''}
              onChange={(e) => onUpdate({ ...component.props, tooltipText: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configurações</h3>
        <div className="space-y-4">
          <div>
            <UILabel htmlFor="value" className="text-xs">
              Valor ({component.props.value}%)
            </UILabel>
            <Slider
              id="value"
              min={0}
              max={100}
              step={1}
              value={[component.props.value || 0]}
              onValueChange={(value) => onUpdate({ ...component.props, value: value[0] })}
              className="mt-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showTooltip">Mostrar Tooltip</UILabel>
            <Switch
              id="showTooltip"
              checked={component.props.showTooltip}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showTooltip: checked })}
            />
          </div>
        </div>
      </Card>
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel htmlFor="nivelProgressColor" className="text-xs">
              Cor do Progresso
            </UILabel>
            <Input
              type="color"
              id="nivelProgressColor"
              className="h-8 w-full p-1"
              value={component.props.nivelProgressColor || '#111827'}
              onChange={(e) => onUpdate({ ...component.props, nivelProgressColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="nivelTrackColor" className="text-xs">
              Fundo da Barra
            </UILabel>
            <Input
              type="color"
              id="nivelTrackColor"
              className="h-8 w-full p-1"
              value={component.props.nivelTrackColor || '#E5E7EB'}
              onChange={(e) => onUpdate({ ...component.props, nivelTrackColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="tooltipColor" className="text-xs">
              Fundo do Tooltip
            </UILabel>
            <Input
              type="color"
              id="tooltipColor"
              className="h-8 w-full p-1"
              value={component.props.tooltipColor || '#111827'}
              onChange={(e) => onUpdate({ ...component.props, tooltipColor: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <UILabel htmlFor="tooltipTextColor" className="text-xs">
              Texto do Tooltip
            </UILabel>
            <Input
              type="color"
              id="tooltipTextColor"
              className="h-8 w-full p-1"
              value={component.props.tooltipTextColor || '#FFFFFF'}
              onChange={(e) => onUpdate({ ...component.props, tooltipTextColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const OpcoesSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const items = component.props.opcoesItems || [];

  const handleUpdateItem = (itemId: number, newValues: Partial<OpcaoItem>) => {
    const newItems = items.map((item) =>
      item.id === itemId ? { ...item, ...newValues } : item
    );
    onUpdate({ ...component.props, opcoesItems: newItems });
  };

  const handleAddItem = () => {
    const newItem: OpcaoItem = {
      id: Date.now(),
      icon: '🤔',
      text: 'Nova Opção',
    };
    onUpdate({ ...component.props, opcoesItems: [...items, newItem] });
  };

  const handleDeleteItem = (itemId: number) => {
    const newItems = items.filter((item) => item.id !== itemId);
    onUpdate({ ...component.props, opcoesItems: newItems });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Opções</h3>
        <ScrollArea className="h-[25rem]">
          <div className="space-y-4 pr-4">
            {items.map((item, itemIndex) => (
              <Card key={item.id} className="relative bg-card p-3">
                <div className="flex items-center gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="h-10 w-12 flex-shrink-0 p-0 text-center text-xl"
                      >
                        {item.icon}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="h-96 w-80">
                      <ScrollArea className="h-full w-full">
                        {Object.entries(emojiCategories).map(([category, emojis]) => (
                          <div key={category}>
                            <h4 className="sticky top-0 mb-2 bg-popover py-1 text-sm font-bold text-muted-foreground">
                              {category}
                            </h4>
                            <div className="mb-4 grid grid-cols-8 gap-1">
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
                  <Input
                    value={item.text}
                    onChange={(e) => handleUpdateItem(item.id, { text: e.target.value })}
                    className="h-10"
                    placeholder="Texto da opção"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 flex-shrink-0 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddItem}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Opção
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Validações</h3>
        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <Switch
              id="multipleChoice"
              checked={component.props.multipleChoice}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, multipleChoice: checked })
              }
              className="mt-1"
            />
            <div className="grid gap-1.5">
              <UILabel htmlFor="multipleChoice" className="font-medium">
                Múltipla Escolha
              </UILabel>
              <p className="text-xs text-muted-foreground">
                O usuário poderá selecionar múltiplas opções, entretanto, o avanço para a próxima
                etapa deve ser definido através de um componente de Botão.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Switch
              id="opcoesRequired"
              checked={component.props.opcoesRequired}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, opcoesRequired: checked })
              }
              className="mt-1"
            />
            <div className="grid gap-1.5">
              <UILabel htmlFor="opcoesRequired" className="font-medium">
                Obrigatório
              </UILabel>
              <p className="text-xs text-muted-foreground">
                O usuário é obrigado a selecionar alguma opção para poder avançar.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Switch
              id="autoAdvance"
              checked={component.props.autoAdvance}
              onCheckedChange={(checked) => onUpdate({ ...component.props, autoAdvance: checked })}
              className="mt-1"
            />
            <div className="grid gap-1.5">
              <UILabel htmlFor="autoAdvance" className="font-medium">
                Auto-avançar
              </UILabel>
              <p className="text-xs text-muted-foreground">
                O funil avançará para la etapa seguinte definida na opção selecionada. Caso
                contrário, o usuário deverá clicar em um componente de Botão para poder prosseguir.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilização</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <UILabel htmlFor="borderStyle" className="text-xs">
                Bordas
              </UILabel>
              <Select
                value={component.props.borderStyle || 'media'}
                onValueChange={(
                  value: 'pequena' | 'media' | 'grande' | 'gigante' | 'sem-borda'
                ) => onUpdate({ ...component.props, borderStyle: value })}
              >
                <SelectTrigger id="borderStyle" className="mt-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pequena">Pequena</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="grande">Grande</SelectItem>
                  <SelectItem value="gigante">Gigante</SelectItem>
                  <SelectItem value="sem-borda">Sem Borda</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <UILabel htmlFor="spacingStyle" className="text-xs">
                Espaçamento
              </UILabel>
              <Select
                value={component.props.spacingStyle || 'medio'}
                onValueChange={(value: 'pequeno' | 'medio' | 'grande') =>
                  onUpdate({ ...component.props, spacingStyle: value })
                }
              >
                <SelectTrigger id="spacingStyle" className="mt-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pequeno">Pequeno</SelectItem>
                  <SelectItem value="medio">Médio</SelectItem>
                  <SelectItem value="grande">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <UILabel htmlFor="detailStyle" className="text-xs">
                Detalhe
              </UILabel>
              <Select
                value={component.props.detailStyle || 'nenhum'}
                onValueChange={(value: 'nenhum' | 'seta' | 'confirmacao') =>
                  onUpdate({ ...component.props, detailStyle: value })
                }
              >
                <SelectTrigger id="detailStyle" className="mt-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nenhum">Nenhum</SelectItem>
                  <SelectItem value="seta">Seta</SelectItem>
                  <SelectItem value="confirmacao">Confirmação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <UILabel htmlFor="styleType" className="text-xs">
                Estilo
              </UILabel>
              <Select
                value={component.props.styleType || 'simples'}
                onValueChange={(value: 'simples' | 'relevo') =>
                  onUpdate({ ...component.props, styleType: value })
                }
              >
                <SelectTrigger id="styleType" className="mt-1 h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="simples">Simples</SelectItem>
                  <SelectItem value="relevo">Relevo</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const PrecoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo do Preço</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="planName" className="text-xs">
              Nome do Plano
            </UILabel>
            <Input
              id="planName"
              value={component.props.planName || ''}
              onChange={(e) => onUpdate({ ...component.props, planName: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="price" className="text-xs">
              Preço
            </UILabel>
            <Input
              id="price"
              value={component.props.price || ''}
              onChange={(e) => onUpdate({ ...component.props, price: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="priceSubtitle" className="text-xs">
              Subtítulo do Preço
            </UILabel>
            <Input
              id="priceSubtitle"
              value={component.props.priceSubtitle || ''}
              onChange={(e) => onUpdate({ ...component.props, priceSubtitle: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <UILabel htmlFor="discountText" className="text-xs">
              Texto do Desconto
            </UILabel>
            <Input
              id="discountText"
              value={component.props.discountText || ''}
              onChange={(e) => onUpdate({ ...component.props, discountText: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Banner</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showPopularBanner">Mostrar Banner Popular</UILabel>
            <Switch
              id="showPopularBanner"
              checked={component.props.showPopularBanner}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, showPopularBanner: checked })
              }
            />
          </div>
          {component.props.showPopularBanner && (
            <div>
              <UILabel htmlFor="popularText" className="text-xs">
                Texto do Banner
              </UILabel>
              <Input
                id="popularText"
                value={component.props.popularText || ''}
                onChange={(e) => onUpdate({ ...component.props, popularText: e.target.value })}
                className="mt-1"
              />
            </div>
          )}
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Personalização</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <UILabel className="text-xs">Fundo Card</UILabel>
            <Input
              type="color"
              value={component.props.cardBgColor || '#FFFFFF'}
              onChange={(e) => onUpdate({ ...component.props, cardBgColor: e.target.value })}
              className="h-8 w-full p-1"
            />
          </div>
          <div className="space-y-1">
            <UILabel className="text-xs">Fundo Preço</UILabel>
            <Input
              type="color"
              value={component.props.priceBoxColor || '#E5E7EB'}
              onChange={(e) => onUpdate({ ...component.props, priceBoxColor: e.target.value })}
              className="h-8 w-full p-1"
            />
          </div>
          <div className="space-y-1">
            <UILabel className="text-xs">Texto Preço</UILabel>
            <Input
              type="color"
              value={component.props.priceTextColor || '#111827'}
              onChange={(e) => onUpdate({ ...component.props, priceTextColor: e.target.value })}
              className="h-8 w-full p-1"
            />
          </div>
          <div className="space-y-1">
            <UILabel className="text-xs">Fundo Banner</UILabel>
            <Input
              type="color"
              value={component.props.popularBannerColor || '#1F2937'}
              onChange={(e) =>
                onUpdate({ ...component.props, popularBannerColor: e.target.value })
              }
              className="h-8 w-full p-1"
            />
          </div>
          <div className="col-span-2 space-y-1">
            <UILabel className="text-xs">Texto Banner</UILabel>
            <Input
              type="color"
              value={component.props.popularTextColor || '#FFFFFF'}
              onChange={(e) => onUpdate({ ...component.props, popularTextColor: e.target.value })}
              className="h-8 w-full p-1"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const TermosSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const links = component.props.links || [];

  const handleUpdateLink = (linkId: number, newValues: Partial<TermosLinkItem>) => {
    const newLinks = links.map((link) => (link.id === linkId ? { ...link, ...newValues } : link));
    onUpdate({ ...component.props, links: newLinks });
  };

  const handleAddLink = () => {
    const newLink: TermosLinkItem = {
      id: Date.now(),
      text: 'Nova Política',
      url: '#',
    };
    onUpdate({ ...component.props, links: [...links, newLink] });
  };

  const handleDeleteLink = (linkId: number) => {
    const newLinks = links.filter((link) => link.id !== linkId);
    onUpdate({ ...component.props, links: newLinks });
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="mainText" className="text-xs">
              Texto Principal
            </UILabel>
            <Textarea
              id="mainText"
              value={component.props.mainText || ''}
              onChange={(e) => onUpdate({ ...component.props, mainText: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Links</h3>
        <ScrollArea className="h-[20rem]">
          <div className="space-y-4 pr-4">
            {links.map((link) => (
              <Card key={link.id} className="relative bg-card p-3 space-y-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  onClick={() => handleDeleteLink(link.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div>
                  <UILabel htmlFor={`link-text-${link.id}`} className="text-xs">
                    Texto do Link
                  </UILabel>
                  <Input
                    id={`link-text-${link.id}`}
                    value={link.text}
                    onChange={(e) => handleUpdateLink(link.id, { text: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <UILabel htmlFor={`link-url-${link.id}`} className="text-xs">
                    URL do Link
                  </UILabel>
                  <Input
                    id={`link-url-${link.id}`}
                    value={link.url}
                    onChange={(e) => handleUpdateLink(link.id, { url: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
        <Button variant="outline" className="mt-4 w-full" onClick={handleAddLink}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Link
        </Button>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Estilo do Texto</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="termosTextAlign" className="text-xs">
              Alinhamento
            </UILabel>
            <Select
              value={component.props.termosTextAlign || 'center'}
              onValueChange={(value: 'left' | 'center' | 'right') =>
                onUpdate({ ...component.props, termosTextAlign: value })
              }
            >
              <SelectTrigger id="termosTextAlign" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="left">Esquerda</SelectItem>
                <SelectItem value="center">Centro</SelectItem>
                <SelectItem value="right">Direita</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <UILabel htmlFor="termosFontSize" className="text-xs">
              Tamanho
            </UILabel>
            <Select
              value={component.props.termosFontSize || 'sm'}
              onValueChange={(value: 'xs' | 'sm' | 'base' | 'lg') =>
                onUpdate({ ...component.props, termosFontSize: value })
              }
            >
              <SelectTrigger id="termosFontSize" className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">Extra Pequeno</SelectItem>
                <SelectItem value="sm">Pequeno</SelectItem>
                <SelectItem value="base">Normal</SelectItem>
                <SelectItem value="lg">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <UILabel htmlFor="termosTextColor" className="text-xs">
              Cor
            </UILabel>
            <Input
              type="color"
              id="termosTextColor"
              className="mt-1 h-8 w-full p-1"
              value={component.props.termosTextColor || '#6B7280'}
              onChange={(e) => onUpdate({ ...component.props, termosTextColor: e.target.value })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const TextoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    // Focus the editor back after a command
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleContentChange = () => {
    if (editorRef.current) {
      onUpdate({ ...component.props, content: editorRef.current.innerHTML });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Conteúdo do Texto</h3>
        <div className="rounded-md border border-gray-200">
          <RichTextToolbar onFormat={handleFormat} />
          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            className="prose prose-sm w-full max-w-none overflow-auto rounded-b-md p-4 h-64 outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:prose-base dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: component.props.content || '' }}
            onInput={handleContentChange}
          />
        </div>
      </Card>
    </div>
  );
};

const VideoSettings = ({
  component,
  onUpdate,
}: {
  component: CanvasComponentData;
  onUpdate: (props: ComponentProps) => void;
}) => {
  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Configuração do Vídeo</h3>
        <div className="space-y-3">
          <div>
            <UILabel htmlFor="videoUrl" className="text-xs">
              URL do Vídeo
            </UILabel>
            <Input
              id="videoUrl"
              value={component.props.videoUrl || ''}
              onChange={(e) => onUpdate({ ...component.props, videoUrl: e.target.value })}
              className="mt-1"
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
        </div>
      </Card>

      <Card className="border-border/50 bg-card p-4">
        <h3 className="mb-4 text-sm font-medium text-muted-foreground">Opções de Reprodução</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <UILabel htmlFor="showControls">Mostrar Controles</UILabel>
            <Switch
              id="showControls"
              checked={component.props.showControls}
              onCheckedChange={(checked) => onUpdate({ ...component.props, showControls: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="autoplayVideo">Autoplay</UILabel>
            <Switch
              id="autoplayVideo"
              checked={component.props.autoplayVideo}
              onCheckedChange={(checked) =>
                onUpdate({ ...component.props, autoplayVideo: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <UILabel htmlFor="loopVideo">Loop</UILabel>
            <Switch
              id="loopVideo"
              checked={component.props.loopVideo}
              onCheckedChange={(checked) => onUpdate({ ...component.props, loopVideo: checked })}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

const ComponentSettings = ({
  component,
  onUpdate,
  steps,
  activeStepId,
}: {
  component: CanvasComponentData | null;
  onUpdate: (id: number, props: ComponentProps) => void;
  steps: Step[];
  activeStepId: number;
}) => {
  if (!component) return null;

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
        return (
          <BotaoSettings
            component={component}
            onUpdate={handleUpdate}
            steps={steps}
            activeStepId={activeStepId}
          />
        );
      case 'Carregando':
        return <CarregandoSettings component={component} onUpdate={handleUpdate} />;
      case 'Carrosel':
        return <CarroselSettings component={component} onUpdate={handleUpdate} />;
      case 'Cartesiano':
        return <CartesianoSettings component={component} onUpdate={handleUpdate} />;
      case 'Comparar':
        return <CompararSettings component={component} onUpdate={handleUpdate} />;
      case 'Confetti':
        return <ConfettiSettings component={component} onUpdate={handleUpdate} />;
      case 'Depoimentos':
        return <DepoimentosSettings component={component} onUpdate={handleUpdate} />;
      case 'Entrada':
        return <EntradaSettings component={component} onUpdate={handleUpdate} />;
      case 'Espaçador':
        return <EspacadorSettings component={component} onUpdate={handleUpdate} />;
      case 'FAQ':
        return <FaqSettings component={component} onUpdate={handleUpdate} />;
      case 'Gráficos':
        return <GraficosSettings component={component} onUpdate={handleUpdate} />;
      case 'Imagem':
        return <ImagemSettings component={component} onUpdate={handleUpdate} />;
      case 'Lista':
        return <ListaSettings component={component} onUpdate={handleUpdate} />;
      case 'Marquise':
        return <MarquiseSettings component={component} onUpdate={handleUpdate} />;
      case 'Nível':
        return <NivelSettings component={component} onUpdate={handleUpdate} />;
      case 'Opções':
        return <OpcoesSettings component={component} onUpdate={handleUpdate} />;
      case 'Preço':
        return <PrecoSettings component={component} onUpdate={handleUpdate} />;
      case 'Termos':
        return <TermosSettings component={component} onUpdate={handleUpdate} />;
      case 'Texto':
        return <TextoSettings component={component} onUpdate={handleUpdate} />;
      case 'Video':
        return <VideoSettings component={component} onUpdate={handleUpdate} />;
      default:
        return (
          <p className="text-sm text-muted-foreground">
            Opções de configuração para o componente {component.name} aparecerão aqui.
          </p>
        );
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Editando: {component.name}</h3>
      {renderSettings()}
    </div>
  );
};

const DesignSettings = () => {
  const designSections = ['GERAL', 'HEADER', 'CORES', 'TIPOGRAFIA', 'ANIMAÇÃO'];
  return (
    <div className="space-y-2">
      {designSections.map((section) => (
        <Button key={section} variant="ghost" className="w-full justify-start font-semibold">
          {section}
        </Button>
      ))}
    </div>
  );
};

const TypebotEditor = ({ funnel }: { funnel: Funnel }) => {
  const [activeTab, setActiveTab] = useState('Flow');

  const blocks = {
    Bubbles: [
      { name: 'Text', icon: <MessageCircle size={16} /> },
      { name: 'Image', icon: <ImageIcon size={16} /> },
      { name: 'Video', icon: <Video size={16} /> },
      { name: 'Embed', icon: <Code2 size={16} /> },
      { name: 'Audio', icon: <AudioWaveform size={16} /> },
    ],
    Inputs: [
      { name: 'Text', icon: <TextCursorInput size={16} /> },
      { name: 'Number', icon: <span className="font-bold">7</span> },
      { name: 'Email', icon: <MessageCircle size={16} /> },
      { name: 'Website', icon: <Link2 size={16} /> },
      { name: 'Date', icon: <Calendar size={16} /> },
      { name: 'Time', icon: <Clock size={16} /> },
      { name: 'Phone', icon: <Phone size={16} /> },
      { name: 'Buttons', icon: <CheckSquare2 size={16} /> },
      { name: 'Pic choice', icon: <PictureInPicture size={16} /> },
      { name: 'Payment', icon: <CreditCard size={16} /> },
      { name: 'Rating', icon: <StarHalf size={16} /> },
      { name: 'File', icon: <UploadCloud size={16} /> },
      { name: 'Cards', icon: <CreditCard size={16} /> },
    ],
    Logic: [
        { name: 'Set variable', icon: <Variable size={16} /> },
        { name: 'Condition', icon: <GitBranch size={16} /> },
        { name: 'Redirect', icon: <ArrowRightLeft size={16} /> },
        { name: 'Script', icon: <FileCode size={16} /> },
        { name: 'Typebot', icon: <Bot size={16} /> },
        { name: 'Wait', icon: <Clock10 size={16} /> },
        { name: 'AB Test', icon: <GitCompareArrows size={16} /> },
        { name: 'Webhook', icon: <Webhook size={16} /> },
        { name: 'Jump', icon: <GitCommit size={16} /> },
        { name: 'Return', icon: <GitPullRequest size={16} /> },
    ],
  };

  const BlockButton = ({ name, icon }: { name: string; icon: ReactNode }) => (
    <Button variant="ghost" className="h-9 w-full justify-start gap-2 bg-[#262626] text-sm font-normal text-white/80 hover:bg-[#3f3f46] hover:text-white">
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

        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
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

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-md bg-[#181818] p-1">
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-[#262626]">
              <Code2 size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-[#262626]">
              <Minus size={16} />
            </Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-[#262626]">
              <Plus size={16} />
            </Button>
             <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-[#262626]">
              <MoreHorizontal size={16} />
            </Button>
          </div>
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
                      <BlockButton key={item.name} name={item.name} icon={item.icon} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </aside>

        {/* Canvas */}
        <main
          className="flex-1 overflow-auto"
          style={{
            backgroundImage: 'radial-gradient(#3f3f46 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        >
          <div className="relative h-full w-full p-10">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-center gap-2 rounded-lg bg-[#262626] px-3 py-2">
                    <PlaySquare size={16} className="text-white/60" />
                    <span className="text-sm font-medium">Start</span>
                    <div className="h-3 w-3 rounded-full border-2 border-orange-400 bg-transparent" />
                </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Placeholder */}
        {/* <aside className="w-80 shrink-0 border-l border-[#262626] bg-[#181818]">
            <div className="p-4">Settings</div>
        </aside> */}
      </div>
    </div>
  );
};


function StandardFunnelEditor(
    { 
        funnel, 
        setFunnel, 
        debouncedUpdateFunnel,
        activeStepId,
        setActiveStepId,
        selectedComponentId,
        setSelectedComponentId,
    } : {
        funnel: Funnel,
        setFunnel: (updater: (prev: Funnel) => Funnel) => void,
        debouncedUpdateFunnel: any,
        activeStepId: number | null,
        setActiveStepId: (id: number | null) => void,
        selectedComponentId: number | null,
        setSelectedComponentId: (id: number | null) => void,
    }
) {
    const router = useRouter();
    const [activeView, setActiveView] = useState<EditorView>('construtor');

    const updateFunnel = (updater: (prev: Funnel) => Funnel) => {
        setFunnel(prev => prev ? updater(prev) : null);
    };

    const addStep = () => {
        const newStepId = Date.now();
        const newStep: Step = {
            id: newStepId,
            name: `Etapa ${funnel.steps.length + 1}`,
            components: [],
        };
        updateFunnel(prev => ({ ...prev, steps: [...prev.steps, newStep] }));
        setActiveStepId(newStepId);
    };

    const updateStepName = (id: number, name: string) => {
        updateFunnel(prev => ({
            ...prev,
            steps: prev.steps.map(step =>
                step.id === id ? { ...step, name } : step
            ),
        }));
    };

    const deleteStep = (id: number) => {
        if (funnel.steps.length === 1) return;

        let newActiveStepId = activeStepId;
        if (activeStepId === id) {
            const currentIndex = funnel.steps.findIndex(s => s.id === id);
            newActiveStepId =
                funnel.steps[currentIndex - 1]?.id || funnel.steps[currentIndex + 1]?.id;
        }

        updateFunnel(prev => ({
            ...prev,
            steps: prev.steps.filter(step => step.id !== id),
        }));

        setActiveStepId(newActiveStepId);
    };

    const addComponentToCanvas = (component: ComponentType) => {
        if (!activeStepId) return;
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
        const newComponent: CanvasComponentData = {
            ...component,
            id: Date.now(),
            props: defaultProps,
        };
        updateFunnel(prev => ({
            ...prev,
            steps: prev.steps.map(step =>
                step.id === activeStepId
                    ? { ...step, components: [...step.components, newComponent] }
                    : step
            ),
        }));
    };
    
    const updateComponentProps = (componentId: number, props: ComponentProps) => {
        updateFunnel(prev => ({
            ...prev,
            steps: prev.steps.map(step =>
                step.id === activeStepId
                    ? {
                        ...step,
                        components: step.components.map(c =>
                            c.id === componentId ? { ...c, props } : c
                        ),
                    }
                    : step
            ),
        }));
    };

    const duplicateComponent = (id: number) => {
        const activeStep = funnel.steps.find(s => s.id === activeStepId);
        if (!activeStep) return;
        const componentToDuplicate = activeStep.components.find(c => c.id === id);
        if (!componentToDuplicate) return;
        const newComponent = { ...componentToDuplicate, id: Date.now() };
        const index = activeStep.components.findIndex(c => c.id === id);
        const newComponents = [...activeStep.components];
        newComponents.splice(index + 1, 0, newComponent);
        updateFunnel(prev => ({
            ...prev,
            steps: prev.steps.map(step =>
                step.id === activeStepId ? { ...step, components: newComponents } : step
            ),
        }));
    };

    const deleteComponent = (id: number) => {
        updateFunnel(prev => ({
            ...prev,
            steps: prev.steps.map(step =>
                step.id === activeStepId
                    ? { ...step, components: step.components.filter(c => c.id !== id) }
                    : step
            ),
        }));
        if (selectedComponentId === id) {
            setSelectedComponentId(null);
        }
    };
    
    const activeStep = funnel.steps.find((s) => s.id === activeStepId);
    const activeStepComponents = activeStep?.components || [];
    const selectedComponent = activeStepComponents.find((c) => c.id === selectedComponentId) || null;

    const editorViews: { id: EditorView; label: string; icon: React.ReactNode }[] = [
        { id: 'construtor', label: 'Construtor', icon: <Wand2 /> },
        { id: 'fluxo', label: 'Fluxo', icon: <Combine /> },
        { id: 'design', label: 'Design', icon: <Brush /> },
        { id: 'leads', label: 'Leads', icon: <Users /> },
        { id: 'configuracoes', label: 'Configurações', icon: <Settings /> },
    ];

    return (
        <div className="flex h-screen w-full flex-col bg-background text-foreground">
        <header className="flex h-16 items-center justify-between border-b border-border px-4 md:px-6">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft />
            </Button>
            <span className="text-lg font-semibold">{funnel.name}</span>
          </div>
          <div className="hidden items-center gap-2 rounded-lg bg-card p-1 md:flex">
            {editorViews.map((view) => (
              <Button
                key={view.id}
                variant={activeView === view.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => setActiveView(view.id)}
                className="gap-2"
              >
                {view.icon}
                <span className="hidden sm:inline">{view.label}</span>
              </Button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Eye className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => debouncedUpdateFunnel.flush()}>
              <Save className="mr-2 h-4 w-4" />
              Salvar
            </Button>
            <Button size="sm">
              <Rocket className="mr-2 h-4 w-4" />
              Publicar
            </Button>
          </div>
        </header>
  
        <div className="flex flex-1 overflow-hidden">
          <aside
            className={cn(
              'border-r border-border md:flex',
              activeView === 'construtor' ? 'flex-row' : 'hidden',
              'w-full md:w-96'
            )}
          >
            <div className="flex w-1/2 flex-col border-r border-border">
              <div className="flex h-14 items-center justify-between border-b border-border px-4">
                <h2 className="font-semibold">Etapas</h2>
                <Button variant="ghost" size="icon" onClick={addStep}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <ScrollArea className="flex-1">
                <div className="space-y-1 p-2">
                  {funnel.steps.map((step) => (
                    <div key={step.id} className="group relative">
                      <Button
                        variant={activeStepId === step.id ? 'secondary' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveStepId(step.id)}
                      >
                        <Grip className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span className="flex-1 truncate text-left">{step.name}</span>
                      </Button>
                      <div className="absolute top-1/2 right-1 -translate-y-1/2 opacity-0 group-hover:opacity-100">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-40 p-1">
                            <Button
                              variant="ghost"
                              className="w-full justify-start text-sm font-normal"
                              onClick={() => deleteStep(step.id)}
                              disabled={funnel.steps.length <= 1}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Excluir
                            </Button>
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex w-1/2 flex-col">
              <div className="flex h-14 items-center border-b border-border px-4">
                <h2 className="font-semibold">Componentes</h2>
              </div>
              <div className="flex-1">
                <ScrollArea className="h-full">
                  <div className="grid grid-cols-1 gap-2 p-2">
                    {components.map((component) => (
                      <Card
                        key={component.name}
                        className="group flex cursor-pointer items-center justify-start gap-3 p-2 text-left transition-colors hover:bg-primary/10 hover:text-primary"
                        onClick={() => addComponentToCanvas(component)}
                      >
                        <div className="relative flex-shrink-0 text-primary">{component.icon}</div>
                        <div className="flex flex-col">
                          <span className="flex-grow text-xs font-medium">{component.name}</span>
                          {component.isNew && (
                            <Badge className="mt-1 w-fit scale-90">Novo</Badge>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </aside>
  
          <main
            className="flex-1 overflow-y-auto bg-white p-4 md:p-8"
            onClick={() => setSelectedComponentId(null)}
          >
            <div className="mx-auto w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="relative mb-4 h-10">
                <div className="absolute top-1/2 left-0 h-px w-full bg-black" />
                <div className="absolute top-0 left-1/2 z-10 flex -translate-x-1/2 justify-center bg-white px-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-black p-0.5">
                    <ImageIcon className="h-6 w-6 text-gray-400" />
                  </div>
                </div>
                <div className="absolute top-1/2 left-0 h-0.5 w-full">
                  <div className="h-full w-1/2 bg-black" />
                </div>
              </div>
  
              <div className="mt-8 flex min-h-[400px] flex-col gap-4">
                {activeStepComponents.length === 0 ? (
                  <div className="flex flex-1 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-transparent p-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-black">Nada por aqui 😔</p>
                      <p className="text-sm text-gray-500">Adicione um componente para começar.</p>
                    </div>
                  </div>
                ) : (
                    activeStepComponents.map((comp) => (
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
  
          <aside
            className={cn(
              'hidden border-l border-border p-6 lg:block',
              activeView === 'construtor' || activeView === 'design' ? 'w-80' : 'hidden'
            )}
          >
            <ScrollArea className="h-full">
              <div className="space-y-6 pr-4">
                {activeView === 'construtor' &&
                  (selectedComponent ? (
                    <ComponentSettings
                      component={selectedComponent}
                      onUpdate={updateComponentProps}
                      steps={funnel.steps}
                      activeStepId={activeStepId!}
                    />
                  ) : activeStep ? (
                    <StepSettings
                      step={activeStep}
                      onUpdateStep={updateStepName}
                      steps={funnel.steps}
                    />
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      Selecione uma etapa para editar.
                    </div>
                  ))}
                {activeView === 'design' && <DesignSettings />}
              </div>
            </ScrollArea>
          </aside>
        </div>
      </div>
    );
}

function FunnelEditorContent() {
  const { funnelId } = useParams() as { funnelId: string };
  const firestore = useFirestore();

  const funnelRef = useMemoFirebase(
    () => (funnelId ? doc(firestore, 'funnels', funnelId) : null),
    [firestore, funnelId]
  );
  const { data: funnelData, isLoading } = useDoc<Omit<Funnel, 'id'>>(funnelRef);

  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [activeStepId, setActiveStepId] = useState<number | null>(null);
  const [selectedComponentId, setSelectedComponentId] = useState<number | null>(null);

  const debouncedUpdateFunnel = useDebouncedCallback((updatedFunnel: Funnel) => {
    if (funnelRef) {
      const funnelToSave = JSON.parse(JSON.stringify(updatedFunnel));
      
      funnelToSave.steps.forEach((step: Step) => {
        step.components.forEach((component: any) => {
          if (component.props && component.props.icon) {
            delete component.props.icon;
          }
        });
      });
      
      const { id, ...rest } = funnelToSave;
      updateDoc(funnelRef, rest);
    }
  }, 500);

  useEffect(() => {
    if (funnel) {
      debouncedUpdateFunnel(funnel);
    }
  }, [funnel, debouncedUpdateFunnel]);

  useEffect(() => {
    if (funnelData) {
      const initialFunnel: Funnel = {
        id: funnelId,
        name: funnelData.name,
        type: funnelData.type,
        userId: funnelData.userId,
        steps: funnelData.steps || [{ id: Date.now(), name: 'Etapa 1', components: [] }],
      };
      setFunnel(initialFunnel);
      if (initialFunnel.steps.length > 0 && !activeStepId) {
        setActiveStepId(initialFunnel.steps[0].id);
      }
    }
  }, [funnelData, funnelId, activeStepId]);

  if (isLoading || !funnel) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando editor...
      </div>
    );
  }

  if (funnel.type === 'typebot') {
    return <TypebotEditor funnel={funnel} />;
  }

  return <StandardFunnelEditor 
    funnel={funnel}
    setFunnel={setFunnel}
    debouncedUpdateFunnel={debouncedUpdateFunnel}
    activeStepId={activeStepId}
    setActiveStepId={setActiveStepId}
    selectedComponentId={selectedComponentId}
    setSelectedComponentId={setSelectedComponentId}
  />;
}

export default function EditorPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <FunnelEditorContent />
    </Suspense>
  );
}
