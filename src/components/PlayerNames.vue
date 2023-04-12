<script setup lang="ts">
import { ref } from "vue";
import StartGame from "./StartGame.vue";

const playerXInput = ref("");
const playerOInput = ref("");
let clicked = ref(false);

const savePlayersToLs = () => {
  localStorage.setItem("playerX", playerXInput.value);
  localStorage.setItem("playerO", playerOInput.value);
  clicked.value = true;
};
</script>

<template>
  <form class="playersForm">
    <label for="playerX">Enter player X: </label>
    <input type="text" id="playerX" v-model="playerXInput" />
    <br />
    <label for="playerO">Enter player O: </label>
    <input type="text" id="playerO" v-model="playerOInput" />
    <br />
    <button type="button" @click="savePlayersToLs">Continue</button>
  </form>
  <StartGame v-if="clicked === true" />
</template>

<style scoped>
.playersForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
