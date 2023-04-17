<script setup lang="ts">
import { ref } from "vue";

const playerXInput = ref("");
const playerOInput = ref("");

const emit = defineEmits(["addPlayers"]);
</script>

<template>
  <form class="playersForm">
    <label for="playerX">Enter player X: </label>
    <input type="text" id="playerX" v-model="playerXInput" />
    <br />
    <label for="playerO">Enter player O: </label>
    <input type="text" id="playerO" v-model="playerOInput" />
    <br />
    <button
      type="button"
      @click.once="emit('addPlayers', playerXInput, playerOInput)"
    >
      Continue
    </button>
  </form>
</template>

<style scoped>
.playersForm {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
