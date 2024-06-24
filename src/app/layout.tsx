import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MFlix",
  description: "Movie database app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
            </ul>
          </nav>
          <main className="flex-1 p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
