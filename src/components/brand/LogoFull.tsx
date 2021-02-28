import Logo from './Logo';

export default function LogoFull() {
  return (
    <div className="hidden md:flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <Logo />
      <span className="ml-3 text-xl">Tailblocks</span>
    </div>
  );
}
