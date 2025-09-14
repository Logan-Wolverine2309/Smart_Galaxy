import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import OrbitRing from "./OrbitRing";

function useTextureSafe(path) {
  const [tex, setTex] = useState(null);
  useEffect(() => {
    if (!path) return;
    new THREE.TextureLoader().load(
      path,
      (loaded) => setTex(loaded),
      undefined,
      () => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 64;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "gray";
        ctx.fillRect(0, 0, 64, 64);
        setTex(new THREE.CanvasTexture(canvas));
      }
    );
  }, [path]);
  return tex;
}
export default function Planet({ data, onSelect }) {
  const meshRef = useRef();
  const angle = useRef(Math.random() * Math.PI * 2);
  const tex = useTextureSafe(data.texture);

  useFrame((_, delta) => {
    if (data.orbitRadius > 0) {
      angle.current += (data.orbitSpeed || 0.3) * delta;
      meshRef.current.position.x = Math.cos(angle.current) * data.orbitRadius;
      meshRef.current.position.z = Math.sin(angle.current) * data.orbitRadius;
    }
    meshRef.current.rotation.y += data.rotationSpeed || 0.01;
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={() =>
          onSelect({
            ...data,
            worldPos: meshRef.current.getWorldPosition(new THREE.Vector3()),
          })
        }
      >
        <sphereGeometry args={[data.size, 64, 64]} />
        <meshStandardMaterial map={tex} />
      </mesh>
      {data.orbitRadius > 0 && <OrbitRing radius={data.orbitRadius} />}
    </group>
  );
}

Planet.propTypes = {
  data: PropTypes.shape({
    texture: PropTypes.string,
    orbitRadius: PropTypes.number,
    orbitSpeed: PropTypes.number,
    rotationSpeed: PropTypes.number,
    size: PropTypes.number,
  }).isRequired,
  onSelect: PropTypes.func.isRequired,
};

