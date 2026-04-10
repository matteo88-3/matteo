
import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ 
        success: null, 
        message: 'Forbidden. You do not have permission to access this resource.' 
    }, { status: 403 });
}

export async function POST(request: Request) {
    try {
        const API_URL = process.env.API_JOBS_URL;
        const API_KEY = process.env.API_KEY;
        
        // Check authentication
       
        
        // Get form data from request (multipart/form-data)
        const formData = await request.formData();
        
        // Extract fields
        const jobId = formData.get('jobId');
      
        const firstName = formData.get('firstName');
        const lastName = formData.get('lastName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const location = formData.get('location');
        const currentTitle = formData.get('currentTitle');
        const currentCompany = formData.get('currentCompany');
        const yearsExperience = formData.get('yearsExperience');
        const education = formData.get('education');
        const linkedin = formData.get('linkedin');
        const coverLetter = formData.get('coverLetter');
        const availableFrom = formData.get('availableFrom');
        const expectedSalary = formData.get('expectedSalary');
        const cvFile = formData.get('cv') as File;
        
        // Validate required fields
        const requiredFields = ['jobId', 'firstName', 'lastName', 'email', 'phone', 'coverLetter'];
        for (const field of requiredFields) {
            if (!formData.get(field)) {
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
        
        // Validate CV file
        if (!cvFile || !(cvFile instanceof File)) {
            return NextResponse.json({
                success: false,
                message: "CV file is required"
            }, { status: 400 });
        }
        
        // Validate file type
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(cvFile.type)) {
            return NextResponse.json({
                success: false,
                message: "Invalid file type. Allowed: PDF, DOC, DOCX, JPG, PNG"
            }, { status: 400 });
        }
        
        // Validate file size (max 10MB)
        if (cvFile.size > 10 * 1024 * 1024) {
            return NextResponse.json({
                success: false,
                message: "File too large. Maximum size is 10MB"
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
        const apiFormData = new FormData();
       
        apiFormData.append('jobId', jobId as string);
        apiFormData.append('firstName', firstName as string);
        apiFormData.append('lastName', lastName as string);
        apiFormData.append('email', email as string);
        apiFormData.append('phone', phone as string);
        apiFormData.append('location', location as string || '');
        apiFormData.append('currentTitle', currentTitle as string || '');
        apiFormData.append('currentCompany', currentCompany as string || '');
        apiFormData.append('yearsExperience', yearsExperience as string || '');
        apiFormData.append('education', education as string || '');
        apiFormData.append('linkedin', linkedin as string || '');
        apiFormData.append('coverLetter', coverLetter as string);
        apiFormData.append('availableFrom', availableFrom as string || '');
        apiFormData.append('expectedSalary', expectedSalary as string || '');
        apiFormData.append('cv', cvFile);
        
        const response = await fetchWithTimeout(`${API_URL}/v2/jobs/create.application`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'X-Origin-Check': origin,
            },
            body: apiFormData,
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