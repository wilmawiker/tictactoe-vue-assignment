<script setup lang="ts">
import { IGame } from "../models/IGame";

interface IGameProps {
  game: IGame;
}

const emit = defineEmits(["startOver"]);
const props = defineProps<IGameProps>();
</script>

<template>
  <p>{{ props.game.winner }} won!</p>
  <button type="button" @click="emit('startOver')">Start new game</button>
</template>
