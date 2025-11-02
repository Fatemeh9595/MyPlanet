import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { setupScene } from "./setupScene";
import { createEarth } from "./createEarth";
import { createOrbitAndMoon } from "./createOrbitAndMoon";
import { setupControls } from "./controls";
import { animateScene } from "./animateScene";

export default function RotatingSphere() {
  const mountRef = useRef(null);

  useEffect(() => {
    const { scene, camera, renderer } = setupScene(mountRef.current);
    const { earthSystem, earth } = createEarth();
    const { orbitGroup, moon, orbitRadius } = createOrbitAndMoon();

    earthSystem.add(orbitGroup);
    scene.add(earthSystem);

    const cleanupControls = setupControls(mountRef.current, earthSystem);
    animateScene(renderer, scene, camera, earthSystem, earth, moon, orbitRadius);

    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cleanupControls();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "black",
        overflow: "hidden",
        cursor: "grab",
      }}
    />
  );
}
