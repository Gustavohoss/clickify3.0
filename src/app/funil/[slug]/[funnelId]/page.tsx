
'use client';

import React, { Suspense } from 'react';
import Head from 'next/head';
import { TypebotPublicViewer } from '@/components/editor/TypebotPublicViewer';

function FunnelPublicContent() {
  return (
    <>
      <Head>
        <title>Funil</title>
      </Head>
      <TypebotPublicViewer />
    </>
  );
}

export default function FunnelPublicPage() {
  return (
    <Suspense fallback={<div className="flex h-screen w-screen items-center justify-center bg-gray-900 text-white">Carregando Funil...</div>}>
      <FunnelPublicContent />
    </Suspense>
  );
}
