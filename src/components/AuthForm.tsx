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

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(email, password);
        alert("login successful")
      } else {
        await signup(email, password);
         alert("sign up successful");
      }
      sessionStorage.setItem("isAuthenticated", "true");
      router.push("/movies");
      console.log("isAuthenticated", sessionStorage.getItem("isAuthenticated"));
      console.log("isLogin", isLogin);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "An error occurred");
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
