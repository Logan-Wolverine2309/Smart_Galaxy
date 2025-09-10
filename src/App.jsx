import React, { useState } from "react";



import GalaxyCanvas from "./component/GalaxyCanvas";
import PlanetModal from "./component/PlanetModal";

export default function App() {
  const [selectedPlanet, setSelectedPlanet] = useState(null);

  const planets = [
    {
      id: 1,
      name: "Aqua",
      color: "#4aa3ff",
      position: [4, 0, -2],
      type: "waterworld",
      seed: 1,
    },
    {
      id: 2,
      name: "Terran",
      color: "#52c96a",
      position: [-3, 1.5, 2],
      type: "forest",
      seed: 2,
    },
    {
      id: 3,
      name: "Urbis",
      color: "#ff9f43",
      position: [0, -2, 5],
      type: "city",
      seed: 3,
    },
  ];

  return (
    <div className="w-screen h-screen bg-black">
      <GalaxyCanvas planets={planets} onPlanetClick={setSelectedPlanet} />
      {selectedPlanet && (
        <PlanetModal
          planet={selectedPlanet}
          onClose={() => setSelectedPlanet(null)}
        />
      )}
      <div className="absolute top-4 left-4 text-white/90 p-2 bg-black/50 rounded-md">
        <h1 className="font-bold">Smart Galaxy — Move, Zoom, Click Planets</h1>
        <p className="text-xs">Mouse: drag to orbit, scroll to zoom</p>
      </div>
    </div>
  );
}
