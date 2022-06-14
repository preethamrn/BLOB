<script setup>
import { onMounted } from "vue";

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

const player1 = { x: 0, y: 0, color: "red" };
const player2 = {
  x: props.boardWidth - 1,
  y: props.boardHeight - 1,
  color: "blue",
};

const draw = function () {
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

  const drawPlayer = function (player) {
    const playerCircle = getCircle(
      player.x * tileSize + tileSize / 2,
      player.y * tileSize + tileSize / 2
    );

    ctx.fillStyle = player.color;
    ctx.fill(playerCircle);
  };

  drawPlayer(player1);
  drawPlayer(player2);
};

onMounted(() => {
  // TODO: make this an event loop
  // TODO: update player positions every frame
  // TODO: event handlers for controls
  draw();
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
