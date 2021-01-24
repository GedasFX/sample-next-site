import Box from '../objects/Box';

export default function AppScene2() {
  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-2.2, 0, 0]} />
      <Box position={[2.2, 0, 0]} />
    </>
  );
}
