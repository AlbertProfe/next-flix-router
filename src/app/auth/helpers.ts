"use server";
import { signIn as naSignIn, signOut as naSignOut } from "./auth";

export async function signIn(p0: string, p1: { redirect: boolean; email: string; password: string; isLogin: boolean; }) {
  await naSignIn();
}

export async function signOut() {
  await naSignOut();
}