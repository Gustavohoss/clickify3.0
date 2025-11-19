
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Header } from "@/components/landing/header";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import React from 'react';

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
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero-mockup');

  return (
    <main className="dark">
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

       <Header />
      <div className="relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md pt-32 pb-20">
        <div className="relative z-20 max-w-4xl px-4 text-center">
           <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body">
            <span className="text-primary">Automatize suas vendas online</span> e saia na frente de 97% dos <span className="text-primary">concorrentes!</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300 max-w-2xl mx-auto">
            A Clickify te dá tudo: funil pronto, área de membros, afiliados e ferramentas completas para vender online.
          </p>
        </div>
        
        <div className="relative z-20 mt-12 flex flex-col items-center gap-4">
            <Image
              src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/lgxma7645moftyw430ecl8d3?v=1763537206143"
              alt="Clickify Logo"
              width={80}
              height={80}
              className="h-20 w-20 mb-8"
            />
            <Button size="lg" className="w-64 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full">Assinar agora</Button>
            <Button variant="outline" size="lg" className="w-64 h-14 text-lg bg-transparent border-primary text-primary hover:bg-primary/10 rounded-full">Ver Planos</Button>
            <Button variant="link" className="text-neutral-300">Conheça Área de Membros</Button>
        </div>

      </div>
      
      <div className="py-20 bg-black text-white text-center">
        <h2 className="text-4xl font-bold">
            Aulas <span className="text-primary">Premium</span> e <span className="text-primary">Exclusivas</span>
        </h2>
        <div className="mt-8 relative aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10">
          <video
            src="https://s3.typebot.io/public/workspaces/clh2omgfr000008ju0g6zjgj6/typebots/clhe9f9x3000708jnf263884e/videos/video_1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>

       <div className="py-20 bg-black">
        <div className="container mx-auto text-center">
          <h2 className="text-sm font-semibold uppercase text-gray-400 tracking-wider">
            PARCEIROS OFICIAIS
          </h2>
          <div className="mt-8 flex justify-center items-center gap-8 md:gap-12 flex-wrap">
            {partners.map((partner, index) => (
              partner && <Image key={index} src={partner.imageUrl} alt={partner.description} width={158} height={48} className="h-8 object-contain" />
            ))}
          </div>
        </div>
      </div>

      <footer className="relative h-40 w-full overflow-hidden bg-black flex items-center justify-center">
          <MovingRibbon />
          <MovingRibbon reverse />
      </footer>
    </main>
  );
}
