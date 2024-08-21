<script setup>
import {onMounted} from "vue";

const PROPS = defineProps({
  order: {
    type: Object,
    default: () => ({ by: 'DEFAULT', click: 0 }),
  },
  th_type: {
    type: String,
    default: 'DEFAULT'
  },
})
const EMIT = defineEmits(['onCLick'])

const handleClick = () => {
  console.log(PROPS.th_type)
  console.log('by', PROPS.order.by)
  EMIT('onCLick', PROPS.th_type)
}
</script>

<template>

  <span v-if="PROPS.order.by === PROPS.th_type" @click="handleClick" class=" order__icons-button">
    <v-icon v-if="PROPS.order.click === 0" name="hi-minus" class="order__icon"/>
    <v-icon v-if="PROPS.order.click === 1" name="hi-chevron-up" class="order__icon"/>
    <v-icon v-if="PROPS.order.click === 2" name="hi-chevron-down" class="order__icon"/>
  </span>
  <span v-else @click="handleClick">
    <v-icon name="hi-minus" class="order__icons-button order__icons-minus order__icon order__icon"/>
  </span>
</template>

<style>
.order__icon {
  transform: scale(0.9);
}
.order__icons-minus {
  color: var(--off-gray-dark);
}
.order__icons-button:hover {
  color: var(--accent);
}
</style>