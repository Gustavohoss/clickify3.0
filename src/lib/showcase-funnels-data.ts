

export type ShowcaseFunnelItem = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'typebot' | 'quiz';
  // This will hold the actual data for static funnels
  funnelData?: any; 
};

// Static showcase funnels that are always available and independent
export const staticShowcaseFunnels: ShowcaseFunnelItem[] = [
  {
    id: 'hvnSJgleQly13ArWja6f',
    name: 'TREINO PMT',
    description: 'Funil de Quiz para produto de emagrecimento.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/vq3dlad75ysvpgjpvjtqwuxl?v=1764147033314',
    type: 'quiz',
    // The actual funnel data is now stored here, making it independent
    funnelData: {
      name: "Treino PMT",
      type: "quiz",
      isPublished: true,
      primaryColor: "#a800a3",
      headerLogoType: "image",
      headerLogoValue: "https://cdn.xquiz.co/images/16de8a3e-71f4-47ed-9ca0-9598012496c8",
      steps: [
        {
          id: 1764118583199,
          name: "Etapa 1",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Chegou a Hora de Conquistar o Corpo que Sempre Sonhou!</h3><p style="text-align: center;">Tenha um plano de treino Totalmente Personalizado</p>` } },
            { id: 1764130748699, name: "Imagem", props: { imageSize: "full", imageUrl: "https://cdn.xquiz.co/images/1e463d88-b3a0-4534-a44d-68f896add2cd" } },
            { id: 1764131129979, name: "Botão", props: { backgroundColor: "#a80089", variant: "secondary" } },
            { id: 1764132202082, name: "Termos", isNew: true, props: { mainText: "Ao clicar em alguma das opções, você concorda com os", links: [ { id: 1764132202083, text: "Termos de utilização e serviço", url: "#", enabled: true }, { id: 1764132202084, text: "Política de privacidade", url: "#", enabled: true }, { id: 1764132202085, text: "Política de subscrição", url: "#", enabled: true }, { id: 1764132202086, text: "Política de cookies", url: "#", enabled: false } ] } }
          ]
        },
        {
          id: 1764132268848,
          name: "Etapa 2",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Escolha o seu objetivo principal</h3><p style="text-align: center;">Toque na opção abaixo</p>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764132302122, icon: "💁‍♀️", text: "Emagrecer " }, { id: 1764132302123, icon: "🙆‍♀️", text: "Definir o Corpo " }, { id: 1764132344258, icon: "🙅‍", text: "Ganhar Massa Muscular " } ] } }
          ]
        },
        {
          id: 1764132596356,
          name: "Etapa 3",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Como tá seu corpo atualmente? </h3><div style="text-align: center;">Toque na opção abaixo</div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764132302122, icon: "💁‍♀️", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/13d8aab3-992c-42b4-9ecd-c4e64029ea83", text: "Emagrecer " }, { id: 1764132302123, icon: "🙆‍♀️", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/1cf5de59-0e91-4ca9-94c5-509915dbc1f9", text: "Definir o Corpo " }, { id: 1764132344258, icon: "🙅‍", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/294a2f88-3015-437f-96ad-aa87f92d21e5", text: "Ganhar Massa Muscular " } ] } }
          ]
        },
        {
          id: 1764132862231,
          name: "Etapa 4",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Qual corpo você gostaria de Ter? </h3><div style="text-align: center;">Toque na opção abaixo.</div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764132302122, icon: "💁‍♀️", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/e4e3cca0-3812-4be6-a248-d9e3291f1f50", text: "Em forma" }, { id: 1764132302123, icon: "🙆‍♀️", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/61722fdc-bb8a-4c6a-9a57-3ed0654dd28b", text: "Definido" }, { id: 1764132344258, icon: "🙅‍", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/8a4f069a-e09e-497b-8d2f-9c3a231363a7", text: "Bem Definido" } ] } }
          ]
        },
        {
          id: 1764132995128,
          name: "Etapa 5",
          components: [
            { id: 1764130748699, name: "Imagem", props: { imageUrl: "https://cdn.xquiz.co/images/c3c02a6a-a027-460c-9fe6-669f9eebb066" } },
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Já mudamos a vida de mais de 2 milhões de mulheres ao Redor do mundo </h3><div>Vamos dar o nosso melhor para te ajudar a chegar no seu tão sonhado objetivo!</div><div> </div>` } },
            { id: 1764131129979, name: "Botão", props: { backgroundColor: "#a80089", variant: "secondary" } }
          ]
        },
        {
          id: 1764133043285,
          name: "Etapa 6",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Qual área mais lhe incomoda? </h3><div style="text-align: center;">Marque uma das opções abaixo</div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764132302122, icon: "💁‍♀️", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/ebdb9b66-d726-438f-a07d-839e023ea232", text: "Abdômen" }, { id: 1764132302123, icon: "🙆‍♀️", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/acac4e7f-5130-44e7-962b-143ba50cf42f", text: "Bumbum" }, { id: 1764132344258, icon: "🙅‍", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/bfbc5a6d-d7e1-4ba2-a428-45ba73333ca3", text: "Seios" }, { id: 1764133078244, icon: "💬", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/a731f5e2-8941-413e-9f7d-20406be329a7", text: "Pernas" } ] } }
          ]
        },
        {
          id: 1764133244127,
          name: "Etapa 7",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">O que lhe motiva a fazer exercício? </h3><div style="text-align: center;">Toque na opção abaixo</div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764132302122, icon: "🩺", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/ebdb9b66-d726-438f-a07d-839e023ea232", text: "Melhor Saúde " }, { id: 1764132302123, icon: "🛡️", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/acac4e7f-5130-44e7-962b-143ba50cf42f", text: "Fortalecimento do Sistema Imunológico " }, { id: 1764132344258, icon: "💁‍", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/bfbc5a6d-d7e1-4ba2-a428-45ba73333ca3", text: "Melhorar a Aparência " }, { id: 1764133078244, icon: "💪", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/a731f5e2-8941-413e-9f7d-20406be329a7", text: "Aumentar sua Força e Resistência " }, { id: 1764133286612, icon: "🔥", iconType: "emoji", text: "Aumentar sua Libido" } ] } }
          ]
        },
        {
          id: 1764133366502,
          name: "Etapa 8",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Você sabia que para ter grandes resultados, precisa de Treinos Personalizados? </h3><div style="text-align: center;">Toque na opção abaixo</div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764133397722, name: "Opções", props: { borderStyle: "gigante", shadowStyle: "grande", spacingStyle: "medio", opcoesItems: [ { id: 1764133397723, icon: "👍", text: "Sim" }, { id: 1764133397724, icon: "👎", text: "Não" } ] } },
            { id: 1764133653022, name: "Alerta", props: { backgroundColor: "#FEF3C7", borderColor: "#F59E0B", description: "Ter Treinos Personalizados pode fazer você evoluir 1 Ano de Academia em Apenas 30 Dias.", model: "warning", textColor: "#92400E", title: "Isso é muito importante" } }
          ]
        },
        {
          id: 1764133829177,
          name: "Etapa 9",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">A importância de ter Treinos Personalizados. </h3><div style="text-align: center;">Cada corpo é um único corpo, ao você seguir um treino Personalizado para você, seu corpo mudará completamente em algumas semanas.</div><div> </div>` } },
            { id: 1764130748699, name: "Imagem", props: { imageUrl: "https://cdn.xquiz.co/images/1e463d88-b3a0-4534-a44d-68f896add2cd" } },
            { id: 1764131129979, name: "Botão", props: { backgroundColor: "#a80089", variant: "secondary" } },
            { id: 1764133878632, name: "Alerta", props: { backgroundColor: "#FEF3C7", borderColor: "#F59E0B", description: "Vamos montar um Protocolo de Treinos Personalizados para você!", model: "warning", textColor: "#92400E", title: "Continue respondendo" } }
          ]
        },
        {
          id: 1764133913604,
          name: "Etapa 10",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Você pratica algum tipo de atividade física? </h3><div style="text-align: center;">Caminhada, corrida, musculação...</div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764132302122, icon: "💪", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/ebdb9b66-d726-438f-a07d-839e023ea232", text: "Sim, pratico todos os dias " }, { id: 1764132302123, icon: "🙅‍", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/acac4e7f-5130-44e7-962b-143ba50cf42f", text: "Algumas vezes por semana " }, { id: 1764132344258, icon: " 🚶", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/bfbc5a6d-d7e1-4ba2-a428-45ba73333ca3", text: "Poucas vezes por semana" }, { id: 1764133078244, icon: "😅", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/a731f5e2-8941-413e-9f7d-20406be329a7", text: "Raramente ou nunca " } ] } }
          ]
        },
        {
          id: 1764134243948,
          name: "Etapa 11",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Como você avalia a qualidade do seu sono hoje? </h3><div style="text-align: center;">Você consegue dormir bem?</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764132302122, icon: "😗", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/ebdb9b66-d726-438f-a07d-839e023ea232", text: "Boa, sempre durmo bem " }, { id: 1764132302123, icon: "😢", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/acac4e7f-5130-44e7-962b-143ba50cf42f", text: "Eu geralmente durmo bem " }, { id: 1764132344258, icon: "😫", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/bfbc5a6d-d7e1-4ba2-a428-45ba73333ca3", text: "Ruim, raramente durmo bem " } ] } }
          ]
        },
        {
          id: 1764134497831,
          name: "Etapa 12",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Qual foi a última vez que você esteve com seu peso ideal? </h3><div style="text-align: center;">Toque na opção abaixo</div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764132302122, icon: "🤔", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/ebdb9b66-d726-438f-a07d-839e023ea232", text: "Entre 0 e 6 Meses Atrás " }, { id: 1764132302123, icon: "😅", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/acac4e7f-5130-44e7-962b-143ba50cf42f", text: "De 7 a 12 Meses Atrás " }, { id: 1764132344258, icon: "🤭", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/bfbc5a6d-d7e1-4ba2-a428-45ba73333ca3", text: "Entre 1 e 3 Anos Atrás " }, { id: 1764133078244, icon: "🤐", iconType: "emoji", imageUrl: "https://cdn.xquiz.co/images/a731f5e2-8941-413e-9f7d-20406be329a7", text: "Há Mais de 3 Anos Atrás " }, { id: 1764133286612, icon: "🚫", iconType: "emoji", text: "Nunca " } ] } }
          ]
        },
        {
          id: 1764135982286,
          name: "Etapa 13",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Você sente que já tentou de tudo, todos os Treinos possíveis, mas por algum motivo, nunca teve os resultados que você deseja?</h3><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764133286612, icon: "👍", iconType: "emoji", text: "Sim" }, { id: 1764135991978, icon: "👎", iconType: "emoji", text: "Não" } ] } }
          ]
        },
        {
          id: 1764136098277,
          name: "Etapa 14",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Ao olhar seu corpo no espelho, você acredita que teve uma estagnação de resultados? </h3><div style="text-align: center;">(Você tem a impressão que seu corpo parou de evoluir)</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764133286612, icon: "😟", iconType: "emoji", text: "Tenho essa sensação" }, { id: 1764135991978, icon: "🤗", iconType: "emoji", text: " Não tenho essa sensação " } ] } }
          ]
        },
        {
          id: 1764136250045,
          name: "Etapa 15",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">E que tal você ter acesso a um Protocolo de Treinos Totalmente Personalizado feito para seu corpo por um Especialista(Personal Trainer)?</h3><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764133286612, icon: "😍", iconType: "emoji", text: "Quero " }, { id: 1764135991978, icon: "😻", iconType: "emoji", text: "É tudo que eu mais desejo neste momento " } ] } }
          ]
        },
        {
          id: 1764136420411,
          name: "Etapa 16",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Qual o seu nível de Atividade Física? </h3><div style="text-align: center;">Selecione as opções abaixo.</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764133286612, icon: "🌱", iconType: "emoji", text: "(Iniciante) Comecei a treinar há pouco tempo" }, { id: 1764135991978, icon: " 🏃", iconType: "emoji", text: "(Intermediário) Eu treinos de vez em quando" }, { id: 1764136449948, icon: " 🏋", iconType: "emoji", text: "(Avançado) Eu treino regularmente" } ] } }
          ]
        },
        {
          id: 1764136575005,
          name: "Etapa 17",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Você é uma pessoa sedentária?</h3><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764133286612, icon: "👍", iconType: "emoji", text: "Sim" }, { id: 1764135991978, icon: "👎", iconType: "emoji", text: "Não" } ] } }
          ]
        },
        {
          id: 1764136674216,
          name: "Etapa 18",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Qual seria sua reação se daqui a 30 dias seu corpo estivesse TOTALMENTE diferente? </h3><div style="text-align: center;">Toque na opção abaixo</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764133286612, icon: "🤩", iconType: "emoji", text: "Ficaria muito feliz " }, { id: 1764135991978, icon: "🌊", iconType: "emoji", text: " Se sentiria mais confortável na praia/piscina " }, { id: 1764136737992, icon: "💁‍", iconType: "emoji", text: "Vestiria roupas que gosto sem sentir vergonha " }, { id: 1764136747681, icon: "📱", iconType: "emoji", text: "Postaria belíssimas fotos nas Redes Sociais " }, { id: 1764136756354, icon: "⚡", iconType: "emoji", text: "Outro " } ] } }
          ]
        },
        {
          id: 1764136851831,
          name: "Etapa 19",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Sobre sua rotina de Treinos... </h3><div style="text-align: center;">Você já teve algum instrutor/personal que passou um Treino mas você não alcançou o Resultado que esperava?</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764133286612, icon: "👍", iconType: "emoji", text: "Sim" }, { id: 1764135991978, icon: "👎", iconType: "emoji", text: "Não" } ] } }
          ]
        },
        {
          id: 1764137003395,
          name: "Etapa 20",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">Você já ouviu falar no "Treinos PMT"? </h3><div style="text-align: center;">Toque na opção abaixo.</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764132302121, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764133286612, icon: "😍", iconType: "emoji", text: "Sim " }, { id: 1764135991978, icon: "🤗", iconType: "emoji", text: "Não " }, { id: 1764137031684, icon: "😱", iconType: "emoji", text: "Gostaria de Conhecer " } ] } }
          ]
        },
        {
          id: 1764137107989,
          name: "Etapa 21",
          components: [
            { id: 1764130626940, name: "Texto", props: { content: `<h3 style="text-align: center;">O que é o Treinos PMT? </h3><div style="text-align: center;">O Treinos PMT é o seu passaporte para alcançar o corpo dos seus sonhos! Este protocolo de treinos foi cuidadosamente elaborado para atender as necessidades únicas de cada mulher, proporcionando uma experiência de treino totalmente personalizada e eficaz. </div><div style="text-align: center;"><br></div><div style="text-align: center;">Como Funciona: Avaliação Personalizada; Entendemos suas metas, nível de condicionamento físico e preferências para criar um plano de treino exclusivo. </div><div style="text-align: center;"><br></div><div style="text-align: center;">Treinos Únicos: Cada sessão é desenhada para maximizar resultados, combinando exercícios inovadores e tradicionais que se ajustam ao seu ritmo e estilo de vida. </div><div style="text-align: center;"><br></div><div style="text-align: center;">Resultados Visíveis: Com consistência e dedicação, você verá e sentirá a transformação no seu corpo e autoestima.</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764137218908, name: "Texto", props: { content: `<h3 style="text-align: center;">Por que devo seguir o Treinos PMT? </h3><div style="text-align: center;">Nosso protocolo de Treinos vai além dos treinos comuns. Ele é uma jornada de autodescoberta e empoderamento, onde cada mulher é guiada para alcançar o seu máximo potencial físico.</div><div> </div>` } },
            { id: 1764138072103, name: "Lista 2.0", isNew: true, props: { title: "Com o Treinos PMT, você terá:", lista2Items: [ { id: 1764138072104, text: "Resultados Rápidos e Duradouros" }, { id: 1764138072105, text: "Maior Confiança e Autoestima" }, { id: 1764138072106, text: "Treinos Adaptáveis ao Seu Estilo de Vida" } ] } },
            { id: 1764138274477, name: "Imagem", props: { imageUrl: "https://cdn.xquiz.co/images/0c18d317-76da-4c04-a9ec-04d3f0d78e02" } },
            { id: 1764138303466, name: "Alerta", props: { backgroundColor: "#FEF3C7", borderColor: "#F59E0B", description: "Estamos quase finalizando, falta apenas mais algumas informações para montarmos o seu Treino Totalmente personalizado!", model: "warning", textColor: "#92400E", title: "Falta Pouco..." } },
            { id: 1764138370195, name: "Botão", props: { backgroundColor: "#d50bfe" } }
          ]
        },
        {
          id: 1764138401308,
          name: "Etapa 22",
          components: [
            { id: 1764138432293, name: "Espaçador", props: { height: 87 } },
            { id: 1764138425987, name: "Carregando", props: { duration: 7, loadingDescription: "Estamos analisando suas respostas...", loadingText: "Analisando..." } }
          ]
        },
        {
          id: 1764138541966,
          name: "Etapa 23",
          components: [
            { id: 1764138432293, name: "Espaçador", props: { height: 87 } },
            { id: 1764138425987, name: "Carregando", props: { autoSkip: true, duration: 7, loadingDescription: "Estamos analisando suas respostas...", loadingText: "Analisando..." } }
          ]
        },
        {
          id: 1764138612569,
          name: "Etapa 24",
          components: [
            { id: 1764138655862, name: "Nível", isNew: true, props: { nivelProgressColor: "#db29ff", nivelThumbColor: "#858585", nivelTrackColor: "#494a4b", subtitle: "Aprovado!", title: "Nível de Preparação", tooltipColor: "#8a10a2", tooltipTextColor: "#ffffff", value: 89 } },
            { id: 1764139254522, name: "Imagem", props: { imageSize: "small", imageUrl: "https://cdn.xquiz.co/images/2a49d00c-8d22-4305-8205-7a7828d9babd" } },
            { id: 1764138937949, name: "Gráfico Circular", isNew: true, props: { cardBackgroundColor: "#ffffff", progressColor: "#d046ec", textColor: "#000000", title: "SUA CHANCE DE TER O CORPO QUE TANTO DESEJA COM O TREINOS PMT", value: 100 } },
            { id: 1764139488905, name: "Botão", props: { backgroundColor: "#ee00ff" } },
            { id: 1764139468049, name: "Alerta", props: { backgroundColor: "#FEF3C7", borderColor: "#F59E0B", description: "De acordo com as suas respostas, você está totalmente pronto para começar", model: "warning", textColor: "#92400E", title: "Você está pronta!" } }
          ]
        },
        {
          id: 1764139507691,
          name: "Etapa 25",
          components: [
            { id: 1764139520183, name: "Texto", props: { content: `<h3 style="text-align: center;">Quanto tempo por dia você tem disponível para aplicar o Treinos PMT? </h3><div style="text-align: center;">Toque na opção abaixo.</div><div> </div>` } },
            { id: 1764139558313, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764139558314, icon: "", iconType: "emoji", text: "Menos de 1 hora" }, { id: 1764139558315, icon: "", iconType: "emoji", text: "De 1 a 2 horas" }, { id: 1764139564261, icon: "", iconType: "emoji", text: "Mais de 2 horas" } ] } }
          ]
        },
        {
          id: 1764139607613,
          name: "Etapa 26",
          components: [
            { id: 1764139520183, name: "Texto", props: { content: `<h3 style="text-align: center;">Quanto você anda diariamente? </h3><div style="text-align: center;">Toque na opção abaixo </div><div style="text-align: center;">Menos de 30 minutos </div><div style="text-align: center;">Menos de 1 hora </div><div style="text-align: center;">Mais de 1 hora</div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764139558313, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764139558314, icon: "", iconType: "emoji", text: "Menos de 30 minutos" }, { id: 1764139558315, icon: "", iconType: "emoji", text: "Menos de 1 hora" }, { id: 1764139564261, icon: "", iconType: "emoji", text: "Mais de 1 hora" } ] } }
          ]
        },
        {
          id: 1764139718518,
          name: "Etapa 27",
          components: [
            { id: 1764139520183, name: "Texto", props: { content: `<h3 style="text-align: center;">E qual horário você Treina? </h3><div style="text-align: center;">Toque na opção abaixo.</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764139558313, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764139558314, icon: "☀️", iconType: "emoji", text: "Manhã " }, { id: 1764139558315, icon: "⏳", iconType: "emoji", text: "Tarde " }, { id: 1764139564261, icon: "😱", iconType: "emoji", text: "Noite " } ] } }
          ]
        },
        {
          id: 1764139779559,
          name: "Etapa 28",
          components: [
            { id: 1764139520183, name: "Texto", props: { content: `<h3 style="text-align: center;">Escolha sua idade abaixo</h3><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764139558313, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764139558314, icon: "☀️", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/34ad8376-eafa-4e2d-8a6f-0c3afb618399", text: "18 a 29" }, { id: 1764139558315, icon: "⏳", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/b29dd05f-17a2-4369-beae-599ecdd9378d", text: "30 a 39" }, { id: 1764139564261, icon: "😱", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/87bd772e-bfe3-46ae-9c9a-ccc288f661fe", text: "40 a 49" }, { id: 1764139785794, icon: "💬", iconType: "image", imageUrl: "https://cdn.xquiz.co/images/0d4709e9-6fd1-4b7e-94c4-db8c6bbf9b74", text: "50 ou mais" } ] } }
          ]
        },
        {
          id: 1764139901943,
          name: "Etapa 29",
          components: [
            { id: 1764139520183, name: "Texto", props: { content: `<h3 style="text-align: center;">Seu Protocolo de Treinos Personalizados está quase pronto... </h3><div style="text-align: center;">Mas antes, me diga qual é a sua altura?</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764139558313, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764139948318, icon: "", iconType: "emoji", text: "Menos de 1 metro" }, { id: 1764139948796, icon: "", iconType: "emoji", text: "Entre 1 metro e 1 metro e meio" }, { id: 1764139949274, icon: "", iconType: "emoji", text: "Entre 1 metro e meio e 2 metros" }, { id: 1764139949773, icon: "", iconType: "emoji", text: " Mais de 2 metros" } ] } }
          ]
        },
        {
          id: 1764140017686,
          name: "Etapa 30",
          components: [
            { id: 1764139520183, name: "Texto", props: { content: `<h3 style="text-align: center;">Estamos quase lá... </h3><div style="text-align: center;">Porém eu gostaria de saber, você Realmente está disposta a aplicar os Treinos PMT e daqui a 30 dias ver seu corpo mudar completamente? </div><div><br></div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764139558313, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764139949773, icon: " 🔥", iconType: "emoji", text: "Sim, estou pronta" }, { id: 1764140065655, icon: "😍", iconType: "emoji", text: "Com certeza" } ] } }
          ]
        },
        {
          id: 1764140120024,
          name: "Etapa 31",
          components: [
            { id: 1764139520183, name: "Texto", props: { content: `<h3 style="text-align: center;">Você está pronta para seguir nosso Protocolo de Treinos Personalizado? </h3><div style="text-align: center;">Toque na opção abaixo.</div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div><div> </div>` } },
            { id: 1764139558313, name: "Opções", props: { shadowStyle: "grande", opcoesItems: [ { id: 1764139949773, icon: " 🔥", iconType: "emoji", text: "Sim, estou pronta" }, { id: 1764140065655, icon: "😍", iconType: "emoji", text: "Quero, Saber mais" } ] } }
          ]
        },
        {
          id: 1764140165260,
          name: "Etapa 32",
          components: [
            { id: 1764138432293, name: "Espaçador", props: { height: 87 } },
            { id: 1764138425987, name: "Carregando", props: { autoSkip: true, duration: 7, loadingDescription: "Estamos analisando suas respostas...", loadingText: "Analisando..." } }
          ]
        },
        {
          id: 1764140180521,
          name: "Etapa 33",
          components: [
            { id: 1764140202030, name: "Texto", props: { content: `<h3 style="text-align: center;">Seu plano de Treinos Exclusivo e Personalizados está pronto. </h3><div style="text-align: center;">Baseado nas suas respostas, criamos um plano personalizado para você.</div><div> </div>` } },
            { id: 1764140219309, name: "Gráficos", props: { barColor: "#991eeb", graficosItems: [ { id: 1764140219309, label: "7 DIAS", subtitle: "Vai se sentir mais disposta", title: "Início", value: 20 }, { id: 1764140219310, label: "15 DIAS", subtitle: "Seu corpo já se acostumou", title: "Durante", value: 45 }, { id: 1764140220850, label: "21 DIAS", subtitle: "Seu corpo mudou completamente", title: "Durante", value: 80 } ], graficosLayout: "3-cols" } },
            { id: 1764140599725, name: "Alerta", props: { backgroundColor: "#FEF3C7", borderColor: "#F59E0B", description: " Seu plano exclusivo está preparado, bora começar agora mesmo!", model: "warning", textColor: "#92400E", title: "Tudo pronto!" } },
            { id: 1764140612629, name: "Botão", props: { backgroundColor: "#c30de7" } }
          ]
        }
      ]
    }
  },
  {
    id: 'persuasao-typebot',
    name: 'Manual da persuasão',
    description: 'Técnicas reais de persuasão, influência e manipulação estratégica.',
    imageUrl: 'https://s3.typebot.io/public/workspaces/cma6gh1r00000wo0nne89p289/typebots/w3uutbahqxqiryefgp29v7zw/blocks/uqhagxtkix836yabhfratrvv?v=1764151628641',
    type: 'typebot',
    funnelData: {
        name: "Manual da persuasão",
        type: "typebot",
        isPublished: true,
        steps: [
            {
                id: 1764149231094,
                type: "group",
                position: { x: 393, y: -85 },
                children: [
                    { id: 1764149231093, type: "text", props: { content: "🧠 <strong>Olá! Se você está aqui, é porque quer aprender técnicas reais de persuasão, influência e manipulação estratégica.</strong> " } },
                    { id: 1764149593239, type: "logic-wait", props: { duration: 3 } },
                    { id: 1764149530677, type: "text", props: { content: "Não aquelas dicas genéricas que você encontra no YouTube. " } },
                    { id: 1764149599448, type: "logic-wait", props: { duration: 3 } },
                    { id: 1764149562861, type: "text", props: { content: "Estou falando de conteúdo profundo, oculto " } },
                    { id: 1764149607741, type: "logic-wait", props: { duration: 2 } },
                    { id: 1764149568896, type: "text", props: { content: "usado por pessoas que dominam a mente alheia como se fosse um jogo. " } },
                    { id: 1764149616623, type: "logic-wait", props: { duration: 2 } },
                    { id: 1764149577974, type: "text", props: { content: "Agora me diz: " } },
                    { id: 1764149718239, type: "input-buttons", props: { buttons: [ { text: " Sim, é exatamente isso que eu quero" }, { text: "Não sei se é pra mim ainda." } ] } },
                    { id: 1764150145033, type: "logic-wait", props: { duration: 1 } }
                ],
                props: {}
            },
            {
                id: 1764149751414,
                type: "group",
                position: { x: 833.23, y: -94.09 },
                children: [
                    { id: 1764149750749, type: "text", props: { content: "Então deixa eu te dar uma ideia do que você vai encontrar. " } },
                    { id: 1764149771890, type: "text", props: { content: "Dentro de um grupo extremamente seleto com vagas limitadas você vai ter acesso a: " } },
                    { id: 1764149773744, type: "text", props: { content: "📖 Técnicas avançadas de persuasão e manipulação psicológica " } },
                    { id: 1764149784752, type: "text", props: { content: "😈 Estratégias que fazem sua ex (ou seu ex) ficar louca pra voltar " } },
                    { id: 1764149803567, type: "text", props: { content: "🧲 Métodos de influência que funcionam em vendas, conversas e até relacionamentos " } },
                    { id: 1764149813645, type: "text", props: { content: "📚 Livros ocultos e raros, proibidos em vários meios, que não se acha no Google " } },
                    { id: 1764149819749, type: "text", props: { content: "🔒 E o melhor: você estará com as mentes mais afiadas do Brasil nesse assunto " } },
                    { id: 1764149849808, type: "input-buttons", props: { buttons: [ { text: "Quero saber mais!" } ] } },
                    { id: 1764150149937, type: "logic-wait", props: { duration: 1 } }
                ],
                props: {}
            },
            {
                id: 1764150166063,
                type: "group",
                position: { x: 1201.34, y: -78.91 },
                children: [
                    { id: 1764150166062, type: "text", props: { content: "Vou te explicar uma coisa!" } },
                    { id: 1764150275625, type: "logic-wait", props: { duration: 2 } },
                    { id: 1764150184124, type: "text", props: { content: "🚫 Não é pra qualquer um. " } },
                    { id: 1764150672553, type: "logic-wait", props: { duration: 1 } },
                    { id: 1764150213482, type: "text", props: { content: "🚫 Não é curso gravado nem “coach motivacional”. " } },
                    { id: 1764150683930, type: "logic-wait", props: { duration: 2 } },
                    { id: 1764150262581, type: "text", props: { content: "É conteúdo direto, sem firula, com aplicação real e imediata. " } },
                    { id: 1764150699647, type: "logic-wait", props: { duration: 3 } },
                    { id: 1764150711482, type: "image", props: { imageUrl: "https://s3.typebot.io/public/workspaces/cma6gh1r00000wo0nne89p289/typebots/w3uutbahqxqiryefgp29v7zw/blocks/wefmams0gbe7dw9o2w8g9usd?v=1746642298063" } },
                    { id: 1764150722900, type: "logic-wait", props: { duration: 3 } },
                    { id: 1764150750889, type: "input-buttons", props: { buttons: [ { text: "Quero entrar na comunidade!" } ] } },
                    { id: 1764150776789, type: "logic-wait", props: { duration: 1 } }
                ],
                props: {}
            },
            {
                id: 1764150814494,
                type: "group",
                position: { x: 1690.88, y: -34.93 },
                children: [
                    { id: 1764150814493, type: "text", props: { content: "🎯 Se você quer entrar, aproveite agora. As vagas são extremamente limitadas. " } },
                    { id: 1764150831863, type: "logic-wait", props: { duration: 3 } },
                    { id: 1764150824771, type: "text", props: { content: "A próxima vez que você voltar aqui… pode já não ter espaço. " } },
                    { id: 1764150853407, type: "logic-wait", props: { duration: 3 } },
                    { id: 1764150845017, type: "text", props: { content: "Te vejo do outro lado onde o controle da mente não é sorte, é método. 😈 " } },
                    { id: 1764150864525, type: "input-buttons", props: { buttons: [ { text: "ENTRAR!" } ] } }
                ],
                props: {}
            },
            {
                id: 1764150954608,
                type: "group",
                position: { x: 2090.56, y: 324.15 },
                children: [
                    { id: 1764150954607, type: "logic-redirect", props: {} }
                ],
                props: {}
            },
            {
                id: 1764150966063,
                type: "group",
                position: { x: 2090.56, y: 168.95 },
                children: [
                    { id: 1764150966062, type: "text", props: { content: "SEU LINK AQUI EM BAIXO!" } }
                ],
                props: {}
            }
        ],
        connections: [
            { from: "start", to: 1764149231094 },
            { from: 1764149231094, to: 1764149751414 },
            { from: 1764149751414, to: 1764150166063 },
            { from: 1764150166063, to: 1764150814494 },
            { from: 1764150814494, to: 1764150954608 }
        ]
    }
  }
];
