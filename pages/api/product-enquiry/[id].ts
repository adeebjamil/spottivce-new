import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('productEnquiry');
    const { id } = req.query;

    if (!ObjectId.isValid(id as string)) {
      return res.status(400).json({ error: 'Invalid enquiry ID' });
    }

    switch (req.method) {
      case 'PUT':
        const { status } = req.body;
        
        if (!status || !['pending', 'contacted', 'resolved'].includes(status)) {
          return res.status(400).json({ error: 'Invalid status' });
        }

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id as string) },
          { 
            $set: { 
              status,
              updatedAt: new Date()
            }
          }
        );

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ error: 'Enquiry not found' });
        }

        res.status(200).json({ message: 'Status updated successfully' });
        break;

      case 'DELETE':
        const deleteResult = await collection.deleteOne({ _id: new ObjectId(id as string) });
        
        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ error: 'Enquiry not found' });
        }

        res.status(200).json({ message: 'Enquiry deleted successfully' });
        break;

      default:
        res.setHeader('Allow', ['PUT', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}