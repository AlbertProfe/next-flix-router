import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "@/components/LogoutButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MFlix next-flix-router",
  description: "Movie database app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <nav className="w-64 min-h-screen bg-gray-800 text-white p-4">
            <h1 className="text-2xl font-bold mb-4">MFlix</h1>
            <ul>
              <li className="mb-2">
                <Link href="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/movies" className="hover:text-gray-300">
                  Movies
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/add-movie" className="hover:text-gray-300">
                  Add Movie
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/search-movie" className="hover:text-gray-300">
                  Search Movie
                </Link>
              </li>
              {!token ? (
                <li className="mb-2">
                  <Link href="/auth" className="hover:text-gray-300">
                    Login / Sign Up
                  </Link>
                </li>
              ) : (
                <li className="mb-2">
                  <LogoutButton />
                </li>
              )}
            </ul>
          </nav>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
