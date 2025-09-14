import React, { useMemo } from "react";
import * as THREE from "three";

export default function OrbitRing({ radius, segments = 128 }) {
  const geometry = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(t) * radius, 0, Math.sin(t) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, [radius, segments]);

  return (
    <line geometry={geometry}>
      <lineBasicMaterial color="#888" transparent opacity={0.22} />
    </line>
  );
}
