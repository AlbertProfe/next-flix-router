"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { signIn } from "../app/auth/helpers";

const AuthButton = () => {
  const { data: session} = useSession();
  console.log("session-authButton", session);

  if (session) {
    return (
      <>
        <p className="text-xs text-gray-500">{session.expires}</p>
        <p>Log in as {session.user?.email}</p>
        <LogoutButton />
      </>
    );
  }

  return (
    <>
    
      <Link href="/auth">Log in / Sign up</Link>
    </>
  );
};

export default AuthButton;
