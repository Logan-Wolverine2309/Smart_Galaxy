import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Planet from "./Planet";
import ErrorBoundary from "./ErrorBoundary";


const planetsData = [
  { name: "Sun", size: 3, position: [0, 0, 0] },
  { name: "Mercury", size: 0.3, position: [5, 0, 0] },
  { name: "Venus", size: 0.6, position: [8, 0, 0] },
  { name: "Earth", size: 0.65, position: [11, 0, 0] },
  { name: "Moon", size: 0.2, position: [12.2, 0, 0] },
  { name: "Mars", size: 0.5, position: [14, 0, 0] },
  { name: "Jupiter", size: 1.5, position: [20, 0, 0] },
  { name: "Saturn", size: 1.2, position: [26, 0, 0] },
  { name: "Uranus", size: 1, position: [32, 0, 0] },
  { name: "Neptune", size: 1, position: [38, 0, 0] },
  { name: "Pluto", size: 0.25, position: [44, 0, 0] },
];

const GalaxyCanvas = () => {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  return (
    <>
      {/* Info overlay */}
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          zIndex: 1,
        }}
      >
        {selectedPlanet ? (
          <>
            <h3>{selectedPlanet.name}</h3>
            <p>Size: {selectedPlanet.size}</p>
          </>
        ) : (
          <p>Click a planet to see info</p>
        )}
      </div>

      {/* ✅ Error boundary wrapping Canvas */}
      <ErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 20, 50], fov: 60 }}
          style={{ height: "100vh", width: "100vw", background: "black" }}
        >
          {/* Lights */}
          <ambientLight color={0xffffff} intensity={0.2} />
          <pointLight color={0xffffff} position={[0, 0, 0]} intensity={2} castShadow />

          {/* Space */}
          <Stars radius={300} depth={60} count={20000} factor={7} fade />

          <OrbitControls enableZoom={true} />

          {/* Planets */}
          {planetsData.map((planet) => (
            <Planet
              key={planet.name}
              planet={planet}
              onClick={setSelectedPlanet}
            />
          ))}
        </Canvas>
      </ErrorBoundary>
    </>
  );
};

export default GalaxyCanvas;
