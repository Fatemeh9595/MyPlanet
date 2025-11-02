// src/components/useResize.js
import { useEffect } from "react";

export function useResize(mountRef, camera, renderer) {
  useEffect(() => {
    if (!mountRef?.current) return;
    const handleResize = () => {
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);
    // call once to initialize
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [mountRef, camera, renderer]);
}
