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
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  const handleSearch = async (isNewSearch = true) => {
    if (!searchTerm.trim() && isNewSearch) {
      setError('Por favor, insira um termo de busca.');
      return;
    }

    setIsLoading(true);
    setError(null);
    if (isNewSearch) {
      setAds([]);
      setNextPageUrl(null);
    }

    try {
      const params = new URLSearchParams();
      
      if (isNewSearch) {
        params.append('search_terms', searchTerm);
      } else if (nextPageUrl) {
        params.append('proxyUrl', nextPageUrl);
      } else {
        setIsLoading(false);
        return;
      }
      
      const requestUrl = `/api/ads?${params.toString()}`;

      const response = await fetch(requestUrl);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Ocorreu um erro ao buscar os anúncios.');
      }

      setAds(prev => isNewSearch ? data.data : [...prev, ...data.data]);
      setNextPageUrl(data.paging?.next || null);

      if (data.data.length === 0 && isNewSearch) {
        setError('Nenhum anúncio encontrado para este termo de busca.');
      }

    } catch (err: any) {
      setError(err.message || 'Falha ao conectar com a API. Verifique a rota da API e a conexão.');
      console.error(err);
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
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(true)}
                className="flex-grow"
                />
                <Button onClick={() => handleSearch(true)} disabled={isLoading && !nextPageUrl} className="w-full sm:w-auto">
                {isLoading && !nextPageUrl ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
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

      {nextPageUrl && !isLoading && (
        <div className="text-center mt-8">
            <Button onClick={() => handleSearch(false)} disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Carregar Mais'}
            </Button>
        </div>
      )}
      
      {isLoading && nextPageUrl && (
        <div className="text-center mt-8">
          <Button disabled={true}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Carregando...
          </Button>
        </div>
      )}
    </div>
  );
}
