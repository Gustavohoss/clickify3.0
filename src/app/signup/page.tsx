
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
import { useAuth, useFirestore, doc, setDoc } from '@/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import { Logo } from '@/components/landing/logo';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'O nome deve ter pelo menos 2 caracteres.' }),
  email: z.string().email({ message: 'Por favor, insira um e-mail válido.' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
  confirmPassword: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres.' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

export default function SignupPage() {
  const { toast } = useToast();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!firestore) {
        toast({
            variant: 'destructive',
            title: 'Erro',
            description: 'Não foi possível conectar ao banco de dados.',
        });
        return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const user = userCredential.user;

      const nameParts = values.name.split(' ');
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(' ');
      
      const isAdmin = user.email === 'Clickify@adm.com';

      // Save user info to Firestore
      const userDocRef = doc(firestore, "users", user.uid);
      await setDoc(userDocRef, {
        id: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        createdAt: new Date().toISOString(),
        planId: isAdmin ? 'vitalicio' : '',
        isAdmin: isAdmin,
        balance: 0,
        simulateRevenue: true, 
      });


      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Você será redirecionado para o login.',
      });
      router.push('/login');
    } catch (error: any) {
        let description = 'Ocorreu um erro ao criar a conta.';
        if (error.code === 'auth/email-already-in-use') {
            description = 'Este e-mail já está em uso.';
        }
        toast({
            variant: 'destructive',
            title: 'Erro no cadastro',
            description,
        });
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
            <Logo />
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col p-6 space-y-1">
                <h3 className="font-semibold tracking-tight text-2xl">Crie sua conta</h3>
                <p className="text-sm text-muted-foreground">
                    Já tem uma conta?{' '}
                    <Link href="/login" className="underline">
                        Faça login
                    </Link>
                </p>
            </div>
            <div className="p-6 pt-0">
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Nome Completo</FormLabel>
                          <FormControl>
                              <Input placeholder="Seu nome" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormDescription>
                            Coloque o Email que foi realizado a compra
                          </FormDescription>
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
                                <Input type={showPassword ? 'text' : 'password'} placeholder="********" {...field} />
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
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Confirmar Senha</FormLabel>
                          <div className="relative">
                            <FormControl>
                                <Input type={showConfirmPassword ? 'text' : 'password'} placeholder="********" {...field} />
                            </FormControl>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute top-1/2 right-2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                                onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                {showConfirmPassword ? <EyeOff /> : <Eye />}
                             </Button>
                          </div>
                          <FormMessage />
                          </FormItem>
                      )}
                    />
                    <Button type="submit" className="w-full">
                        Criar conta
                    </Button>
                </form>
                </Form>
            </div>
        </div>
      </div>
    </div>
  );
}
