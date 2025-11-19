'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import React from 'react';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { BGPattern } from "@/components/ui/bg-pattern";
import { Header } from "@/components/landing/header";
import FallingNotifications from "@/components/landing/falling-notifications";

const partners = [
  PlaceHolderImages.find(p => p.id === 'shopee-logo'),
  PlaceHolderImages.find(p => p.id === 'mercado-livre-logo'),
  PlaceHolderImages.find(p => p.id === 'bling-logo'),
  PlaceHolderImages.find(p => p.id === 'magalu-logo'),
  PlaceHolderImages.find(p => p.id === 'perfectpay-logo'),
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


export default function Home() {

  return (
    <main className="dark">
       <Header />
       <style jsx global>{`
        @keyframes slide {
          from { transform: translateX(-33.33%); }
          to { transform: translateX(0); }
        }
        @keyframes slide-reverse {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
        .animate-slide {
          animation: slide 20s linear infinite;
        }
        .animate-slide-reverse {
          animation: slide-reverse 20s linear infinite;
        }
      `}</style>

      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md pt-32 pb-20">
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
        
        <div className="relative z-20 mt-12 flex flex-col items-center gap-4 w-full">
            <div className="w-full max-w-5xl px-4 md:px-8">
                <Image
                  src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/ewcazkwlemjkynkyhtz2tkoy?v=1763539211986"
                  alt="Dashboard"
                  width={1200}
                  height={900}
                  className="w-full h-auto rounded-lg border-2 border-primary/20 shadow-2xl shadow-primary/10 mb-8"
                />
            </div>
            <Button size="lg" className="w-64 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full">Assinar agora</Button>
            <Button variant="outline" size="lg" className="w-64 h-14 text-lg bg-transparent border-primary text-primary hover:bg-primary/10 rounded-full">Ver Planos</Button>
            <Button variant="link" className="text-neutral-300">Conheça Área de Membros</Button>
        </div>

      </div>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto max-w-sm h-[600px] rounded-2xl overflow-hidden">
            <Image
              src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/mmudllxka9yrr0ypf1lpqfdh?v=1763540792561"
              alt="Smartphone"
              layout="fill"
              objectFit="contain"
              className="z-0"
            />
            <div className="absolute inset-0 z-10">
              <FallingNotifications />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
