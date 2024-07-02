"use client";

import { useSearchParams } from "next/navigation";
import AuthForm from "@/components/AuthForm";

export default function AuthPage() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">Authentication</h1>
        <AuthForm initialMode={mode === "signup" ? "signup" : "login"} />
      </div>
    </div>
  );
}
