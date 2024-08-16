<script setup>

import {onMounted, ref} from "vue";

const PROPS = defineProps({
  state: Boolean
});

const state = ref(false); // Utiliser ref pour les données réactives

onMounted(() => {
  state.value = PROPS.state;
});

function toggleState() {
  state.value = !state.value;
}
</script>

<template>
  <div @click="toggleState" class="table__cols-icons__flex">
    <v-icon v-if="state" name="bi-check-square-fill" class="icons"/>
    <v-icon v-else name="bi-square" class="icons"/>
    <input type="hidden" :value="state" @change="handleChange">
  </div>
</template>
