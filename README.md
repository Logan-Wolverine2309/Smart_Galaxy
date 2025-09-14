import { motion } from "framer-motion";
import { useState } from "react";

export default function AnimatedCard() {
  const [count, setCount] = useState(0);

  return (
    <motion.div
      className="p-6 rounded-2xl shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold mb-2">⚡ React + Vite</h1>
      <p className="text-lg">Fast Refresh with Animation</p>

      <button
        className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg shadow-md hover:bg-gray-200"
        onClick={() => setCount(count + 1)}
      >
        Count: {count}
      </button>
    </motion.div>
  );
}