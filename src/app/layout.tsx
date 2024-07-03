import { getServerSession } from "next-auth/next";
import Link from "next/link";
import "./globals.css";
import { authOptions } from "./api/auth/[...nextauth]/route";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SidebarToggle from "@/components/SidebarToggle";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MFlix",
  description: "Movie database app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
 
const session = await getServerSession(authOptions);
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
              <li className="mb-2">
                <Link href="/auth" className="hover:text-gray-300">
                  Login / Sign up
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <SidebarToggle />

        <main className="md:ml-72 lg:ml-80 p-8">{children}</main>
      </body>
    </html>
  );
}