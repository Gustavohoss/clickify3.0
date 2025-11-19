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
       <Header />
       <style jsx global>{`
        @keyframes slide {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
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
              <Button size="lg" className="w-64 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full">Assinar agora</Button>
              <Button variant="outline" size="lg" className="w-64 h-14 text-lg bg-transparent border-primary text-primary hover:bg-primary/10 rounded-full">Ver Planos</Button>
            </div>
        </div>

      </div>

      <SocialProof />
      <LessonsCarousel />

      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <div className="inline-block bg-gray-800 text-gray-300 rounded-full px-6 py-2 mb-6 border border-gray-700">
            <p className="font-semibold">Preços - Planos flexíveis</p>
          </div>
          <h2 className="text-4xl lg:text-5xl text-white font-body max-w-3xl mx-auto">
            Escolha o plano ideal para você. Comece seu negócio com a liberdade de crescer ainda mais.
          </h2>
        </div>
      </section>

    </main>
  );
}
