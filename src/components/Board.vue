<script setup lang="ts">
import Square from "./Square.vue";

defineProps<{ board: string[] }>();
const emit = defineEmits(["makeMove"]);

const makeMove = (square: number) => {
  emit("makeMove", square);
};
</script>

<template>
  <div class="squares">
    <Square
      v-for="(n, index) in board"
      :key="index"
      :square="index"
      :value="n"
      @move="makeMove"
    ></Square>
  </div>
</template>

<style scoped>
.squares {
  display: flex;
  flex-wrap: wrap;
  width: 231px;
}
</style>
