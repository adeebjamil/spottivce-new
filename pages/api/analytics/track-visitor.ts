import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('spottive');
    
    const { 
      sessionId, 
      userAgent, 
      path,
      referrer,
      timestamp = new Date(),
      timeOnSite = 0
    } = req.body;

    // Detect device type
    const ua = userAgent?.toLowerCase() || '';
    let device = 'desktop';
    
    if (ua.includes('mobile') || ua.includes('android') || ua.includes('iphone') || ua.includes('phone')) {
      device = 'mobile';
    } else if (ua.includes('tablet') || ua.includes('ipad')) {
      device = 'tablet';
    }

    // Detect browser
    let browser = 'Other';
    if (ua.includes('chrome') && !ua.includes('edg') && !ua.includes('opr')) {
      browser = 'Chrome';
    } else if (ua.includes('firefox')) {
      browser = 'Firefox';
    } else if (ua.includes('safari') && !ua.includes('chrome')) {
      browser = 'Safari';
    } else if (ua.includes('edg')) {
      browser = 'Edge';
    } else if (ua.includes('opr') || ua.includes('opera')) {
      browser = 'Opera';
    }

    // Get IP and determine country - FIXED FOR DEVELOPMENT
    const forwardedFor = req.headers['x-forwarded-for'];
    const ip = Array.isArray(forwardedFor) 
      ? forwardedFor[0] 
      : forwardedFor?.split(',')[0] || req.socket.remoteAddress || 'unknown';
    
    let visitorCountry = 'Unknown';
    
    // DEVELOPMENT vs PRODUCTION logic
    if (process.env.NODE_ENV === 'development') {
      // IN DEVELOPMENT: Use test data
      console.log('🔧 Development mode - using test country data');
      visitorCountry = 'Test Location';
      
      // Optional: Simulate different countries for testing
      const testCountries = ['United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman'];
      visitorCountry = testCountries[Math.floor(Math.random() * testCountries.length)];
      
    } else {
      // IN PRODUCTION: Use real GeoIP
      console.log('🌍 Production mode - using real GeoIP');
      
      if (ip && ip !== '127.0.0.1' && ip !== '::1' && !ip.startsWith('192.168.') && !ip.startsWith('10.')) {
        try {
          visitorCountry = await getCountryFromIP(ip);
        } catch (error) {
          console.log('GeoIP lookup failed:', error);
          visitorCountry = 'Unknown';
        }
      }
    }

    // Check if this is a unique visitor
    const existingVisitor = await db.collection('siteVisitors').findOne({ 
      sessionId: sessionId 
    });

    if (!existingVisitor) {
      // New unique visitor
      await db.collection('siteVisitors').insertOne({
        sessionId,
        userAgent,
        device,
        browser,
        country: visitorCountry,
        referrer,
        timestamp: new Date(timestamp),
        timeOnSite,
        ip,
        firstVisit: new Date(timestamp),
        lastActivity: new Date(timestamp),
        environment: process.env.NODE_ENV || 'development'
      });
    } else {
      // Update existing visitor
      await db.collection('siteVisitors').updateOne(
        { sessionId },
        { 
          $set: { 
            lastActivity: new Date(timestamp),
            timeOnSite: Math.max(existingVisitor.timeOnSite || 0, timeOnSite)
          }
        }
      );
    }

    // Store page view
    await db.collection('pageViews').insertOne({
      sessionId,
      path,
      timestamp: new Date(timestamp),
      userAgent,
      referrer,
      device,
      browser,
      country: visitorCountry,
      environment: process.env.NODE_ENV || 'development'
    });

    console.log(`📊 Tracked visitor: ${visitorCountry} (${process.env.NODE_ENV})`);
    res.status(200).json({ 
      success: true, 
      country: visitorCountry,
      environment: process.env.NODE_ENV
    });

  } catch (error) {
    console.error('Error tracking visitor:', error);
    res.status(500).json({ error: 'Failed to track visitor' });
  }
}

async function getCountryFromIP(ip: string): Promise<string> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    const response = await fetch(`https://ipapi.co/${ip}/country_name/`, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (response.ok) {
      const country = await response.text();
      return country.trim() || 'Unknown';
    }
    
    return 'Unknown';
  } catch (error) {
    console.error('GeoIP service failed:', error);
    return 'Unknown';
  }
}