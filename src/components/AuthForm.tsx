"use client";

import { useState } from "react";
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
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
     setError("");
    try {
      if (isLogin) {
        const result = await login(email, password);
        if ( result.success) {
          alert("login successful");
          router.push("/movies");
          router.refresh(); // Force a refresh to update the UI
        } else {
          setError(result?.error || "Login failed");
        }
        
      } else {
        const result = await signup(email, password);
        if (result.success) {
          alert("sign up successful");
          router.push("/login");
        }
       
      }
      sessionStorage.setItem("isAuthenticated", "true");
      router.push("/movies");
      console.log("isAuthenticated", sessionStorage.getItem("isAuthenticated"));
      console.log("isLogin", isLogin);
    } catch (error) {
     console.error("Authentication error:", error);
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
