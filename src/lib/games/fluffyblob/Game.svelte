<script>

    import Controls from '$lib/controls/Controls.svelte';   

    import Enviroment from './Enviroment.svelte';

    import { gameStatus, blob } from '/src/stores';

    let gameStarted = false;

    const startGame = () => {
        gameStarted = true;
        gameStatus.set('playing');
        blob.position.set({ x: 0, y: 1, z: 0 });
    };

    const replayGame = () => {
        gameStarted = false;
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

    <Enviroment />

    {#if $gameStatus === 'success'}
        <div>
            <h2>Congratulations! You reached the end.</h2>
            <button on:click={replayGame}>Replay</button>
            <button on:click={quitGame}>Quit</button>
        </div>
    {/if}

{/if}