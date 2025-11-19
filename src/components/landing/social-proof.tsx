
'use client';

import FallingNotifications from './falling-notifications';

const SocialProof = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h1 className="md:text-5xl text-3xl lg:text-6xl text-white font-body">
            <span className="text-primary">Venda todos os dias</span> com os nossos metodos e <span className="text-primary">video aulas exclusivos</span>
          </h1>
        <div className="mt-8 flex justify-center">
          <div className="relative h-[700px] w-[300px]">
            <img
              src="https://s3.typebot.io/public/workspaces/cm8gbxl5b000ba3ncy4y16grd/typebots/cmi0sldz2000djl043bd6dtvj/blocks/mmudllxka9yrr0ypf1lpqfdh?v=1763540792561"
              alt="Fundo de tela do celular"
              width={300}
              height={600}
              className="z-0 rounded-[2.5rem]"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center p-4 space-y-4 justify-end pb-12 overflow-hidden">
              <FallingNotifications />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
