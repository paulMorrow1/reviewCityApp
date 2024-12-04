import { prisma } from "@/lib/prisma";
// import { signInSchema } from "@/lib/zod";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcrypt";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  // adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        let user = null;

        // const { email, password } = await signInSchema.parseAsync(credentials);

        // console.log("prisma: ", JSON.stringify(prisma, null, 2));
        // logic to verify if the user exists
        user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });
        console.log("user found: ", JSON.stringify(user, null, 2));
        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("User not found.");
        }

        if (!isPasswordValid) {
          throw new Error("Invalid email or password.");
        }

        // return user object with their profile data
        return user;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          sessionId: token.id,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          sessionId: u.id,
        };
      }
      return token;
    },
  },
});
