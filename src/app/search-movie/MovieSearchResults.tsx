import React from "react";
import Link from "next/link";
import { Movie } from "../../types/Movie";

interface MovieSearchResultsProps {
  movies: Movie[];
}

const MovieSearchResults: React.FC<MovieSearchResultsProps> = ({ movies }) => {
  if (movies.length === 0) {
    return <p>No movies found.</p>;
  }

  return (
    <table className="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b">Title</th>
          <th className="px-4 py-2 border-b">Year</th>
          <th className="px-4 py-2 border-b">Rated</th>
          <th className="px-4 py-2 border-b">Runtime</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td className="px-4 py-2 border-b">
              <Link
                href={`/movies/${movie._id}`}
                className="text-blue-600 hover:underline"
              >
                {movie.title}
              </Link>
            </td>
            <td className="px-4 py-2 border-b">{movie.year}</td>
            <td className="px-4 py-2 border-b">{movie.rated}</td>
            <td className="px-4 py-2 border-b">{movie.runtime}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MovieSearchResults;
