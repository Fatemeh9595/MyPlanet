import * as THREE from "three";

export function createEarth() {
  const radius = 5;
  const count = 2500;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = Math.acos(2 * u - 1);
    const phi = 2 * Math.PI * v;
    const x = radius * Math.sin(theta) * Math.cos(phi);
    const y = radius * Math.sin(theta) * Math.sin(phi);
    const z = radius * Math.cos(theta);
    positions.set([x, y, z], i * 3);
  }

  const earthGeometry = new THREE.BufferGeometry();
  earthGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const earthMaterial = new THREE.PointsMaterial({ color: 0x66ccff, size: 0.06 });
  const earth = new THREE.Points(earthGeometry, earthMaterial);

  const occluderGeo = new THREE.SphereGeometry(radius + 0.01, 32, 32);
  const occluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
  });
  const occluder = new THREE.Mesh(occluderGeo, occluderMat);
  occluder.renderOrder = 0;

  const earthSystem = new THREE.Group();
  earthSystem.add(earth);
  earthSystem.add(occluder);

  return { earthSystem, earth };
}
