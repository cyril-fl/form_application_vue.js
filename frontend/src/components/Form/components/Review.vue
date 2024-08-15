<script setup>
import { ref } from 'vue';

const PROPS = defineProps({
  name: String
});

const NUMBER_SELECTED = ref(0);
const NUMBER_HOVERED = ref(null);

const selectNumber = (number) => {
  NUMBER_SELECTED.value === number ? NUMBER_SELECTED.value = null : NUMBER_SELECTED.value = number;
};

const handleMouseOn = (number) => {
  NUMBER_HOVERED.value = number;
};
const handleMouseOut = () => {
  NUMBER_HOVERED.value = null;
};

</script>

<template>
    <ul class="form__review">
      <li
          v-for="i in 5"
          :key="i"
          @click="selectNumber(i)"
          @mouseover="handleMouseOn(i)"
          @mouseout="handleMouseOut"
          class="review__number"
          :class="{review__number__selected: NUMBER_SELECTED >= i, review__number__hovered: NUMBER_HOVERED >= i}"
      >
        {{ i }}
      </li>
    </ul>
    <input type="hidden" :name="name" :value="NUMBER_SELECTED">
</template>

<style scoped>
  /* FORM */
  .form__review {
    flex-grow: 1;
    display: flex;
    justify-content: space-around;
    padding: 0.5rem;
    border-radius: 1rem;
    color: var(--off-gray-dark);
  }
  .review__number {
    cursor: pointer;
  }
  .review__number__selected {
    font-weight: 900;
    color: var(--off-black-light);
  }
  .review__number__hovered {
    color: var(--primary);
  }
</style>
