<script setup>
import {computed, onMounted, onUnmounted, ref} from "vue";
const PROPS = defineProps({
  date: {
    type: Date,
    default: null
  }
});
const MOUSE_LOC = ref({ x: 0, y: 0 });

onMounted(() => {
  document.addEventListener('mousemove', updateMousePosition, { once: true });
});

onUnmounted(() => {
  document.removeEventListener('mousemove', updateMousePosition);
});

const updateMousePosition = (e) => {
  MOUSE_LOC.value = {
    x: e.clientX + 12, // 0.75rem
    y: e.clientY + 12
  };
};

const computedDate = computed(() => {
  if (PROPS.date) {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(PROPS.date);
  }
  return '';
});
</script>

<template>
  <aside class="link__info"
         :style="{ top: `${MOUSE_LOC.y}px`, left: `${MOUSE_LOC.x}px` }"
  >
    <p v-if="computedDate" >{{ computedDate }}</p>
  </aside>
</template>

<style >
.link__info {
  position: fixed;
  top: 100px;
  left: 100px;
  background-color: var(--primary);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 0.25rem;
  z-index: 9999; /* Augmenté pour surpasser les éléments sticky */
  pointer-events: none;
  white-space: nowrap;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s ease-in-out;
  opacity: 0.9;
  font-size: 0.9rem;
}
</style>