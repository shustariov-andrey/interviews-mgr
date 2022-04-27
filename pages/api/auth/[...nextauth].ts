import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from '../../../lib/mongodb';

if (typeof process.env.GITHUB_ID !== 'string') {
  throw new Error('GITHUB_ID variable is not provided');
}
if (typeof process.env.GITHUB_SECRET !== 'string') {
  throw new Error('GITHUB_SECRET variable is not provided');
}
if (typeof process.env.GOOGLE_CLIENT_ID !== 'string') {
  throw new Error('GOOGLE_CLIENT_ID variable is not provided');
}
if (typeof process.env.GOOGLE_CLIENT_SECRET !== 'string') {
  throw new Error('GOOGLE_CLIENT_SECRET variable is not provided');
}

const options: NextAuthOptions = {
  providers: [
    // https://github.com/settings/apps/interviews-manager
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // https://console.cloud.google.com/apis/credentials/oauthclient/1077196751114-5cro4cp0oc741iujoiette2jq2n7k3d6.apps.googleusercontent.com
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(options);