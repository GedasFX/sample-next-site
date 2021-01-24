import dynamic from 'next/dynamic';
import { useState } from 'react';

// In some cases SSR will work, but in most of the more advanced usages of the library having SSR enabled will break the renderer.
const Canvas = dynamic(() => import('src/components/AppCanvas'), { ssr: false });

export default function ScenePage() {
  const [scene, setScene] = useState('intro-1');

  return (
    <>
      <button
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 50 }}
        onClick={() => {
          setScene(s => (s === 'intro-2' ? 'intro-1' : 'intro-2'));
        }}
      >
        Cycle Scene
      </button>
      <Canvas sceneId={scene} />
    </>
  );
}
