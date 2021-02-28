import Link from 'next/link';

import LogoFull from 'src/components/brand/LogoFull';

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-40 bg-gray-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a>
            <LogoFull />
          </a>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          <Link href="/">
            <a className="mr-5 hover:text-gray-900">Home</a>
          </Link>
          <Link href="/history">
            <a className="mr-5 hover:text-gray-900">History</a>
          </Link>
          <Link href="/cart">
            <a className="mr-5 hover:text-gray-900">Cart</a>
          </Link>
        </nav>
      </div>
    </header>
  );
}
