
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
import { Wand2, Copy, Sparkles, Brain, Cog, Palette, MousePointerClick, FileText, Cpu, Layout, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';

type FormData = {
    // Module 1
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

    // Module 3
    uiLibrary: string;
    borderRadius: string;
    shadowStyle: string;
    iconography: string;

    // Module 4
    microInteractions: string[];
    pageTransitions: string;
    loadingStates: string;
    scrollBehavior: string;

    // Module 5
    toneOfVoice: string;
    language: string;
    seoFeatures: string[];

    // Module 6
    techStack: string;
    stateManagement: string;
    formHandling: string;

    // Module 7
    responsiveApproach: string;
    layoutStructure: string;
};

const initialFormData: FormData = {
    niche: '', otherNiche: '', businessModel: '', targetAudienceAge: '', targetAudienceProfile: '', mainGoal: '',
    authType: 'none', socialLogins: [], accessLevels: [], crudOperations: '', dataDeletion: 'soft', searchAndFilter: '', paymentIntegrations: [], apiIntegrations: [],
    uiLibrary: 'shadcn', borderRadius: 'slight', shadowStyle: 'flat', iconography: 'lucide',
    microInteractions: [], pageTransitions: 'instant', loadingStates: 'spinner', scrollBehavior: 'default',
    toneOfVoice: 'friendly', language: 'pt-br', seoFeatures: [],
    techStack: 'next', stateManagement: 'context', formHandling: 'rhf-zod',
    responsiveApproach: 'mobile-first', layoutStructure: 'top-nav',
};


const moduleIcons = {
    '1': <Brain />, '2': <Cog />, '3': <Palette />, '4': <MousePointerClick />,
    '5': <Languages />, '6': <Cpu />, '7': <Layout />
};

export default function PromptBuilderPage() {
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>(initialFormData);

    const handleMultiSelectChange = (field: keyof FormData, value: string) => {
        setFormData(prev => {
            const currentValues = (prev[field] as string[]) || [];
            const newValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            return { ...prev, [field]: newValues };
        });
    };

    const generatedPrompt = useMemo(() => {
        let prompt = `**Ato:** Aja como um especialista em engenharia de software, design de produtos e UX/UI.

**Tarefa:** Crie a estrutura completa e o código para um aplicativo com as seguintes especificações detalhadas, seguindo a arquitetura e as decisões de design abaixo.

---

### Módulo 1: O Cérebro do Negócio (Estratégia)
*   **Nicho/Ramo de Atuação:** ${formData.niche === 'outro' ? formData.otherNiche : formData.niche || '[Não definido]'}
*   **Modelo de Negócio (Monetização):** ${formData.businessModel || '[Não definido]'}
*   **Público-Alvo (Persona):** Perfil ${formData.targetAudienceProfile || '[Não definido]'}, faixa etária ${formData.targetAudienceAge || '[Não definido]'}.
*   **Objetivo Principal da Tela:** ${formData.mainGoal || '[Não definido]'}

### Módulo 2: Funcionalidades (Backend & Lógica)
*   **Autenticação (Login):** ${formData.authType === 'none' ? 'Nenhuma autenticação necessária.' : `Sistema de ${formData.authType}.`}
    ${formData.socialLogins.length > 0 ? `*   **Login Social:** Habilitar login com ${formData.socialLogins.join(', ')}.` : ''}
    ${formData.accessLevels.length > 0 ? `*   **Níveis de Acesso:** Implementar perfis de ${formData.accessLevels.join(', ')}.` : ''}
*   **Gerenciamento de Dados (CRUD):** ${formData.crudOperations || 'Nenhuma operação CRUD especificada.'}
    *   **Exclusão de Dados:** Implementar ${formData.dataDeletion === 'soft' ? 'Soft Delete (marcar como inativo)' : 'Hard Delete (exclusão permanente)'}.
*   **Busca e Filtros:** ${formData.searchAndFilter || 'Funcionalidades de busca/filtro não especificadas.'}
*   **Integrações Externas (APIs):**
    ${formData.paymentIntegrations.length > 0 ? `*   **Pagamentos:** Integrar com ${formData.paymentIntegrations.join(', ')}.` : ''}
    ${formData.apiIntegrations.length > 0 ? `*   **Outras APIs:** Integrar com ${formData.apiIntegrations.join(', ')}.` : ''}

### Módulo 3: O Design System (UI Granular)
*   **Biblioteca de Componentes:** Utilizar **${formData.uiLibrary}**.
*   **Raio da Borda (Border Radius):** Estilo ${formData.borderRadius} (e.g., 4px/8px para 'Slightly Rounded').
*   **Sombreamento e Profundidade:** Estilo de sombra **${formData.shadowStyle}**.
*   **Iconografia:** Utilizar a biblioteca **${formData.iconography}**.

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

### Módulo 6: A Tecnologia (Tech Stack)
*   **Framework:** **${formData.techStack === 'next' ? 'Next.js' : 'React + Vite'}.**
*   **Gerenciamento de Estado:** **${formData.stateManagement}**.
*   **Formulários:** **${formData.formHandling}**.

### Módulo 7: Layout e Responsividade
*   **Abordagem:** **${formData.responsiveApproach}**.
*   **Estrutura de Layout:** **${formData.layoutStructure}**.

---

**Requisitos Técnicos Adicionais:**
*   **Frontend:** React com TypeScript.
*   **Estilização:** Tailwind CSS.
*   **Componentes:** Crie componentes reutilizáveis e bem organizados.
*   **Qualidade:** O código deve ser limpo, performático e seguir as melhores práticas de desenvolvimento. Se a autenticação for necessária, use Firebase ou Supabase e crie rotas protegidas.

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
            <UILabel>Nicho/Ramo de Atuação</UILabel>
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
            {formData.niche === 'outro' && <Input placeholder="Especifique o nicho" value={formData.otherNiche} onChange={(e) => setFormData({...formData, otherNiche: e.target.value})} />}
            
            <UILabel>Modelo de Negócio (Monetização)</UILabel>
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

            <UILabel>Público-Alvo (Persona)</UILabel>
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

            <UILabel>Objetivo Principal da Tela</UILabel>
            <Input placeholder="Ex: Converter o usuário em cliente" value={formData.mainGoal} onChange={(e) => setFormData({...formData, mainGoal: e.target.value})} />
        </div>
    );
    
    const renderModule2 = () => (
         <div className="space-y-4">
            <UILabel>Autenticação (Login)</UILabel>
            <Select value={formData.authType} onValueChange={(v) => setFormData({...formData, authType: v})}>
                <SelectTrigger><SelectValue placeholder="Tipo de autenticação" /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="none">Nenhuma</SelectItem>
                    <SelectItem value="simple">Área de Membros Simples</SelectItem>
                    <SelectItem value="saas">App Completo (SaaS)</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                </SelectContent>
            </Select>
            {formData.authType !== 'none' && (
                <div className="space-y-4 pl-4 border-l-2 border-muted">
                    <UILabel>Opções de Autenticação</UILabel>
                    <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Login Social</h4>
                        {['Google', 'GitHub', 'Apple'].map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`social-${p}`} checked={formData.socialLogins.includes(p)} onCheckedChange={() => handleMultiSelectChange('socialLogins', p)} /><Label htmlFor={`social-${p}`}>{p}</Label></div>)}
                    </div>
                     <div className="space-y-2">
                        <h4 className="font-semibold text-sm">Níveis de Acesso</h4>
                        {['Admin', 'Editor', 'Usuário Comum'].map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`level-${p}`} checked={formData.accessLevels.includes(p)} onCheckedChange={() => handleMultiSelectChange('accessLevels', p)} /><Label htmlFor={`level-${p}`}>{p}</Label></div>)}
                    </div>
                </div>
            )}
             <UILabel>Integrações Externas (APIs)</UILabel>
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Pagamentos</h4>
                {['Stripe', 'PayPal', 'Mercado Pago'].map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`payment-${p}`} checked={formData.paymentIntegrations.includes(p)} onCheckedChange={() => handleMultiSelectChange('paymentIntegrations', p)} /><Label htmlFor={`payment-${p}`}>{p}</Label></div>)}
            </div>
             <div className="space-y-2">
                <h4 className="font-semibold text-sm">Outras APIs</h4>
                {['Google Maps', 'OpenAI', 'Mailchimp'].map(p => <div key={p} className="flex items-center space-x-2"><Checkbox id={`api-${p}`} checked={formData.apiIntegrations.includes(p)} onCheckedChange={() => handleMultiSelectChange('apiIntegrations', p)} /><Label htmlFor={`api-${p}`}>{p}</Label></div>)}
            </div>
        </div>
    );

    const renderModule3 = () => (
        <div className="space-y-4">
             <UILabel>Biblioteca de Componentes</UILabel>
             <Select value={formData.uiLibrary} onValueChange={(v) => setFormData({...formData, uiLibrary: v})}>
                 <SelectTrigger><SelectValue /></SelectTrigger>
                 <SelectContent>
                     <SelectItem value="shadcn">Shadcn/ui</SelectItem>
                     <SelectItem value="chakra">Chakra UI</SelectItem>
                     <SelectItem value="mui">Material UI</SelectItem>
                     <SelectItem value="radix">Radix Primitives</SelectItem>
                 </SelectContent>
             </Select>
            <UILabel>Raio de Borda (Border Radius)</UILabel>
            <Select value={formData.borderRadius} onValueChange={(v) => setFormData({...formData, borderRadius: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="sharp">Sharp (Quadrado)</SelectItem>
                    <SelectItem value="slight">Slightly Rounded (Padrão)</SelectItem>
                    <SelectItem value="full">Fully Rounded (Pill)</SelectItem>
                </SelectContent>
            </Select>
            <UILabel>Sombreamento e Profundidade</UILabel>
            <Select value={formData.shadowStyle} onValueChange={(v) => setFormData({...formData, shadowStyle: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="flat">Flat (Sem sombra)</SelectItem>
                    <SelectItem value="neuromorphism">Neuromorfismo</SelectItem>
                    <SelectItem value="glassmorphism">Glassmorphism</SelectItem>
                    <SelectItem value="colored-shadows">Sombras Coloridas</SelectItem>
                </SelectContent>
            </Select>
            <UILabel>Iconografia</UILabel>
             <Select value={formData.iconography} onValueChange={(v) => setFormData({...formData, iconography: v})}>
                 <SelectTrigger><SelectValue /></SelectTrigger>
                 <SelectContent>
                     <SelectItem value="lucide">Lucide React (Outline)</SelectItem>
                     <SelectItem value="fontawesome">FontAwesome (Filled)</SelectItem>
                     <SelectItem value="heroicons">HeroIcons (Duotone)</SelectItem>
                 </SelectContent>
             </Select>
        </div>
    );

    const renderModule4 = () => (
        <div className="space-y-4">
            <UILabel>Micro-interações</UILabel>
            <div className="space-y-2">
                {["Feedback tátil/visual em botões", "Validação de inputs em tempo real", "Confetti ao completar tarefa"].map(item => (
                    <div key={item} className="flex items-center space-x-2">
                        <Checkbox id={`micro-${item}`} checked={formData.microInteractions.includes(item)} onCheckedChange={() => handleMultiSelectChange('microInteractions', item)} />
                        <Label htmlFor={`micro-${item}`}>{item}</Label>
                    </div>
                ))}
            </div>
            <UILabel>Transições de Página</UILabel>
            <Select value={formData.pageTransitions} onValueChange={(v) => setFormData({...formData, pageTransitions: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="instant">Instantâneo</SelectItem>
                    <SelectItem value="fade">Fade in/out</SelectItem>
                    <SelectItem value="slide">Slide lateral</SelectItem>
                </SelectContent>
            </Select>
            <UILabel>Carregamento (Loading States)</UILabel>
            <Select value={formData.loadingStates} onValueChange={(v) => setFormData({...formData, loadingStates: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="spinner">Spinner clássico</SelectItem>
                    <SelectItem value="skeleton">Skeleton Screens</SelectItem>
                    <SelectItem value="progress-bar">Barra de progresso</SelectItem>
                </SelectContent>
            </Select>
            <UILabel>Comportamento de Scroll</UILabel>
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
    );

    const renderModule5 = () => (
        <div className="space-y-4">
             <UILabel>Tom de Voz</UILabel>
            <Select value={formData.toneOfVoice} onValueChange={(v) => setFormData({...formData, toneOfVoice: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Profissional e Acadêmico">Profissional e Acadêmico</SelectItem>
                    <SelectItem value="Amigável e Casual">Amigável e Casual</SelectItem>
                    <SelectItem value="Entusiasmado e Vendedor">Entusiasmado e Vendedor</SelectItem>
                    <SelectItem value="Minimalista e Direto">Minimalista e Direto</SelectItem>
                </SelectContent>
            </Select>
            <UILabel>Idioma e Localização</UILabel>
            <Select value={formData.language} onValueChange={(v) => setFormData({...formData, language: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="pt-br">Português (Brasil)</SelectItem>
                    <SelectItem value="en-us">Inglês (EUA)</SelectItem>
                    <SelectItem value="multi-language">Multi-idioma (i18n)</SelectItem>
                </SelectContent>
            </Select>
             <UILabel>Recursos de SEO</UILabel>
            <div className="space-y-2">
                {["Gerar meta-tags automaticamente", "Usar tags semânticas (H1, H2) para acessibilidade"].map(item => (
                    <div key={item} className="flex items-center space-x-2">
                        <Checkbox id={`seo-${item}`} checked={formData.seoFeatures.includes(item)} onCheckedChange={() => handleMultiSelectChange('seoFeatures', item)} />
                        <Label htmlFor={`seo-${item}`}>{item}</Label>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderModule6 = () => (
         <div className="space-y-4">
             <UILabel>Framework Principal</UILabel>
            <Select value={formData.techStack} onValueChange={(v) => setFormData({...formData, techStack: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="vite">React + Vite</SelectItem>
                </SelectContent>
            </Select>
             <UILabel>Gerenciamento de Estado</UILabel>
            <Select value={formData.stateManagement} onValueChange={(v) => setFormData({...formData, stateManagement: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="context">React Context</SelectItem>
                    <SelectItem value="zustand">Zustand</SelectItem>
                    <SelectItem value="redux">Redux Toolkit</SelectItem>
                    <SelectItem value="tanstack-query">TanStack Query</SelectItem>
                </SelectContent>
            </Select>
            <UILabel>Formulários</UILabel>
            <Select value={formData.formHandling} onValueChange={(v) => setFormData({...formData, formHandling: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="rhf-zod">React Hook Form + Zod</SelectItem>
                    <SelectItem value="formik">Formik</SelectItem>
                    <SelectItem value="native">Formulários nativos com state</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );

    const renderModule7 = () => (
        <div className="space-y-4">
             <UILabel>Abordagem de Responsividade</UILabel>
            <Select value={formData.responsiveApproach} onValueChange={(v) => setFormData({...formData, responsiveApproach: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="mobile-first">Mobile-First</SelectItem>
                    <SelectItem value="desktop-first">Desktop-First</SelectItem>
                    <SelectItem value="fully-responsive">Totalmente Responsivo</SelectItem>
                </SelectContent>
            </Select>
            <UILabel>Estrutura de Layout</UILabel>
            <Select value={formData.layoutStructure} onValueChange={(v) => setFormData({...formData, layoutStructure: v})}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="sidebar-fixed">Sidebar Fixa (Esquerda)</SelectItem>
                    <SelectItem value="top-nav">Navbar no Topo</SelectItem>
                    <SelectItem value="off-canvas">Menu Gaveta (Off-canvas)</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );

    const modules = [
        { title: 'O Cérebro do Negócio (Estratégia)', content: renderModule1, icon: moduleIcons['1'] },
        { title: 'Funcionalidades (Backend & Lógica)', content: renderModule2, icon: moduleIcons['2'] },
        { title: 'Design System (UI Granular)', content: renderModule3, icon: moduleIcons['3'] },
        { title: 'Experiência do Usuário (UX & Motion)', content: renderModule4, icon: moduleIcons['4'] },
        { title: 'Conteúdo e SEO (Copywriting)', content: renderModule5, icon: moduleIcons['5'] },
        { title: 'Tecnologia (Tech Stack)', content: renderModule6, icon: moduleIcons['6'] },
        { title: 'Layout e Responsividade', content: renderModule7, icon: moduleIcons['7'] }
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
                                                {module.icon} Módulo {index + 1}: {module.title}
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
