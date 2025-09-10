import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

// fallback texture
const fallbackTexture = "/textures/default.jpg";

// Map planet names to texture files
const planetTextures = {
  Earth: "/textures/earth.jpg",
  Moon: "/textures/moon.jpg",
  Sun: "/textures/sun.jpg",
  Mars: "/textures/mars.jpg",
  Mercury: "/textures/mercury.jpg",
  Venus: "/textures/venus.jpg",
  Neptune: "/textures/neptune.jpg",
  Uranus: "/textures/uranus.jpg",
  Pluto: "/textures/pluto.jpg",
  Saturn: "/textures/saturn.jpg",
  Jupiter: "/textures/jupiter.jpg",
};

const Planet = ({ planet, onClick }) => {
  // Pick texture path based on planet name
  const texturePath = useMemo(() => {
    return planetTextures[planet.name] || fallbackTexture;
  }, [planet.name]);

  // Load texture
  // Always call useLoader unconditionally
  const texture = useLoader(TextureLoader, texturePath);

  // If texture loading fails, fallback to default texture (handled by three.js, but you can add error handling if needed)
  // Optionally, you can use Suspense or error boundaries for more robust error handling.

  return (
    <mesh
      position={planet.position && planet.position.length === 3 ? planet.position : [0, 0, 0]}
      onClick={() => onClick(planet)}
      castShadow={true}
      receiveShadow={true}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};
Planet.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Planet;

