'use server'

import clientPromise from '@/lib/mongodb';
import { sign, verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { User } from '@/types/User';
import { SignJWT } from 'jose';


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function signup(email: string, password: string) {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const result = await db.collection('users').insertOne({ email, password });
  const token = sign({ userId: result.insertedId.toString() }, JWT_SECRET, { expiresIn: '1h' });

  cookies().set('token', token, { httpOnly: true });
  return { success: true };
}

export async function login(email: string, password: string) {

  try {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  
  const user = await db.collection('users').findOne({ email, password });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
 const token = await new SignJWT({ userId: 'user._id.toString()' }) // Replace with actual user ID
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(JWT_SECRET);

    cookies().set('token', token, { 
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600 // 1 hour
    });

    return { success: true };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Login failed' };
  }

}

export async function logout() {
  cookies().delete('token');
  return { success: true };
}

export async function getUser(): Promise<User | null> {
  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const decoded = verify(token, JWT_SECRET) as { userId: string };
    const client = await clientPromise;
    const db = client.db('sample_mflix');
    const user = await db.collection('users').findOne({ _id: new ObjectId(decoded.userId) });
    return user ? { id: user._id.toString(), email: user.email } : null;
  } catch (error) {
    return null;
  }
}

