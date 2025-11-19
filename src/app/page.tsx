
import { Button } from "@/components/ui/button";
import { SparklesCore } from "@/components/ui/sparkles";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div className="h-screen w-full bg-background flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="relative z-20 max-w-4xl px-4 text-center">
          <h1 className="md:text-5xl text-3xl lg:text-7xl font-bold text-white">
            <span className="text-primary">Automatize suas</span>{' '}
            <span className="text-primary">vendas online</span> e saia na{' '}
            <span className="text-primary">frente de 97% dos</span>{' '}
            <span className="text-primary">concorrentes!</span>
          </h1>
          <p className="mt-6 text-lg text-neutral-300">
            A Clickify te dá tudo: funil pronto, área de membros, afiliados e ferramentas completas para vender online.
          </p>
        </div>
        <div className="w-full h-full absolute inset-0">
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
        <div className="relative z-20 mt-8">
            <Link href="/signup">
                <Button>Começar Agora</Button>
            </Link>
        </div>
      </div>
    </main>
  );
}
