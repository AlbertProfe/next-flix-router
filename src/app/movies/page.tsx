import { getMovies } from "../actions/actions";
import Link from "next/link";
import MoviesList from "./MoviesList";

export default async function Movies({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = parseInt(searchParams.page || "1");
  const { movies, total } = await getMovies(page);

  return (
    <MoviesList
      initialMovies={movies}
      initialTotal={total}
      initialPage={page}
    />
  );
}
