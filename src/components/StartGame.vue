<script setup lang="ts">
import { IGame } from "../models/IGame";

const randomPlayer = () => (Math.random() > 0.5 ? "X" : "O");

interface IGameProps {
  index: number;
  game: IGame;
}

const emit = defineEmits(["playerMove", "checkPlayersMove"]);
const props = defineProps<IGameProps>();

const firstPlayer = () => {
  let firstPlayerTurn = randomPlayer();
  if (firstPlayerTurn === "X") {
    props.game.currentPlayer = props.game.players[0];
  } else {
    props.game.currentPlayer = props.game.players[1];
  }
};

firstPlayer();
</script>

<template>
  <div class="box" @click.once="emit('playerMove'), emit('checkPlayersMove')">
    {{ props.game.gameBoard[index] }}
  </div>
</template>

<style scoped>
.boxSymbol {
  font-size: x-large;
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
