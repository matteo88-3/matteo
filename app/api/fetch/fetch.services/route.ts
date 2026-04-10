
import { NextResponse } from 'next/server';
export async function POST(request: Request) {
  try {
    const API_URL = process.env.API_URL;
    const API_KEY = process.env.API_KEY;
    const origin = process.env.URL_INFO;

    // Validate environment variables
    if (!API_URL || !API_KEY) {
      throw new Error('Missing required environment variables');
    }

    
    const response = await fetch(`${API_URL}/services/fetch.services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'X-Origin-Check': origin || '',
      },
      body: JSON.stringify({ userId: 'website-security' }),
      // Add timeout
      signal: AbortSignal.timeout(10000), // 10 second timeout
    }).catch(error => {
      console.error('Network error details:', {
        name: error.name,
        message: error.message,
        cause: error.cause
      });
      throw new Error(`Network error: ${error.message}`);
    });

    // Check content-type header
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      const text = await response.text();
      console.error('Non-JSON response:', {
        status: response.status,
        contentType,
        body: text.substring(0, 500)
      });
      return NextResponse.json({ 
        success: false, 
        message: 'Server returned non-JSON response',
        debug: { contentType, preview: text.substring(0, 200) }
      }, { status: 502 });
    }

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ 
        success: false, 
        message: data.message || 'Failed to fetch services' 
      }, { status: response.status });
    }

    return NextResponse.json({ 
      success: true, 
      servicedata: data.servicedata || []
    });

  } catch (error: any) {
    console.error('Full error object:', error);
    
    // Check if it's a timeout error
    if (error.name === 'TimeoutError') {
      return NextResponse.json({ 
        success: false, 
        message: 'Request timeout - server took too long to respond'
      }, { status: 504 });
    }
    
    return NextResponse.json({ 
      success: false, 
      message: error.message || 'Unknown error occurred',
      errorType: error.name
    }, { status: 500 });
  }
}