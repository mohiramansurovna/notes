import Google from 'next-auth/providers/google';
import GitHub from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';
import {getUserByEmail, getUserById} from './lib/users';
import {LoginSchema} from './schemas';
import bcryptjs from 'bcryptjs';
export default {
    providers: [
        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            async authorize(credentials: any) {
                const verifications = LoginSchema.safeParse(credentials);
                if (!verifications.success) return null;
                const {email, password} = verifications.data;
                const user = await getUserByEmail(email);
                if (!user || !user.password) return null;
                const passwordMatch = await bcryptjs.compare(password, user.password);
                if (passwordMatch) return user;
                return null;
            },
        }),
    ],
}