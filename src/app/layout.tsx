import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/providers/theme-provider';
import CookieConsent from '@/components/cookie-consent';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'LaunchMe — Lance seu produto digital com IA | Comece do zero',
  description: 'Crie seu produto, monte seu funil e construa sua presença online em minutos com a ajuda da IA.',
  openGraph: {
    title: 'LaunchMe — Lance seu produto digital com IA | Comece do zero',
    description: 'Crie seu produto, monte seu funil e construa sua presença online em minutos com a ajuda da IA.',
    images: [
      {
        url: 'https://picsum.photos/seed/og-image/1200/630',
        width: 1200,
        height: 630,
        alt: 'LaunchMe Mockup',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Sora:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
            <CookieConsent />
          </ThemeProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
