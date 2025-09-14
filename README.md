# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- `@vitejs/plugin-react` uses **Babel** for Fast Refresh  
- `@vitejs/plugin-react-swc` uses **SWC** for Fast Refresh  

---

## Expanding the ESLint configuration

If you are developing a production application, we recommend using **TypeScript** with type-aware lint rules enabled.  

Check out the TS template for information on how to integrate **TypeScript** and **typescript-eslint** in your project.

---

# Animation Type Structure (Framer Motion)

This section provides short definitions and minimal examples of common animation types using **Framer Motion** with React + Vite.

---

## Fade
**Definition:** Change opacity over time.  
```jsx
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
  Fade In
</motion.div>

