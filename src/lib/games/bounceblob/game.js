import { blobPosition, gameStatus } from '/src/stores';


const endPosition = { x: 6, y: 0, z: -2}; // Last plane position


export function initBlob() {
    // Initialize blob
    blobPosition.subscribe(value => {
        if (blob) {
            blob.position.set(value.x, value.y, value.z);
            checkEndPosition(value);
        }
    });
}

export function checkEndPosition(position) {
    // Win Condition
    if (position.x === endPosition.x && position.z === endPosition.z) {
      gameStatus.set('success');
    }
    // Lose Condition
    if (position.y < -3) {
      gameStatus.set('fail');
    }
}



