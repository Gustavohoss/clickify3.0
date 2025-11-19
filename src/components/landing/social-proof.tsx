
'use client';

import FallingNotifications from './falling-notifications';

const SocialProof = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 text-center">
        <h2
          className="text-3xl md:text-4xl font-bold font-headline mb-10"
          style={{ textShadow: '0 0 8px rgba(255, 255, 255, 0.3)' }}
        >
          Aprenda a viralizar e vender com contas Dark
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="relative h-[700px] w-[300px]">
            <img
              src="https://s3.typebot.io/public/workspaces/cme0in7zf0022jo04wbcry6pa/typebots/cmfa6x6jl0001lb04w0ou4hlr/blocks/sz2ayyjgdks44r3l454oeyly?v=1757281514942"
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
