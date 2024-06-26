
import MovieDetail from "./MovieDetail";
import {
  getMovie,
  deleteMovieById,
  updateMovieById,
} from "../../actions/actions";
import { redirect } from "next/navigation";
import { Movie } from "@/types/Movie";


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

   async function handleUpdate(updateData: Partial<Movie>) {
     "use server";
     const success = await updateMovieById(params.id, updateData);
     if (success) {
       // Refresh the page to show updated data
       redirect(`/movies/${params.id}`);
     }
     return success;
   }

  return (
    <MovieDetail
      movie={movie}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
    />
  );
}