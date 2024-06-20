// src/game/blob.js
import * as THREE from 'three';
import { blobCoords, gameStatus } from '/src/stores';
import { addToScene } from './scene.js';

let blob;
const endPosition = { x: 6, y: 0, z: -2}; // Last plane position

export function createBlob() {
  const geometry = new THREE.SphereGeometry(0.5, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  blob = new THREE.Mesh(geometry, material);
  blob.position.set(0, 1, 0);
  addToScene(blob);

  blobCoords.subscribe(value => {
    if (blob) {
      blob.position.set(value.x, value.y, value.z);
      checkEndPosition(value);
    }
  });
}

function checkEndPosition(position) {
    if (position.x === endPosition.x && position.z === endPosition.z) {
      gameStatus.set('success');
    }
}

export function updateVelocity({ dx, dz, speed }) {
    blob.position.x += dx * 0.00000001;
    blob.position.y += dz * 0.00000001;
    blobCoords.set({ x: blob.position.x, y: blob.position.y, z: blob.position.z });
}

export function moveBlob(dx, dz) {
  blob.position.x += dx;
  blob.position.z += dz;
  blobCoords.update(state => ({ ...state, position: { x: blob.position.x, y: blob.position.y, z: blob.position.z } }));
}

export function jumpBlob() {
  blob.position.y = 2;
  blobPosition.set({ x: blob.position.x, y: blob.position.y, z: blob.position.z });
  setTimeout(() => {
    blob.position.y = 1;
    blobPosition.set({ x: blob.position.x, y: blob.position.y, z: blob.position.z });
  }, 500);
}



