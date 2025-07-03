import { NextApiRequest, NextApiResponse } from 'next';

// Function to detect direct API access vs legitimate app requests
export function isDirectAPIAccess(req: NextApiRequest): boolean {
  // Check if it's a server-side request from Next.js
  const isServerSideRequest = req.headers['x-nextjs-data'] === '1';
  if (isServerSideRequest) return false;
  
  // Check for our special app header
  const hasAppHeader = req.headers['x-app-client'] === 'spottive-frontend';
  if (hasAppHeader) return false;
  
  // Check referer - if coming from our app domains
  const referer = req.headers.referer || '';
  const validDomains = [
    'localhost:3000',
    'spottive.com',
    'www.spottive.com',
    'spottivce-new.vercel.app'
  ];
  
  const hasValidReferer = validDomains.some(domain => referer.includes(domain));
  if (hasValidReferer) return false;
  
  return true;
}

// Enhanced middleware to protect direct API access
export function protectDirectApiAccess(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // IMPORTANT: Aggressively normalize the URL to prevent bypass techniques
    let normalizedUrl = req.url || '';
    
    // Replace multiple consecutive slashes with a single slash
    normalizedUrl = normalizedUrl.replace(/\/{2,}/g, '/');
    req.url = normalizedUrl;
    
    // For API routes that start with /api/, ensure we check access
    if (normalizedUrl.includes('/api/')) {
      // Check if this is a direct API access
      if (isDirectAPIAccess(req)) {
        // Check for proper authorization header
        const authHeader = req.headers.authorization || '';
        
        if (!authHeader.startsWith('Bearer ')) {
          return res.status(403).json({
            error: 'Access Denied',
            message: 'This API endpoint is restricted. Direct access requires authentication.'
          });
        }
      }
    }
    
    // If it's not direct access or it has proper auth, proceed to the handler
    return handler(req, res);
  };
}

// Add a more aggressive URL normalization middleware 
export function normalizeUrlMiddleware(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Normalize URL to prevent bypass via multiple slashes or path manipulation
    if (req.url) {
      // Replace multiple slashes with a single slash
      req.url = req.url.replace(/\/{2,}/g, '/');
      
      // Fix potential path traversal attempts
      req.url = req.url.replace(/\/\.\.\//g, '/');
    }
    
    return handler(req, res);
  };
}

// Helper to add the special app client header to fetch requests
export const getAppClientHeaders = () => ({
  'X-App-Client': 'spottive-frontend'
});