
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Wand2, Copy, Sparkles, Brain, Cog, Palette, MousePointerClick, FileText, Cpu, Layout, Languages, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type FormData = {
    // Module 1
    projectType: string;
    niche: string;
    otherNiche: string;
    businessModel: string;
    targetAudienceAge: string;
    targetAudienceProfile: string;
    mainGoal: string;

    // Module 2
    authType: string;
    socialLogins: string[];
    accessLevels: string[];
    crudOperations: string;
    dataDeletion: string;
    searchAndFilter: string;
    paymentIntegrations: string[];
    apiIntegrations: string[];

    // Simplified Visual Style
    visualStyle: {
        borderRadius: string;
        shadowStyle: string;
        iconography: string;
    };
    
    // Module 4
    microInteractions: string[];
    pageTransitions: string;
    loadingStates: string;
    scrollBehavior: string;

    // Module 5
    toneOfVoice: string;
    language: string;
    seoFeatures: string[];
};

const initialFormData: FormData = {
    projectType: '',
    niche: '', otherNiche: '', businessModel: '', targetAudienceAge: '', targetAudienceProfile: '', mainGoal: '',
    authType: 'none', socialLogins: [], accessLevels: [], crudOperations: '', dataDeletion: 'soft', searchAndFilter: '', paymentIntegrations: [], apiIntegrations: [],
    visualStyle: { borderRadius: 'slight', shadowStyle: 'flat', iconography: 'lucide' },
    microInteractions: [], pageTransitions: 'instant', loadingStates: 'spinner', scrollBehavior: 'default',
    toneOfVoice: 'friendly', language: 'pt-br', seoFeatures: [],
};


const moduleIcons = {
    '1': <Brain />, '2': <Cog />, '3': <Palette />, '4': <MousePointerClick />,
    '5': <Languages />, '6': <Cpu />, '7': <Layout />
};

export default function PromptBuilderPage() {
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [showAdvanced, setShowAdvanced] = useState(false);

    const handleMultiSelectChange = (field: keyof FormData, value: string) => {
        setFormData(prev => {
            const currentValues = (prev[field] as string[]) || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };
    
    const handleVisualSelect = (field: keyof FormData['visualStyle'], value: string) => {
      setFormData(prev => ({
        ...prev,
        visualStyle: {
          ...prev.visualStyle,
          [field]: value,
        },
      }));
    };

    const generatedPrompt = useMemo(() => {
        let prompt = `**Ato:** Aja como um especialista em engenharia de software, design de produtos e UX/UI.

**Tarefa:** Crie a estrutura completa e o código para o seguinte projeto:

**Tipo de Projeto:** ${formData.projectType || 'Não especificado (ex: "Um site para uma barbearia", "Uma landing page para um ebook")'}

---

### Módulo 1: O Cérebro do Negócio (Estratégia)
*   **Nicho/Ramo de Atuação:** ${formData.niche === 'outro' ? formData.otherNiche : formData.niche || '[Não definido]'}
*   **Modelo de Negócio (Monetização):** ${formData.businessModel || '[Não definido]'}
*   **Público-Alvo (Persona):** Perfil ${formData.targetAudienceProfile || '[Não definido]'}, faixa etária ${formData.targetAudienceAge || '[Não definido]'}.
*   **Objetivo Principal da Tela:** ${formData.mainGoal || '[Não definido]'}

### Módulo 2: Funcionalidades (Lógica)
*   **Autenticação (Login):** ${formData.authType === 'none' ? 'Nenhuma autenticação necessária.' : `Sistema de ${formData.authType}.`}
    ${formData.socialLogins.length > 0 ? `*   **Login Social:** Habilitar login com ${formData.socialLogins.join(', ')}.` : ''}
    ${formData.accessLevels.length > 0 ? `*   **Níveis de Acesso:** Implementar perfis de ${formData.accessLevels.join(', ')}.` : ''}
*   **Gerenciamento de Dados (CRUD):** ${formData.crudOperations || 'Nenhuma operação CRUD especificada.'}
    *   **Exclusão de Dados:** Implementar ${formData.dataDeletion === 'soft' ? 'Soft Delete (marcar como inativo)' : 'Hard Delete (exclusão permanente)'}.
*   **Busca e Filtros:** ${formData.searchAndFilter || 'Funcionalidades de busca/filtro não especificadas.'}
*   **Integrações Externas (APIs):**
    ${formData.paymentIntegrations.length > 0 ? `*   **Pagamentos:** Integrar com ${formData.paymentIntegrations.join(', ')}.` : ''}
    ${formData.apiIntegrations.length > 0 ? `*   **Outras APIs:** Integrar com ${formData.apiIntegrations.join(', ')}.` : ''}

### Módulo 3: O Design (Estilo Visual)
*   **Estilo Visual Geral:** Use componentes modernos da biblioteca **Shadcn/ui**.
*   **Cantos dos Elementos (Border Radius):** Estilo de cantos **${formData.visualStyle.borderRadius}** (Ex: 'slight' para levemente arredondado, 'sharp' para cantos retos).
*   **Sombreamento e Profundidade:** Estilo de sombra **${formData.visualStyle.shadowStyle}**.
*   **Iconografia:** Utilizar a biblioteca **${formData.visualStyle.iconography}**.

### Módulo 4: Experiência do Usuário (UX & Motion)
*   **Micro-interações:**
    ${formData.microInteractions.length > 0 ? formData.microInteractions.map(i => `*   ${i}`).join('\n    ') : '*   Nenhuma micro-interação específica.'}
*   **Transições de Página:** ${formData.pageTransitions}.
*   **Carregamento (Loading States):** Utilizar **${formData.loadingStates}**.
*   **Comportamento de Scroll:** Implementar **${formData.scrollBehavior}**.

### Módulo 5: Conteúdo e SEO (Copywriting)
*   **Tom de Voz:** ${formData.toneOfVoice}.
*   **Idioma e Localização:** ${formData.language}.
*   **Recursos de SEO:**
    ${formData.seoFeatures.length > 0 ? formData.seoFeatures.map(f => `*   ${f}`).join('\n    ') : '*   Nenhum recurso de SEO específico.'}

---

**Requisitos Técnicos Adicionais:**
*   **Tecnologia:** Next.js, React com TypeScript, e Tailwind CSS.
*   **Qualidade:** O código deve ser limpo, performático e seguir as melhores práticas de desenvolvimento. Se a autenticação for necessária, use Firebase.

**Saída Esperada:** Gere todos os arquivos de código necessários, incluindo estrutura de pastas, componentes, páginas e estilos, prontos para serem usados.
        `.trim().replace(/^\s*\*/gm, '*');
        return prompt;
    }, [formData]);

    const handleCopyPrompt = () => {
        navigator.clipboard.writeText(generatedPrompt);
        toast({
            title: 'Prompt Copiado!',
            description: 'O prompt foi copiado para sua área de transferência.',
        });
    };

    const renderModule1 = () => (
        <div className="space-y-4">
             <div>
                <Label>Tipo de Projeto</Label>
                <Input placeholder="Ex: Um app para barbearias, Uma landing page..." value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})} />
            </div>
            <div>
                <Label>Nicho/Ramo de Atuação</Label>
                <Select value={formData.niche} onValueChange={(v) => setFormData({...formData, niche: v})}>
                    <SelectTrigger><SelectValue placeholder="Selecione o nicho" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Saúde">Saúde</SelectItem>
                        <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                        <SelectItem value="Gastronomia">Gastronomia</SelectItem>
                        <SelectItem value="Advocacia">Advocacia</SelectItem>
                        <SelectItem value="Moda">Moda</SelectItem>
                        <SelectItem value="Educação">Educação</SelectItem>
                        <SelectItem value="Imobiliária">Imobiliária</SelectItem>
                        <SelectItem value="outro">Outro...</SelectItem>
                    </SelectContent>
                </Select>
                {formData.niche === 'outro' && <Input className="mt-2" placeholder="Especifique o nicho" value={formData.otherNiche} onChange={(e) => setFormData({...formData, otherNiche: e.target.value})} />}
            </div>
            
            <div>
                <Label>Modelo de Negócio (Monetização)</Label>
                <Select value={formData.businessModel} onValueChange={(v) => setFormData({...formData, businessModel: v})}>
                    <SelectTrigger><SelectValue placeholder="Selecione o modelo" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Venda Única (E-commerce)">Venda Única (E-commerce)</SelectItem>
                        <SelectItem value="Assinatura Recorrente (SaaS)">Assinatura Recorrente (SaaS)</SelectItem>
                        <SelectItem value="Geração de Leads">Geração de Leads</SelectItem>
                        <SelectItem value="Baseado em Anúncios (Blog)">Baseado em Anúncios (Blog)</SelectItem>
                        <SelectItem value="Freemium">Freemium</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Público-Alvo (Persona)</Label>
                <div className="grid grid-cols-2 gap-4">
                    <Select value={formData.targetAudienceAge} onValueChange={(v) => setFormData({...formData, targetAudienceAge: v})}>
                        <SelectTrigger><SelectValue placeholder="Faixa Etária" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Geração Z">Geração Z</SelectItem>
                            <SelectItem value="Millennials">Millennials</SelectItem>
                            <SelectItem value="Seniors">Seniors</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select value={formData.targetAudienceProfile} onValueChange={(v) => setFormData({...formData, targetAudienceProfile: v})}>
                        <SelectTrigger><SelectValue placeholder="Perfil" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="B2B (Corporativo)">B2B (Corporativo)</SelectItem>
                            <SelectItem value="B2C (Consumidor Final)">B2C (Consumidor Final)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div>
                <Label>Objetivo Principal da Tela</Label>
                <Input placeholder="Ex: Converter o usuário em cliente" value={formData.mainGoal} onChange={(e) => setFormData({...formData, mainGoal: e.target.value})} />
            </div>
        </div>
    );
    
    const renderModule2 = () => (
         <div className="space-y-4">
            <div>
                <Label>Autenticação (Login)</Label>
                <Select value={formData.authType} onValueChange={(v) => setFormData({...formData, authType: v})}>
                    <SelectTrigger><SelectValue placeholder="Tipo de autenticação" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="none">Nenhuma</SelectItem>
                        <SelectItem value="simple">Área de Membros Simples</SelectItem>
                        <SelectItem value="saas">App Completo (SaaS)</SelectItem>
                        <SelectItem value="ecommerce">E-commerce</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {formData.authType !== 'none' && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                    <div>
                        <h4 className="font-semibold text-sm">Login Social</h4>
                         <div className="space-y-2 mt-2">
                           {['Google', 'GitHub', 'Apple'].map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`social-${p}`} checked={formData.socialLogins.includes(p)} onCheckedChange={() => handleMultiSelectChange('socialLogins', p)} /><Label htmlFor={`social-${p}`}>{p}</Label></div>)}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-sm">Níveis de Acesso</h4>
                         <div className="space-y-2 mt-2">
                            {['Admin', 'Editor', 'Usuário Comum'].map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`level-${p}`} checked={formData.accessLevels.includes(p)} onCheckedChange={() => handleMultiSelectChange('accessLevels', p)} /><Label htmlFor={`level-${p}`}>{p}</Label></div>)}
                        </div>
                    </div>
                </div>
            )}
            <div>
              <Label>Integrações Externas (APIs)</Label>
              <div className="space-y-4 mt-2">
                <div>
                    <h4 className="font-semibold text-sm">Pagamentos</h4>
                    <div className="space-y-2 mt-2">
                      {['Stripe', 'PayPal', 'Mercado Pago'].map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`payment-${p}`} checked={formData.paymentIntegrations.includes(p)} onCheckedChange={() => handleMultiSelectChange('paymentIntegrations', p)} /><Label htmlFor={`payment-${p}`}>{p}</Label></div>)}
                    </div>
                </div>
                <div>
                    <h4 className="font-semibold text-sm">Outras APIs</h4>
                     <div className="space-y-2 mt-2">
                      {['Google Maps', 'OpenAI', 'Mailchimp'].map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`api-${p}`} checked={formData.apiIntegrations.includes(p)} onCheckedChange={() => handleMultiSelectChange('apiIntegrations', p)} /><Label htmlFor={`api-${p}`}>{p}</Label></div>)}
                    </div>
                </div>
              </div>
            </div>
        </div>
    );

    const renderVisualStyle = () => {
        const options = {
          borderRadius: [
            { value: 'sharp', label: 'Retos', imgSrc: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/h2g6653z2ey4u1v23tj0w1v1?v=1764722883348' },
            { value: 'slight', label: 'Arredondados', imgSrc: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/m79fchm0h18721cndx91o55p?v=1764722884100' },
            { value: 'full', label: 'Super Arredondados', imgSrc: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/bkl7q2q3jkg5f0yfh7v32b0g?v=1764722884948' },
          ],
          shadowStyle: [
            { value: 'flat', label: 'Plano (Flat)', imgSrc: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/t02s6a21e428q0w8z078gqyy?v=1764723145455' },
            { value: 'soft', label: 'Sombra Suave', imgSrc: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/a7u907v492a5d2t6531y692a?v=1764723146473' },
            { value: 'glass', label: 'Efeito Vidro', imgSrc: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/q0y8k27s4n7r85y77y52s8s6?v=1764723147348' },
          ],
          iconography: [
            { value: 'lucide', label: 'Linhas (Outline)', imgSrc: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/t2j2g907572n476d0w1x23a3?v=1764723389012' },
            { value: 'solid', label: 'Preenchido (Solid)', imgSrc: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/p2h4u6410651f8v232049q42?v=1764723390382' },
          ],
        };
    
        return (
          <div className="space-y-6">
            <div>
              <Label>Cantos dos Elementos</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {options.borderRadius.map(opt => (
                  <button key={opt.value} onClick={() => handleVisualSelect('borderRadius', opt.value)} className={cn("p-1 rounded-md border-2", formData.visualStyle.borderRadius === opt.value ? 'border-primary' : 'border-transparent')}>
                    <Image src={opt.imgSrc} alt={opt.label} width={100} height={60} className="w-full h-auto rounded" />
                    <p className="text-xs mt-1 text-center">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Sombras e Profundidade</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {options.shadowStyle.map(opt => (
                  <button key={opt.value} onClick={() => handleVisualSelect('shadowStyle', opt.value)} className={cn("p-1 rounded-md border-2", formData.visualStyle.shadowStyle === opt.value ? 'border-primary' : 'border-transparent')}>
                    <Image src={opt.imgSrc} alt={opt.label} width={100} height={60} className="w-full h-auto rounded" />
                    <p className="text-xs mt-1 text-center">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Estilo dos Ícones</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {options.iconography.map(opt => (
                  <button key={opt.value} onClick={() => handleVisualSelect('iconography', opt.value)} className={cn("p-1 rounded-md border-2", formData.visualStyle.iconography === opt.value ? 'border-primary' : 'border-transparent')}>
                    <Image src={opt.imgSrc} alt={opt.label} width={100} height={60} className="w-full h-auto rounded" />
                    <p className="text-xs mt-1 text-center">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      };

    const renderModule4 = () => (
        <div className="space-y-4">
            <div>
                <Label>Micro-interações</Label>
                <div className="space-y-2 mt-2">
                    {["Feedback tátil/visual em botões", "Validação de inputs em tempo real", "Confetti ao completar tarefa"].map(item => (
                        <div key={item} className="flex items-center space-x-2">
                            <Checkbox id={`micro-${item}`} checked={formData.microInteractions.includes(item)} onCheckedChange={() => handleMultiSelectChange('microInteractions', item)} />
                            <Label htmlFor={`micro-${item}`}>{item}</Label>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <Label>Transições de Página</Label>
                <Select value={formData.pageTransitions} onValueChange={(v) => setFormData({...formData, pageTransitions: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="instant">Instantâneo</SelectItem>
                        <SelectItem value="fade">Fade in/out</SelectItem>
                        <SelectItem value="slide">Slide lateral</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Carregamento (Loading States)</Label>
                <Select value={formData.loadingStates} onValueChange={(v) => setFormData({...formData, loadingStates: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="spinner">Spinner clássico</SelectItem>
                        <SelectItem value="skeleton">Skeleton Screens</SelectItem>
                        <SelectItem value="progress-bar">Barra de progresso</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Comportamento de Scroll</Label>
                <Select value={formData.scrollBehavior} onValueChange={(v) => setFormData({...formData, scrollBehavior: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="default">Padrão</SelectItem>
                        <SelectItem value="sticky-header">Sticky Header</SelectItem>
                        <SelectItem value="scroll-reveal">Scroll Reveal</SelectItem>
                        <SelectItem value="parallax">Parallax</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );

    const renderModule5 = () => (
        <div className="space-y-4">
            <div>
                 <Label>Tom de Voz</Label>
                <Select value={formData.toneOfVoice} onValueChange={(v) => setFormData({...formData, toneOfVoice: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Profissional e Acadêmico">Profissional e Acadêmico</SelectItem>
                        <SelectItem value="Amigável e Casual">Amigável e Casual</SelectItem>
                        <SelectItem value="Entusiasmado e Vendedor">Entusiasmado e Vendedor</SelectItem>
                        <SelectItem value="Minimalista e Direto">Minimalista e Direto</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Idioma e Localização</Label>
                <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                        <SelectItem value="en-us">Inglês (EUA)</SelectItem>
                        <SelectItem value="multi-language">Multi-idioma (i18n)</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                 <Label>Recursos de SEO</Label>
                <div className="space-y-2 mt-2">
                    {["Gerar meta-tags automaticamente", "Usar tags semânticas (H1, H2) para acessibilidade"].map(item => (
                        <div key={item} className="flex items-center space-x-2">
                            <Checkbox id={`seo-${item}`} checked={formData.seoFeatures.includes(item)} onCheckedChange={() => handleMultiSelectChange('seoFeatures', item)} />
                            <Label htmlFor={`seo-${item}`}>{item}</Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const modules = [
        { title: 'Estratégia do Negócio', content: renderModule1, icon: moduleIcons['1'] },
        { title: 'Funcionalidades e Lógica', content: renderModule2, icon: moduleIcons['2'] },
        { title: 'Estilo Visual', content: renderVisualStyle, icon: moduleIcons['3'] },
        { title: 'Experiência do Usuário', content: renderModule4, icon: moduleIcons['4'] },
        { title: 'Conteúdo e SEO', content: renderModule5, icon: moduleIcons['5'] },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline flex items-center gap-2">
                    <Sparkles className="h-8 w-8 text-primary" />
                    Assistente de Prompt para Lovable
                </h1>
                <p className="mt-2 text-muted-foreground">
                    Construa um prompt detalhado passo a passo para criar seu aplicativo com IA.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <Card className="lg:sticky top-24">
                    <CardHeader>
                        <CardTitle>Configurador de Prompt</CardTitle>
                        <CardDescription>Preencha os módulos para gerar seu prompt.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[60vh]">
                            <Accordion type="single" collapsible defaultValue="item-0" className="w-full pr-4">
                                {modules.map((module, index) => (
                                    <AccordionItem value={`item-${index}`} key={index}>
                                        <AccordionTrigger className="font-semibold">
                                            <div className="flex items-center gap-2">
                                                {module.icon} {module.title}
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="pt-4">
                                            {module.content()}
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </ScrollArea>
                    </CardContent>
                </Card>

                <Card className="lg:sticky top-24">
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Prompt Gerado</CardTitle>
                                <CardDescription>Copie e cole na plataforma Lovable.</CardDescription>
                            </div>
                            <Button variant="outline" size="icon" onClick={handleCopyPrompt}>
                                <Copy className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <ScrollArea className="h-[60vh] rounded-md bg-gray-800/50 p-4">
                            <pre className="whitespace-pre-wrap font-mono text-xs text-white">{generatedPrompt}</pre>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
