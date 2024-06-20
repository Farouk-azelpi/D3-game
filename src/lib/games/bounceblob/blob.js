// src/game/blob.js
import * as THREE from 'three';
import { blobPosition, gameStatus } from '/src/stores';
import { addToScene } from './scene.js';

let blob;
const endPosition = { x: 6, y: 0, z: -2}; // Last plane position




export function createBlob() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  blob = new THREE.Mesh(geometry, material);
  blob.position.set(0, 1, 0);
  addToScene(blob);

  blobPosition.subscribe(value => {
    if (blob) {
      blob.position.set(value.x, value.y, value.z);
      checkEndPosition(value);
    }
  });
}

function checkEndPosition(position) {
    if (position.x > endPosition.x && position.z > endPosition.z) {
      gameStatus.set('success');
    }
}

export function updateVelocity({ dx, dz, speed }) {
    blob.position.x += dx * speed * 0.00000001;
    blob.position.y += dz * speed * 0.00000001;
    blobPosition.set({ x: blob.position.x, y: blob.position.y, z: blob.position.z });
}

export function moveBlob(dx, dz) {
  blob.position.x += dx;
  blob.position.z += dz;
  blobPosition.set({ x: blob.position.x, y: blob.position.y, z: blob.position.z });
}

export function jumpBlob() {
  blob.position.y = 2;
  blobPosition.set({ x: blob.position.x, y: blob.position.y, z: blob.position.z });
  setTimeout(() => {
    blob.position.y = 1;
    blobPosition.set({ x: blob.position.x, y: blob.position.y, z: blob.position.z });
  }, 500);
}




export function removeObject3D(object3D) {
  if (!(object3D instanceof THREE.Object3D)) return false;

  // for better memory management and performance
  if (object3D.geometry) object3D.geometry.dispose();

  if (object3D.material) {
      if (object3D.material instanceof Array) {
          // for better memory management and performance
          object3D.material.forEach(material => material.dispose());
      } else {
          // for better memory management and performance
          object3D.material.dispose();
      }
  }
  object3D.removeFromParent(); // the parent might be the scene or another Object3D, but it is sure to be removed this way
  return true;
}



