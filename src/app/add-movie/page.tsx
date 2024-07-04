"use client";

import { useState } from "react";
import { addMovie } from "../actions/actions";

export default function AddMovie() {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [poster, setPoster] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addMovie({ title, year: parseInt(year), poster });
    setTitle("");
    setYear("");
    setPoster("");
    alert("Movie added successfully!");
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Add Movie</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
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
            required
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
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="poster"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Poster URL
          </label>
          <input
            type="text"
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Movie
        </button>
      </form>
    </div>
  );
}
