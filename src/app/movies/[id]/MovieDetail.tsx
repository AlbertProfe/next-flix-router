import Image from "next/image";
import { Movie } from "@/types/Movie";
import NotFoundPortrait from "../../../../public/notfound_portrait.jpg";

interface MovieDetailProps {
  movie: Movie;
}

export default function MovieDetail({ movie }: MovieDetailProps) {
  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <Image
              src={movie.poster || NotFoundPortrait}
              alt={movie.title}
              width={300}
              height={450}
              objectFit="cover"
            />
          </div>
          <div className="p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {movie.title}
            </h1>
            <p className="text-sm text-gray-600 mb-4">
              {movie.year && `Year: ${movie.year}`}
              {movie.rated && ` | Rated: ${movie.rated}`}
              {movie.runtime && ` | Runtime: ${movie.runtime} min`}
            </p>
            {movie.plot && <p className="text-gray-700 mb-4">{movie.plot}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
