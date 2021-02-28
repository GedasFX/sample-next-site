import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}
