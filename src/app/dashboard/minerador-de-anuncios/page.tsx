'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { AdCard, Ad } from '@/components/dashboard/ad-card';

export default function MineradorDeAnunciosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const handleSearch = async (url?: string) => {
    if (!searchTerm.trim() && !url) {
      setError('Por favor, insira um termo de busca.');
      return;
    }

    setIsLoading(true);
    setError(null);
    if (!url) {
        setAds([]);
    }

    try {
      let requestUrl = '/api/ads';
      const params = new URLSearchParams();

      if (url) {
        // If a full next-page URL is provided by Facebook, we need to proxy it.
        params.append('proxyUrl', url);
      } else {
        params.append('search_terms', searchTerm);
      }
      
      requestUrl = `${requestUrl}?${params.toString()}`;

      const response = await fetch(requestUrl);
      const data = await response.json();
      
      if (!response.ok) {
        // Now, we can expect a more detailed error from our own API route
        throw new Error(data.error?.message || 'Ocorreu um erro ao buscar os anúncios.');
      }

      setAds(prev => url ? [...prev, ...data.data] : data.data);
      setNextPage(data.paging?.next || null);

      if (data.data.length === 0 && !url) {
        setError('Nenhum anúncio encontrado para este termo de busca.');
      }

    } catch (err: any) {
      setError(err.message || 'Falha ao conectar com a API. Verifique a rota da API e a conexão.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline">
          Minerador de Anúncios
        </h1>
        <p className="mt-2 text-muted-foreground">
          Encontre inspiração e analise a concorrência com a Biblioteca de Anúncios da Meta.
        </p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
                <Input
                type="text"
                placeholder="Ex: 'marketing digital', 'produto físico'..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-grow"
                />
                <Button onClick={() => handleSearch()} disabled={isLoading} className="w-full sm:w-auto">
                {isLoading && !nextPage ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Buscar Anúncios
                </Button>
            </div>
        </CardContent>
      </Card>
      
      {error && (
         <div className="flex items-center gap-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
            <AlertCircle className="h-6 w-6" />
            <div>
                <h3 className="font-semibold">Ocorreu um erro</h3>
                <p className="text-sm">{error}</p>
            </div>
        </div>
      )}

      {ads.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {ads.map((ad, index) => (
            <AdCard key={`${ad.id}-${index}`} ad={ad} />
          ))}
        </div>
      )}

      {nextPage && (
        <div className="text-center mt-8">
            <Button onClick={() => handleSearch(nextPage)} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Carregar Mais'}
            </Button>
        </div>
      )}
    </div>
  );
}
