<script setup lang="ts">
import { ref } from "vue";
import { IGame } from "../models/IGame";
import { Player } from "../models/Player";
import PlayerNames from "./PlayerNames.vue";
import StartGame from "./StartGame.vue";
import EndOfGame from "./EndOfGame.vue";
import { ShowContent } from "../models/ShowContent";

const game = ref<IGame>({
  players: [],
  gameBoard: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: new Player("", "", []),
  winner: "",
  gameIsActive: true,
});

const showContent = ref<ShowContent>({
  showPlayerInput: true,
  showGame: false,
  showWinner: false,
});

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const addPlayers = (playerXInput: string, playerOInput: string) => {
  localStorage.clear();
  game.value.players.push(new Player("X", playerXInput, []));
  game.value.players.push(new Player("O", playerOInput, []));
  localStorage.setItem("players", JSON.stringify(game.value.players));

  showContent.value.showPlayerInput = false;
  showContent.value.showGame = true;
  showContent.value.showWinner = false;
};

const playerMove = (index: number) => {
  game.value.gameBoard[index] = game.value.currentPlayer.playerSymbol;
  console.log(game.value.currentPlayer);
};

const checkPlayersMove = () => {
  let chosenIndex = 0;

  game.value.gameBoard.forEach((currentValue, index) => {
    if (currentValue === game.value.currentPlayer.playerSymbol) {
      chosenIndex = index;

      if (!game.value.currentPlayer.markedSquares.includes(chosenIndex)) {
        game.value.currentPlayer.markedSquares.push(chosenIndex);
      }
    }
  });

  for (let i = 0; i < winningCombinations.length; i++) {
    let checkPlayer = winningCombinations[i].every((element) =>
      game.value.currentPlayer.markedSquares.includes(element)
    );

    if (checkPlayer) {
      game.value.gameIsActive = false;
      showContent.value.showWinner = true;
      showContent.value.showGame = false;
      game.value.winner = game.value.currentPlayer.playerName;
    }
  }

  if (game.value.currentPlayer.playerSymbol === "X") {
    game.value.currentPlayer = game.value.players[1];
  } else {
    game.value.currentPlayer = game.value.players[0];
  }
};

const startOver = () => {
  game.value.gameBoard = ["", "", "", "", "", "", "", "", ""];
  game.value.players[0].markedSquares = [];
  game.value.players[1].markedSquares = [];
  showContent.value.showPlayerInput = true;
  showContent.value.showGame = false;
  showContent.value.showWinner = false;
};
</script>

<template>
  <PlayerNames @add-players="addPlayers" v-if="showContent.showPlayerInput" />

  <div class="show-game" v-if="showContent.showGame">
    <p>{{ game.currentPlayer.playerName }}s turn!</p>
    <div class="game-grid">
      <StartGame
        :index="index"
        :game="game"
        v-for="(square, index) in game.gameBoard"
        @player-move="playerMove(index)"
        @check-players-move="checkPlayersMove"
      />
    </div>
    <button type="button" @click="startOver">Start new game</button>
  </div>
  <EndOfGame
    :game="game"
    v-if="showContent.showWinner"
    @start-over="startOver"
  />
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
</style>
