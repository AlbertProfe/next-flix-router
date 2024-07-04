import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";

export const authOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isLogin: { label: "Is Login", type: "boolean" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        const client = await clientPromise;
        const db = client.db('sample_mflix');
        const usersCollection = db.collection("users");

        const user = await usersCollection.findOne({ email: credentials.email });

        if (credentials.isLogin === "true") {
          // Login
          if (!user || user.password !== credentials.password) {
            throw new Error("Invalid email or password");
          }
        } else {
          // Sign up
          if (user) {
            throw new Error("User already exists");
          }

          const newUser = await usersCollection.insertOne({
            email: credentials.email,
            password: credentials.password, // Note: In a real app, hash this password
          });

          if (!newUser.insertedId) {
            throw new Error("Failed to create user");
          }
        }

        return { id: user?._id.toString() || "new_user", email: credentials.email };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth"
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };