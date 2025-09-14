import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedCard() {
  const [count, setCount] = useState(0);

  return (
    <motion.div
      className="p-6 m-4 rounded-2xl shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold">⚡ React + Vite</h1>
      <p className="mt-2">Fast refresh in action!</p>
      <button
        className="mt-4 px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
    </motion.div>
  );
}