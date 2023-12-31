import { useFrame } from "@react-three/fiber";
import { Level } from "./Level";
import Lights from "./Lights";
import { Physics } from "@react-three/rapier";
import { useHelper, OrbitControls } from "@react-three/drei";
import { useRef, useMemo, useState } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";
import { useControls } from "leva";
import Player from "./Player";
import useGame from "stores/useGame";

const Experience = () => {
  const blocksCount = useGame(state => state.blocksCount)
  const blocksSeed = useGame(state => state.blocksSeed)
  return (
    <>
      <color args={['#bdedfc']} attach="background" />
      <Perf position="bottom-right" />
      <OrbitControls makeDefault />

      <Physics>
        <Lights />
        <Level count={blocksCount} seed={blocksSeed} />
        <Player />
      </Physics>
    </>
  );
};

export default Experience;
