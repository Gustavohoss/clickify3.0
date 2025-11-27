'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  ShoppingBag,
  Milestone,
  Users,
  BarChart,
  Settings,
  LogOut,
  Package,
  BookUser,
  FileX,
  Download,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/landing/logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/firebase';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/produtos', label: 'Produtos Para Vender', icon: ShoppingBag },
  { href: '/dashboard/vitrine-funis', label: 'Vitrine de Funis', icon: Package },
  { href: '/dashboard/area-de-membros', label: 'Área de Membros', icon: BookUser },
  { href: '/dashboard/funis', label: 'Funis', icon: Milestone },
  { href: '/dashboard/remover-meta-dados', label: 'Remover metadados', icon: FileX },
  { href: '/dashboard/baixar-video', label: 'Baixar Vídeo', icon: Download },
  { href: '/dashboard/configuracoes', label: 'Configurações', icon: Settings },
];

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <aside className={cn("hidden md:flex flex-col w-64 bg-card border-r", className)}>
      <div className="p-4 border-b">
        <Logo />
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => (
          <Button
            key={link.href}
            asChild
            variant={pathname.startsWith(link.href) && (link.href !== '/dashboard' || pathname === '/dashboard') ? 'secondary' : 'ghost'}
            className="w-full justify-start"
          >
            <Link href={link.href}>
              <link.icon className="mr-2 h-4 w-4" />
              {link.label}
            </Link>
          </Button>
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          Sair da Conta
        </Button>
      </div>
    </aside>
  );
}
