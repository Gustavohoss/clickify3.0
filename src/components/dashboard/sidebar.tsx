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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/landing/logo';
import { cn } from '@/lib/utils';
import { useAuth } from '@/firebase';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/dashboard/produtos', label: 'Produtos', icon: ShoppingBag },
  { href: '/dashboard/funis', label: 'Funis', icon: Milestone },
  { href: '/dashboard/social', label: 'Social', icon: Users },
  { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart },
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
            variant={pathname === link.href ? 'secondary' : 'ghost'}
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
