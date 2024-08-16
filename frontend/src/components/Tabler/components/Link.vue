<script setup>
import { computed } from 'vue';
import {isValidEmail, isValidURL} from "@/custom_method.js";

const PROPS = defineProps({
  link: String,
  name: {
    type: String,
    default: ''
  },
  icons: {
    type: Object,
    default: null
  }
});

const computedHref = computed(() => {
  if (isValidURL(decodeURIComponent(PROPS.link))) {
    return decodeURIComponent(PROPS.link);
  } else if (isValidEmail(PROPS.link)) {
    return `mailto:${PROPS.link}`;
  }
});

const computedIcon = computed(() => {
  if (PROPS.icons) {
    if (isValidURL(decodeURIComponent(PROPS.link))) {
      return PROPS.icons.link;
    } else if (isValidEmail(PROPS.link)) {
      return PROPS.icons.mail;
    }
  }
});

</script>

<template>
  <a v-if="link !== null" :href="computedHref" target="_blank" rel="noopener noreferrer" :class="{'table__cols-icons__flex': icons}">
    <v-icon v-if="icons" :name="computedIcon" class="icons" />
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