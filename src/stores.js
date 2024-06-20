// src/stores.js
import { writable } from 'svelte/store';

export const blobPosition = writable({ x: 0, y: 1, z: 0 });
export const joystick = writable('playing'); // 'playing' or 'success'

export const gameStatus = writable('playing'); // 'playing' or 'success'

export const gamePhysics = writable({
    gravity: 0.01,
    damping: 0.9
});

export const blobCoords = writable({
    // Initial state
    position: { x: 0, y: 0, z: 0 },
    velocity: { x: 0, y: 0, z: 0 },
    jumping: false,
    spinning: false,
    gravity: 0.01,
    damping: 0.9
});

