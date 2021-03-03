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

const APP_NAME = 'Sample application';
const APP_DESCRIPTION = 'Sample application';

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
              <meta name="description" content={APP_DESCRIPTION} />
              <meta name="theme-color" content="#E8DFFF" />
              <meta
                name="viewport"
                content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
              />
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
