import { NextApiRequest, NextApiResponse } from 'next';
import { generateToken } from '../../../lib/jwt';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = generateToken({
      userId: 'admin-1',
      username: username,
      role: 'admin'
    });

    res.status(200).json({ 
      success: true, 
      token,
      user: { username, role: 'admin' }
    });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}