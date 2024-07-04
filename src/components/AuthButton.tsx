"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (session) {
    return <LogoutButton />;
  }

  return (
    <Link href="/auth" className="hover:text-gray-300 block">
      Login / Sign Up
    </Link>
  );
}
