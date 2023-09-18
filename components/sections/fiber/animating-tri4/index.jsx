"use client";
import { Canvas } from "@react-three/fiber";
import Experience from "./Experience";

const SectionEyeWithMaths = () => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 3] }}>
      <Experience />
    </Canvas>
  );
};

export default SectionEyeWithMaths;
