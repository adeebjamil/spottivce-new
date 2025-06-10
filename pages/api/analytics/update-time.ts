import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { path, timeOnSite } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    
    const client = await clientPromise;
    const db = client.db('spottive');
    
    // Update the most recent visitor record for this IP and path
    await db.collection('siteVisitors').findOneAndUpdate(
      { ip, path, timestamp: { $gte: new Date(Date.now() - 30 * 60 * 1000) } },
      { $set: { timeOnSite } },
      { sort: { timestamp: -1 } }
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error updating time on site:', error);
    res.status(500).json({ success: false, error: String(error) });
  }
}