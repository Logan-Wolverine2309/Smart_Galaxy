import Stars from "./Stars"; // import stars

export default function GalaxyScene({ onPlanetClick }) {
  return (
    <>
      {/* Background Stars */}
      <Stars count={8000} />

      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} castShadow />

      {/* Example Planets */}
      <Planet
        planet={{
          name: "Aqua",
          type: "waterworld",
          position: [5, 2, -8],
        }}
        onClick={onPlanetClick}
      />
      <Planet
        planet={{
          name: "Terran",
          type: "forest",
          position: [-6, 3, -10],
        }}
        onClick={onPlanetClick}
      />
      <Planet
        planet={{
          name: "Urbis",
          type: "city",
          position: [0, -2, -12],
        }}
        onClick={onPlanetClick}
      />
    </>
  );
}
