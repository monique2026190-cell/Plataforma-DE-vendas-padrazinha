
import { Request, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

// Mocked user data - replace with your actual user data from a database
const users = [
  {
    id: 'user_123',
    email: 'test@example.com',
    stripeAccountId: 'acct_1P6gSgP2gSg2gSg2',
  },
];

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLoginHandler = async (req: Request, res: Response) => {
  const { credential } = req.body;

  if (!credential) {
    return res.status(400).json({ message: 'Credential token not provided.' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({ message: 'Invalid Google token.' });
    }

    // --- DATABASE LOGIC START ---
    // In a real application, you would find or create a user in your database
    // using the information from the payload (e.g., payload.email)
    let user = users.find(u => u.email === payload.email);
    if (!user) {
        // This is where you would create a new user in your database
        console.log(`User with email ${payload.email} not found. A real app would create one.`);
        // For this example, we'll just use a mock user if not found
        // In a real app, you would probably return an error or create the user
        return res.status(404).json({ message: "User not found."});
    }
    // --- DATABASE LOGIC END ---


    // Create a JWT for your application session
    const appJwt = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token: appJwt });

  } catch (error) {
    console.error('Error during Google login:', error);
    res.status(401).json({ message: 'Invalid or expired Google token.' });
  }
};
