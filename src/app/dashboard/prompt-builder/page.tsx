
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Wand2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PromptBuilderPage() {
  const { toast } = useToast();
  const [appName, setAppName] = useState('');
  const [appType, setAppType] = useState('');
  const [audience, setAudience] = useState('');
  const [features, setFeatures] = useState('');
  const [monetization, setMonetization] = useState('');
  const [style, setStyle] = useState('');
  const [generatedPrompt, setGeneratedPrompt] = useState('');

  useEffect(() => {
    const prompt = `
**Ato:** Aja como um especialista em desenvolvimento de software e design de produtos digitais.

**Tarefa:** Crie a estrutura completa e o código para um aplicativo com as seguintes especificações:

**1. Nome do Aplicativo:**
${appName || "[Ainda não definido]"}

**2. Tipo de Aplicativo:**
${appType || "[Ainda não definido]"}

**3. Público-alvo:**
${audience || "[Ainda não definido]"}

**4. Principais Funcionalidades:**
${features ? features.split('\n').map(f => `- ${f}`).join('\n') : "- [Ainda não definidas]"}

**5. Modelo de Monetização:**
${monetization || "[Ainda não definido]"}

**6. Estilo Visual e UX:**
${style || "[Ainda não definido]"}

**Requisitos Técnicos:**
- **Frontend:** Use Next.js com React e TypeScript.
- **Estilização:** Use Tailwind CSS e componentes ShadCN para uma UI moderna e responsiva.
- **Componentes:** Crie componentes reutilizáveis e bem organizados.
- **Qualidade:** O código deve ser limpo, performático e seguir as melhores práticas de desenvolvimento.

**Saída Esperada:**
Gere todos os arquivos de código necessários, incluindo estrutura de pastas, componentes, páginas e estilos, prontos para serem usados.
    `.trim();
    setGeneratedPrompt(prompt);
  }, [appName, appType, audience, features, monetization, style]);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    toast({
      title: 'Prompt Copiado!',
      description: 'O prompt foi copiado para sua área de transferência.',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline flex items-center gap-2">
          <Wand2 className="h-8 w-8" />
          Criador de Prompts para Lovable
        </h1>
        <p className="mt-2 text-muted-foreground">
          Construa um prompt detalhado para criar seu aplicativo na plataforma Lovable.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Aplicativo</CardTitle>
            <CardDescription>Preencha as informações abaixo para gerar seu prompt.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="appName">Nome do App</Label>
              <Input id="appName" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="Ex: Clickify" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="appType">Tipo de App</Label>
              <Select value={appType} onValueChange={setAppType}>
                <SelectTrigger id="appType">
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Site Institucional">Site Institucional</SelectItem>
                  <SelectItem value="E-commerce">E-commerce</SelectItem>
                  <SelectItem value="Aplicativo Mobile">Aplicativo Mobile</SelectItem>
                  <SelectItem value="Sistema Web (SaaS)">Sistema Web (SaaS)</SelectItem>
                  <SelectItem value="Blog">Blog</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="audience">Público-alvo</Label>
              <Input id="audience" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Ex: Empreendedores digitais" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="features">Principais Funcionalidades (uma por linha)</Label>
              <Textarea id="features" value={features} onChange={(e) => setFeatures(e.target.value)} placeholder="- Criar funis de venda\n- Gerenciar produtos\n- Área de membros" className="min-h-[120px]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="monetization">Modelo de Monetização</Label>
              <Select value={monetization} onValueChange={setMonetization}>
                <SelectTrigger id="monetization">
                  <SelectValue placeholder="Selecione o modelo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Assinatura Mensal/Anual">Assinatura Mensal/Anual</SelectItem>
                  <SelectItem value="Compra Única">Compra Única</SelectItem>
                  <SelectItem value="Anúncios">Anúncios</SelectItem>
                  <SelectItem value="Freemium">Freemium</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="style">Estilo Visual</Label>
              <Input id="style" value={style} onChange={(e) => setStyle(e.target.value)} placeholder="Ex: Moderno, minimalista, com cores escuras" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Prompt Gerado</CardTitle>
                <CardDescription>Copie e cole este prompt na plataforma Lovable.</CardDescription>
              </div>
              <Button variant="outline" size="icon" onClick={handleCopyPrompt}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Textarea 
              readOnly
              value={generatedPrompt}
              className="w-full h-[600px] bg-gray-800/50 text-white font-mono text-sm"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
