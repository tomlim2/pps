import { MeshTransmissionMaterial } from "@react-three/drei";
import { useControls } from "leva";
import { useGLTF } from "@react-three/drei";
import { Color, MeshBasicMaterial, MeshToonMaterial } from "three";
import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";

export default function Fox() {
  const part1 = useRef()
  const part2 = useRef()
  const part3 = useRef()
  const part4 = useRef()
  const part5Group = useRef()
  const part6 = useRef()
  const group = useRef()
  const { nodes, materials } = useGLTF(
    "/assets/models/emojis/emoji01B.glb"
  );
  const meshScale = 300;
  useFrame((state, delta) => {
    const time = state.clock.elapsedTime;
    const timeOffset = .5
    const aniSpeed = .1;
    part5Group.current.rotation.z = time * -1.5;
    group.current.position.y = Math.sin(time * 0.5 + timeOffset) * aniSpeed;
  })
  const toonMaterialBase = new MeshToonMaterial({ color: new Color('hotpink') })
  return (
    <>
      < group ref={group} dispose={null} >
        <mesh
          ref={part6}
          castShadow
          receiveShadow
          geometry={nodes.part6.geometry}
          material={toonMaterialBase}
          rotation={[Math.PI / 2, 0, 0]}
          scale={meshScale}
        />
        <mesh
          ref={part1}
          castShadow
          receiveShadow
          geometry={nodes.part1.geometry}
          material={toonMaterialBase}
          rotation={[Math.PI / 2, 0, 0]}
          scale={meshScale}
        />
        <mesh
          ref={part2}
          castShadow
          receiveShadow
          geometry={nodes.part2.geometry}
          material={toonMaterialBase}
          rotation={[Math.PI / 2, 0, 0]}
          scale={meshScale}
        />
        <mesh
          ref={part3}
          castShadow
          receiveShadow
          geometry={nodes.part3.geometry}
          material={toonMaterialBase}
          rotation={[Math.PI / 2, 0, 0]}
          scale={meshScale}
        />
        <mesh
          ref={part4}
          castShadow
          receiveShadow
          geometry={nodes.part4.geometry}
          material={toonMaterialBase}
          rotation={[Math.PI / 2, 0, 0]}
          scale={meshScale}
        />
        <group ref={part5Group}
          position={[1.87, 0.333, 0]}
          rotation={[0, 0, 0]} >
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.part5.geometry}
            material={toonMaterialBase}
            rotation={[Math.PI / 2, 0, 0]}
            position={[-1.87, -0.333, 0]}
            scale={meshScale}
          />
        </group>
      </group >


    </>
  );
}
