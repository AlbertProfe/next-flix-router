import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";
import LogoutButton from "@/components/LogoutButton";
import SidebarToggle from "@/components/SidebarToggle";

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
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return (
    <html lang="en">
      <body className={inter.className}>
        <nav
          className="bg-gray-800 text-white flex flex-col fixed inset-y-0 left-0 z-30 transition-transform duration-300 ease-in-out transform -translate-x-full md:translate-x-0 w-64 md:w-72 lg:w-80"
          id="sidebar"
        >
          <div className="flex-grow overflow-y-auto p-4">
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
            </ul>
          </div>
          <div className="p-4 border-t border-gray-700">
            {!token ? (
              <Link href="/auth" className="hover:text-gray-300 block">
                Login / Sign Up
              </Link>
            ) : (
              <LogoutButton />
            )}
          </div>
        </nav>

        <SidebarToggle />

        <main className="md:ml-72 lg:ml-80 p-8">{children}</main>
      </body>
    </html>
  );
}
