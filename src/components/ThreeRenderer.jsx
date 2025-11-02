// src/components/ThreeRenderer.jsx
import React, { useRef, useEffect } from "react";

export default function ThreeRenderer({ onMount, style = {} }) {
  const mountRef = useRef(null);

  useEffect(() => {
    if (mountRef.current && onMount) {
      onMount(mountRef.current);
    }
  }, [onMount]);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        background: "black",
        overflow: "hidden",
        cursor: "grab",
        ...style,
      }}
    />
  );
}
