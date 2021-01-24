import dynamic from 'next/dynamic';

// In some cases SSR will work, but in most of the more advanced usages of the library having SSR enabled will break the renderer.
const Canvas = dynamic(() => import('src/components/AppCanvas'), { ssr: false });

export default function ScenePage() {
  return <Canvas />;
}
