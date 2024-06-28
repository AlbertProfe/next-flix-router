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

export async function getMovie(id: string): Promise<Movie | null> {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix'); // Make sure this is your correct database name
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(id) });

    if (!movie) return null;
    console.log("movie:", movie)
    
    return {
      _id: movie._id.toString(),
      title: movie.title,
      year: movie.year,
      poster: movie.poster,
      plot: movie.plot,
      rated: movie.rated,
      runtime: movie.runtime
    } as Movie;
  } catch (error) {
    console.error('Error fetching movie:', error);
    return null;
  }
}

export async function getMovieByTitle(title: string): Promise<Movie[]> {
  const client = await clientPromise;
  const db = client.db('sample_mflix');
  
  const movies = await db.collection('movies')
    .find({ title: { $regex: title, $options: 'i' } })
    .project({
      title: 1,
      year: 1,
      poster: 1,
      plot: 1,
      rated: 1,
      runtime: 1
    })
    .limit(10)
    .toArray() as Movie[];

  return movies;
}

export async function deleteMovieById(id: string): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix'); // Ensure this is your correct database name
    const result = await db.collection('movies').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 1) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error deleting movie:', error);
    return false;
  }
}

export async function updateMovieById(id: string, updateData: Partial<Movie>): Promise<boolean> {
  try {
    const client = await clientPromise;
    const db = client.db('sample_mflix'); // Ensure this is your correct database name
    const result = await db.collection('movies').updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return result.modifiedCount === 1;
  } catch (error) {
    console.error('Error updating movie:', error);
    return false;
  }
}