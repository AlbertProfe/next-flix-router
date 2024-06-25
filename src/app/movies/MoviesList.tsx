"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import posterNotFound from "../../../public/notfound_portrait.jpg"

export default function MoviesList({
  initialMovies,
  initialTotal,
  initialPage,
}) {
  const [movies, setMovies] = useState(initialMovies);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(initialPage);
  const router = useRouter();

  const totalPages = Math.ceil(total / 20);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/movies?page=${newPage}`);
  };

  return (
    <div>
   
      <div className="container p-4">
        <div className="columns-3 m-8 gap-y-8">
          {movies.map((movie: any) => (
            <div
              key={movie._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden mb-8"
            >
              <div className="relative h-96">
                <Image
                  src={movie.poster || posterNotFound }
                  alt={movie.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <h2 className="text-xl font-bold text-white truncate">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-gray-300">{movie.year}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-2 truncate">
                  {movie.plot || "No plot available"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-indigo-600">
                    {movie.rated || "Not rated"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {movie.runtime || "Unknown"} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
                page === i + 1
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>
  );
}
