<!-- src/components/Blob.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { blobPosition } from '/src/stores.js';
  
    let blob;
    let scene;
    let renderer;
  
    onMount(() => {
      scene = new THREE.Scene();
  
      const geometry = new THREE.SphereGeometry(0.5, 32, 32);
      const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      blob = new THREE.Mesh(geometry, material);
      scene.add(blob);
  
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 5, 5).normalize();
      scene.add(light);
  
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);
  
      const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      };
      animate();
  
      return () => {
        document.body.removeChild(renderer.domElement);
      };
    });
  
    blobPosition.subscribe(value => {
      if (blob) {
        blob.position.set(value.x, value.y, value.z);
      }
    });
  </script>
