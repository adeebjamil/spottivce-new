import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import { withAuth } from '../../../lib/authMiddleware';

async function dashboardHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  // Check if user is admin
  const user = (req as any).user;
  if (!user || !user.role || user.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('spottive');

    // Get products data
    const products = await db.collection('products').find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    
    const recentProducts = products.slice(0, 4).map(product => ({
      id: product._id.toString(),
      name: product.name,
      timestamp: product.createdAt || new Date()
    }));
    
    // Calculate change percentage (new products in last 30 days vs previous 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    
    const newProducts = await db.collection('products').countDocuments({
      createdAt: { $gte: thirtyDaysAgo }
    });
    
    const oldProducts = await db.collection('products').countDocuments({
      createdAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    
    const productChange = oldProducts > 0 
      ? Math.round(((newProducts - oldProducts) / oldProducts) * 100) 
      : 0;

    // Get product details data
    const productDetails = await db.collection('productDetails').find({})
      .sort({ updatedAt: -1 })
      .limit(100)
      .toArray();
    
    const recentProductDetails = productDetails.slice(0, 4).map(detail => ({
      id: detail._id.toString(),
      productName: detail.productTitle,
      detailType: detail.features.length > 0 ? 'Feature' : 'Specification',
      timestamp: detail.updatedAt || new Date()
    }));
    
    // Calculate change percentage for product details
    const newDetails = await db.collection('productDetails').countDocuments({
      updatedAt: { $gte: thirtyDaysAgo }
    });
    
    const oldDetails = await db.collection('productDetails').countDocuments({
      updatedAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    
    const detailsChange = oldDetails > 0 
      ? Math.round(((newDetails - oldDetails) / oldDetails) * 100) 
      : 0;

    // Get product assignments data
    const productAssignments = await db.collection('productAssignments').find({})
      .sort({ updatedAt: -1 })
      .limit(100)
      .toArray();
    
    // For each assignment, get a product name
    const recentAssignments = [];
    for (let i = 0; i < Math.min(4, productAssignments.length); i++) {
      const assignment = productAssignments[i];
      let productName = 'Unknown Product';
      
      if (assignment.productIds && assignment.productIds.length > 0) {
        const productId = assignment.productIds[0];
        const product = await db.collection('products').findOne({ _id: new ObjectId(productId) });
        if (product) {
          productName = product.name;
        }
      }
      
      recentAssignments.push({
        id: assignment._id.toString(),
        productName,
        brandName: assignment.brand,
        timestamp: assignment.updatedAt || new Date()
      });
    }
    
    // Calculate change percentage for assignments
    const newAssignments = await db.collection('productAssignments').countDocuments({
      updatedAt: { $gte: thirtyDaysAgo }
    });
    
    const oldAssignments = await db.collection('productAssignments').countDocuments({
      updatedAt: { $gte: sixtyDaysAgo, $lt: thirtyDaysAgo }
    });
    
    const assignmentsChange = oldAssignments > 0 
      ? Math.round(((newAssignments - oldAssignments) / oldAssignments) * 100) 
      : 0;

    // Get product enquiries data
    const productEnquiries = await db.collection('productEnquiries').find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    
    const productEnquiryData = {
      total: await db.collection('productEnquiries').countDocuments(),
      recent: productEnquiries.map(enquiry => ({
        id: enquiry._id.toString(),
        productName: enquiry.productName || 'Unknown Product',
        customerName: enquiry.name || 'Unknown Customer',
        status: enquiry.status || 'new',
        timestamp: enquiry.createdAt || new Date()
      })),
      pending: await db.collection('productEnquiries').countDocuments({ status: 'new' }),
      resolved: await db.collection('productEnquiries').countDocuments({ status: 'resolved' })
    };

    // Get contact submissions data
    const contactSubmissions = await db.collection('contactSubmissions').find({})
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    
    const recentContacts = contactSubmissions.slice(0, 4).map(contact => ({
      id: contact._id.toString(),
      name: `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Anonymous',
      email: contact.email || 'No email',
      subject: contact.subject || 'No subject',
      status: contact.status || 'New',
      timestamp: contact.createdAt || new Date()
    }));
    
    // Count pending and resolved contacts
    const pendingContacts = await db.collection('contactSubmissions').countDocuments({
      status: { $in: ['New', 'Pending', 'In Progress'] }
    });
    
    const resolvedContacts = await db.collection('contactSubmissions').countDocuments({
      status: 'Resolved'
    });

    // Return all the data
    return res.status(200).json({
      productData: {
        total: products.length,
        recent: recentProducts,
        change: productChange
      },
      productDetailData: {
        total: productDetails.length,
        recent: recentProductDetails,
        change: detailsChange
      },
      productAssignmentData: {
        total: productAssignments.length,
        recent: recentAssignments,
        change: assignmentsChange
      },
      productEnquiryData: {
        total: await db.collection('productEnquiries').countDocuments(),
        recent: productEnquiries.map(enquiry => ({
          id: enquiry._id.toString(),
          productName: enquiry.productName || 'Unknown Product',
          customerName: enquiry.name || 'Unknown Customer',
          status: enquiry.status || 'new',
          timestamp: enquiry.createdAt || new Date()
        })),
        pending: await db.collection('productEnquiries').countDocuments({ status: 'new' }),
        resolved: await db.collection('productEnquiries').countDocuments({ status: 'resolved' })
      },
      contactData: {
        total: contactSubmissions.length,
        recent: recentContacts,
        pending: pendingContacts,
        resolved: resolvedContacts
      },
      lastUpdated: new Date()
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    res.status(500).json({ message: 'Failed to fetch dashboard data', error: String(error) });
  }
}

// Export with authentication protection
export default withAuth(dashboardHandler);