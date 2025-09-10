import React, { useRef, useMemo } from "react";
import PropTypes from "prop-types";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sky, SoftShadows } from "@react-three/drei";

/* ---------- Tree Component ---------- */
function Tree({ position }) {
  const trunkHeight = 0.4 + Math.random() * 0.2;
  const foliageHeight = 0.7 + Math.random() * 0.3;
  const foliageRadius = 0.35 + Math.random() * 0.15;

  return (
    <group position={position}>
      <mesh position={[0, trunkHeight / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.07, 0.09, trunkHeight, 8]} />
        <meshStandardMaterial color="#7c4a03" />
      </mesh>
      <mesh position={[0, trunkHeight + foliageHeight / 2, 0]} castShadow receiveShadow>
        <coneGeometry args={[foliageRadius, foliageHeight, 12]} />
        <meshStandardMaterial color="#236d3c" roughness={0.7} />
      </mesh>
    </group>
  );
}

/* ---------- Building Component ---------- */
function Building({ position, height }) {
  const colors = ["#b0b0b0", "#a3a3a3", "#cfcfcf", "#e0e0e0"];
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <mesh position={position} castShadow receiveShadow>
      <boxGeometry args={[0.5, height, 0.5]} />
      <meshStandardMaterial color={color} metalness={0.3} roughness={0.5} />
    </mesh>
  );
}

/* ---------- MiniWorld Component ---------- */
function MiniWorld({ planet }) {
  const group = useRef();

  // Rotate slowly
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += 0.08 * delta;
  });

  const trees = useMemo(() => {
    if (planet.type !== "forest") return [];
    return Array.from({ length: 16 }, (_, i) => {
      const angle = (i / 16) * Math.PI * 2;
      const radius = 2.2 + Math.random() * 0.5;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.3;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.3;
      return [x, 0, z];
    });
  }, [planet]);

  const buildings = useMemo(() => {
    if (planet.type !== "city") return [];
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      const radius = 1.7 + Math.random() * 0.4;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.2;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.2;
      return [x, 0, z];
    });
  }, [planet]);

  const islandColor =
    planet.type === "waterworld" ? "#1e90ff" :
    planet.type === "forest" ? "#2e8b57" : "#444";

  return (
    <group ref={group}>
      {/* Base island */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[4, 3.5, 0.8, 32]} /> {/* lighter */}
        <meshStandardMaterial color={islandColor} roughness={0.8} />
      </mesh>

      {/* Rocky edges */}
      <mesh position={[0, -0.35, 0]} castShadow receiveShadow>
        <dodecahedronGeometry args={[3.7, 0]} />
        <meshStandardMaterial color="#6e5e4a" roughness={0.9} />
      </mesh>

      {/* Water surface */}
      {planet.type === "waterworld" && (
        <mesh position={[0, 0.05, 0]} receiveShadow>
          <circleGeometry args={[3.3, 32]} />
          <meshStandardMaterial
            color="#1ca3ff"
            transparent
            opacity={0.7}
            roughness={0.5}
          />
        </mesh>
      )}

      {/* Trees */}
      {trees.map((pos, i) => (
        <Tree key={i} position={pos} />
      ))}

      {/* Buildings */}
      {buildings.map((pos, i) => (
        <Building key={i} position={pos} height={0.7 + Math.random() * 2.2} />
      ))}

      {/* Forest central grass patch */}
      {planet.type === "forest" && (
        <mesh position={[0, 0.01, 0]} receiveShadow>
          <circleGeometry args={[2.2, 32]} />
          <meshStandardMaterial color="#3e9e5c" roughness={0.7} />
        </mesh>
      )}
    </group>
  );
}

/* ---------- Main PlanetInterior ---------- */
export default function PlanetInterior({ planet }) {
  return (
    <Canvas camera={{ position: [6, 3, 6], fov: 45 }} shadows>
      <SoftShadows size={15} samples={8} focus={0.9} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />

      {/* Controls */}
      <OrbitControls
        enablePan
        enableZoom
        enableRotate
        maxPolarAngle={Math.PI * 0.9}
        minDistance={3}
        maxDistance={15}
      />

      {/* Sky + Mini World */}
      <Sky
        sunPosition={[5, 2, 0]}
        turbidity={6}
        rayleigh={5}
        mieCoefficient={0.005}
        mieDirectionalG={0.8}
      />
      <MiniWorld planet={planet} />
    </Canvas>
  );
}

PlanetInterior.propTypes = {
  planet: PropTypes.shape({
    type: PropTypes.string.isRequired,
  }).isRequired,
};
