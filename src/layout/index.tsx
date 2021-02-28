import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="text-gray-600 body-font">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
