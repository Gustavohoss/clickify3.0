
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
import { Wand2, Copy, Sparkles, Brain, Cog, Palette, MousePointerClick, FileText, Cpu, Layout, Languages, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type FormData = {
    // Step 1
    projectType: string;
    niche: string;
    otherNiche: string;
    targetAudienceProfile: string;
    mainGoal: string;

    // Step 2
    visualStyle: {
        borderRadius: string;
        shadowStyle: string;
        iconography: string;
    };
    
    // Step 3
    authNeeded: boolean;
    functionalities: string[];
};

const initialFormData: FormData = {
    projectType: '',
    niche: '', otherNiche: '', targetAudienceProfile: '', mainGoal: '',
    visualStyle: { borderRadius: 'slight', shadowStyle: 'flat', iconography: 'lucide' },
    authNeeded: false,
    functionalities: [],
};


export default function PromptBuilderPage() {
    const { toast } = useToast();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [currentStep, setCurrentStep] = useState(1);

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
    
    const nextStep = () => setCurrentStep(prev => (prev < 4 ? prev + 1 : prev));
    const prevStep = () => setCurrentStep(prev => (prev > 1 ? prev - 1 : prev));

    const generatedPrompt = useMemo(() => {
        let prompt = `**Ato:** Aja como um especialista em engenharia de software, design de produtos e UX/UI.

**Tarefa:** Crie a estrutura completa e o código para o seguinte projeto:

**Tipo de Projeto:** ${formData.projectType || 'Não especificado (ex: "Um site para uma barbearia", "Uma landing page para um ebook")'}

---

### Módulo 1: O Cérebro do Negócio (Estratégia)
*   **Nicho/Ramo de Atuação:** ${formData.niche === 'outro' ? formData.otherNiche : formData.niche || '[Não definido]'}
*   **Público-Alvo (Persona):** ${formData.targetAudienceProfile || '[Não definido]'}.
*   **Objetivo Principal da Tela:** ${formData.mainGoal || '[Não definido]'}
`;

if (formData.authNeeded || formData.functionalities.length > 0) {
prompt += `
### Módulo 2: Funcionalidades (Lógica)
`;
}
if(formData.authNeeded) {
prompt += `*   **Autenticação (Login):** Implementar sistema de login e cadastro de usuários. Use Firebase Authentication para isso.
`;
}
if(formData.functionalities.length > 0) {
prompt += `*   **Funcionalidades Adicionais:** ${formData.functionalities.join(', ')}.
`;
}

prompt += `
### Módulo 3: O Design (Estilo Visual)
*   **Estilo Visual Geral:** Use componentes modernos da biblioteca **Shadcn/ui**.
*   **Cantos dos Elementos (Border Radius):** Estilo de cantos **${formData.visualStyle.borderRadius}** (Ex: 'slight' para levemente arredondado, 'sharp' para cantos retos).
*   **Sombreamento e Profundidade:** Estilo de sombra **${formData.visualStyle.shadowStyle}**.
*   **Iconografia:** Utilizar a biblioteca **${formData.visualStyle.iconography}**.
---

**Requisitos Técnicos Adicionais:**
*   **Tecnologia:** Next.js, React com TypeScript, e Tailwind CSS.
*   **Qualidade:** O código deve ser limpo, performático e seguir as melhores práticas de desenvolvimento.

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

    const renderStep1 = () => (
        <div className="space-y-6">
             <div>
                <Label>Qual o tipo de projeto você quer criar?</Label>
                <Input placeholder="Ex: Um app para barbearias, Uma landing page..." value={formData.projectType} onChange={(e) => setFormData({...formData, projectType: e.target.value})} />
            </div>
            <div>
                <Label>Qual o seu nicho ou ramo de atuação?</Label>
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
                <Label>Para quem é este projeto? (Público-alvo)</Label>
                <Select value={formData.targetAudienceProfile} onValueChange={(v) => setFormData({...formData, targetAudienceProfile: v})}>
                    <SelectTrigger><SelectValue placeholder="Selecione o perfil" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="B2B (Empresas)">Empresas (B2B)</SelectItem>
                        <SelectItem value="B2C (Consumidor Final)">Consumidor Final (B2C)</SelectItem>
                        <SelectItem value="Jovens (Geração Z)">Jovens (Geração Z)</SelectItem>
                        <SelectItem value="Adultos (Millennials)">Adultos (Millennials)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label>Qual o objetivo principal desta aplicação?</Label>
                <Input placeholder="Ex: Vender um produto, Capturar leads, Agendar um serviço" value={formData.mainGoal} onChange={(e) => setFormData({...formData, mainGoal: e.target.value})} />
            </div>
        </div>
    );
    
    const renderStep2 = () => {
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
          <div className="space-y-8">
            <div>
              <Label>Qual o estilo dos cantos dos elementos (botões, cards)?</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {options.borderRadius.map(opt => (
                  <button key={opt.value} onClick={() => handleVisualSelect('borderRadius', opt.value)} className={cn("p-1 rounded-md border-2", formData.visualStyle.borderRadius === opt.value ? 'border-primary' : 'border-border')}>
                    <Image src={opt.imgSrc} alt={opt.label} width={150} height={90} className="w-full h-auto rounded" />
                    <p className="text-xs mt-2 text-center font-medium">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Qual o estilo de sombreamento e profundidade?</Label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {options.shadowStyle.map(opt => (
                  <button key={opt.value} onClick={() => handleVisualSelect('shadowStyle', opt.value)} className={cn("p-1 rounded-md border-2", formData.visualStyle.shadowStyle === opt.value ? 'border-primary' : 'border-border')}>
                    <Image src={opt.imgSrc} alt={opt.label} width={150} height={90} className="w-full h-auto rounded" />
                    <p className="text-xs mt-2 text-center font-medium">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label>Qual o estilo dos ícones?</Label>
              <div className="grid grid-cols-2 gap-4 mt-2">
                {options.iconography.map(opt => (
                  <button key={opt.value} onClick={() => handleVisualSelect('iconography', opt.value)} className={cn("p-1 rounded-md border-2", formData.visualStyle.iconography === opt.value ? 'border-primary' : 'border-border')}>
                    <Image src={opt.imgSrc} alt={opt.label} width={150} height={90} className="w-full h-auto rounded" />
                    <p className="text-xs mt-2 text-center font-medium">{opt.label}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
    };

    const renderStep3 = () => {
        const functionalities = [
            { id: "Busca e Filtros", label: "Busca e Filtros", description: "Permite que usuários encontrem o que procuram." },
            { id: "Pagamentos", label: "Pagamentos", description: "Integração com Stripe, Mercado Pago, etc." },
            { id: "Mapas", label: "Integração com Mapas", description: "Exibir mapas e localizações." },
            { id: "Agendamentos", label: "Sistema de Agendamentos", description: "Para serviços, consultas, etc." },
        ];
        return (
            <div className="space-y-6">
                <div className="space-y-2">
                    <Label className="text-base font-semibold">Os usuários precisarão fazer login?</Label>
                    <p className="text-sm text-muted-foreground">Marque esta opção para criar uma área de membros, dashboard, ou qualquer funcionalidade que exija uma conta de usuário.</p>
                    <div className="flex items-center space-x-2 pt-2">
                        <Switch id="auth-needed" checked={formData.authNeeded} onCheckedChange={(checked) => setFormData(prev => ({...prev, authNeeded: checked}))} />
                        <Label htmlFor="auth-needed">Sim, precisa de sistema de login</Snapdragon>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label className="text-base font-semibold">Funcionalidades Adicionais</Label>
                    <p className="text-sm text-muted-foreground">Selecione outras funcionalidades que seu projeto precisa.</p>
                    <div className="space-y-3 pt-2">
                        {functionalities.map(item => (
                            <div key={item.id} className="flex items-start space-x-3">
                                <Checkbox id={item.id} checked={formData.functionalities.includes(item.id)} onCheckedChange={() => handleMultiSelectChange('functionalities', item.id)} className="mt-1" />
                                <div className="grid gap-1.5 leading-none">
                                    <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{item.label}</label>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
    
    const renderStep4 = () => (
        <div className="space-y-6">
            <div className="text-center">
                <Sparkles className="mx-auto h-12 w-12 text-primary" />
                <h2 className="text-2xl font-bold mt-4">Seu Prompt está Pronto!</h2>
                <p className="text-muted-foreground mt-2">Copie o prompt abaixo e cole na plataforma Lovable para começar a criar seu aplicativo.</p>
            </div>
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
                    <ScrollArea className="h-[40vh] rounded-md bg-gray-800/50 p-4">
                        <pre className="whitespace-pre-wrap font-mono text-xs text-white">{generatedPrompt}</pre>
                    </ScrollArea>
                </CardContent>
            </Card>
        </div>
    );
    
    const steps = [
        { number: 1, title: "Estratégia", content: renderStep1 },
        { number: 2, title: "Estilo Visual", content: renderStep2 },
        { number: 3, title: "Funcionalidades", content: renderStep3 },
        { number: 4, title: "Finalizar", content: renderStep4 },
    ]

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

            <Card className="w-full">
                <CardHeader>
                   <Progress value={(currentStep / steps.length) * 100} className="mb-4" />
                   <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <CardTitle>Passo {currentStep}: {steps[currentStep - 1].title}</CardTitle>
                            <CardDescription>Preencha os campos abaixo para gerar seu prompt.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}><ArrowLeft className="mr-2 h-4 w-4" /> Voltar</Button>
                            {currentStep < steps.length && (
                                <Button onClick={nextStep}>Próximo <ArrowRight className="ml-2 h-4 w-4" /></Button>
                            )}
                        </div>
                   </div>
                </CardHeader>
                <CardContent>
                    <div className="mt-6">
                        {steps[currentStep-1].content()}
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}

