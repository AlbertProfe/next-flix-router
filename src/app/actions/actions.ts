'use server'

import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { Movie } from '../../types/Movie';

export async function getMovies(page: number, limit = 20): Promise<{ movies: Movie[], total: number }> {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  
  const skip = (page - 1) * limit;
  const movies = await db.collection('movies')
    .find({})
    .project({
      title: 1,
      year: 1,
      poster: 1,
      plot: 1,
      rated: 1,
      runtime: 1
    })
    .skip(skip)
    .limit(limit)
    .toArray() as Movie[];

  const total = await db.collection('movies').countDocuments();

  return { movies, total };
}

export async function addMovie(movieData: any) {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  
  const result = await db.collection('movies').insertOne(movieData);
  return result;
}

export async function getMovie(id: string) {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  
  const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });
  return movie;
}