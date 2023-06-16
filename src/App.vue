<script setup lang="ts">
import { ref } from "vue";
import Board from "./components/Board.vue";
import GetPlayerNames from "./components/GetPlayerNames.vue";
import ViewPoints from "./components/ViewPoints.vue";
import Buttons from "./components/Buttons.vue";
import { Game } from "./models/Game";
import { Player } from "./models/Player";

const game = ref<Game>({
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  gameOver: false,
  players: [],
  hasWinner: false,
});

const isInLocalStorage = localStorage.getItem("tictactoe");
if (isInLocalStorage) {
  game.value = JSON.parse(isInLocalStorage);
}

const showing = ref({ showBoard: true, showPoints: false });

const handleBegin = (players: string[]) => {
  players.forEach((player) => {
    game.value.players.push(new Player(player, 0));
  });
};

const makeMove = (square: number) => {
  if (game.value.gameOver) return;

  game.value.board[square] = game.value.currentPlayer;

  let winner = checkWin("X");
  if (winner) {
    game.value.players[0].points++;
  }

  if (!winner) {
    winner = checkWin("O");
    if (winner) {
      game.value.players[1].points++;
    }
  }

  game.value.gameOver = winner;

  if (!winner) {
    game.value.gameOver = checkDraw();
  }

  if (!winner) {
    if (game.value.currentPlayer === "O") {
      game.value.currentPlayer = "X";
    } else {
      game.value.currentPlayer = "O";
    }
  }

  localStorage.setItem("tictactoe", JSON.stringify(game.value));
};

const checkDraw = () => {
  if (game.value.board.findIndex((b) => b === "") < 0) {
    game.value.hasWinner = false;
    return true;
  }

  return false;
};

const checkWin = (player: string) => {
  let winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
    [1, 4, 7],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let hasWinner = true;

  for (let i = 0; i < winningCombos.length; i++) {
    hasWinner = true;

    for (let j = 0; j < winningCombos[i].length; j++) {
      const valueOnBoard = game.value.board[winningCombos[i][j]];

      if (valueOnBoard !== player) hasWinner = false;
    }

    if (hasWinner) {
      game.value.hasWinner = true;
      return true;
    }
  }

  return false;

  // if (
  //   (game.value.board[0] === player &&
  //     game.value.board[3] === player &&
  //     game.value.board[6] === player) ||
  //   (game.value.board[1] === player &&
  //     game.value.board[4] === player &&
  //     game.value.board[7] === player) ||
  //   (game.value.board[2] === player &&
  //     game.value.board[5] === player &&
  //     game.value.board[8] === player) ||
  //   (game.value.board[0] === player &&
  //     game.value.board[1] === player &&
  //     game.value.board[2] === player) ||
  //   (game.value.board[3] === player &&
  //     game.value.board[4] === player &&
  //     game.value.board[5] === player) ||
  //   (game.value.board[6] === player &&
  //     game.value.board[7] === player &&
  //     game.value.board[8] === player) ||
  //   (game.value.board[0] === player &&
  //     game.value.board[4] === player &&
  //     game.value.board[8] === player) ||
  //   (game.value.board[2] === player &&
  //     game.value.board[4] === player &&
  //     game.value.board[6] === player)
  // ) {
  //   game.value.hasWinner = true;
  //   return true;
  // }

  // return false;
};

const beginNewGame = () => {
  game.value.gameOver = false;
  game.value.board = ["", "", "", "", "", "", "", "", ""];

  const randomIndex = Math.floor(Math.random() * 2);
  game.value.currentPlayer = randomIndex === 0 ? "X" : "O";
};

const getCurrentPlayerName = () => {
  return game.value.currentPlayer === "X"
    ? game.value.players[0].name
    : game.value.players[1].name;
};

const reset = () => {
  game.value = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameOver: false,
    players: [],
    hasWinner: false,
  };
};
</script>

<template>
  <div v-if="game.players.length === 0">
    <GetPlayerNames @begin="handleBegin"></GetPlayerNames>
  </div>
  <div v-else class="board-wrapper">
    <div class="winner" v-if="game.gameOver">
      <div v-if="game.hasWinner">
        Grattis
        {{ getCurrentPlayerName() }}! Du vann!
      </div>
      <div v-else>Det blev oavgjort! Försök igen!</div>
    </div>
    <div v-if="showing.showBoard">
      <p v-if="!game.gameOver">Det är {{ getCurrentPlayerName() }}s tur</p>
      <Board :board="game.board" @make-move="makeMove"></Board>
    </div>
    <ViewPoints :players="game.players" v-else></ViewPoints>

    <Buttons
      :showing="showing"
      :game-over="game.gameOver"
      @show-board="showing = { showBoard: false, showPoints: true }"
      @show-points="showing = { showBoard: true, showPoints: false }"
      @new-game="beginNewGame"
      @reset="reset"
    ></Buttons>
  </div>
</template>

<style scoped>
.board-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
