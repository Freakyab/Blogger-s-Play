import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
require('dotenv').config();

const credentials = CredentialsProvider({
  name: 'Credentials',
  credentials: {
    username: { label: 'Username', type: 'text' },
    password: { label: 'Password', type: 'password' },
  },
  authorize: async (credentials) => {
    const { username, password } = credentials;

    // Check if the request is for sign-up or login
    const isSignUp = !!credentials.name;

    try {
      const response = await fetch(
        isSignUp ? 'https://blogger-play.vercel.app/signup' : 'https://blogger-play.vercel.app/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username,
            password,
            name: isSignUp ? credentials.name : undefined,
          }),
        }
      );
      const data = await response.json();

      if (data.success && data.id && data.name) {
        return { id: data.id, name: data.name };
      } else {
        throw new Error('Authentication failed');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Authentication failed';
      throw new Error(errorMessage);
    }
  },
});

const google = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});



export default NextAuth({
  providers: [
    google,
    credentials,
    /* Add other providers here */
  ],
  session: {
    jwt: true,
    maxAge: 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    signIn: async (account) => {
      if (account.account.provider === 'google') {
        const { email, name } = account.profile;
        const response = await fetch('https://blogger-play.vercel.app/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username : name, password : email + name}),
        });
        const data = await response.json();
        if (data.success && data.id && data.name) {
          account.user.id = data.id;
          return account;
        }
        const response2 = await fetch('https://blogger-play.vercel.app/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({username : name, password : email + name, name : name}),
        });
        const data2 = await response2.json();
        if (data2.success && data2.id && data2.name) {
          account.user.id = data2.id;
          return account;
        }
        return false;
      }
      return true;
    },
    
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
    
  },
});