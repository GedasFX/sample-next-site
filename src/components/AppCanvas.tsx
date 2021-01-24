import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';

type Props = {
  sceneId: string;
};

export default function AppCanvas({ sceneId }: Props): JSX.Element {
  const Scene = dynamic(() => import(`src/three/scenes/${sceneId}`));

  return (
    <>
      <div className="container">
        <div className="canvas">
          <Canvas>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
      </div>

      <style jsx>{`
        .container {
          height: 100vh;
          width: 100%;

          padding: 0.25rem;
        }
        .canvas {
          height: 100%;
          width: 100%;

          background-color: black;
        }
      `}</style>
    </>
  );
}
