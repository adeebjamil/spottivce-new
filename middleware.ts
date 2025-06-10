import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Skip API routes and admin routes
  if (request.nextUrl.pathname.startsWith('/api') || 
      request.nextUrl.pathname.startsWith('/admin') ||
      request.nextUrl.pathname.includes('_next') ||
      request.nextUrl.pathname.includes('favicon.ico') ||
      request.nextUrl.pathname.includes('.')) {
    return NextResponse.next();
  }

  try {
    // Get visitor info
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Determine device type (simplified)
    const isMobile = userAgent.toLowerCase().includes('mobile');
    const isTablet = userAgent.toLowerCase().includes('tablet') || 
                     (userAgent.toLowerCase().includes('ipad'));
    
    const device = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    
    // Determine browser (simplified)
    let browser = 'other';
    if (userAgent.includes('Chrome')) browser = 'chrome';
    else if (userAgent.includes('Firefox')) browser = 'firefox';
    else if (userAgent.includes('Safari')) browser = 'safari';
    else if (userAgent.includes('Edge')) browser = 'edge';
    
    // Call the API endpoint to track the visitor
    // This happens in the background and doesn't block the response
    fetch(`${request.nextUrl.origin}/api/analytics/track-visitor`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ip,
        userAgent,
        device,
        browser,
        referrer: request.headers.get('referer') || 'direct',
        path: request.nextUrl.pathname,
        query: request.nextUrl.search
      }),
    }).catch(error => {
      // Silently log any errors without affecting the user experience
      console.error('Error calling visitor tracking API:', error);
    });
    
  } catch (error) {
    console.error('Error in middleware:', error);
    // Don't block the request if tracking fails
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};