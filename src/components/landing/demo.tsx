import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const demoImages = [
  PlaceHolderImages.find((img) => img.id === "demo-screen-1"),
  PlaceHolderImages.find((img) => img.id === "demo-screen-2"),
  PlaceHolderImages.find((img) => img.id === "demo-screen-3"),
  PlaceHolderImages.find((img) => img.id === "demo-screen-4"),
].filter(Boolean);

export function Demo() {
  return (
    <section id="demo" className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Veja o Clickify em Ação
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Navegue pelas telas e descubra como é fácil criar e lançar com IA.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            className="w-full max-w-4xl mx-auto"
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {demoImages.map((image, index) => image && (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <CardContent className="p-0">
                      <Image
                        src={image.imageUrl}
                        alt={image.description}
                        width={1200}
                        height={800}
                        className="aspect-[3/2] w-full object-cover"
                        data-ai-hint={image.imageHint}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
        <div className="mt-12 text-center">
            <Button size="lg">Ver Demo Interativa</Button>
        </div>
      </div>
    </section>
  );
}
