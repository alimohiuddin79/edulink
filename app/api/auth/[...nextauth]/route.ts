import bcrypt from "bcrypt";
import NextAuth, { AuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/app/mongodb/config/db";
import User from "@/app/mongodb/models/User";


export const authOptions: AuthOptions = {
    providers: [
        // GoogleProvider({
        //     clientId: process.env.GOOGLE_CLIENT_ID as string,
        //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        // }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials){
                await connectDB();
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Invalid Credentials');
                }

                try {
                    const user = await User.findOne({
                        email: credentials.email,
                    })
    
                    if (!user || !user?.password) {
                        throw new Error('Invalid Credentials');
                    }
    
                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );
    
                    if (!isCorrectPassword) {
                        throw new Error('Invalid Credentials');
                    }
    
                    return user as any;
                } catch (error: any) {
                    console.log(error);
                    throw new Error('Invalid Credentials');
                }
            } 
        })
    ],
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST};