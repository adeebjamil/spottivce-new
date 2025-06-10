import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  try {
    const { id } = req.query;
    const client = await clientPromise;
    const db = client.db('spottive');
    
    let productDetails;
    if (ObjectId.isValid(id as string)) {
      productDetails = await db.collection('productDetails').findOne({ _id: new ObjectId(id as string) });
    }
    
    if (!productDetails) {
      productDetails = await db.collection('productDetails').findOne({ productId: id });
    }
    
    if (!productDetails) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(productDetails);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error' });
  }
}