"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";;

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const result = await signOut();
    console.log("result-logOut", result);
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
