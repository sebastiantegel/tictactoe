<script setup lang="ts">
import { ref } from "vue";
import { Click } from "../models/Click";

interface ISquareProps {
  square: number;
  value: string;
}

const props = defineProps<ISquareProps>();

const emit = defineEmits(["move"]);

const state = ref<Click>({ isClicked: false, isErrorClick: false });

const handleClick = () => {
  if (props.value === "") {
    state.value.isClicked = !state.value.isClicked;
    emit("move", props.square);
  } else {
    state.value.isErrorClick = true;
  }
};
</script>

<template>
  <div
    class="square"
    @click="handleClick"
    :class="
      state.isClicked && !state.isErrorClick ? 'clicked' : 'error-clicked'
    "
  >
    {{ value }}
  </div>
</template>

<style scoped>
@keyframes click {
  0% {
    background-color: transparent;
  }
  50% {
    background-color: grey;
  }
  100% {
    background-color: transparent;
  }
}

.square {
  width: 75px;
  height: 75px;
  border: 1px solid grey;

  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;

  font-size: 40pt;
}

.clicked {
  animation: click 0.2s linear;
}
</style>
