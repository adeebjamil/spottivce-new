import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db('spottive');

  try {
    if (req.method === 'GET') {
      // Get all product assignments
      const assignments = await db.collection('productAssignments').find({}).toArray();
      res.status(200).json(assignments);
    } else if (req.method === 'POST') {
      // Create or update product assignment
      const { brand, productIds } = req.body;

      // Validate ObjectIds
      const validProductIds = productIds.filter((id: string) => {
        try {
          new ObjectId(id);
          return true;
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

      res.status(200).json({ success: true, result });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}