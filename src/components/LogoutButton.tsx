"use client";

import { useRouter } from "next/navigation";
import { signOut } from "../app/auth/helpers";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    console.log("Logged out");
    router.push("/");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="hover:text-gray-300">
      Logout
    </button>
  );
}
