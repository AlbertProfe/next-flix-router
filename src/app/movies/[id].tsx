// pages/movies/[id].tsx
import { useRouter } from "next/router";
import { useEffect } from "react";
import MovieDetail from ".//MovieDetail";

export default function MovieDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("Router query:", router.query);
    console.log("ID:", id);
  }, [router.query, id]);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!id) {
    return <div>No ID provided</div>;
  }

  const movieId = Array.isArray(id) ? id[0] : id;

  return <MovieDetail movieId={movieId} />;
}
