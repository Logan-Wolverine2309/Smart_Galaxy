import React, { useMemo } from "react";
import { Points, PointMaterial } from "@react-three/drei";

export default function Stars({ count = 5000 }) {
  // Generate random star positions
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 200; // spread stars far in space
    }
    return pos;
  }, [count]);

  return (
    <Points positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="white"
        size={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}
