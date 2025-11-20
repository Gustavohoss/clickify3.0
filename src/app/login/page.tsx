
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { Logo } from '@/components/landing/logo';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
});

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: 'Login bem-sucedido!',
        description: 'Você será redirecionado em breve.',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      let description = 'Ocorreu um erro ao fazer login.';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        description = 'E-mail ou senha inválidos.';
      }
      toast({
        variant: 'destructive',
        title: 'Erro de login',
        description: description,
      });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="flex flex-col p-6 space-y-1">
            <h3 className="font-semibold tracking-tight text-2xl">Acesse sua conta</h3>
            <p className="text-sm text-muted-foreground">
              Não tem uma conta?{' '}
              <Link href="/signup" className="underline">
                Cadastre-se
              </Link>
            </p>
          </div>
          <div className="p-6 pt-0">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Senha</FormLabel>
                       <div className="relative">
                        <FormControl>
                          <Input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="********"
                            {...field}
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                          onClick={() => setShowPassword((prev) => !prev)}
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Entrar
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
