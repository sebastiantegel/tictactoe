<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["begin"]);

const inputs = ref({ X: "", O: "" });
const showFirstPlayer = ref(true);

const handleFirstPlayer = () => {
  showFirstPlayer.value = false;
};

const handleBeginClick = () => {
  emit("begin", [inputs.value.X, inputs.value.O]);
};
</script>

<template>
  <div class="form" v-if="showFirstPlayer">
    <label for="playerX">Spelare X: </label>
    <input id="playerX" v-model="inputs.X" />
    <button @click="handleFirstPlayer">Spara</button>
  </div>
  <div class="form" v-else>
    <label for="playerO">Spelare O: </label>
    <input id="playerO" v-model="inputs.O" />
    <button @click="handleBeginClick">Börja spelet</button>
  </div>
</template>

<style scoped>
.form {
  display: flex;
  gap: 10px;
  align-items: center;
}
</style>
