// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Explicitly export authOptions
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (credentials?.username === "admin" && credentials?.password === "admin123") {
          return { id: "1", name: "Admin" };
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// Export NextAuth with authOptions
export default NextAuth(authOptions);