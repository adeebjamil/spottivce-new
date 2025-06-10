import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('productEnquiry');

    switch (req.method) {
      case 'GET':
        const enquiries = await collection.find({}).sort({ createdAt: -1 }).toArray();
        res.status(200).json(enquiries);
        break;

      case 'POST':
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