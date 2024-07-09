import NextAuth, { User, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import { getCsrfToken } from "next-auth/react";


export const BASE_PATH = "/api/auth";

const authOptions: NextAuthConfig = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        console.log("credentials", credentials);
      
       if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const client = await clientPromise;
        const db = client.db('sample_mflix');
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: credentials.email });

       
        if (!user || user.password !== credentials.password) {
            throw new Error("Invalid email or password");
          }
      
          
        console.log("user", user);

        return user
          ? {email: user.email }
          : null;

      },
    }),
  ],
  basePath: BASE_PATH,
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
     async jwt({ token }) {
      return token;
    },
    async session({ session, token }) {
     session.sessionToken = token;
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth", signOut: "/auth"
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);