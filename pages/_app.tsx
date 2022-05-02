import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app'
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
