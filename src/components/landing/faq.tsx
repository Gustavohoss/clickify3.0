import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Preciso ter experiência com marketing digital?",
    answer: "Não, o Clickify foi desenhado para guiar você do zero absoluto. Nossos templates e a assistência da IA cuidam do trabalho pesado para que você possa focar em sua ideia.",
  },
  {
    question: "O app realmente cria o produto por mim?",
    answer: "A IA gera a estrutura do seu produto (ex: módulos de um curso), a copy de vendas e até materiais de suporte. Você revisa, ajusta e valida tudo antes de publicar. O controle final é sempre seu.",
  },
  {
    question: "Posso usar no celular?",
    answer: "Sim, a plataforma Clickify é 100% responsiva. Você pode criar e gerenciar seus produtos e funis de qualquer dispositivo, seja desktop ou mobile.",
  },
  {
    question: "Quais integrações estão disponíveis?",
    answer: "No plano Pro, você pode integrar com as principais plataformas de email marketing, gateways de pagamento e ferramentas de análise para potencializar seus resultados.",
  },
    {
    question: "Como funciona o suporte?",
    answer: "Oferecemos suporte via email para todos os planos. Usuários do plano Premium têm acesso a um canal de suporte prioritário e um mentor de IA dedicado para consultoria estratégica.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
            Perguntas Frequentes
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground md:text-xl">
            Ainda tem dúvidas? Aqui estão algumas respostas.
          </p>
        </div>
        <div className="mt-12 max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
