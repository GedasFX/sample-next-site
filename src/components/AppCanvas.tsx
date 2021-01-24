import { Suspense } from 'react';
import { Canvas } from 'react-three-fiber';
import AppScene from './three/scenes/AppScene';

export default function AppCanvas(): JSX.Element {
  return (
    <>
      <div className="container">
        <div className="canvas">
          <Canvas>
            <Suspense fallback={null}>
              <AppScene />
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
