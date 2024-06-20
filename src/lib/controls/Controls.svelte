<!-- src/components/Controls.svelte -->
<script>
    import { moveBlob, jumpBlob } from '$lib/games/bounceblob/blob.js';
  
    const moveForward = () => moveBlob(1, 0);
    const moveBackward = () => moveBlob(-1, 0);
    const moveLeft = () => moveBlob(0, -1);
    const moveRight = () => moveBlob(0, 1);
    const jump = () => jumpBlob();
  </script>
  
  <div>
    <button on:click={moveLeft}>Left</button>
    <button on:click={moveRight}>Right</button>
    <button on:click={moveBackward}>Backward</button>
    <button on:click={moveForward}>Forward</button>
    <button on:click={jump}>Jump</button>
  </div>