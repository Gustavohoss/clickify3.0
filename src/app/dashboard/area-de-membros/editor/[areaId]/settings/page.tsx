'use client';

import { useState, useEffect } from 'react';
import {
  Globe,
  Users,
  AlertTriangle,
  Settings,
  ArrowRight,
  Upload,
  List,
  Plus,
  Link,
  Trash2,
  BarChart2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useDoc, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { Switch } from '@/components/ui/switch';

type MenuItem = {
  id: number;
  icon: string;
  name: string;
  url: string;
};

const NavItem = ({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className={cn(
      'flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors',
      active
        ? 'bg-primary/10 text-primary'
        : 'text-muted-foreground hover:bg-muted/50'
    )}
  >
    {icon}
    <span>{label}</span>
    {active && <ArrowRight className="ml-auto h-4 w-4" />}
  </button>
);

export default function WorkspaceSettingsPage() {
  const { areaId } = useParams() as { areaId: string };
  const firestore = useFirestore();
  const { toast } = useToast();

  const areaRef = useMemoFirebase(
    () => (firestore && areaId ? doc(firestore, 'memberAreas', areaId) : null),
    [firestore, areaId]
  );
  const { data: areaData, isLoading } = useDoc(areaRef);

  const [activeTab, setActiveTab] = useState('general');
  const [workspaceName, setWorkspaceName] = useState('');
  const [supportEmail, setSupportEmail] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#6366F1');
  const [logoUrl, setLogoUrl] = useState('');
  const [commentsEnabled, setCommentsEnabled] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);


  useEffect(() => {
    if (areaData) {
      setWorkspaceName(areaData.name || '');
      setSupportEmail(areaData.supportEmail || '');
      setPrimaryColor(areaData.primaryColor || '#6366F1');
      setLogoUrl(areaData.logoUrl || '');
      setMenuItems(areaData.menuItems || []);
    }
  }, [areaData]);
  
  const addMenuItem = (name: string, url: string, icon: string) => {
    const newItem: MenuItem = {
      id: Date.now(),
      icon: icon,
      name: name,
      url: url,
    };
    setMenuItems([...menuItems, newItem]);
  };
  
  const updateMenuItem = (id: number, field: keyof MenuItem, value: string) => {
    setMenuItems(
      menuItems.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const deleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id));
  };


  const handleSave = async () => {
    if (!areaRef) return;
    try {
      await updateDoc(areaRef, {
        name: workspaceName,
        supportEmail,
        primaryColor,
        logoUrl,
        commentsEnabled,
        menuItems,
      });
      toast({ title: 'Sucesso!', description: 'Configurações salvas.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Erro!',
        description: 'Não foi possível salvar as configurações.',
      });
    }
  };

  const navItems = [
    { id: 'general', icon: <Settings className="h-5 w-5" />, label: 'Geral' },
    { id: 'domains', icon: <Globe className="h-5 w-5" />, label: 'Domínios' },
    { id: 'members', icon: <Users className="h-5 w-5" />, label: 'Membros' },
    {
      id: 'danger',
      icon: <AlertTriangle className="h-5 w-5" />,
      label: 'Zona de perigo',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
      <div className="md:col-span-1">
        <Card className="p-4">
          <h2 className="text-xl font-bold">Workspace</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Gerencie as informações de conta, dados pessoais e assinaturas
          </p>
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                active={activeTab === item.id}
                onClick={() => setActiveTab(item.id)}
              />
            ))}
          </nav>
        </Card>
      </div>

      <div className="space-y-8 md:col-span-3">
        <Card>
          <div className="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Logo do workspace</h3>
              <p className="text-sm text-muted-foreground">
                Faça upload de um logo para seu workspace.
              </p>
            </div>
            <div className="flex h-24 w-24 items-center justify-center rounded-lg bg-muted/50">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt="Logo"
                  width={96}
                  height={96}
                  className="object-contain"
                />
              ) : (
                <Upload className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
          </div>
        </Card>

        <Card>
          <div className="grid grid-cols-1 items-center gap-6 p-6 md:grid-cols-2">
            <div>
              <Label htmlFor="workspaceName">Nome do workspace</Label>
              <Input
                id="workspaceName"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold">Área de Membros</h3>
          <p className="text-sm text-muted-foreground">
            Configure a aparência e funcionalidades da sua área de membros
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <Label htmlFor="memberAreaName">Nome da Área de Membros</Label>
              <Input
                id="memberAreaName"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Este nome será exibido no cabeçalho e título do navegador da sua
                área de membros
              </p>
            </div>
            <div>
              <Label htmlFor="supportEmail">Email de Suporte</Label>
              <Input
                id="supportEmail"
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                Endereço de email que será exibido para suporte aos membros
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold">Aparência</h3>
          <p className="text-sm text-muted-foreground">
            Personalize a aparência visual da sua área de membros
          </p>
          <div className="mt-6 space-y-6">
            <div>
              <Label>Cor Principal</Label>
              <div className="mt-2 flex items-center gap-2">
                <div
                  className="h-10 w-10 rounded-md border"
                  style={{ backgroundColor: primaryColor }}
                />
                <Input
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-32"
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Cor principal usada para botões, links e elementos destacados
              </p>
            </div>
            <div>
              <Label htmlFor="logoUrl">URL do Logo</Label>
              <Input
                id="logoUrl"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                className="mt-2"
              />
              <p className="mt-1 text-xs text-muted-foreground">
                URL do logo da sua organização (recomendado: 200x200px ou maior)
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold">Recursos</h3>
              <p className="text-sm text-muted-foreground">
                Ative ou desative recursos da área de membros.
              </p>
            </div>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Ativar Comentários</p>
                  <p className="text-sm text-muted-foreground">
                    Permitir que membros comentem em cursos e aulas
                  </p>
                </div>
                <Switch
                  checked={commentsEnabled}
                  onCheckedChange={setCommentsEnabled}
                />
              </div>
            </Card>
          </div>
        </Card>

        <Card className="p-6">
          <div>
            <h3 className="font-semibold">Menu de Navegação</h3>
            <p className="text-sm text-muted-foreground">
              Configure o menu de navegação da sua área de membros.
            </p>
          </div>
          <div className="mt-6 space-y-4">
            {menuItems.length === 0 ? (
              <div className="rounded-lg border-2 border-dashed border-border p-6 text-center">
                <List className="mx-auto h-8 w-8 text-muted-foreground" />
                <h4 className="mt-4 font-semibold">Nenhum item de menu ainda</h4>
                <p className="mt-1 text-sm text-muted-foreground">
                  Adicione itens de menu para criar navegação para sua área de membros.
                </p>
                <Button variant="outline" className="mt-6" onClick={() => addMenuItem('Dashboard', '/dashboard', '📊')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Primeiro
                </Button>
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  <Button variant="outline" onClick={() => addMenuItem('Dashboard', '/dashboard', '📊')}>Dashboard</Button>
                  <Button variant="outline" onClick={() => addMenuItem('Meus Cursos', '/my-courses', '📚')}>Meus Cursos</Button>
                  <Button variant="outline" onClick={() => addMenuItem('Comunidade', '/community', '👥')}>Comunidade</Button>
                  <Button variant="outline" onClick={() => addMenuItem('Suporte', '/support', '❓')}>Suporte</Button>
                </div>
              </div>
            ) : (
              <div className='space-y-4'>
                {menuItems.map((item, index) => (
                  <div key={item.id} className='space-y-3 rounded-lg border p-4'>
                     <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className='h-8 w-8 text-xl'>
                        {item.icon}
                      </Button>
                      <Input
                        value={item.name}
                        onChange={(e) => updateMenuItem(item.id, 'name', e.target.value)}
                        placeholder="Nome do item"
                        className="h-8"
                      />
                      <div className="relative flex items-center">
                        <Link className="absolute left-2 h-4 w-4 text-muted-foreground" />
                        <Input
                          value={item.url}
                          onChange={(e) => updateMenuItem(item.id, 'url', e.target.value)}
                          placeholder="/slug"
                          className="h-8 pl-8"
                        />
                      </div>
                      <Input value={`# ${index + 1}`} readOnly className="h-8 w-16 text-center" />
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteMenuItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Visualização:</Label>
                      <div className="mt-1 flex items-center gap-3 rounded-md bg-muted/50 p-3">
                         <span className="text-xl">{item.icon}</span>
                         <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.url}</p>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
                 <Button variant="outline" className="w-full" onClick={() => addMenuItem('Novo Item', '/', '⭐')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Adicionar Item do Menu
                </Button>
              </div>
            )}
             <p className="text-xs text-muted-foreground text-center">
                Arraste os itens para reordenar &middot; Os itens de menu aparecerão na navegação da sua área de membros
            </p>
          </div>
        </Card>
        
        <div className="flex justify-end">
          <Button onClick={handleSave}>
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
}
