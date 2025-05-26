import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, phone, service, message } = req.body;

      // Validate required fields
      if (!name || !email || !message) {
        return res.status(400).json({ 
          success: false, 
          message: 'Name, email, and message are required fields' 
        });
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ 
          success: false, 
          message: 'Invalid email format' 
        });
      }

      const client = await clientPromise;
      const db = client.db('spottive');
      const collection = db.collection('contactSubmissions');

      // Save to database
      const submission = await collection.insertOne({
        name,
        email,
        phone: phone || null,
        service: service || null,
        message,
        status: 'new', // new, in-progress, resolved
        createdAt: new Date(),
        updatedAt: new Date()
      });

      res.status(200).json({ 
        success: true, 
        message: 'Contact form submitted successfully!',
        id: submission.insertedId
      });
    } catch (error) {
      console.error('Contact form error:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Internal server error' 
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}