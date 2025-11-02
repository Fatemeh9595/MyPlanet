import * as THREE from "three"; // ✅ Add this line

export function animateScene(renderer, scene, camera, earthSystem, earth, moon, orbitRadius) {
  const clock = new THREE.Clock();
  const startTime = Date.now();

  const animate = () => {
    requestAnimationFrame(animate);

    // Earth rotation
    earth.rotation.y += 0.002;
    earth.rotation.x += 0.001;

    // Moon orbit
    const t = clock.getElapsedTime() * 0.6;
    moon.position.x = orbitRadius * Math.cos(t);
    moon.position.z = orbitRadius * Math.sin(t);

    // Earth system pulsation
    const elapsed = (Date.now() - startTime) / 1000;
    const scale = 1.25 + 0.75 * Math.sin((Math.PI / 8) * elapsed);
    earthSystem.scale.set(scale, scale, scale);

    renderer.render(scene, camera);
  };

  animate();
}
