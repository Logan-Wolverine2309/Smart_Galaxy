import { createRoot } from "react-dom/client";
import App from "./App";
import "./Style/index.css";   // ✅ fixed path

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
}
