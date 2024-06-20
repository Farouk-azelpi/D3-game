<script>
    import { onMount } from 'svelte';

    import { createBlob } from '$lib/games/fluffyblob/blob.js';

    import { blobCoords } from '/src/stores';

    onMount(() => {
        createBlob();
    });

</script>

