<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
  
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
      scene.add(blob);
  
      // Create planes
      createPlane(0, -5, 0);  // Bottom plane
      createPlane(-5, 0, Math.PI / 2);  // Left plane
      createPlane(5, 0, -Math.PI / 2);  // Right plane
      createPlane(0, 5, Math.PI);  // Top plane
  
      // Set camera position
      camera.position.z = 10;
  
      // Start animation loop
      animate();
    });
  
    function createPlane(x, y, rotation) {
      const planeGeometry = new THREE.PlaneGeometry(10, 10);
      const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.position.set(x, y, 0);
      plane.rotation.z = rotation;
      scene.add(plane);
      planes.push(plane);
    }
  
    function animate() {
      requestAnimationFrame(animate);
  
      // Apply gravity
      velocity -= 0.01;
      blob.position.y += velocity;
  
      // Check for collisions
      planes.forEach(plane => {
        if (blob.position.y - 1 <= plane.position.y + 0.05 && blob.position.y + 1 >= plane.position.y - 0.05) {
          // Collision detected, reset velocity and jump status
          velocity = 0;
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
        velocity = 0.2;
        isJumping = true;
      }
    }
  </script>
  
  <button on:click={jump}>Jump</button>
  
  <style>
    body {
      margin: 0;
      overflow: hidden;
    }
  
    button {
      position: absolute;
      top: 10px;
      left: 10px;
    }
  </style>