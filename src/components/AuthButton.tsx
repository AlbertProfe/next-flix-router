"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function AuthButton() {
  const session = useSession();

  console.log("session", session);

  if (session.status === "loading") {
    return <div>Loading...</div>;
  }

  if (session.status === "authenticated") {
    return <LogoutButton />;
  }

  return (
    <Link href="/auth" className="hover:text-gray-300 block">
      Login / Sign Up
    </Link>
  );
}
