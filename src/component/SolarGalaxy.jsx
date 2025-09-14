import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import CameraRig from "./CameraRig";
import Planet from "./Planet";
import InfoPanel from "./InfoPanel";
import { PLANETS } from "./data/Planets";


export default function SolarGalaxy() {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {!selected && (
        <div className="hint">
          <strong>Solar Galaxy</strong>
          <p>Click a planet to view details</p>
        </div>
      )}

      <InfoPanel planet={selected} onClose={() => setSelected(null)} />

      <Canvas camera={{ position: [0, 12, 30], fov: 55 }} shadows>
        <ambientLight intensity={0.18} />
        <pointLight position={[0, 0, 0]} intensity={2.4} distance={100} />

        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <OrbitControls enableZoom enablePan makeDefault />
        <CameraRig targetPosition={selected?.worldPos} />

        {PLANETS.map((p) => (
          <Planet key={p.name} data={p} onSelect={setSelected} />
        ))}
      </Canvas>
    </div>
  );
}
