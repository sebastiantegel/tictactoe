<script setup lang="ts">
import { Player } from "../models/Player";

interface IViewPointsProps {
  players: Player[];
}

defineProps<IViewPointsProps>();
</script>

<template>
  <div class="points-wrapper">
    <table>
      <thead>
        <tr>
          <th>Namn</th>
          <th>Poäng</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in players">
          <td>{{ p.name }}</td>
          <td>{{ p.points }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
