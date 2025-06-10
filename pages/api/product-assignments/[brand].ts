import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('spottive');
  const { brand } = req.query;

  try {
    if (req.method === 'GET') {
      console.log('API: Fetching assignment for brand:', brand);
      
      // Get specific brand assignment
      const assignment = await db.collection('productAssignments').findOne({ brand });
      console.log('API: Assignment found:', assignment);
      
      if (!assignment) {
        return res.status(404).json({ error: 'No assignment found for this brand' });
      }
      
      res.status(200).json(assignment);
    } else if (req.method === 'DELETE') {
      // Delete brand assignment
      await db.collection('productAssignments').deleteOne({ brand });
      res.status(200).json({ success: true });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}