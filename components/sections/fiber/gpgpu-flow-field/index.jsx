"use client";
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js'
import GUI from 'lil-gui'
import flowFieldVertexShader from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/vertex.glsl'
import flowFieldFragmentSahder from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/fragment.glsl'
import flowFieldParticlesShader from 'raw-loader!glslify-loader!shaders/gpgpu-flow-field/particles.glsl'
import { useEffect } from 'react';

import { isDebuggerState } from "@/stores/storeFiber"
import { useRecoilValue } from 'recoil';
import { GPUComputationRenderer } from 'three/examples/jsm/misc/GPUComputationRenderer';

const SectionGPGPUFlowField = () => {
  const loadGLTF = async (callback) => {
    // Loaders
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/')

    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    /**
     * Load model
     */
    gltfLoader.loadAsync('/gpgpu-flow-field/model.glb')
      .then((gltf) => {
        
        gpgpuFlowField(gltf)
      })
      .catch((error) => {
        // Handle any errors that occurred while loading the model
        console.error('An error happened', error);
      });
  }

  useEffect(() => {
    loadGLTF()
    
    return () => {

    }
  }, [])

  const gpgpuFlowField = (gltf) => {
    /**
     * Base
     */
    // Debug
    const gui = new GUI({ width: 340 })
    const debugObject = {}

    // Canvas
    const canvas = document.querySelector('canvas.webgl')

    // Scene
    const scene = new THREE.Scene()



    /**
     * Sizes
     */
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
      pixelRatio: Math.min(window.devicePixelRatio, 2)
    }

    window.addEventListener('resize', () => {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight
      sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

      // Materials
      particles.material.uniforms.uResolution.value.set(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(sizes.pixelRatio)
    })

    /**
     * Camera
     */
    // Base camera
    const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(4.5, 4, 11)
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    })
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)

    debugObject.clearColor = '#29191f'
    renderer.setClearColor(debugObject.clearColor)

    /**
     * Base geometry
     */
    const baseGeometry = {}
    console.log(gltf, 'gltf');
    // baseGeometry.instance = new THREE.SphereGeometry(3)
    baseGeometry.instance = gltf.scene.children[0].geometry
    baseGeometry.count = baseGeometry.instance.attributes.position.count

    /**
     * GPU Compute
     */
    // Setup
    const gpgpu = {}
    gpgpu.size = Math.ceil(Math.sqrt(baseGeometry.count))
    gpgpu.computation = new GPUComputationRenderer(gpgpu.size, gpgpu.size, renderer)

    // Base particles
    const baseParticlesTexture = gpgpu.computation.createTexture()

    for (let i = 0; i < baseGeometry.count; i++) {
      const i3 = i * 3
      const i4 = i * 4

      // Position based on geometry
      baseParticlesTexture.image.data[i4 + 0] = baseGeometry.instance.attributes.position.array[i3 + 0]
      baseParticlesTexture.image.data[i4 + 1] = baseGeometry.instance.attributes.position.array[i3 + 1]
      baseParticlesTexture.image.data[i4 + 2] = baseGeometry.instance.attributes.position.array[i3 + 2]
      baseParticlesTexture.image.data[i4 + 3] = 0
    }

    // Particles variable
    gpgpu.particlesVariable = gpgpu.computation.addVariable('uParticles', flowFieldParticlesShader, baseParticlesTexture)
    gpgpu.computation.setVariableDependencies(gpgpu.particlesVariable, [gpgpu.particlesVariable])

    // Init
    gpgpu.computation.init()

    // Debug
    gpgpu.debug = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({ map: gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture })
    )
    gpgpu.debug.position.x = 3
    scene.add(gpgpu.debug)



    /**
     * Particles
     */
    const particles = {}

    // Geometry
    const particlesUvArray = new Float32Array(baseGeometry.count * 2)
    for (let y = 0; y < gpgpu.size; y++) {
      for (let x = 0; x < gpgpu.size; x++) {
        const i = (y * gpgpu.size + x)
        const i2 = i * 2

        // Particles UV
        const uvX = (x + 0.5) / gpgpu.size
        const uvY = (y + 0.5) / gpgpu.size

        particlesUvArray[i2 + 0] = uvX;
        particlesUvArray[i2 + 1] = uvY;
      }
    }
    particles.geometry = new THREE.BufferGeometry()
    particles.geometry.setDrawRange(0, baseGeometry.count)
    particles.geometry.setAttribute('aParticlesUv', new THREE.BufferAttribute(particlesUvArray, 2))


    // Material
    particles.material = new THREE.ShaderMaterial({
      vertexShader: flowFieldVertexShader,
      fragmentShader: flowFieldFragmentSahder,
      uniforms:
      {
        uSize: new THREE.Uniform(0.4),
        uResolution: new THREE.Uniform(new THREE.Vector2(sizes.width * sizes.pixelRatio, sizes.height * sizes.pixelRatio)),
        uParticlesTexture: new THREE.Uniform()
      }
    })

    // Points
    particles.points = new THREE.Points(particles.geometry, particles.material)
    scene.add(particles.points)

    /**
     * Tweaks
     */
    gui.addColor(debugObject, 'clearColor').onChange(() => { renderer.setClearColor(debugObject.clearColor) })
    gui.add(particles.material.uniforms.uSize, 'value').min(0).max(1).step(0.001).name('uSize')

    /**
     * Animate
     */
    const clock = new THREE.Clock()
    let previousTime = 0

    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      const deltaTime = elapsedTime - previousTime
      previousTime = elapsedTime

      // Update controls
      controls.update()

      // Render normal scene
      renderer.render(scene, camera)

      // GPGPU Update
      gpgpu.computation.compute()
      particles.material.uniforms.uParticlesTexture.value = gpgpu.computation.getCurrentRenderTarget(gpgpu.particlesVariable).texture

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }

  const isDebugger = useRecoilValue(isDebuggerState)

  return (
    <>
      <canvas className='webgl'></canvas>
    </>

  );
};

export default SectionGPGPUFlowField;
