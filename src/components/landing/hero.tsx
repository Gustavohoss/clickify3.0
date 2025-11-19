import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { SparklesCore } from "@/components/ui/sparkles";

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-mockup");

const partners = [
  { name: 'Shopee', imageUrl: 'https://cdn.worldvectorlogo.com/logos/shopee-1.svg', width: 80, height: 30 },
  { name: 'Mercado Livre', imageUrl: 'https://cdn.worldvectorlogo.com/logos/mercado-libre-1.svg', width: 120, height: 30 },
  { name: 'Bling', imageUrl: 'https://cdn.worldvectorlogo.com/logos/bling-1.svg', width: 80, height: 30 },
  { name: 'Magalu', imageUrl: 'https://cdn.worldvectorlogo.com/logos/magalu-1.svg', width: 100, height: 30 },
  { name: 'PerfectPay', imageUrl: 'https://perfectpay.com.br/images/logo-perfect-pay-branca.png', width: 120, height: 30 },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
       <div className="absolute inset-0 w-full h-full -z-10">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline max-w-4xl">
              Automatize suas <span className="text-primary">vendas online</span> e saia na frente de 97% dos concorrentes!
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              A Clickify é parceira oficial do Mercado Livre e diversos outros marketplaces.
            </p>
          
          <div className="mt-10 relative mx-auto w-full max-w-4xl">
             {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1000}
                height={800}
                className="rounded-xl shadow-2xl shadow-primary/10 border border-white/10"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
             <div className="absolute inset-0 -z-10 bg-primary/10 blur-3xl rounded-full" />
          </div>

          <div className="mt-12 w-full">
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {partners.map(partner => (
                <Image
                  key={partner.name}
                  src={partner.imageUrl}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-6 w-auto object-contain"
                />
              ))}
            </div>
          </div>
          
           <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="shadow-lg shadow-primary/20 hover:scale-105 transition-transform text-lg h-14 px-10 rounded-full" asChild>
                <Link href="/signup">Assinar agora</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg h-14 px-10 rounded-full">
                Ver Planos
              </Button>
            </div>
        </div>
      </div>
    </section>
  );
}
