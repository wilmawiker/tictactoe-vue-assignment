<script setup lang="ts">
import { ref } from "vue";

const randomPlayer = () => (Math.random() > 0.5 ? "X" : "O");
const playerX = JSON.stringify(localStorage.getItem("playerX"));
const playerO = JSON.stringify(localStorage.getItem("playerO"));
let currentPlayerState = ref("");
let symbolState = ref("");
let id = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

const firstPlayer = () => {
  let firstPlayerTurn = randomPlayer();
  if (firstPlayerTurn === "X") {
    currentPlayerState.value = playerX;
  } else {
    currentPlayerState.value = playerO;
  }
};

const playerMove = () => {
  if (currentPlayerState.value === playerX) {
    symbolState.value = "X";
    currentPlayerState.value = playerO;
  } else {
    symbolState.value = "O";
    currentPlayerState.value = playerX;
  }
  console.log(symbolState);
  console.log("clicked");
};
firstPlayer();
</script>

<template>
  <p>{{ currentPlayerState }}s turn!</p>
  <div class="game-grid">
    <div class="box" @click="playerMove" :id="id[0]">{{ symbolState }}</div>
    <div class="box" @click="playerMove" :id="id[1]">{{ symbolState }}</div>
    <div class="box" @click="playerMove" :id="id[2]">{{ symbolState }}</div>
    <div class="box" @click="playerMove" :id="id[3]">{{ symbolState }}</div>
    <div class="box" @click="playerMove" :id="id[4]">{{ symbolState }}</div>
    <div class="box" @click="playerMove" :id="id[5]">{{ symbolState }}</div>
    <div class="box" @click="playerMove" :id="id[6]">{{ symbolState }}</div>
    <div class="box" @click="playerMove" :id="id[7]">{{ symbolState }}</div>
    <div class="box" @click="playerMove" :id="id[8]">{{ symbolState }}</div>
  </div>
</template>

<style scoped>
.game-grid {
  width: 600px;
  height: 600px;
  margin: 0 auto;
  border: 1px solid black;
  display: grid;
  grid-template: repeat(3, 1fr) / repeat(3, 1fr);
}

.box {
  border: 1px solid black;
  font-size: x-large;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
