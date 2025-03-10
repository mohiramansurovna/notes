import NextAuth, {DefaultSession} from 'next-auth';
import authConfig from './auth.config';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {db} from './lib/db';
import {getUserById} from './lib/users';
import {getAccountById} from './lib/accout';

declare module 'next-auth' {
    interface Session {
        user: {
            imageUrl?: string;
            miniImageUrl?: string;
            theme: string;
            mode: string;
            font: string;
            language: string;
        } & DefaultSession['user'];
    }
}
export const {handlers, signIn, signOut, auth} = NextAuth({
    ...authConfig,
    adapter: PrismaAdapter(db),
    session: {strategy: 'jwt'},
    callbacks: {
        async signIn({user, account}) {
            if (account?.provider !== 'credentials') return true;

            if (!user.id) return false;

            return true;
        },
        async session({session, token}) {
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }

            if (session.user) {
                session.user.name = token.name as string;
                session.user.email = token.email as string;
                if (token.imageUrl) {
                    session.user.imageUrl = token.imageUrl as string;
                }
                if (token.miniImage) {
                    session.user.miniImageUrl = token.miniImageUrl as string;
                }
                if (token.theme) {
                    session.user.theme = token.theme as string;
                }
                if (token.mode) {
                    session.user.mode = token.mode as string;
                }
                if (token.font) {
                    session.user.font = token.font as string;
                }
                if (token.language) {
                    session.user.language = token.language as string;
                }
            }
            return session;
        },
        async jwt({token}) {
            if (!token.sub) return token;
            const existingUser = await getUserById(token.sub);
            if (!existingUser) return token;
            const existingAccount = await getAccountById(existingUser.id);
            token.isOauth = existingAccount ? true : false;
            token.name = existingUser.name;
            token.email = existingUser.email;
            if (existingUser.imageUrl) {
                token.imageUrl = existingUser.imageUrl;
            }
            if (existingUser.miniImageUrl) {
                token.miniImageUrl = existingUser.miniImageUrl;
            }
            if (existingUser.theme) {
                token.theme = existingUser.theme;
            }
            if (existingUser.mode) {
                token.mode = existingUser.mode;
            }
            if (existingUser.font) {
                token.font = existingUser.font;
            }
            if (existingUser.language) {
                token.language = existingUser.language;
            }
            return token;
        },
        async redirect({url, baseUrl}) {
            if (url.startsWith('/')) {
                return `${baseUrl}${url}`;
            }

            if (new URL(url).origin === baseUrl) {
                return url;
            }

            return baseUrl;
        },
    },
});
