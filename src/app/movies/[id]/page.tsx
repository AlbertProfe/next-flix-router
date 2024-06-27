
import MovieDetail from "./MovieDetail";
import { getMovie, deleteMovieById } from "../../actions/actions";
import { redirect } from "next/navigation";



export default async function MovieDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const movie = await getMovie(params.id);

  if (!movie) {
    return <div>Movie not found</div>;
  }

  async function handleDelete() {
    "use server";
    const success = await deleteMovieById(params.id);
    if (success) {
      redirect("/movies");
    } else {
      console.error("Failed to delete movie");
      // You might want to handle this error case differently
    }
  }

  return <MovieDetail movie={movie} onDelete={handleDelete} />;
}