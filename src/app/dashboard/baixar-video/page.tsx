'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, Loader2, Video } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BaixarVideoPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = () => {
    if (!videoUrl.includes('tiktok.com')) {
      toast({
        variant: 'destructive',
        title: 'URL Inválida',
        description: 'Por favor, insira um link válido do TikTok.',
      });
      return;
    }

    setIsDownloading(true);
    // Placeholder for download logic.
    // In a real application, this would call a server-side endpoint
    // to fetch and process the video.
    setTimeout(() => {
      toast({
        title: 'Download iniciado!',
        description: 'Seu vídeo começará a ser baixado em breve.',
      });
      setIsDownloading(false);
      // Here you would trigger the actual file download.
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Baixar Vídeo do TikTok
        </h1>
        <p className="mt-2 text-muted-foreground">
          Cole o link do vídeo do TikTok que você deseja baixar sem marca d'água.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Download className="h-6 w-6" />
            TikTok Downloader
          </CardTitle>
          <CardDescription>
            Insira o link do vídeo abaixo para fazer o download.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tiktok-url">Link do Vídeo</Label>
            <Input
              id="tiktok-url"
              placeholder="https://www.tiktok.com/@usuario/video/12345..."
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              disabled={isDownloading}
            />
          </div>
          <Button onClick={handleDownload} disabled={isDownloading || !videoUrl} className="w-full">
            {isDownloading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Download className="mr-2 h-4 w-4" />
            )}
            {isDownloading ? 'Baixando...' : 'Baixar Vídeo'}
          </Button>
        </CardContent>
      </Card>
      
       <Card className="flex flex-col items-center justify-center py-20 border-dashed">
            <div className="text-center">
                <div className="flex justify-center mb-4">
                <Video className="h-16 w-16 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Nenhum vídeo baixado ainda</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                 Seus vídeos baixados aparecerão aqui.
                </p>
            </div>
       </Card>

    </div>
  );
}
