
import { ReactNode } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

export type ComponentType = {
  name: string;
  icon: ReactNode;
  isNew?: boolean;
};

export type AlertModel = 'success' | 'error' | 'warning' | 'info';

export const modelColors: Record<
  AlertModel,
  { backgroundColor: string; textColor: string; borderColor: string }
> = {
  success: { backgroundColor: '#D1FAE5', textColor: '#065F46', borderColor: '#10B981' },
  error: { backgroundColor: '#FEE2E2', textColor: '#991B1B', borderColor: '#EF4444' },
  warning: { backgroundColor: '#FEF3C7', textColor: '#92400E', borderColor: '#F59E0B' },
  info: { backgroundColor: '#DBEAFE', textColor: '#1E40AF', borderColor: '#3B82F6' },
};

export const modelIcons: Record<AlertModel, ReactNode> = {
  success: <CheckCircle />,
  error: <XCircle />,
  warning: <AlertTriangle />,
  info: <Info />,
};

export type ArgumentItem = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type CarouselItemData = {
  id: number;
  imageUrl: string;
  caption: string;
};

export type CartesianChartDataPoint = {
  id: number;
  name: string;
  value: number;
  indicatorLabel: string;
};

export type TestimonialItem = {
  id: number;
  imageUrl: string;
  name: string;
  handle: string;
  rating: number;
  testimonial: string;
};

export type FaqItem = {
  id: number;
  question: string;
  answer: string;
};

export type GraficosItem = {
  id: number;
  label: string;
  value: number;
};

export type ListItem = {
  id: number;
  icon: string;
  iconBgColor: string;
  title: string;
  subtitle: string;
};

export type MarquiseItem = {
  id: number;
  name: string;
  handle: string;
  avatarUrl: string;
  text: string;
};

export type OpcaoItem = {
  id: number;
  icon: string;
  text: string;
};

export type TermosLinkItem = {
  id: number;
  text: string;
  url: string;
};

export type ComponentProps = {
  [key: string]: any;
  title?: string;
  description?: string;
  model?: AlertModel;
  backgroundColor?: string;
  textColor?: string;
  borderColor?: string;
  icon?: ReactNode;
  layout?: 'list' | '2-cols' | '3-cols' | '4-cols';
  items?: ArgumentItem[];
  audioUrl?: string;
  avatarUrl?: string;
  showAvatar?: boolean;
  autoplay?: boolean;
  progressColor?: string;
  bgColor?: string;
  iconColor?: string;
  text?: string;
  action?: 'next_step' | 'open_url' | 'go_to_step';
  url?: string;
  stepId?: number;
  fullWidth?: boolean;
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'link' | 'destructive';
  loadingText?: string;
  loadingDescription?: string;
  progressTrackColor?: string;
  duration?: number;
  limit?: number;
  showTitle?: boolean;
  showProgress?: boolean;
  titleColor?: string;
  descriptionColor?: string;
  slides?: CarouselItemData[];
  loop?: boolean;
  autoplayCarousel?: boolean;
  autoplayDelay?: number;
  showPagination?: boolean;
  arrowColor?: string;
  arrowTextColor?: string;
  arrowBorderColor?: string;
  chartTitle?: string;
  chartData?: CartesianChartDataPoint[];
  gradientStartColor?: string;
  gradientEndColor?: string;
  showArea?: boolean;
  showGrid?: boolean;
  beforeImageUrl?: string;
  afterImageUrl?: string;
  sliderColor?: string;
  sliderIconColor?: string;
  sliderPosition?: number;
  particleCount?: number;
  spread?: number;
  originX?: number;
  originY?: number;
  testimonials?: TestimonialItem[];
  cardBackgroundColor?: string;
  cardTextColor?: string;
  cardBorderColor?: string;
  label?: string;
  placeholder?: string;
  inputType?: 'text' | 'email' | 'password' | 'number' | 'tel';
  required?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: 'sm' | 'base' | 'lg';
  padding?: 'sm' | 'base' | 'lg';
  height?: number;
  faqItems?: FaqItem[];
  faqBackgroundColor?: string;
  faqTextColor?: string;
  faqBorderColor?: string;
  graficosItems?: GraficosItem[];
  barColor?: string;
  trackColor?: string;
  graficosLayout?: '1-col' | '2-cols' | '3-cols' | '4-cols';
  disposition?: 'top' | 'side';
  imageUrl?: string;
  altText?: string;
  borderRadius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  listItems?: ListItem[];
  marquiseItems?: MarquiseItem[];
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  value?: number;
  tooltipText?: string;
  showTooltip?: boolean;
  nivelTrackColor?: string;
  nivelProgressColor?: string;
  nivelThumbColor?: string;
  tooltipColor?: string;
  tooltipTextColor?: string;
  opcoesItems?: OpcaoItem[];
  multipleChoice?: boolean;
  opcoesRequired?: boolean;
  autoAdvance?: boolean;
  borderStyle?: 'pequena' | 'media' | 'grande' | 'gigante' | 'sem-borda';
  shadowStyle?: 'nenhuma' | 'pequena' | 'media' | 'grande';
  spacingStyle?: 'pequeno' | 'medio' | 'grande';
  detailStyle?: 'nenhum' | 'seta' | 'confirmacao';
  styleType?: 'simples' | 'relevo';
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
  mainText?: string;
  links?: TermosLinkItem[];
  termosTextColor?: string;
  termosFontSize?: 'xs' | 'sm' | 'base' | 'lg';
  termosTextAlign?: 'left' | 'center' | 'right';
  content?: string;
  videoUrl?: string;
  showControls?: boolean;
  autoplayVideo?: boolean;
  loopVideo?: boolean;
};

export type CanvasComponentData = ComponentType & {
  id: number;
  props: ComponentProps;
};

export type Step = {
  id: number;
  name: string;
  components: CanvasComponentData[];
  width?: string;
  spacing?: string;
  borderRadius?: string;
};

export type Funnel = {
  id: string;
  name: string;
  type: string;
  userId: string;
  steps: Step[];
};

export type EditorView = 'construtor' | 'fluxo' | 'design' | 'leads' | 'configuracoes';

export type CanvasBlock = {
    id: number;
    type: string;
    position: { x: number; y: number };
    parentId?: number;
    children?: CanvasBlock[];
    props: { [key: string]: any };
};

export type CanvasConnection = {
  from: number | 'start';
  to: number;
};
