// import NextAuth from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { authConfig } from "@/auth.config";

import { handlers } from "@/auth";

// const handler = NextAuth(authConfig);

// export { handler as GET, handler as POST };
export const { GET, POST } = handlers;
