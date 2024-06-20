<script>

    import { onMount } from 'svelte';

    import { initScene } from '$lib/games/fluffyblob/scene.js';
    import { createBlob } from '$lib/games/fluffyblob/blob.js';

    import Plane from '$lib/components/Plane.svelte';
    import Blob from './Blob.svelte';

    let planes = [
    { x: 0, z: 0 },
    { x: 2, z: 2 },
    { x: 4, z: 0 },
    { x: 6, z: -2, isEnd: true }
    ];

    // Initialize scene
    onMount(() => {
        initScene();
    });


</script>

<Blob />

{#each planes as plane (plane.x + '-' + plane.z)}
    <Plane position={{ x: plane.x, y: 0, z: plane.z }} isEnd={plane.isEnd} />
{/each}