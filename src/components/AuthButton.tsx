"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { signIn } from "../app/auth/helpers";

const AuthButton = () => {
  const { data: session } = useSession();
  console.log("session", session);

  if (session) {
    return (
      <>
        <p>Log in as {session.user?.email}</p>
        <LogoutButton />
      </>
    );
  }

  return (
    <>
      <button onClick={() => signIn()}>Log in / </button>
      <Link href="/auth">{" "}Sign up</Link>
    </>
  );
};

export default AuthButton;
