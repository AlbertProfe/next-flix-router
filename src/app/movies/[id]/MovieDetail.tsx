"use client";

import Image from "next/image";
import { Movie } from "@/types/Movie";
import NotFoundPortrait from "../../../../public/notfound_portrait.jpg";
import { useState } from "react";
import UpdateMovie from "./UpdateMovie";

interface MovieDetailProps {
  movie: Movie;
  onDelete: () => Promise<void>;
  onUpdate: (updateData: Partial<Movie>) => Promise<boolean>;
}

export default function MovieDetail({ movie, onDelete, onUpdate }: MovieDetailProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      setIsDeleting(true);
      try {
        await onDelete();
      } catch (error) {
        console.error("Error deleting movie:", error);
        alert("Failed to delete the movie. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleUpdate = () => {
    setIsUpdating(true);
  };

  if (isUpdating) {
    return (
      <UpdateMovie
        movie={movie}
        onUpdate={onUpdate}
        onCancel={() => setIsUpdating(false)}
      />
    );
  }

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
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:bg-red-300"
            >
              {isDeleting ? "Deleting..." : "Delete Movie"}
            </button>
            {" "}
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Update Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
