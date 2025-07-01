import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('newsletterSubscribers');

    switch (req.method) {
      case 'GET':
        const subscribers = await collection.find({}).sort({ subscribedAt: -1 }).toArray();
        res.status(200).json(subscribers);
        break;

      case 'POST':
        const { email, source } = req.body;
        
        if (!email) {
          return res.status(400).json({ success: false, message: 'Email is required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return res.status(400).json({ success: false, message: 'Invalid email format' });
        }

        // Check if email already exists
        const existingSubscriber = await collection.findOne({ email });
        if (existingSubscriber) {
          return res.status(409).json({ success: false, message: 'Email already subscribed' });
        }

        const newSubscriber = {
          email,
          source: source || 'website', // footer, blog, etc.
          subscribedAt: new Date(),
          status: 'active',
          preferences: {
            security_tips: true,
            product_updates: true,
            industry_news: true
          }
        };

        const result = await collection.insertOne(newSubscriber);
        res.status(201).json({ 
          success: true, 
          message: 'Thank you for subscribing to our newsletter!',
          _id: result.insertedId, 
          ...newSubscriber 
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}