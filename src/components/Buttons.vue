<script setup lang="ts">
defineProps<{
  showing: { showBoard: Boolean; showPoints: boolean };
  gameOver: boolean;
}>();

defineEmits(["showBoard", "showPoints", "newGame", "reset"]);
</script>

<template>
  <div class="buttons">
    <button v-if="showing.showBoard" @click="() => $emit('showBoard')">
      Visa poäng
    </button>
    <button v-if="showing.showPoints" @click="() => $emit('showPoints')">
      Visa spel
    </button>
    <button v-if="gameOver" @click="() => $emit('newGame')">
      Börja nytt spel
    </button>
    <button @click="() => $emit('reset')">Börja om från början</button>
  </div>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 10px;
}
</style>
