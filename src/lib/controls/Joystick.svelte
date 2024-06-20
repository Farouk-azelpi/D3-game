<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import { cubicOut } from 'svelte/easing';
  import { tweened } from 'svelte/motion';

  let container;
  let innerCircle;
  let outerRadius;
  let innerRadius;
  let controlRadius;
  let dragging = false;

  const dispatch = createEventDispatcher();

  const position = tweened({ x: 0, y: 0 }, {
    duration: 300,
    easing: cubicOut,
  });

  onMount(() => {
    outerRadius = container.clientWidth / 2;
    innerRadius = innerCircle.clientWidth / 2;
    controlRadius = 2 * outerRadius; // Control circle is twice the size of the outer circle
  });

  const onPointerDown = (event) => {
    dragging = true;
    moveCircle(event);
  };

  const onPointerMove = (event) => {
    if (dragging) {
      moveCircle(event);
    }
  };

  const onPointerUp = () => {
    dragging = false;
    resetCircle();
    dispatch('update', { x: 0, y: 0, speed: 0 });
  };

  const onPointerLeave = (event) => {
    if (dragging) {
      moveCircle(event);
    } else {
      resetCircle();
    }
  };

  const moveCircle = (event) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = event.clientX - centerX;
    const dy = event.clientY - centerY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // If outside effective area, reset and return
    if (distance > controlRadius) {
      resetCircle();
      return;
    }

    const angle = Math.atan2(dy, dx);
    const limitDistance = Math.min(distance, outerRadius - innerRadius);
    const x = limitDistance * Math.cos(angle);
    const y = limitDistance * Math.sin(angle);

    position.set({ x, y });
    const speed = limitDistance / (outerRadius - innerRadius);
    dispatch('update', { x: Math.cos(angle), y: Math.sin(angle), speed });
  };

  const resetCircle = () => {
    position.set({ x: 0, y: 0 });
  };
</script>

<div class="control-circle"
  on:pointerdown={onPointerDown}
  on:pointermove={onPointerMove}
  on:pointerup={onPointerUp}
  on:pointerleave={onPointerLeave}>
  <div class="outer-circle" bind:this={container}>
    <div class="inner-circle" bind:this={innerCircle} style="transform: translate({$position.x}px, {$position.y}px)"></div>
  </div>
</div>

<style>
  .control-circle {
    position: absolute;
    width: 400px; /* Control circle is twice the size of the outer circle */
    height: 400px;
    border-radius: 50%;
    top: 80%;
    left: 20%;
    transform: translate(-50%, -70%);
    background: rgba(0, 0, 0, 0); /* Transparent background */
    cursor: pointer;
  }

  .outer-circle {
    position: absolute;
    width: 200px;
    height: 200px;
    border: 5px solid #b9a616;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .inner-circle {
    position: absolute;
    width: 60px;
    height: 60px;
    background-color: #c43d3d;
    border-radius: 35%;
    top: 35%;
    left: 35%;
    transform: translate(-50%, -50%);
    touch-action: none;
  }
</style>