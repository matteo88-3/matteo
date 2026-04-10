import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcrypt";

// Define custom user type

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET, // Corrected SECRETE to SECRET
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials.password) {
                    return null;
                }
                const userFinding = await db.usersAccount.findFirst({
                    where: {
                        email: credentials.username
                    }
                });
                if (!userFinding) {
                    return null;
                }
                const passwordChecking = await compare(credentials.password, userFinding.passwords);

                if (!passwordChecking) {
                    return null;
                }
            
                
                return {
                    id: `${userFinding.userIdno}`,
                    email: userFinding.email,
                    phoneNumber: userFinding.phonenumber,
                    role: userFinding.access // Fix here
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                return {
                    ...token,
                    id: user.id,
                }
            }
            return token;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    role: token.role
                }
            }
        },
    },
};
