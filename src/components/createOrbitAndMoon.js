import * as THREE from "three";

export function createOrbitAndMoon() {
  const orbitRadius = 9;
  const orbitSegments = 128;

  const orbitPoints = [];
  for (let i = 0; i <= orbitSegments; i++) {
    const angle = (i / orbitSegments) * Math.PI * 2;
    orbitPoints.push(new THREE.Vector3(Math.cos(angle) * orbitRadius, 0, Math.sin(angle) * orbitRadius));
  }
  const orbitCurve = new THREE.CatmullRomCurve3(orbitPoints, true);

  const orbitGeometry = new THREE.TubeGeometry(orbitCurve, 128, 0.02, 8, true);
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    depthTest: true,
    depthWrite: false,
  });
  const orbitMesh = new THREE.Mesh(orbitGeometry, orbitMaterial);
  orbitMesh.renderOrder = 1;

  const moonGeometry = new THREE.SphereGeometry(0.4, 16, 16);
  const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const moon = new THREE.Mesh(moonGeometry, moonMaterial);
  moon.renderOrder = 2;

  const orbitGroup = new THREE.Group();
  orbitGroup.add(orbitMesh);
  orbitGroup.add(moon);
  orbitGroup.rotation.x = THREE.MathUtils.degToRad(25);

  return { orbitGroup, moon, orbitRadius };
}
