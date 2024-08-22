<script setup>
import {computed, defineEmits} from 'vue';
import { isValidEmail, isValidURL } from "@/custom_method.js";

const PROPS = defineProps({
  link: String,
  name: {
    type: String,
    default: ''
  },
  icons: {
    type: Object,
    default: null
  },
  date: {
    type: String,
    default: null
  }
});
const EMIT = defineEmits(['hover']);

const computedHref = computed(() => {
  const decodedLink = decodeURIComponent(PROPS.link);
  if (isValidURL(decodedLink)) {
    return decodedLink;
  } else if (isValidEmail(PROPS.link)) {
    return `mailto:${PROPS.link}`;
  }
  return null;
});

const computedIcon = computed(() => {
  if (PROPS.icons && computedHref.value) {
    const decodedLink = decodeURIComponent(PROPS.link);
    if (isValidURL(decodedLink)) {
      return PROPS.icons.link;
    } else if (isValidEmail(decodedLink)) {
      return PROPS.icons.mail;
    }
  }
  return null;
});

const handleMouseEnter = () => {
  EMIT('hover', PROPS.date);
};

const handleMouseLeave = () => {
  EMIT('hover', null);
};
</script>

<template>
    <a
        v-if="computedHref"
        :href="computedHref"
        target="_blank"
        rel="noopener noreferrer"
        :class="{ 'table__cols-icons__flex': icons }"
    >
      <v-icon v-if="computedIcon" :name="computedIcon" class="icons link__icons" />
      <span
          v-else
          @mouseenter="handleMouseEnter"
          @mouseleave="handleMouseLeave"
          style="cursor: pointer;"
          class="link__text"
      >
        {{ name }}
      </span>
    </a>
</template>

<style scoped>
a {
  font-style: italic;
  text-align: left;
  text-decoration: none;
}

.link__text {
  color: var(--primary);
}
.link__text:hover {
  color: var(--off-gray-dark);
  text-decoration: underline;
}
.link__text:active {
  color: var(--primary-faded);
}
.link__icons {
  color: var(--primary-dark);
}
.link__icons:hover {
  color: var(--off-white-light);
}
.link__icons:active {
  color: var(--primary);
}
</style>
