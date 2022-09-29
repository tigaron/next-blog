import type { AppProps } from 'next/app';
import 'tailwindcss/tailwind.css';
import '@/styles/globals.scss';
import React from 'react';
import Layout from '@/components/Layout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
