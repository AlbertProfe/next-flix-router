"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const authStatus = sessionStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Welcome to MFlix</h1>
      <p className="text-xl mb-8 text-center">
        Your ultimate destination for movie enthusiasts!
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Discover Movies</h2>
          <p className="mb-4">
            Explore our vast collection of movies. From classics to the latest
            releases, we have got something for everyone.
          </p>
          <Link
            href="/movies"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Browse Movies
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">
            {isAuthenticated ? "Contribute" : "Join Our Community"}
          </h2>
          <p className="mb-4">
            {isAuthenticated
              ? "Add new movies to our database and help grow our collection."
              : "Sign up to unlock features like adding movies and personal watchlists."}
          </p>
          {isAuthenticated ? (
            <Link
              href="/add-movie"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Add a Movie
            </Link>
          ) : (
            <button
              onClick={() => router.push("/auth")}
              className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
            >
              Sign Up / Login
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Choose MFlix?</h2>
        <ul className="list-disc list-inside text-left max-w-md mx-auto">
          <li>Extensive movie database</li>
          <li>User-contributed content</li>
          <li>Personalized recommendations</li>
          <li>Community reviews and ratings</li>
        </ul>
      </div>
    </div>
  );
}
