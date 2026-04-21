import { NextResponse } from 'next/server';

export async function GET() {
  //console.log('[GET] fetch.events hit');
  return NextResponse.json(
    { success: false, message: 'Method not allowed. Please use POST.' },
    { status: 405 }
  );
}

export async function POST(request: Request) {
  //console.log('--- [START] fetch.eventsa API ---');

  try {
    const API_URL = process.env.API_URL;
    const API_KEY = process.env.API_KEY;
    const origin = `${process.env.URL_INFO}`;
    const operationKey = process.env.API_OPERATION_KEY;

    //  Check missing env early
    if (!API_URL || !API_KEY) {
      //console.error('[ERROR] Missing environment variables');
      return NextResponse.json(
        { 
          success: false, 
          message: 'Server misconfiguration (missing API)',
          podcastsdata: [] 
        },
        { status: 500 }
      );
    }

    //  Request body - handle empty or invalid JSON gracefully
    let body = {};
    try {
      const text = await request.text();
      if (text && text.trim()) {
        body = JSON.parse(text);
        //console.log('[REQUEST BODY]', body);
      } else {
        //console.log('[REQUEST BODY] Empty body, using default empty object');
        body = {};
      }
    } catch (err) {
      //console.error('[ERROR] Invalid JSON body', err);
      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid JSON body',
          podcastsdata: [] 
        },
        { status: 400 }
      );
    }

    // ⏱ Timeout wrapper
    const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 10000) => {
      //console.log('[FETCH] Calling:', url);

      const controller = new AbortController();
      const id = setTimeout(() => {
        //console.error('[TIMEOUT] Request took too long');
        controller.abort();
      }, timeout);

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        });

        clearTimeout(id);
        //console.log('[FETCH RESPONSE STATUS]', response.status);

        return response;
      } catch (error: any) {
        clearTimeout(id);
        //console.error('[FETCH ERROR]', error.message);
        throw new Error(`Network Error: ${error.message}`);
      }
    };

    //  External API call
    const response = await fetchWithTimeout(`${API_URL}/v1/podcasts/fetch.podcasts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-Origin-Check': origin,
      },
      body: JSON.stringify({body, operationkey: operationKey}),
    });

    //  Raw response
    const responseText = await response.text();
    //console.log('[RAW RESPONSE]', responseText.substring(0, 500));

    let data;

    try {
      data = JSON.parse(responseText);
      //console.log('[PARSED JSON]', data);
    } catch (parseError) {
      //console.error('[PARSE ERROR]', parseError);

      if (
        responseText.includes('<br') ||
        responseText.includes('Parse error') ||
        responseText.includes('Fatal error') ||
        responseText.includes('Warning')
      ) {
        //console.error('[PHP ERROR DETECTED]', responseText);

        return NextResponse.json(
          {
            success: false,
            message: 'Backend PHP error detected',
            podcastsdata: [],
            debug: responseText.substring(0, 300)
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { 
          success: false, 
          message: 'Invalid JSON from API',
          podcastsdata: [] 
        },
        { status: 500 }
      );
    }

    // ❗ Handle HTTP errors
    if (!response.ok) {
     // console.error('[API ERROR STATUS]', response.status, data);

      return NextResponse.json(
        {
          success: false,
          message: data?.message || `HTTP ${response.status}`,
          podcastsdata: []
        },
        { status: response.status }
      );
    }

    //console.log('[SUCCESS] event fetched successfully');

    return NextResponse.json(
      {
        success: true,
        message: data.message,
        podcastsdata: data.podcastsdata || []
      },
      { status: 200 }
    );

  } catch (error: any) {
    //console.error('[FATAL ERROR]', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Unknown error',
        podcastsdata: [],
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}