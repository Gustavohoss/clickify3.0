'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Loader2, AlertCircle } from 'lucide-react';
import { AdCard, Ad } from '@/components/dashboard/ad-card';

const accessToken = 'EAAQZBL4qStBIBPZCcRbRypj1OIpeTLfZCkB0j48JEV73a5u8OS3NqrU98rGFULZB3LbCDTi8H54eL3anZCkJmamomOXAXi6Ngmoi9ZBE1HC870C35ZCIzAEjR0lZB90cdCsJ83IEFpt4bcYCtZAueyk1WZBSfDEZCmIlg7rG3UFOYAGoUJyYnMOKr2oaKJVnhlnMCEGtDAjY9p7TbnQsAcs0fP4R7pv3fncwyIwikZChzf6uwm2MA7rU';

export default function MineradorDeAnunciosPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [ads, setAds] = useState<Ad[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPage, setNextPage] = useState<string | null>(null);

  const handleSearch = async (url?: string) => {
    if (!searchTerm.trim()) {
      setError('Por favor, insira um termo de busca.');
      return;
    }
    if (!accessToken.trim()) {
        setError('O Access Token do Facebook não está configurado.');
        return;
    }

    setIsLoading(true);
    setError(null);

    const fields = 'ad_creative_body,ad_creative_link_caption,ad_creative_link_description,ad_creative_link_title,ad_delivery_start_time,funding_entity,page_name,page_id,publisher_platforms,spend,impressions,ad_snapshot_url';
    
    let requestUrl: string;

    if (url) {
        requestUrl = url;
    } else {
        const params = new URLSearchParams({
            search_terms: searchTerm,
            ad_type: 'ALL',
            ad_reached_countries: "['BR']",
            fields: fields,
            access_token: accessToken,
            limit: '24',
        });
        requestUrl = `https://graph.facebook.com/v19.0/ads_archive?${params.toString()}`;
    }

    try {
      const response = await fetch(requestUrl);
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || 'Ocorreu um erro ao buscar os anúncios.');
      }
      
      if (url) {
        setAds(prev => [...prev, ...data.data]);
      } else {
        setAds(data.data);
      }

      setNextPage(data.paging?.next || null);

      if (data.data.length === 0) {
        setError('Nenhum anúncio encontrado para este termo de busca.');
      }
    } catch (err: any) {
      setError(err.message || 'Falha ao conectar com a API. Verifique seu token e a conexão.');
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
          {ads.map((ad) => (
            <AdCard key={ad.id} ad={ad} />
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
