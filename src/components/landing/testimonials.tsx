import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  {
    name: "Ana Silva",
    role: "Criadora de Conteúdo",
    result: "Criei meu primeiro e-book em 1 hora com o Clickify!",
    quote: "A ferramenta é incrivelmente intuitiva. Em menos de uma hora, eu tinha um produto digital pronto para vender. A IA me ajudou com a estrutura e até com a copy!",
    avatarId: "testimonial-avatar-1",
  },
  {
    name: "Bruno Costa",
    role: "Afiliado Digital",
    result: "Lancei 3 funis de alta conversão em uma semana.",
    quote: "O que eu levaria semanas para fazer, o Clickify fez em dias. A automação de funis é um divisor de águas para quem trabalha com lançamentos rápidos.",
    avatarId: "testimonial-avatar-2",
  },
  {
    name: "Carla Martins",
    role: "Empreendedora",
    result: "Monetizei meu conhecimento sem saber nada de marketing.",
    quote: "Eu tinha o conhecimento, mas não sabia como transformá-lo em um negócio. O Clickify me guiou do zero, desde a ideia até as primeiras vendas.",
    avatarId: "testimonial-avatar-3",
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Amado por criadores iniciantes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Veja o que nossos primeiros usuários estão dizendo.
          </p>
        </div>
        <div className="mt-12">
          <Carousel
            className="w-full max-w-5xl mx-auto"
            opts={{
              align: "start",
            }}
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => {
                const avatarImage = PlaceHolderImages.find(img => img.id === testimonial.avatarId);
                return (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card className="h-full flex flex-col">
                        <CardContent className="flex flex-col flex-grow items-start p-6">
                           <p className="text-2xl font-bold text-primary">“{testimonial.result}”</p>
                          <p className="mt-4 text-muted-foreground flex-grow">"{testimonial.quote}"</p>
                          <div className="mt-6 flex items-center gap-4">
                            <Avatar>
                              {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={testimonial.name} data-ai-hint={avatarImage.imageHint} />}
                              <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
