'use server'

import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"
import { JWT } from "next-auth/jwt"
import bcrypt from "bcryptjs"



export const  authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isLogin: { label: "Is Login", type: "boolean" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }
        const client = await clientPromise
        const db = client.db('sample_mflix')
        const userCollection = db.collection("users")
        console.log("hit db", db);
        try {
          if (credentials.isLogin === "true") {
            const user = await userCollection.findOne({ email: credentials.email })
            
            console.log("user", user);
            if (!user) throw new Error("No user found with this email")
            const isValid = await bcrypt.compare(credentials.password, user.password)
            if (!isValid) throw new Error("Invalid password")
            return { id: user._id.toString(), email: user.email }
          } else {
            if (await userCollection.findOne({ email: credentials.email })) {
              throw new Error("User already exists with this email")
            }
            const hashedPassword = await bcrypt.hash(credentials.password, 10)
            await userCollection.insertOne({ email: credentials.email, password: hashedPassword })
            return { id: (await userCollection.insertOne({ email: credentials.email, password: hashedPassword })).insertedId.toString(), email: credentials.email }
          }
        } catch (error) {
          throw error
        }
      },
    }),
  ],
  pages: { signIn: "/auth" },
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: any }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
