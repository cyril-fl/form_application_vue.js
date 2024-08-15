<script setup>
import { computed } from 'vue';
import {isValidEmail, isValidURL} from "@/custom_method.js";

const PROPS = defineProps({
  link: String,
  name: String,
  icons: {
    type: Boolean,
    default: false
  }
});

const computedHref = computed(() => {
  if (isValidURL(decodeURIComponent(PROPS.link))) {
    return decodeURIComponent(PROPS.link);
  } else if (isValidEmail(PROPS.link)) {
    return `mailto:${PROPS.link}`;
  }
});
</script>

<template>
  <a v-if="link !== null" :href="computedHref" target="_blank" rel="noopener noreferrer" :class="{'table__cols-icons__flex': icons}">
    <v-icon v-if="icons" :name="name" class="icons" />
    <template v-else>{{ name }}</template>
  </a>
</template>

<style scoped>
  a {
    color: var(--primary);
    font-style: italic;
    text-align: left;
  }
  a:hover {
    color: var(--off-gray-dark);
    text-decoration: underline;
  }
  a:active {
    color: var(--off-black-dark);
    text-decoration: none;
  }
</style>