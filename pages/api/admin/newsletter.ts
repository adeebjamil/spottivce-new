import { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    const collection = db.collection('newsletterSubscribers');

    switch (req.method) {
      case 'GET':
        const subscribers = await collection.find({}).sort({ subscribedAt: -1 }).toArray();
        const totalSubscribers = await collection.countDocuments();
        const activeSubscribers = await collection.countDocuments({ status: 'active' });
        const thisMonth = await collection.countDocuments({
          subscribedAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
        });

        res.status(200).json({
          success: true,
          data: {
            subscribers,
            stats: {
              total: totalSubscribers,
              active: activeSubscribers,
              thisMonth,
              growth: thisMonth > 0 ? ((thisMonth / Math.max(totalSubscribers - thisMonth, 1)) * 100).toFixed(1) : 0
            }
          }
        });
        break;
      case 'DELETE':
        const { id } = req.query;
        if (!id || Array.isArray(id)) {
          return res.status(400).json({ success: false, message: 'Subscriber ID is required' });
        }

        await collection.deleteOne({ _id: new ObjectId(id) });
        res.status(200).json({ success: true, message: 'Subscriber deleted successfully' });
        break;

      case 'PATCH':
        const { id: subscriberId, status } = req.body;
        if (!subscriberId || !status) {
          return res.status(400).json({ success: false, message: 'Subscriber ID and status are required' });
        }
        await collection.updateOne(
          { _id: new ObjectId(subscriberId) },
          { $set: { status, updatedAt: new Date() } }
        );
        res.status(200).json({ success: true, message: 'Subscriber status updated successfully' });
        break;

      default:
        res.setHeader('Allow', ['GET', 'DELETE', 'PATCH']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('Admin newsletter API error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}