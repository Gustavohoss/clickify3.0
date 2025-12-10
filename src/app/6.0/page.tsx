
// GABRIEL
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BGPattern } from "@/components/ui/bg-pattern";
import { Header } from "@/components/landing/header";
import SocialProof from "@/components/landing/social-proof";
import { LessonsCarousel } from "@/components/landing/lessons-carousel";
import { NewPricingCard } from "@/components/ui/new-pricing-card";

const partners = [
  PlaceHolderImages.find(p => p.id === 'kiwify-logo'),
  PlaceHolderImages.find(p => p.id === 'perfectpay-logo'),
  PlaceHolderImages.find(p => p.id === 'hotmart-logo'),
  PlaceHolderImages.find(p => p.id === 'monetizze-logo'),
  PlaceHolderImages.find(p => p.id === 'braip-logo'),
  PlaceHolderImages.find(p => p.id === 'kirvano-logo'),
].filter(Boolean);

const MovingRibbon = ({ reverse = false }: { reverse?: boolean }) => (
  <div className={`absolute h-12 w-[300%] -rotate-[25deg] bg-primary flex items-center justify-center gap-12 text-black font-semibold text-lg ${reverse ? "animate-slide-reverse" : "animate-slide"}`}>
    {Array(10).fill(null).map((_, i) => (
      <React.Fragment key={i}>
        <span>Nuxdrop.io</span>
        <span className="text-primary-foreground/50">&#10003;</span>
        <span>Typebot</span>
        <span className="text-primary-foreground/50">&#10003;</span>
        <span>PerfectPay</span>
        <span className="text-primary-foreground/50">&#10003;</span>
        <span>Cakto</span>
        <span className="text-primary-foreground/50">&#10003;</span>
      </React.Fragment>
    ))}
  </div>
);

const InfiniteMovingLogos = () => {
    const logosWithDuplicates = [...partners, ...partners];
    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]">
            <div className="flex animate-slide w-max">
                {logosWithDuplicates.map((logo, index) => (
                    <div key={`${logo!.id}-${index}`} className="w-32 h-16 flex items-center justify-center mx-4">
                        <Image
                            src={logo!.imageUrl}
                            alt={logo!.description}
                            width={100}
                            height={40}
                            className="object-contain"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};


export default function Home() {

  return (
    <main className="dark">
       <Header isLinkDisabled={true} />
       <style jsx global>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden pt-32 pb-20">
        <BGPattern variant="grid" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="relative z-20 max-w-4xl px-4 text-center">
           <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body">
            <span className="text-primary">Automatize suas vendas online</span> e saia na frente de 97% dos <span className="text-primary">concorrentes!</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
            A Clickify te dá tudo: funil pronto, área de membros, afiliados e ferramentas completas para vender online.
          </p>
        </div>
        
        <div className="relative z-20 mt-12 flex flex-col items-center gap-8 w-full max-w-5xl px-4 md:px-8">
            <Image
              src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/ewcazkwlemjkynkyhtz2tkoy?v=1763539211986"
              alt="Dashboard"
              width={1200}
              height={900}
              className="w-full h-auto rounded-lg border-2 border-primary/20 shadow-2xl shadow-primary/10 mb-4"
            />
            <InfiniteMovingLogos />
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
              <Button asChild size="lg" className="w-64 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full">
                <Link href="#pricing">Assinar agora</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-64 h-14 text-lg bg-transparent border-primary text-primary hover:bg-primary/10 rounded-full">
                <Link href="#pricing">Ver Planos</Link>
              </Button>
            </div>
        </div>

      </div>

      <SocialProof />
      <LessonsCarousel />

      <section id="pricing" className="relative overflow-hidden bg-background text-foreground pt-10 pb-20 text-center scroll-mt-20">
        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
            <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body">
              <span className="text-primary">Escolha o plano ideal para você.</span> Comece seu negócio com a liberdade de <span className="text-primary">crescer ainda mais.</span>
            </h1>
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8 mt-20">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <NewPricingCard
                    title="Plano Mensal"
                    subtitle="Para pequenas empresas"
                    price="R$ 149,90"
                    priceSuffix="/mês"
                    features={[
                        "Criar funis com limite de 1 funil por categoria",
                        "Criar 1 área de membros",
                        "Criar landing pages, quizzes e fluxos estilo Typebot",
                        "Conectar 1 gateway de pagamento",
                        "Afiliação limitada a apenas 1 produto",
                        "Suporte básico"
                    ]}
                    isFeatured={false}
                    checkoutUrl="https://pay.cakto.com.br/37k4xrc"
                />
                <NewPricingCard
                    title="Plano Ilimitado"
                    subtitle="Para crescer sem limites"
                    price="R$ 249,90"
                    features={[
                        "Criar até 5 funis por categoria",
                        "Criar áreas de membros ilimitadas",
                        "Conectar gateways de pagamento ilimitados",
                        "Afiliação a produtos ilimitada",
                        "Suporte prioritário",
                        "Todas as atualizações incluídas"
                    ]}
                    isFeatured={true}
                    checkoutUrl="https://pay.cakto.com.br/37k4xrc_658280"
                />
            </div>
        </div>
      </section>

    </main>
  );
}
