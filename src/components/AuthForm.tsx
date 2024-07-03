"use client";

import { useState, useEffect } from "react";
import { signup, login } from "@/app/actions/auth";
import { useRouter } from "next/navigation";

type AuthFormProps = {
  initialMode?: "login" | "signup";
};

export default function AuthForm({ initialMode = "login" }: AuthFormProps) {
  const [isLogin, setIsLogin] = useState(initialMode === "login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/movies");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isLogin) {
        const result = await login(email, password);
        if (result.success) {
          sessionStorage.setItem("isAuthenticated", "true");
          setIsAuthenticated(true);
          alert("Login successful");
        } else {
          setError(result?.error || "Login failed");
          console.log(error);
        }
      } else {
        const result = await signup(email, password);
        if (result.success) {
          alert("Sign up successful");
          setIsLogin(true); // Switch to login mode after successful signup
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert(error instanceof Error ? error.message : "An error occurred");
      setError("An unexpected error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <br />
      <br />
      <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      <br />
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Sign Up" : "Login"}
      </button>
    </form>
  );
}
