import { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from './jwt';

export function withAuth(handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const user = requireAuth(req);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized. Admin access required.' 
      });
    }

    (req as any).user = user;
    return handler(req, res);
  };
}