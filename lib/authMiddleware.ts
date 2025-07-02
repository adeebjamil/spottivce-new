import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from './jwt';

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Get token from Authorization header or cookies
      const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;
      
      if (!token) {
        return res.status(401).json({ error: 'Authentication required' });
      }

      // Verify the token
      const decoded = verifyToken(token);
      
      if (!decoded) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      // Make sure it's an admin user
      if (typeof decoded === 'string' || !decoded.role || decoded.role !== 'admin') {
        return res.status(403).json({ error: 'Admin access required' });
      }

      // Add user info to request
      (req as any).user = decoded;
      
      // Call the original handler
      return handler(req, res);
    } catch (error) {
      console.error('Auth middleware error:', error);
      return res.status(401).json({ error: 'Authentication failed' });
    }
  };
}