import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from '../components/Layout';
import AnalyticsTracker from '../components/AnalyticsTracker';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <AnalyticsTracker />
    </Layout>
  );
}
