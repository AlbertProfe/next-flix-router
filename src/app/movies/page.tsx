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
    <div>
      <h1 className="text-3xl font-bold mb-4">Movies</h1>
      <MoviesList
        initialMovies={movies as Movie[]}
        initialTotal={total}
        initialPage={page}
      />
    </div>
  );
}
