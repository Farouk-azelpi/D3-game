<!-- src/components/Plane.svelte -->
<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { addToScene } from '$lib/games/bounceblob/scene.js';
  
    export let position = { x: 0, y: 0, z: 0 };
    export let isEnd = false;
  
    let plane;
  
    onMount(() => {
      const geometry = new THREE.PlaneGeometry(6, 4);
      const material = new THREE.MeshStandardMaterial({ color: isEnd ? 0xc43d3d : 0xfff0ff });
      plane = new THREE.Mesh(geometry, material);
      plane.position.set(position.x, position.y, position.z);
      plane.rotation.x = -Math.PI / 2;
      addToScene(plane);
    });
  </script>