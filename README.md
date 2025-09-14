/* React-Vite-Animations-Guide.jsx Single-file React component (default export) showcasing an "animation type structure":

Definitions (short) + visual examples

Uses Tailwind CSS for layout & styling

Uses Framer Motion for animations (recommended)


How to use:

1. Install dependencies: npm install framer-motion (Tailwind set up if you want the same styling; otherwise replace classes)


2. Drop this file in your Vite + React app (e.g. src/AnimationsGuide.jsx)


3. Import and render in App.jsx: import AnimationsGuide from './AnimationsGuide';



Notes:

This file is intentionally self-contained for examples.

Replace or extend animations and timings to fit your app. */


import React from 'react'; import { motion, useScroll, useTransform } from 'framer-motion';

// ------------------------- // Short Definitions // ------------------------- // Fade: change opacity over time. // Slide: translate along X or Y axis. // Scale: grow/shrink element size. // Rotate: spin element around center. // Stagger: run animations for a group with small delays. // Spring: physics-based motion (bounce/smooth) instead of linear tween. // Keyframe: explicit sequence of values at times. // Parallax: different scroll rates for layers -> depth illusion. // Micro-interactions: small hover/tap animations that give feedback.

// ------------------------- // Example components // -------------------------

const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, }, }, };

const fadeUp = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }, };

const slideLeft = { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0, transition: { duration: 0.55 } }, };

const scaleIn = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.45 } }, };

export default function AnimationsGuide() { return ( <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white p-8"> <div className="max-w-5xl mx-auto"> <header className="mb-8"> <h1 className="text-3xl font-extrabold mb-2">React + Vite — Animation Type Structure</h1> <p className="text-slate-600">Definitions + working examples using <code className="font-mono">framer-motion</code> and Tailwind.</p> </header>

<section className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card title="Fade (Fade Up)" description="Opacity + slight vertical movement">
        <motion.div
          className="p-6 rounded-lg shadow-md bg-white"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-semibold">Fade Up</h3>
          <p className="text-sm text-slate-500 mt-1">Use for revealing blocks with gentle entrance.</p>
        </motion.div>
      </Card>

      <Card title="Slide (Left)" description="Translate from right to left">
        <motion.div
          className="p-6 rounded-lg shadow-md bg-white"
          variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="font-semibold">Slide Left</h3>
          <p className="text-sm text-slate-500 mt-1">Good for hero images or panels entering from offscreen.</p>
        </motion.div>
      </Card>

      <Card title="Scale (Pop)" description="Scale with opacity">
        <motion.div
          className="p-6 rounded-lg shadow-md bg-white"
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="font-semibold">Scale In</h3>
          <p className="text-sm text-slate-500 mt-1">Great for cards and avatars to add emphasis.</p>
        </motion.div>
      </Card>

      <Card title="Rotate" description="Continuous or entrance rotation">
        <motion.div
          className="p-6 rounded-lg shadow-md bg-white flex items-center justify-between"
          initial={{ rotate: -10, opacity: 0 }}
          whileInView={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold">Rotate In</h3>
          <div className="text-xs text-slate-400">Subtle tilt → flat</div>
        </motion.div>
      </Card>
    </section>

    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Group and Staggered Animations</h2>
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {['First item', 'Second item', 'Third item', 'Fourth', 'Fifth', 'Sixth'].map((t, i) => (
          <motion.li key={i} variants={fadeUp} className="bg-white p-4 rounded shadow-sm">
            {t}
          </motion.li>
        ))}
      </motion.ul>
      <p className="text-sm text-slate-500 mt-3">Staggering is useful for lists, menus, and galleries to add rhythm.</p>
    </section>

    <section className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Spring (Physics)</h3>
        <p className="text-sm text-slate-500 mb-3">Springs create natural motion — friction/damping and stiffness control the bounce.</p>
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.03 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="px-4 py-2 bg-indigo-600 text-white rounded shadow"
        >
          Spring Button
        </motion.button>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Keyframes</h3>
        <p className="text-sm text-slate-500 mb-3">Keyframes explicitly declare the sequence of values (useful for attention patterns).</p>
        <motion.div
          animate={{ scale: [1, 1.15, 0.95, 1], rotate: [0, 8, -6, 0] }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="inline-block p-4 bg-white rounded shadow"
        >
          Pulsate
        </motion.div>
      </div>
    </section>

    <section className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Parallax (Scroll-linked)</h2>
      <p className="text-sm text-slate-500 mb-4">This example uses the viewport scroll position to move a layer at a different rate.</p>

      <ParallaxExample />
    </section>

    <footer className="mt-12 text-sm text-slate-500">
      <strong>Tips:</strong> Prefer reduced motion accessibility settings, test on devices, and avoid overly long loops. Keep micro-interactions under 200ms–400ms for responsiveness.
    </footer>
  </div>
</div>

); }

// ------------------------- // Helper components // ------------------------- function Card({ title, description, children }) { return ( <div className=""> <div className="mb-2 text-sm text-slate-600"> <div className="font-medium">{title}</div> <div className="text-xs">{description}</div> </div> {children} </div> ); }

function ParallaxExample() { // useScroll & useTransform create a parallax effect. const { scrollYProgress } = useScroll(); // transform progress to translation ranges (example values) const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]); const y2 = useTransform(scrollYProgress, [0, 1], [0, -40]);

return ( <div className="relative h-72 overflow-hidden rounded-lg bg-gradient-to-br from-indigo-50 to-white shadow-inner"> <motion.div style={{ y: y1 }} className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503264116251-35a269479413?q=80&w=1600&auto=format&fit=crop&s=placeholder')] bg-cover bg-center opacity-80" /> <motion.div style={{ y: y2 }} className="absolute inset-0 flex items-end"> <div className="p-8 w-full"> <div className="bg-white/80 backdrop-blur-md rounded p-4 max-w-md"> <h3 className="font-semibold">Parallax layer</h3> <p className="text-sm text-slate-600 mt-1">Background and foreground move at different speeds to imply depth.</p> </div> </div> </motion.div> </div> ); }

/* Accessibility note:

Respect 'prefers-reduced-motion' with CSS or conditional animation disabling.

For framer-motion you can check window.matchMedia('(prefers-reduced-motion: reduce)') and avoid starting non-essential animations.


Extending the structure:

Create an animations/ folder with named variants exported (fade.ts, slide.tsx) and a small useEntrance hook to standardize triggers.

Build a utility: const variants = createVariants({ distance: 12, duration: 0.5 }) for consistent timing. */


