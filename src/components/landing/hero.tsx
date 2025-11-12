import Image from "next/image";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find((img) => img.id === "hero-mockup");

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
       <div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] sm:w-[100%] sm:h-[100%] rounded-full bg-primary/10 blur-[100px] -z-10"
        style={{
          background:
            "radial-gradient(circle at center, hsla(var(--primary) / 0.1), transparent 40%)",
        }}
       />
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-xl text-center md:text-left">
            <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Comece no Marketing Digital com a ajuda da IA.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Crie seu produto, monte seu funil e construa sua presença online em minutos.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
              <Button size="lg" className="shadow-lg shadow-primary/20 hover:scale-105 transition-transform" asChild>
                <Link href="/signup">Começar Agora</Link>
              </Button>
              <Button size="lg" variant="ghost">
                Testar Grátis
              </Button>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-2xl">
             {heroImage && (
              <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                width={1000}
                height={800}
                className="rounded-xl shadow-2xl"
                data-ai-hint={heroImage.imageHint}
                priority
              />
            )}
             <div className="absolute inset-0 -z-10 bg-accent/20 blur-3xl rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
