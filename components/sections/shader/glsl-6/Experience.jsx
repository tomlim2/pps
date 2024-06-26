import {
  CameraControls,
} from "@react-three/drei";
import { Perf } from "r3f-perf";
import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Experience = () => {
  const materialRef = useRef();
  const meshRef = useRef();
  const { color, opacity } = useControls("contact shadows", {
    color: "#1d8f75",
    opacity: { value: 1, min: 0, max: 1 },
  });

  useFrame((state, delta) => {
    if (materialRef.current) {
      customUniforms.uTime.value = state.clock.elapsedTime;
      // console.log(materialRef.current.onBeforeCompile((shader)=>{
      //   console.log(shader);
      // }));
      // materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // console.log(materialRef.current.uniforms.uTime.value, "hi");
    }
    if (meshRef.current) {
      // meshRef.current.rotation.x = state.clock.elapsedTime * 2;
      // meshRef.current.rotation.y = state.clock.elapsedTime * 2;
    }
  });

  const customUniforms = {
    uTime: {
      value: 0
    }
  }

  const onUpdateShader = (shader) => {
    // glslTestMaterial.userData.shader = shader;
    shader.defines.NO_ANIMATION = false;
    shader.uniforms.uTime = customUniforms.uTime;
    console.log(shader.vertexShader)

    // varying vec3 vNormalW;
    shader.vertexShader = shader.vertexShader.replace(
      /*glsl*/`varying vec3 vViewPosition;`,
      /*glsl*/`
        varying vec3 vViewPosition;
        varying vec3 vNN; 
        varying vec3 vEye;
      `)

    shader.vertexShader = shader.vertexShader.replace(
        /*glsl*/`vViewPosition = - mvPosition.xyz;`,
        /*glsl*/`
          vViewPosition = - mvPosition.xyz;

          mat4 LM = modelMatrix;
          LM[2][3] = 0.0;
          LM[3][0] = 0.0;
          LM[3][1] = 0.0;
          LM[3][2] = 0.0;

          vec4 GN = LM * vec4(objectNormal.xyz, 1.0);
          vNN = normalize(GN.xyz);
          vEye = normalize(GN.xyz-cameraPosition);
        `)

    console.log(shader.fragmentShader)
    shader.fragmentShader = shader.fragmentShader.replace(
      /*glsl*/`#include <color_pars_fragment>`,
      /*glsl*/`#include <color_pars_fragment>
        uniform float uTime;
        varying vec3 vNN; 
        varying vec3 vEye;
      `)
    shader.fragmentShader = shader.fragmentShader.replace(
      /*glsl*/`#include <color_fragment>`,
      /*glsl*/`#include <color_fragment>
      float greenValue = sin(uTime)*.5 + 1.0;
      #ifdef NO_ANIMATION
      greenValue = 1.0;
      #else
      greenValue = sin(uTime)*.5 + 1.0;
      #endif

      diffuseColor = vec4(1,greenValue,0,1);
      // float fresnelTerm = dot(normalize(vPositionW - cameraPosition), vNormalW);
      // fresnelTerm = clamp(1.-fresnelTerm, 0., 1.);
      // diffuseColor.rgb +=  pow(fresnelTerm, 4.0);
      `)
    // console.log(shader.fragmentShader)
  }

  return (
    <>
      <Perf position="bottom-right" />

      <CameraControls makeDefault maxDistance={35} dollySpeed={0.25} />
      <pointLight position={[2, 2, 2]} intensity={30}></pointLight>
      <ambientLight intensity={1}></ambientLight>

      <mesh ref={meshRef} visible userData={{ hello: 'world' }} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          ref={materialRef}
          opacity={opacity}
          color={'black'}
          transparent
          onBeforeCompile={(shader) => onUpdateShader(shader)} />
      </mesh>


    </>
  );
};

export default Experience;
