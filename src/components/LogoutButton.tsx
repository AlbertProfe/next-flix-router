"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="hover:text-gray-300">
      Logout
    </button>
  );
}
