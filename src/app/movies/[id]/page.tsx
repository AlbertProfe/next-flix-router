
import { useRouter } from "next/router";
import { useEffect } from "react";
import MovieDetail from "./MovieDetail";
import { getMovie } from "../../actions/actions";

export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return <MovieDetail movie={movie} />;
}