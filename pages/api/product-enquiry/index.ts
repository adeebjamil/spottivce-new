import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { withAuth } from '../../../lib/authMiddleware';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('productEnquiry');

    switch (req.method) {
      case 'GET':
        // Protected - only authenticated admins can get all enquiries
        const enquiries = await collection.find({}).sort({ createdAt: -1 }).toArray();
        res.status(200).json(enquiries);
        break;

      case 'POST':
        // Public - allows users to submit enquiries
        const { 
          productId,
          productName, 
          userName, 
          userEmail, 
          userMobile, 
          message 
        } = req.body;
        
        if (!productName || !userName || !userEmail || !userMobile) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(userEmail)) {
          return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate mobile number (basic validation)
        if (userMobile.length < 10) {
          return res.status(400).json({ error: 'Invalid mobile number' });
        }

        const newEnquiry = {
          productId: productId || null,
          productName,
          userName,
          userEmail,
          userMobile,
          message: message || '',
          status: 'pending', // pending, contacted, resolved
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const result = await collection.insertOne(newEnquiry);
        res.status(201).json({ _id: result.insertedId, ...newEnquiry });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// For GET requests, apply authentication middleware
// For POST requests, allow without authentication
export default async function combinedHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Apply auth middleware only for GET requests
    return withAuth(handler)(req, res);
  } else {
    // For POST or other methods, don't require authentication
    return handler(req, res);
  }
}