
"use client";

import { useState } from "react";
import { Movie } from "@/types/Movie";


interface UpdateMovieProps {
  movie: Movie;
  onUpdate: (updateData: Partial<Movie>) => Promise<boolean>;
  onCancel: () => void;
}

export default function UpdateMovie({
  movie,
  onUpdate,
  onCancel,
}: UpdateMovieProps) {
  const [title, setTitle] = useState(movie.title);
  const [year, setYear] = useState(movie.year?.toString() || "");
  const [rated, setRated] = useState(movie.rated || "");
  const [runtime, setRuntime] = useState(movie.runtime?.toString() || "");
  const [plot, setPlot] = useState(movie.plot || "");
  const [isUpdating, setIsUpdating] = useState(false);

 
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    const updateData: Partial<Movie> = {
      title,
      year: year ? parseInt(year) : undefined,
      rated,
      runtime: runtime ? parseInt(runtime) : undefined,
      plot,
    };
    try {
    const success = await onUpdate(updateData);
    } catch (error) {
        alert("Failed to update movie. Please try again.");
    } finally {
      setIsUpdating(false);
      onCancel(); // Go back to movie detail view
    }
   
  };

  return (
    <div className="container mx-auto p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Update Movie</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Year
          </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="rated"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Rated
          </label>
          <input
            type="text"
            id="rated"
            value={rated}
            onChange={(e) => setRated(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="runtime"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Runtime (minutes)
          </label>
          <input
            type="number"
            id="runtime"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="plot"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Plot
          </label>
          <textarea
            id="plot"
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isUpdating}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isUpdating ? "Updating..." : "Update Movie"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
