import { getMovies } from "../actions/actions";
import Link from "next/link";
import MoviesList from "./MoviesList";
import { Movie } from "../../types/Movie";

export default async function Movies({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const { movies, total } = await getMovies(page);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Movies</h1>
        <Link
          href="/add-movie"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add New Movie
        </Link>
      </div>
      <MoviesList
        initialMovies={movies as Movie[]}
        initialTotal={total}
        initialPage={page}
      />
    </div>
  );
}
