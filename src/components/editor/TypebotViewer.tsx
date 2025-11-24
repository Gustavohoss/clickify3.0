
'use client';

import React, { useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

export const TypebotViewer = () => {
    const { funnelId } = useParams() as { funnelId: string };
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current && !ref.current.querySelector('typebot-standard')) {
            const typebot = document.createElement('typebot-standard');
            typebot.setAttribute('typebot', funnelId);
            ref.current.innerHTML = ''; // Clear previous content
            ref.current.appendChild(typebot);

            const script = document.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/@typebot.io/js@0.2/dist/web.js';
            script.defer = true;
            document.head.appendChild(script);

            return () => {
                // Cleanup script when component unmounts
                document.head.removeChild(script);
            };
        }
    }, [funnelId]);

    return <div ref={ref} style={{ height: '100%', width: '100%' }} />;
};

    