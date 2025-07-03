import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';
import { withAuth } from '../../../lib/authMiddleware';
import { protectDirectApiAccess, normalizeUrlMiddleware } from '../../../lib/apiAccessMiddleware';

// Simple middleware to ensure we block ALL direct API requests
export const blockDirectApiAccessMiddleware = (handler: Function) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // Force the URL to be normalized before any checks
    if (req.url) {
      req.url = req.url.replace(/\/{2,}/g, '/');
    }
    
    // Special header sent by our frontend apps
    const hasAppHeader = req.headers['x-app-client'] === 'spottive-frontend';
    
    // Check for auth header
    const hasValidAuth = req.headers.authorization?.startsWith('Bearer ');
    
    // Block direct access with no auth
    if (!hasAppHeader && !hasValidAuth) {
      return res.status(403).json({
        error: 'Access Denied',
        message: 'This API endpoint is restricted. Direct access requires authentication.'
      });
    }
    
    return handler(req, res);
  };
};

// Handler for the product assignments API
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('spottive');

  try {
    switch (req.method) {
      case 'GET':
        // Get all product assignments
        const assignments = await db.collection('productAssignments').find({}).toArray();
        return res.status(200).json(assignments);
        
      case 'POST':
        // Create or update product assignment - Admin only
        // This needs authentication which is applied via the withAuth middleware
        const { brand, productIds } = req.body;

        // Validate ObjectIds
        const validProductIds = productIds.filter((id: string) => {
          try {
            return ObjectId.isValid(id);
          } catch {
            return false;
          }
        });

        const assignment = {
          brand,
          productIds: validProductIds,
          updatedAt: new Date()
        };

        const result = await db.collection('productAssignments').updateOne(
          { brand },
          { $set: assignment },
          { upsert: true }
        );

        return res.status(200).json({ success: true, result });
        
      default:
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

// Apply middlewares in the correct order
export default function combinedMiddleware(req: NextApiRequest, res: NextApiResponse) {
  // First, strictly normalize the URL and block unauthorized access
  return blockDirectApiAccessMiddleware((normalizedReq: NextApiRequest, normalizedRes: NextApiResponse) => {
    // Then for POST/PUT/DELETE methods, require full auth
    if (normalizedReq.method !== 'GET') {
      return withAuth(handler)(normalizedReq, normalizedRes);
    } else {
      return handler(normalizedReq, normalizedRes);
    }
  })(req, res);
}