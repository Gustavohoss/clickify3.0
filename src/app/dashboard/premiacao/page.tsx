
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, CheckCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import { useUser, useDoc, useMemoFirebase, doc, useFirestore } from '@/firebase';
import { differenceInDays, parseISO } from 'date-fns';
import { Progress } from '@/components/ui/progress';

type UserData = {
  createdAt: string; // ISO string date
};

export default function PremiacaoPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const userDocRef = useMemoFirebase(() => (user && firestore ? doc(firestore, 'users', user.uid) : null), [user, firestore]);
  const { data: userData } = useDoc<UserData>(userDocRef);

  const daysAsMember = userData?.createdAt ? differenceInDays(new Date(), parseISO(userData.createdAt)) : 0;
  const progressTo7Days = Math.min((daysAsMember / 7) * 100, 100);
  const hasAchieved7Days = daysAsMember >= 7;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline flex items-center gap-3">
          <Trophy className="h-8 w-8 text-primary" />
          Programa de Premiação
        </h1>
        <p className="mt-2 text-muted-foreground">
          Sua jornada de sucesso merece ser reconhecida. Conquiste prêmios exclusivos!
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pulseira 7D</CardTitle>
          <CardDescription>O símbolo da sua dedicação inicial. Concedido após 7 dias como membro ativo.</CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-square w-full max-w-sm mx-auto">
                 <Image 
                    src="https://s3.typebot.io/public/workspaces/cmin0v9k5001cl404bcq7x2qj/typebots/cmin0visp0001l704z3ncv1yg/blocks/wy7wp7ti2bxdxwqhuu1vch8p?v=1764956144895" 
                    alt="Pulseira de Premiação Clickify" 
                    layout="fill"
                    objectFit="contain"
                 />
            </div>
            <div className="space-y-4">
                <Card className="bg-background/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                            {hasAchieved7Days ? <CheckCircle className="text-green-500" /> : <Clock className="text-yellow-500" />}
                            Status da Conquista
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {hasAchieved7Days ? (
                            <div className="space-y-2">
                                <p className="font-semibold text-green-400">Parabéns! Você desbloqueou a Pulseira 7D.</p>
                                <p className="text-sm text-muted-foreground">Você provou seu comprometimento inicial. Este é apenas o começo da sua jornada de sucesso.</p>
                                <Button className="mt-2">Resgatar sua pulseira</Button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <p className="font-semibold">Faltam {7 - daysAsMember} dia(s) para você conquistar sua pulseira!</p>
                                 <div className="space-y-1">
                                    <Progress value={progressTo7Days} />
                                    <p className="text-xs text-muted-foreground text-right">{daysAsMember} de 7 dias</p>
                                 </div>
                                <p className="text-sm text-muted-foreground">Continue focado! Sua recompensa está próxima.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
