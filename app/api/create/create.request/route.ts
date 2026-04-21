
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ 
        success: null, 
        message: 'Forbidden. You do not have permission to access this resource.' 
    }, { status: 403 });
}

export async function POST(request: Request) {
    try {
        const API_URL = process.env.API_URL;
        const API_KEY = process.env.API_KEY;
        const operationKey = process.env.API_OPERATION_KEY;
        
        const body = await request.json();
      
        const { name , email, organization, collabType, message, type } = body;
       
     
        
        // Validate required fields
        const requiredFields = ['name', 'email', 'organization', 'collabType', 'message' ,'type'];
        for (const field of requiredFields) {
            if (!body[field]) {
                return NextResponse.json({
                    success: false,
                    message: `Missing required field: ${field}`
                }, { status: 400 });
            }
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email as string)) {
            return NextResponse.json({
                success: false,
                message: "Invalid email format"
            }, { status: 400 });
        }
        
     
   
        
        const origin = process.env.URL_INFO || '';
        
        const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 30000) => {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), timeout);
            
            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                });
                clearTimeout(id);
                return response;
            } catch (error: any) {
                clearTimeout(id);
                throw new Error(`Network Error: ${error.message}`);
            }
        };
        
        // Prepare data for PHP backend
       
        
        const response = await fetchWithTimeout(`${API_URL}/v1/work-with-us/create.request`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'X-Origin-Check': origin,
            },
            body:JSON.stringify({ name, email, organization, collabType, message, type, operationkey:operationKey }),
        });
        
        // Read response as text first
        const responseText = await response.text();
        
        let data;
        try {
            data = JSON.parse(responseText);
        } catch (parseError) {
            console.log(responseText.substring(0, 300));
            // Check if it's a PHP error
            if (responseText.includes('<br />') || responseText.includes('Parse error') || responseText.includes('Fatal error')) {
                return NextResponse.json({
                    success: false,
                    message: 'Error in network communication with API. Please try again later.',
                    debug: responseText.substring(0, 300)
                }, { status: 500 });
            }
            
            return NextResponse.json({
                success: false,
                message: 'Invalid response from server'
            }, { status: 500 });
        }
        
        // Handle response status
        if (!response.ok) {
            if (response.status === 401) {
                return NextResponse.json({ 
                    success: false, 
                    message: data.error || 'Unauthorized' 
                }, { status: 401 });
            } else if (response.status === 403) {
                return NextResponse.json({ 
                    success: false, 
                    message: 'Forbidden. You do not have permission to access this resource.' 
                }, { status: 403 });
            } else if (response.status === 400) {
                return NextResponse.json({ 
                    success: false, 
                    message: data.message || 'Bad Request' 
                }, { status: 400 });
            } else if (response.status === 404) {
                return NextResponse.json({ 
                    success: false, 
                    message: 'Application endpoint not found' 
                }, { status: 404 });
            } else {
                return NextResponse.json({ 
                    success: false, 
                    message: `Failed to submit application: ${response.status}` 
                }, { status: 500 });
            }
        }
        
        // Return success response
        return NextResponse.json({
            success: true,
            message: data.message || 'Application submitted successfully',
            applicationId: data.applicationId
        }, { status: 200 });
        
    } catch (error: any) {
        console.error('Application submission error:', error);
        return NextResponse.json({
            success: false,
            message: error instanceof Error ? error.message : 'Unknown error occurred',
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}