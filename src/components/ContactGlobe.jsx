import { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Globe() {
  const globeRef = useRef();
  const lightRef = useRef();
  const colorMap = useLoader(THREE.TextureLoader, "/textures/8k_mercury.jpg");

  useFrame(({ clock }) => {
    if (globeRef.current) {
      // Rotate globe slowly
      globeRef.current.rotation.y += 0.0015;
      // Subtle wobble
      globeRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.02;
      globeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.07) * 0.01;
    }

    if (lightRef.current) {
      // Animate point light around globe
      const t = clock.getElapsedTime();
      lightRef.current.position.x = Math.sin(t * 0.5) * 3;
      lightRef.current.position.z = Math.cos(t * 0.5) * 3;
    }
  });

  return (
    <group>
      {/* Main Globe with Moon texture */}
      <mesh ref={globeRef} position={[0, 0, 0]}>
        <sphereGeometry args={[2.1, 64, 64]} />
        <meshStandardMaterial
          map={colorMap}
          metalness={0.1}
          roughness={0.9}
          emissive="#888"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Soft outer halo */}
      <mesh>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshBasicMaterial
          color="#88c0ff"
          transparent
          opacity={0.03}  // softer, more subtle
          side={THREE.BackSide}
        />
      </mesh>

      {/* Animated highlight light */}
      <pointLight ref={lightRef} intensity={0.25} color="#88c0ff" />
    </group>
  );
}

export default function ContactGlobe() {
  return (
    <div className="w-full h-96 md:h-130">
      <Canvas camera={{ position: [0, 0, 6.5] }}>
        {/* Soft lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} />

        {/* Globe with subtle glow and wobble */}
        <Globe />

        {/* Controls */}
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
