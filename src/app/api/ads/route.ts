import { NextRequest, NextResponse } from 'next/server';

const ACCESS_TOKEN = 'EAAQZBL4qStBIBPZCcRbRypj1OIpeTLfZCkB0j48JEV73a5u8OS3NqrU98rGFULZB3LbCDTi8H54eL3anZCkJmamomOXAXi6Ngmoi9ZBE1HC870C35ZCIzAEjR0lZB90cdCsJ83IEFpt4bcYCtZAueyk1WZBSfDEZCmIlg7rG3UFOYAGoUJyYnMOKr2oaKJVnhlnMCEGtDAjY9p7TbnQsAcs0fP4R7pv3fncwyIwikZChzf6uwm2MA7rU';
const FB_GRAPH_VERSION = 'v19.0';

export async function GET(req: NextRequest) {
  if (!ACCESS_TOKEN) {
    return NextResponse.json({ error: { message: 'Facebook Access Token não está configurado no servidor.' } }, { status: 500 });
  }

  const { searchParams } = req.nextUrl;
  const proxyUrl = searchParams.get('proxyUrl');

  let requestUrl: string;

  if (proxyUrl) {
    const url = new URL(proxyUrl);
    url.searchParams.set('access_token', ACCESS_TOKEN);
    requestUrl = url.toString();
  } else {
    const searchTerm = searchParams.get('search_terms');
    if (!searchTerm) {
      return NextResponse.json({ error: { message: 'O termo de busca é obrigatório.' } }, { status: 400 });
    }

    const fields = 'ad_creative_body,ad_creative_link_caption,ad_creative_link_description,ad_creative_link_title,ad_delivery_start_time,funding_entity,page_name,page_id,publisher_platforms,spend,impressions,ad_snapshot_url';
    
    const params = new URLSearchParams({
      search_terms: searchTerm,
      ad_type: 'ALL',
      ad_reached_countries: "['BR']",
      fields: fields,
      access_token: ACCESS_TOKEN,
      limit: searchParams.get('limit') || '25',
    });

    requestUrl = `https://graph.facebook.com/${FB_GRAPH_VERSION}/ads_archive?${params.toString()}`;
  }

  try {
    const response = await fetch(requestUrl, {
      headers: {
        'Accept': 'application/json',
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.error('Erro da API da Meta:', data);
      // Garante que a resposta de erro sempre tenha a estrutura { error: { message: '...' } }
      const errorMessage = data.error?.message || 'Um erro desconhecido ocorreu na API da Meta.';
      return NextResponse.json({ error: { message: errorMessage } }, { status: response.status });
    }
    
    return NextResponse.json(data);

  } catch (error: any) {
    console.error('Erro de Servidor Interno:', error);
    return NextResponse.json({ error: { message: error.message || 'Ocorreu um erro de servidor desconhecido.' } }, { status: 500 });
  }
}
