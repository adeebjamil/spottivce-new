import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { withAuth } from '../../../lib/authMiddleware';

// Define middleware directly in this file instead of importing
function blockDirectApiAccessMiddleware(handler: Function) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Force the URL to be normalized before any checks
    if (req.url) {
      req.url = req.url.replace(/\/{2,}/g, '/');
    }
    
    // Special header sent by our frontend apps
    const hasAppHeader = req.headers['x-app-client'] === 'spottive-frontend';
    
    // Check for referer from our domains
    const referer = req.headers.referer || '';
    const validDomains = [
      'localhost:3000',
      'spottive.com', 
      'www.spottive.com'
    ];
    const hasValidReferer = validDomains.some(domain => referer.includes(domain));
    
    // Check for auth header
    const hasValidAuth = req.headers.authorization?.startsWith('Bearer ');
    
    // Block direct access with no app header, no valid referer, and no auth
    if (!hasAppHeader && !hasValidReferer && !hasValidAuth) {
      return res.status(403).json({
        error: 'Access Denied',
        message: 'This API endpoint is restricted. Direct access requires authentication.'
      });
    }
    
    return handler(req, res);
  };
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('spottive');
  const { brand } = req.query;

  try {
    switch (req.method) {
      case 'GET':
        // Get specific brand assignment
        const assignment = await db.collection('productAssignments').findOne({ brand });
        
        if (!assignment) {
          return res.status(404).json({ error: 'No assignment found for this brand' });
        }
        
        return res.status(200).json(assignment);
        
      case 'DELETE':
        // Delete brand assignment - admin only
        // This needs authentication which is applied via the withAuth middleware
        await db.collection('productAssignments').deleteOne({ brand });
        return res.status(200).json({ success: true });
        
      default:
        res.setHeader('Allow', ['GET', 'DELETE']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply the same strict protection
export default function combinedMiddleware(req: NextApiRequest, res: NextApiResponse) {
  // First normalize and block unauthorized access
  return blockDirectApiAccessMiddleware((normalizedReq: NextApiRequest, normalizedRes: NextApiResponse) => {
    // Then apply auth middleware for non-GET methods
    if (normalizedReq.method !== 'GET') {
      return withAuth(handler)(normalizedReq, normalizedRes);
    } else {
      return handler(normalizedReq, normalizedRes);
    }
  })(req, res);
}