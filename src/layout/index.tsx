import { PropsWithChildren } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <div className="text-gray-600 body-font">
      <Header />
      <div className="mt-16 md:mt-20 container mx-auto">{children}</div>
      <Footer />
    </div>
  );
}
