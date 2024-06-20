<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import Controls from '$lib/controls/Controls.svelte';
  
    let scene, camera, renderer, blob, planes = [];
    let velocity = 0;
    let isJumping = false;
    let freeFallStart = null;
  
    onMount(() => {
      // Initialize scene
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
  
      // Create blob
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      blob = new THREE.Mesh(geometry, material);
      blob.position.z = 5; // Start above the planes
      scene.add(blob);
  
      // Create planes on the xy-plane
      createPlane(-5, 0);  // Left plane
      createPlane(5, 0);   // Right plane
      createPlane(0, -5);  // Bottom plane
      createPlane(0, 5);   // Top plane
  
      // Set camera position
      camera.position.set(0, -7, 10);
      camera.lookAt(0, 0, 0);
  
      // Start animation loop
      animate();
    });
  
    function createPlane(x, y) {
      const planeGeometry = new THREE.PlaneGeometry(10, 10);
      const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(x, y, 0);
      scene.add(plane);
      planes.push(plane);
    }
  
    function animate() {
      requestAnimationFrame(animate);
  
      // Apply gravity (downwards along the z-axis)
      velocity -= 0.003;
      blob.position.z += velocity;
  
      // Check for collisions
      planes.forEach(plane => {
        const planeZ = plane.position.z;
        const blobZ = blob.position.z - 1; // Adjust for the radius of the blob
  
        if (blobZ <= planeZ + 0.15 && blobZ >= planeZ - 0.05 && velocity < 0) {
          // Collision detected, bounce the blob
          velocity = -velocity * 0.66; // Reverse and reduce velocity to simulate bounce
          blob.position.z = planeZ + 1; // Reset position to the surface of the plane
          isJumping = false;
          freeFallStart = null;
        }
      });
  
      // Check for free fall
      if (velocity < 0 && freeFallStart === null) {
        freeFallStart = Date.now();
      }
  
      if (freeFallStart !== null && Date.now() - freeFallStart > 4000) {
        alert("You lost!");
        window.location.reload();
      }
  
      renderer.render(scene, camera);
    }
  
    function jump() {
      if (!isJumping) {
        velocity = 0.3; // Positive force along the z-axis
        isJumping = true;
      }
    }

    function moveBlob(dx, dz) {
    blob.position.x += dx;
    blob.position.z += dz;
    blobPosition.set({ x: blob.position.x, y: blob.position.y, z: blob.position.z });
    }
  </script>
  
  <button on:click={jump}>Jump</button>
  <Controls />
  
  <style>
    button {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  </style>