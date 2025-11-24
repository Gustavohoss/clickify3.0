'use client';

import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';
import { Button } from '@/components/ui/button';
import { Instagram } from 'lucide-react';

export default function ObrigadoPage() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const handleFollowClick = () => {
    window.open('https://instagram.com', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-2xl w-full text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">
          Obrigado!
        </h1>
        <p className="text-lg text-gray-300">
          Assista ao vídeo abaixo para os próximos passos e não se esqueça de nos seguir.
        </p>
        
        <div className="aspect-video w-full overflow-hidden rounded-lg shadow-2xl shadow-primary/20 border-2 border-primary/30 bg-black">
          {hasMounted && (
            <ReactPlayer
              url="https://www.youtube.com/watch?v=HWjCStB6k4o"
              width="100%"
              height="100%"
              controls={true}
            />
          )}
        </div>

        <Button 
          onClick={handleFollowClick} 
          size="lg" 
          className="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white font-bold text-lg w-full max-w-sm"
        >
          <Instagram className="mr-2 h-5 w-5" />
          Seguir no Instagram
        </Button>
      </div>
    </div>
  );
}
