import { NextApiRequest } from 'next';
import jwt from 'jsonwebtoken';

// Authentication middleware
export const authenticateToken = (req: NextApiRequest) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
      return null;
    }
    
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return null;
    }
    
    return jwt.verify(token, jwtSecret);
  } catch (error) {
    return null;
  }
};