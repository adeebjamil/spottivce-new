// filepath: c:\Users\USER\Desktop\spo\my-project\pages\api\admin\contacts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('contactSubmissions');

    switch (req.method) {
      case 'GET':
        const { status, page = '1', limit = '10' } = req.query;
        
        const pageNum = parseInt(page as string);
        const limitNum = parseInt(limit as string);
        const skip = (pageNum - 1) * limitNum;

        const where = status && status !== 'all' ? { status: status as string } : {};

        const [submissions, total] = await Promise.all([
          collection.find(where)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum)
            .toArray(),
          collection.countDocuments(where)
        ]);

        res.status(200).json({
          success: true,
          data: submissions,
          pagination: {
            page: pageNum,
            limit: limitNum,
            total,
            pages: Math.ceil(total / limitNum)
          }
        });
        break;

      case 'PATCH':
        const { id, status: newStatus } = req.body;

        if (!id || !newStatus) {
          return res.status(400).json({ 
            success: false, 
            message: 'ID and status are required' 
          });
        }

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          { 
            $set: { 
              status: newStatus, 
              updatedAt: new Date() 
            } 
          }
        );

        if (updateResult.matchedCount === 0) {
          return res.status(404).json({ 
            success: false, 
            message: 'Contact submission not found' 
          });
        }

        res.status(200).json({ 
          success: true, 
          message: 'Status updated successfully' 
        });
        break;

      case 'DELETE':
        const { id: deleteId } = req.query;

        if (!deleteId) {
          return res.status(400).json({ 
            success: false, 
            message: 'ID is required' 
          });
        }

        const deleteResult = await collection.deleteOne({ 
          _id: new ObjectId(deleteId as string) 
        });

        if (deleteResult.deletedCount === 0) {
          return res.status(404).json({ 
            success: false, 
            message: 'Contact submission not found' 
          });
        }

        res.status(200).json({ 
          success: true, 
          message: 'Contact submission deleted successfully' 
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
}