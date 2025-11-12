import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/landing/logo";
import { Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

const socialLinks = [
  { icon: <Twitter className="h-5 w-5" />, href: "#" },
  { icon: <Github className="h-5 w-5" />, href: "#" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#" },
];

const footerLinks = [
    { title: "Termos", href: "/terms" },
    { title: "Privacidade", href: "/privacy" },
    { title: "Contato", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/50">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-2">
            <div>
                 <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Pronto para lançar seu negócio digital?</h2>
                 <p className="mt-4 text-muted-foreground">Crie sua conta gratuita agora e comece a construir seu futuro.</p>
                 <div className="mt-6">
                    <Button size="lg" className="shadow-lg shadow-primary/20" asChild>
                      <Link href="/signup">Começar Agora</Link>
                    </Button>
                 </div>
            </div>
            <div className="space-y-4 rounded-lg bg-muted/50 p-6">
                <h3 className="text-lg font-bold">Receba 5 ideias de conteúdo grátis</h3>
                <p className="text-muted-foreground">Assine nossa newsletter para receber dicas de IA para marketing digital.</p>
                <form className="flex w-full max-w-sm items-center space-x-2">
                    <Input type="email" placeholder="seu@email.com" />
                    <Button type="submit">Assinar</Button>
                </form>
            </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-6">
            <Logo />
             <div className="flex gap-4">
                {footerLinks.map(link => (
                    <Link key={link.title} href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                        {link.title}
                    </Link>
                ))}
             </div>
           </div>
           <div className="flex items-center gap-4">
             <div className="flex items-center gap-2">
                {socialLinks.map((link, i) => (
                    <Link key={i} href={link.href} className="text-muted-foreground hover:text-foreground">
                        {link.icon}
                        <span className="sr-only">Social media link</span>
                    </Link>
                ))}
             </div>
             <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} LaunchMe. Todos os direitos reservados.</p>
           </div>
        </div>

      </div>
    </footer>
  );
}
