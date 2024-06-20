

export function init(container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    //renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);
  
  
    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5).normalize();
    scene.add(light);
  
    // Add plane
    const planeGeometry = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);
  
    plane.rotation.x = - Math.PI / 2;
    plane.position.y = -2;
  
    // Create a soft blob
    const blobGeometry = new THREE.SphereGeometry(1, 32, 32);
    const blobMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const blob = new THREE.Mesh(blobGeometry, blobMaterial);
    scene.add(blob);
  
    blob.position.y = 2;
    blob.position.z = -2;
  
    // Initial position and velocity
  
  
    camera.position.z = 5;
    camera.position.y = 2;
    camera.position.x = 0;
  
  
    // Function to update blob vertices for softness
    // @ts-ignore
    function updateBlobGeometry(blob) {
      const time = Date.now() + 50;
      // @ts-ignore
      blob.geometry.vertices.forEach((vertex, i) => {
          const offset = blob.geometry.parameters.radius;
          vertex.normalize().multiplyScalar(offset + 0.1 * Math.sin(time + i));
      });
      blob.geometry.verticesNeedUpdate = true;
    }
  
    // Handle window resize
    window.addEventListener('resize', () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
  
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });
  
  
    
    threeState.update(state => {
      // @ts-ignore
      state.scene = scene;
      // @ts-ignore
      state.camera = camera;
      // @ts-ignore
      state.renderer = renderer;
      // @ts-ignore
      state.blob = blob;
      // @ts-ignore
      state.plane = plane;
      return state;
    });
  
    animate();
  }