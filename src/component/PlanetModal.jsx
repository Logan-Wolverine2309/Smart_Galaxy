import React from "react";
import PropTypes from "prop-types";
import PlanetInterior from "./PlanetInterior";

export default function PlanetModal({ planet, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="relative w-[90%] h-[90%] bg-gray-900 rounded-xl overflow-hidden shadow-lg">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 px-3 py-1 text-sm rounded bg-red-600 hover:bg-red-700 text-white"
        >
          ✕
        </button>

        {/* Title */}
        <div className="absolute top-2 left-4 text-white font-semibold text-lg">
          {planet.name}
        </div>

        {/* 3D Interior View */}
        <PlanetInterior planet={planet} />
      </div>
    </div>
  );
}

PlanetModal.propTypes = {
  planet: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
