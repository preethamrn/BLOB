<script setup>
import { computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  boardWidth: {
    type: Number,
    required: true,
  },
  boardHeight: {
    type: Number,
    required: true,
  },
});

const tileSize = 20;

const gameWidth = props.boardWidth * tileSize;
const gameHeight = props.boardHeight * tileSize;

const player1 = {
  lastMoveX: 0,
  lastMoveY: 0,
  color: "red",
  vx: 0,
  vy: 0,
  lastMoveTimestamp: 0, // Last timestamp player makes a movement (ie, keydown).
};
const player2 = {
  lastMoveX: props.boardWidth - 1,
  lastMoveY: props.boardHeight - 1,
  color: "blue",
  vx: 0,
  vy: 0,
  lastMoveTimestamp: 0,
};

const moveRate = 50; // Time in ms elapsed to move 1 tile.

const getPosition = function (pos, vel, elapsed, boundary) {
  let newPos = Math.floor(pos + (vel * elapsed) / moveRate);
  if (newPos < 0) {
    newPos = 0;
  } else if (newPos >= boundary) {
    newPos = boundary - 1;
  }
  return newPos;
};

// Event handling
document.addEventListener("keydown", (e) => {
  let moved = false;
  let goalVelocity = [player1.vx, player1.vy];
  if (e.keyCode === 38) {
    // up arrow
    moved = true;
    goalVelocity = [0, -1];
  } else if (e.keyCode === 40) {
    // down arrow
    moved = true;
    goalVelocity = [0, 1];
  } else if (e.keyCode === 37) {
    // left arrow
    moved = true;
    goalVelocity = [-1, 0];
  } else if (e.keyCode === 39) {
    // right arrow
    moved = true;
    goalVelocity = [1, 0];
  }
  if (moved) {
    let elapsed = performance.now() - player1.lastMoveTimestamp;
    player1.lastMoveX = getPosition(
      player1.lastMoveX,
      player1.vx,
      elapsed,
      props.boardWidth
    );
    player1.lastMoveY = getPosition(
      player1.lastMoveY,
      player1.vy,
      elapsed,
      props.boardHeight
    );
    player1.lastMoveTimestamp = performance.now();
  }
  [player1.vx, player1.vy] = goalVelocity;
});

// Rendering
const draw = function () {
  const timestamp = performance.now();
  const getCircle = function (x, y) {
    const circle = new Path2D();
    circle.arc(x, y, 10, 0, 2 * Math.PI);

    return circle;
  };

  const canvas = document.getElementById("gameBoard");
  if (!canvas?.getContext) {
    return;
  }

  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const drawPlayer = function (player) {
    let elapsed = timestamp - player.lastMoveTimestamp;
    let x = getPosition(player.lastMoveX, player.vx, elapsed, props.boardWidth);
    let y = getPosition(
      player.lastMoveY,
      player.vy,
      elapsed,
      props.boardHeight
    );

    const playerCircle = getCircle(
      x * tileSize + tileSize / 2,
      y * tileSize + tileSize / 2
    );

    ctx.fillStyle = player.color;
    ctx.fill(playerCircle);
  };

  drawPlayer(player1);
  drawPlayer(player2);

  window.requestAnimationFrame(draw);
};

let animationRequestId = 0;
onMounted(() => {
  animationRequestId = window.requestAnimationFrame(draw);
});

onUnmounted(() => {
  window.cancelAnimationFrame(animationRequestId);
});
</script>

<template>
  <canvas id="gameBoard" :width="gameWidth" :height="gameHeight"> </canvas>
</template>

<style scoped>
canvas {
  border: 10px solid black;
}
</style>
