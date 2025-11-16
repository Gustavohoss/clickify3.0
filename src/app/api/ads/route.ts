
import { NextRequest, NextResponse } from 'next/server';

const accessToken = 'EAAQZBL4qStBIBPZCcRbRypj1OIpeTLfZCkB0j48JEV73a5u8OS3NqrU98rGFULZB3LbCDTi8H54eL3anZCkJmamomOXAXi6Ngmoi9ZBE1HC870C35ZCIzAEjR0lZB90cdCsJ83IEFpt4bcYCtZAueyk1WZBSfDEZCmIlg7rG3UFOYAGoUJyYnMOKr2oaKJVnhlnMCEGtDAjY9p7TbnQsAcs0fP4R7pv3fncwyIwikZChzf6uwm2MA7rU';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const proxyUrl = searchParams.get('proxyUrl');

  let requestUrl: string;

  if (proxyUrl) {
    // If a full URL is provided for pagination, use it directly.
    // Ensure the access token is still part of it, or add it if necessary.
    const url = new URL(proxyUrl);
    if (!url.searchParams.has('access_token')) {
      url.searchParams.set('access_token', accessToken);
    }
    requestUrl = url.toString();
  } else {
    // Build the URL for a new search.
    const searchTerm = searchParams.get('search_terms');

    if (!searchTerm) {
      return NextResponse.json({ error: { message: 'Search term is required.' } }, { status: 400 });
    }

    const fields = 'ad_creative_body,ad_creative_link_caption,ad_creative_link_description,ad_creative_link_title,ad_delivery_start_time,funding_entity,page_name,page_id,publisher_platforms,spend,impressions,ad_snapshot_url';
    
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
    const response = await fetch(requestUrl, {
      headers: {
        'Accept': 'application/json',
      }
    });

    const data = await response.json();
    
    if (!response.ok) {
        return NextResponse.json(data, { status: response.status });
    }
    
    return NextResponse.json(data);

  } catch (error: any) {
    return NextResponse.json({ error: { message: error.message || 'An unknown server error occurred.' } }, { status: 500 });
  }
}
