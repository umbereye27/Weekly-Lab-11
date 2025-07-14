import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
async function getUser(email: string, password: string): Promise<any> {
  return {
    id: 1,
    name: "test user",
    email: email,
    password: password,
  };
}
export const authConfig = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    authorized({ auth }) {
      const isAuthenticated = !!auth?.user;
      console.log("Auth callback - isAuthenticated:", isAuthenticated);
      console.log("Auth callback - user:", auth?.user?.email || "No user");
      return isAuthenticated;
    },
    async signIn({ user, account, profile }) {
      console.log("SignIn callback - user:", user?.email);
      console.log("SignIn callback - account:", account?.provider);
      return true;
    },
    async session({ session, token }) {
      console.log("Session callback - session user:", session?.user?.email);
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        console.log("JWT callback - new user login:", user.email);
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const user = await getUser(
          credentials.email as string,
          credentials.password as string
        );

        return user ?? null;
      },
    }),
    Google,
  ],
} satisfies NextAuthConfig;
