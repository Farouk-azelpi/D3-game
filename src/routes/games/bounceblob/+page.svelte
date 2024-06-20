<!-- src/components/BounceBlob.svelte -->
<script>
  import { onMount } from 'svelte';
  import { initScene } from '$lib/games/bounceblob/scene.js';
  import { initBlob } from '$lib/games/bounceblob/game.js';
  import { createBlob, updateVelocity, removeObject3D } from '$lib/games/bounceblob/blob.js';

  import Controls from '$lib/controls/Controls.svelte';
  import Joystick from '$lib/controls/Joystick.svelte';

  import Plane from '$lib/components/Plane.svelte';



  import { gameStatus, blobPosition } from '/src/stores';

  function handleUpdate(event) {
      const { x, y, speed } = event.detail;
      updateVelocity({ x, y, speed });
  }

  onMount(() => {
    initScene();
  });


  let planes = [
    { x: 0, z: 0 },
    { x: 2, z: 2 },
    { x: 4, z: 0 },
    { x: 6, z: -2, isEnd: true }
  ];

  let gameStarted = false;

  const startGame = () => {
    gameStarted = true;
    createBlob();
    // initBlob();
    gameStatus.set('playing');
    // blobPosition.set({ x: 0, y: 1, z: 0 });
  };

  const replayGame = () => {
    gameStarted = false;
    removeObject3D('blob');
    startGame();
  };

  const quitGame = () => {
    goto('/');
  };

</script>


{#if !gameStarted}
  <div>
    <h1>Start a Game</h1>
    <button on:click={startGame}>Start</button>
  </div>

{:else}

  <Controls />
  <Joystick on:update={handleUpdate} />
  {#each planes as plane (plane.x + '-' + plane.z)}
    <Plane position={{ x: plane.x, y: 0, z: plane.z }} isEnd={plane.isEnd} />
  {/each}

  {#if $gameStatus === 'success' || $gameStatus === 'fail'}
    <div>
      <h2>Congratulations! You reached the end.</h2>
      <button on:click={replayGame}>Replay</button>
      <button on:click={quitGame}>Quit</button>
    </div>
  {/if}
{/if}






