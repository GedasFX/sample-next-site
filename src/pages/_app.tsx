import type { AppProps } from 'next/app';
import Head from 'next/head';

import useStore from 'src/store';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import 'tailwindcss/tailwind.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'src/styles/global.css';

import Layout from 'src/layout';

const APP_NAME = 'Next.JS Starter';
const APP_DESCRIPTION = 'Next.JS Starter';

export default function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore(pageProps.initialReduxState);
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {() => (
          <>
            <Head>
              <meta name="application-name" content={APP_NAME} />
              <meta name="apple-mobile-web-app-capable" content="yes" />
              <meta name="apple-mobile-web-app-status-bar-style" content="default" />
              <meta name="apple-mobile-web-app-title" content={APP_NAME} />
              <meta name="description" content={APP_DESCRIPTION} />
              <meta name="format-detection" content="telephone=no" />
              <meta name="mobile-web-app-capable" content="yes" />
              <meta name="theme-color" content="#FFFFFF" />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
              />

              <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
              <link rel="manifest" href="/manifest.json" />
              <link rel="shortcut icon" href="/icons/favicon.ico" />
            </Head>

            <Layout>
              <Component {...pageProps} />
            </Layout>
          </>
        )}
      </PersistGate>
    </Provider>
  );
}
