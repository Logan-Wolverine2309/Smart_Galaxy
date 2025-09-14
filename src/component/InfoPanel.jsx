import React from "react";

export default function InfoPanel({ planet, onClose }) {
  if (!planet) return null;
  return (
    <div style={panelStyle}>
      <h2>{planet.name}</h2>
      <p>{planet.longDescription}</p>
      <button style={buttonStyle} onClick={onClose}>
        Close
      </button>
    </div>
  );
}

const panelStyle = {
  position: "absolute",
  right: 20,
  top: 20,
  width: 300,
  background: "rgba(0,0,0,0.7)",
  padding: 16,
  borderRadius: 8,
  color: "white",
};

const buttonStyle = {
  marginTop: 8,
  background: "#1f6feb",
  color: "white",
  padding: "8px 12px",
  borderRadius: 6,
  border: "none",
  cursor: "pointer",
};
