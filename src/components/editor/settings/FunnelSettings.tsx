'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Globe, Bot, Pencil, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Funnel } from '../types.tsx';
import { Textarea } from '@/components/ui/textarea.tsx';

type SettingsCategory = 'geral' | 'dominio' | 'scripts' | 'seo' | 'webhook';

const categories = [
  { id: 'geral', label: 'GERAL' },
  { id: 'dominio', label: 'DOMÍNIO' },
  { id: 'scripts', label: 'SCRIPTS E PIXEL' },
  { id: 'seo', label: 'SEO' },
  { id: 'webhook', label: 'WEBHOOK' },
];

const GeneralSettings = ({ funnel }: { funnel: Funnel }) => (
    <div>
        <h2 className="text-xl font-bold text-white mb-4">Geral</h2>
         <Card className="bg-gray-800/50 border-gray-700 p-6 text-white">
            <div className="space-y-4">
                <div>
                    <label htmlFor="funnel-name" className="text-sm font-medium text-gray-400">Nome do Funil</label>
                    <Input id="funnel-name" defaultValue={funnel.name} className="mt-1 bg-gray-900 border-gray-600"/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-green-400">
                        <Globe size={16} />
                        <span className="text-sm font-medium">Publicado</span>
                    </div>
                    <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700">Tornar rascunho</Button>
                </div>
                 <div>
                    <label htmlFor="funnel-slug" className="text-sm font-medium text-gray-400">URL</label>
                    <div className="flex items-center mt-1">
                        <span className="px-3 py-2 bg-gray-700 border border-r-0 border-gray-600 rounded-l-md text-sm text-gray-400">clickify.com/</span>
                        <Input id="funnel-slug" defaultValue="meu-funil" className="bg-gray-900 border-gray-600 rounded-l-none"/>
                        <Button variant="ghost" size="icon" className="ml-2 text-gray-400"><Pencil size={16}/></Button>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Bot size={16}/>
                    <p>Este funil foi feito na Clickify</p>
                </div>
            </div>
        </Card>
        <Card className="bg-gray-800/50 border-gray-700 p-6 mt-6">
            <div className='flex items-center justify-between'>
                <div>
                    <h3 className='text-white font-semibold'>Compartilhar página</h3>
                    <p className='text-sm text-gray-400'>Qualquer pessoa com o link pode visualizar esta página.</p>
                </div>
                <Button variant="outline" className="text-gray-300 border-gray-600 hover:bg-gray-700 gap-2">
                    <Share2 size={16}/>
                    Copiar Link
                </Button>
            </div>
        </Card>
        <div className="mt-8 pt-8 border-t border-gray-700">
            <h3 className="text-lg font-semibold text-red-500">Zona de Perigo</h3>
            <Card className="bg-transparent border-red-500/30 mt-4 p-4 flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-white">Excluir este funil</h4>
                    <p className="text-sm text-gray-400">Depois de excluir um funil, não há como voltar atrás. Por favor, tenha certeza.</p>
                </div>
                <Button variant="destructive">Excluir Funil</Button>
            </Card>
        </div>
    </div>
)

const DomainSettings = () => (
    <div>
        <h2 className="text-xl font-bold text-white mb-4">Domínio</h2>
        <Card className="bg-gray-800/50 border-gray-700 p-6 text-white">
            <p className="text-gray-400">Configurações de domínio em breve.</p>
        </Card>
    </div>
)

const ScriptsSettings = ({ funnel }: { funnel: Funnel }) => (
    <div>
        <h2 className="text-xl font-bold text-white mb-4">Scripts e Pixel</h2>
        <Card className="bg-gray-800/50 border-gray-700 p-6 text-white">
            <div className="space-y-6">
                <div>
                    <label htmlFor="head-script" className="text-base font-semibold text-white">Head</label>
                    <p className="text-sm text-gray-400 mb-2">Este código será carregado antes do fechamento da tag &lt;/head&gt;</p>
                    <Textarea id="head-script" placeholder="" className="mt-1 bg-gray-900 border-gray-600 min-h-[120px] font-mono text-sm" />
                </div>
                <div>
                    <label htmlFor="body-script" className="text-base font-semibold text-white">Body</label>
                    <p className="text-sm text-gray-400 mb-2">Este código será carregado logo após a tag &lt;body&gt;</p>
                    <Textarea id="body-script" placeholder="" className="mt-1 bg-gray-900 border-gray-600 min-h-[120px] font-mono text-sm" />
                </div>
                <div>
                    <label htmlFor="footer-script" className="text-base font-semibold text-white">Footer</label>
                    <p className="text-sm text-gray-400 mb-2">Este código será carregado antes do fechamento da tag &lt;/body&gt;</p>
                    <Textarea id="footer-script" placeholder="" className="mt-1 bg-gray-900 border-gray-600 min-h-[120px] font-mono text-sm" />
                </div>
            </div>
        </Card>
    </div>
);


const SeoSettings = () => (
    <div>
        <h2 className="text-xl font-bold text-white mb-4">SEO</h2>
        <Card className="bg-gray-800/50 border-gray-700 p-6 text-white">
            <p className="text-gray-400">Configurações de SEO em breve.</p>
        </Card>
    </div>
)
const WebhookSettings = () => (
    <div>
        <h2 className="text-xl font-bold text-white mb-4">Webhook</h2>
        <Card className="bg-gray-800/50 border-gray-700 p-6 text-white">
            <p className="text-gray-400">Configurações de Webhook em breve.</p>
        </Card>
    </div>
)


export function FunnelSettings({ funnel }: { funnel: Funnel }) {
    const [activeCategory, setActiveCategory] = useState<SettingsCategory>('geral');

    const renderContent = () => {
        switch(activeCategory) {
            case 'geral': return <GeneralSettings funnel={funnel} />;
            case 'dominio': return <DomainSettings />;
            case 'scripts': return <ScriptsSettings funnel={funnel} />;
            case 'seo': return <SeoSettings />;
            case 'webhook': return <WebhookSettings />;
            default: return null;
        }
    }

    return (
        <div className="flex-1 flex bg-gray-900 text-gray-200">
            <aside className="w-64 border-r border-gray-700 p-6">
                <nav className="space-y-2">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id as SettingsCategory)}
                            className={cn(
                                "w-full text-left px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                activeCategory === cat.id
                                    ? "bg-gray-700 text-white"
                                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                            )}
                        >
                            {cat.label}
                        </button>
                    ))}
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {renderContent()}
            </main>
        </div>
    )
}
