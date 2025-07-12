
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from 'next-auth';
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
  strategy: 'jwt',
 },
//  pages: {
//   error: '/',
//   signIn: '/',
//   signOut: '/',
//  },
 callbacks: {
  authorized({ auth }) {
   const isAuthenticated = !!auth?.user;

   return isAuthenticated;
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