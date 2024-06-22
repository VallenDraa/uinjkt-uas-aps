import NextAuth, { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import prisma from '@/utils/db';

const authOptions: AuthOptions = {
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'text' },
				password: { label: 'Password', type: 'password' },
			},

			async authorize(credentials) {
				try {
					if (!credentials) {
						throw new Error('No credentials provided');
					}

					const user = await prisma.user.findFirst({
						where: {
							email: credentials.email,
						},
					});

					if (user) {
						const isPasswordCorrect = await bcrypt.compare(
							credentials.password,
							user.password!,
						);
						if (isPasswordCorrect) {
							return user;
						}
					}

					return null;
				} catch (err: any) {
					throw new Error(err);
				}
			},
		}),
	],
	callbacks: {
		async signIn({ account }) {
			if (account?.provider == 'credentials') {
				return true;
			}

			return false;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
