// src/components/createOccluder.js
import * as THREE from "three";

export function createOccluder({ radius = 5 } = {}) {
  const occluderGeo = new THREE.SphereGeometry(radius + 0.01, 32, 32);
  const occluderMat = new THREE.MeshBasicMaterial({
    colorWrite: false,
    depthWrite: true,
  });
  const occluder = new THREE.Mesh(occluderGeo, occluderMat);
  occluder.renderOrder = 0;
  return occluder;
}
