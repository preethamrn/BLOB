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

const player1 = { x: 0, y: 0 };
const player2 = { x: props.boardWidth - 1, y: props.boardHeight - 1 };

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

  const player1Circle = getCircle(
    player1.x * tileSize + tileSize / 2,
    player1.y * tileSize + tileSize / 2
  );
  const player2Circle = getCircle(
    player2.x * tileSize + tileSize / 2,
    player2.y * tileSize + tileSize / 2
  );

  ctx.fillStyle = "red";
  ctx.fill(player1Circle);

  ctx.fillStyle = "blue";
  ctx.fill(player2Circle);
};

onMounted(() => {
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
