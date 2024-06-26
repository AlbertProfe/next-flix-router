"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import NotFoundPortrait from "../../../public/notfound_portrait.jpg";
import { getMovies } from "../actions/actions";
import { Movie } from "../../types/Movie";

interface MoviesListProps {
  initialMovies: Movie[];
  initialTotal: number;
  initialPage: number;
}

export default function MoviesList({
  initialMovies,
  initialTotal,
  initialPage,
}: MoviesListProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(initialPage);
  const router = useRouter();

  const totalPages = Math.ceil(total / 20);
  const pageGroup = Math.floor((page - 1) / 10);

  useEffect(() => {
    const fetchMovies = async () => {
      const { movies: newMovies, total: newTotal } = await getMovies(page);
      setMovies(newMovies);
      setTotal(newTotal);
    };

    if (page !== initialPage) {
      fetchMovies();
    }
  }, [page, initialPage]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    router.push(`/movies?page=${newPage}`, { scroll: false });
  };

  const renderPageButtons = () => {
    const start = pageGroup * 10 + 1;
    const end = Math.min(start + 9, totalPages);

    return Array.from({ length: end - start + 1 }, (_, i) => start + i).map(
      (pageNum) => (
        <button
          key={pageNum}
          onClick={() => handlePageChange(pageNum)}
          className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${
            page === pageNum
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-700 hover:bg-gray-50"
          }`}
        >
          {pageNum}
        </button>
      )
    );
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
                  src={movie.poster || NotFoundPortrait}
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
            onClick={() => handlePageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          {pageGroup > 0 && (
            <button
              onClick={() => handlePageChange(pageGroup * 10)}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ...
            </button>
          )}
          {renderPageButtons()}
          {(pageGroup + 1) * 10 < totalPages && (
            <button
              onClick={() => handlePageChange((pageGroup + 1) * 10 + 1)}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              ...
            </button>
          )}
          <button
            onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
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
